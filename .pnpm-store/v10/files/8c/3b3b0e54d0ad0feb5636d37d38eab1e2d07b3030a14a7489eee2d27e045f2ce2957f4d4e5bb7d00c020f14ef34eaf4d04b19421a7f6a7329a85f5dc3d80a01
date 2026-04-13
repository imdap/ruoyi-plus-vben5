import { PresetColors } from "../../theme/interface/presetColors.js";
import { resetComponent } from "../../style/index.js";
import { genCssVar, genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { getArrowToken } from "../../style/roundedArrow.js";
import placementArrow_default, { getArrowOffsetToken } from "../../style/placementArrow.js";
import { initZoomMotion } from "../../style/motion/zoom.js";

//#region src/popover/style/index.ts
const FALL_BACK_ORIGIN = "50%";
const genBaseStyle = (token) => {
	const { componentCls, popoverColor, titleMinWidth, fontWeightStrong, innerPadding, boxShadowSecondary, colorTextHeading, borderRadiusLG, zIndexPopup, titleMarginBottom, colorBgElevated, popoverBg, titleBorderBottom, innerContentPadding, titlePadding, antCls } = token;
	const [varName, varRef] = genCssVar(antCls, "tooltip");
	return [
		{ [componentCls]: {
			...resetComponent(token),
			position: "absolute",
			top: 0,
			left: {
				_skip_check_: true,
				value: 0
			},
			zIndex: zIndexPopup,
			fontWeight: "normal",
			whiteSpace: "normal",
			textAlign: "start",
			cursor: "auto",
			userSelect: "text",
			[varName("valid-offset-x")]: varRef("arrow-offset-x", "var(--arrow-x)"),
			transformOrigin: [varRef("valid-offset-x", FALL_BACK_ORIGIN), `var(--arrow-y, ${FALL_BACK_ORIGIN})`].join(" "),
			[varName("arrow-background-color")]: colorBgElevated,
			width: "max-content",
			maxWidth: "100vw",
			"&-rtl": { direction: "rtl" },
			"&-hidden": { display: "none" },
			[`${componentCls}-content`]: { position: "relative" },
			[`${componentCls}-container`]: {
				backgroundColor: popoverBg,
				backgroundClip: "padding-box",
				borderRadius: borderRadiusLG,
				boxShadow: boxShadowSecondary,
				padding: innerPadding
			},
			[`${componentCls}-title`]: {
				minWidth: titleMinWidth,
				marginBottom: titleMarginBottom,
				color: colorTextHeading,
				fontWeight: fontWeightStrong,
				borderBottom: titleBorderBottom,
				padding: titlePadding
			},
			[`${componentCls}-content`]: {
				color: popoverColor,
				padding: innerContentPadding
			}
		} },
		placementArrow_default(token, varRef("arrow-background-color")),
		{ [`${componentCls}-pure`]: {
			position: "relative",
			maxWidth: "none",
			margin: token.sizePopupArrow,
			display: "inline-block"
		} }
	];
};
const genColorStyle = (token) => {
	const { componentCls, antCls } = token;
	const [varName] = genCssVar(antCls, "tooltip");
	return { [componentCls]: PresetColors.map((colorKey) => {
		const lightColor = token[`${colorKey}6`];
		return { [`&${componentCls}-${colorKey}`]: {
			[varName("arrow-background-color")]: lightColor,
			[`${componentCls}-inner`]: { backgroundColor: lightColor },
			[`${componentCls}-arrow`]: { background: "transparent" }
		} };
	}) };
};
const prepareComponentToken = (token) => {
	const { lineWidth, controlHeight, fontHeight, padding, wireframe, zIndexPopupBase, borderRadiusLG, marginXS, lineType, colorSplit, paddingSM } = token;
	const titlePaddingBlockDist = controlHeight - fontHeight;
	const popoverTitlePaddingBlockTop = titlePaddingBlockDist / 2;
	const popoverTitlePaddingBlockBottom = titlePaddingBlockDist / 2 - lineWidth;
	const popoverPaddingHorizontal = padding;
	return {
		titleMinWidth: 177,
		zIndexPopup: zIndexPopupBase + 30,
		...getArrowToken(token),
		...getArrowOffsetToken({
			contentRadius: borderRadiusLG,
			limitVerticalRadius: true
		}),
		innerPadding: wireframe ? 0 : 12,
		titleMarginBottom: wireframe ? 0 : marginXS,
		titlePadding: wireframe ? `${popoverTitlePaddingBlockTop}px ${popoverPaddingHorizontal}px ${popoverTitlePaddingBlockBottom}px` : 0,
		titleBorderBottom: wireframe ? `${lineWidth}px ${lineType} ${colorSplit}` : "none",
		innerContentPadding: wireframe ? `${paddingSM}px ${popoverPaddingHorizontal}px` : 0
	};
};
var style_default = genStyleHooks("Popover", (token) => {
	const { colorBgElevated, colorText } = token;
	const popoverToken = mergeToken(token, {
		popoverBg: colorBgElevated,
		popoverColor: colorText
	});
	return [
		genBaseStyle(popoverToken),
		genColorStyle(popoverToken),
		initZoomMotion(popoverToken, "zoom-big")
	];
}, prepareComponentToken, {
	resetStyle: false,
	deprecatedTokens: [["width", "titleMinWidth"], ["minWidth", "titleMinWidth"]]
});

//#endregion
export { style_default as default, prepareComponentToken };