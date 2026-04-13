import getScroll_default, { isWindow } from "./getScroll.js";
import { easeInOutCubic } from "./easings.js";
import raf from "@v-c/util/dist/raf";

//#region src/_util/scrollTo.ts
function scrollTo(y, options = {}) {
	const { getContainer = () => window, callback, duration = 450 } = options;
	const container = getContainer();
	const scrollTop = getScroll_default(container);
	const startTime = Date.now();
	const frameFunc = () => {
		const time = Date.now() - startTime;
		const nextScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y, duration);
		if (isWindow(container)) container.scrollTo(window.pageXOffset, nextScrollTop);
		else if (container instanceof Document || container.constructor.name === "HTMLDocument") container.documentElement.scrollTop = nextScrollTop;
		else container.scrollTop = nextScrollTop;
		if (time < duration) raf(frameFunc);
		else if (typeof callback === "function") callback();
	};
	raf(frameFunc);
}

//#endregion
export { scrollTo as default };