import { ATTR_CACHE_PATH, ATTR_MARK, CSS_IN_JS_INSTANCE, useStyleContext } from "../StyleContext.js";
import resolveHash_default from "../util/resolveHash.js";
import { injectCSPNonce, isClientSide, isNonNullable, toStyleStr, where } from "../util/index.js";
import { useGlobalCache } from "./useGlobalCache.js";
import contentQuotesLinter_default from "../linters/contentQuotesLinter.js";
import hashedAnimationLinter_default from "../linters/hashedAnimationLinter.js";
import "../linters/index.js";
import { CSS_FILE_STYLE, existPath, getStyleAndHash } from "../util/cacheMapUtil.js";
import resolveUnitless_default from "../util/resolveUnitless.js";
import { computed } from "vue";
import { removeCSS, updateCSS } from "@v-c/util/dist/Dom/dynamicCSS";
import { compile, middleware, prefixer, serialize, stringify } from "stylis";

//#region src/hooks/useStyleRegister.ts
const isDev = process.env.NODE_ENV !== "production";
const SKIP_CHECK = "_skip_check_";
const MULTI_VALUE = "_multi_value_";
function normalizeStyle(styleStr, autoPrefix) {
	return (autoPrefix ? serialize(compile(styleStr), middleware([prefixer, stringify])) : serialize(compile(styleStr), stringify)).replace(/\{%%%:[^;];\}/g, ";");
}
function isCompoundCSSProperty(value) {
	return typeof value === "object" && value && (SKIP_CHECK in value || MULTI_VALUE in value);
}
function injectSelectorHash(key, hashId, hashPriority = "high") {
	if (!hashId) return key;
	const hashSelector = where({
		hashCls: hashId,
		hashPriority
	});
	return key.split(",").map((k) => {
		const fullPath = k.trim().split(/\s+/);
		let firstPath = fullPath[0] || "";
		const htmlElement = firstPath.match(/^\w+/)?.[0] || "";
		firstPath = `${htmlElement}${hashSelector}${firstPath.slice(htmlElement.length)}`;
		return [firstPath, ...fullPath.slice(1)].join(" ");
	}).join(",");
}
function parseStyle(interpolation, config = {}, { root, injectHash, parentSelectors } = {
	root: true,
	parentSelectors: []
}) {
	const { hashId, layer, path, hashPriority, transformers = [], linters = [] } = config;
	let styleStr = "";
	let effectStyle = {};
	function parseKeyframes(keyframes) {
		const animationName = keyframes.getName(hashId);
		if (!effectStyle[animationName]) {
			const [parsedStr] = parseStyle(keyframes.style, config, {
				root: false,
				parentSelectors
			});
			effectStyle[animationName] = `@keyframes ${keyframes.getName(hashId)}${parsedStr}`;
		}
	}
	function flattenList(list, fullList = []) {
		list.forEach((item) => {
			if (Array.isArray(item)) flattenList(item, fullList);
			else if (item) fullList.push(item);
		});
		return fullList;
	}
	flattenList(Array.isArray(interpolation) ? interpolation : [interpolation]).forEach((originStyle) => {
		const style = typeof originStyle === "string" && !root ? {} : originStyle;
		if (typeof style === "string") styleStr += `${style}\n`;
		else if (style._keyframe) parseKeyframes(style);
		else {
			const mergedStyle = transformers.reduce((prev, trans) => trans?.visit?.(prev) || prev, style);
			Object.keys(mergedStyle).forEach((key) => {
				const value = mergedStyle[key];
				if (typeof value === "object" && value && (key !== "animationName" || !value._keyframe) && !isCompoundCSSProperty(value)) {
					let subInjectHash = false;
					let mergedKey = key.trim();
					let nextRoot = false;
					if ((root || injectHash) && hashId) if (mergedKey.startsWith("@")) subInjectHash = true;
					else if (mergedKey === "&") mergedKey = injectSelectorHash("", hashId, hashPriority);
					else mergedKey = injectSelectorHash(key, hashId, hashPriority);
					else if (root && !hashId && (mergedKey === "&" || mergedKey === "")) {
						mergedKey = "";
						nextRoot = true;
					}
					const [parsedStr, childEffectStyle] = parseStyle(value, config, {
						root: nextRoot,
						injectHash: subInjectHash,
						parentSelectors: [...parentSelectors, mergedKey]
					});
					effectStyle = {
						...effectStyle,
						...childEffectStyle
					};
					styleStr += `${mergedKey}${parsedStr}`;
				} else {
					function appendStyle(cssKey, cssValue) {
						if (process.env.NODE_ENV !== "production" && (typeof value !== "object" || !value?.[SKIP_CHECK])) [
							contentQuotesLinter_default,
							hashedAnimationLinter_default,
							...linters
						].forEach((linter) => linter(cssKey, cssValue, {
							path,
							hashId,
							parentSelectors
						}));
						const styleName = cssKey.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
						let formatValue = cssValue;
						if (!resolveUnitless_default[cssKey] && typeof formatValue === "number" && formatValue !== 0) formatValue = `${formatValue}px`;
						if (cssKey === "animationName" && cssValue?._keyframe) {
							parseKeyframes(cssValue);
							formatValue = cssValue.getName(hashId);
						}
						styleStr += `${styleName}:${formatValue};`;
					}
					const actualValue = value?.value ?? value;
					if (typeof value === "object" && value?.[MULTI_VALUE] && Array.isArray(actualValue)) actualValue.forEach((item) => {
						appendStyle(key, item);
					});
					else if (isNonNullable(actualValue)) appendStyle(key, actualValue);
				}
			});
		}
	});
	if (!root) styleStr = `{${styleStr}}`;
	else if (layer) {
		if (styleStr) styleStr = `@layer ${layer.name} {${styleStr}}`;
		if (layer.dependencies) effectStyle[`@layer ${layer.name}`] = layer.dependencies.map((deps) => `@layer ${deps}, ${layer.name};`).join("\n");
	}
	return [styleStr, effectStyle];
}
function uniqueHash(path, styleStr) {
	return resolveHash_default(`${path.join("%")}${styleStr}`);
}
const STYLE_PREFIX = "style";
function useStyleRegister(info, styleFn) {
	const styleContext = useStyleContext();
	const enableLayer = computed(() => !!styleContext.value.layer);
	const order = computed(() => info.value.order ?? 0);
	const hashId = computed(() => info.value.hashId);
	const fullPath = computed(() => {
		const path = [hashId.value || ""];
		if (enableLayer.value) path.push("layer");
		path.push(...info.value.path);
		return path;
	});
	const isMergedClientSide = computed(() => {
		let merged = isClientSide;
		if (isDev && styleContext.value.mock !== void 0) merged = styleContext.value.mock === "client";
		return merged;
	});
	useGlobalCache(computed(() => STYLE_PREFIX), fullPath, () => {
		const cachePath = fullPath.value.join("|");
		const context = styleContext.value;
		const infoValue = info.value;
		if (existPath(cachePath)) {
			const [inlineCacheStyleStr, styleHash] = getStyleAndHash(cachePath);
			if (inlineCacheStyleStr) return [
				inlineCacheStyleStr,
				styleHash,
				{},
				infoValue.clientOnly,
				order.value
			];
		}
		const [parsedStyle, effectStyle] = parseStyle(styleFn(), {
			hashId: infoValue.hashId,
			hashPriority: context.hashPriority,
			layer: enableLayer.value ? infoValue.layer : void 0,
			path: infoValue.path.join("-"),
			transformers: context.transformers || [],
			linters: context.linters || []
		});
		const styleStr = normalizeStyle(parsedStyle, styleContext.value.autoPrefix || false);
		return [
			styleStr,
			uniqueHash(fullPath.value, styleStr),
			effectStyle,
			infoValue.clientOnly,
			order.value
		];
	}, (cacheValue, fromHMR) => {
		const [, styleId] = cacheValue;
		if (fromHMR && isClientSide) removeCSS(styleId, { mark: ATTR_MARK });
	}, (cacheValue) => {
		const [styleStr, styleId, effectStyle, , priority] = cacheValue;
		if (!isMergedClientSide.value || styleStr === CSS_FILE_STYLE) return;
		const { layer: enableLayer, container, autoPrefix, cache } = styleContext.value;
		const { nonce } = info.value;
		let mergedCSSConfig = {
			mark: ATTR_MARK,
			prepend: enableLayer ? false : "queue",
			attachTo: container,
			priority
		};
		mergedCSSConfig = injectCSPNonce(mergedCSSConfig, nonce);
		const effectLayerKeys = [];
		const effectRestKeys = [];
		Object.keys(effectStyle).forEach((key) => {
			if (key.startsWith("@layer")) effectLayerKeys.push(key);
			else effectRestKeys.push(key);
		});
		effectLayerKeys.forEach((effectKey) => {
			updateCSS(normalizeStyle(effectStyle[effectKey], autoPrefix || false), `_layer-${effectKey}`, {
				...mergedCSSConfig,
				prepend: true
			});
		});
		const style = updateCSS(styleStr, styleId, mergedCSSConfig);
		style[CSS_IN_JS_INSTANCE] = cache.instanceId;
		if (isDev) style.setAttribute(ATTR_CACHE_PATH, fullPath.value.join("|"));
		effectRestKeys.forEach((effectKey) => {
			updateCSS(normalizeStyle(effectStyle[effectKey], autoPrefix || false), `_effect-${effectKey}`, mergedCSSConfig);
		});
	});
}
const extract = (cache, effectStyles, options) => {
	const [styleStr, styleId, effectStyle, clientOnly, order] = cache;
	const { plain, autoPrefix } = options || {};
	if (clientOnly) return null;
	let keyStyleText = styleStr;
	const sharedAttrs = {
		"data-vc-order": "prependQueue",
		"data-vc-priority": `${order}`
	};
	keyStyleText = toStyleStr(styleStr, void 0, styleId, sharedAttrs, plain);
	if (effectStyle) Object.keys(effectStyle).forEach((effectKey) => {
		if (!effectStyles[effectKey]) {
			effectStyles[effectKey] = true;
			const effectStyleHTML = toStyleStr(normalizeStyle(effectStyle[effectKey], autoPrefix || false), void 0, `_effect-${effectKey}`, sharedAttrs, plain);
			if (effectKey.startsWith("@layer")) keyStyleText = effectStyleHTML + keyStyleText;
			else keyStyleText += effectStyleHTML;
		}
	});
	return [
		order,
		styleId,
		keyStyleText
	];
};

//#endregion
export { STYLE_PREFIX, useStyleRegister as default, extract, normalizeStyle, parseStyle, uniqueHash };