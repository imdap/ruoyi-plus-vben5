import ResizeObserver from "resize-observer-polyfill";
var elementListeners = /* @__PURE__ */ new Map();
function onResize(entities) {
	entities.forEach((entity) => {
		const { target } = entity;
		elementListeners.get(target)?.forEach((listener) => listener(target));
	});
}
var resizeObserver = new ResizeObserver(onResize);
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
export { _el, _rs, observe, unobserve };
