---
name: infographic-kit
description: Generate infographic visualizations using @antv/infographic with 20 curated templates and portfolio themes
trigger: When the user wants to create an infographic, data visualization card, process diagram, timeline, comparison, or any visual data presentation
---

# infographic-kit

Generate professional infographics using `@antv/infographic` (MIT). 20 curated templates, 5 themes, streaming-ready.

## How it works

Write infographic syntax (indentation-based, like YAML) and render it as SVG. The engine is tolerant to partial input — ideal for LLM streaming.

## Available Templates (20)

### Lists
| Alias | AntV Name | Best for |
|-------|-----------|----------|
| `list-horizontal` | `list-row-simple-horizontal-arrow` | KPIs, metrics side-by-side |
| `list-vertical` | `list-column-simple-vertical-arrow` | Stacked items with flow |
| `list-grid` | `list-grid-compact-card` | Feature grids, service cards |
| `list-icons` | `list-grid-simple` | Icon + label grids |
| `list-cards` | `list-grid-badge-card` | Rich cards with badges |

### Sequences / Timelines
| Alias | AntV Name | Best for |
|-------|-----------|----------|
| `timeline-vertical` | `sequence-roadmap-vertical-simple` | Roadmaps, milestones |
| `timeline-horizontal` | `sequence-timeline-simple` | Chronological events |
| `process-steps` | `sequence-steps-simple` | Workflows, onboarding |
| `snake-steps` | `sequence-snake-steps-simple` | Long processes (6+ steps) |
| `funnel` | `sequence-funnel-simple` | Sales funnels, conversions |

### Hierarchy
| Alias | AntV Name | Best for |
|-------|-----------|----------|
| `mindmap` | `hierarchy-mindmap-right-simple` | Topic exploration, brainstorming |
| `org-chart` | `hierarchy-tree-vertical-simple` | Organizations, taxonomies |
| `pyramid` | `list-pyramid-rounded-rect-node` | Maturity models, priorities |

### Comparison
| Alias | AntV Name | Best for |
|-------|-----------|----------|
| `pros-cons` | `compare-binary-horizontal-simple-fold` | Pros/cons, trade-offs |
| `vs-compare` | `compare-binary-horizontal-simple-vs` | A vs B comparisons |
| `swot` | `compare-swot` | SWOT analysis |

### Charts
| Alias | AntV Name | Best for |
|-------|-----------|----------|
| `pie-chart` | `chart-pie-simple` | Distribution, proportions |
| `bar-chart` | `chart-bar-plain-text` | Quantities, rankings |

### Relations
| Alias | AntV Name | Best for |
|-------|-----------|----------|
| `flow-diagram` | `relation-dagre-flow-simple` | System flows, pipelines |
| `network` | `relation-network-icon-badge` | Architecture diagrams |

## Available Themes (5)

| Theme | Primary | Background | Mode |
|-------|---------|------------|------|
| `corporate` | #1a56db (blue) | #ffffff | Light |
| `mwi-dark` | #10b981 (green) | #0f172a | Dark |
| `iacademy-warm` | #f59e0b (amber) | #fffbeb | Light |
| `trigr-slate` | #6366f1 (indigo) | #f8fafc | Light |
| `cyber-red` | #ef4444 (red) | #0c0a09 | Dark |

## Syntax Reference

```
infographic <template-alias-or-antv-name>
theme <theme-name>
data
  title <Title text>
  desc <Description text>
  lists
    - label <Item label>
      desc <Item description>
      value <numeric value for charts>
      icon <emoji or icon name>
  lists2                          # For comparison templates (right side)
    - label <Item label>
      desc <Item description>
  relations                       # For flow/network templates
    NodeA --> NodeB
    NodeB --> NodeC
```

### Hierarchy data (for mindmap, org-chart, swot)

```
data
  title My Topic
  lists
    - label Category A
      children
        - label Sub-item 1
        - label Sub-item 2
    - label Category B
      children
        - label Sub-item 3
```

## Output: Standalone HTML File

When the user asks for an infographic, generate a standalone HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Infographic</title>
  <script src="https://unpkg.com/@antv/infographic@0.2.19/dist/infographic.umd.min.js"></script>
  <style>
    body { margin: 0; display: flex; justify-content: center; padding: 40px; background: #f8fafc; }
    #container { width: 800px; min-height: 400px; }
  </style>
</head>
<body>
  <div id="container"></div>
  <script>
    const ig = new AntVInfographic.Infographic({
      container: document.getElementById('container'),
      width: '100%',
      height: '100%',
      themeConfig: { colorPrimary: '#1a56db' },
    });

    ig.render(`
infographic process-steps
data
  title My Process
  lists
    - label Step 1
      desc First step description
    - label Step 2
      desc Second step description
    - label Step 3
      desc Third step description
    `);
  </script>
</body>
</html>
```

## Rules

1. Use the alias names from the table above, NOT the full AntV names (the demo page maps them)
2. For standalone HTML files, use the UMD build from unpkg with the FULL AntV template name
3. Always set a `themeConfig` with at least `colorPrimary`
4. For dark themes, set `colorBg` and use dark page background in CSS
5. Keep data concise: 3-6 items is optimal, 8 max for most templates
6. For comparison templates (`pros-cons`, `vs-compare`), use `lists` and `lists2`
7. For relation templates (`flow-diagram`, `network`), include `relations` section
8. For hierarchy templates (`mindmap`, `org-chart`, `swot`), use `children` nesting

## Examples

### Timeline for a product roadmap
```
infographic sequence-roadmap-vertical-simple
theme corporate
data
  title Product Roadmap 2026
  lists
    - label Q1 - Foundation
      desc MVP launch, first 5 customers
    - label Q2 - Growth
      desc Scale to 50 customers, Series A
    - label Q3 - Expansion
      desc International markets, partnerships
    - label Q4 - Maturity
      desc Profitability, platform consolidation
```

### SWOT Analysis
```
infographic compare-swot
data
  title Competitive SWOT
  lists
    - label Strengths
      children
        - label EU sovereignty (ENS Alto)
        - label AI-native platform
    - label Weaknesses
      children
        - label Pre-revenue stage
        - label Small team
    - label Opportunities
      children
        - label NIS2 mandate
        - label Market gap in ES
    - label Threats
      children
        - label Funded competitors
        - label Talent war
```

### CI/CD Pipeline Flow
```
infographic relation-dagre-flow-simple
data
  title Deployment Pipeline
  lists
    - label Commit
    - label Build
    - label Test
    - label Stage
    - label Deploy
  relations
    Commit --> Build
    Build --> Test
    Test --> Stage
    Stage --> Deploy
```
