import { warning } from "@v-c/util/dist/warning";

//#region src/cssinjs-utils/util/getComponentToken.ts
function getComponentToken(component, token, defaultToken, options) {
	const customToken = { ...token[component] };
	if (options?.deprecatedTokens) options.deprecatedTokens.forEach(([oldKey, newKey]) => {
		if (process.env.NODE_ENV !== "production") warning(!customToken?.[oldKey], `Component Token \`${String(oldKey)}\` of ${String(component)} is deprecated. Please use \`${String(newKey)}\` instead.`);
		if (customToken?.[oldKey] || customToken?.[newKey]) customToken[newKey] ??= customToken?.[oldKey];
	});
	const mergedToken = {
		...defaultToken,
		...customToken
	};
	Object.keys(mergedToken).forEach((key) => {
		if (mergedToken[key] === token[key]) delete mergedToken[key];
	});
	return mergedToken;
}
var getComponentToken_default = getComponentToken;

//#endregion
export { getComponentToken_default as default };