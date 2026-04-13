import { resetComponent, textEllipsis } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { genRoundedArrow } from "../../style/roundedArrow.js";
import { initMoveMotion } from "../../style/motion/move.js";
import { initSlideMotion, slideDownIn, slideDownOut, slideUpIn, slideUpOut } from "../../style/motion/slide.js";
import { genCompactItemStyle } from "../../style/compact-item.js";
import { initInputToken } from "../../input/style/token.js";
import { genPlaceholderStyle } from "../../input/style/index.js";
import multiple_default from "./multiple.js";
import panel_default, { genPanelStyle } from "./panel.js";
import { initPanelComponentToken, initPickerPanelToken, prepareComponentToken } from "./token.js";
import variants_default from "./variants.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/date-picker/style/index.ts
function genPickerPadding(paddingBlock, paddingInline) {
	return { padding: `${unit(paddingBlock)} ${unit(paddingInline)}` };
}
const genPickerStatusStyle = (token) => {
	const { componentCls, colorError, colorWarning } = token;
	return { [`${componentCls}:not(${componentCls}-disabled):not([disabled])`]: {
		[`&${componentCls}-status-error`]: { [`${componentCls}-active-bar`]: { background: colorError } },
		[`&${componentCls}-status-warning`]: { [`${componentCls}-active-bar`]: { background: colorWarning } }
	} };
};
const genPickerStyle = (token) => {
	const { componentCls, antCls, paddingInline, lineWidth, lineType, colorBorder, borderRadius, motionDurationMid, colorTextDisabled, colorTextPlaceholder, colorTextQuaternary, fontSizeLG, inputFontSizeLG, fontSizeSM, inputFontSizeSM, controlHeightSM, paddingInlineSM, paddingXS, marginXS, colorIcon, lineWidthBold, colorPrimary, motionDurationSlow, zIndexPopup, paddingXXS, sizePopupArrow, colorBgElevated, borderRadiusLG, boxShadowSecondary, borderRadiusSM, colorSplit, cellHoverBg, presetsWidth, presetsMaxWidth, boxShadowPopoverArrow, fontHeight, lineHeightLG } = token;
	return [
		{ [componentCls]: {
			...resetComponent(token),
			...genPickerPadding(token.paddingBlock, token.paddingInline),
			position: "relative",
			display: "inline-flex",
			alignItems: "center",
			lineHeight: 1,
			borderRadius,
			transition: [
				`border`,
				`box-shadow`,
				`background-color`
			].map((prop) => `${prop} ${motionDurationMid}`).join(", "),
			[`${componentCls}-prefix`]: {
				flex: "0 0 auto",
				marginInlineEnd: token.inputAffixPadding
			},
			[`${componentCls}-input`]: {
				position: "relative",
				display: "inline-flex",
				alignItems: "center",
				width: "100%",
				"> input": {
					position: "relative",
					display: "inline-block",
					width: "100%",
					color: "inherit",
					fontSize: token.inputFontSize ?? token.fontSize,
					lineHeight: token.lineHeight,
					transition: `all ${motionDurationMid}`,
					...genPlaceholderStyle(colorTextPlaceholder),
					flex: "auto",
					minWidth: 1,
					height: "auto",
					padding: 0,
					background: "transparent",
					border: 0,
					fontFamily: "inherit",
					"&:focus": {
						boxShadow: "none",
						outline: 0
					},
					"&[disabled]": {
						background: "transparent",
						color: colorTextDisabled,
						cursor: "not-allowed"
					}
				},
				"&-placeholder": { "> input": { color: colorTextPlaceholder } }
			},
			"&-large": {
				...genPickerPadding(token.paddingBlockLG, token.paddingInlineLG),
				borderRadius: token.borderRadiusLG,
				[`${componentCls}-input > input`]: {
					fontSize: inputFontSizeLG ?? fontSizeLG,
					lineHeight: lineHeightLG
				}
			},
			"&-small": {
				...genPickerPadding(token.paddingBlockSM, token.paddingInlineSM),
				borderRadius: token.borderRadiusSM,
				[`${componentCls}-input > input`]: { fontSize: inputFontSizeSM ?? fontSizeSM }
			},
			[`${componentCls}-suffix`]: {
				display: "flex",
				flex: "none",
				alignSelf: "center",
				marginInlineStart: token.calc(paddingXS).div(2).equal(),
				color: colorTextQuaternary,
				lineHeight: 1,
				pointerEvents: "none",
				transition: ["opacity", "color"].map((prop) => `${prop} ${motionDurationMid}`).join(", "),
				"> *": {
					verticalAlign: "top",
					"&:not(:last-child)": { marginInlineEnd: marginXS }
				}
			},
			[`${componentCls}-clear`]: {
				position: "absolute",
				top: "50%",
				insetInlineEnd: 0,
				color: colorTextQuaternary,
				lineHeight: 1,
				transform: "translateY(-50%)",
				cursor: "pointer",
				opacity: 0,
				transition: ["opacity", "color"].map((prop) => `${prop} ${motionDurationMid}`).join(", "),
				"> *": { verticalAlign: "top" },
				"&:hover": { color: colorIcon }
			},
			"&:hover": {
				[`${componentCls}-clear`]: { opacity: 1 },
				[`${componentCls}-suffix:not(:last-child)`]: { opacity: 0 }
			},
			[`${componentCls}-separator`]: {
				position: "relative",
				display: "inline-block",
				width: "1em",
				height: fontSizeLG,
				color: colorTextQuaternary,
				fontSize: fontSizeLG,
				verticalAlign: "top",
				cursor: "default",
				[`${componentCls}-focused &`]: { color: colorIcon },
				[`${componentCls}-range-separator &`]: { [`${componentCls}-disabled &`]: { cursor: "not-allowed" } }
			},
			"&-range": {
				position: "relative",
				display: "inline-flex",
				[`${componentCls}-active-bar`]: {
					bottom: token.calc(lineWidth).mul(-1).equal(),
					height: lineWidthBold,
					background: colorPrimary,
					opacity: 0,
					transition: `all ${motionDurationSlow} ease-out`,
					pointerEvents: "none"
				},
				[`&${componentCls}-focused`]: { [`${componentCls}-active-bar`]: { opacity: 1 } },
				[`${componentCls}-range-separator`]: {
					alignItems: "center",
					padding: `0 ${unit(paddingXS)}`,
					lineHeight: 1
				}
			},
			"&-range, &-multiple": {
				[`${componentCls}-clear`]: { insetInlineEnd: paddingInline },
				[`&${componentCls}-small`]: { [`${componentCls}-clear`]: { insetInlineEnd: paddingInlineSM } }
			},
			"&-dropdown": {
				...resetComponent(token),
				...genPanelStyle(token),
				pointerEvents: "none",
				position: "absolute",
				top: -9999,
				left: {
					_skip_check_: true,
					value: -9999
				},
				zIndex: zIndexPopup,
				[`&${componentCls}-dropdown-hidden`]: { display: "none" },
				"&-rtl": { direction: "rtl" },
				[`&${componentCls}-dropdown-placement-bottomLeft,
            &${componentCls}-dropdown-placement-bottomRight`]: { [`${componentCls}-range-arrow`]: {
					top: 0,
					display: "block",
					transform: "translateY(-100%)"
				} },
				[`&${componentCls}-dropdown-placement-topLeft,
            &${componentCls}-dropdown-placement-topRight`]: { [`${componentCls}-range-arrow`]: {
					bottom: 0,
					display: "block",
					transform: "translateY(100%) rotate(180deg)"
				} },
				[`&${antCls}-slide-up-appear, &${antCls}-slide-up-enter`]: { [`${componentCls}-range-arrow${componentCls}-range-arrow`]: { transition: "none" } },
				[`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-topRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-topRight`]: { animationName: slideDownIn },
				[`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-bottomRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-bottomRight`]: { animationName: slideUpIn },
				[`&${antCls}-slide-up-leave ${componentCls}-panel-container`]: { pointerEvents: "none" },
				[`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-topRight`]: { animationName: slideDownOut },
				[`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-bottomRight`]: { animationName: slideUpOut },
				[`${componentCls}-panel > ${componentCls}-time-panel`]: { paddingTop: paddingXXS },
				[`${componentCls}-range-wrapper`]: {
					display: "flex",
					position: "relative"
				},
				[`${componentCls}-range-arrow`]: {
					position: "absolute",
					zIndex: 1,
					display: "none",
					paddingInline: token.calc(paddingInline).mul(1.5).equal(),
					boxSizing: "content-box",
					transition: `all ${motionDurationSlow} ease-out`,
					...genRoundedArrow(token, colorBgElevated, boxShadowPopoverArrow),
					"&:before": { insetInlineStart: token.calc(paddingInline).mul(1.5).equal() }
				},
				[`${componentCls}-panel-container`]: {
					overflow: "hidden",
					verticalAlign: "top",
					background: colorBgElevated,
					borderRadius: borderRadiusLG,
					boxShadow: boxShadowSecondary,
					transition: `margin ${motionDurationSlow}`,
					display: "inline-block",
					pointerEvents: "auto",
					[`${componentCls}-panel-layout`]: {
						display: "flex",
						flexWrap: "nowrap",
						alignItems: "stretch"
					},
					[`${componentCls}-presets`]: {
						display: "flex",
						flexDirection: "column",
						minWidth: presetsWidth,
						maxWidth: presetsMaxWidth,
						ul: {
							height: 0,
							flex: "auto",
							listStyle: "none",
							overflow: "auto",
							margin: 0,
							padding: paddingXS,
							borderInlineEnd: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
							li: {
								...textEllipsis,
								borderRadius: borderRadiusSM,
								paddingInline: paddingXS,
								paddingBlock: token.calc(controlHeightSM).sub(fontHeight).div(2).equal(),
								cursor: "pointer",
								transition: `all ${motionDurationSlow}`,
								"+ li": { marginTop: marginXS },
								"&:hover": { background: cellHoverBg }
							}
						}
					},
					[`${componentCls}-panels`]: {
						display: "inline-flex",
						flexWrap: "nowrap",
						"&:last-child": { [`${componentCls}-panel`]: { borderWidth: 0 } }
					},
					[`${componentCls}-panel`]: {
						verticalAlign: "top",
						background: "transparent",
						borderRadius: 0,
						borderWidth: 0,
						[`${componentCls}-content, table`]: { textAlign: "center" },
						"&-focused": { borderColor: colorBorder }
					}
				}
			},
			"&-dropdown-range": {
				padding: `${unit(token.calc(sizePopupArrow).mul(2).div(3).equal())} 0`,
				"&-hidden": { display: "none" }
			},
			"&-rtl": {
				direction: "rtl",
				[`${componentCls}-separator`]: { transform: "scale(-1, 1)" },
				[`${componentCls}-footer`]: { "&-extra": { direction: "rtl" } }
			}
		} },
		initSlideMotion(token, "slide-up"),
		initSlideMotion(token, "slide-down"),
		initMoveMotion(token, "move-up"),
		initMoveMotion(token, "move-down")
	];
};
var style_default = genStyleHooks("DatePicker", (token) => {
	const pickerToken = mergeToken(initInputToken(token), initPickerPanelToken(token), {
		inputPaddingHorizontalBase: token.calc(token.paddingSM).sub(1).equal(),
		multipleSelectItemHeight: token.multipleItemHeight,
		selectHeight: token.controlHeight
	});
	return [
		panel_default(pickerToken),
		genPickerStyle(pickerToken),
		variants_default(pickerToken),
		genPickerStatusStyle(pickerToken),
		multiple_default(pickerToken),
		genCompactItemStyle(token, { focusElCls: `${token.componentCls}-focused` })
	];
}, prepareComponentToken);

//#endregion
export { style_default as default, genPanelStyle, initPanelComponentToken, initPickerPanelToken };