import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const failures = [];
const pass = (message) => console.log(`PASS: ${message}`);
const assert = (condition, message) => condition ? pass(message) : failures.push(message);

const sourceHtml = readFileSync(join(root, "index.html"), "utf8");
const productionHtml = readFileSync(join(dist, "index.html"), "utf8");
const configCode = readFileSync(join(root, "js/config.js"), "utf8");
const baseCss = readFileSync(join(root, "css/base.css"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(configCode, sandbox);
const config = sandbox.window.LD.config;

const expectedCategories = {
  institutional: [
    ["Plan Esencial", "Q1,500", [
      "Acceso a la plataforma virtual.",
      "Capacidad para 10 profesores.",
      "Certificado digital.",
      "Elección de 1 curso para todos los profesores."
    ]],
    ["Plan Institucional", "Q2,600", [
      "Acceso a la plataforma virtual.",
      "Capacidad para 20 profesores.",
      "Certificado digital.",
      "Elección de 2 cursos.",
      "Cada profesor puede escoger los cursos que desea realizar."
    ]],
    ["Plan Integral", "Q3,900", [
      "Acceso a la plataforma virtual.",
      "Capacidad para 35 profesores.",
      "Certificado.",
      "Elección de 3 cursos.",
      "Cada profesor puede escoger los cursos que desea realizar.",
      "Conferencia en vivo para resolver dudas.",
      "Una conferencia semanal.",
      "Explicación y acompañamiento de los temas."
    ]]
  ],
  individual: [
    ["Plan Esencial", "Q175", [
      "Acceso a 1 curso.",
      "Acceso a la plataforma virtual.",
      "Duración de acceso: 30 días.",
      "Certificado digital por curso aprobado.",
      "Material de aprendizaje.",
      "Evaluaciones del curso."
    ]],
    ["Plan Profesional", "Q275", [
      "Acceso a 2 cursos.",
      "Acceso a la plataforma virtual.",
      "Duración de acceso: 30 días.",
      "Certificado digital por cada curso aprobado.",
      "Elección libre de los cursos.",
      "Material de aprendizaje.",
      "Evaluaciones de los cursos."
    ]],
    ["Plan Integral", "Q375", [
      "Acceso a 3 cursos.",
      "Acceso a la plataforma virtual.",
      "Duración de acceso: 30 días.",
      "Certificado digital por cada curso aprobado.",
      "Elección libre de los cursos.",
      "Material de aprendizaje.",
      "Evaluaciones de los cursos.",
      "Acompañamiento para resolver dudas."
    ]]
  ]
};

assert((sourceHtml.match(/<h1\b/g) || []).length === 1, "Existe un único H1.");
assert(sourceHtml.includes('lang="es"'), "El idioma del documento es español.");
assert(sourceHtml.includes('href="#contenido"'), "Existe enlace para saltar al contenido.");
assert(config.moodleUrl === "" && configCode.includes("TODO: Configurar aquí la URL definitiva"), "Moodle continúa sin URL inventada y conserva su TODO.");
assert(config.whatsappNumber === "", "No se inventó un número de WhatsApp.");
assert(sourceHtml.includes("data-video-embed") && !sourceHtml.includes('<iframe src="https://www.youtube'), "YouTube no se solicita antes del consentimiento.");
assert(sourceHtml.includes('data-moodle role="link" aria-disabled="true"') && sourceHtml.includes('tabindex="-1"'), "Moodle sin URL queda fuera del orden de tabulación.");
assert(sourceHtml.includes('aria-live="polite"') && sourceHtml.includes("data-plan-status"), "Los cambios de categoría tienen anuncio accesible.");
assert(!/html\s*\{[^}]*min-width/s.test(baseCss), "El documento no impone un ancho mínimo que bloquee el reflow.");
assert(sourceHtml.includes("SEO_ABSOLUTE_URLS") && sourceHtml.includes('twitter:card" content="summary_large_image"'), "El origen contiene el punto de inyección SEO y Twitter Card grande.");

Object.entries(expectedCategories).forEach(([categoryKey, expectedPlans]) => {
  const category = config.planCategories[categoryKey];
  assert(Boolean(category) && category.plans.length === 3, `${categoryKey} contiene exactamente tres planes.`);
  expectedPlans.forEach(([name, price, features], index) => {
    const plan = category.plans[index];
    assert(
      plan.name === name && plan.price === price && JSON.stringify(plan.features) === JSON.stringify(features),
      `${name} ${categoryKey} conserva precio y características exactas.`
    );
  });
});

const institutionalPlans = config.planCategories.institutional.plans;
const individualPlans = config.planCategories.individual.plans;
assert(institutionalPlans[1].featured === true && !institutionalPlans[2].featured, "Plan Institucional de Q2,600 es el único destacado institucional.");
assert(individualPlans[2].featured === true && individualPlans[2].badge === "Más conveniente", "Plan Integral individual usa el destaque discreto solicitado.");
assert(sourceHtml.indexOf(">Institucionales</button>") < sourceHtml.indexOf(">Individuales</button>"), "El selector presenta Institucionales antes de Individuales.");
assert(sourceHtml.includes('aria-selected="true"') && sourceHtml.includes('data-active-category="institutional"'), "Institucionales es la categoría inicial.");
assert((productionHtml.match(/class="plan-card(?: plan-card--featured)?"/g) || []).length === 3, "Producción prerenderiza tres planes institucionales.");
assert(productionHtml.includes("Q1,500") && productionHtml.includes("Q2,600") && productionHtml.includes("Q3,900"), "Producción prerenderiza los tres precios institucionales.");
assert(config.whatsappMessages.plan.includes("{plan}") && individualPlans.every((plan) => plan.contactLabel.includes("Individual")), "Los mensajes de contacto identifican los planes individuales.");

const ids = [...sourceHtml.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
assert(new Set(ids).size === ids.length, "No hay IDs duplicados.");

const fragments = [...sourceHtml.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
assert(fragments.every((fragment) => ids.includes(fragment)), "Todos los enlaces internos apuntan a IDs existentes.");

const localResources = [...sourceHtml.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map((match) => match[1])
  .filter((value) => !value.startsWith("#") && !value.startsWith("http") && value !== "/");
assert(localResources.every((resource) => existsSync(join(root, resource))), "Todos los recursos locales referenciados existen.");

const blankLinks = [...productionHtml.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)].map((match) => match[0]);
assert(blankLinks.every((link) => /rel="[^"]*noopener[^"]*"/.test(link)), "Todo enlace con target=_blank usa noopener.");

["CODEX.md", "docs", "tmp", ".git"].forEach((entry) => {
  assert(!existsSync(join(dist, entry)), `${entry} no se publica.`);
});

["404.html", "robots.txt", "assets/icons/favicon.svg"].forEach((entry) => {
  assert(existsSync(join(dist, entry)) && statSync(join(dist, entry)).size > 0, `${entry} está incluido en producción.`);
});

assert(existsSync(join(dist, "css/site.css")) && statSync(join(dist, "css/site.css")).size > 0, "Producción combina los estilos en una sola hoja CSS.");
assert((productionHtml.match(/<link rel="stylesheet"/g) || []).length === 1, "La página de producción solicita una sola hoja CSS.");

const netlify = readFileSync(join(root, "netlify.toml"), "utf8");
["Content-Security-Policy", "X-Content-Type-Options", "Referrer-Policy", "X-Frame-Options", "Permissions-Policy", "Strict-Transport-Security"].forEach((header) => {
  assert(netlify.includes(header), `Netlify declara ${header}.`);
});

if (failures.length) {
  failures.forEach((failure) => console.error(`FAIL: ${failure}`));
  process.exit(1);
}

console.log("Auditoría estática completada sin errores.");
