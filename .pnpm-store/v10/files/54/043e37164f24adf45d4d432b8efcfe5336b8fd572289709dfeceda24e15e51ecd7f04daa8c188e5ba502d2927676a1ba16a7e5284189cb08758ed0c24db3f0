import { AliasToken } from "../theme/interface/alias.js";
import { ArrowToken } from "./roundedArrow.js";
import { TokenWithCommonCls } from "../theme/internal.js";
import { CSSInterpolation } from "@antdv-next/cssinjs";

//#region src/style/placementArrow.d.ts
declare const MAX_VERTICAL_CONTENT_RADIUS = 8;
interface ArrowOffsetToken {
  /** @internal */
  arrowOffsetHorizontal: number;
  /** @internal */
  arrowOffsetVertical: number;
}
declare function getArrowOffsetToken(options: {
  contentRadius: number;
  limitVerticalRadius?: boolean;
}): ArrowOffsetToken;
declare function getArrowStyle<Token extends TokenWithCommonCls<AliasToken> & ArrowOffsetToken & ArrowToken>(token: Token, colorBg: string, options?: {
  arrowDistance?: number;
  arrowPlacement?: {
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
  };
}): CSSInterpolation;
//#endregion
export { ArrowOffsetToken, MAX_VERTICAL_CONTENT_RADIUS, getArrowStyle as default, getArrowOffsetToken };