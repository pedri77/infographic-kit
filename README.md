# infographic-kit

Curated infographic generation wrapper over [@antv/infographic](https://github.com/antvis/Infographic). 20 templates, 5 themes, streaming-ready, LLM-friendly.

## Features

- **20 curated templates**: Lists, timelines, hierarchies, comparisons, charts, and relation diagrams
- **5 portfolio themes**: Corporate, MWI Dark, IAcademy Warm, Trigr Slate, Cyber Red
- **Streaming support**: Call `render()` repeatedly with growing text buffer for real-time LLM output
- **Claude Code skill**: Generate infographics from natural language via the included skill
- **Alias system**: Short memorable names (`process-steps`, `mindmap`, `funnel`) map to AntV built-in templates

## Quick Start

```bash
npm install
npm run dev
```

Open the demo page to see all 20 templates with live syntax editing.

## Usage

### Standalone HTML (no build tools)

```html
<script src="https://unpkg.com/@antv/infographic@0.2.19/dist/infographic.umd.min.js"></script>
<div id="container"></div>
<script>
  const ig = new AntVInfographic.Infographic({
    container: document.getElementById('container'),
    width: '100%',
    height: '100%',
  });
  ig.render(`
infographic sequence-steps-simple
data
  title My Process
  lists
    - label Step 1
      desc Start here
    - label Step 2
      desc Continue
    - label Step 3
      desc Done
  `);
</script>
```

### As ES Module

```typescript
import { InfographicKit } from 'infographic-kit';

const kit = new InfographicKit({
  container: '#my-container',
  theme: 'mwi-dark',
});

kit.render(`
infographic process-steps
data
  title Deployment Pipeline
  lists
    - label Build
      desc Compile and test
    - label Deploy
      desc Push to production
`);
```

### Preset Functions

```typescript
import { createTimeline } from 'infographic-kit';

createTimeline('#container', {
  title: 'Product Roadmap',
  items: [
    { label: 'Q1', desc: 'MVP Launch' },
    { label: 'Q2', desc: 'Scale' },
    { label: 'Q3', desc: 'Expand' },
  ],
  theme: 'corporate',
});
```

## Templates

| Category | Alias | Best For |
|----------|-------|----------|
| Lists | `list-horizontal`, `list-vertical`, `list-grid`, `list-icons`, `list-cards` | KPIs, features, services |
| Timeline | `timeline-vertical`, `timeline-horizontal`, `process-steps`, `snake-steps`, `funnel` | Roadmaps, workflows, funnels |
| Hierarchy | `mindmap`, `org-chart`, `pyramid` | Organizations, topics, maturity |
| Comparison | `pros-cons`, `vs-compare`, `swot` | Trade-offs, analysis |
| Charts | `pie-chart`, `bar-chart` | Data visualization |
| Relations | `flow-diagram`, `network` | Architecture, pipelines |

## Themes

| Name | Style | Mode |
|------|-------|------|
| `corporate` | Blue professional | Light |
| `mwi-dark` | Green cybersecurity | Dark |
| `iacademy-warm` | Amber educational | Light |
| `trigr-slate` | Indigo B2B | Light |
| `cyber-red` | Red alert | Dark |

## Claude Code Skill

Install the skill to generate infographics from Claude Code:

```bash
cp -r skills/infographic-kit ~/.claude/skills/
```

Then use natural language: "Create an infographic showing our deployment pipeline with 5 steps."

## Acknowledgements

This project is built on top of [AntV Infographic](https://github.com/antvis/Infographic) by the [AntV](https://antv.antgroup.com/) team at Ant Group. AntV Infographic is licensed under the [MIT License](https://github.com/antvis/Infographic/blob/main/LICENSE).

Core rendering engine, SVG generation, template system, theme engine, and syntax parser are all provided by `@antv/infographic`. This wrapper curates a subset of templates, adds portfolio-specific themes, and provides convenience APIs.

## License

MIT. See [LICENSE](./LICENSE).
