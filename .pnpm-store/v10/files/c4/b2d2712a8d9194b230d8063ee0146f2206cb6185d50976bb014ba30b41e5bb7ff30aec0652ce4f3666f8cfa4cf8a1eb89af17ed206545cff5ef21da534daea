//#region src/_util/mediaQueryUtil.ts
const addMediaQueryListener = (mql, handler) => {
	if (typeof mql?.addEventListener !== "undefined") mql.addEventListener("change", handler);
	else if (typeof mql?.addListener !== "undefined") mql.addListener(handler);
};
const removeMediaQueryListener = (mql, handler) => {
	if (typeof mql?.removeEventListener !== "undefined") mql.removeEventListener("change", handler);
	else if (typeof mql?.removeListener !== "undefined") mql.removeListener(handler);
};

//#endregion
export { addMediaQueryListener, removeMediaQueryListener };