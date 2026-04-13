import { HashPriority } from "../StyleContext.js";

//#region src/util/css-variables.d.ts
declare function token2CSSVar(token: string, prefix?: string): string;
declare function serializeCSSVar<T extends Record<string, any>>(cssVars: T, hashId: string, options?: {
  scope?: string | string[];
  hashCls?: string;
  hashPriority?: HashPriority;
}): string;
type TokenWithCSSVar<V, T extends Record<string, V> = Record<string, V>> = { [key in keyof T]?: string | V };
declare function transformToken<V, T extends Record<string, V> = Record<string, V>>(token: T, themeKey: string, config?: {
  prefix?: string;
  ignore?: { [key in keyof T]?: boolean };
  unitless?: { [key in keyof T]?: boolean };
  preserve?: { [key in keyof T]?: boolean };
  scope?: string | string[];
  hashCls?: string;
  hashPriority?: HashPriority;
}): [TokenWithCSSVar<V, T>, string];
//#endregion
export { TokenWithCSSVar, serializeCSSVar, token2CSSVar, transformToken };