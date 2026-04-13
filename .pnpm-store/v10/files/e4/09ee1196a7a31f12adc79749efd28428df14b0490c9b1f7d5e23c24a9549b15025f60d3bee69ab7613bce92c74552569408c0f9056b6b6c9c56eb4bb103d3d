import { getShadowStyle } from "./fixed.js";

//#region src/table/style/rtl.ts
const genStyle = (token) => {
	const { componentCls } = token;
	const [leftShadowStyle, rightShadowStyle] = getShadowStyle(token);
	return { [`${componentCls}-wrapper-rtl`]: {
		direction: "rtl",
		table: { direction: "rtl" },
		[`${componentCls}-row-expand-icon`]: {
			float: "right",
			"&::after": { transform: "rotate(-90deg)" },
			"&-collapsed::before": { transform: "rotate(180deg)" },
			"&-collapsed::after": { transform: "rotate(0deg)" }
		},
		[`${componentCls}-cell-fix`]: {
			"&-start-shadow-show:after": rightShadowStyle,
			"&-end-shadow-show:after": leftShadowStyle
		},
		[`${componentCls}-container`]: { [`${componentCls}-row-indent`]: { float: "right" } },
		[`${componentCls}-fix-start-shadow-show ${componentCls}-container:before`]: rightShadowStyle,
		[`${componentCls}-fix-end-shadow-show ${componentCls}-container:after`]: leftShadowStyle
	} };
};
var rtl_default = genStyle;

//#endregion
export { rtl_default as default };