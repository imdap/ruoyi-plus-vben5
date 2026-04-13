import Theme from "../theme/Theme.js";
import { ExtractStyle } from "./useGlobalCache.js";
import { Nonce } from "../util/index.js";
import { Ref } from "vue";

//#region src/hooks/useCacheToken.d.ts
interface Option<DerivativeToken, DesignToken> {
  /**
   * Generate token with salt.
   * This is used to generate different hashId even same derivative token for different version.
   */
  salt?: string;
  override?: object;
  /**
   * Format token as you need. Such as:
   *
   * - rename token
   * - merge token
   * - delete token
   *
   * This should always be the same since it's one time process.
   * It's ok to useMemo outside but this has better cache strategy.
   */
  formatToken?: (mergedToken: any) => DerivativeToken;
  /**
   * Get final token with origin token, override token and theme.
   * The parameters do not contain formatToken since it's passed by user.
   * @param origin The original token.
   * @param override Extra tokens to override.
   * @param theme Theme instance. Could get derivative token by `theme.getDerivativeToken`
   */
  getComputedToken?: (origin: DesignToken, override: object, theme: Theme<any, any>) => DerivativeToken;
  /**
   * Transform token to css variables.
   */
  cssVar: {
    hashed?: boolean; /** Prefix for css variables */
    prefix?: string; /** Tokens that should not be appended with unit */
    unitless?: Record<string, boolean>; /** Tokens that should not be transformed to css variables */
    ignore?: Record<string, boolean>; /** Tokens that preserves origin value */
    preserve?: Record<string, boolean>; /** Key for current theme. Useful for customizing and should be unique */
    key: string;
  };
  nonce?: Nonce;
}
declare function getComputedToken<DerivativeToken = object, DesignToken = DerivativeToken>(originToken: DesignToken, overrideToken: object, theme: Theme<any, any>, format?: (token: DesignToken) => DerivativeToken): any;
declare const TOKEN_PREFIX = "token";
type TokenCacheValue<DerivativeToken> = [token: DerivativeToken, hashId: string, realToken: DerivativeToken, cssVarStr: string, cssVarKey: string];
declare const extract: ExtractStyle<TokenCacheValue<any>>;
/**
 * Cache theme derivative token as global shared one
 * @param theme Theme entity
 * @param tokens List of tokens, used for cache. Please do not dynamic generate object directly
 * @param option Additional config
 * @returns Call Theme.getDerivativeToken(tokenObject) to get token
 */
declare function useCacheToken<DerivativeToken = Record<string, any>, DesignToken = DerivativeToken>(theme: Ref<Theme<any, any>>, tokens: Ref<(Partial<DesignToken> | (() => Partial<DesignToken>))[]>, option: Ref<Option<DerivativeToken, DesignToken>>): Ref<TokenCacheValue<DerivativeToken>, TokenCacheValue<DerivativeToken>>;
//#endregion
export { Option, TOKEN_PREFIX, useCacheToken as default, extract, getComputedToken };