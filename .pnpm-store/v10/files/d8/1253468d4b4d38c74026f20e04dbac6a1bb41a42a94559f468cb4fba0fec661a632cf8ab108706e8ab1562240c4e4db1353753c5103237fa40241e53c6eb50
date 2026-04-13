import { PresetColors } from "../../theme/interface/presetColors.js";
import { getLineHeight } from "../../theme/themes/shared/genFontSizes.js";
import getAlphaColor_default from "../../theme/util/getAlphaColor.js";
import { mergeToken } from "../../theme/internal.js";
import { AggregationColor } from "../../color-picker/color.js";
import { isBright } from "../../color-picker/components/ColorPresets.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/button/style/token.ts
function prepareToken(token) {
	const { paddingInline, onlyIconSize, borderColorDisabled } = token;
	return mergeToken(token, {
		buttonPaddingHorizontal: paddingInline,
		buttonPaddingVertical: 0,
		buttonIconOnlyFontSize: onlyIconSize,
		colorBorderDisabled: borderColorDisabled
	});
}
const prepareComponentToken = (token) => {
	const contentFontSize = token.contentFontSize ?? token.fontSize;
	const contentFontSizeSM = token.contentFontSizeSM ?? token.fontSize;
	const contentFontSizeLG = token.contentFontSizeLG ?? token.fontSizeLG;
	const contentLineHeight = token.contentLineHeight ?? getLineHeight(contentFontSize);
	const contentLineHeightSM = token.contentLineHeightSM ?? getLineHeight(contentFontSizeSM);
	const contentLineHeightLG = token.contentLineHeightLG ?? getLineHeight(contentFontSizeLG);
	const solidTextColor = isBright(new AggregationColor(token.colorBgSolid), "#fff") ? "#000" : "#fff";
	const shadowColorTokens = PresetColors.reduce((prev, colorKey) => ({
		...prev,
		[`${colorKey}ShadowColor`]: `0 ${unit(token.controlOutlineWidth)} 0 ${getAlphaColor_default(token[`${colorKey}1`], token.colorBgContainer)}`
	}), {});
	const defaultBgDisabled = token.colorBgContainerDisabled;
	const dashedBgDisabled = token.colorBgContainerDisabled;
	return {
		...shadowColorTokens,
		fontWeight: 400,
		iconGap: token.marginXS,
		defaultShadow: `0 ${token.controlOutlineWidth}px 0 ${token.controlTmpOutline}`,
		primaryShadow: `0 ${token.controlOutlineWidth}px 0 ${token.controlOutline}`,
		dangerShadow: `0 ${token.controlOutlineWidth}px 0 ${token.colorErrorOutline}`,
		primaryColor: token.colorTextLightSolid,
		dangerColor: token.colorTextLightSolid,
		borderColorDisabled: token.colorBorderDisabled,
		defaultGhostColor: token.colorBgContainer,
		ghostBg: "transparent",
		defaultGhostBorderColor: token.colorBgContainer,
		paddingInline: token.paddingContentHorizontal - token.lineWidth,
		paddingInlineLG: token.paddingContentHorizontal - token.lineWidth,
		paddingInlineSM: 8 - token.lineWidth,
		onlyIconSize: "inherit",
		onlyIconSizeSM: "inherit",
		onlyIconSizeLG: "inherit",
		groupBorderColor: token.colorPrimaryHover,
		linkHoverBg: "transparent",
		textTextColor: token.colorText,
		textTextHoverColor: token.colorText,
		textTextActiveColor: token.colorText,
		textHoverBg: token.colorFillTertiary,
		defaultColor: token.colorText,
		defaultBg: token.colorBgContainer,
		defaultBorderColor: token.colorBorder,
		defaultBorderColorDisabled: token.colorBorder,
		defaultHoverBg: token.colorBgContainer,
		defaultHoverColor: token.colorPrimaryHover,
		defaultHoverBorderColor: token.colorPrimaryHover,
		defaultActiveBg: token.colorBgContainer,
		defaultActiveColor: token.colorPrimaryActive,
		defaultActiveBorderColor: token.colorPrimaryActive,
		solidTextColor,
		contentFontSize,
		contentFontSizeSM,
		contentFontSizeLG,
		contentLineHeight,
		contentLineHeightSM,
		contentLineHeightLG,
		paddingBlock: Math.max((token.controlHeight - contentFontSize * contentLineHeight) / 2 - token.lineWidth, 0),
		paddingBlockSM: Math.max((token.controlHeightSM - contentFontSizeSM * contentLineHeightSM) / 2 - token.lineWidth, 0),
		paddingBlockLG: Math.max((token.controlHeightLG - contentFontSizeLG * contentLineHeightLG) / 2 - token.lineWidth, 0),
		defaultBgDisabled,
		dashedBgDisabled
	};
};

//#endregion
export { prepareComponentToken, prepareToken };