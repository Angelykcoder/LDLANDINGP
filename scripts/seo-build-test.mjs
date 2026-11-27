import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const buildScript = join(root, "scripts", "build.mjs");
const testUrl = "https://example.com";

const runBuild = (env) => {
  const result = spawnSync(process.execPath, [buildScript], {
    cwd: root,
    env,
    encoding: "utf8"
  });
  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || "Falló el build SEO.");
  }
};

const assert = (condition, message) => {
  if (!condition) throw new Error("FAIL: " + message);
  console.log("PASS: " + message);
};

try {
  runBuild({ ...process.env, SITE_URL: testUrl });
  const html = readFileSync(join(root, "dist", "index.html"), "utf8");
  const robots = readFileSync(join(root, "dist", "robots.txt"), "utf8");
  const sitemap = readFileSync(join(root, "dist", "sitemap.xml"), "utf8");

  assert(html.includes('<link rel="canonical" href="https://example.com/">'), "El build genera canonical absoluto.");
  assert(html.includes('property="og:url" content="https://example.com/"'), "El build genera og:url absoluto.");
  assert(html.includes('property="og:image" content="https://example.com/img/'), "El build configura imagen Open Graph.");
  assert(html.includes('name="twitter:image" content="https://example.com/img/'), "El build configura imagen de Twitter.");
  assert(html.includes('type="application/ld+json"') && html.includes('"@type":"Service"'), "El build inserta Schema.org JSON-LD.");
  assert(sitemap.includes("<loc>https://example.com/</loc>"), "El sitemap contiene la URL canónica.");
  assert(robots.includes("Sitemap: https://example.com/sitemap.xml"), "robots.txt anuncia el sitemap.");
  assert(existsSync(join(root, "dist", "img", "ia-aplicada.jpg")), "La imagen social existe en producción.");
} finally {
  runBuild(process.env);
}

console.log("Generación SEO dependiente del dominio completada sin errores.");
