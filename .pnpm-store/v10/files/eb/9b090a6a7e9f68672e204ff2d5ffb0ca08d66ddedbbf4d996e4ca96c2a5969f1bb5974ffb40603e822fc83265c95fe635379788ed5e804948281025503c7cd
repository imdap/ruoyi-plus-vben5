import derivative from "./themes/default/index.js";
import { defaultConfig } from "./context.js";
import useToken$1 from "./useToken.js";
import getDesignToken_default from "./getDesignToken.js";
import compact_default from "./themes/compact/index.js";
import dark_default from "./themes/dark/index.js";

//#region src/theme/index.tsx
/** Get current context Design Token. Will be different if you are using nest theme config. */
function useToken() {
	const [theme, token, hashId] = useToken$1();
	return {
		theme,
		token,
		hashId
	};
}
var theme_default = {
	defaultSeed: defaultConfig.token,
	useToken,
	defaultAlgorithm: derivative,
	darkAlgorithm: dark_default,
	compactAlgorithm: compact_default,
	getDesignToken: getDesignToken_default,
	defaultConfig
};

//#endregion
export { theme_default as default };