Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
let vue = require("vue");
function useEffectState() {
	const effectId = (0, vue.shallowRef)({
		id: 0,
		callback: void 0
	});
	const update = (callback) => {
		effectId.value = {
			id: effectId.value.id + 1,
			callback
		};
	};
	(0, vue.watch)(() => effectId?.value?.id, () => {
		effectId.value?.callback?.();
	});
	return update;
}
exports.default = useEffectState;
