import { getArrowToken } from "../../style/roundedArrow.js";
import { initComponentToken } from "../../input/style/token.js";
import { FastColor } from "@ant-design/fast-color";

//#region src/date-picker/style/token.ts
function initPickerPanelToken(token) {
	const { componentCls, controlHeightLG, paddingXXS, padding } = token;
	return {
		pickerCellCls: `${componentCls}-cell`,
		pickerCellInnerCls: `${componentCls}-cell-inner`,
		pickerYearMonthCellWidth: token.calc(controlHeightLG).mul(1.5).equal(),
		pickerQuarterPanelContentHeight: token.calc(controlHeightLG).mul(1.4).equal(),
		pickerCellPaddingVertical: token.calc(paddingXXS).add(token.calc(paddingXXS).div(2)).equal(),
		pickerCellBorderGap: 2,
		pickerControlIconSize: 7,
		pickerControlIconMargin: 4,
		pickerControlIconBorderWidth: 1.5,
		pickerDatePanelPaddingHorizontal: token.calc(padding).add(token.calc(paddingXXS).div(2)).equal()
	};
}
function initPanelComponentToken(token) {
	const { colorBgContainerDisabled, controlHeight, controlHeightSM, controlHeightLG, paddingXXS, lineWidth } = token;
	const dblPaddingXXS = paddingXXS * 2;
	const dblLineWidth = lineWidth * 2;
	const multipleItemHeight = Math.min(controlHeight - dblPaddingXXS, controlHeight - dblLineWidth);
	const multipleItemHeightSM = Math.min(controlHeightSM - dblPaddingXXS, controlHeightSM - dblLineWidth);
	const multipleItemHeightLG = Math.min(controlHeightLG - dblPaddingXXS, controlHeightLG - dblLineWidth);
	return {
		INTERNAL_FIXED_ITEM_MARGIN: Math.floor(paddingXXS / 2),
		cellHoverBg: token.controlItemBgHover,
		cellActiveWithRangeBg: token.controlItemBgActive,
		cellHoverWithRangeBg: new FastColor(token.colorPrimary).lighten(35).toHexString(),
		cellRangeBorderColor: new FastColor(token.colorPrimary).lighten(20).toHexString(),
		cellBgDisabled: colorBgContainerDisabled,
		timeColumnWidth: controlHeightLG * 1.4,
		timeColumnHeight: 224,
		timeCellHeight: 28,
		cellWidth: controlHeightSM * 1.5,
		cellHeight: controlHeightSM,
		textHeight: controlHeightLG,
		withoutTimeCellHeight: controlHeightLG * 1.65,
		multipleItemBg: token.colorFillSecondary,
		multipleItemBorderColor: "transparent",
		multipleItemHeight,
		multipleItemHeightSM,
		multipleItemHeightLG,
		multipleSelectorBgDisabled: colorBgContainerDisabled,
		multipleItemColorDisabled: token.colorTextDisabled,
		multipleItemBorderColorDisabled: "transparent"
	};
}
const prepareComponentToken = (token) => ({
	...initComponentToken(token),
	...initPanelComponentToken(token),
	...getArrowToken(token),
	presetsWidth: 120,
	presetsMaxWidth: 200,
	zIndexPopup: token.zIndexPopupBase + 50
});

//#endregion
export { initPanelComponentToken, initPickerPanelToken, prepareComponentToken };