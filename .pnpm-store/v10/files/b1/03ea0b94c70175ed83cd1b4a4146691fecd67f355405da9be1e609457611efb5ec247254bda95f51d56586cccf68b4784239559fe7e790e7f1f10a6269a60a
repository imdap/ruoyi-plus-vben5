import { ATTR_MARK, ATTR_TOKEN, CSS_IN_JS_INSTANCE, useStyleContext } from "../StyleContext.js";
import { collectStyleText } from "../ssr/styleCollector.js";
import resolveHash_default from "../util/resolveHash.js";
import { transformToken } from "../util/css-variables.js";
import { flattenToken, injectCSPNonce, memoResult, toStyleStr, token2key } from "../util/index.js";
import { useGlobalCache } from "./useGlobalCache.js";
import { computed } from "vue";
import canUseDom from "@v-c/util/dist/Dom/canUseDom";
import { updateCSS } from "@v-c/util/dist/Dom/dynamicCSS";

//#region src/hooks/useCacheToken.ts
const EMPTY_OVERRIDE = {};
const hashPrefix = process.env.NODE_ENV !== "production" ? "css-dev-only-do-not-override" : "css";
const tokenKeys = /* @__PURE__ */ new Map();
function recordCleanToken(tokenKey) {
	tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) + 1);
}
function removeStyleTags(key, instanceId) {
	if (typeof document !== "undefined") document.querySelectorAll(`style[${ATTR_TOKEN}="${key}"]`).forEach((style) => {
		if (style[CSS_IN_JS_INSTANCE] === instanceId) style.parentNode?.removeChild(style);
	});
}
const TOKEN_THRESHOLD = -1;
function cleanTokenStyle(tokenKey, instanceId) {
	tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) - 1);
	const cleanableKeyList = /* @__PURE__ */ new Set();
	tokenKeys.forEach((value, key) => {
		if (value <= 0) cleanableKeyList.add(key);
	});
	if (tokenKeys.size - cleanableKeyList.size > TOKEN_THRESHOLD) cleanableKeyList.forEach((key) => {
		removeStyleTags(key, instanceId);
		tokenKeys.delete(key);
	});
}
function getComputedToken(originToken, overrideToken, theme, format) {
	let mergedDerivativeToken = {
		...theme.getDerivativeToken(originToken),
		...overrideToken
	};
	if (format) mergedDerivativeToken = format(mergedDerivativeToken);
	return mergedDerivativeToken;
}
const TOKEN_PREFIX = "token";
const extract = (cache, _effectStyles, options) => {
	const [, , realToken, styleStr, cssVarKey] = cache;
	const { plain } = options || {};
	if (!styleStr) return null;
	const styleId = realToken._tokenKey;
	const order = -999;
	return [
		order,
		styleId,
		toStyleStr(styleStr, cssVarKey, styleId, {
			"data-vc-order": "prependQueue",
			"data-vc-priority": `${order}`
		}, plain)
	];
};
/**
* Cache theme derivative token as global shared one
* @param theme Theme entity
* @param tokens List of tokens, used for cache. Please do not dynamic generate object directly
* @param option Additional config
* @returns Call Theme.getDerivativeToken(tokenObject) to get token
*/
function useCacheToken(theme, tokens, option) {
	const styleContext = useStyleContext();
	const salt = computed(() => option.value.salt ?? "");
	const override = computed(() => option.value.override ? option.value.override : EMPTY_OVERRIDE);
	const formatToken = computed(() => option.value.formatToken);
	const compute = computed(() => option.value.getComputedToken);
	const cssVar = computed(() => option.value.cssVar);
	const nonce = computed(() => option.value.nonce);
	const resolvedTokens = computed(() => tokens.value.map((token) => typeof token === "function" ? token() : token));
	const mergedToken = computed(() => memoResult(() => Object.assign({}, ...resolvedTokens.value), resolvedTokens.value));
	const tokenStr = computed(() => flattenToken(mergedToken.value));
	const overrideTokenStr = computed(() => flattenToken(override.value));
	const cssVarStr = computed(() => flattenToken(cssVar.value));
	return useGlobalCache(computed(() => TOKEN_PREFIX), computed(() => [
		salt.value,
		theme.value.id,
		tokenStr.value,
		overrideTokenStr.value,
		cssVarStr.value
	]), () => {
		const mergedDerivativeToken = compute.value ? compute.value(mergedToken.value, override.value, theme.value) : getComputedToken(mergedToken.value, override.value, theme.value, formatToken.value);
		const actualToken = { ...mergedDerivativeToken };
		const mergedSalt = `${salt.value}_${cssVar.value.prefix || ""}`;
		const hashId = resolveHash_default(mergedSalt);
		const hashCls = `${hashPrefix}-${hashId}`;
		actualToken._tokenKey = token2key(actualToken, mergedSalt);
		const [tokenWithCssVar, cssVarsStr] = transformToken(mergedDerivativeToken, cssVar.value.key, {
			prefix: cssVar.value.prefix,
			ignore: cssVar.value.ignore,
			unitless: cssVar.value.unitless,
			preserve: cssVar.value.preserve,
			hashPriority: styleContext.value.hashPriority,
			hashCls: cssVar.value.hashed ? hashCls : void 0
		});
		tokenWithCssVar._hashId = hashId;
		recordCleanToken(cssVar.value.key);
		return [
			tokenWithCssVar,
			hashCls,
			actualToken,
			cssVarsStr,
			cssVar.value.key
		];
	}, ([, , , , themeKey]) => {
		cleanTokenStyle(themeKey, styleContext.value.cache.instanceId);
	}, (cacheValue) => {
		const [, , , cssVarsStr, themeKey] = cacheValue;
		if (!canUseDom()) {
			const extracted = extract(cacheValue, {}, { plain: false });
			if (extracted) {
				const [, , styleText] = extracted;
				collectStyleText(styleText);
			}
			return;
		}
		if (!cssVarsStr) return;
		let mergedCSSConfig = {
			mark: ATTR_MARK,
			prepend: "queue",
			attachTo: styleContext.value.container,
			priority: -999
		};
		mergedCSSConfig = injectCSPNonce(mergedCSSConfig, nonce.value);
		const style = updateCSS(cssVarsStr, resolveHash_default(`css-var-${themeKey}`), mergedCSSConfig);
		style[CSS_IN_JS_INSTANCE] = styleContext.value.cache.instanceId;
		style.setAttribute(ATTR_TOKEN, themeKey);
	});
}

//#endregion
export { TOKEN_PREFIX, useCacheToken as default, extract, getComputedToken };