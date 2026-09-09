# infographic-kit — contexto para agentes

Wrapper sobre `@antv/infographic` para generar infografías SVG: 20 plantillas curadas con alias, 5 temas de portfolio y soporte de streaming pensado para salida de LLM. Librería npm (ESM + UMD) con demo Vite y skill de Claude Code incluido.

## Mapa del repo
- `src/index.ts` — API pública: clase `InfographicKit`, presets (`createTimeline`, etc.), sistema de alias.
- `src/templates/` — curación de plantillas (`portfolio.ts`) y exportación (`index.ts`); mapea alias → plantillas AntV.
- `src/themes/riskitera.ts` — temas de portfolio (corporate, mwi-dark, iacademy-warm, trigr-slate, cyber-red).
- `demo/index.html` — página demo con las 20 plantillas y edición de sintaxis en vivo.
- `skills/infographic-kit/SKILL.md` — skill de Claude Code para generar infografías desde lenguaje natural (se instala copiando a `~/.claude/skills/`).
- `vite.config.ts` — build de librería (ES + UMD, `@antv/infographic` como external, salida en `dist/`).
- Entry point: `src/index.ts`. Sin CI ni deploy observado (repo GitHub `origin/main`, no hay `.github/`).

## Stack y comandos
- Stack: TypeScript + Vite 7, única dependencia de runtime `@antv/infographic` fijada a `0.2.19`.
- Instalar: `npm install`
- Demo en local: `npm run dev` (vite demo)
- Construir librería: `npm run build` (vite build + `tsc --emitDeclarationOnly` → `dist/`)
- Preview del build: `npm run preview`
- Tests: sin suite de tests.

## Estado y últimos cambios
- Rama única `main` (sync con `origin/main`). Historial mínimo: un solo commit `39e7cea feat: initial infographic-kit MVP` (proyecto recién creado).
- TODO/FIXME: ninguno (búsqueda `rg -n 'TODO|FIXME'` sin resultados fuera de node_modules).
- Todo el trabajo futuro parte del MVP inicial; no hay documentación adicional (sin `docs/`).

## Reglas del proyecto
- Idioma: código e identificadores en inglés; commits en inglés con prefijo conventional (`feat:`).
- La sintaxis de render es texto indentado (`infographic <alias>` + bloque `data`); los alias están en `src/templates/portfolio.ts` y la tabla del README.
- No tocar `package-lock.json` a mano; dependencia principal fijada exacta (`0.2.19`) — mantener el pin al actualizar.
- Antes de dar algo por hecho: `npm run build` debe compilar y la demo (`npm run dev`) debe renderizar la plantilla tocada.

## Riesgos detectados
- ninguno observado (sin secretos, sin rutas hardcodeadas, dependencia runtime fijada exacta; `^` solo en devDependencies).
