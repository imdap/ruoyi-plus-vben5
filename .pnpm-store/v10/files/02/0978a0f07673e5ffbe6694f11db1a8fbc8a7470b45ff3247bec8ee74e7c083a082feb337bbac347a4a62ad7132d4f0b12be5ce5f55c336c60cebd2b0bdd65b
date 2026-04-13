import CacheMap_default from "../utils/CacheMap.js";
import { markRaw, onUnmounted, ref } from "vue";
import { getDOM } from "@v-c/util/dist/Dom/findDOMNode";
function parseNumber(value) {
	const num = parseFloat(value);
	return isNaN(num) ? 0 : num;
}
function useHeights(getKey, onItemAdd, onItemRemove) {
	const updatedMark = ref(0);
	const instanceRef = ref(/* @__PURE__ */ new Map());
	const heightsRef = markRaw(new CacheMap_default());
	const promiseIdRef = ref(0);
	const observedElements = /* @__PURE__ */ new Map();
	const resizeObserver = typeof window !== "undefined" && "ResizeObserver" in window ? new window.ResizeObserver(() => {
		collectHeight();
	}) : null;
	function cancelRaf() {
		promiseIdRef.value += 1;
	}
	function collectHeight(sync = false) {
		cancelRaf();
		const doCollect = () => {
			let changed = false;
			instanceRef.value.forEach((element, key) => {
				element = getDOM(element);
				if (element && element.offsetParent) {
					const { offsetHeight } = element;
					const { marginTop, marginBottom } = getComputedStyle(element);
					const marginTopNum = parseNumber(marginTop);
					const marginBottomNum = parseNumber(marginBottom);
					const totalHeight = offsetHeight + marginTopNum + marginBottomNum;
					if (heightsRef.get(key) !== totalHeight) {
						heightsRef.set(key, totalHeight);
						changed = true;
					}
				}
			});
			if (changed) updatedMark.value += 1;
		};
		if (sync) doCollect();
		else {
			promiseIdRef.value += 1;
			const id = promiseIdRef.value;
			Promise.resolve().then(() => {
				if (id === promiseIdRef.value) doCollect();
			});
		}
	}
	function setInstanceRef(item, instance) {
		const key = getKey(item);
		const origin = instanceRef.value.get(key);
		if (origin === instance) return;
		const prevObserved = observedElements.get(key);
		if (prevObserved && resizeObserver) {
			resizeObserver.unobserve(prevObserved);
			observedElements.delete(key);
		}
		if (instance) {
			instanceRef.value.set(key, instance);
			collectHeight();
			const element = getDOM(instance);
			if (element && element.nodeType === 1 && resizeObserver) {
				resizeObserver.observe(element);
				observedElements.set(key, element);
			}
		} else instanceRef.value.delete(key);
		if (!origin !== !instance) if (instance) onItemAdd?.(item);
		else onItemRemove?.(item);
	}
	onUnmounted(() => {
		cancelRaf();
		resizeObserver?.disconnect?.();
		observedElements.clear();
	});
	return [
		setInstanceRef,
		collectHeight,
		heightsRef,
		updatedMark
	];
}
export { useHeights as default };
