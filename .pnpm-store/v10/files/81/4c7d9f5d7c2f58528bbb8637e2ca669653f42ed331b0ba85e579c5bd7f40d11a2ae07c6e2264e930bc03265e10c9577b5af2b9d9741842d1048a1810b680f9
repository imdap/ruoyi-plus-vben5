import { UnpluginContext, UnpluginContextMeta, UnpluginInstance } from "unplugin";
import { ViteDevServer } from "vite";
import { PluginContext } from "rollup";
import * as _compiler from "vue/compiler-sfc";
import { SFCScriptCompileOptions, SFCStyleCompileOptions, SFCTemplateCompileOptions } from "vue/compiler-sfc";

//#region src/core/utils/query.d.ts
interface VueQuery {
  vue?: boolean;
  src?: string;
  type?: "script" | "template" | "style" | "custom";
  index?: number;
  lang?: string;
  raw?: boolean;
  url?: boolean;
  scoped?: boolean;
  id?: string;
}
declare function parseVueRequest(id: string): {
  filename: string;
  query: VueQuery;
};
//#endregion
//#region src/core/index.d.ts
interface Options {
  include?: string | RegExp | (string | RegExp)[];
  exclude?: string | RegExp | (string | RegExp)[];
  isProduction?: boolean;
  ssr?: boolean;
  sourceMap?: boolean;
  root?: string;
  script?: Partial<Omit<SFCScriptCompileOptions, "id" | "isProd" | "inlineTemplate" | "templateOptions" | "sourceMap" | "genDefaultAs" | "customElement" | "defineModel" | "propsDestructure">> & {
    /**
    * @deprecated defineModel is now a stable feature and always enabled if
    * using Vue 3.4 or above.
    */
    defineModel?: boolean;
    /**
    * @deprecated moved to `features.propsDestructure`.
    */
    propsDestructure?: boolean;
  };
  template?: Partial<Omit<SFCTemplateCompileOptions, "id" | "source" | "ast" | "filename" | "scoped" | "slotted" | "isProd" | "inMap" | "ssr" | "ssrCssVars" | "preprocessLang">>;
  style?: Partial<Omit<SFCStyleCompileOptions, "filename" | "id" | "isProd" | "source" | "scoped" | "cssDevSourcemap" | "postcssOptions" | "map">>;
  /**
  * @deprecated moved to `features.customElement`.
  */
  customElement?: boolean | string | RegExp | (string | RegExp)[];
  /**
  * Use custom compiler-sfc instance. Can be used to force a specific version.
  */
  compiler?: typeof _compiler;
  /**
  * @default true
  */
  inlineTemplate?: boolean;
  features?: {
    optionsAPI?: boolean;
    prodDevtools?: boolean;
    prodHydrationMismatchDetails?: boolean;
    /**
    * Enable reactive destructure for `defineProps`.
    * - Available in Vue 3.4 and later.
    * - Defaults to true in Vue 3.5+
    * - Defaults to false in Vue 3.4 (**experimental**)
    */
    propsDestructure?: boolean;
    /**
    * Transform Vue SFCs into custom elements.
    * - `true`: all `*.vue` imports are converted into custom elements
    * - `string | RegExp`: matched files are converted into custom elements
    *
    * @default /\.ce\.vue$/
    */
    customElement?: boolean | string | RegExp | (string | RegExp)[];
    /**
    * Customize the component ID generation strategy.
    * - `'filepath'`: hash the file path (relative to the project root)
    * - `'filepath-source'`: hash the file path and the source code
    * - `function`: custom function that takes the file path, source code,
    *   whether in production mode, and the default hash function as arguments
    * - **default:** `'filepath'` in development, `'filepath-source'` in production
    */
    componentIdGenerator?: "filepath" | "filepath-source" | ((filepath: string, source: string, isProduction: boolean | undefined, getHash: (text: string) => string) => string);
  };
}
type Context = UnpluginContext & UnpluginContextMeta & {
  resolve?: PluginContext["resolve"];
};
type ResolvedOptions = Omit<Options, "customElement"> & Required<Pick<Options, "include" | "isProduction" | "ssr" | "sourceMap" | "root" | "compiler" | "inlineTemplate" | "features">> & {
  /** Vite only */devServer?: ViteDevServer;
  devToolsEnabled?: boolean;
  cssDevSourcemap: boolean;
};
declare const plugin: UnpluginInstance<Options | undefined, false>;
//#endregion
export { VueQuery as a, plugin as i, Options as n, parseVueRequest as o, ResolvedOptions as r, Context as t };