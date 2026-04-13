import { genSubStyleComponent } from "../../theme/util/genStyleUtils.js";
import { prepareComponentToken, prepareToken } from "./index.js";
import capitalize from "../../_util/capitalize.js";

//#region src/tag/style/statusCmp.ts
function genTagStatusStyle(token, status, cssVariableType) {
	const capitalizedCssVariableType = capitalize(cssVariableType);
	return { [`${token.componentCls}${token.componentCls}-${status}:not(${token.componentCls}-disabled)`]: {
		[`&${token.componentCls}-outlined`]: {
			backgroundColor: token[`color${capitalizedCssVariableType}Bg`],
			borderColor: token[`color${capitalizedCssVariableType}Border`],
			color: token[`color${cssVariableType}`]
		},
		[`&${token.componentCls}-solid`]: {
			backgroundColor: token[`color${cssVariableType}`],
			borderColor: token[`color${cssVariableType}`]
		},
		[`&${token.componentCls}-filled`]: {
			backgroundColor: token[`color${capitalizedCssVariableType}Bg`],
			color: token[`color${cssVariableType}`]
		}
	} };
}
var statusCmp_default = genSubStyleComponent(["Tag", "status"], (token) => {
	const tagToken = prepareToken(token);
	return [
		genTagStatusStyle(tagToken, "success", "Success"),
		genTagStatusStyle(tagToken, "processing", "Info"),
		genTagStatusStyle(tagToken, "error", "Error"),
		genTagStatusStyle(tagToken, "warning", "Warning")
	];
}, prepareComponentToken);

//#endregion
export { statusCmp_default as default };