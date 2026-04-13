import { shallowRef, watch } from "vue";
function useEffectState() {
	const effectId = shallowRef({
		id: 0,
		callback: void 0
	});
	const update = (callback) => {
		effectId.value = {
			id: effectId.value.id + 1,
			callback
		};
	};
	watch(() => effectId?.value?.id, () => {
		effectId.value?.callback?.();
	});
	return update;
}
export { useEffectState as default };
