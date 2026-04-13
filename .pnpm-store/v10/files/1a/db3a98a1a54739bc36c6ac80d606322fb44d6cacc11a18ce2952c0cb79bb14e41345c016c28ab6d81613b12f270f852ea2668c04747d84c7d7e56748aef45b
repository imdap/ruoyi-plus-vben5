import { SelectToken } from "../../select/style/token.js";
import { CSSObject } from "@antdv-next/cssinjs";

//#region src/date-picker/style/util.d.ts
/**
 * Get multiple selector needed style. The calculation:
 *
 * ContainerPadding = BasePadding - ItemMargin
 *
 * Border:                    ╔═══════════════════════════╗                 ┬
 * ContainerPadding:          ║                           ║                 │
 *                            ╟───────────────────────────╢     ┬           │
 * Item Margin:               ║                           ║     │           │
 *                            ║             ┌──────────┐  ║     │           │
 * Item(multipleItemHeight):  ║ BasePadding │   Item   │  ║  Overflow  Container(ControlHeight)
 *                            ║             └──────────┘  ║     │           │
 * Item Margin:               ║                           ║     │           │
 *                            ╟───────────────────────────╢     ┴           │
 * ContainerPadding:          ║                           ║                 │
 * Border:                    ╚═══════════════════════════╝                 ┴
 */
declare function getMultipleSelectorUnit(token: Pick<SelectToken, 'max' | 'calc' | 'multipleSelectItemHeight' | 'paddingXXS' | 'lineWidth' | 'INTERNAL_FIXED_ITEM_MARGIN'>): {
  basePadding: string | number;
  containerPadding: string | number;
  itemHeight: string;
  itemLineHeight: string;
};
/**
 * Get the `@rc-component/overflow` needed style.
 * It's a share style which means not affected by `size`.
 */
declare function genOverflowStyle(token: Pick<SelectToken, 'calc' | 'componentCls' | 'iconCls' | 'borderRadiusSM' | 'motionDurationSlow' | 'paddingXS' | 'multipleItemColorDisabled' | 'multipleItemBorderColorDisabled' | 'colorIcon' | 'colorIconHover' | 'INTERNAL_FIXED_ITEM_MARGIN'>): CSSObject;
//#endregion
export { genOverflowStyle, getMultipleSelectorUnit };