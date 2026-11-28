# WALED Innovations — landing institucional

Sitio web institucional estático para presentar los programas de capacitación de WALED Innovations. El proyecto se construye con Node.js, HTML, CSS y JavaScript sin framework, y está preparado para publicarse en Netlify desde el directorio `dist/`.

## Estado actual

**Estado técnico:** build y pruebas aprobados; versión de revisión desplegada y verificada en Netlify.

**Sitio público:** [https://waledinnovations.netlify.app/](https://waledinnovations.netlify.app/)

**Decisión de lanzamiento oficial:** **NO APROBADO PARA PUBLICACIÓN OFICIAL** hasta completar los datos empresariales, la revisión jurídica y contable, y las validaciones sobre el dominio real.

El despliegue público actual contiene la identidad WI, la corrección del FAQ, las mejoras SEO y el prerender de ambas categorías de planes. Debe considerarse una versión técnica de revisión, no una aprobación jurídica, contable ni comercial definitiva.

La implementación actual incluye:

- Build de producción y verificaciones automatizadas.
- Navegación accesible por teclado, foco visible y menú móvil con Escape.
- Diseño responsive validado entre 375 px y 1920 px.
- SEO técnico, metadatos sociales, canonical, sitemap, robots y JSON-LD generados durante el build.
- Favicon tipográfico WI independiente del logo institucional, disponible en SVG, ICO, PNG y formato Apple Touch.
- Carga de YouTube únicamente después de la decisión expresa del visitante y mediante `youtube-nocookie.com`.
- Cabeceras de seguridad para Netlify. El repositorio no configura HSTS, pero la respuesta pública actual incluye `includeSubDomains` y `preload`; esta política externa debe revisarse antes del lanzamiento oficial.
- Footer con seis enlaces legales y siete documentos legales estructurados como borradores.
- Condiciones comerciales corregidas: acceso durante 30 días desde la activación y conferencia grupal mensual en el Plan Integral.
- Datos empresariales pendientes centralizados, sin valores ficticios.

El detalle de esta intervención, los pendientes y las limitaciones están en [docs/AUDITORIA_IDENTIDAD_PRODUCCION.md](docs/AUDITORIA_IDENTIDAD_PRODUCCION.md) y [docs/AUDITORIA_PRELANZAMIENTO.md](docs/AUDITORIA_PRELANZAMIENTO.md).

## Favicon y logo en las pestañas

El navegador usa la familia WI de `assets/icons/` como favicon. `index.html`, `404.html` y `legal/index.html` enlazan ICO, SVG, PNG de 16/32/48 px y Apple Touch de 180 px; el build los copia a `dist/assets/icons/` y las pruebas validan formato, dimensiones y respuesta HTTP 200.

Los archivos rasterizados se pueden reproducir sin dependencias con `npm.cmd run generate:favicons`. El logo horizontal e institucional no se modifica ni se usa como favicon.

Después de publicar una nueva versión, el navegador puede conservar el icono anterior en caché. En ese caso se debe hacer una recarga completa o limpiar la caché del sitio. La aparición del favicon en resultados de Google Search depende además de que Google vuelva a rastrear el dominio y no es inmediata.

## Requisitos

- Node.js 20, 22 o 24.
- npm.
- Chrome o Chromium para la prueba funcional de navegador.

El proyecto no tiene dependencias npm de producción.

## Comandos

```powershell
npm.cmd run build
npm.cmd run verify
npm.cmd audit --omit=dev
```

`npm.cmd run verify` genera `dist/` y ejecuta las auditorías estáticas, las pruebas de interacción y las comprobaciones SEO.

Para la prueba funcional en navegador, primero se debe servir el build:

```powershell
python -m http.server 8765 --directory dist
npm.cmd run test:browser
```

La prueba de navegador revisa las resoluciones 375, 390, 768, 1024, 1366, 1440 y 1920 px, además del menú móvil, selector y precios de planes, FAQ, canales de contacto, favicons, página 404, página legal, YouTube, almacenamiento, cookies y errores de consola.

## Resultados verificados

Resultados de la última auditoría local del 27 de noviembre de 2026:

| Verificación | Resultado |
|---|---|
| Build y pruebas automatizadas | Aprobado |
| Prueba funcional en Chrome | Aprobado |
| Responsive 375–1920 px | Aprobado, sin overflow |
| Errores de consola | 0 |
| `npm audit --omit=dev` | 0 vulnerabilidades |
| Lighthouse móvil | Performance 96, Accessibility 100, Best Practices 100, SEO 100 |
| Lighthouse escritorio | 100 en las cuatro categorías |
| LCP móvil de laboratorio | 2.7 s; mejoró frente a 3.2 s, pero aún no cumple de forma consistente el objetivo de 2.5 s |

Estas son mediciones locales de laboratorio, no datos reales de usuarios. La URL pública respondió 200 por HTTPS para la portada, `robots.txt` y la sección legal. También sirve CSP y las cabeceras defensivas configuradas.

### Estado comprobado en Netlify

- HTTPS operativo en `waledinnovations.netlify.app`.
- Portada, `robots.txt` y `/legal/` accesibles.
- Build configurado con `npm run build` y publicación exclusiva de `dist/`.
- Canonical, Open Graph, JSON-LD, sitemap y referencia de sitemap en `robots.txt` se generan con la URL de Netlify.
- HSTS requiere revisión: Netlify responde actualmente con `max-age=31536000; includeSubDomains; preload`, aunque `netlify.toml` no declara esa cabecera.

## Estructura principal

```text
index.html                         Página principal
404.html                           Página de error
css/                               Estilos fuente
js/                                Configuración e interacciones
img/                               Imágenes y logo
assets/icons/                      Familia de favicon WI
legal/                             Borradores legales públicos con noindex
content/business/                  Datos empresariales confirmados y pendientes
content/legal/                     Inventario de documentos legales
docs/                              Auditoría, decisiones y pendientes
docs/legal/                        Contrato institucional privado en borrador
scripts/                           Build y pruebas
netlify.toml                       Publicación y cabeceras de Netlify
dist/                              Build generado; no se versiona
```

## Documentos legales

Están preparados como **BORRADORES PENDIENTES DE REVISIÓN JURÍDICA**:

1. Política de privacidad.
2. Términos y condiciones.
3. Condiciones de contratación.
4. Política de cancelaciones y reembolsos.
5. Política de pagos y facturación.
6. Reglamento de capacitación y certificación.
7. Contrato de prestación de servicios para instituciones educativas.

Los seis documentos informativos aparecen en `legal/` con `noindex`. El contrato institucional permanece en `docs/legal/` y no se copia al sitio público.

## Información pendiente

Los valores pendientes se administran en `content/business/datos-empresariales.json` y actualmente permanecen en `null`:

- Nombre legal del prestador contractual.
- NIT y datos registrales.
- Correo empresarial.
- Teléfono y WhatsApp oficiales.
- URL definitiva de Moodle.
- Dominio personalizado definitivo, si sustituirá la URL de Netlify.
- Definición tributaria y de facturación.
- Datos bancarios para documentos privados, si corresponde.

## Qué falta para el lanzamiento oficial

1. Completar la identidad legal y los canales oficiales de contacto.
2. Obtener revisión jurídica de los siete borradores.
3. Obtener revisión contable y tributaria sobre SAT, IVA, facturas y comprobantes.
4. Confirmar el dominio personalizado, la estrategia de subdominios y la URL de Moodle; revisar también el tratamiento real de datos en Moodle.
5. Validar licencias de imágenes y logos de terceros.
6. Seguir midiendo el LCP móvil hasta sostener 2.5 s o menos; la medición local actual es 2.7 s y el despliegue de Netlify debe validarse con compresión real.
7. Probar con NVDA, VoiceOver y TalkBack en dispositivos reales.
8. Revisar la política HSTS efectiva de Netlify y volver a comprobar HTTPS, cabeceras, enlaces, favicon y consola después de cada despliegue.
9. Cuando exista contratación o registro web, implementar aceptaciones demostrables; no se simula actualmente una compra ni una casilla sin proceso contractual.

## Publicación

Netlify publica exclusivamente `dist/`. La URL pública se configura mediante la variable `URL` de Netlify o `SITE_URL` durante el build. Un dominio personalizado no debe fijarse hasta que el propietario confirme también la estrategia de subdominios y HSTS.

Este repositorio no debe considerarse jurídicamente aprobado por contener los borradores. La revisión técnica no sustituye la revisión de un abogado ni la revisión tributaria de un contador.
