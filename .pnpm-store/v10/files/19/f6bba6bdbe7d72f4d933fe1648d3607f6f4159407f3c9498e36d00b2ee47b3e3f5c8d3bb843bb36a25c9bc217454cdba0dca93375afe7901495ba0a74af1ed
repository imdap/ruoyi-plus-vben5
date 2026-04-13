import { genCssVar } from "../../theme/util/genStyleUtils.js";

//#region src/steps/style/util.ts
function withoutVar(cssVar) {
	return (cssVar || "--ant-not-exist").replace(/var\((.*)\)/, "$1");
}
/**
* Force override the width related styles.
* This should be multiple since will conflict with other `rail` styles.
*/
function getItemWithWidthStyle(token, marginSize, optionalStyle) {
	const { calc, componentCls, descriptionMaxWidth, antCls } = token;
	const itemCls = `${componentCls}-item`;
	const [, varRef] = genCssVar(antCls, "cmp-steps");
	return { [`@container style(${withoutVar(descriptionMaxWidth)})`]: [{
		[`${itemCls}-icon`]: { marginInlineStart: calc(descriptionMaxWidth).sub(varRef("icon-size")).div(2).equal() },
		[`${itemCls}-rail`]: {
			width: "auto",
			insetInlineStart: calc(descriptionMaxWidth).add(varRef("icon-size")).div(2).add(marginSize).equal(),
			insetInlineEnd: calc(descriptionMaxWidth).sub(varRef("icon-size")).div(2).sub(marginSize).mul(-1).equal()
		}
	}, optionalStyle] };
}

//#endregion
export { getItemWithWidthStyle };