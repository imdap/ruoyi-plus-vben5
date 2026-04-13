import channelUpdate from "./channelUpdate.js";
import { ref } from "vue";
import useEvent from "@v-c/util/dist/hooks/useEvent";
function useBatcher() {
	const updateFuncRef = ref(null);
	const notifyEffectUpdate = (callback) => {
		if (!updateFuncRef.value) {
			updateFuncRef.value = [];
			channelUpdate(() => {
				updateFuncRef.value.forEach((fn) => {
					fn();
				});
				updateFuncRef.value = null;
			});
		}
		updateFuncRef.value.push(callback);
	};
	return notifyEffectUpdate;
}
function useEffectState(notifyEffectUpdate, defaultValue) {
	const stateValue = ref(defaultValue);
	return [stateValue, useEvent((nextValue) => {
		notifyEffectUpdate(() => {
			if (typeof nextValue === "function") stateValue.value = nextValue(stateValue.value);
			else stateValue.value = nextValue;
		});
	})];
}
export { useEffectState as default, useBatcher };
