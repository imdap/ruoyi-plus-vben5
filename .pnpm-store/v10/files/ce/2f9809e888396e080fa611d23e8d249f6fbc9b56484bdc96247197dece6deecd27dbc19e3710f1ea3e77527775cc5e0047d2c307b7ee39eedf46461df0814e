import { resetComponent, textEllipsis } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { genCompactItemStyle } from "../../style/compact-item.js";
import dropdown_default from "./dropdown.js";
import select_input_default from "./select-input.js";
import { prepareComponentToken } from "./token.js";

//#region src/select/style/index.ts
const genBaseStyle = (token) => {
	const { antCls, componentCls, motionDurationMid, inputPaddingHorizontalBase } = token;
	const hoverShowClearStyle = { [`${componentCls}-clear`]: {
		opacity: 1,
		background: token.colorBgBase,
		borderRadius: "50%"
	} };
	return {
		[componentCls]: {
			...resetComponent(token),
			[`${componentCls}-selection-item`]: {
				flex: 1,
				fontWeight: "normal",
				position: "relative",
				userSelect: "none",
				...textEllipsis,
				[`> ${antCls}-typography`]: { display: "inline" }
			},
			[`${componentCls}-prefix`]: {
				flex: "none",
				marginInlineEnd: token.selectAffixPadding
			},
			[`${componentCls}-clear`]: {
				position: "absolute",
				top: "50%",
				insetInlineStart: "auto",
				insetInlineEnd: inputPaddingHorizontalBase,
				zIndex: 1,
				display: "inline-block",
				width: token.fontSizeIcon,
				height: token.fontSizeIcon,
				marginTop: token.calc(token.fontSizeIcon).mul(-1).div(2).equal(),
				color: token.colorTextQuaternary,
				fontSize: token.fontSizeIcon,
				fontStyle: "normal",
				lineHeight: 1,
				textAlign: "center",
				textTransform: "none",
				cursor: "pointer",
				opacity: 0,
				transition: ["color", "opacity"].map((prop) => `${prop} ${motionDurationMid} ease`).join(", "),
				textRendering: "auto",
				transform: "translateZ(0)",
				"&:before": { display: "block" },
				"&:hover": { color: token.colorIcon }
			},
			"@media(hover:none)": hoverShowClearStyle,
			"&:hover": hoverShowClearStyle
		},
		[`${componentCls}-status`]: { "&-error, &-warning, &-success, &-validating": { [`&${componentCls}-has-feedback`]: { [`${componentCls}-clear`]: { insetInlineEnd: token.calc(inputPaddingHorizontalBase).add(token.fontSize).add(token.paddingXS).equal() } } } }
	};
};
const genSelectStyle = (token) => {
	const { componentCls } = token;
	return [
		{ [componentCls]: { [`&${componentCls}-in-form-item`]: { width: "100%" } } },
		genBaseStyle(token),
		dropdown_default(token),
		{ [`${componentCls}-rtl`]: { direction: "rtl" } },
		genCompactItemStyle(token, { focusElCls: `${componentCls}-focused` })
	];
};
var style_default = genStyleHooks("Select", (token, { rootPrefixCls }) => {
	const selectToken = mergeToken(token, {
		rootPrefixCls,
		inputPaddingHorizontalBase: token.calc(token.paddingSM).sub(token.lineWidth).equal(),
		multipleSelectItemHeight: token.multipleItemHeight,
		selectHeight: token.controlHeight
	});
	return [genSelectStyle(selectToken), select_input_default(selectToken)];
}, prepareComponentToken, { unitless: {
	optionLineHeight: true,
	optionSelectedFontWeight: true
} });

//#endregion
export { style_default as default };