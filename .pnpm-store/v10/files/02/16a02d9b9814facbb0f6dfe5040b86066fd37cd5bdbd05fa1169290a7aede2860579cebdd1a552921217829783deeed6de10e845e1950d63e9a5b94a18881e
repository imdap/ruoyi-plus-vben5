import { genCssVar } from "../theme/util/genStyleUtils.js";
import { isPresetColor } from "../_util/colors.js";
import { generateColor } from "../color-picker/util.js";
import { classNames } from "@v-c/util";

//#region src/tooltip/util.ts
function parseColor(rootPrefixCls, prefixCls, color) {
	const isInternalColor = isPresetColor(color);
	const [varName] = genCssVar(rootPrefixCls, "tooltip");
	const className = classNames({ [`${prefixCls}-${color}`]: color && isInternalColor });
	const overlayStyle = {};
	const arrowStyle = {};
	const rgb = generateColor(color).toRgb();
	const textColor = (.299 * rgb.r + .587 * rgb.g + .114 * rgb.b) / 255 < .5 ? "#FFF" : "#000";
	if (color && !isInternalColor) {
		overlayStyle.background = color;
		overlayStyle[varName("overlay-color")] = textColor;
		arrowStyle[varName("arrow-background-color")] = color;
	}
	return {
		className,
		overlayStyle,
		arrowStyle
	};
}

//#endregion
export { parseColor };