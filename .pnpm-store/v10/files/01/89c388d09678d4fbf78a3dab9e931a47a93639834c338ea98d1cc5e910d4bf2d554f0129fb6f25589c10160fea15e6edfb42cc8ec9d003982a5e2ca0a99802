import { ExtractStyle } from "./useGlobalCache.js";
import { TokenWithCSSVar } from "../util/css-variables.js";
import { Nonce } from "../util/index.js";
import { Ref } from "vue";

//#region src/hooks/useCSSVarRegister.d.ts
declare const CSS_VAR_PREFIX = "cssVar";
type CSSVarCacheValue<V, T extends Record<string, V> = Record<string, V>> = [cssVarToken: TokenWithCSSVar<V, T>, cssVarStr: string, styleId: string, cssVarKey: string];
interface CSSVarRegisterConfig {
  path: string[];
  key: string;
  prefix?: string;
  unitless?: Record<string, boolean>;
  ignore?: Record<string, boolean>;
  scope?: string | string[];
  token: any;
  hashId?: string;
  nonce?: Nonce;
}
declare const extract: ExtractStyle<CSSVarCacheValue<any>>;
declare function useCSSVarRegister<V, T extends Record<string, V>>(config: Ref<CSSVarRegisterConfig>, fn: () => T): Ref<CSSVarCacheValue<V, T>, CSSVarCacheValue<V, T>>;
//#endregion
export { CSSVarCacheValue, CSSVarRegisterConfig, CSS_VAR_PREFIX, useCSSVarRegister as default, extract };