import { getWin } from "../util.js";
import { shallowRef, watch, watchEffect } from "vue";
import { warning } from "@v-c/util";
import { getShadowRoot } from "@v-c/util/dist/Dom/shadow";
function useWinClick(open, clickToHide, targetEle, popupEle, mask, maskClosable, inPopupOrChild, triggerOpen) {
	const openRef = shallowRef(open.value);
	watchEffect(() => {
		openRef.value = open.value;
	});
	const popupPointerDownRef = shallowRef(false);
	watch([
		clickToHide,
		targetEle,
		popupEle,
		mask,
		maskClosable
	], ([clickToHide$1, targetEle$1, popupEle$1, mask$1, maskClosable$1], _o, onCleanup) => {
		if (clickToHide$1 && popupEle$1 && (!mask$1 || maskClosable$1)) {
			const onPointerDown = () => {
				popupPointerDownRef.value = false;
			};
			const onTriggerClose = (e) => {
				if (openRef.value && !inPopupOrChild(e.composedPath?.()?.[0] || e.target) && !popupPointerDownRef.value) triggerOpen(false);
			};
			const win = getWin(popupEle$1);
			win.addEventListener("pointerdown", onPointerDown, true);
			win.addEventListener("mousedown", onTriggerClose, true);
			win.addEventListener("contextmenu", onTriggerClose, true);
			const targetShadowRoot = getShadowRoot(targetEle$1);
			if (targetShadowRoot) {
				targetShadowRoot.addEventListener("mousedown", onTriggerClose, true);
				targetShadowRoot.addEventListener("contextmenu", onTriggerClose, true);
			}
			if (process.env.NODE_ENV !== "production" && targetEle$1) {
				const targetRoot = targetEle$1.getRootNode?.();
				const popupRoot = popupEle$1.getRootNode?.();
				warning(targetRoot === popupRoot, `trigger element and popup element should in same shadow root.`);
			}
			onCleanup(() => {
				win.removeEventListener("pointerdown", onPointerDown, true);
				win.removeEventListener("mousedown", onTriggerClose, true);
				win.removeEventListener("contextmenu", onTriggerClose, true);
				if (targetShadowRoot) {
					targetShadowRoot.removeEventListener("mousedown", onTriggerClose, true);
					targetShadowRoot.removeEventListener("contextmenu", onTriggerClose, true);
				}
			});
		}
	});
	function onPopupPointerDown() {
		popupPointerDownRef.value = true;
	}
	return onPopupPointerDown;
}
export { useWinClick as default };
