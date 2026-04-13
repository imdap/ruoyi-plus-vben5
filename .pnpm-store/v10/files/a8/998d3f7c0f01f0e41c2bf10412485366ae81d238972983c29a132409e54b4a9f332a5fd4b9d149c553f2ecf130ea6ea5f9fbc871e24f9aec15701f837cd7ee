import { PresetColorKey } from "../interface/presetColors.js";
import { AliasToken } from "../interface/alias.js";
import { TokenWithCommonCls } from "../internal.js";
import { CSSObject } from "@antdv-next/cssinjs";

//#region src/theme/util/genPresetColor.d.ts
interface CalcColor {
  /** token[`${colorKey}-1`] */
  lightColor: string;
  /** token[`${colorKey}-3`] */
  lightBorderColor: string;
  /** token[`${colorKey}-6`] */
  darkColor: string;
  /** token[`${colorKey}-7`] */
  textColor: string;
}
type GenCSS = (colorKey: PresetColorKey, calcColor: CalcColor) => CSSObject;
declare function genPresetColor<Token extends TokenWithCommonCls<AliasToken>>(token: Token, genCss: GenCSS): CSSObject;
//#endregion
export { genPresetColor as default };