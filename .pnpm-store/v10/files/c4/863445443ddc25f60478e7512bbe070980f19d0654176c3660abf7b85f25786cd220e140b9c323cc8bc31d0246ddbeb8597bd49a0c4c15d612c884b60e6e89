import { resetComponent, textEllipsis } from "../../style/index.js";
import { genCssVar, genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { initComponentToken, initInputToken } from "../../input/style/token.js";
import { genBorderlessStyle, genDisabledStyle, genFilledStyle, genOutlinedStyle, genUnderlinedStyle } from "../../input/style/variants.js";
import { genBasicInputStyle, genPlaceholderStyle } from "../../input/style/index.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/mentions/style/index.ts
const genDropdownStyle = (token) => {
	const { componentCls, fontSize, paddingXXS, colorBgElevated, borderRadiusLG, boxShadowSecondary, itemPaddingVertical, controlPaddingHorizontal, colorText, borderRadius, lineHeight, colorTextDisabled, controlItemBgHover, motionDurationSlow } = token;
	return { [componentCls]: { "&-dropdown": {
		...resetComponent(token),
		position: "absolute",
		top: -9999,
		insetInlineStart: -9999,
		zIndex: token.zIndexPopup,
		boxSizing: "border-box",
		fontSize,
		fontVariant: "initial",
		padding: paddingXXS,
		backgroundColor: colorBgElevated,
		borderRadius: borderRadiusLG,
		outline: "none",
		boxShadow: boxShadowSecondary,
		"&-hidden": { display: "none" },
		[`${componentCls}-dropdown-menu`]: {
			maxHeight: token.dropdownHeight,
			margin: 0,
			paddingInlineStart: 0,
			overflow: "auto",
			listStyle: "none",
			outline: "none",
			"&-item": {
				...textEllipsis,
				position: "relative",
				display: "block",
				minWidth: token.controlItemWidth,
				padding: `${unit(itemPaddingVertical)} ${unit(controlPaddingHorizontal)}`,
				color: colorText,
				borderRadius,
				fontWeight: "normal",
				lineHeight,
				cursor: "pointer",
				transition: `background-color ${motionDurationSlow} ease`,
				"&:hover": { backgroundColor: controlItemBgHover },
				"&-disabled": {
					color: colorTextDisabled,
					cursor: "not-allowed",
					"&:hover": {
						color: colorTextDisabled,
						backgroundColor: controlItemBgHover,
						cursor: "not-allowed"
					}
				},
				"&-selected": {
					color: colorText,
					fontWeight: token.fontWeightStrong,
					backgroundColor: controlItemBgHover
				},
				"&-active": { backgroundColor: controlItemBgHover }
			}
		}
	} } };
};
const genMentionsStyle = (token) => {
	const { componentCls, colorText, antCls, colorTextDisabled, calc } = token;
	const [varName, varRef] = genCssVar(antCls, "cmp-mentions");
	return { [componentCls]: [
		resetComponent(token),
		genBasicInputStyle(token, {
			largeStyle: { padding: 0 },
			smallStyle: { padding: 0 }
		}),
		genOutlinedStyle(token),
		genFilledStyle(token),
		genBorderlessStyle(token),
		genUnderlinedStyle(token),
		{
			[varName("padding-inline")]: token.paddingInline,
			[varName("padding-block")]: token.paddingBlock,
			[varName("control-height")]: token.controlHeight,
			display: "flex",
			padding: 0,
			whiteSpace: "pre-wrap",
			"> textarea": [
				resetComponent(token),
				genPlaceholderStyle(token.colorTextPlaceholder),
				{
					background: "transparent",
					border: "none",
					borderRadius: "inherit",
					outline: "none",
					flex: "auto",
					minWidth: 0,
					resize: "none",
					"&:disabled": { color: colorTextDisabled }
				}
			],
			[`> textarea, ${componentCls}-measure`]: {
				color: colorText,
				boxSizing: "border-box",
				margin: 0,
				minHeight: calc(varRef("control-height")).sub(calc(token.lineWidth).mul(2).equal()).equal(),
				paddingInline: varRef("padding-inline"),
				paddingBlock: varRef("padding-block"),
				overflow: "inherit",
				overflowX: "hidden",
				overflowY: "auto",
				fontWeight: "inherit",
				fontSize: "inherit",
				fontFamily: "inherit",
				fontStyle: "inherit",
				fontVariant: "inherit",
				fontSizeAdjust: "inherit",
				fontStretch: "inherit",
				lineHeight: "inherit",
				direction: "inherit",
				letterSpacing: "inherit",
				whiteSpace: "inherit",
				textAlign: "inherit",
				verticalAlign: "top",
				wordWrap: "break-word",
				wordBreak: "inherit",
				tabSize: "inherit"
			},
			[`${componentCls}-measure`]: {
				position: "absolute",
				inset: 0,
				zIndex: -1,
				color: "transparent",
				pointerEvents: "none",
				"> span": {
					display: "inline-block",
					minHeight: "1em"
				}
			},
			[`${componentCls}-suffix`]: {
				display: "inline-flex",
				alignItems: "center",
				flex: "none",
				color: token.colorTextQuaternary,
				fontSize: token.fontSizeIcon,
				lineHeight: 1,
				position: "absolute",
				top: "50%",
				transform: "translateY(-50%)",
				insetInlineEnd: varRef("padding-inline"),
				columnGap: token.marginXS,
				[`${componentCls}-clear-icon`]: {
					cursor: "pointer",
					border: 0,
					background: "transparent",
					"&:hover": { color: token.colorIcon },
					"&:active": { color: token.colorText },
					"&-hidden": { visibility: "hidden" }
				},
				[`${antCls}-form-item-feedback-icon`]: {
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center"
				}
			}
		},
		{ "&-has-suffix": { "> textarea": { paddingInlineEnd: calc(token.paddingXXS).mul(1.5).add(token.fontSizeIcon).add(varRef("padding-inline")).equal() } } },
		{ "&-disabled": { "> textarea": { ...genDisabledStyle(token) } } },
		{
			"&-lg": {
				[varName("padding-inline")]: token.paddingInlineLG,
				[varName("padding-block")]: token.paddingBlockLG,
				[varName("control-height")]: token.controlHeightLG
			},
			"&-sm": {
				[varName("padding-inline")]: token.paddingInlineSM,
				[varName("padding-block")]: token.paddingBlockSM,
				[varName("control-height")]: token.controlHeightSM
			}
		}
	] };
};
const prepareComponentToken = (token) => ({
	...initComponentToken(token),
	dropdownHeight: 250,
	controlItemWidth: 100,
	zIndexPopup: token.zIndexPopupBase + 50,
	itemPaddingVertical: (token.controlHeight - token.fontHeight) / 2
});
var style_default = genStyleHooks("Mentions", (token) => {
	const mentionsToken = mergeToken(token, initInputToken(token));
	return [genMentionsStyle(mentionsToken), genDropdownStyle(mentionsToken)];
}, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };