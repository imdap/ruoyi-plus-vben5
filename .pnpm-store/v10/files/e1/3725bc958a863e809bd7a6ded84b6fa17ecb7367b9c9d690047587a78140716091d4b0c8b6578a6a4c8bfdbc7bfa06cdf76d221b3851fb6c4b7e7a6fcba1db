import { DerivativeFunc, TokenType } from "./interface.js";

//#region src/theme/Theme.d.ts
/**
 * Theme with algorithms to derive tokens from design tokens.
 * Use `createTheme` first which will help to manage the theme instance cache.
 */
declare class Theme<DesignToken extends TokenType, DerivativeToken extends TokenType> {
  private derivatives;
  readonly id: number;
  constructor(derivatives: DerivativeFunc<DesignToken, DerivativeToken> | DerivativeFunc<DesignToken, DerivativeToken>[]);
  getDerivativeToken(token: DesignToken): DerivativeToken;
}
//#endregion
export { Theme as default };