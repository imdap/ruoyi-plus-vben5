import { FullToken, OverrideComponent } from "../theme/interface/cssinjs-utils.js";
import "../theme/internal.js";
import { CSSInterpolation } from "@antdv-next/cssinjs";

//#region src/style/compact-item.d.ts
interface CompactItemOptions {
  focus?: boolean;
  /**
   * Some component borders are implemented on child elements
   * like `Select`
   */
  borderElCls?: string;
  /**
   * Some components have special `focus` className especially with popovers
   * like `Select` and `DatePicker`
   */
  focusElCls?: string;
}
declare function genCompactItemStyle<T extends OverrideComponent>(token: FullToken<T>, options?: CompactItemOptions): CSSInterpolation;
//#endregion
export { genCompactItemStyle };