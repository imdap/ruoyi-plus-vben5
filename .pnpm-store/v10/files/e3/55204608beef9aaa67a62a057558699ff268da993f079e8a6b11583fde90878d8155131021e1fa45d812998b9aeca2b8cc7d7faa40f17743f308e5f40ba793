import seed_default from "./themes/seed.js";
import theme_default from "./themes/default/theme.js";
import formatToken from "./util/alias.js";
import { createTheme, getComputedToken } from "@antdv-next/cssinjs";

//#region src/theme/getDesignToken.ts
function getDesignToken(config) {
	const theme = config?.algorithm ? createTheme(config.algorithm) : theme_default;
	return getComputedToken({
		...seed_default,
		...config?.token
	}, { override: config?.token }, theme, formatToken);
}
var getDesignToken_default = getDesignToken;

//#endregion
export { getDesignToken_default as default };