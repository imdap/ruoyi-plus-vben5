import { onMounted, onUnmounted } from "vue";
import { unrefElement } from "@vueuse/core";

//#region src/shared/onFocusOutside.ts
function onFocusOutside(element, handler) {
	const handleFocusOut = (ev) => {
		const el = unrefElement(element);
		if (!ev.relatedTarget) return;
		const isFocusInsideElement = el?.contains(ev.relatedTarget);
		if (!isFocusInsideElement) handler(ev);
	};
	onMounted(() => {
		const el = unrefElement(element);
		el?.addEventListener("focusout", handleFocusOut);
	});
	onUnmounted(() => {
		const el = unrefElement(element);
		el?.removeEventListener("focusout", handleFocusOut);
	});
}

//#endregion
export { onFocusOutside };
//# sourceMappingURL=onFocusOutside.js.map