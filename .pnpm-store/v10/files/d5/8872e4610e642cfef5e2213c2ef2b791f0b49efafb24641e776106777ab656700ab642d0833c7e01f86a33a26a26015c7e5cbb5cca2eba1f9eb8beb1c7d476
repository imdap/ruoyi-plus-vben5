import { useContextState } from "./Context.js";
import { computed, nextTick, onUnmounted, shallowRef, watch } from "vue";
import canUseDom from "@v-c/util/dist/Dom/canUseDom";
var EMPTY_LIST = [];
function useDom(render, debug) {
	const eleFun = () => {
		if (!canUseDom()) return null;
		const defaultEle = document.createElement("div");
		if (process.env.NODE_ENV !== "production" && debug) defaultEle.setAttribute("data-debug", debug);
		return defaultEle;
	};
	const ele = eleFun();
	const appendedRef = shallowRef(false);
	const queueCreate = useContextState();
	const queue = shallowRef([]);
	const mergedQueueCreate = computed(() => queueCreate?.value || (appendedRef.value ? void 0 : (appendFn) => {
		queue.value = [appendFn, ...queue.value];
	}));
	function append() {
		if (!ele || !canUseDom()) return;
		if (!ele?.parentElement) document.body.appendChild(ele);
		appendedRef.value = true;
	}
	function cleanup() {
		if (!ele || !canUseDom()) {
			appendedRef.value = false;
			return;
		}
		if (ele?.parentElement) ele?.parentElement?.removeChild(ele);
		else if (appendedRef.value) document.body?.removeChild?.(ele);
		appendedRef.value = false;
	}
	watch(render, () => {
		if (render.value) if (queueCreate?.value) queueCreate.value(append);
		else append();
		else nextTick(() => {
			cleanup();
		});
	}, { immediate: true });
	onUnmounted(cleanup);
	watch(queue, () => {
		if (queue.value.length) {
			queue.value.forEach((fn) => fn());
			queue.value = [...EMPTY_LIST];
		}
	}, {
		flush: "post",
		immediate: true
	});
	return [ele, mergedQueueCreate];
}
export { useDom as default };
