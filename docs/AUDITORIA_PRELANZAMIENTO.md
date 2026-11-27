# Auditoría final pre-lanzamiento — Waled Innovations

Fecha: 26 de noviembre de 2026  
Alcance: revisión local del código y del artefacto de producción para Netlify. No se publicó el sitio ni se modificaron dominios, cuentas o credenciales.

## A. Estado general

**NO APROBADO PARA PUBLICACIÓN.**

La implementación técnica ya produce un artefacto estable y acotado para Netlify, pero faltan elementos que deben existir antes de una publicación empresarial: identificación/contacto verificable, política de privacidad, términos y condiciones, condiciones completas de contratación y revisión jurídica. El acceso genérico a WhatsApp Web tampoco constituye todavía un canal comercial directo.

## B. Tabla de auditoría

| Área | Estado | Observaciones |
|---|---|---|
| Legal y privacidad | FALLIDO | No existen política de privacidad, términos, identificación empresarial verificable ni condiciones completas de contratación. Requiere datos del propietario y revisión jurídica. |
| Cookies | CON OBSERVACIONES | No se detectaron cookies propias, analítica, píxeles, `localStorage` o `sessionStorage`. Existe un iframe de YouTube con dominio de privacidad mejorada; debe declararse y comprobarse en producción. No se justifica actualmente un banner ficticio. |
| Accesibilidad | CON OBSERVACIONES | Buena base semántica, foco visible, contraste AA calculado y movimiento reducido. Faltan pruebas manuales de teclado, lector de pantalla, zoom y reflow; no se declara conformidad WCAG completa. |
| Seguridad | CON OBSERVACIONES | Se añadieron CSP y cabeceras defensivas, y no se encontraron secretos ni dependencias vulnerables. HTTPS/HSTS y las cabeceras efectivas deben verificarse en el dominio desplegado. |
| SEO | CON OBSERVACIONES | Título, descripción, viewport, un H1, Open Graph, Twitter Card, favicon, robots y 404 están presentes. El build genera canonical, `og:url`, sitemap, imagen social y datos estructurados desde la URL pública; falta verificarlos en el despliegue definitivo. |
| Rendimiento | CON OBSERVACIONES | Recursos locales, hero AVIF, dimensiones explícitas, carga diferida donde corresponde y CSS combinado en producción. Lighthouse fue medido en laboratorio; Core Web Vitals de campo siguen pendientes. |
| Responsive | CON OBSERVACIONES | Se inspeccionaron capturas en 375, 390, 768, 1024, 1366, 1440 y 1920 px sin desbordamientos o solapamientos evidentes. El ajuste final del breakpoint de navegación requiere una última revisión visual en el despliegue. |
| Funcionalidad | CON OBSERVACIONES | Planes y navegación interna pasan validaciones; Moodle sigue visible, sin URL y con TODO. WhatsApp es solo referencia genérica; las redes deben probarse manualmente en producción. |
| Netlify | CON OBSERVACIONES | Build y artefacto local correctos; `netlify.toml` publica `dist/` y existe 404. Falta comprobar el comportamiento real tras desplegar, HTTPS, dominio y cabeceras servidas. |

## C. Errores y hallazgos

### Críticos

1. **Ausencia de documentación legal y privacidad.** Afecta al sitio completo y al footer. No se aplicó contenido inventado. Solución: aportar datos verificables y obtener textos revisados por un profesional jurídico en Guatemala.
2. **Identificación y contacto empresarial incompletos.** La configuración conserva datos provisionales y WhatsApp no tiene número. Solución: proporcionar razón social, datos comerciales y número internacional autorizado.
3. **PDF antiguo contradictorio retirado.** El PDF de referencia presentaba otra oferta y datos provisionales. Fue eliminado del repositorio por decisión explícita del propietario y no forma parte de la publicación.

### Altos

1. **No existía configuración de producción Netlify ni separación del material interno.** Se añadieron `package.json`, `netlify.toml` y `scripts/build.mjs`; Netlify publica exclusivamente `dist/`.
2. **No existían cabeceras de seguridad.** Se configuraron CSP, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` y HSTS sin `includeSubDomains` ni `preload`. Su entrega efectiva debe verificarse en Netlify.
3. **Condiciones comerciales incompletas.** Los precios y beneficios sí coinciden con la información oficial, pero faltan impuestos, vigencia, pagos, acceso, criterios de certificado, cancelaciones y alcance operativo. Requiere decisión del propietario y revisión jurídica.

### Medios

1. **Contenido crítico de planes dependía de JavaScript.** El build ahora prerenderiza las tarjetas desde `js/config.js`; `js/plans.js` evita duplicados.
2. **SEO técnico dependiente del despliegue.** Se añadieron Twitter Card, `og:site_name`, robots y 404. Canonical, sitemap, `og:url`, imagen social y JSON-LD se generan desde `URL` o `SITE_URL`, sin fijar un dominio en el código.
3. **Navegación de escritorio desaparecía en 768 y 1024 px sin menú alternativo.** Se redujo el breakpoint oculto a 672 px, sin rediseñar el componente.
4. **Dimensiones incorrectas de una imagen.** `contenido-multimedia.jpg` declaraba 1200 × 800; se corrigió a su proporción real 1200 × 1500 para reducir riesgo de CLS.
5. **Moodle se representaba como enlace sin destino.** Se mantuvo visible y sin URL inventada, añadiendo semántica de estado no disponible y preservando el TODO.

### Bajos

1. Optimizar o convertir `contenido-multimedia.jpg` y los PNG de Office/Google; el build ya combina las hojas CSS en producción.
2. Añadir Apple touch icon e imagen social cuando existan activos aprobados.
3. Anunciar consistentemente en lectores de pantalla los destinos externos; se mejoraron los accesos principales, pero conviene validación manual.

## D. Pruebas ejecutadas

- `npm.cmd run verify`: build de producción y 28 aserciones; **aprobado**.
- `npm.cmd audit --omit=dev`: **0 vulnerabilidades**, proyecto sin dependencias instaladas.
- `node --check js/config.js`, `js/plans.js`, `js/main.js`: **sin errores de sintaxis**.
- Parseo de `netlify.toml` con `tomllib`: **válido**.
- `git diff --check`: **sin errores de espacios**; únicamente avisos de normalización de finales de línea.
- Servidor HTTP local sobre `dist/`: `/`, `/404.html`, `/robots.txt`, CSS, JS, favicon, logo e imagen hero respondieron **200** con tipos MIME esperados.
- Inspección visual real mediante Chrome headless y capturas en 375, 390, 768, 1024, 1366, 1440 y 1920 px: no se observaron desbordamientos, cortes ni superposiciones evidentes antes del ajuste final de navegación.
- Cálculo de contraste de las combinaciones principales: razones entre 5.44:1 y 6.53:1, superiores al mínimo AA para texto normal evaluado.
- Búsqueda estática de formularios, cookies, almacenamiento, analítica, píxeles, `fetch`, secretos y archivos `.env`: no se encontraron formularios ni tecnologías de seguimiento o credenciales expuestas.

Después de esta auditoría se ejecutó Lighthouse en laboratorio: móvil 98/100/100/100 y escritorio 100/100/100/100. Los resultados y límites están en `docs/QA_PRIORIDAD_MEDIA.md`. No se ejecutaron axe, pa11y, Netlify CLI ni pruebas con lector de pantalla; tampoco existen todavía métricas de campo.

## E. Pendientes del propietario

1. Dominio definitivo y estrategia de subdominios.
2. Razón social/nombre legal, NIT cuando corresponda, dirección, correo y contacto empresarial.
3. Número internacional de WhatsApp autorizado.
4. URL definitiva de Moodle.
5. Confirmación manual de las URL de Facebook, Instagram y TikTok.
6. Condiciones comerciales completas: impuestos, factura, pagos, vigencia, acceso, certificado, cancelaciones, reembolsos, reprogramaciones y conferencias.
7. Política de privacidad y términos revisados por abogado; validación específica de los Decretos 06-2003 y 47-2008.
8. Confirmación/licencia del logo, fotografías y logos de terceros.
9. Verificar canonical, sitemap, imagen social y datos estructurados generados por el build cuando exista la URL pública definitiva.
10. Revisión manual de accesibilidad y prueba final en el despliegue de Netlify.

## F. Recomendación final

**No publicar todavía el sitio como lanzamiento oficial.** El proyecto ya puede compilarse y cargarse a un entorno de prueba de Netlify sin exponer los archivos internos, pero la publicación pública empresarial debe esperar a resolver los bloqueos legales, de identidad/contacto y condiciones comerciales. Después, ejecutar nuevamente `npm.cmd run verify`, comprobar cabeceras/HTTPS en el dominio, realizar Lighthouse y completar la pasada manual de accesibilidad y enlaces.

## Registro de archivos modificados por esta auditoría

- `.gitignore`
- `CODEX.md`
- `index.html`
- `js/main.js`
- `js/plans.js`
- `css/sections/product-refinements.css`
- `docs/DECISIONES.md`
- `docs/PENDIENTES.md`
- `docs/AUDITORIA_PRELANZAMIENTO.md`
- `package.json`
- `package-lock.json`
- `netlify.toml`
- `robots.txt`
- `404.html`
- `scripts/build.mjs`
- `scripts/audit.mjs`

El repositorio ya contenía otros cambios no relacionados o previos; no fueron revertidos.
