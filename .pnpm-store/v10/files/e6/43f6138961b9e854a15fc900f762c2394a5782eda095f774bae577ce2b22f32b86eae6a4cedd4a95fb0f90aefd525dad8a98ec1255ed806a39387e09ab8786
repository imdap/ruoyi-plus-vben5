import { nextTick, shallowRef, toValue, watch } from "vue";
function useControlledState(state, emit, updateKey = "value", defaultState, props) {
	const mergedState = shallowRef(defaultState ?? state.value);
	function setState(nextState) {
		if (emit) emit(`update:${updateKey}`, nextState);
		if (props && props?.[`onUpdate:${updateKey}`]) props?.[`onUpdate:${updateKey}`](nextState);
		nextTick(() => {
			if (state.value === void 0 && state.value !== nextState) mergedState.value = nextState;
		});
	}
	watch(() => toValue(state), () => {
		const prevState = toValue(mergedState);
		const nextState = toValue(state);
		if (prevState !== nextState) mergedState.value = nextState;
	});
	return [state, setState];
}
export { useControlledState };
