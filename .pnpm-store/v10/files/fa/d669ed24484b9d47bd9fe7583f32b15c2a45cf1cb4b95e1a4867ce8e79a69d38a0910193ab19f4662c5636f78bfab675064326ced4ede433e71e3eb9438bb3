import { genCssVar } from "../../theme/util/genStyleUtils.js";
import { getItemWithWidthStyle } from "./util.js";

//#region src/steps/style/progress-dot.ts
const genDotStyle = (token) => {
	const { componentCls, iconSize, dotSize, dotCurrentSize, marginXXS, lineWidthBold, fontSizeSM, antCls } = token;
	const itemCls = `${componentCls}-item`;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	return { [`${componentCls}${componentCls}-dot`]: {
		[varName("icon-size-active")]: dotCurrentSize,
		[varName("icon-size")]: dotSize,
		[varName("dot-icon-size")]: dotSize,
		[varName("dot-icon-border-width")]: lineWidthBold,
		[varName("rail-size")]: lineWidthBold,
		[varName("icon-border-width")]: lineWidthBold,
		[`${itemCls}-custom ${itemCls}-icon`]: { fontSize: fontSizeSM },
		[`${itemCls}-icon`]: {
			position: "relative",
			"&:after": {
				content: "\"\"",
				width: iconSize,
				height: iconSize,
				display: "block",
				position: "absolute",
				top: "50%",
				left: {
					_skip_check_: true,
					value: "50%"
				},
				transform: "translate(-50%, -50%)"
			}
		},
		[`${itemCls}-active ${itemCls}-icon`]: { [varName("icon-size")]: varRef("icon-size-active") },
		[`&${componentCls}-horizontal`]: { [`&, &${componentCls}-small`]: getItemWithWidthStyle(token, marginXXS) }
	} };
};
var progress_dot_default = genDotStyle;

//#endregion
export { progress_dot_default as default };