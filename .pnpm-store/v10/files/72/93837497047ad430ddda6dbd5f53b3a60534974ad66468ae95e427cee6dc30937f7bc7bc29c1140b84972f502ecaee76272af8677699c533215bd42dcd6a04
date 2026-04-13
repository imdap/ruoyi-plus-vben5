import { useId, watch } from "vue";
import canUseDom from "@v-c/util/dist/Dom/canUseDom";
var stack = [];
var IME_LOCK_DURATION = 200;
var lastCompositionEndTime = 0;
const _test = process.env.NODE_ENV === "test" ? () => ({
	stack,
	reset: () => {
		lastCompositionEndTime = 0;
	}
}) : null;
function onGlobalKeyDown(event) {
	if (event.key === "Escape" && !event.isComposing) {
		if (Date.now() - lastCompositionEndTime < IME_LOCK_DURATION) return;
		const len = stack.length;
		for (let i = len - 1; i >= 0; i -= 1) stack?.[i]?.onEsc?.({
			top: i === len - 1,
			event
		});
	}
}
function onGlobalCompositionEnd() {
	lastCompositionEndTime = Date.now();
}
function attachGlobalEventListeners() {
	if (!canUseDom()) return;
	window.addEventListener("keydown", onGlobalKeyDown);
	window.addEventListener("compositionend", onGlobalCompositionEnd);
}
function detachGlobalEventListeners() {
	if (!canUseDom() || stack.length !== 0) return;
	window.removeEventListener("keydown", onGlobalKeyDown);
	window.removeEventListener("compositionend", onGlobalCompositionEnd);
}
function useEscKeyDown(open, onEsc = () => {}) {
	const id = useId();
	const onEventEsc = onEsc;
	const ensure = () => {
		if (!stack.find((item) => item.id === id)) stack.push({
			id,
			onEsc: onEventEsc
		});
	};
	const clear = () => {
		stack = stack.filter((item) => item.id !== id);
	};
	watch(open, (_, _o, onCleanup) => {
		if (!canUseDom()) return;
		if (open.value) {
			ensure();
			attachGlobalEventListeners();
			onCleanup(() => {
				clear();
				detachGlobalEventListeners();
			});
		} else if (!open.value) clear();
	}, { immediate: true });
}
export { _test, useEscKeyDown as default };
