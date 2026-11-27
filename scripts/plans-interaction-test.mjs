import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

class ClassList {
  constructor(element) {
    this.element = element;
  }

  values() {
    return this.element.className.split(/\s+/).filter(Boolean);
  }

  add(name) {
    this.element.className = [...new Set([...this.values(), name])].join(" ");
  }

  remove(name) {
    this.element.className = this.values().filter((value) => value !== name).join(" ");
  }

  toggle(name, force) {
    if (force) this.add(name);
    else this.remove(name);
  }

  contains(name) {
    return this.values().includes(name);
  }
}

function matches(element, selector) {
  if (selector.startsWith(".")) return element.classList.contains(selector.slice(1));
  const attribute = selector.match(/^\[([^=\]]+)(?:="([^"]*)")?\]$/);
  if (attribute) {
    return element.attributes.has(attribute[1])
      && (attribute[2] === undefined || element.getAttribute(attribute[1]) === attribute[2]);
  }
  return element.tagName.toLowerCase() === selector.toLowerCase();
}

function matchesSelector(element, selector) {
  const parts = selector.trim().split(/\s+/);
  if (!matches(element, parts.at(-1))) return false;
  if (parts.length === 1) return true;
  let ancestor = element.parentElement;
  while (ancestor) {
    if (matches(ancestor, parts[0])) return true;
    ancestor = ancestor.parentElement;
  }
  return false;
}

function descendants(element) {
  return element.children.flatMap((child) => [child, ...descendants(child)]);
}

class Element {
  constructor(tagName) {
    this.tagName = tagName.toUpperCase();
    this.attributes = new Map();
    this.children = [];
    this.className = "";
    this.classList = new ClassList(this);
    this.listeners = {};
    this.parentElement = null;
    this.textContent = "";
    this.tabIndex = 0;
  }

  set id(value) {
    this.setAttribute("id", value);
  }

  get id() {
    return this.getAttribute("id") || "";
  }

  set href(value) {
    this.setAttribute("href", value);
  }

  appendChild(child) {
    child.parentElement = this;
    this.children.push(child);
    return child;
  }

  replaceChildren(...children) {
    this.children = [];
    children.forEach((child) => this.appendChild(child));
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.has(name) ? this.attributes.get(name) : null;
  }

  hasAttribute(name) {
    return this.attributes.has(name);
  }

  removeAttribute(name) {
    this.attributes.delete(name);
  }

  addEventListener(type, listener) {
    this.listeners[type] = this.listeners[type] || [];
    this.listeners[type].push(listener);
  }

  dispatchEvent(event) {
    event.currentTarget = this;
    event.preventDefault = event.preventDefault || function () {};
    (this.listeners[event.type] || []).forEach((listener) => listener(event));
  }

  click() {
    this.dispatchEvent({ type: "click" });
  }

  focus() {
    document.activeElement = this;
  }

  querySelector(selector) {
    return descendants(this).find((element) => matchesSelector(element, selector)) || null;
  }

  querySelectorAll(selector) {
    return descendants(this).filter((element) => matchesSelector(element, selector));
  }

  get offsetWidth() {
    return 100;
  }
}

class TextNode extends Element {
  constructor(text) {
    super("#text");
    this.textContent = text;
  }
}

class Document {
  constructor() {
    this.readyState = "complete";
    this.roots = [];
    this.activeElement = null;
  }

  createElement(tagName) {
    return new Element(tagName);
  }

  createTextNode(text) {
    return new TextNode(text);
  }

  querySelector(selector) {
    return this.querySelectorAll(selector)[0] || null;
  }

  querySelectorAll(selector) {
    const elements = this.roots.flatMap((rootElement) => [rootElement, ...descendants(rootElement)]);
    return elements.filter((element) => matchesSelector(element, selector));
  }
}

const document = new Document();
const description = new Element("p");
description.setAttribute("data-plan-category-description", "");
const planStatus = new Element("p");
planStatus.setAttribute("data-plan-status", "");

const institutionalTab = new Element("button");
institutionalTab.id = "plans-tab-institutional";
institutionalTab.setAttribute("data-plan-category", "institutional");
institutionalTab.setAttribute("aria-selected", "true");

const individualTab = new Element("button");
individualTab.id = "plans-tab-individual";
individualTab.setAttribute("data-plan-category", "individual");
individualTab.setAttribute("aria-selected", "false");

const panel = new Element("div");
panel.className = "plans__panel";
const grid = new Element("div");
grid.setAttribute("data-render-plans", "");
grid.setAttribute("data-active-category", "institutional");
panel.appendChild(grid);

const videoEmbed = new Element("div");
videoEmbed.setAttribute("data-video-embed", "");
videoEmbed.setAttribute("data-video-id", "Bn04VnK-qAE");
const videoLoad = new Element("button");
videoLoad.className = "video-consent__load";
videoEmbed.appendChild(videoLoad);

const details = new Element("details");
details.className = "faq-item";
details.open = true;
const summary = new Element("summary");
details.appendChild(summary);

const moodle = new Element("a");
moodle.setAttribute("data-moodle", "");
document.roots.push(description, planStatus, institutionalTab, individualTab, panel, videoEmbed, details, moodle);

const window = { LD: {} };
const context = vm.createContext({ window, document, console });
vm.runInContext(readFileSync(join(root, "js/config.js"), "utf8"), context);
vm.runInContext(readFileSync(join(root, "js/plans.js"), "utf8"), context);
vm.runInContext(readFileSync(join(root, "js/main.js"), "utf8"), context);

const assert = (condition, message) => {
  if (!condition) throw new Error("FAIL: " + message);
  console.log("PASS: " + message);
};

assert(grid.children.length === 3, "La categoría institucional renderiza tres tarjetas al iniciar.");
assert(grid.children[1].classList.contains("plan-card--featured"), "El Plan Institucional ocupa la tarjeta destacada central.");
assert(institutionalTab.getAttribute("aria-selected") === "true", "Institucionales inicia seleccionado.");
assert(planStatus.textContent === "Mostrando planes institucionales.", "El estado accesible anuncia la categoría inicial.");

individualTab.click();
assert(grid.getAttribute("data-active-category") === "individual", "El clic cambia dinámicamente a Individuales.");
assert(grid.children.length === 3, "La categoría individual renderiza tres tarjetas.");
assert(grid.children.map((card) => card.querySelector(".plan-card__price").textContent).join(",") === "Q175,Q275,Q375", "Los precios individuales renderizados son correctos.");
assert(grid.children[2].classList.contains("plan-card--featured"), "El Plan Integral individual tiene el destaque discreto.");
assert(planStatus.textContent === "Mostrando planes individuales.", "El estado accesible anuncia el cambio de categoría.");
assert(grid.children[0].querySelector("[data-whatsapp-plan]").getAttribute("data-whatsapp-plan") === "Plan Esencial Individual de Q175", "El CTA individual identifica categoría, plan y precio.");
assert(grid.children[0].querySelector("[data-whatsapp-plan]").getAttribute("href") === "https://web.whatsapp.com/", "El CTA reutiliza el fallback de WhatsApp configurado.");
assert(grid.children[0].querySelector("[data-whatsapp-plan]").getAttribute("aria-label").includes("Plan Esencial Individual de Q175"), "El enlace accesible conserva el producto individual seleccionado.");

individualTab.dispatchEvent({ type: "keydown", key: "ArrowLeft" });
assert(grid.getAttribute("data-active-category") === "institutional", "El selector permite volver con teclado a Institucionales.");
assert(document.activeElement === institutionalTab, "La navegación por flechas mueve el foco al tab activo.");

videoLoad.click();
assert(videoEmbed.hasAttribute("data-video-loaded") && Boolean(videoEmbed.querySelector("iframe")), "YouTube se carga únicamente después de activar el botón.");
videoEmbed.dispatchEvent({ type: "keydown", key: "Escape" });
assert(!videoEmbed.hasAttribute("data-video-loaded") && Boolean(videoEmbed.querySelector(".video-consent__load")), "Escape descarga el video y restaura el control de consentimiento.");

summary.dispatchEvent({ type: "keydown", key: "Escape" });
assert(details.open === false && document.activeElement === summary, "Escape cierra una pregunta frecuente abierta y conserva el foco.");
assert(moodle.getAttribute("tabindex") === "-1" && moodle.getAttribute("aria-disabled") === "true", "Moodle sin URL no crea una parada de teclado inoperante.");

console.log("Interacción del selector de planes completada sin errores.");
