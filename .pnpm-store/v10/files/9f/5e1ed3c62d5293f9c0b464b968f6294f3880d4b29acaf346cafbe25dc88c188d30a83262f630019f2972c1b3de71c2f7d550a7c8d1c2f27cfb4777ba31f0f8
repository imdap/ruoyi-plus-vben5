Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
let vue = require("vue");
let _v_c_util_dist_KeyCode = require("@v-c/util/dist/KeyCode");
_v_c_util_dist_KeyCode = require_rolldown_runtime.__toESM(_v_c_util_dist_KeyCode);
let _v_c_util_dist_raf = require("@v-c/util/dist/raf");
_v_c_util_dist_raf = require_rolldown_runtime.__toESM(_v_c_util_dist_raf);
var { ESC, TAB } = _v_c_util_dist_KeyCode.default;
function useAccessibility({ visible, triggerRef, onVisibleChange, autoFocus, overlayRef }) {
	const focusMenuRef = (0, vue.shallowRef)(false);
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
	(0, vue.watch)(visible, (_n, _o, onCleanup) => {
		if (visible.value) {
			window.addEventListener("keydown", handleKeyDown);
			if (autoFocus) (0, _v_c_util_dist_raf.default)(focusMenu, 3);
			onCleanup(() => {
				window.removeEventListener("keydown", handleKeyDown);
				focusMenuRef.value = false;
			});
		} else onCleanup(() => {
			focusMenuRef.value = false;
		});
	});
}
exports.default = useAccessibility;
