import { computed, onMounted, shallowRef, watch } from "vue";
function internalMacroTask(fn) {
	const channel = new MessageChannel();
	channel.port1.onmessage = fn;
	channel.port2.postMessage(null);
}
function macroTask(fn, times = 1) {
	if (times <= 0) {
		fn();
		return;
	}
	internalMacroTask(() => {
		macroTask(fn, times - 1);
	});
}
function useOpen(defaultOpen, propOpen, onOpen, postOpen) {
	const rendered = shallowRef(propOpen.value ?? false);
	onMounted(() => {
		rendered.value = true;
	});
	const stateOpen = shallowRef(propOpen.value ?? defaultOpen ?? false);
	watch(propOpen, () => {
		stateOpen.value = propOpen.value;
	});
	const lock = shallowRef(false);
	const ssrSafeOpen = computed(() => rendered.value ? stateOpen.value : false);
	const mergedOpen = computed(() => postOpen(ssrSafeOpen.value));
	const taskIdRef = shallowRef(0);
	const triggerEvent = (nextOpen) => {
		if (onOpen && mergedOpen.value !== nextOpen) onOpen(nextOpen);
		if (propOpen.value !== void 0) return;
		stateOpen.value = nextOpen;
	};
	const toggleOpen = (nextOpen, config = {}) => {
		const { cancelFun } = config;
		taskIdRef.value += 1;
		const id = taskIdRef.value;
		const nextOpenVal = typeof nextOpen === "boolean" ? nextOpen : !mergedOpen.value;
		lock.value = !nextOpenVal;
		function triggerUpdate() {
			if (id === taskIdRef.value && !cancelFun?.()) {
				triggerEvent(nextOpenVal);
				lock.value = false;
			}
		}
		if (nextOpenVal) triggerUpdate();
		else macroTask(() => {
			triggerUpdate();
		});
	};
	return [
		ssrSafeOpen,
		mergedOpen,
		toggleOpen,
		lock
	];
}
export { useOpen as default, macroTask };
