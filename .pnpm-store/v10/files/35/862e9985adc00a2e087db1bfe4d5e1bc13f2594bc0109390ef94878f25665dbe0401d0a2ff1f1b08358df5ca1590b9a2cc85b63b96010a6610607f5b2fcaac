import { HashPriority } from "../StyleContext.js";
import _default from "./resolveHash.js";
import { token2CSSVar } from "./css-variables.js";

//#region src/util/index.d.ts
declare function memoResult<T extends object, R>(callback: () => R, deps: T[]): R;
/**
 * Flatten token to string, this will auto cache the result when token not change
 */
declare function flattenToken(token: any): string;
/**
 * Convert derivative token to key string
 */
declare function token2key(token: any, salt: string): string;
declare function supportLayer(): boolean;
declare function supportWhere(): boolean;
declare function supportLogicProps(): boolean;
declare const isClientSide: boolean;
declare function isNumber(val: any): val is number;
declare function unit(num: string | number): string;
declare function toStyleStr(style: string, tokenKey?: string, styleId?: string, customizeAttrs?: Record<string, string>, plain?: boolean): string;
declare function where(options?: {
  hashPriority?: HashPriority;
  hashCls?: string;
}): string;
declare function isNonNullable<T>(val: T): val is NonNullable<T>;
type Nonce = string | (() => string);
/**
 * Resolve nonce and merge it into the dynamic CSS config.
 */
declare function injectCSPNonce<T extends {
  csp?: {
    nonce?: string;
  };
}>(config: T, nonce: Nonce | undefined): T;
//#endregion
export { Nonce, flattenToken, _default as hash, injectCSPNonce, isClientSide, isNonNullable, isNumber, memoResult, supportLayer, supportLogicProps, supportWhere, toStyleStr, token2CSSVar, token2key, unit, where };