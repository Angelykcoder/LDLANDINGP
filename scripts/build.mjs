import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, "dist");
const rawSiteUrl = process.env.SITE_URL || process.env.URL || "";

const normalizeSiteUrl = (value) => {
  if (!value) return "";
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") throw new Error("La URL pública debe usar HTTPS.");
    return url.origin + url.pathname.replace(/\/$/, "");
  } catch (error) {
    throw new Error(`SITE_URL/URL inválida: ${error.message}`);
  }
};

const siteUrl = normalizeSiteUrl(rawSiteUrl);

if (output === root || output.length <= root.length || !output.endsWith("dist")) {
  throw new Error("Directorio de salida inseguro.");
}

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

const copy = (source, destination = source) => {
  const target = join(output, destination);
  mkdirSync(dirname(target), { recursive: true });
  cpSync(join(root, source), target, { recursive: true });
};

["404.html", "css", "js", "assets", "legal"].forEach((entry) => copy(entry));

[
  "img/waled-logo-horizontal.svg",
  "img/waled-logo-vertical-color.png",
  "img/office365-que-es-para-que-sirve.png",
  "img/google-workspace-apps.png",
  "img/contenido-multimedia.jpg",
  "img/ia-aplicada.jpg",
  "img/joven-profesora-rubia-usando-laptop-pie-jardin-infantes_839833-9717.avif"
].forEach((entry) => copy(entry));

const sandbox = { window: {} };
vm.runInNewContext(readFileSync(join(root, "js/config.js"), "utf8"), sandbox);
const category = sandbox.window.LD.config.planCategories.institutional;

const escapeText = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const planMarkup = category.plans.map((plan) => {
  const badge = plan.featured ? `<p class="plan-card__badge">${escapeText(plan.badge || "Plan destacado")}</p>` : "";
  const features = plan.features.map((feature) =>
    `<li><span class="plan-card__check" aria-hidden="true">✓</span>${escapeText(feature)}</li>`
  ).join("");
  const className = plan.featured ? "plan-card plan-card--featured" : "plan-card";
  const name = escapeText(plan.name);
  const contactLabel = escapeText(plan.contactLabel);

  return `<article class="${className}">${badge}<p class="plan-card__audience">${escapeText(category.audience)}</p><h3>${name}</h3><p class="plan-card__price">${escapeText(plan.price)}</p><ul class="plan-card__features">${features}</ul><a class="button plan-card__action" href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer" aria-label="Solicitar información sobre ${contactLabel}. Abre en una pestaña nueva." data-whatsapp data-whatsapp-plan="${contactLabel}">Solicitar información</a></article>`;
}).join("");

const sourceHtml = readFileSync(join(root, "index.html"), "utf8");
const marker = '<div class="plans__grid" data-render-plans data-active-category="institutional"></div>';
const seoMarker = "<!-- SEO_ABSOLUTE_URLS: el build de Netlify inserta canonical, Open Graph, sitemap y JSON-LD con la URL real. -->";
if (!sourceHtml.includes(marker)) throw new Error("No se encontró el contenedor de planes.");
if (!sourceHtml.includes(seoMarker)) throw new Error("No se encontró el marcador SEO.");

let productionHtml = sourceHtml.replace(marker, `<div class="plans__grid" data-render-plans data-active-category="institutional">${planMarkup}</div>`);
let robots = readFileSync(join(root, "robots.txt"), "utf8").trimEnd() + "\n";
const stylesheetLinks = [...sourceHtml.matchAll(/<link rel="stylesheet" href="(css\/[^"]+\.css)">/g)];

if (!stylesheetLinks.length) throw new Error("No se encontraron hojas de estilo para optimizar.");
const combinedCss = stylesheetLinks.map((match) => {
  return `/* ${match[1]} */\n${readFileSync(join(root, match[1]), "utf8").trim()}`;
}).join("\n\n");
writeFileSync(join(output, "css", "site.css"), combinedCss + "\n", "utf8");
productionHtml = productionHtml.replace(stylesheetLinks[0][0], '<link rel="stylesheet" href="css/site.css">');
stylesheetLinks.slice(1).forEach((match) => {
  productionHtml = productionHtml.replace(match[0], "");
});

if (siteUrl) {
  const pageUrl = `${siteUrl}/`;
  const socialImageUrl = `${siteUrl}/img/ia-aplicada.jpg`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Waled Innovations",
        url: pageUrl,
        logo: `${siteUrl}/img/waled-logo-horizontal.svg`,
        sameAs: [
          "https://www.facebook.com/profile.php?id=61596493307760",
          "https://www.instagram.com/waled.oficial/",
          "https://www.tiktok.com/@waled_innovations?lang=es"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: pageUrl,
        name: "Docentes digitales | Waled Innovations",
        inLanguage: "es-GT",
        publisher: { "@id": `${siteUrl}/#organization` }
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service`,
        name: "Capacitación digital docente",
        serviceType: "Capacitación en herramientas digitales para docentes",
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: { "@type": "Country", name: "Guatemala" },
        audience: [
          { "@type": "EducationalAudience", educationalRole: "teacher" },
          { "@type": "BusinessAudience", audienceType: "Instituciones educativas" }
        ]
      }
    ]
  };
  const seoMarkup = [
    `<link rel="canonical" href="${escapeText(pageUrl)}">`,
    `<meta property="og:url" content="${escapeText(pageUrl)}">`,
    `<meta property="og:image" content="${escapeText(socialImageUrl)}">`,
    '<meta property="og:image:type" content="image/jpeg">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="800">',
    '<meta property="og:image:alt" content="Computadora portátil mostrando un asistente de inteligencia artificial">',
    `<meta name="twitter:image" content="${escapeText(socialImageUrl)}">`,
    '<meta name="twitter:image:alt" content="Computadora portátil mostrando un asistente de inteligencia artificial">',
    `<script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`
  ].join("\n    ");
  productionHtml = productionHtml.replace(seoMarker, seoMarkup);
  robots += `Sitemap: ${siteUrl}/sitemap.xml\n`;
  writeFileSync(
    join(output, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${escapeText(pageUrl)}</loc></url>\n</urlset>\n`,
    "utf8"
  );
} else {
  console.warn("Aviso: canonical, sitemap, Open Graph absoluto y JSON-LD se generarán en Netlify usando URL, o localmente al definir SITE_URL.");
}

writeFileSync(
  join(output, "index.html"),
  productionHtml,
  "utf8"
);
writeFileSync(join(output, "robots.txt"), robots, "utf8");

console.log(`Build completado: ${output}`);
