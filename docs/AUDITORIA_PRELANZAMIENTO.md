# Auditoría final pre-lanzamiento — Waled Innovations

Fecha de ejecución: 27 de noviembre de 2026.
Alcance: repositorio local, artefacto `dist/` y servidor HTTP local. Al finalizar, el propietario autorizó versionar y enviar los cambios a `origin/main`; no se inició un despliegue manual ni se cambió el dominio.

## 1. Decisión ejecutiva

**NO APROBADO PARA PUBLICACIÓN OFICIAL.**

La landing quedó técnicamente preparada para un despliegue de prueba: compila, sus pruebas automáticas pasan, no presenta overflow en las siete resoluciones solicitadas, obtiene 100 en accesibilidad/SEO/prácticas recomendadas de Lighthouse y separa los borradores legales de la información interna. El lanzamiento oficial continúa bloqueado por identidad y contactos pendientes, revisión jurídica y contable, falta de dominio/Moodle definitivos, ausencia de verificación del despliegue real y LCP móvil de laboratorio por encima del objetivo.

La revisión técnica no sustituye la revisión jurídica de un abogado ni la revisión tributaria de un contador.

## 2. Estado inicial del repositorio y Git

| Requisito | Estado inicial | Acción ejecutada | Estado final |
|---|---|---|---|
| Rama | `main`, un commit detrás de `origin/main` | `git fetch origin` y fast-forward inspeccionado | `main` alineada con `origin/main` en `e4154bb` |
| Cambios del propietario | `docs/DECISIONES.md` y `docs/PENDIENTES.md` modificados | Se conservaron y ampliaron; no se hizo reset ni checkout | Preservados |
| Build | Correcto, pero la copia del favicon estaba en el commit remoto pendiente | Sincronización conservadora | Corregido |
| Documentos legales | `content/legal/documentos.json` contenía `documents: []` | Se creó inventario y borradores | Siete documentos estructurados |
| Footer legal | No existía | Se añadió «Información legal» | Funcional |
| Dominio y Moodle | No configurados | Se mantuvieron sin inventar | Pendientes |

No se detectaron conflictos. El commit y el push fueron autorizados posteriormente por el propietario. No se ejecutó una publicación manual; si Netlify está conectado a `main`, el push puede activar su flujo automático configurado externamente.

## 3. Implementaciones y correcciones

### Accesibilidad y navegación

- Enlace para saltar al contenido conservado y verificado.
- Menú móvil accesible con botón nativo, `aria-expanded`, `aria-controls`, apertura mediante Enter/Espacio, cierre con Escape y retorno del foco.
- Selector de planes con tabs, flechas, Home/End, estados seleccionados y anuncios `aria-live` conservado y probado.
- Escape cierra FAQ abierta y reproductor de YouTube; el foco vuelve al control correspondiente.
- Moodle sin URL permanece fuera del orden de tabulación, sin destino falso.
- Foco visible, modo de alto contraste, movimiento reducido, jerarquía de encabezados, etiquetas accesibles e imágenes con texto alternativo revisados.
- Reflow corregido para 375 y 390 px sin ocultar overflow global.

### Condiciones comerciales

- Estado superado por el expediente v0.3: los planes institucionales usan **30 días desde el primer lunes siguiente a la contratación**; los individuales conservan provisionalmente 30 días desde la activación.
- Estado superado por el expediente v0.3: el Plan Integral institucional incluye **una conferencia grupal semanal por Google Meet**.
- Precios existentes preservados.
- Respuesta del certificado ampliada: nota mínima 61/100, proyectos, certificado digital privado, identificación de verificación y ausencia de reconocimiento oficial.

### Privacidad y terceros

- YouTube continúa sin iframe ni solicitud externa antes de una acción explícita.
- El iframe usa `youtube-nocookie.com` y puede descargarse con Escape o «Cerrar video».
- No se detectaron cookies propias, Google Analytics, píxeles, `localStorage` ni `sessionStorage`.
- No se añadió un banner de cookies ficticio.
- Se añadió aviso transparente junto a los canales externos de contacto.

### SEO

- Título, descripción, viewport, `robots`, Open Graph, Twitter Card, favicon y un único H1 verificados.
- El build genera canonical absoluto, `og:url`, imagen social, sitemap y JSON-LD cuando Netlify proporciona `URL` o se define `SITE_URL` HTTPS.
- Schema.org usa `Organization`, `WebSite` y `Service` sin dirección legal, teléfono, reseñas, acreditaciones o identificadores inventados.
- Los borradores legales usan `noindex, follow`; por ello no se incluyen en el sitemap.

### Seguridad y Netlify

- `netlify.toml` publica exclusivamente `dist/`.
- CSP restringe scripts, estilos, imágenes, fuentes, conexiones y frames; permite únicamente `youtube-nocookie.com` para video.
- Configurados `Cross-Origin-Opener-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-DNS-Prefetch-Control` y `X-Permitted-Cross-Domain-Policies`.
- HSTS fue retirado hasta verificar el dominio definitivo, HTTPS y subdominios; no se usa `includeSubDomains` ni `preload`.
- Todos los enlaces con `target="_blank"` usan `noopener noreferrer`.
- `npm audit --omit=dev`: 0 vulnerabilidades.

### Rendimiento

- Hero en AVIF, con dimensiones y prioridad alta.
- Imágenes secundarias usan lazy loading y dimensiones reservadas.
- Fuentes WOFF2 autoalojadas con `font-display: swap`.
- CSS de producción combinado en una sola hoja.
- YouTube no bloquea la carga inicial.
- Lighthouse todavía identifica aproximadamente 417 KiB potenciales de ahorro en imágenes secundarias y 11 KiB de CSS no utilizado.

## 4. Documentación legal preparada

Todos los textos se identifican como **BORRADORES PENDIENTES DE REVISIÓN JURÍDICA**.

| Documento | Ubicación | Estado |
|---|---|---|
| Política de privacidad | `legal/#privacidad` | Borrador público, `noindex` |
| Términos y condiciones | `legal/#terminos` | Borrador público, `noindex` |
| Condiciones de contratación | `legal/#contratacion` | Borrador público, `noindex` |
| Cancelaciones y reembolsos | `legal/#cancelaciones` | Borrador público, `noindex` |
| Pagos y facturación | `legal/#pagos` | Borrador público; requiere también revisión contable |
| Reglamento de capacitación y certificación | `legal/#certificacion` | Borrador público, `noindex` |
| Contrato institucional | `docs/legal/CONTRATO_PRESTACION_SERVICIOS_INSTITUCIONES.md` | Borrador privado, excluido de `dist/` |

El inventario se mantiene en `content/legal/documentos.json`. El futuro mecanismo de aceptación se especifica en `docs/ACEPTACION_CONTRACTUAL.md`; no se implementó una casilla ficticia porque actualmente no existe formulario, registro ni compra web.

## 5. Datos empresariales centralizados

`content/business/datos-empresariales.json` contiene los datos confirmados y mantiene `null` para:

- Verificación registral y de representación de `WALED INNOVATION S.A.`.
- NIT y datos registrales.
- Correo empresarial.
- Teléfono y WhatsApp.
- URL definitiva de Moodle.
- Dominio definitivo.
- Datos bancarios privados.

El tratamiento tributario, IVA y facturación figura como pendiente de revisión contable. La versión pública no conserva direcciones ni datos personales y usa únicamente `WALED INNOVATION S.A.`, pendiente de verificación registral.

## 6. Pruebas ejecutadas

| Prueba | Resultado |
|---|---|
| `npm.cmd run verify` | APROBADA |
| Auditoría estática de contenido, recursos, planes, legal y Netlify | APROBADA |
| Interacción de planes, teclado, FAQ, Moodle y YouTube | APROBADA |
| Build SEO con URL HTTPS controlada | APROBADA |
| `npm.cmd run test:browser` | APROBADA |
| Resoluciones 375, 390, 768, 1024, 1366, 1440 y 1920 px | APROBADAS, sin overflow |
| Menú móvil y Escape | APROBADA |
| Página legal a 390 px | APROBADA |
| Consola de Chrome | 0 errores |
| YouTube antes del consentimiento | 0 iframes y 0 solicitudes externas |
| Cookies/localStorage/sessionStorage | 0 elementos |
| Recursos HTTP locales principales | 200 y tipos MIME esperados |
| `node --check` en JavaScript | APROBADA |
| Parseo de `netlify.toml` | APROBADA |
| `git diff --check` | APROBADA; solo avisos de finales de línea |
| `npm.cmd audit --omit=dev` | 0 vulnerabilidades |

## 7. Lighthouse y Core Web Vitals

Lighthouse 13.6.0, servidor local sobre el build de producción. Son métricas de laboratorio.

| Perfil | Performance | Accessibility | Best Practices | SEO | FCP | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Móvil | 93 | 100 | 100 | 100 | 1.1 s | 3.2 s | 0 | 20 ms |
| Escritorio | 100 | 100 | 100 | 100 | 0.3 s | 0.7 s | 0 | 0 ms |

- **LCP móvil:** FALLIDO respecto al objetivo de 2.5 s.
- **LCP escritorio:** aprobado en laboratorio.
- **CLS:** aprobado en ambos perfiles.
- **INP:** Lighthouse no proporciona un dato de campo válido. TBT no debe presentarse como INP.
- No existen datos reales de usuarios suficientes para informar Core Web Vitals de campo.

## 8. Matriz final

| Área | Clasificación | Evidencia o bloqueo |
|---|---|---|
| Build y artefacto Netlify | COMPLETADO Y VERIFICADO | Build y recursos locales aprobados |
| Accesibilidad automatizada | COMPLETADO Y VERIFICADO | Lighthouse 100, teclado e interacciones automáticas aprobadas |
| Lectores de pantalla reales | IMPLEMENTADO, PENDIENTE DE VERIFICACIÓN | Faltan NVDA, VoiceOver y TalkBack en dispositivos reales |
| Responsive y reflow | COMPLETADO Y VERIFICADO | Siete resoluciones sin overflow |
| SEO técnico generado | COMPLETADO Y VERIFICADO | Prueba con URL HTTPS controlada aprobada |
| SEO en dominio definitivo | PENDIENTE POR INFORMACIÓN | Falta dominio |
| Privacidad previa a YouTube | COMPLETADO Y VERIFICADO | Sin tercero antes del consentimiento |
| Footer legal | COMPLETADO Y VERIFICADO | Seis enlaces funcionales |
| Borradores legales | IMPLEMENTADO, PENDIENTE DE VERIFICACIÓN | Requieren aprobación del propietario |
| Validez jurídica | BLOQUEADO POR REVISIÓN EXTERNA | Requiere abogado |
| Impuestos y facturación | BLOQUEADO POR REVISIÓN EXTERNA | Requiere contador y formalización SAT |
| Identificación/contacto | PENDIENTE POR INFORMACIÓN | Campos centralizados en `null` |
| Moodle y tratamiento real de datos | PENDIENTE POR INFORMACIÓN | Falta URL/acceso |
| Seguridad configurada | COMPLETADO Y VERIFICADO | TOML y CSP comprobados localmente |
| Cabeceras/HTTPS servidos | IMPLEMENTADO, PENDIENTE DE VERIFICACIÓN | Falta despliegue o dominio verificable |
| Dependencias | COMPLETADO Y VERIFICADO | 0 vulnerabilidades |
| Performance escritorio | COMPLETADO Y VERIFICADO | Lighthouse 100, LCP 0.7 s |
| Performance móvil | IMPLEMENTADO, PENDIENTE DE VERIFICACIÓN | Score 93; LCP 3.2 s no cumple objetivo |
| INP y datos de campo | IMPLEMENTADO, PENDIENTE DE VERIFICACIÓN | Solo puede medirse con usuarios reales |

## 9. Riesgos y limitaciones

- Los borradores legales no deben presentarse como documentos definitivos.
- No se inspeccionó una instancia real de Moodle ni sus respaldos, roles, cookies o retención efectiva.
- No se verificaron cabeceras de una respuesta real de Netlify porque no existe dominio o URL confirmada en el repositorio.
- No se ejecutaron pruebas manuales con tecnologías de asistencia.
- Las capturas son Chrome headless; no sustituyen pruebas físicas en iOS/Safari y Android/TalkBack.
- El LCP móvil local no cumple el objetivo recomendado.
- Licencias del hero y logos de Microsoft/Google siguen pendientes de confirmación.

## 10. Pendientes del propietario y externos

1. Proporcionar identidad legal del prestador, NIT/datos registrales cuando correspondan y firmantes.
2. Confirmar correo, teléfono y WhatsApp oficiales.
3. Confirmar dominio y URL de Moodle.
4. Obtener revisión jurídica de los siete documentos.
5. Obtener revisión contable/tributaria de IVA, factura, SAT y comprobantes.
6. Confirmar datos bancarios únicamente para documentos privados.
7. Definir días hábiles o calendario para reembolsos y reglas de reprogramación.
8. Confirmar licencias de imágenes y logos de terceros.
9. Optimizar imágenes secundarias y repetir Lighthouse móvil hasta conseguir LCP ≤ 2.5 s de forma consistente.
10. Ejecutar deploy preview autorizado, validar HTTPS/cabeceras y realizar pruebas manuales con lectores de pantalla.

## 11. Recomendación de despliegue

El proyecto puede utilizarse en un **deploy preview privado o de revisión** cuando el propietario lo autorice. Antes del lanzamiento oficial deben completarse los bloqueos legales, contables y de identidad/contacto, mejorar o aceptar formalmente el riesgo de LCP móvil y repetir todas las comprobaciones sobre la URL real.

**Decisión final: NO APROBADO PARA PUBLICACIÓN OFICIAL.**
