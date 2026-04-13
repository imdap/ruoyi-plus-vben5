import { computed, shallowRef, unref } from "vue";

//#region src/drawer/useFocusable.ts
function useFocusable(focusable = shallowRef(), defaultTrap = shallowRef(), legacyFocusTriggerAfterClose = shallowRef()) {
	return computed(() => {
		return {
			trap: unref(defaultTrap) ?? true,
			focusTriggerAfterClose: unref(legacyFocusTriggerAfterClose) ?? true,
			...unref(focusable)
		};
	});
}

//#endregion
export { useFocusable as default };