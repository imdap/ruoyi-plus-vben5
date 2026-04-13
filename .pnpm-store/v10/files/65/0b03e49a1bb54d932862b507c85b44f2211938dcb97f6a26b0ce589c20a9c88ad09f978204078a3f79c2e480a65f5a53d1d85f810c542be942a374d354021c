Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
let vue = require("vue");
let _v_c_util_dist_Dom_canUseDom = require("@v-c/util/dist/Dom/canUseDom");
_v_c_util_dist_Dom_canUseDom = require_rolldown_runtime.__toESM(_v_c_util_dist_Dom_canUseDom);
var defaultOptions = (0, vue.ref)({
	subtree: true,
	childList: true,
	attributeFilter: ["style", "class"]
});
function useMutateObserver(nodeOrList, callback, options = defaultOptions) {
	(0, vue.watchEffect)((onCleanup) => {
		if (!(0, _v_c_util_dist_Dom_canUseDom.default)()) return;
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
exports.default = useMutateObserver;
