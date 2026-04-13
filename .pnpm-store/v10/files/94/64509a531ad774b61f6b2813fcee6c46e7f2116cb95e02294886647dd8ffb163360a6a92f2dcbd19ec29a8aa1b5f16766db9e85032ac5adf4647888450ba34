import { AliasToken } from "../../theme/interface/alias.js";
import { TokenWithCommonCls } from "../../theme/internal.js";
import { CSSInterpolation, Keyframes } from "@antdv-next/cssinjs";

//#region src/style/motion/fade.d.ts
declare const fadeIn: Keyframes;
declare const fadeOut: Keyframes;
/**
 * Initialize fade motion styles
 *
 * Generates CSS styles for fade in/out transition animations when elements are shown/hidden.
 * Supports enter, appear, and leave animation states.
 *
 * @param token - Object containing design tokens and CSS class prefix
 * @param sameLevel - Controls CSS selector nesting behavior:
 *   - `false` (default): Generates descendant selectors like `.ant-fade-enter`, `.ant-fade-appear`
 *   - `true`: Generates same-level selectors with `&` prefix like `&.ant-fade-enter`, `&.ant-fade-appear`
 *   Use `true` when the motion classes are applied to the same element as the parent selector,
 *   Use `false` when the motion classes are applied to child elements
 * @returns CSS interpolation object containing fade motion styles
 *
 * @example
 * ```ts
 * // For child elements (default behavior)
 * const fadeStyles = initFadeMotion(token);
 * // Generates: .parent .ant-fade-enter { ... }
 *
 * // For same element
 * const sameLevelFadeStyles = initFadeMotion(token, true);
 * // Generates: .parent.ant-fade-enter { ... }
 * ```
 */
declare function initFadeMotion(token: TokenWithCommonCls<AliasToken>, sameLevel?: boolean): CSSInterpolation;
//#endregion
export { fadeIn, fadeOut, initFadeMotion };