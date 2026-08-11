/**
 * 20 curated infographic templates mapped to @antv/infographic built-in names.
 *
 * Each alias is a short, memorable name that maps to a specific AntV template.
 * Categories: lists, sequences/timelines, hierarchy, comparison, charts, relations.
 */

export const TEMPLATE_ALIASES: Record<string, string> = {
  // --- Lists (5) ---
  'list-horizontal': 'list-row-simple-horizontal-arrow',
  'list-vertical': 'list-column-simple-vertical-arrow',
  'list-grid': 'list-grid-compact-card',
  'list-icons': 'list-grid-simple',
  'list-cards': 'list-grid-badge-card',

  // --- Sequences / Timeline (5) ---
  'timeline-vertical': 'sequence-roadmap-vertical-simple',
  'timeline-horizontal': 'sequence-timeline-simple',
  'process-steps': 'sequence-steps-simple',
  'snake-steps': 'sequence-snake-steps-simple',
  'funnel': 'sequence-funnel-simple',

  // --- Hierarchy (3) ---
  'mindmap': 'hierarchy-mindmap-right-simple',
  'org-chart': 'hierarchy-tree-vertical-simple',
  'pyramid': 'list-pyramid-rounded-rect-node',

  // --- Comparison (3) ---
  'pros-cons': 'compare-binary-horizontal-simple-fold',
  'vs-compare': 'compare-binary-horizontal-simple-vs',
  'swot': 'compare-swot',

  // --- Charts (2) ---
  'pie-chart': 'chart-pie-simple',
  'bar-chart': 'chart-bar-plain-text',

  // --- Relations (2) ---
  'flow-diagram': 'relation-dagre-flow-simple',
  'network': 'relation-network-icon-badge',
};

/** All available template alias names */
export const TEMPLATE_NAMES = Object.keys(TEMPLATE_ALIASES);

/** Resolve an alias to the AntV built-in template name. Returns input if not an alias. */
export function resolveAlias(name: string): string {
  return TEMPLATE_ALIASES[name] ?? name;
}
