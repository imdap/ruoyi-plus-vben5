//#region src/affix/utils.ts
function getTargetRect(target) {
	return target !== window ? target.getBoundingClientRect() : {
		top: 0,
		bottom: window.innerHeight
	};
}
function getFixedTop(placeholderRect, targetRect, offsetTop) {
	if (offsetTop !== void 0 && Math.round(targetRect.top) > Math.round(placeholderRect.top) - offsetTop) return offsetTop + targetRect.top;
}
function getFixedBottom(placeholderRect, targetRect, offsetBottom) {
	if (offsetBottom !== void 0 && Math.round(targetRect.bottom) < Math.round(placeholderRect.bottom) + offsetBottom) return offsetBottom + (window.innerHeight - targetRect.bottom);
}

//#endregion
export { getFixedBottom, getFixedTop, getTargetRect };