# WALED Innovations — landing institucional

Sitio web institucional estático para presentar los programas de capacitación de WALED Innovations. El proyecto se construye con Node.js, HTML, CSS y JavaScript sin framework, y está preparado para publicarse en Netlify desde el directorio `dist/`.

## Estado actual

**Estado técnico:** preparado para revisión mediante deploy preview.

**Decisión de lanzamiento oficial:** **NO APROBADO PARA PUBLICACIÓN OFICIAL** hasta completar los datos empresariales, la revisión jurídica y contable, y las validaciones sobre el dominio real.

La implementación actual incluye:

- Build de producción y verificaciones automatizadas.
- Navegación accesible por teclado, foco visible y menú móvil con Escape.
- Diseño responsive validado entre 375 px y 1920 px.
- SEO técnico, metadatos sociales, canonical, sitemap, robots y JSON-LD generados durante el build.
- Logo de WALED configurado como favicon en la página principal y la página 404.
- Carga de YouTube únicamente después de la decisión expresa del visitante y mediante `youtube-nocookie.com`.
- Cabeceras de seguridad para Netlify, sin HSTS agresivo hasta confirmar el dominio.
- Footer con seis enlaces legales y siete documentos legales estructurados como borradores.
- Condiciones comerciales corregidas: acceso durante 30 días desde la activación y conferencia grupal mensual en el Plan Integral.
- Datos empresariales pendientes centralizados, sin valores ficticios.

El detalle completo, la matriz de requisitos y las limitaciones están en [docs/AUDITORIA_PRELANZAMIENTO.md](docs/AUDITORIA_PRELANZAMIENTO.md).

## Favicon y logo en las pestañas

El navegador usa `img/waled-logo-vertical-color.png` como favicon. El archivo está enlazado desde `index.html` y `404.html`, se copia a `dist/img/` y una prueba automática verifica que exista en el build.

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

La prueba de navegador revisa las resoluciones 375, 390, 768, 1024, 1366, 1440 y 1920 px, además del menú móvil, la página legal, YouTube, almacenamiento, cookies y errores de consola.

## Resultados verificados

Resultados de la última auditoría local del 27 de noviembre de 2026:

| Verificación | Resultado |
|---|---|
| Build y pruebas automatizadas | Aprobado |
| Prueba funcional en Chrome | Aprobado |
| Responsive 375–1920 px | Aprobado, sin overflow |
| Errores de consola | 0 |
| `npm audit --omit=dev` | 0 vulnerabilidades |
| Lighthouse móvil | Performance 93, Accessibility 100, Best Practices 100, SEO 100 |
| Lighthouse escritorio | 100 en las cuatro categorías |
| LCP móvil de laboratorio | 3.2 s; no cumple todavía el objetivo de 2.5 s |

Estas son mediciones locales de laboratorio, no datos reales de usuarios. No se ha verificado todavía el HTTPS ni las cabeceras efectivamente servidas por el dominio definitivo.

## Estructura principal

```text
index.html                         Página principal
404.html                           Página de error
css/                               Estilos fuente
js/                                Configuración e interacciones
img/                               Imágenes y logo
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
- Dominio definitivo.
- Definición tributaria y de facturación.
- Datos bancarios para documentos privados, si corresponde.

## Qué falta para el lanzamiento oficial

1. Completar la identidad legal y los canales oficiales de contacto.
2. Obtener revisión jurídica de los siete borradores.
3. Obtener revisión contable y tributaria sobre SAT, IVA, facturas y comprobantes.
4. Confirmar el dominio y la URL de Moodle, y revisar el tratamiento real de datos en Moodle.
5. Validar licencias de imágenes y logos de terceros.
6. Mejorar y repetir el Lighthouse móvil hasta alcanzar un LCP de 2.5 s o menos de forma consistente.
7. Probar con NVDA, VoiceOver y TalkBack en dispositivos reales.
8. Crear un deploy preview autorizado y comprobar HTTPS, cabeceras, enlaces y consola sobre la URL servida.
9. Cuando exista contratación o registro web, implementar aceptaciones demostrables; no se simula actualmente una compra ni una casilla sin proceso contractual.

## Publicación

Netlify debe publicar exclusivamente `dist/`. El dominio público se configura mediante la variable `URL` de Netlify o `SITE_URL` durante el build. No se debe inventar ni fijar un dominio antes de su confirmación.

Este repositorio no debe considerarse jurídicamente aprobado por contener los borradores. La revisión técnica no sustituye la revisión de un abogado ni la revisión tributaria de un contador.
