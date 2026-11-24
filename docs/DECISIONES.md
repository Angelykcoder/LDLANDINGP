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
- **Planes:** solo los nombres prescritos, Feature 1, Feature 2, Feature 3 y botones de consulta; sin precios ni cantidades.
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
- El contacto prioritario ofrece acceso directo a Facebook, Instagram y TikTok. WhatsApp conserva una tarjeta pendiente y un acceso movil oculto; ambos aparecen como enlaces activos al completar `whatsappNumber` en `js/config.js`.
