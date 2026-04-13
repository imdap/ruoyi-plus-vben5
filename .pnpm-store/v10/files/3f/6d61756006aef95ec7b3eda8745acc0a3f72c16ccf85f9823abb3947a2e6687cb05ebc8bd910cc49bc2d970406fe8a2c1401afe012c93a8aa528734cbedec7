import { shallowRef, watch } from "vue";
import KeyCode from "@v-c/util/dist/KeyCode";
import raf from "@v-c/util/dist/raf";
var { ESC, TAB } = KeyCode;
function useAccessibility({ visible, triggerRef, onVisibleChange, autoFocus, overlayRef }) {
	const focusMenuRef = shallowRef(false);
	const handleCloseMenuAndReturnFocus = () => {
		if (visible.value) {
			triggerRef.value?.focus?.();
			onVisibleChange?.(false);
		}
	};
	const focusMenu = () => {
		if (overlayRef?.value?.focus) {
			overlayRef.value.focus();
			focusMenuRef.value = true;
			return true;
		}
		return false;
	};
	const handleKeyDown = (event) => {
		switch (event.keyCode) {
			case ESC:
				handleCloseMenuAndReturnFocus();
				break;
			case TAB: {
				let focusResult = false;
				if (!focusMenuRef.value) focusResult = focusMenu();
				if (focusResult) event.preventDefault();
				else handleCloseMenuAndReturnFocus();
				break;
			}
		}
	};
	watch(visible, (_n, _o, onCleanup) => {
		if (visible.value) {
			window.addEventListener("keydown", handleKeyDown);
			if (autoFocus) raf(focusMenu, 3);
			onCleanup(() => {
				window.removeEventListener("keydown", handleKeyDown);
				focusMenuRef.value = false;
			});
		} else onCleanup(() => {
			focusMenuRef.value = false;
		});
	});
}
export { useAccessibility as default };
