import genPresetColor from "../../theme/util/genPresetColor.js";
import { resetComponent } from "../../style/index.js";
import { genCssVar, genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { getArrowToken } from "../../style/roundedArrow.js";
import placementArrow_default, { MAX_VERTICAL_CONTENT_RADIUS, getArrowOffsetToken } from "../../style/placementArrow.js";
import { initFadeMotion } from "../../style/motion/fade.js";
import { initZoomMotion } from "../../style/motion/zoom.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/tooltip/style/index.ts
const FALL_BACK_ORIGIN = "50%";
const genTooltipStyle = (token) => {
	const { calc, componentCls, tooltipMaxWidth, tooltipColor, tooltipBg, tooltipBorderRadius, zIndexPopup, controlHeight, boxShadowSecondary, paddingSM, paddingXS, arrowOffsetHorizontal, sizePopupArrow, antCls } = token;
	const [varName, varRef] = genCssVar(antCls, "tooltip");
	const edgeAlignMinWidth = calc(tooltipBorderRadius).add(sizePopupArrow).add(arrowOffsetHorizontal).equal();
	const sharedBodyStyle = {
		minWidth: calc(tooltipBorderRadius).mul(2).add(sizePopupArrow).equal(),
		minHeight: controlHeight,
		padding: `${unit(token.calc(paddingSM).div(2).equal())} ${unit(paddingXS)}`,
		color: varRef("overlay-color", tooltipColor),
		textAlign: "start",
		textDecoration: "none",
		wordWrap: "break-word",
		backgroundColor: tooltipBg,
		borderRadius: tooltipBorderRadius,
		boxShadow: boxShadowSecondary,
		boxSizing: "border-box"
	};
	const sharedTransformOrigin = {
		[varName("valid-offset-x")]: varRef("arrow-offset-x", "var(--arrow-x)"),
		transformOrigin: [varRef("valid-offset-x", FALL_BACK_ORIGIN), `var(--arrow-y, ${FALL_BACK_ORIGIN})`].join(" ")
	};
	return [
		{ [componentCls]: {
			...resetComponent(token),
			position: "absolute",
			zIndex: zIndexPopup,
			display: "block",
			width: "max-content",
			maxWidth: tooltipMaxWidth,
			visibility: "visible",
			...sharedTransformOrigin,
			"&-hidden": { display: "none" },
			[varName("arrow-background-color")]: tooltipBg,
			[`${componentCls}-container`]: [sharedBodyStyle, initFadeMotion(token, true)],
			[`&:has(~ ${componentCls}-unique-container)`]: { [`${componentCls}-container`]: {
				border: "none",
				background: "transparent",
				boxShadow: "none"
			} },
			[[
				`&-placement-topLeft`,
				`&-placement-topRight`,
				`&-placement-bottomLeft`,
				`&-placement-bottomRight`
			].join(",")]: { minWidth: edgeAlignMinWidth },
			[[
				`&-placement-left`,
				`&-placement-leftTop`,
				`&-placement-leftBottom`,
				`&-placement-right`,
				`&-placement-rightTop`,
				`&-placement-rightBottom`
			].join(",")]: { [`${componentCls}-inner`]: { borderRadius: token.min(tooltipBorderRadius, MAX_VERTICAL_CONTENT_RADIUS) } },
			[`${componentCls}-content`]: { position: "relative" },
			...genPresetColor(token, (colorKey, { darkColor }) => ({ [`&${componentCls}-${colorKey}`]: {
				[`${componentCls}-container`]: { backgroundColor: darkColor },
				[`${componentCls}-arrow`]: { [varName("arrow-background-color")]: darkColor }
			} })),
			"&-rtl": { direction: "rtl" }
		} },
		placementArrow_default(token, varRef("arrow-background-color")),
		{ [`${componentCls}-pure`]: {
			position: "relative",
			maxWidth: "none",
			margin: token.sizePopupArrow
		} },
		{ [`${componentCls}-unique-container`]: {
			...sharedBodyStyle,
			...sharedTransformOrigin,
			position: "absolute",
			zIndex: calc(zIndexPopup).sub(1).equal(),
			"&-hidden": { display: "none" },
			"&-visible": { transition: `all ${token.motionDurationSlow}` }
		} }
	];
};
const prepareComponentToken = (token) => ({
	zIndexPopup: token.zIndexPopupBase + 70,
	maxWidth: 250,
	...getArrowOffsetToken({
		contentRadius: token.borderRadius,
		limitVerticalRadius: true
	}),
	...getArrowToken(mergeToken(token, { borderRadiusOuter: Math.min(token.borderRadiusOuter, 4) }))
});
var style_default = (prefixCls, rootCls, injectStyle = true) => {
	return genStyleHooks("Tooltip", (token) => {
		const { borderRadius, colorTextLightSolid, colorBgSpotlight, maxWidth } = token;
		return [genTooltipStyle(mergeToken(token, {
			tooltipMaxWidth: maxWidth,
			tooltipColor: colorTextLightSolid,
			tooltipBorderRadius: borderRadius,
			tooltipBg: colorBgSpotlight
		})), initZoomMotion(token, "zoom-big-fast")];
	}, prepareComponentToken, {
		resetStyle: false,
		injectStyle
	})(prefixCls, rootCls);
};

//#endregion
export { style_default as default, prepareComponentToken };