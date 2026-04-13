function isPointsEq(a1 = [], a2 = [], isAlignPoint) {
	const getVal = (a, index) => a[index] || "";
	if (isAlignPoint) return getVal(a1, 0) === getVal(a2, 0);
	return getVal(a1, 0) === getVal(a2, 0) && getVal(a1, 1) === getVal(a2, 1);
}
function getAlignPopupClassName(builtinPlacements, prefixCls, align, isAlignPoint) {
	const { points } = align;
	const placements = Object.keys(builtinPlacements);
	for (let i = 0; i < placements.length; i += 1) {
		const placement = placements[i];
		if (isPointsEq(builtinPlacements[placement]?.points, points, isAlignPoint)) return `${prefixCls}-placement-${placement}`;
	}
	return "";
}
function getWin(ele) {
	return ele.ownerDocument.defaultView;
}
function collectScroller(ele) {
	const scrollerList = [];
	let current = ele?.parentElement;
	const scrollStyle = [
		"hidden",
		"scroll",
		"clip",
		"auto"
	];
	while (current) {
		const { overflowX, overflowY, overflow } = getWin(current).getComputedStyle(current);
		if ([
			overflowX,
			overflowY,
			overflow
		].some((o) => scrollStyle.includes(o))) scrollerList.push(current);
		current = current.parentElement;
	}
	return scrollerList;
}
function toNum(num, defaultValue = 1) {
	return Number.isNaN(num) ? defaultValue : num;
}
function getPxValue(val) {
	return toNum(parseFloat(val), 0);
}
function getVisibleArea(initArea, scrollerList) {
	const visibleArea = { ...initArea };
	(scrollerList || []).forEach((ele) => {
		if (ele instanceof HTMLBodyElement || ele instanceof HTMLHtmlElement) return;
		const { overflow, overflowClipMargin, borderTopWidth, borderBottomWidth, borderLeftWidth, borderRightWidth } = getWin(ele).getComputedStyle(ele);
		const eleRect = ele.getBoundingClientRect();
		const { offsetHeight: eleOutHeight, clientHeight: eleInnerHeight, offsetWidth: eleOutWidth, clientWidth: eleInnerWidth } = ele;
		const borderTopNum = getPxValue(borderTopWidth);
		const borderBottomNum = getPxValue(borderBottomWidth);
		const borderLeftNum = getPxValue(borderLeftWidth);
		const borderRightNum = getPxValue(borderRightWidth);
		const scaleX = toNum(Math.round(eleRect.width / eleOutWidth * 1e3) / 1e3);
		const scaleY = toNum(Math.round(eleRect.height / eleOutHeight * 1e3) / 1e3);
		const eleScrollWidth = (eleOutWidth - eleInnerWidth - borderLeftNum - borderRightNum) * scaleX;
		const eleScrollHeight = (eleOutHeight - eleInnerHeight - borderTopNum - borderBottomNum) * scaleY;
		const scaledBorderTopWidth = borderTopNum * scaleY;
		const scaledBorderBottomWidth = borderBottomNum * scaleY;
		const scaledBorderLeftWidth = borderLeftNum * scaleX;
		const scaledBorderRightWidth = borderRightNum * scaleX;
		let clipMarginWidth = 0;
		let clipMarginHeight = 0;
		if (overflow === "clip") {
			const clipNum = getPxValue(overflowClipMargin);
			clipMarginWidth = clipNum * scaleX;
			clipMarginHeight = clipNum * scaleY;
		}
		const eleLeft = eleRect.x + scaledBorderLeftWidth - clipMarginWidth;
		const eleTop = eleRect.y + scaledBorderTopWidth - clipMarginHeight;
		const eleRight = eleLeft + eleRect.width + 2 * clipMarginWidth - scaledBorderLeftWidth - scaledBorderRightWidth - eleScrollWidth;
		const eleBottom = eleTop + eleRect.height + 2 * clipMarginHeight - scaledBorderTopWidth - scaledBorderBottomWidth - eleScrollHeight;
		visibleArea.left = Math.max(visibleArea.left, eleLeft);
		visibleArea.top = Math.max(visibleArea.top, eleTop);
		visibleArea.right = Math.min(visibleArea.right, eleRight);
		visibleArea.bottom = Math.min(visibleArea.bottom, eleBottom);
	});
	return visibleArea;
}
export { collectScroller, getAlignPopupClassName, getVisibleArea, getWin, toNum };
