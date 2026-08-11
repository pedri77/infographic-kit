/**
 * infographic-kit
 *
 * Curated infographic generation wrapper over @antv/infographic.
 * 20 templates, portfolio themes, LLM-friendly streaming support.
 *
 * Built on top of AntV Infographic (MIT License)
 * https://github.com/antvis/Infographic
 */

import { Infographic, type InfographicOptions } from '@antv/infographic';
import { resolveAlias, TEMPLATE_ALIASES } from './templates/portfolio';
import { registerPortfolioThemes, THEME_PRESETS, type ThemePreset } from './themes/riskitera';

// Register themes on import
registerPortfolioThemes();

// Re-export core AntV types
export {
  Infographic,
  exportToSVG,
  parseSyntax,
  getTemplate,
  getTemplates,
  getTheme,
  getThemes,
} from '@antv/infographic';

// Re-export our modules
export { TEMPLATE_ALIASES, TEMPLATE_NAMES, resolveAlias } from './templates/portfolio';
export { THEME_PRESETS, THEME_NAMES, registerPortfolioThemes } from './themes/riskitera';
export type { ThemePreset } from './themes/riskitera';

// --- Kit Options ---

export interface KitOptions {
  container: string | HTMLElement;
  theme?: string;
  width?: string | number;
  height?: string | number;
  editable?: boolean;
}

export interface PresetData {
  title?: string;
  desc?: string;
  items: Array<{
    label: string;
    desc?: string;
    value?: string | number;
    icon?: string;
  }>;
  theme?: string;
}

// --- InfographicKit wrapper ---

export class InfographicKit {
  private instance: Infographic;
  private theme: string;

  constructor(options: KitOptions) {
    const container = typeof options.container === 'string'
      ? document.querySelector(options.container) as HTMLElement
      : options.container;

    if (!container) {
      throw new Error(`Container not found: ${options.container}`);
    }

    this.theme = options.theme ?? 'corporate';
    const themeConfig = THEME_PRESETS[this.theme];

    this.instance = new Infographic({
      container,
      width: options.width ?? '100%',
      height: options.height ?? '100%',
      editable: options.editable ?? false,
      ...(themeConfig ? { themeConfig } : {}),
    });
  }

  /** Render from infographic syntax string (supports streaming — call repeatedly with growing buffer) */
  render(syntax: string): void {
    // Resolve aliases in the infographic line
    const resolved = syntax.replace(
      /^(infographic\s+)(\S+)/m,
      (_, prefix, name) => prefix + resolveAlias(name),
    );
    this.instance.render(resolved);
  }

  /** Render from structured options */
  renderOptions(options: Partial<InfographicOptions>): void {
    this.instance.render(options);
  }

  /** Update with partial options (merge) */
  update(options: string | Partial<InfographicOptions>): void {
    if (typeof options === 'string') {
      const resolved = options.replace(
        /^(infographic\s+)(\S+)/m,
        (_, prefix, name) => prefix + resolveAlias(name),
      );
      this.instance.update(resolved);
    } else {
      this.instance.update(options);
    }
  }

  /** Export to data URL (SVG or PNG) */
  async toDataURL(options?: { type: 'svg' } | { type: 'png' }): Promise<string> {
    return this.instance.toDataURL(options);
  }

  /** Subscribe to events */
  on(event: string, listener: (...args: any[]) => void): void {
    this.instance.on(event, listener);
  }

  off(event: string, listener: (...args: any[]) => void): void {
    this.instance.off(event, listener);
  }

  destroy(): void {
    this.instance.destroy();
  }

  /** Get the underlying AntV Infographic instance */
  getInfographic(): Infographic {
    return this.instance;
  }
}

// --- Preset functions ---

function buildSyntax(template: string, data: PresetData): string {
  const lines: string[] = [`infographic ${resolveAlias(template)}`];

  if (data.theme) {
    lines.push(`theme ${data.theme}`);
  }

  lines.push('data');

  if (data.title) {
    lines.push(`  title ${data.title}`);
  }
  if (data.desc) {
    lines.push(`  desc ${data.desc}`);
  }

  lines.push('  lists');
  for (const item of data.items) {
    lines.push(`    - label ${item.label}`);
    if (item.desc) lines.push(`      desc ${item.desc}`);
    if (item.value !== undefined) lines.push(`      value ${item.value}`);
    if (item.icon) lines.push(`      icon ${item.icon}`);
  }

  return lines.join('\n');
}

function createPreset(template: string, container: string | HTMLElement, data: PresetData): InfographicKit {
  const kit = new InfographicKit({
    container,
    theme: data.theme ?? 'corporate',
  });
  kit.render(buildSyntax(template, data));
  return kit;
}

export function createTimeline(container: string | HTMLElement, data: PresetData): InfographicKit {
  return createPreset('timeline-vertical', container, data);
}

export function createProcessSteps(container: string | HTMLElement, data: PresetData): InfographicKit {
  return createPreset('process-steps', container, data);
}

export function createListGrid(container: string | HTMLElement, data: PresetData): InfographicKit {
  return createPreset('list-grid', container, data);
}

export function createMindmap(container: string | HTMLElement, data: PresetData): InfographicKit {
  return createPreset('mindmap', container, data);
}

export function createProsCons(container: string | HTMLElement, data: PresetData): InfographicKit {
  return createPreset('pros-cons', container, data);
}

export function createFunnel(container: string | HTMLElement, data: PresetData): InfographicKit {
  return createPreset('funnel', container, data);
}

/** Build infographic syntax string from template alias + data (useful for LLM integration) */
export { buildSyntax };
