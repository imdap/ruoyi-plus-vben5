import { SharedComponentToken, SharedInputToken } from "../../input/style/token.js";
import { FullToken, GetDefaultToken } from "../../theme/interface/cssinjs-utils.js";
import "../../theme/internal.js";

//#region src/input-number/style/token.d.ts
interface ComponentToken extends SharedComponentToken {
  /**
   * @desc 输入框宽度
   * @descEN Width of input
   */
  controlWidth: number;
  /**
   * @desc 操作按钮宽度
   * @descEN Width of control button
   */
  handleWidth: number;
  /**
   * @desc 操作按钮图标大小
   * @descEN Icon size of control button
   */
  handleFontSize: number;
  /**
   * Default `auto`. Set `true` will always show the handle
   * @desc 操作按钮可见性
   * @descEN Handle visible
   */
  handleVisible: 'auto' | true;
  /**
   * @desc 操作按钮背景色
   * @descEN Background color of handle
   */
  handleBg: string;
  /**
   * @desc 操作按钮激活背景色
   * @descEN Active background color of handle
   */
  handleActiveBg: string;
  /**
   * @desc 操作按钮悬浮颜色
   * @descEN Hover color of handle
   */
  handleHoverColor: string;
  /**
   * @desc 操作按钮边框颜色
   * @descEN Border color of handle
   */
  handleBorderColor: string;
  /**
   * @desc 面性变体操作按钮背景色
   * @descEN Background color of handle in filled variant
   */
  filledHandleBg: string;
  /**
   * @internal
   */
  handleOpacity: number;
  /**
   * @internal
   */
  handleVisibleWidth: number;
}
type InputNumberToken = FullToken<'InputNumber'> & SharedInputToken;
declare const prepareComponentToken: GetDefaultToken<'InputNumber'>;
//#endregion
export { ComponentToken, InputNumberToken, prepareComponentToken };