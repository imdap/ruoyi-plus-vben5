import Theme from "./Theme.js";
import ThemeCache from "./ThemeCache.js";

//#region src/theme/createTheme.ts
const cacheThemes = new ThemeCache();
/**
* Same as new Theme, but will always return same one if `derivative` not changed.
*/
function createTheme(derivatives) {
	const derivativeArr = Array.isArray(derivatives) ? derivatives : [derivatives];
	if (!cacheThemes.has(derivativeArr)) cacheThemes.set(derivativeArr, new Theme(derivativeArr));
	return cacheThemes.get(derivativeArr);
}

//#endregion
export { createTheme as default };