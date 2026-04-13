import { ATTR_MARK, ATTR_TOKEN, CSS_IN_JS_INSTANCE, useStyleContext } from "../StyleContext.js";
import { collectStyleText } from "../ssr/styleCollector.js";
import { transformToken } from "../util/css-variables.js";
import { injectCSPNonce, isClientSide, toStyleStr } from "../util/index.js";
import { useGlobalCache } from "./useGlobalCache.js";
import { uniqueHash } from "./useStyleRegister.js";
import { computed } from "vue";
import canUseDom from "@v-c/util/dist/Dom/canUseDom";
import { removeCSS, updateCSS } from "@v-c/util/dist/Dom/dynamicCSS";

//#region src/hooks/useCSSVarRegister.ts
const CSS_VAR_PREFIX = "cssVar";
const extract = (cache, _effectStyles, options) => {
	const [, styleStr, styleId, cssVarKey] = cache;
	const { plain } = options || {};
	if (!styleStr) return null;
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
function useCSSVarRegister(config, fn) {
	const styleContext = useStyleContext();
	const stylePath = computed(() => {
		const { key, scope, token } = config.value;
		const tokenKey = token?._tokenKey;
		const scopeKey = Array.isArray(scope) ? scope.join("@@") : scope;
		return [
			...config.value.path,
			key,
			scopeKey,
			tokenKey
		];
	});
	return useGlobalCache(computed(() => CSS_VAR_PREFIX), stylePath, () => {
		const originToken = fn();
		const { key, prefix, unitless, ignore, hashId, scope } = config.value;
		const hashPriority = styleContext.value.hashPriority;
		const [mergedToken, cssVarsStr] = transformToken(originToken, key, {
			prefix,
			unitless,
			ignore,
			scope,
			hashPriority,
			hashCls: hashId
		});
		return [
			mergedToken,
			cssVarsStr,
			uniqueHash(stylePath.value, cssVarsStr),
			key
		];
	}, ([, , styleId]) => {
		if (isClientSide) removeCSS(styleId, {
			mark: ATTR_MARK,
			attachTo: styleContext.value.container
		});
	}, (cacheValue) => {
		const [, cssVarsStr, styleId] = cacheValue;
		if (!canUseDom()) {
			const extracted = extract(cacheValue, {}, { plain: false });
			if (extracted) {
				const [, , styleText] = extracted;
				collectStyleText(styleText);
			}
			return;
		}
		if (!cssVarsStr) return;
		const context = styleContext.value;
		let mergedCSSConfig = {
			mark: ATTR_MARK,
			prepend: "queue",
			attachTo: context.container,
			priority: -999
		};
		mergedCSSConfig = injectCSPNonce(mergedCSSConfig, config.value.nonce);
		const style = updateCSS(cssVarsStr, styleId, mergedCSSConfig);
		style[CSS_IN_JS_INSTANCE] = context.cache.instanceId;
		style.setAttribute(ATTR_TOKEN, config.value.key);
	});
}

//#endregion
export { CSS_VAR_PREFIX, useCSSVarRegister as default, extract };