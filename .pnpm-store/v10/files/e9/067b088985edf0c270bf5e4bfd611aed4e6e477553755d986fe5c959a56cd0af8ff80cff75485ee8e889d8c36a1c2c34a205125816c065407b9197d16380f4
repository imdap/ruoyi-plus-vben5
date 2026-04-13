Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
let resize_observer_polyfill = require("resize-observer-polyfill");
resize_observer_polyfill = require_rolldown_runtime.__toESM(resize_observer_polyfill);
var elementListeners = /* @__PURE__ */ new Map();
function onResize(entities) {
	entities.forEach((entity) => {
		const { target } = entity;
		elementListeners.get(target)?.forEach((listener) => listener(target));
	});
}
var resizeObserver = new resize_observer_polyfill.default(onResize);
const _el = process.env.NODE_ENV !== "production" ? elementListeners : null;
const _rs = process.env.NODE_ENV !== "production" ? onResize : null;
function observe(element, callback) {
	if (!elementListeners.has(element)) {
		elementListeners.set(element, /* @__PURE__ */ new Set());
		resizeObserver.observe(element);
	}
	elementListeners?.get?.(element)?.add?.(callback);
}
function unobserve(element, callback) {
	if (elementListeners.has(element)) {
		elementListeners?.get?.(element)?.delete?.(callback);
		if (!elementListeners?.get?.(element)?.size) {
			resizeObserver.unobserve(element);
			elementListeners.delete(element);
		}
	}
}
exports._el = _el;
exports._rs = _rs;
exports.observe = observe;
exports.unobserve = unobserve;
