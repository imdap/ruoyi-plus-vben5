import { ref, watchEffect } from "vue";
import canUseDom from "@v-c/util/dist/Dom/canUseDom";
var defaultOptions = ref({
	subtree: true,
	childList: true,
	attributeFilter: ["style", "class"]
});
function useMutateObserver(nodeOrList, callback, options = defaultOptions) {
	watchEffect((onCleanup) => {
		if (!canUseDom()) return;
		if (!nodeOrList.value) return;
		let ins;
		const nodeList = Array.isArray(nodeOrList.value) ? nodeOrList.value : [nodeOrList.value];
		if ("MutationObserver" in window) {
			ins = new MutationObserver(callback);
			nodeList.forEach((node) => ins.observe(node, options.value));
		}
		onCleanup(() => {
			ins?.takeRecords();
			ins?.disconnect();
		});
	});
}
export { useMutateObserver as default };
