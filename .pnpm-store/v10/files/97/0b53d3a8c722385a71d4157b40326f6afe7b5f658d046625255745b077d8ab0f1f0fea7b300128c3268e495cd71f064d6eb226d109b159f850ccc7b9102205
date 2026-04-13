import Cache_default from "./Cache.js";
import { AUTO_PREFIX } from "./transformers/autoPrefix.js";
import { computed, defineComponent, inject, markRaw, provide, ref } from "vue";

//#region src/StyleContext.ts
/**
* @description Style Context
* vue3 版本的 Style Context实现
*/
const ATTR_TOKEN = "data-token-hash";
const ATTR_MARK = "data-css-hash";
const ATTR_CACHE_PATH = "data-cache-path";
const CSS_IN_JS_INSTANCE = "__cssinjs_instance__";
function createCache() {
	const cssinjsInstanceId = Math.random().toString(12).slice(2);
	if (typeof document !== "undefined" && document.head && document.body) {
		const styles = document.body.querySelectorAll(`style[${ATTR_MARK}]`) || [];
		const { firstChild } = document.head;
		Array.from(styles).forEach((style) => {
			style[CSS_IN_JS_INSTANCE] = style[CSS_IN_JS_INSTANCE] || cssinjsInstanceId;
			if (style[CSS_IN_JS_INSTANCE] === cssinjsInstanceId) document.head.insertBefore(style, firstChild);
		});
		const styleHash = {};
		Array.from(document.querySelectorAll(`style[${ATTR_MARK}]`)).forEach((style) => {
			const hash = style.getAttribute(ATTR_MARK);
			if (styleHash[hash]) {
				if (style[CSS_IN_JS_INSTANCE] === cssinjsInstanceId) style.parentNode?.removeChild(style);
			} else styleHash[hash] = true;
		});
	}
	return markRaw(new Cache_default(cssinjsInstanceId));
}
const defaultStyleContext = {
	defaultCache: true,
	cache: createCache(),
	hashPriority: "low",
	autoPrefix: false
};
const StyleContextKey = Symbol("StyleContext");
function useStyleContextProvide(props) {
	provide(StyleContextKey, props);
}
function provideStyleContext(app, props) {
	app.provide(StyleContextKey, props);
}
function useStyleContext() {
	return inject(StyleContextKey, ref(defaultStyleContext));
}
const styleContextProps = {
	autoClear: {
		type: Boolean,
		default: void 0
	},
	mock: {
		type: String,
		default: void 0
	},
	cache: { type: Object },
	defaultCache: { type: Boolean },
	hashPriority: {
		type: String,
		default: void 0
	},
	container: {
		type: [Object],
		default: void 0
	},
	ssrInline: {
		type: Boolean,
		default: void 0
	},
	transformers: {
		type: Array,
		default: void 0
	},
	linters: {
		type: Array,
		default: void 0
	},
	layer: {
		type: Boolean,
		default: void 0
	},
	autoPrefix: {
		type: Boolean,
		default: void 0
	}
};
const StyleProvider = defineComponent((props, { slots }) => {
	const parentContext = useStyleContext();
	useStyleContextProvide(computed(() => {
		const restProps = props;
		const mergedContext = { ...parentContext.value };
		Object.keys(restProps).forEach((key) => {
			const value = restProps[key];
			if (restProps[key] !== void 0) mergedContext[key] = value;
		});
		const { cache, transformers = [] } = restProps;
		mergedContext.cache = mergedContext.cache || createCache();
		mergedContext.defaultCache = !cache && parentContext.value?.defaultCache;
		if (transformers.includes(AUTO_PREFIX)) mergedContext.autoPrefix = true;
		return mergedContext;
	}));
	return () => {
		return slots?.default?.();
	};
}, { props: styleContextProps });

//#endregion
export { ATTR_CACHE_PATH, ATTR_MARK, ATTR_TOKEN, CSS_IN_JS_INSTANCE, StyleProvider, createCache, provideStyleContext, styleContextProps, useStyleContext, useStyleContextProvide };