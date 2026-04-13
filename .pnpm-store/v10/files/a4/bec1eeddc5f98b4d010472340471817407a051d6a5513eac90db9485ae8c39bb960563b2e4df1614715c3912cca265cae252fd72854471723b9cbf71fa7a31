import { merge } from "./statistic.js";

//#region src/cssinjs-utils/util/getDefaultComponentToken.ts
function getDefaultComponentToken(component, token, getDefaultToken) {
	if (typeof getDefaultToken === "function") return getDefaultToken(merge(token, token[component] ?? {}));
	return getDefaultToken ?? {};
}
var getDefaultComponentToken_default = getDefaultComponentToken;

//#endregion
export { getDefaultComponentToken_default as default };