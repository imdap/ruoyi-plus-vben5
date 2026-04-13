import { genCssVar } from "../../theme/util/genStyleUtils.js";

//#region src/steps/style/inline.ts
const genInlineStyle = (token) => {
	const { componentCls, inlineDotSize, paddingXS, lineWidth, antCls, calc } = token;
	const containerPaddingTop = calc(paddingXS).add(lineWidth).equal();
	const itemCls = `${componentCls}-item`;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	return { [`${componentCls}-inline`]: {
		[varName("items-offset")]: "0",
		[varName("item-wrapper-padding-top")]: containerPaddingTop,
		display: "inline-flex",
		"&:before": {
			content: "\"\"",
			flex: varRef("items-offset")
		},
		[itemCls]: {
			[varName("title-vertical-row-gap")]: paddingXS,
			[varName("icon-size")]: inlineDotSize,
			[varName("icon-size-active")]: inlineDotSize,
			[varName("title-font-size")]: token.fontSizeSM,
			[varName("title-line-height")]: token.lineHeightSM,
			[varName("item-title-color")]: token.colorTextSecondary,
			[varName("subtitle-font-size")]: token.fontSizeSM,
			[varName("subtitle-line-height")]: token.lineHeightSM,
			[varName("item-subtitle-color")]: token.colorTextQuaternary,
			[varName("rail-size")]: token.lineWidth,
			[varName("title-horizontal-rail-gap")]: "0px",
			flex: 1,
			"&-wrapper": {
				paddingInline: token.paddingXXS,
				marginInline: token.calc(token.marginXXS).div(2).equal(),
				borderRadius: token.borderRadiusSM,
				cursor: "pointer",
				transition: `background-color ${token.motionDurationMid}`,
				"&:hover": { background: token.controlItemBgHover }
			},
			"&-icon": { [`${itemCls}-icon-dot`]: { "&:after": { display: "none" } } },
			"&-title": {
				fontWeight: "normal",
				whiteSpace: "nowrap"
			},
			"&-content": { display: "none" }
		}
	} };
};
var inline_default = genInlineStyle;

//#endregion
export { inline_default as default };