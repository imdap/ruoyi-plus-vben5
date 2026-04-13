import { toStyleStr } from "./util/index.js";
import { TOKEN_PREFIX, extract } from "./hooks/useCacheToken.js";
import { ATTR_CACHE_MAP, serialize } from "./util/cacheMapUtil.js";
import { STYLE_PREFIX, extract as extract$1 } from "./hooks/useStyleRegister.js";
import { CSS_VAR_PREFIX, extract as extract$2 } from "./hooks/useCSSVarRegister.js";

//#region src/extractStyle.ts
const ExtractStyleFns = {
	[STYLE_PREFIX]: extract$1,
	[TOKEN_PREFIX]: extract,
	[CSS_VAR_PREFIX]: extract$2
};
function isNotNull(value) {
	return value !== null;
}
function extractStyle(cache, options) {
	const { plain = false, types = [
		"style",
		"token",
		"cssVar"
	], once = false } = typeof options === "boolean" ? { plain: options } : options || {};
	const matchPrefixRegexp = new RegExp(`^(${(typeof types === "string" ? [types] : types).join("|")})%`);
	const styleKeys = Array.from(cache.cache.keys()).filter((key) => matchPrefixRegexp.test(key));
	const effectStyles = {};
	const cachePathMap = {};
	let styleText = "";
	styleKeys.map((key) => {
		if (once && cache.extracted.has(key)) return null;
		const cachePath = key.replace(matchPrefixRegexp, "").replace(/%/g, "|");
		const [prefix] = key.split("%");
		const extractFn = ExtractStyleFns[prefix];
		const extractedStyle = extractFn(cache.cache.get(key)[1], effectStyles, { plain });
		if (!extractedStyle) return null;
		const updateTime = cache.updateTimes.get(key) || 0;
		const [order, styleId, styleStr] = extractedStyle;
		if (key.startsWith("style")) cachePathMap[cachePath] = styleId;
		cache.extracted.add(key);
		return [
			order,
			styleStr,
			updateTime
		];
	}).filter(isNotNull).sort(([o1, , u1], [o2, , u2]) => {
		if (o1 !== o2) return o1 - o2;
		return u1 - u2;
	}).forEach(([, style]) => {
		styleText += style;
	});
	styleText += toStyleStr(`.${ATTR_CACHE_MAP}{content:"${serialize(cachePathMap)}";}`, void 0, void 0, { [ATTR_CACHE_MAP]: ATTR_CACHE_MAP }, plain);
	return styleText;
}

//#endregion
export { extractStyle as default };