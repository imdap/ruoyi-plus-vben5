Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
function isInViewPort(element) {
	const viewWidth = window.innerWidth || document.documentElement.clientWidth;
	const viewHeight = window.innerHeight || document.documentElement.clientHeight;
	const { top, right, bottom, left } = element.getBoundingClientRect();
	return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
}
function getPlacement(targetElement, placement, stepPlacement) {
	return stepPlacement ?? placement ?? (targetElement === null ? "center" : "bottom");
}
exports.getPlacement = getPlacement;
exports.isInViewPort = isInViewPort;
