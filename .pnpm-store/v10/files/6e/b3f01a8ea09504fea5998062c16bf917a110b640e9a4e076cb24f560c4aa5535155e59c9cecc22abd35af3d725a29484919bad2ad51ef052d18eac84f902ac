import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { genCompactItemStyle } from "../../style/compact-item.js";
import color_block_default from "./color-block.js";
import input_default from "./input.js";
import picker_default from "./picker.js";
import presets_default from "./presets.js";
import slider_default from "./slider.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/color-picker/style/index.ts
function genActiveStyle(token, borderColor, outlineColor) {
	return {
		borderInlineEndWidth: token.lineWidth,
		borderColor,
		boxShadow: `0 0 0 ${unit(token.controlOutlineWidth)} ${outlineColor}`,
		outline: 0
	};
}
const genRtlStyle = (token) => {
	const { componentCls } = token;
	return { "&-rtl": {
		[`${componentCls}-presets-color`]: { "&::after": { direction: "ltr" } },
		[`${componentCls}-clear`]: { "&::after": { direction: "ltr" } }
	} };
};
function genClearStyle(token, size, extraStyle) {
	const { componentCls, borderRadiusSM, lineWidth, colorSplit, colorBorder, red6 } = token;
	return { [`${componentCls}-clear`]: {
		width: size,
		height: size,
		borderRadius: borderRadiusSM,
		border: `${unit(lineWidth)} solid ${colorSplit}`,
		position: "relative",
		overflow: "hidden",
		cursor: "inherit",
		transition: `all ${token.motionDurationFast}`,
		...extraStyle,
		"&::after": {
			content: "\"\"",
			position: "absolute",
			insetInlineEnd: token.calc(lineWidth).mul(-1).equal(),
			top: token.calc(lineWidth).mul(-1).equal(),
			display: "block",
			width: 40,
			height: 2,
			transformOrigin: `calc(100% - 1px) 1px`,
			transform: "rotate(-45deg)",
			backgroundColor: red6
		},
		"&:hover": { borderColor: colorBorder }
	} };
}
const genStatusStyle = (token) => {
	const { componentCls, colorError, colorWarning, colorErrorHover, colorWarningHover, colorErrorOutline, colorWarningOutline } = token;
	return {
		[`&${componentCls}-status-error`]: {
			borderColor: colorError,
			"&:hover": { borderColor: colorErrorHover },
			[`&${componentCls}-trigger-active`]: { ...genActiveStyle(token, colorError, colorErrorOutline) }
		},
		[`&${componentCls}-status-warning`]: {
			borderColor: colorWarning,
			"&:hover": { borderColor: colorWarningHover },
			[`&${componentCls}-trigger-active`]: { ...genActiveStyle(token, colorWarning, colorWarningOutline) }
		}
	};
};
const genSizeStyle = (token) => {
	const { componentCls, controlHeightLG, controlHeightSM, controlHeight, controlHeightXS, borderRadius, borderRadiusSM, borderRadiusXS, borderRadiusLG, fontSizeLG } = token;
	return {
		[`&${componentCls}-lg`]: {
			minWidth: controlHeightLG,
			minHeight: controlHeightLG,
			borderRadius: borderRadiusLG,
			[`${componentCls}-color-block, ${componentCls}-clear`]: {
				width: controlHeight,
				height: controlHeight,
				borderRadius
			},
			[`${componentCls}-trigger-text`]: { fontSize: fontSizeLG }
		},
		[`&${componentCls}-sm`]: {
			minWidth: controlHeightSM,
			minHeight: controlHeightSM,
			borderRadius: borderRadiusSM,
			[`${componentCls}-color-block, ${componentCls}-clear`]: {
				width: controlHeightXS,
				height: controlHeightXS,
				borderRadius: borderRadiusXS
			},
			[`${componentCls}-trigger-text`]: { lineHeight: unit(controlHeightXS) }
		}
	};
};
const genColorPickerStyle = (token) => {
	const { antCls, componentCls, colorPickerWidth, colorPrimary, motionDurationMid, colorBgElevated, colorTextDisabled, colorText, colorBgContainerDisabled, borderRadius, marginXS, marginSM, controlHeight, controlHeightSM, colorBgTextActive, colorPickerPresetColorSize, colorPickerPreviewSize, lineWidth, colorBorder, paddingXXS, fontSize, colorPrimaryHover, controlOutline } = token;
	return [{ [componentCls]: {
		[`${componentCls}-inner`]: {
			"&-content": {
				display: "flex",
				flexDirection: "column",
				width: colorPickerWidth,
				[`& > ${antCls}-divider`]: { margin: `${unit(marginSM)} 0 ${unit(marginXS)}` }
			},
			[`${componentCls}-panel`]: { ...picker_default(token) },
			...slider_default(token),
			...color_block_default(token, colorPickerPreviewSize),
			...input_default(token),
			...presets_default(token),
			...genClearStyle(token, colorPickerPresetColorSize, { marginInlineStart: "auto" }),
			[`${componentCls}-operation`]: {
				display: "flex",
				justifyContent: "space-between",
				marginBottom: marginXS
			}
		},
		"&-trigger": {
			minWidth: controlHeight,
			minHeight: controlHeight,
			borderRadius,
			border: `${unit(lineWidth)} solid ${colorBorder}`,
			cursor: "pointer",
			display: "inline-flex",
			alignItems: "flex-start",
			justifyContent: "center",
			transition: `all ${motionDurationMid}`,
			background: colorBgElevated,
			padding: token.calc(paddingXXS).sub(lineWidth).equal(),
			[`${componentCls}-trigger-text`]: {
				marginInlineStart: marginXS,
				marginInlineEnd: token.calc(marginXS).sub(token.calc(paddingXXS).sub(lineWidth)).equal(),
				fontSize,
				color: colorText,
				alignSelf: "center",
				"&-cell": {
					"&:not(:last-child):after": { content: "\", \"" },
					"&-inactive": { color: colorTextDisabled }
				}
			},
			"&:hover": { borderColor: colorPrimaryHover },
			[`&${componentCls}-trigger-active`]: { ...genActiveStyle(token, colorPrimary, controlOutline) },
			"&-disabled": {
				color: colorTextDisabled,
				background: colorBgContainerDisabled,
				cursor: "not-allowed",
				"&:hover": { borderColor: colorBgTextActive },
				[`${componentCls}-trigger-text`]: { color: colorTextDisabled }
			},
			...genClearStyle(token, controlHeightSM),
			...color_block_default(token, controlHeightSM),
			...genStatusStyle(token),
			...genSizeStyle(token)
		},
		...genRtlStyle(token)
	} }, genCompactItemStyle(token, { focusElCls: `${componentCls}-trigger-active` })];
};
var style_default = genStyleHooks("ColorPicker", (token) => {
	const { colorTextQuaternary, marginSM } = token;
	const colorPickerSliderHeight = 8;
	return genColorPickerStyle(mergeToken(token, {
		colorPickerWidth: 234,
		colorPickerHandlerSize: 16,
		colorPickerHandlerSizeSM: 12,
		colorPickerAlphaInputWidth: 44,
		colorPickerInputNumberHandleWidth: 16,
		colorPickerPresetColorSize: 24,
		colorPickerInsetShadow: `inset 0 0 1px 0 ${colorTextQuaternary}`,
		colorPickerSliderHeight,
		colorPickerPreviewSize: token.calc(colorPickerSliderHeight).mul(2).add(marginSM).equal()
	}));
});

//#endregion
export { style_default as default, genActiveStyle };