import { genBorderlessStyle, genFilledStyle, genOutlinedStyle, genUnderlinedStyle } from "../../input/style/variants.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/date-picker/style/variants.ts
const genVariantsStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: [{
		...genOutlinedStyle(token),
		...genUnderlinedStyle(token),
		...genFilledStyle(token),
		...genBorderlessStyle(token)
	}, {
		"&-outlined": { [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
			background: token.multipleItemBg,
			border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`
		} },
		"&-filled": { [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
			background: token.colorBgContainer,
			border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`
		} },
		"&-borderless": { [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
			background: token.multipleItemBg,
			border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`
		} },
		"&-underlined": { [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
			background: token.multipleItemBg,
			border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`
		} }
	}] };
};
var variants_default = genVariantsStyle;

//#endregion
export { variants_default as default };