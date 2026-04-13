import { resetComponent } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { AggregationColor } from "../../color-picker/color.js";
import { isBright } from "../../color-picker/components/ColorPresets.js";
import { unit } from "@antdv-next/cssinjs";
import { FastColor } from "@ant-design/fast-color";

//#region src/tag/style/index.ts
const genBaseStyle = (token) => {
	const { paddingXXS, lineWidth, tagPaddingHorizontal, componentCls, calc } = token;
	const paddingInline = calc(tagPaddingHorizontal).sub(lineWidth).equal();
	const iconMarginInline = calc(paddingXXS).sub(lineWidth).equal();
	return {
		[componentCls]: {
			...resetComponent(token),
			display: "inline-block",
			height: "auto",
			paddingInline,
			fontSize: token.tagFontSize,
			lineHeight: token.tagLineHeight,
			whiteSpace: "nowrap",
			backgroundColor: token.defaultBg,
			border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
			borderRadius: token.borderRadiusSM,
			opacity: 1,
			transition: `all ${token.motionDurationMid}`,
			textAlign: "start",
			position: "relative",
			[`&${componentCls}-rtl`]: { direction: "rtl" },
			"&, a, a:hover": { color: token.defaultColor },
			[`${componentCls}-close-icon`]: {
				marginInlineStart: iconMarginInline,
				fontSize: token.tagIconSize,
				color: token.colorIcon,
				cursor: "pointer",
				transition: `all ${token.motionDurationMid}`,
				"&:hover": { color: token.colorTextHeading }
			},
			"&-checkable": {
				backgroundColor: "transparent",
				borderColor: "transparent",
				cursor: "pointer",
				[`&:not(${componentCls}-checkable-checked):hover`]: {
					color: token.colorPrimary,
					backgroundColor: token.colorFillSecondary
				},
				"&:active, &-checked": { color: token.colorTextLightSolid },
				"&-checked": {
					backgroundColor: token.colorPrimary,
					"&:hover": { backgroundColor: token.colorPrimaryHover }
				},
				"&:active": { backgroundColor: token.colorPrimaryActive },
				"&-disabled": {
					cursor: "not-allowed",
					[`&:not(${componentCls}-checkable-checked)`]: {
						color: token.colorTextDisabled,
						"&:hover": { backgroundColor: "transparent" }
					},
					[`&${componentCls}-checkable-checked`]: {
						color: token.colorTextDisabled,
						backgroundColor: token.colorBgContainerDisabled
					},
					"&:hover, &:active": {
						backgroundColor: token.colorBgContainerDisabled,
						color: token.colorTextDisabled
					},
					[`&:not(${componentCls}-checkable-checked):hover`]: { color: token.colorTextDisabled }
				},
				"&-group": {
					display: "flex",
					flexWrap: "wrap",
					gap: token.paddingXS
				}
			},
			"&-hidden": { display: "none" },
			[`> ${token.iconCls} + span, > span + ${token.iconCls}`]: { marginInlineStart: paddingInline }
		},
		[`&${token.componentCls}-solid`]: {
			borderColor: "transparent",
			color: token.colorTextLightSolid,
			backgroundColor: token.colorBgSolid,
			[`&${componentCls}-default`]: { color: token.solidTextColor }
		},
		[`${componentCls}-filled`]: {
			borderColor: "transparent",
			backgroundColor: token.tagBorderlessBg
		},
		[`&${componentCls}-disabled`]: {
			color: token.colorTextDisabled,
			cursor: "not-allowed",
			backgroundColor: token.colorBgContainerDisabled,
			a: {
				cursor: "not-allowed",
				pointerEvents: "none",
				color: token.colorTextDisabled,
				"&:hover": { color: token.colorTextDisabled }
			},
			"a&": { "&:hover, &:active": { color: token.colorTextDisabled } },
			[`&${componentCls}-outlined`]: { borderColor: token.colorBorderDisabled },
			[`&${componentCls}-solid, &${componentCls}-filled`]: {
				color: token.colorTextDisabled,
				[`${componentCls}-close-icon`]: { color: token.colorTextDisabled }
			},
			[`${componentCls}-close-icon`]: {
				cursor: "not-allowed",
				color: token.colorTextDisabled,
				"&:hover": { color: token.colorTextDisabled }
			}
		}
	};
};
function prepareToken(token) {
	const { lineWidth, fontSizeIcon, calc } = token;
	const tagFontSize = token.fontSizeSM;
	return mergeToken(token, {
		tagFontSize,
		tagLineHeight: unit(calc(token.lineHeightSM).mul(tagFontSize).equal()),
		tagIconSize: calc(fontSizeIcon).sub(calc(lineWidth).mul(2)).equal(),
		tagPaddingHorizontal: 8,
		tagBorderlessBg: token.defaultBg
	});
}
const prepareComponentToken = (token) => {
	const solidTextColor = isBright(new AggregationColor(token.colorBgSolid), "#fff") ? "#000" : "#fff";
	return {
		defaultBg: new FastColor(token.colorFillTertiary).onBackground(token.colorBgContainer).toHexString(),
		defaultColor: token.colorText,
		solidTextColor
	};
};
var style_default = genStyleHooks("Tag", (token) => {
	return genBaseStyle(prepareToken(token));
}, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken, prepareToken };