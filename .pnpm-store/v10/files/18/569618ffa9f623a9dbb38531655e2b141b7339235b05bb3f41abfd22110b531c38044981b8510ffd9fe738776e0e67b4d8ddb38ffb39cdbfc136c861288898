import { TableToken } from "./index.js";
import { GenerateStyle } from "../../theme/interface/index.js";
import "../../theme/internal.js";
import { CSSObject } from "@antdv-next/cssinjs";

//#region src/table/style/fixed.d.ts
declare function getShadowStyle({
  colorSplit: shadowColor
}: Pick<TableToken, 'colorSplit'>): [left: CSSObject, right: CSSObject];
declare const genFixedStyle: GenerateStyle<TableToken, CSSObject>;
//#endregion
export { genFixedStyle as default, getShadowStyle };