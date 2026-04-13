import { removeCSS, updateCSS } from "./Dom/dynamicCSS.js";
var cached;
function measureScrollbarSize(ele) {
	const randomId = `vc-scrollbar-measure-${Math.random().toString(36).substring(7)}`;
	const measureEle = document.createElement("div");
	measureEle.id = randomId;
	const measureStyle = measureEle.style;
	measureStyle.position = "absolute";
	measureStyle.left = "0";
	measureStyle.top = "0";
	measureStyle.width = "100px";
	measureStyle.height = "100px";
	measureStyle.overflow = "scroll";
	let fallbackWidth;
	let fallbackHeight;
	if (ele) {
		const targetStyle = getComputedStyle(ele);
		measureStyle.scrollbarColor = targetStyle.scrollbarColor;
		measureStyle.scrollbarWidth = targetStyle.scrollbarWidth;
		const webkitScrollbarStyle = getComputedStyle(ele, "::-webkit-scrollbar");
		const width = parseInt(webkitScrollbarStyle.width, 10);
		const height = parseInt(webkitScrollbarStyle.height, 10);
		try {
			updateCSS(`
#${randomId}::-webkit-scrollbar {
${width ? `width: ${webkitScrollbarStyle.width};` : ""}
${height ? `height: ${webkitScrollbarStyle.height};` : ""}
}`, randomId);
		} catch (e) {
			console.error(e);
			fallbackWidth = width;
			fallbackHeight = height;
		}
	}
	document.body.appendChild(measureEle);
	const scrollWidth = ele && fallbackWidth && !Number.isNaN(fallbackWidth) ? fallbackWidth : measureEle.offsetWidth - measureEle.clientWidth;
	const scrollHeight = ele && fallbackHeight && !Number.isNaN(fallbackHeight) ? fallbackHeight : measureEle.offsetHeight - measureEle.clientHeight;
	document.body.removeChild(measureEle);
	removeCSS(randomId);
	return {
		width: scrollWidth,
		height: scrollHeight
	};
}
function getScrollBarSize(fresh) {
	if (typeof document === "undefined") return 0;
	if (fresh || cached === void 0) cached = measureScrollbarSize();
	return cached.width;
}
function getTargetScrollBarSize(target) {
	if (typeof document === "undefined" || !target || !(target instanceof Element)) return {
		width: 0,
		height: 0
	};
	return measureScrollbarSize(target);
}
export { getScrollBarSize as default, getTargetScrollBarSize };
