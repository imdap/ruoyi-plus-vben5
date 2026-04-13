import { genCssVar } from "../../theme/util/genStyleUtils.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/steps/style/rtl.ts
const genRTLStyle = (token) => {
	const { componentCls, lineWidthBold, antCls } = token;
	const itemCls = `${componentCls}-item`;
	const [, varRef] = genCssVar(antCls, "cmp-steps");
	return { [`${componentCls}${componentCls}-rtl`]: {
		direction: "rtl",
		[`&${componentCls}-navigation${componentCls}-horizontal`]: { [`${itemCls}:after`]: { transform: "translateY(-50%) rotate(-45deg)" } },
		[`&${componentCls}-panel`]: {
			[`${componentCls}-panel-arrow`]: { transform: `scaleX(-1)` },
			[`&${componentCls}-filled`]: { [itemCls]: { "&:not(:first-child)": { clipPath: `polygon(${[
				`calc(0px - ${varRef("item-base-width")}) 0px`,
				`calc(100% - ${unit(lineWidthBold)}) 0px`,
				`calc(100% - ${varRef("item-base-width")} - ${unit(lineWidthBold)}) 50%`,
				`calc(100% - ${unit(lineWidthBold)}) 100%`,
				`calc(0px - ${varRef("item-base-width")}) 100%`
			].join(",")})` } } }
		}
	} };
};
var rtl_default = genRTLStyle;

//#endregion
export { rtl_default as default };