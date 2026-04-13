import { genCssVar, genSubStyleComponent } from "../../theme/util/genStyleUtils.js";
import { prepareComponentToken, prepareToken } from "./token.js";
import { genCompactItemStyle } from "../../style/compact-item.js";
import { genCompactItemVerticalStyle } from "../../style/compact-item-vertical.js";

//#region src/button/style/compact.ts
const genButtonCompactStyle = (token) => {
	const { antCls, componentCls, lineWidth, calc, colorBgContainer } = token;
	const solidSelector = `${componentCls}-variant-solid:not([disabled])`;
	const insetOffset = calc(lineWidth).mul(-1).equal();
	const [varName, varRef] = genCssVar(antCls, "btn");
	const getCompactBorderStyle = (vertical) => {
		return { [`${componentCls}-compact${vertical ? "-vertical" : ""}-item`]: {
			[varName("compact-connect-border-color")]: varRef("bg-color-hover"),
			[`&${solidSelector}`]: {
				transition: `none`,
				[`& + ${solidSelector}:before`]: [{
					position: "absolute",
					backgroundColor: varRef("compact-connect-border-color"),
					content: "\"\""
				}, vertical ? {
					top: insetOffset,
					insetInline: insetOffset,
					height: lineWidth
				} : {
					insetBlock: insetOffset,
					insetInlineStart: insetOffset,
					width: lineWidth
				}],
				"&:hover:before": { display: "none" }
			}
		} };
	};
	return [
		getCompactBorderStyle(),
		getCompactBorderStyle(true),
		{ [`${solidSelector}${componentCls}-color-default`]: { [varName("compact-connect-border-color")]: `color-mix(in srgb, ${varRef("bg-color-hover")} 75%, ${colorBgContainer})` } }
	];
};
var compact_default = genSubStyleComponent(["Button", "compact"], (token) => {
	const buttonToken = prepareToken(token);
	return [
		genCompactItemStyle(buttonToken),
		genCompactItemVerticalStyle(buttonToken),
		genButtonCompactStyle(buttonToken)
	];
}, prepareComponentToken);

//#endregion
export { compact_default as default };