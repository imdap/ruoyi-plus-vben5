import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { genCompactItemStyle } from "../../style/compact-item.js";
import columns_default from "./columns.js";

//#region src/cascader/style/index.ts
const genBaseStyle = (token) => {
	const { componentCls, antCls } = token;
	return [
		{ [componentCls]: { width: token.controlWidth } },
		{ [`${componentCls}-dropdown`]: [{ [`&${antCls}-select-dropdown`]: { padding: 0 } }, columns_default(token)] },
		{ [`${componentCls}-dropdown-rtl`]: { direction: "rtl" } },
		genCompactItemStyle(token)
	];
};
function prepareComponentToken(token) {
	const itemPaddingVertical = Math.round((token.controlHeight - token.fontSize * token.lineHeight) / 2);
	return {
		controlWidth: 184,
		controlItemWidth: 111,
		dropdownHeight: 180,
		optionSelectedBg: token.controlItemBgActive,
		optionSelectedFontWeight: token.fontWeightStrong,
		optionPadding: `${itemPaddingVertical}px ${token.paddingSM}px`,
		menuPadding: token.paddingXXS,
		optionSelectedColor: token.colorText
	};
}
var style_default = genStyleHooks("Cascader", genBaseStyle, prepareComponentToken, {
	resetFont: false,
	unitless: { optionSelectedFontWeight: true }
});

//#endregion
export { style_default as default, prepareComponentToken };