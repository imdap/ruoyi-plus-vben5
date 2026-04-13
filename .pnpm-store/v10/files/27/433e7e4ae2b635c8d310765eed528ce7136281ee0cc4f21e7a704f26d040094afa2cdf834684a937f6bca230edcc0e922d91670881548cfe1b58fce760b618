import { AliasToken } from "../theme/interface/alias.js";
import "../theme/interface/index.js";
import { CSSUtil } from "../theme/internal.js";
import { CSSObject } from "@antdv-next/cssinjs";

//#region src/style/roundedArrow.d.ts
interface ArrowToken {
  /** @internal */
  arrowShadowWidth: number;
  /** @internal */
  arrowPath: string;
  /** @internal */
  arrowPolygon: string;
}
declare function getArrowToken(token: AliasToken): ArrowToken;
declare function genRoundedArrow<T extends AliasToken & ArrowToken & CSSUtil>(token: T, bgColor: string, boxShadow: string): CSSObject;
//#endregion
export { ArrowToken, genRoundedArrow, getArrowToken };