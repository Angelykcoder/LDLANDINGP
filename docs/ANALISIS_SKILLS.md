# Análisis de skills de diseño — Fase 0

Evaluación para landing de conversión en HTML, CSS y JavaScript vanilla, dirigida a directores de colegios privados de Guatemala con poca familiaridad tecnológica. Prioridades: claridad, accesibilidad, confianza y poco movimiento. `CODEX.md` prevalece sobre las recomendaciones externas.

> Los cinco repositorios se clonaron solo para lectura. No se instalaron ni ejecutaron scripts, hooks, comandos, demos o descargas. El PDF `Docentes digitales.pdf` fue integrado en la raíz del proyecto y revisado para la fase de diseño.

## Resumen de veredictos

| Repositorio | Qué aporta / solapamiento | Encaje con este proyecto | Licencia | Veredicto |
|---|---|---|---|---|
| [design-motion-principles](../_research/skills/design-motion-principles/) | Guías para crear y auditar movimiento, recetas HTML/CSS y referencias de accesibilidad. Solapa con movimiento y estados en design-taste y taste-skill. | Aplicar solo propósito, moderación, frecuencia y `prefers-reduced-motion`; omitir experimentación y movimiento decorativo. | MIT | **USAR PARCIAL** |
| [awesome-claude-design](../_research/skills/awesome-claude-design/) | Catálogo de archivos DESIGN.md. Solapa con referencias visuales de paletas, tipografía y estilos de las demás. | No es skill de implementación y su flujo está orientado a Claude Design. Consultar ideas puntuales, sin importar sistemas enteros. | MIT | **USAR PARCIAL** |
| [ui-ux-promax](../_research/skills/ui-ux-promax/) | Datos de estilos, landing, paletas, tipografía y UX; generador y múltiples stacks. Se solapa ampliamente con design-taste y taste-skill. | Consultar pautas concretas de UX/conversión. No como dependencia: la CLI instala archivos, el stack predeterminado es html-tailwind y puede ofrecer soluciones genéricas/framework. | MIT | **USAR PARCIAL** |
| [design-taste](../_research/skills/design-taste/) | Guías de jerarquía, contraste, estados, movimiento, copy y revisión; sintetiza otras fuentes, incluido taste-skill. | Tomar listas concretas de contraste, foco y estados. No dejar que sus plantillas o prohibición de glassmorphism desplacen el diseño descrito en CODEX.md. | MIT y Apache-2.0; revisar `NOTICE` para procedencia por archivo. | **USAR PARCIAL** |
| [taste-skill](../_research/skills/taste-skill/) | Skill extensa de diseño/copy con escenas, efectos, fotos, automatizaciones y hooks. Alto solapamiento con design-taste y las demás. | Sus animaciones, momentos visuales y reglas rígidas son excesivos para el público y contradicen movimiento sutil/accesibilidad. Un hook `Stop` ejecuta `gate.mjs` automáticamente al instalarse/configurarse. | MIT | **DESCARTAR** |

## Scripts, hooks y riesgos observados

- **design-motion-principles:** workflows de creación/auditoría; la auditoría puede generar un HTML con demostraciones animadas y abrirlo. README propone instalación mediante `npx` o copia manual. No ejecutar ni instalar sin aprobación.
- **awesome-claude-design:** no hay scripts en el clon; README enlaza recursos externos y propone usar archivos en Claude Design. No se descargaron recursos externos.
- **ui-ux-promax:** incluye scripts Python para búsqueda/generación, sincronizador de CSV (`_sync_all.py`) y CLI que copia datos, scripts y plantillas a carpetas de skills. No se ejecutó Python, CLI ni `npx`. Incluye muestras React/Next/Tailwind.
- **design-taste:** `scripts/preflight.mjs` escanea archivos locales; `.mjs` adicionales son pruebas. `upstream-drift.sh` hace solicitudes HTTP con `curl`; `--snapshot` modifica hashes. No se ejecutó nada. Las plantillas contienen páginas demostrativas y contenido ficticio que no se debe reutilizar como hechos del cliente.
- **taste-skill:** incluye `install.sh`, múltiples scripts Node de inicio/captura/análisis/efectos, y hook `Stop` que busca y ejecuta `scripts/gate.mjs`; puede escribir `.taste-skill/gate-hook-missing.txt`. Requiere Node 22+ y navegador según su SKILL.md. No ejecutar instalador, hook, gate ni pruebas.
- Los cinco repositorios se clonaron desde las URLs de la guía anterior del proyecto en `_research/skills/`, que se añadió a `.gitignore`.

## Recomendación

Consultar las cuatro opciones **USAR PARCIAL** solo para principios puntuales; no instalar automáticamente sus scripts o plantillas. `taste-skill` queda descartada por el hook y el enfoque de movimiento/efectos. La implementación continúa con las skills aprobadas y el PDF de referencia integrado en la raíz del proyecto.
