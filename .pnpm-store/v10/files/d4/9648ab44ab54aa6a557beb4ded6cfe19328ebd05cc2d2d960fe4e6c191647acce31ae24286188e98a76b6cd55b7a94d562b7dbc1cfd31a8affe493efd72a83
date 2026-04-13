//#region src/_util/getScroll.ts
function isWindow(obj) {
	return obj !== null && obj !== void 0 && obj === obj.window;
}
function getScroll(target) {
	if (typeof window === "undefined")
 /* istanbul ignore next */
	return 0;
	let result = 0;
	if (isWindow(target)) result = target.pageYOffset;
	else if (target instanceof Document) result = target.documentElement.scrollTop;
	else if (target instanceof HTMLElement) result = target.scrollTop;
	else if (target) result = target["scrollTop"];
	if (target && !isWindow(target) && typeof result !== "number") result = (target.ownerDocument ?? target).documentElement?.scrollTop;
	return result;
}
var getScroll_default = getScroll;

//#endregion
export { getScroll_default as default, isWindow };