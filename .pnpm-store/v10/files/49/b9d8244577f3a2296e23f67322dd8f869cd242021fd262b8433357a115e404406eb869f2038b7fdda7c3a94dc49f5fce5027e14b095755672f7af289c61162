import { genFocusStyle, resetIcon } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { genNoMotionStyle } from "../../style/motion/util.js";
import group_default from "./group.js";
import { prepareComponentToken, prepareToken } from "./token.js";
import variant_default from "./variant.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/button/style/index.ts
const genSharedButtonStyle = (token) => {
	const { componentCls, iconCls, fontWeight, opacityLoading, motionDurationSlow, motionEaseInOut, iconGap, calc } = token;
	return { [componentCls]: {
		outline: "none",
		position: "relative",
		display: "inline-flex",
		gap: iconGap,
		alignItems: "center",
		justifyContent: "center",
		fontWeight,
		whiteSpace: "nowrap",
		textAlign: "center",
		backgroundImage: "none",
		cursor: "pointer",
		transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
		userSelect: "none",
		touchAction: "manipulation",
		...genNoMotionStyle(),
		"&:disabled > *": { pointerEvents: "none" },
		[`${componentCls}-icon > svg`]: resetIcon(),
		"> a": { color: "currentColor" },
		"&:not(:disabled)": genFocusStyle(token),
		[`&${componentCls}-two-chinese-chars::first-letter`]: { letterSpacing: "0.34em" },
		[`&${componentCls}-two-chinese-chars > *:not(${iconCls})`]: {
			marginInlineEnd: "-0.34em",
			letterSpacing: "0.34em"
		},
		[`&${componentCls}-icon-only`]: {
			paddingInline: 0,
			[`&${componentCls}-compact-item`]: { flex: "none" }
		},
		[`&${componentCls}-loading`]: {
			opacity: opacityLoading,
			cursor: "default"
		},
		[`${componentCls}-loading-icon`]: { transition: [
			"width",
			"opacity",
			"margin"
		].map((prop) => `${prop} ${motionDurationSlow} ${motionEaseInOut}`).join(",") },
		[`&:not(${componentCls}-icon-end)`]: { [`${componentCls}-loading-icon-motion`]: {
			"&-appear-start, &-enter-start": { marginInlineEnd: calc(iconGap).mul(-1).equal() },
			"&-appear-active, &-enter-active": { marginInlineEnd: 0 },
			"&-leave-start": { marginInlineEnd: 0 },
			"&-leave-active": { marginInlineEnd: calc(iconGap).mul(-1).equal() }
		} },
		"&-icon-end": {
			flexDirection: "row-reverse",
			[`${componentCls}-loading-icon-motion`]: {
				"&-appear-start, &-enter-start": { marginInlineStart: calc(iconGap).mul(-1).equal() },
				"&-appear-active, &-enter-active": { marginInlineStart: 0 },
				"&-leave-start": { marginInlineStart: 0 },
				"&-leave-active": { marginInlineStart: calc(iconGap).mul(-1).equal() }
			}
		}
	} };
};
const genCircleButtonStyle = (token) => ({
	minWidth: token.controlHeight,
	paddingInline: 0,
	borderRadius: "50%"
});
function genButtonStyle(token, prefixCls = "") {
	const { componentCls, controlHeight, fontSize, borderRadius, buttonPaddingHorizontal, iconCls, buttonPaddingVertical, buttonIconOnlyFontSize } = token;
	return [
		{ [prefixCls]: {
			fontSize,
			height: controlHeight,
			padding: `${unit(buttonPaddingVertical)} ${unit(buttonPaddingHorizontal)}`,
			borderRadius,
			[`&${componentCls}-icon-only`]: {
				width: controlHeight,
				[iconCls]: { fontSize: buttonIconOnlyFontSize }
			}
		} },
		{ [`${componentCls}${componentCls}-circle${prefixCls}`]: genCircleButtonStyle(token) },
		{ [`${componentCls}${componentCls}-round${prefixCls}`]: {
			borderRadius: token.controlHeight,
			[`&:not(${componentCls}-icon-only)`]: { paddingInline: token.buttonPaddingHorizontal }
		} }
	];
}
const genSizeBaseButtonStyle = (token) => {
	return genButtonStyle(mergeToken(token, { fontSize: token.contentFontSize }), token.componentCls);
};
const genSizeSmallButtonStyle = (token) => {
	return genButtonStyle(mergeToken(token, {
		controlHeight: token.controlHeightSM,
		fontSize: token.contentFontSizeSM,
		padding: token.paddingXS,
		buttonPaddingHorizontal: token.paddingInlineSM,
		buttonPaddingVertical: 0,
		borderRadius: token.borderRadiusSM,
		buttonIconOnlyFontSize: token.onlyIconSizeSM
	}), `${token.componentCls}-sm`);
};
const genSizeLargeButtonStyle = (token) => {
	return genButtonStyle(mergeToken(token, {
		controlHeight: token.controlHeightLG,
		fontSize: token.contentFontSizeLG,
		buttonPaddingHorizontal: token.paddingInlineLG,
		buttonPaddingVertical: 0,
		borderRadius: token.borderRadiusLG,
		buttonIconOnlyFontSize: token.onlyIconSizeLG
	}), `${token.componentCls}-lg`);
};
const genBlockButtonStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: { [`&${componentCls}-block`]: { width: "100%" } } };
};
var style_default = genStyleHooks("Button", (token) => {
	const buttonToken = prepareToken(token);
	return [
		genSharedButtonStyle(buttonToken),
		genSizeBaseButtonStyle(buttonToken),
		genSizeSmallButtonStyle(buttonToken),
		genSizeLargeButtonStyle(buttonToken),
		genBlockButtonStyle(buttonToken),
		variant_default(buttonToken),
		group_default(buttonToken)
	];
}, prepareComponentToken, { unitless: {
	fontWeight: true,
	contentLineHeight: true,
	contentLineHeightSM: true,
	contentLineHeightLG: true
} });

//#endregion
export { style_default as default };