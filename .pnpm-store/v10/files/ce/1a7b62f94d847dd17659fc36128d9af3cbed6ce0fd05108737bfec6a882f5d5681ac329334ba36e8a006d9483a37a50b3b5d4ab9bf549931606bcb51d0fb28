import { initComponentToken } from "../../input/style/token.js";
import { FastColor } from "@ant-design/fast-color";

//#region src/input-number/style/token.ts
const prepareComponentToken = (token) => {
	const handleVisible = token.handleVisible ?? "auto";
	const handleWidth = token.controlHeightSM - token.lineWidth * 2;
	return {
		...initComponentToken(token),
		controlWidth: 90,
		handleWidth,
		handleFontSize: token.fontSize / 2,
		handleVisible,
		handleActiveBg: token.colorFillAlter,
		handleBg: token.colorBgContainer,
		filledHandleBg: new FastColor(token.colorFillSecondary).onBackground(token.colorBgContainer).toHexString(),
		handleHoverColor: token.colorPrimary,
		handleBorderColor: token.colorBorder,
		handleOpacity: handleVisible === true ? 1 : 0,
		handleVisibleWidth: handleVisible === true ? handleWidth : 0
	};
};

//#endregion
export { prepareComponentToken };