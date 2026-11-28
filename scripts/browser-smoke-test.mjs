import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

const baseUrl = process.env.TEST_URL || "http://127.0.0.1:8765";
const chromePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9333;
const profile = mkdtempSync(join(tmpdir(), "waled-browser-qa-"));
const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--disable-dev-shm-usage",
  "--no-sandbox",
  "--remote-allow-origins=*",
  "--disable-crash-reporter",
  "--no-first-run",
  "--no-default-browser-check",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "about:blank"
], { stdio: "ignore" });

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function waitForDebugger() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {
      // Chrome todavía está iniciando.
    }
    await delay(100);
  }
  throw new Error("Chrome no habilitó el puerto de depuración.");
}

async function openTarget(url) {
  const response = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: "PUT" });
  if (!response.ok) throw new Error(`No se pudo abrir ${url}.`);
  return response.json();
}

async function createClient(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
  const pending = new Map();
  const errors = [];
  let id = 0;

  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    }
    if (message.method === "Runtime.exceptionThrown") {
      errors.push(message.params.exceptionDetails.text || "Excepción JavaScript");
    }
    if (message.method === "Log.entryAdded" && message.params.entry.level === "error") {
      errors.push(message.params.entry.text);
    }
  });

  function send(method, params = {}) {
    id += 1;
    socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
  }

  await send("Runtime.enable");
  await send("Log.enable");
  await send("Page.enable");
  return { socket, send, errors };
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true
  });
  return result.result.value;
}

async function inspectViewport(client, width, height) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 768
  });
  await client.send("Page.navigate", { url: `${baseUrl}/` });
  await delay(500);

  const layout = await evaluate(client, `(() => {
    const viewport = document.documentElement.clientWidth;
    const offenders = [...document.querySelectorAll("body *")].filter((element) => {
      const style = getComputedStyle(element);
      if (style.position === "fixed" || style.position === "absolute") return false;
      if (element.closest(".hero-waves")) return false;
      const rect = element.getBoundingClientRect();
      return rect.right > viewport + 1 || rect.left < -1;
    }).slice(0, 10).map((element) => ({
      tag: element.tagName,
      className: element.className || "",
      left: Math.round(element.getBoundingClientRect().left),
      right: Math.round(element.getBoundingClientRect().right)
    }));
    return {
      viewport,
      scrollWidth: document.documentElement.scrollWidth,
      offenders,
      title: document.title,
      heading: document.querySelector("h1")?.textContent.trim()
    };
  })()`);

  let menu = null;
  if (width <= 672) {
    menu = await evaluate(client, `(() => {
      const toggle = document.querySelector(".nav-toggle");
      const nav = document.querySelector("#site-nav");
      toggle.click();
      const opened = toggle.getAttribute("aria-expanded") === "true" && nav.classList.contains("is-open");
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
      const closed = toggle.getAttribute("aria-expanded") === "false" && !nav.classList.contains("is-open");
      return { opened, closed };
    })()`);
  }

  return { width, height, ...layout, menu };
}

let exitCode = 0;
try {
  await waitForDebugger();
  const target = await openTarget(`${baseUrl}/`);
  const client = await createClient(target.webSocketDebuggerUrl);
  const sizes = [[375, 900], [390, 844], [768, 1024], [1024, 900], [1366, 900], [1440, 900], [1920, 1080]];
  const results = [];
  for (const [width, height] of sizes) results.push(await inspectViewport(client, width, height));

  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true
  });
  await client.send("Page.navigate", { url: `${baseUrl}/legal/` });
  await delay(400);
  const legal = await evaluate(client, `({
    title: document.title,
    documentCount: document.querySelectorAll(".legal-document").length,
    statusVisible: document.body.innerText.includes("BORRADORES PENDIENTES DE REVISIÓN JURÍDICA"),
    scrollWidth: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth
  })`);

  await client.send("Page.navigate", { url: `${baseUrl}/` });
  await delay(400);
  const privacyBeforeConsent = await evaluate(client, `({
    youtubeFramePresent: Boolean(document.querySelector("iframe[src*='youtube']")),
    externalRequests: performance.getEntriesByType("resource").map((entry) => entry.name).filter((url) => !url.startsWith(location.origin)),
    localStorageItems: localStorage.length,
    sessionStorageItems: sessionStorage.length,
    cookies: document.cookie
  })`);
  const videoConsent = await evaluate(client, `(() => {
    document.querySelector(".video-consent__load").click();
    const frame = document.querySelector("iframe");
    const privacyEnhanced = frame?.src.startsWith("https://www.youtube-nocookie.com/embed/") || false;
    document.querySelector(".video-consent__close").dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    return { privacyEnhanced, removedWithEscape: !document.querySelector("iframe") };
  })()`);
  const siteChecks = await evaluate(client, `(async () => {
    const faviconLinks = [...document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]')];
    const faviconResponses = await Promise.all(faviconLinks.map(async (link) => ({
      href: link.getAttribute("href"),
      status: (await fetch(link.href)).status
    })));
    const individualTab = document.querySelector('[data-plan-category="individual"]');
    individualTab.click();
    const individualPanel = document.querySelector('[data-plan-panel="individual"]');
    const institutionalPanel = document.querySelector('[data-plan-panel="institutional"]');
    const planSwitcher = {
      individualSelected: individualTab.getAttribute("aria-selected") === "true",
      individualVisible: !individualPanel.hidden,
      institutionalHidden: institutionalPanel.hidden,
      individualCards: individualPanel.querySelectorAll(".plan-card").length,
      prices: [...individualPanel.querySelectorAll(".plan-card__price")].map((element) => element.textContent.trim())
    };
    const localFragmentLinks = [...document.querySelectorAll('a[href^="#"]')];
    return {
      faviconResponses,
      planSwitcher,
      faqCorrected: document.body.textContent.includes("Un certificado privado de capacitación emitido por Waled Innovations al cumplir los requisitos de aprobación."),
      whatsappLinksValid: [...document.querySelectorAll("[data-whatsapp]")].every((link) => link.href.startsWith("https://web.whatsapp.com/") && link.target === "_blank"),
      socialLinks: [...document.querySelectorAll(".contact__channels a")].slice(1).map((link) => link.href),
      fragmentsValid: localFragmentLinks.every((link) => document.getElementById(link.getAttribute("href").slice(1))),
      descriptionMentionsGuatemala: document.querySelector('meta[name="description"]')?.content.includes("Guatemala") || false
    };
  })()`);

  await client.send("Page.navigate", { url: `${baseUrl}/404.html` });
  await delay(250);
  const notFound = await evaluate(client, `({
    title: document.title,
    heading: document.querySelector("h1")?.textContent.trim(),
    homeLink: document.querySelector('a[href="/"]')?.getAttribute("href"),
    faviconCount: document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]').length
  })`);

  const failures = results.filter((result) => result.scrollWidth > result.viewport || result.offenders.length || (result.menu && (!result.menu.opened || !result.menu.closed)));
  if (
    legal.documentCount !== 6
    || !legal.statusVisible
    || legal.scrollWidth > legal.viewport
    || privacyBeforeConsent.youtubeFramePresent
    || privacyBeforeConsent.externalRequests.length
    || privacyBeforeConsent.localStorageItems
    || privacyBeforeConsent.sessionStorageItems
    || privacyBeforeConsent.cookies
    || !videoConsent.privacyEnhanced
    || !videoConsent.removedWithEscape
    || siteChecks.faviconResponses.length !== 6
    || siteChecks.faviconResponses.some((response) => response.status !== 200)
    || !siteChecks.planSwitcher.individualSelected
    || !siteChecks.planSwitcher.individualVisible
    || !siteChecks.planSwitcher.institutionalHidden
    || siteChecks.planSwitcher.individualCards !== 3
    || siteChecks.planSwitcher.prices.join(",") !== "Q175,Q275,Q375"
    || !siteChecks.faqCorrected
    || !siteChecks.whatsappLinksValid
    || siteChecks.socialLinks.length !== 3
    || !siteChecks.fragmentsValid
    || !siteChecks.descriptionMentionsGuatemala
    || notFound.heading !== "Página no encontrada"
    || notFound.homeLink !== "/"
    || notFound.faviconCount !== 6
    || client.errors.length
  ) exitCode = 1;
  if (failures.length) exitCode = 1;
  console.log(JSON.stringify({ results, legal, privacyBeforeConsent, videoConsent, siteChecks, notFound, consoleErrors: client.errors }, null, 2));
  client.socket.close();
} finally {
  chrome.kill();
  await delay(750);
  if (profile.startsWith(tmpdir())) {
    rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  }
}

process.exit(exitCode);
