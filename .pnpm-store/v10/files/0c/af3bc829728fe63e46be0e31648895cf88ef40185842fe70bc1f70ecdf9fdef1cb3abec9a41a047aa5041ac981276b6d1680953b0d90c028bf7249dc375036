import raf from "@v-c/util/dist/raf";

//#region src/_util/throttleByAnimationFrame.ts
function throttleByAnimationFrame(fn) {
	let requestId = null;
	const later = (args) => () => {
		requestId = null;
		fn(...args);
	};
	const throttled = (...args) => {
		if (requestId === null) requestId = raf(later(args));
	};
	throttled.cancel = () => {
		raf.cancel(requestId);
		requestId = null;
	};
	return throttled;
}
var throttleByAnimationFrame_default = throttleByAnimationFrame;

//#endregion
export { throttleByAnimationFrame_default as default };