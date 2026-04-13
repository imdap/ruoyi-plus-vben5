import { Logger, MarkPartial, Overwrite } from "tsdown/internal";
import { TransformOptions } from "lightningcss";
import { Plugin } from "rolldown";
import { ResolvedConfig } from "tsdown";

//#region src/options.d.ts
type LightningCSSOptions = Omit<TransformOptions<any>, "filename" | "code">;
interface CSSModulesOptions {
  /**
  * Controls the scoping behavior.
  * @default 'local'
  */
  scopeBehaviour?: "global" | "local";
  /**
  * File paths matching these patterns will use global scoping.
  */
  globalModulePaths?: RegExp[];
  /**
  * Pattern or function to generate scoped class names.
  * When using `transformer: 'lightningcss'`, only string patterns are supported.
  */
  generateScopedName?: string | ((name: string, filename: string, css: string) => string);
  /**
  * Prefix added to hashes when generating scoped names.
  */
  hashPrefix?: string;
  /**
  * Transform convention for exported class names.
  */
  localsConvention?: "camelCase" | "camelCaseOnly" | "dashes" | "dashesOnly";
  /**
  * Whether to include global class names in the export.
  */
  exportGlobals?: boolean;
  /**
  * Callback to receive the generated class name mappings.
  */
  getJSON?: (cssFileName: string, json: Record<string, string>, outputFileName: string) => void;
}
interface CssOptions {
  /**
  * Enable/disable CSS code splitting.
  * When set to `false`, all CSS in the entire project will be extracted into a single CSS file named by {@link fileName}.
  * When set to `true`, CSS imported in async JS chunks will be preserved as chunks.
  *
  * Defaults to `false`, but if `unbundle` is `true`, it defaults to `true` to preserve chunk splitting.
  */
  splitting?: boolean;
  /**
  * Specify the name of the CSS file generated when `splitting` is `false`.
  * @default 'style.css'
  */
  fileName?: string;
  /**
  * Set the target environment for CSS syntax lowering.
  * Accepts esbuild-style target strings (e.g., `'chrome99'`, `'safari16.2'`).
  * Defaults to the top-level `target` option.
  *
  * @see https://vite.dev/config/build-options#build-csstarget
  */
  target?: string | string[] | false;
  /**
  * Options for CSS preprocessors (Sass/Less/Stylus).
  *
  * In addition to options specific to each processor, `additionalData` option
  * can be used to inject extra code for each style content.
  */
  preprocessorOptions?: PreprocessorOptions;
  /**
  * Enable/disable CSS minification.
  *
  * @default false
  */
  minify?: boolean;
  /**
  * Lightning CSS options for CSS syntax lowering and transformations.
  */
  lightningcss?: LightningCSSOptions;
  /**
  * PostCSS configuration.
  *
  * - `string`: Path to the directory to search for PostCSS config files.
  * - `object`: Inline PostCSS options with optional `plugins` array.
  * - Omitted: Auto-detect PostCSS config from the project root.
  *
  * Only used when `transformer` is `'postcss'`.
  * Requires `postcss` to be installed.
  *
  * @see https://github.com/postcss/postcss
  */
  postcss?: PostCSSOptions;
  /**
  * When enabled, JS output preserves import statements pointing to emitted CSS files.
  * Consumers of the library will automatically import the CSS alongside the JS.
  *
  * @default false
  */
  inject?: boolean;
  /**
  * CSS modules configuration.
  * When not `false`, `.module.css` files (and preprocessor variants) are
  * treated as CSS modules with scoped class names.
  *
  * @see https://github.com/css-modules/css-modules
  */
  modules?: CSSModulesOptions | false;
  /**
  * CSS transformer to use. Controls how CSS is processed:
  *
  * - `'lightningcss'` (default): `@import` handled by Lightning CSS
  *   `bundleAsync()`, PostCSS is **not** used at all.
  * - `'postcss'`: `@import` handled by `postcss-import`,
  *   PostCSS plugins applied, Lightning CSS used only for final
  *   targets/minify transform.
  *
  * @default 'lightningcss'
  * @see https://vite.dev/config/shared-options#css-transformer
  */
  transformer?: "postcss" | "lightningcss";
}
type PostCSSOptions = string | (Record<string, any> & {
  plugins?: any[];
});
interface PreprocessorOptions {
  scss?: SassPreprocessorOptions;
  sass?: SassPreprocessorOptions;
  less?: LessPreprocessorOptions;
  styl?: StylusPreprocessorOptions;
  stylus?: StylusPreprocessorOptions;
}
type PreprocessorAdditionalDataResult = string | {
  content: string;
  map?: any;
};
type PreprocessorAdditionalData = string | ((source: string, filename: string) => PreprocessorAdditionalDataResult | Promise<PreprocessorAdditionalDataResult>);
interface SassPreprocessorOptions {
  additionalData?: PreprocessorAdditionalData;
  [key: string]: any;
}
interface LessPreprocessorOptions {
  additionalData?: PreprocessorAdditionalData;
  math?: any;
  paths?: string[];
  plugins?: any[];
  [key: string]: any;
}
interface StylusPreprocessorOptions {
  additionalData?: PreprocessorAdditionalData;
  define?: Record<string, any>;
  paths?: string[];
  [key: string]: any;
}
type ResolvedCssOptions = Overwrite<MarkPartial<Required<CssOptions>, "preprocessorOptions" | "lightningcss" | "postcss" | "modules">, {
  target?: string[];
}>;
declare function resolveCssOptions(options?: CssOptions, topLevelTarget?: string[], unbundle?: boolean): ResolvedCssOptions;
//#endregion
//#region src/plugin.d.ts
interface CssPluginResult {
  /** Plugins that run BEFORE user plugins (CSS compilation) */
  pre: Plugin[];
  /** Plugins that run AFTER user plugins (CSS collection & emission) */
  post: Plugin[];
}
declare function CssPlugin(config: ResolvedConfig, {
  logger
}: {
  logger: Logger;
}): CssPluginResult;
//#endregion
export { type CSSModulesOptions, type CssOptions, CssPlugin, type LessPreprocessorOptions, type LightningCSSOptions, type PostCSSOptions, type PreprocessorAdditionalData, type PreprocessorAdditionalDataResult, type PreprocessorOptions, type ResolvedCssOptions, type SassPreprocessorOptions, type StylusPreprocessorOptions, resolveCssOptions };