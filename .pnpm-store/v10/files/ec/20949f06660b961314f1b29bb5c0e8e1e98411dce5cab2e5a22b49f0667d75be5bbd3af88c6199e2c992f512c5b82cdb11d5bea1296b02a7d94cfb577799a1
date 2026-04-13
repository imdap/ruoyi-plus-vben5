import { AliasToken } from "../../theme/interface/alias.js";
import { FullToken } from "../../theme/interface/cssinjs-utils.js";
import "../../theme/internal.js";

//#region src/input/style/token.d.ts
interface SharedComponentToken {
  /**
   * @desc 输入框横向内边距
   * @descEN Horizontal padding of input
   */
  paddingInline: number;
  /**
   * @desc 小号输入框横向内边距
   * @descEN Horizontal padding of small input
   */
  paddingInlineSM: number;
  /**
   * @desc 大号输入框横向内边距
   * @descEN Horizontal padding of large input
   */
  paddingInlineLG: number;
  /**
   * @desc 输入框纵向内边距
   * @descEN Vertical padding of input
   */
  paddingBlock: number;
  /**
   * @desc 小号输入框纵向内边距
   * @descEN Vertical padding of small input
   */
  paddingBlockSM: number;
  /**
   * @desc 大号输入框纵向内边距
   * @descEN Vertical padding of large input
   */
  paddingBlockLG: number;
  /**
   * @desc 前/后置标签背景色
   * @descEN Background color of addon
   */
  addonBg: string;
  /**
   * @desc 悬浮态边框色
   * @descEN Hover border color
   */
  hoverBorderColor: string;
  /**
   * @desc 激活态边框色
   * @descEN Active border color
   */
  activeBorderColor: string;
  /**
   * @desc 激活态阴影
   * @descEN Box-shadow when active
   */
  activeShadow: string;
  /**
   * @desc 错误状态时激活态阴影
   * @descEN Box-shadow when active in error status
   */
  errorActiveShadow: string;
  /**
   * @desc 警告状态时激活态阴影
   * @descEN Box-shadow when active in warning status
   */
  warningActiveShadow: string;
  /**
   * @desc 输入框hover状态时背景颜色
   * @descEN Background color when the input box hovers
   */
  hoverBg: string;
  /**
   * @desc 输入框激活状态时背景颜色
   * @descEN Background color when the input box is activated
   */
  activeBg: string;
  /**
   * @desc 字体大小
   * @descEN Font size
   */
  inputFontSize: number;
  /**
   * @desc 大号字体大小
   * @descEN Font size of large
   */
  inputFontSizeLG: number;
  /**
   * @desc 小号字体大小
   * @descEN Font size of small
   */
  inputFontSizeSM: number;
}
interface ComponentToken extends SharedComponentToken {}
interface SharedInputToken {
  inputAffixPadding: number;
}
interface InputToken extends FullToken<'Input'>, SharedInputToken {}
declare function initInputToken(token: AliasToken): SharedInputToken;
declare function initComponentToken(token: AliasToken & Partial<SharedComponentToken>): SharedComponentToken;
//#endregion
export { ComponentToken, InputToken, SharedComponentToken, SharedInputToken, initComponentToken, initInputToken };