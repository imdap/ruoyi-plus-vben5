import { getClientSize } from "../util.js";
import { ref, shallowRef } from "vue";
import isEqual from "@v-c/util/dist/isEqual";
import raf from "@v-c/util/dist/raf";
//#region src/hooks/useImageTransform.ts
var initialTransform = {
	x: 0,
	y: 0,
	rotate: 0,
	scale: 1,
	flipX: false,
	flipY: false
};
function useImageTransform(imgRef, minScale, maxScale, onTransform) {
	const frame = shallowRef(null);
	const queue = ref([]);
	const transform = shallowRef(initialTransform);
	const resetTransform = (action) => {
		const oldTransform = transform.value;
		transform.value = initialTransform;
		if (!isEqual(initialTransform, oldTransform)) onTransform?.({
			transform: initialTransform,
			action
		});
	};
	/** Direct update transform */
	const updateTransform = (newTransform, action) => {
		if (frame.value === null) {
			queue.value = [];
			frame.value = raf(() => {
				let memoState = transform.value;
				queue.value.forEach((queueState) => {
					memoState = {
						...memoState,
						...queueState
					};
				});
				frame.value = null;
				onTransform?.({
					transform: memoState,
					action
				});
				transform.value = memoState;
			});
		}
		queue.value.push({
			...transform.value,
			...newTransform
		});
	};
	/** Scale according to the position of centerX and centerY */
	const dispatchZoomChange = (ratio, action, centerX, centerY, isTouch) => {
		if (!imgRef.value) return;
		const { width, height, offsetWidth, offsetHeight, offsetLeft, offsetTop } = imgRef.value;
		const _transform = transform.value;
		const _maxScale = maxScale.value;
		const _minScale = minScale.value;
		let newRatio = ratio;
		let newScale = _transform.scale * ratio;
		if (newScale > _maxScale) {
			newScale = _maxScale;
			newRatio = _maxScale / _transform.scale;
		} else if (newScale < _minScale) {
			newScale = isTouch ? newScale : _minScale;
			newRatio = newScale / _transform.scale;
		}
		/** Default center point scaling */
		const mergedCenterX = centerX ?? innerWidth / 2;
		const mergedCenterY = centerY ?? innerHeight / 2;
		const diffRatio = newRatio - 1;
		/** Deviation calculated from image size */
		const diffImgX = diffRatio * width * .5;
		const diffImgY = diffRatio * height * .5;
		/** The difference between the click position and the edge of the document */
		const diffOffsetLeft = diffRatio * (mergedCenterX - _transform.x - offsetLeft);
		const diffOffsetTop = diffRatio * (mergedCenterY - _transform.y - offsetTop);
		/** Final positioning */
		let newX = _transform.x - (diffOffsetLeft - diffImgX);
		let newY = _transform.y - (diffOffsetTop - diffImgY);
		/**
		* When zooming the image
		* When the image size is smaller than the width and height of the window, the position is initialized
		*/
		if (ratio < 1 && newScale === 1) {
			const mergedWidth = offsetWidth * newScale;
			const mergedHeight = offsetHeight * newScale;
			const { width: clientWidth, height: clientHeight } = getClientSize();
			if (mergedWidth <= clientWidth && mergedHeight <= clientHeight) {
				newX = 0;
				newY = 0;
			}
		}
		updateTransform({
			x: newX,
			y: newY,
			scale: newScale
		}, action);
	};
	return {
		transform,
		resetTransform,
		updateTransform,
		dispatchZoomChange
	};
}
//#endregion
export { useImageTransform as default };
