import { collectScroller, getVisibleArea, getWin, toNum } from "../util.js";
import { computed, nextTick, reactive, ref, shallowRef, toRefs, watch } from "vue";
import { isDOM } from "@v-c/util/dist/Dom/findDOMNode";
import isVisible from "@v-c/util/dist/Dom/isVisible";
function getUnitOffset(size, offset = 0) {
	const offsetStr = `${offset}`;
	const cells = offsetStr.match(/^(.*)\%$/);
	if (cells) return size * (parseFloat(cells[1]) / 100);
	return parseFloat(offsetStr);
}
function getNumberOffset(rect, offset) {
	const [offsetX, offsetY] = offset || [];
	return [getUnitOffset(rect.width, offsetX), getUnitOffset(rect.height, offsetY)];
}
function splitPoints(points = "") {
	return [points[0], points[1]];
}
function getAlignPoint(rect, points) {
	const topBottom = points[0];
	const leftRight = points[1];
	let x;
	let y;
	if (topBottom === "t") y = rect.y;
	else if (topBottom === "b") y = rect.y + rect.height;
	else y = rect.y + rect.height / 2;
	if (leftRight === "l") x = rect.x;
	else if (leftRight === "r") x = rect.x + rect.width;
	else x = rect.x + rect.width / 2;
	return {
		x,
		y
	};
}
function reversePoints(points, index) {
	const reverseMap = {
		t: "b",
		b: "t",
		l: "r",
		r: "l"
	};
	const clone = [...points];
	clone[index] = reverseMap[points[index]] || "c";
	return clone;
}
function flatPoints(points) {
	return points.join("");
}
function shouldSwitchPlacement(isOverflow, isVisibleFirst, newVisibleArea, originVisibleArea, newRecommendArea, originRecommendArea) {
	if (isOverflow) return newVisibleArea > originVisibleArea || newVisibleArea === originVisibleArea && (!isVisibleFirst || newRecommendArea >= originRecommendArea);
	return newVisibleArea > originVisibleArea || isVisibleFirst && newVisibleArea === originVisibleArea && newRecommendArea > originRecommendArea;
}
function useAlign(open, popupEle, target, placement, builtinPlacements, popupAlign, onPopupAlign, mobile) {
	const offsetInfo = reactive({
		ready: false,
		offsetX: 0,
		offsetY: 0,
		offsetR: 0,
		offsetB: 0,
		arrowX: 0,
		arrowY: 0,
		scaleX: 1,
		scaleY: 1,
		align: builtinPlacements.value[placement.value] || {}
	});
	const alignCountRef = shallowRef(0);
	const scrollerList = computed(() => {
		if (!popupEle.value || mobile?.value) return [];
		return collectScroller(popupEle.value);
	});
	const prevFlipRef = ref({});
	const resetFlipCache = () => {
		prevFlipRef.value = {};
	};
	let cacheTargetRect = null;
	let cacheScale = null;
	const _onAlign = (cache = false) => {
		if (cache && !cacheTargetRect) return;
		if (popupEle.value && target.value && open.value && !mobile?.value) {
			const popupElement = popupEle.value;
			const doc = popupElement.ownerDocument;
			const popupComputedStyle = getWin(popupElement).getComputedStyle(popupElement);
			const { position: popupPosition } = popupComputedStyle;
			const originLeft = popupElement.style.left;
			const originTop = popupElement.style.top;
			const originRight = popupElement.style.right;
			const originBottom = popupElement.style.bottom;
			const originOverflow = popupElement.style.overflow;
			const placementInfo = {
				...builtinPlacements.value[placement.value],
				...popupAlign?.value
			};
			const placeholderElement = doc.createElement("div");
			popupElement.parentElement?.appendChild(placeholderElement);
			placeholderElement.style.left = `${popupElement.offsetLeft}px`;
			placeholderElement.style.top = `${popupElement.offsetTop}px`;
			placeholderElement.style.position = popupPosition;
			placeholderElement.style.height = `${popupElement.offsetHeight}px`;
			placeholderElement.style.width = `${popupElement.offsetWidth}px`;
			popupElement.style.left = "0";
			popupElement.style.top = "0";
			popupElement.style.right = "auto";
			popupElement.style.bottom = "auto";
			popupElement.style.overflow = "hidden";
			let targetRect;
			if (Array.isArray(target.value)) targetRect = {
				x: target.value[0],
				y: target.value[1],
				width: 0,
				height: 0
			};
			else {
				const targetRectInfo = target.value.getBoundingClientRect();
				const rect = cache ? Object.assign(targetRectInfo, cacheTargetRect ?? {}) : targetRectInfo;
				if (!cache) cacheTargetRect = {
					width: rect.width,
					height: rect.height
				};
				rect.x = rect.x ?? rect.left;
				rect.y = rect.y ?? rect.top;
				targetRect = {
					x: rect.x,
					y: rect.y,
					width: rect.width,
					height: rect.height
				};
			}
			const rawPopupRect = popupElement.getBoundingClientRect();
			const { clientWidth, clientHeight, scrollWidth, scrollHeight, scrollTop, scrollLeft } = doc.documentElement;
			const targetHeight = targetRect.height;
			const targetWidth = targetRect.width;
			const visibleRegion = {
				left: 0,
				top: 0,
				right: clientWidth,
				bottom: clientHeight
			};
			const scrollRegion = {
				left: -scrollLeft,
				top: -scrollTop,
				right: scrollWidth - scrollLeft,
				bottom: scrollHeight - scrollTop
			};
			let { htmlRegion } = placementInfo;
			const VISIBLE = "visible";
			const VISIBLE_FIRST = "visibleFirst";
			if (htmlRegion !== "scroll" && htmlRegion !== VISIBLE_FIRST) htmlRegion = VISIBLE;
			const isVisibleFirst = htmlRegion === VISIBLE_FIRST;
			const scrollRegionArea = getVisibleArea(scrollRegion, scrollerList.value);
			const visibleRegionArea = getVisibleArea(visibleRegion, scrollerList.value);
			const visibleArea = htmlRegion === VISIBLE ? visibleRegionArea : scrollRegionArea;
			const adjustCheckVisibleArea = isVisibleFirst ? visibleRegionArea : visibleArea;
			popupElement.style.left = "auto";
			popupElement.style.top = "auto";
			popupElement.style.right = "0";
			popupElement.style.bottom = "0";
			const rawPopupMirrorRect = popupElement.getBoundingClientRect();
			popupElement.style.left = originLeft;
			popupElement.style.top = originTop;
			popupElement.style.right = originRight;
			popupElement.style.bottom = originBottom;
			popupElement.style.overflow = originOverflow;
			popupElement.parentElement?.removeChild(placeholderElement);
			const popupRect = rawPopupRect;
			popupRect.x = popupRect.x ?? popupRect.left;
			popupRect.y = popupRect.y ?? popupRect.top;
			const { height, width } = popupComputedStyle;
			const popupHeight = popupRect.height;
			const popupWidth = popupRect.width;
			const popupMirrorRect = rawPopupMirrorRect;
			const scaleX$1 = cache && cacheScale ? cacheScale?.scaleX : toNum(Math.round(popupWidth / parseFloat(width) * 1e3) / 1e3);
			const scaleY$1 = cache && cacheScale ? cacheScale?.scaleY : toNum(Math.round(popupHeight / parseFloat(height) * 1e3) / 1e3);
			if (!cache) cacheScale = {
				scaleX: scaleX$1,
				scaleY: scaleY$1
			};
			if (scaleX$1 === 0 || scaleY$1 === 0 || isDOM(target) && !isVisible(target)) return;
			const { offset, targetOffset } = placementInfo;
			let [popupOffsetX, popupOffsetY] = getNumberOffset(popupRect, offset);
			const [targetOffsetX, targetOffsetY] = getNumberOffset(targetRect, targetOffset);
			targetRect.x -= targetOffsetX;
			targetRect.y -= targetOffsetY;
			const [popupPoint, targetPoint] = placementInfo.points || [];
			const targetPoints = splitPoints(targetPoint);
			const popupPoints = splitPoints(popupPoint);
			const targetAlignPoint = getAlignPoint(targetRect, targetPoints);
			const popupAlignPoint = getAlignPoint(popupRect, popupPoints);
			const nextAlignInfo = { ...placementInfo };
			let nextPoints = [popupPoints, targetPoints];
			let nextOffsetX = targetAlignPoint.x - popupAlignPoint.x + popupOffsetX;
			let nextOffsetY = targetAlignPoint.y - popupAlignPoint.y + popupOffsetY;
			function getIntersectionVisibleArea(offsetX$1, offsetY$1, area = visibleArea) {
				const l = popupRect.x + offsetX$1;
				const t = popupRect.y + offsetY$1;
				const r = l + popupWidth;
				const b = t + popupHeight;
				const visibleL = Math.max(l, area.left);
				const visibleT = Math.max(t, area.top);
				const visibleR = Math.min(r, area.right);
				const visibleB = Math.min(b, area.bottom);
				return Math.max(0, (visibleR - visibleL) * (visibleB - visibleT));
			}
			const originIntersectionVisibleArea = getIntersectionVisibleArea(nextOffsetX, nextOffsetY);
			const originIntersectionRecommendArea = getIntersectionVisibleArea(nextOffsetX, nextOffsetY, visibleRegionArea);
			const targetAlignPointTL = getAlignPoint(targetRect, ["t", "l"]);
			const popupAlignPointTL = getAlignPoint(popupRect, ["t", "l"]);
			const targetAlignPointBR = getAlignPoint(targetRect, ["b", "r"]);
			const popupAlignPointBR = getAlignPoint(popupRect, ["b", "r"]);
			const { adjustX, adjustY, shiftX, shiftY } = placementInfo.overflow || {};
			const supportAdjust = (val) => {
				if (typeof val === "boolean") return val;
				return val >= 0;
			};
			let nextPopupY;
			let nextPopupBottom;
			let nextPopupX;
			let nextPopupRight;
			function syncNextPopupPosition() {
				nextPopupY = popupRect.y + nextOffsetY;
				nextPopupBottom = nextPopupY + popupHeight;
				nextPopupX = popupRect.x + nextOffsetX;
				nextPopupRight = nextPopupX + popupWidth;
			}
			syncNextPopupPosition();
			const needAdjustY = supportAdjust(adjustY);
			const sameTB = popupPoints[0] === targetPoints[0];
			const overflowBottom = nextPopupBottom > adjustCheckVisibleArea.bottom;
			if (needAdjustY && popupPoints[0] === "t" && (overflowBottom || prevFlipRef.value.bt)) {
				let tmpNextOffsetY = nextOffsetY;
				if (sameTB) tmpNextOffsetY -= popupHeight - targetHeight;
				else tmpNextOffsetY = targetAlignPointTL.y - popupAlignPointBR.y - popupOffsetY;
				if (shouldSwitchPlacement(overflowBottom, isVisibleFirst, getIntersectionVisibleArea(nextOffsetX, tmpNextOffsetY), originIntersectionVisibleArea, getIntersectionVisibleArea(nextOffsetX, tmpNextOffsetY, visibleRegionArea), originIntersectionRecommendArea)) {
					prevFlipRef.value.bt = true;
					nextOffsetY = tmpNextOffsetY;
					popupOffsetY = -popupOffsetY;
					nextPoints = [reversePoints(nextPoints[0], 0), reversePoints(nextPoints[1], 0)];
				} else prevFlipRef.value.bt = false;
			}
			const overflowTop = nextPopupY < adjustCheckVisibleArea.top;
			if (needAdjustY && popupPoints[0] === "b" && (overflowTop || prevFlipRef.value.tb)) {
				let tmpNextOffsetY = nextOffsetY;
				if (sameTB) tmpNextOffsetY += popupHeight - targetHeight;
				else tmpNextOffsetY = targetAlignPointBR.y - popupAlignPointTL.y - popupOffsetY;
				if (shouldSwitchPlacement(overflowTop, isVisibleFirst, getIntersectionVisibleArea(nextOffsetX, tmpNextOffsetY), originIntersectionVisibleArea, getIntersectionVisibleArea(nextOffsetX, tmpNextOffsetY, visibleRegionArea), originIntersectionRecommendArea)) {
					prevFlipRef.value.tb = true;
					nextOffsetY = tmpNextOffsetY;
					popupOffsetY = -popupOffsetY;
					nextPoints = [reversePoints(nextPoints[0], 0), reversePoints(nextPoints[1], 0)];
				} else prevFlipRef.value.tb = false;
			}
			const needAdjustX = supportAdjust(adjustX);
			const sameLR = popupPoints[1] === targetPoints[1];
			const overflowRight = nextPopupRight > adjustCheckVisibleArea.right;
			if (needAdjustX && popupPoints[1] === "l" && (overflowRight || prevFlipRef.value.rl)) {
				let tmpNextOffsetX = nextOffsetX;
				if (sameLR) tmpNextOffsetX -= popupWidth - targetWidth;
				else tmpNextOffsetX = targetAlignPointTL.x - popupAlignPointBR.x - popupOffsetX;
				if (shouldSwitchPlacement(overflowRight, isVisibleFirst, getIntersectionVisibleArea(tmpNextOffsetX, nextOffsetY), originIntersectionVisibleArea, getIntersectionVisibleArea(tmpNextOffsetX, nextOffsetY, visibleRegionArea), originIntersectionRecommendArea)) {
					prevFlipRef.value.rl = true;
					nextOffsetX = tmpNextOffsetX;
					popupOffsetX = -popupOffsetX;
					nextPoints = [reversePoints(nextPoints[0], 1), reversePoints(nextPoints[1], 1)];
				} else prevFlipRef.value.rl = false;
			}
			const overflowLeft = nextPopupX < adjustCheckVisibleArea.left;
			if (needAdjustX && popupPoints[1] === "r" && (overflowLeft || prevFlipRef.value.lr)) {
				let tmpNextOffsetX = nextOffsetX;
				if (sameLR) tmpNextOffsetX += popupWidth - targetWidth;
				else tmpNextOffsetX = targetAlignPointBR.x - popupAlignPointTL.x - popupOffsetX;
				if (shouldSwitchPlacement(overflowLeft, isVisibleFirst, getIntersectionVisibleArea(tmpNextOffsetX, nextOffsetY), originIntersectionVisibleArea, getIntersectionVisibleArea(tmpNextOffsetX, nextOffsetY, visibleRegionArea), originIntersectionRecommendArea)) {
					prevFlipRef.value.lr = true;
					nextOffsetX = tmpNextOffsetX;
					popupOffsetX = -popupOffsetX;
					nextPoints = [reversePoints(nextPoints[0], 1), reversePoints(nextPoints[1], 1)];
				} else prevFlipRef.value.lr = false;
			}
			nextAlignInfo.points = [flatPoints(nextPoints[0]), flatPoints(nextPoints[1])];
			syncNextPopupPosition();
			const numShiftX = shiftX === true ? 0 : shiftX;
			if (typeof numShiftX === "number") {
				if (nextPopupX < visibleRegionArea.left) {
					nextOffsetX -= nextPopupX - visibleRegionArea.left - popupOffsetX;
					if (targetRect.x + targetWidth < visibleRegionArea.left + numShiftX) nextOffsetX += targetRect.x - visibleRegionArea.left + targetWidth - numShiftX;
				}
				if (nextPopupRight > visibleRegionArea.right) {
					nextOffsetX -= nextPopupRight - visibleRegionArea.right - popupOffsetX;
					if (targetRect.x > visibleRegionArea.right - numShiftX) nextOffsetX += targetRect.x - visibleRegionArea.right + numShiftX;
				}
			}
			const numShiftY = shiftY === true ? 0 : shiftY;
			if (typeof numShiftY === "number") {
				if (nextPopupY < visibleRegionArea.top) {
					nextOffsetY -= nextPopupY - visibleRegionArea.top - popupOffsetY;
					if (targetRect.y + targetHeight < visibleRegionArea.top + numShiftY) nextOffsetY += targetRect.y - visibleRegionArea.top + targetHeight - numShiftY;
				}
				if (nextPopupBottom > visibleRegionArea.bottom) {
					nextOffsetY -= nextPopupBottom - visibleRegionArea.bottom - popupOffsetY;
					if (targetRect.y > visibleRegionArea.bottom - numShiftY) nextOffsetY += targetRect.y - visibleRegionArea.bottom + numShiftY;
				}
			}
			const popupLeft = popupRect.x + nextOffsetX;
			const popupRight = popupLeft + popupWidth;
			const popupTop = popupRect.y + nextOffsetY;
			const popupBottom = popupTop + popupHeight;
			const targetLeft = targetRect.x;
			const targetRight = targetLeft + targetWidth;
			const targetTop = targetRect.y;
			const targetBottom = targetTop + targetHeight;
			const nextArrowX = (Math.max(popupLeft, targetLeft) + Math.min(popupRight, targetRight)) / 2 - popupLeft;
			const nextArrowY = (Math.max(popupTop, targetTop) + Math.min(popupBottom, targetBottom)) / 2 - popupTop;
			onPopupAlign?.(popupEle.value, nextAlignInfo);
			let offsetX4Right = popupMirrorRect.right - popupRect.x - (nextOffsetX + popupRect.width);
			let offsetY4Bottom = popupMirrorRect.bottom - popupRect.y - (nextOffsetY + popupRect.height);
			if (scaleX$1 === 1) {
				nextOffsetX = Math.floor(nextOffsetX);
				offsetX4Right = Math.floor(offsetX4Right);
			}
			if (scaleY$1 === 1) {
				nextOffsetY = Math.floor(nextOffsetY);
				offsetY4Bottom = Math.floor(offsetY4Bottom);
			}
			const nextOffsetInfo = {
				ready: true,
				offsetX: nextOffsetX / scaleX$1,
				offsetY: nextOffsetY / scaleY$1,
				offsetR: offsetX4Right / scaleX$1,
				offsetB: offsetY4Bottom / scaleY$1,
				arrowX: nextArrowX / scaleX$1,
				arrowY: nextArrowY / scaleY$1,
				scaleX: scaleX$1,
				scaleY: scaleY$1,
				align: nextAlignInfo
			};
			Object.assign(offsetInfo, nextOffsetInfo);
		}
	};
	const onAlign = _onAlign;
	const triggerAlign = (cache) => {
		alignCountRef.value += 1;
		const id = alignCountRef.value;
		Promise.resolve().then(() => {
			if (alignCountRef.value === id) onAlign(cache);
		});
	};
	watch(popupEle, async (ele) => {
		if (ele && open.value && !mobile?.value) {
			await nextTick();
			triggerAlign();
		}
	});
	const resetReady = () => {
		offsetInfo.ready = false;
	};
	watch(placement, () => {
		resetReady();
	});
	watch(open, () => {
		if (!open.value) {
			resetFlipCache();
			resetReady();
		}
	}, { immediate: true });
	const { ready, offsetX, offsetR, offsetY, offsetB, align, arrowY, arrowX, scaleY, scaleX } = toRefs(offsetInfo);
	return [
		ready,
		offsetX,
		offsetY,
		offsetR,
		offsetB,
		arrowX,
		arrowY,
		scaleX,
		scaleY,
		align,
		triggerAlign
	];
}
export { useAlign as default };
