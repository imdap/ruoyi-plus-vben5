import { DerivativeFunc, TokenType } from "./interface.js";
import Theme from "./Theme.js";

//#region src/theme/createTheme.d.ts
/**
 * Same as new Theme, but will always return same one if `derivative` not changed.
 */
declare function createTheme<DesignToken extends TokenType, DerivativeToken extends TokenType>(derivatives: DerivativeFunc<DesignToken, DerivativeToken>[] | DerivativeFunc<DesignToken, DerivativeToken>): Theme<any, any>;
//#endregion
export { createTheme as default };