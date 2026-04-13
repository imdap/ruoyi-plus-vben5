import { genFocusOutline, genFocusStyle, resetComponent, textEllipsis } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { genNoMotionStyle } from "../../style/motion/util.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/segmented/style/index.ts
function getItemDisabledStyle(cls, token) {
	return { [`${cls}, ${cls}:hover, ${cls}:focus`]: {
		color: token.colorTextDisabled,
		cursor: "not-allowed"
	} };
}
const getItemSelectedStyle = (token) => {
	return {
		background: token.itemSelectedBg,
		boxShadow: token.boxShadowTertiary
	};
};
const segmentedTextEllipsisCss = {
	overflow: "hidden",
	...textEllipsis
};
const genSegmentedStyle = (token) => {
	const { componentCls, motionDurationSlow, motionEaseInOut, motionDurationMid } = token;
	const labelHeight = token.calc(token.controlHeight).sub(token.calc(token.trackPadding).mul(2)).equal();
	const labelHeightLG = token.calc(token.controlHeightLG).sub(token.calc(token.trackPadding).mul(2)).equal();
	const labelHeightSM = token.calc(token.controlHeightSM).sub(token.calc(token.trackPadding).mul(2)).equal();
	return { [componentCls]: {
		...resetComponent(token),
		display: "inline-block",
		padding: token.trackPadding,
		color: token.itemColor,
		background: token.trackBg,
		borderRadius: token.borderRadius,
		transition: `all ${motionDurationMid}`,
		...genNoMotionStyle(),
		...genFocusStyle(token),
		[`${componentCls}-group`]: {
			position: "relative",
			display: "flex",
			alignItems: "stretch",
			justifyItems: "flex-start",
			flexDirection: "row",
			width: "100%"
		},
		[`&${componentCls}-rtl`]: { direction: "rtl" },
		[`&${componentCls}-vertical`]: {
			[`${componentCls}-group`]: { flexDirection: "column" },
			[`${componentCls}-thumb`]: {
				width: "100%",
				height: 0,
				padding: `0 ${unit(token.paddingXXS)}`
			}
		},
		[`&${componentCls}-block`]: { display: "flex" },
		[`&${componentCls}-block ${componentCls}-item`]: {
			flex: 1,
			minWidth: 0
		},
		[`${componentCls}-item`]: {
			position: "relative",
			textAlign: "center",
			cursor: "pointer",
			transition: `color ${motionDurationMid}`,
			...genNoMotionStyle(),
			borderRadius: token.borderRadiusSM,
			transform: "translateZ(0)",
			"&-selected": {
				...getItemSelectedStyle(token),
				color: token.itemSelectedColor
			},
			"&-focused": genFocusOutline(token),
			"&::after": {
				content: "\"\"",
				position: "absolute",
				zIndex: -1,
				width: "100%",
				height: "100%",
				top: 0,
				insetInlineStart: 0,
				borderRadius: "inherit",
				opacity: 0,
				pointerEvents: "none",
				transition: ["opacity", "background-color"].map((prop) => `${prop} ${motionDurationMid}`).join(", "),
				...genNoMotionStyle()
			},
			[`&:not(${componentCls}-item-selected):not(${componentCls}-item-disabled)`]: {
				"&:hover, &:active": { color: token.itemHoverColor },
				"&:hover::after": {
					opacity: 1,
					backgroundColor: token.itemHoverBg
				},
				"&:active::after": {
					opacity: 1,
					backgroundColor: token.itemActiveBg
				}
			},
			"&-label": {
				minHeight: labelHeight,
				lineHeight: unit(labelHeight),
				padding: `0 ${unit(token.segmentedPaddingHorizontal)}`,
				...segmentedTextEllipsisCss
			},
			"&-icon + *": { marginInlineStart: token.calc(token.marginSM).div(2).equal() },
			"&-input": {
				position: "absolute",
				insetBlockStart: 0,
				insetInlineStart: 0,
				width: 0,
				height: 0,
				opacity: 0,
				pointerEvents: "none"
			}
		},
		[`${componentCls}-thumb`]: {
			...getItemSelectedStyle(token),
			position: "absolute",
			insetBlockStart: 0,
			insetInlineStart: 0,
			width: 0,
			height: "100%",
			padding: `${unit(token.paddingXXS)} 0`,
			borderRadius: token.borderRadiusSM,
			[`& ~ ${componentCls}-item:not(${componentCls}-item-selected):not(${componentCls}-item-disabled)::after`]: { backgroundColor: "transparent" }
		},
		[`&${componentCls}-lg`]: {
			borderRadius: token.borderRadiusLG,
			[`${componentCls}-item-label`]: {
				minHeight: labelHeightLG,
				lineHeight: unit(labelHeightLG),
				padding: `0 ${unit(token.segmentedPaddingHorizontal)}`,
				fontSize: token.fontSizeLG
			},
			[`${componentCls}-item, ${componentCls}-thumb`]: { borderRadius: token.borderRadius }
		},
		[`&${componentCls}-sm`]: {
			borderRadius: token.borderRadiusSM,
			[`${componentCls}-item-label`]: {
				minHeight: labelHeightSM,
				lineHeight: unit(labelHeightSM),
				padding: `0 ${unit(token.segmentedPaddingHorizontalSM)}`
			},
			[`${componentCls}-item, ${componentCls}-thumb`]: { borderRadius: token.borderRadiusXS }
		},
		...getItemDisabledStyle(`&-disabled ${componentCls}-item`, token),
		...getItemDisabledStyle(`${componentCls}-item-disabled`, token),
		[`${componentCls}-thumb-motion-appear`]: {
			willChange: "transform, width",
			transition: [`transform`, `width`].map((prop) => `${prop} ${motionDurationSlow} ${motionEaseInOut}`).join(", "),
			...genNoMotionStyle()
		},
		[`&${componentCls}-shape-round`]: {
			borderRadius: 9999,
			[`${componentCls}-item, ${componentCls}-thumb`]: { borderRadius: 9999 }
		}
	} };
};
const prepareComponentToken = (token) => {
	const { colorTextLabel, colorText, colorFillSecondary, colorBgElevated, colorFill, lineWidthBold, colorBgLayout } = token;
	return {
		trackPadding: lineWidthBold,
		trackBg: colorBgLayout,
		itemColor: colorTextLabel,
		itemHoverColor: colorText,
		itemHoverBg: colorFillSecondary,
		itemSelectedBg: colorBgElevated,
		itemActiveBg: colorFill,
		itemSelectedColor: colorText
	};
};
var style_default = genStyleHooks("Segmented", (token) => {
	const { lineWidth, calc } = token;
	return genSegmentedStyle(mergeToken(token, {
		segmentedPaddingHorizontal: calc(token.controlPaddingHorizontal).sub(lineWidth).equal(),
		segmentedPaddingHorizontalSM: calc(token.controlPaddingHorizontalSM).sub(lineWidth).equal()
	}));
}, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };