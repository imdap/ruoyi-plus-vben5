import Entity from "./Cache.js";
import { ExtractStyle } from "./hooks/useGlobalCache.js";
import { CSSVarCacheValue } from "./hooks/useCSSVarRegister.js";

//#region src/extractStyle.d.ts
declare const ExtractStyleFns: {
  style: ExtractStyle<[styleStr: string, styleId: string, effectStyle: Record<string, string>, clientOnly: boolean | undefined, order: number]>;
  token: ExtractStyle<[token: any, hashId: string, realToken: any, cssVarStr: string, cssVarKey: string]>;
  cssVar: ExtractStyle<CSSVarCacheValue<any, Record<string, any>>>;
};
type ExtractStyleType = keyof typeof ExtractStyleFns;
declare function extractStyle(cache: Entity, options?: boolean | {
  plain?: boolean;
  types?: ExtractStyleType | ExtractStyleType[];
  once?: boolean;
}): string;
//#endregion
export { extractStyle as default };