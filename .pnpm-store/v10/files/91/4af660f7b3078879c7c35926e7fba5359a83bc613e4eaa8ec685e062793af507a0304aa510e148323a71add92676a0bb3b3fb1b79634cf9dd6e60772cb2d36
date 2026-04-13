//#region src/select/style/token.ts
const prepareComponentToken = (token) => {
	const { fontSize, lineHeight, lineWidth, controlHeight, controlHeightSM, controlHeightLG, paddingXXS, controlPaddingHorizontal, zIndexPopupBase, colorText, fontWeightStrong, controlItemBgActive, controlItemBgHover, colorBgContainer, colorFillSecondary, colorBgContainerDisabled, colorTextDisabled, colorPrimaryHover, colorPrimary, controlOutline } = token;
	const dblPaddingXXS = paddingXXS * 2;
	const dblLineWidth = lineWidth * 2;
	const multipleItemHeight = Math.min(controlHeight - dblPaddingXXS, controlHeight - dblLineWidth);
	const multipleItemHeightSM = Math.min(controlHeightSM - dblPaddingXXS, controlHeightSM - dblLineWidth);
	const multipleItemHeightLG = Math.min(controlHeightLG - dblPaddingXXS, controlHeightLG - dblLineWidth);
	return {
		INTERNAL_FIXED_ITEM_MARGIN: Math.floor(paddingXXS / 2),
		zIndexPopup: zIndexPopupBase + 50,
		optionSelectedColor: colorText,
		optionSelectedFontWeight: fontWeightStrong,
		optionSelectedBg: controlItemBgActive,
		optionActiveBg: controlItemBgHover,
		optionPadding: `${(controlHeight - fontSize * lineHeight) / 2}px ${controlPaddingHorizontal}px`,
		optionFontSize: fontSize,
		optionLineHeight: lineHeight,
		optionHeight: controlHeight,
		selectorBg: colorBgContainer,
		clearBg: colorBgContainer,
		singleItemHeightLG: controlHeightLG,
		multipleItemBg: colorFillSecondary,
		multipleItemBorderColor: "transparent",
		multipleItemHeight,
		multipleItemHeightSM,
		multipleItemHeightLG,
		multipleSelectorBgDisabled: colorBgContainerDisabled,
		multipleItemColorDisabled: colorTextDisabled,
		multipleItemBorderColorDisabled: "transparent",
		showArrowPaddingInlineEnd: Math.ceil(token.fontSize * 1.25),
		hoverBorderColor: colorPrimaryHover,
		activeBorderColor: colorPrimary,
		activeOutlineColor: controlOutline,
		selectAffixPadding: paddingXXS
	};
};

//#endregion
export { prepareComponentToken };