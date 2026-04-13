import { genCssVar } from "../../theme/util/genStyleUtils.js";

//#region src/steps/style/vertical.ts
const genVerticalStyle = (token) => {
	const { componentCls, marginXXS, paddingSM, controlHeight, antCls, calc } = token;
	const itemCls = `${componentCls}-item`;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	return { [`${componentCls}-vertical`]: {
		[varName("vertical-rail-margin")]: calc(marginXXS).mul(1.5).equal(),
		flexDirection: "column",
		alignItems: "stretch",
		[`> ${itemCls}`]: {
			minHeight: calc(controlHeight).mul(1.5).equal(),
			paddingBottom: paddingSM,
			"&:last-child": { paddingBottom: 0 },
			[`${itemCls}-icon`]: { marginInlineStart: `calc((${varRef("icon-size-max")} - ${varRef("icon-size")}) / 2)` },
			[`${itemCls}-rail`]: {
				[varName("rail-offset")]: calc(varRef("heading-height")).sub(varRef("icon-size")).div(2).equal(),
				borderInlineStartWidth: varRef("rail-size"),
				position: "absolute",
				top: calc(varRef("icon-size")).add(varRef("item-wrapper-padding-top")).add(varRef("rail-offset")).add(varRef("vertical-rail-margin")).equal(),
				insetInlineStart: calc(varRef("icon-size-max")).div(2).equal(),
				bottom: calc(varRef("vertical-rail-margin")).sub(varRef("rail-offset")).equal(),
				marginInlineStart: `calc(${varRef("rail-size")} / -2)`
			}
		}
	} };
};
var vertical_default = genVerticalStyle;

//#endregion
export { vertical_default as default };