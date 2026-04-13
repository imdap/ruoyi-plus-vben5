import { genCssVar } from "../../theme/util/genStyleUtils.js";

//#region src/steps/style/icon.ts
const genIconStyle = (token) => {
	const { componentCls, customIconFontSize, motionDurationSlow, iconSize, lineWidth, lineType, antCls } = token;
	const itemCls = `${componentCls}-item`;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	return { [componentCls]: {
		[varName("icon-size")]: iconSize,
		[varName("icon-border-width")]: lineWidth,
		[`${itemCls}-icon`]: {
			width: varRef("icon-size"),
			height: varRef("icon-size"),
			margin: 0,
			flex: "none",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			fontSize: token.iconFontSize,
			fontFamily: token.fontFamily,
			lineHeight: varRef("icon-size"),
			textAlign: "center",
			borderRadius: varRef("icon-size"),
			border: `${varRef("icon-border-width")} ${lineType} transparent`,
			transition: [
				"background-color",
				"border",
				"color",
				"inset",
				"transform"
			].map((key) => `${key} ${motionDurationSlow}`).join(", "),
			zIndex: 1
		},
		[`${itemCls}-custom ${itemCls}-icon`]: {
			background: "none",
			border: 0,
			fontSize: customIconFontSize
		}
	} };
};
var icon_default = genIconStyle;

//#endregion
export { icon_default as default };