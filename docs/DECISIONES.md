# Decisiones de diseño

## Fase 0 y propuesta de Fase 1

- **design-motion-principles (uso parcial):** movimiento solo si ayuda a comprender, breve y con `prefers-reduced-motion`; no adoptar experimentación ni demos animadas.
- **design-taste (uso parcial):** usar sus comprobaciones de contraste, foco y estados. Seguir `CODEX.md` cuando sus reglas visuales entren en conflicto con el PDF/proyecto.
- **ui-ux-pro-max (uso parcial):** consulta puntual para patrones de landing y UX; no adoptar su CLI, frameworks ni generación automática.
- **awesome-claude-design:** índice de inspiración en `_research/skills/`, no se instala como skill.
- **taste-skill:** descartada por el hook automático y el enfoque de movimiento/efectos.
- **Referencia visual:** conservar el azul de la identidad, con fondo claro, tipografía sans legible, bordes discretos y menos efectos para una lectura empresarial.
- **Logos:** por instrucción del usuario, mostrar los logos de Office y Google Workspace proporcionados en el PDF, únicamente junto a sus respectivos temas.
- **Presentación:** al no haber video disponible, explicar el enfoque de aprendizaje con una fotografía ilustrativa y un pie descriptivo, sin simular reproducción.
- **Planes (decisión superada):** la primera versión usó placeholders sin precios; fue reemplazada por los paquetes comerciales oficiales descritos más abajo.
- **Accesibilidad/conversión:** mobile-first, contraste AA, texto base mínimo 18 px, botones de al menos 48 px, foco visible, teclado y CTA principal consistente.
- **Marca y contactos:** datos provisionales únicamente desde `js/config.js`.
- **Marca visible:** a petición del usuario, usar Waled Innovations. El logotipo horizontal actual es una reconstrucción SVG basada en la vista previa anterior; volver a poner el archivo original para recuperar su fidelidad exacta.
- **Alcance:** no se añade «Cómo funciona» sin aprobación.

## Fase 2: base y secciones

- **Jerarquía del hero:** usar una sans del sistema, encabezado ajustado para mantener el CTA visible, párrafo directo y CTA azul.
- **Fotografía:** usar `istockphoto-1366724990-612x612.jpg` en el hero y `istockphoto-1329104242-612x612.jpg` en la sección de capacitación. Son imágenes ilustrativas de docentes; no se presentan como clientes ni testimonios.
- **Movimiento:** no animar los elementos decorativos; los controles solo dan feedback breve al presionar y se respeta `prefers-reduced-motion`.
- **Problemas y aprendizaje:** conservar los grupos solicitados en tarjetas claras con bordes discretos; colocar los logos restaurados dentro de sus temas correspondientes.
- **Preguntas frecuentes:** usar `<details>` y `<summary>` nativos para interacción accesible sin JavaScript adicional.
- **Planes:** renderizar desde `js/config.js` para que sus contenidos se editen en un solo lugar.
- **QA:** Chrome abrió el documento local y renderizó la landing a resolución de escritorio. La captura automatizada falló por un cierre del proceso GPU; los tamaños móviles y la interacción por clic siguen pendientes.

## Actualizacion mas reciente

- La tipografia vigente es IBM Plex Sans, autoalojada en `assets/fonts/` bajo la licencia incluida en el proyecto.
- El espacio audiovisual de presentacion usa el video de YouTube indicado por el usuario y el reproductor `youtube-nocookie.com`.
- Las tarjetas de Office y Workspace muestran los logos proporcionados a una escala uniforme; multimedia e IA usan fotografias de Unsplash documentadas en `docs/ASSETS.md`.
- El contacto prioritario muestra primero WhatsApp, seguido de Facebook, Instagram y TikTok. Mientras no exista un número confirmado, WhatsApp abre la web oficial como referencia; al completar `whatsappNumber`, los mismos accesos cambian a una conversación directa con mensaje prellenado.

## Refinamiento comercial y visual

- Se toma de Platzi la jerarquía comercial, el contraste entre bloques, la repetición moderada de CTA y la presentación clara de beneficios, sin copiar su composición ni identidad.
- El Hero usa la nueva imagen AVIF proporcionada por el usuario, con proporción 3:2 y `object-fit: cover` para conservar su aspecto sin deformación.
- La decisión previa de retirar «En 1 mes» quedó superada: el usuario pidió restaurar literalmente el mensaje original en el Hero.
- Las ondas verticales se implementan con CSS y movimiento lento; se detienen con `prefers-reduced-motion`.
- Se incorpora una barra flotante con los perfiles sociales existentes. WhatsApp abre temporalmente WhatsApp Web y cambia a una conversación directa cuando se configura el número real.
- El acceso a Moodle se configura en un único campo de `js/config.js`; mientras la URL esté vacía, se muestra sin navegación.

## Planes comerciales oficiales

- Los planes Esencial, Institucional e Integral muestran los precios, capacidades, cursos y condiciones proporcionados por el usuario, editables desde `js/config.js`.
- **Destaque anterior superado:** el Plan Integral fue destacado en la primera versión institucional; la estructura por categorías posterior trasladó el protagonismo al Plan Institucional de Q2,600.
- Se restaura literalmente el mensaje principal «Docentes digitales» y «En 1 mes, tus docentes usan la tecnología que tu colegio ya paga.» por instrucción del usuario.
- Los accesos de Facebook, Instagram y TikTok reutilizan símbolos SVG de marca consistentes en la sección de contacto y la barra flotante.

## Preparación de producción

- Netlify publica exclusivamente `dist/`, generado con `npm run build`; documentos internos, PDF antiguo, capturas temporales y metadatos del repositorio quedan fuera del artefacto.
- Los planes se prerenderizan en producción desde la misma configuración central de `js/config.js`; JavaScript evita duplicarlos si el HTML ya los contiene.
- Se añadieron cabeceras defensivas compatibles con los recursos observados. HSTS se pospone hasta conocer el dominio definitivo y validar HTTPS/subdominios.
- No se crea un banner de cookies: no se detectaron analítica, píxeles, almacenamiento local ni cookies propias. El reproductor de YouTube requiere volver a validarse en el sitio desplegado y explicarse en la futura política de privacidad.
- La auditoría pre-lanzamiento completa y sus límites se registran en `docs/AUDITORIA_PRELANZAMIENTO.md`.

## Categorías de planes

- La sección presenta primero `Institucionales` y después `Individuales` mediante un control segmentado con semántica de tabs, clic y navegación por flechas/Home/End.
- Los datos de ambas categorías viven por separado en `planCategories` dentro de `js/config.js`; las tarjetas reutilizan un único renderizador.
- El Plan Institucional de Q2,600 es el único destacado en la categoría institucional. El Plan Integral de Q3,900 deja de estar destacado.
- El Plan Integral individual de Q375 utiliza la etiqueta discreta «Más conveniente».
- El build prerenderiza la categoría institucional para que el contenido inicial no dependa de JavaScript; el script hidrata el selector y reemplaza las tarjetas al cambiar de categoría.
- Los CTA conservan el flujo centralizado de WhatsApp y transmiten una etiqueta con categoría, nombre y precio cuando exista un número configurado.
- En escritorio se usan tres columnas; en tablet, dos columnas y la tercera tarjeta centrada; en móvil, una sola columna para evitar compresión y desbordamiento.

## Accesibilidad, privacidad y SEO técnico

- Se elimina el ancho mínimo global y se añaden ajustes para viewports estrechos, permitiendo reflow equivalente a zoom elevado sin ocultar desbordamientos.
- El control de planes anuncia su categoría mediante una región `aria-live`; Moodle sin URL queda fuera del orden de tabulación.
- Escape cierra una pregunta frecuente abierta y descarga el iframe de YouTube cuando el foco está en sus controles; los botones nativos conservan Enter y Espacio.
- YouTube usa una fachada de consentimiento: el iframe `youtube-nocookie.com` solo se crea después de activar «Cargar presentación en video».
- El build combina las hojas CSS para la página principal, manteniendo los archivos fuente modulares para desarrollo.
- Netlify proporciona `URL` durante el build; con ella se generan canonical, `og:url`, imagen social, sitemap, robots y un grafo Schema.org sin inventar dominio.
- HSTS se configura con `max-age=31536000`, sin `includeSubDomains` ni `preload`, para evitar comprometer subdominios todavía no definidos.
- Lighthouse final: móvil 98/100/100/100 y escritorio 100/100/100/100. Los detalles y límites se registran en `docs/QA_PRIORIDAD_MEDIA.md`.

## Decisiones comerciales para coherencia legal

- El paquete Integral institucional incluye una conferencia semanal, no mensual.
- El documento de finalización se denomina «certificado privado de capacitación» y se entrega cuando se cumplen los requisitos de aprobación. No se presenta como certificación oficial ni con reconocimiento público.
- La duración del acceso es variable y se acuerda al contratar; no se promete un período fijo de 30 días en el sitio.
- Los planes individuales se mantienen. Sus condiciones legales deberán adaptarse expresamente al comprador individual antes de publicarse, sin asumir que el contrato institucional aplica sin cambios.
- El contrato de prestación de servicios no será público: se entregará de forma privada a cada colegio y quedará fuera de `content/legal/`, `dist/`, el sitemap y el footer.
