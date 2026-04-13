import getFixScaleEleTransPosition from "../getFixScaleEleTransPosition.js";
import "../previewConfig.js";
import { shallowRef, watch } from "vue";
import { warning } from "@v-c/util";
import canUseDom from "@v-c/util/dist/Dom/canUseDom";
//#region src/hooks/useMouseEvent.ts
function useMouseEvent(imgRef, movable, open, scaleStep, transform, updateTransform, dispatchZoomChange) {
	const isMoving = shallowRef(false);
	const startPositionInfo = shallowRef({
		diffX: 0,
		diffY: 0,
		transformX: 0,
		transformY: 0
	});
	const onMouseDown = (event) => {
		const { x, y } = transform.value;
		if (!movable.value || event.button !== 0) return;
		event.preventDefault();
		event.stopPropagation();
		startPositionInfo.value = {
			diffX: event.pageX - x,
			diffY: event.pageY - y,
			transformX: x,
			transformY: y
		};
		isMoving.value = true;
	};
	const onMouseMove = (event) => {
		if (open.value && isMoving.value) updateTransform({
			x: event.pageX - startPositionInfo.value.diffX,
			y: event.pageY - startPositionInfo.value.diffY
		}, "move");
	};
	const onMouseUp = () => {
		if (open.value && isMoving.value) {
			const { x, y, scale, rotate } = transform.value;
			isMoving.value = false;
			/** No need to restore the position when the picture is not moved, So as not to interfere with the click */
			const { transformX, transformY } = startPositionInfo.value;
			if (!(x !== transformX && y !== transformY)) return;
			if (!imgRef.value) return;
			const width = imgRef.value.offsetWidth * scale;
			const height = imgRef.value.offsetHeight * scale;
			const { left, top } = imgRef.value.getBoundingClientRect() ?? {};
			const isRotate = rotate % 180 !== 0;
			const fixState = getFixScaleEleTransPosition(isRotate ? height : width, isRotate ? width : height, left, top);
			if (fixState) updateTransform({ ...fixState }, "dragRebound");
		}
	};
	const onWheel = (event) => {
		if (!open.value || event.deltaY === 0) return;
		const scaleRatio = Math.abs(event.deltaY / 100);
		let ratio = 1 + Math.min(scaleRatio, 1) * scaleStep.value;
		if (event.deltaY > 0) ratio = 1 / ratio;
		dispatchZoomChange(ratio, "wheel", event.clientX, event.clientY);
	};
	watch([
		open,
		isMoving,
		transform,
		movable
	], (_n, _o, onCleanup) => {
		if (!canUseDom() || !movable.value) return;
		window.addEventListener("mouseup", onMouseUp, false);
		window.addEventListener("mousemove", onMouseMove, false);
		try {
			/* istanbul ignore next */
			if (window.top !== window.self) {
				window?.top?.addEventListener("mouseup", onMouseUp, false);
				window?.top?.addEventListener("mousemove", onMouseMove, false);
			}
		} catch (e) {
			warning(false, `[vc-image] ${e}`);
		}
		onCleanup(() => {
			window.removeEventListener("mouseup", onMouseUp);
			window.removeEventListener("mousemove", onMouseMove);
			/* istanbul ignore next */
			try {
				window.top?.removeEventListener("mouseup", onMouseUp);
				window.top?.removeEventListener("mousemove", onMouseMove);
			} catch (error) {}
		});
	});
	return {
		isMoving,
		onMouseDown,
		onMouseMove,
		onMouseUp,
		onWheel
	};
}
//#endregion
export { useMouseEvent as default };
