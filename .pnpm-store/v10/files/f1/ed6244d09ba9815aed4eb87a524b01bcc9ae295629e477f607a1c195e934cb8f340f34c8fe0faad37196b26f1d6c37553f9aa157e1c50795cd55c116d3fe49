const require_rolldown_runtime = require('../rolldown-runtime.cjs');
const vue = require_rolldown_runtime.__toESM(require("vue"));
const __vueuse_core = require_rolldown_runtime.__toESM(require("@vueuse/core"));

//#region src/shared/onFocusOutside.ts
function onFocusOutside(element, handler) {
	const handleFocusOut = (ev) => {
		const el = (0, __vueuse_core.unrefElement)(element);
		if (!ev.relatedTarget) return;
		const isFocusInsideElement = el?.contains(ev.relatedTarget);
		if (!isFocusInsideElement) handler(ev);
	};
	(0, vue.onMounted)(() => {
		const el = (0, __vueuse_core.unrefElement)(element);
		el?.addEventListener("focusout", handleFocusOut);
	});
	(0, vue.onUnmounted)(() => {
		const el = (0, __vueuse_core.unrefElement)(element);
		el?.removeEventListener("focusout", handleFocusOut);
	});
}

//#endregion
Object.defineProperty(exports, 'onFocusOutside', {
  enumerable: true,
  get: function () {
    return onFocusOutside;
  }
});
//# sourceMappingURL=onFocusOutside.cjs.map