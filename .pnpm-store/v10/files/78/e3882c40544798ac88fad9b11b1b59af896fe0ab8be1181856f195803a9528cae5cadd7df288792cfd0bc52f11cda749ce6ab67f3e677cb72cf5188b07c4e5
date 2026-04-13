import { unit } from "@antdv-next/cssinjs";

//#region src/color-picker/style/picker.ts
const genPickerStyle = (token) => {
	const { componentCls, controlHeightLG, borderRadiusSM, colorPickerInsetShadow, marginSM, colorBgElevated, colorFillSecondary, lineWidthBold, colorPickerHandlerSize } = token;
	return {
		userSelect: "none",
		[`${componentCls}-select`]: {
			[`${componentCls}-palette`]: {
				minHeight: token.calc(controlHeightLG).mul(4).equal(),
				overflow: "hidden",
				borderRadius: borderRadiusSM
			},
			[`${componentCls}-saturation`]: {
				position: "absolute",
				borderRadius: "inherit",
				boxShadow: colorPickerInsetShadow,
				inset: 0
			},
			marginBottom: marginSM
		},
		[`${componentCls}-handler`]: {
			width: colorPickerHandlerSize,
			height: colorPickerHandlerSize,
			border: `${unit(lineWidthBold)} solid ${colorBgElevated}`,
			position: "relative",
			borderRadius: "50%",
			cursor: "pointer",
			boxShadow: `${colorPickerInsetShadow}, 0 0 0 1px ${colorFillSecondary}`
		}
	};
};
var picker_default = genPickerStyle;

//#endregion
export { picker_default as default };