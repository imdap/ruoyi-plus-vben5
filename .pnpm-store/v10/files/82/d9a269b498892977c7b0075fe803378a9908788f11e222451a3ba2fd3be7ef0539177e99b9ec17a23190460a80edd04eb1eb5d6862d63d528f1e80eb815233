import { onBeforeUnmount, shallowRef } from "vue";

//#region src/_util/hooks/useChildLoadEvents.ts
/**
* 监听某个容器内所有“可能触发 load/error 的元素”，
* 并把事件统一交给回调处理。
*/
function useChildLoadEvents(options = {}) {
	const { triggerForAlreadyLoaded = true } = options;
	const cleanupRef = shallowRef(null);
	const clear = () => {
		if (cleanupRef.value) {
			cleanupRef.value();
			cleanupRef.value = null;
		}
	};
	const bindEvent = (root, callback) => {
		clear();
		if (!root) return;
		const elements = Array.from(root.querySelectorAll("img, iframe, video, audio, script, link[rel=\"stylesheet\"], source, embed, object"));
		const cleanups = [];
		for (const el of elements) {
			const handleLoad = (ev) => {
				callback("load", el, ev);
			};
			const handleError = (ev) => {
				callback("error", el, ev);
			};
			el.addEventListener("load", handleLoad, { once: true });
			el.addEventListener("error", handleError, { once: true });
			cleanups.push(() => {
				el.removeEventListener("load", handleLoad);
				el.removeEventListener("error", handleError);
			});
			if (triggerForAlreadyLoaded) {
				if (el instanceof HTMLImageElement) {
					if (el.complete) callback("load", el, null);
				} else if (el instanceof HTMLVideoElement || el instanceof HTMLAudioElement) {
					if (el.readyState >= 1) callback("load", el, null);
				} else if (el instanceof HTMLLinkElement) {
					if (el.rel === "stylesheet" && el.sheet) callback("load", el, null);
				}
			}
		}
		cleanupRef.value = () => {
			cleanups.forEach((fn) => fn());
		};
	};
	onBeforeUnmount(clear);
	return {
		bindEvent,
		clear
	};
}

//#endregion
export { useChildLoadEvents };