import getFixScaleEleTransPosition from "../getFixScaleEleTransPosition.js";
import { shallowRef, watchEffect } from "vue";
import canUseDom from "@v-c/util/dist/Dom/canUseDom";
//#region src/hooks/useTouchEvent.ts
function getDistance(a, b) {
	const x = a.x - b.x;
	const y = a.y - b.y;
	return Math.hypot(x, y);
}
function getCenter(oldPoint1, oldPoint2, newPoint1, newPoint2) {
	const distance1 = getDistance(oldPoint1, newPoint1);
	const distance2 = getDistance(oldPoint2, newPoint2);
	if (distance1 === 0 && distance2 === 0) return [oldPoint1.x, oldPoint1.y];
	const ratio = distance1 / (distance1 + distance2);
	return [oldPoint1.x + ratio * (oldPoint2.x - oldPoint1.x), oldPoint1.y + ratio * (oldPoint2.y - oldPoint1.y)];
}
function useTouchEvent(imgRef, movable, open, minScale, transform, updateTransform, dispatchZoomChange) {
	const isTouching = shallowRef(false);
	const touchPointInfo = shallowRef({
		point1: {
			x: 0,
			y: 0
		},
		point2: {
			x: 0,
			y: 0
		},
		eventType: "none"
	});
	const updateTouchPointInfo = (values) => {
		touchPointInfo.value = {
			...touchPointInfo.value,
			...values
		};
	};
	const onTouchStart = (event) => {
		if (!movable.value) return;
		event.stopPropagation();
		isTouching.value = true;
		const { touches = [] } = event;
		const { x, y } = transform.value;
		if (touches.length > 1) updateTouchPointInfo({
			point1: {
				x: touches[0].clientX,
				y: touches[0].clientY
			},
			point2: {
				x: touches[1].clientX,
				y: touches[1].clientY
			},
			eventType: "touchZoom"
		});
		else updateTouchPointInfo({
			point1: {
				x: touches[0].clientX - x,
				y: touches[0].clientY - y
			},
			eventType: "move"
		});
	};
	const onTouchMove = (event) => {
		const { touches = [] } = event;
		const { point1, point2, eventType } = touchPointInfo.value;
		if (touches.length > 1 && eventType === "touchZoom") {
			const newPoint1 = {
				x: touches[0].clientX,
				y: touches[0].clientY
			};
			const newPoint2 = {
				x: touches[1].clientX,
				y: touches[1].clientY
			};
			const [centerX, centerY] = getCenter(point1, point2, newPoint1, newPoint2);
			dispatchZoomChange(getDistance(newPoint1, newPoint2) / getDistance(point1, point2), "touchZoom", centerX, centerY, true);
			updateTouchPointInfo({
				point1: newPoint1,
				point2: newPoint2,
				eventType: "touchZoom"
			});
		} else if (eventType === "move") {
			updateTransform({
				x: touches[0].clientX - point1.x,
				y: touches[0].clientY - point1.y
			}, "move");
			updateTouchPointInfo({ eventType: "move" });
		}
	};
	const onTouchEnd = () => {
		if (!open.value || !imgRef.value) return;
		if (isTouching.value) isTouching.value = false;
		updateTouchPointInfo({ eventType: "none" });
		const { rotate, scale } = transform.value;
		if (minScale.value > scale)
 /** When the scaling ratio is less than the minimum scaling ratio, reset the scaling ratio */
		return updateTransform({
			x: 0,
			y: 0,
			scale: minScale.value
		}, "touchZoom");
		const width = imgRef.value.offsetWidth * scale;
		const height = imgRef.value.offsetHeight * scale;
		const { left, top } = imgRef.value.getBoundingClientRect() ?? {};
		const isRotate = rotate % 180 !== 0;
		const fixState = getFixScaleEleTransPosition(isRotate ? height : width, isRotate ? width : height, left, top);
		if (fixState) updateTransform({ ...fixState }, "dragRebound");
	};
	watchEffect((onCleanup) => {
		if (!canUseDom()) return;
		const preventDefault = (e) => {
			e.preventDefault();
		};
		if (open.value && movable.value) window.addEventListener("touchmove", preventDefault, { passive: false });
		onCleanup(() => {
			window.removeEventListener("touchmove", preventDefault);
		});
	});
	return {
		isTouching,
		onTouchStart,
		onTouchMove,
		onTouchEnd
	};
}
//#endregion
export { useTouchEvent as default };
