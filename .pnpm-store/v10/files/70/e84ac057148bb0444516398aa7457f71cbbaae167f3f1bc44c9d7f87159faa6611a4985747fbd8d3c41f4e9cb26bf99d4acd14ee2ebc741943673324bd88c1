import { ATTR_MARK, ATTR_TOKEN } from "../StyleContext.js";
import Theme from "../theme/Theme.js";
import "../theme/index.js";
import resolveHash_default from "./resolveHash.js";
import { token2CSSVar } from "./css-variables.js";
import canUseDom from "@v-c/util/dist/Dom/canUseDom";
import { removeCSS, updateCSS } from "@v-c/util/dist/Dom/dynamicCSS";

//#region src/util/index.ts
const resultCache = /* @__PURE__ */ new WeakMap();
const RESULT_VALUE = {};
function memoResult(callback, deps) {
	let current = resultCache;
	for (let i = 0; i < deps.length; i += 1) {
		const dep = deps[i];
		if (!current.has(dep)) current.set(dep, /* @__PURE__ */ new WeakMap());
		current = current.get(dep);
	}
	if (!current.has(RESULT_VALUE)) current.set(RESULT_VALUE, callback());
	return current.get(RESULT_VALUE);
}
const flattenTokenCache = /* @__PURE__ */ new WeakMap();
/**
* Flatten token to string, this will auto cache the result when token not change
*/
function flattenToken(token) {
	let str = flattenTokenCache.get(token) || "";
	if (!str) {
		Object.keys(token).forEach((key) => {
			const value = token[key];
			str += key;
			if (value instanceof Theme) str += value.id;
			else if (value && typeof value === "object") str += flattenToken(value);
			else str += value;
		});
		str = resolveHash_default(str);
		flattenTokenCache.set(token, str);
	}
	return str;
}
/**
* Convert derivative token to key string
*/
function token2key(token, salt) {
	return resolveHash_default(`${salt}_${flattenToken(token)}`);
}
const randomSelectorKey = `random-${Date.now()}-${Math.random()}`.replace(/\./g, "");
const checkContent = "_bAmBoO_";
function supportSelector(styleStr, handleElement, supportCheck) {
	if (canUseDom()) {
		updateCSS(styleStr, randomSelectorKey);
		const ele = document.createElement("div");
		ele.style.position = "fixed";
		ele.style.left = "0";
		ele.style.top = "0";
		handleElement?.(ele);
		document.body.appendChild(ele);
		if (process.env.NODE_ENV !== "production") {
			ele.innerHTML = "Test";
			ele.style.zIndex = "9999999";
		}
		const support = supportCheck ? supportCheck(ele) : getComputedStyle(ele).content?.includes(checkContent);
		ele.parentNode?.removeChild(ele);
		removeCSS(randomSelectorKey);
		return support;
	}
	return false;
}
let canLayer;
function supportLayer() {
	if (canLayer === void 0) canLayer = supportSelector(`@layer ${randomSelectorKey} { .${randomSelectorKey} { content: "${checkContent}"!important; } }`, (ele) => {
		ele.className = randomSelectorKey;
	});
	return canLayer;
}
let canWhere;
function supportWhere() {
	if (canWhere === void 0) canWhere = supportSelector(`:where(.${randomSelectorKey}) { content: "${checkContent}"!important; }`, (ele) => {
		ele.className = randomSelectorKey;
	});
	return canWhere;
}
let canLogic;
function supportLogicProps() {
	if (canLogic === void 0) canLogic = supportSelector(`.${randomSelectorKey} { inset-block: 93px !important; }`, (ele) => {
		ele.className = randomSelectorKey;
	}, (ele) => getComputedStyle(ele).bottom === "93px");
	return canLogic;
}
const isClientSide = canUseDom();
function isNumber(val) {
	return typeof val === "number" && !Number.isNaN(val);
}
function unit(num) {
	if (isNumber(num)) return `${num}px`;
	return num;
}
function toStyleStr(style, tokenKey, styleId, customizeAttrs = {}, plain = false) {
	if (plain) return style;
	const attrs = {
		...customizeAttrs,
		[ATTR_TOKEN]: tokenKey,
		[ATTR_MARK]: styleId
	};
	return `<style ${Object.keys(attrs).map((attr) => {
		const val = attrs[attr];
		return val ? `${attr}="${val}"` : null;
	}).filter((v) => v).join(" ")}>${style}</style>`;
}
function where(options) {
	const { hashCls, hashPriority = "low" } = options || {};
	if (!hashCls) return "";
	const hashSelector = `.${hashCls}`;
	return hashPriority === "low" ? `:where(${hashSelector})` : hashSelector;
}
function isNonNullable(val) {
	return val !== void 0 && val !== null;
}
/**
* Resolve nonce and merge it into the dynamic CSS config.
*/
function injectCSPNonce(config, nonce) {
	const nonceStr = typeof nonce === "function" ? nonce() : nonce;
	if (nonceStr) return {
		...config,
		csp: {
			...config.csp,
			nonce: nonceStr
		}
	};
	return config;
}

//#endregion
export { flattenToken, resolveHash_default as hash, injectCSPNonce, isClientSide, isNonNullable, isNumber, memoResult, supportLayer, supportLogicProps, supportWhere, toStyleStr, token2CSSVar, token2key, unit, where };