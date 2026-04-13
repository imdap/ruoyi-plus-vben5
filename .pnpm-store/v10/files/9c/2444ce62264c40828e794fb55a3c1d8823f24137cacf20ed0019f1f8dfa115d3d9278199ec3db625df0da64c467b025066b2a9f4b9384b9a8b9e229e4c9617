import { UnstableContextKey, defaultUnstableContextValue } from "../context.js";
import { computed, inject, onUnmounted, ref, watch } from "vue";
var REMOVE_DIST = 130;
function getPosition(e) {
	const obj = "targetTouches" in e ? e.targetTouches[0] : e;
	return {
		pageX: obj.pageX,
		pageY: obj.pageY
	};
}
function useDrag(containerRef, direction, rawValues, min, max, formatValue, triggerChange, finishChange, offsetValues, editable, minCount) {
	const draggingValue = ref(null);
	const draggingIndex = ref(-1);
	const draggingDelete = ref(false);
	const cacheValues = ref(rawValues.value);
	const originValues = ref(rawValues.value);
	const mouseMoveEventRef = ref(null);
	const mouseUpEventRef = ref(null);
	const touchEventTargetRef = ref(null);
	const { onDragStart, onDragChange } = inject(UnstableContextKey, defaultUnstableContextValue);
	watch(rawValues, (val) => {
		if (draggingIndex.value === -1) {
			cacheValues.value = [...val];
			originValues.value = [...val];
		}
	}, { immediate: true });
	onUnmounted(() => {
		document.removeEventListener("mousemove", mouseMoveEventRef.value);
		document.removeEventListener("mouseup", mouseUpEventRef.value);
		if (touchEventTargetRef.value) {
			touchEventTargetRef.value.removeEventListener("touchmove", mouseMoveEventRef.value);
			touchEventTargetRef.value.removeEventListener("touchend", mouseUpEventRef.value);
		}
	});
	const flushValues = (nextValues, nextValue, deleteMark) => {
		if (nextValue !== void 0) draggingValue.value = nextValue;
		cacheValues.value = nextValues;
		let changeValues = nextValues;
		if (deleteMark) changeValues = nextValues.filter((_, i) => i !== draggingIndex.value);
		triggerChange(changeValues);
		if (onDragChange) onDragChange({
			rawValues: nextValues,
			deleteIndex: deleteMark ? draggingIndex.value : -1,
			draggingIndex: draggingIndex.value,
			draggingValue: nextValue
		});
	};
	const updateCacheValue = (valueIndex, offsetPercent, deleteMark) => {
		if (valueIndex === -1) {
			const startValue = originValues.value[0];
			const endValue = originValues.value[originValues.value.length - 1];
			const maxStartOffset = min.value - startValue;
			const maxEndOffset = max.value - endValue;
			let offset = offsetPercent * (max.value - min.value);
			offset = Math.max(offset, maxStartOffset);
			offset = Math.min(offset, maxEndOffset);
			offset = formatValue.value(startValue + offset) - startValue;
			flushValues(originValues.value.map((val) => val + offset));
		} else {
			const offsetDist = (max.value - min.value) * offsetPercent;
			const cloneValues = [...cacheValues.value];
			cloneValues[valueIndex] = originValues.value[valueIndex];
			const next = offsetValues.value(cloneValues, offsetDist, valueIndex, "dist");
			flushValues(next.values, next.value, deleteMark);
		}
	};
	const onStartMove = (e, valueIndex, startValues) => {
		e.stopPropagation();
		const initialValues = startValues || rawValues.value;
		const originValue = initialValues[valueIndex];
		draggingIndex.value = valueIndex;
		draggingValue.value = originValue;
		originValues.value = initialValues;
		cacheValues.value = initialValues;
		draggingDelete.value = false;
		const { pageX: startX, pageY: startY } = getPosition(e);
		let deleteMark = false;
		if (onDragStart) onDragStart({
			rawValues: initialValues,
			draggingIndex: valueIndex,
			draggingValue: originValue
		});
		const onMouseMove = (event) => {
			event.preventDefault();
			const { pageX: moveX, pageY: moveY } = getPosition(event);
			const offsetX = moveX - startX;
			const offsetY = moveY - startY;
			const { width, height } = containerRef.value.getBoundingClientRect();
			let offSetPercent;
			let removeDist;
			switch (direction.value) {
				case "btt":
					offSetPercent = -offsetY / height;
					removeDist = offsetX;
					break;
				case "ttb":
					offSetPercent = offsetY / height;
					removeDist = offsetX;
					break;
				case "rtl":
					offSetPercent = -offsetX / width;
					removeDist = offsetY;
					break;
				default:
					offSetPercent = offsetX / width;
					removeDist = offsetY;
			}
			deleteMark = editable.value ? Math.abs(removeDist) > REMOVE_DIST && minCount.value < cacheValues.value.length : false;
			draggingDelete.value = deleteMark;
			updateCacheValue(valueIndex, offSetPercent, deleteMark);
		};
		const onMouseUp = (event) => {
			event.preventDefault();
			document.removeEventListener("mouseup", onMouseUp);
			document.removeEventListener("mousemove", onMouseMove);
			if (touchEventTargetRef.value) {
				touchEventTargetRef.value.removeEventListener("touchmove", mouseMoveEventRef.value);
				touchEventTargetRef.value.removeEventListener("touchend", mouseUpEventRef.value);
			}
			mouseMoveEventRef.value = null;
			mouseUpEventRef.value = null;
			touchEventTargetRef.value = null;
			finishChange(deleteMark);
			draggingIndex.value = -1;
			draggingDelete.value = false;
		};
		document.addEventListener("mouseup", onMouseUp);
		document.addEventListener("mousemove", onMouseMove);
		e.currentTarget.addEventListener("touchend", onMouseUp);
		e.currentTarget.addEventListener("touchmove", onMouseMove);
		mouseMoveEventRef.value = onMouseMove;
		mouseUpEventRef.value = onMouseUp;
		touchEventTargetRef.value = e.currentTarget;
	};
	return [
		draggingIndex,
		draggingValue,
		draggingDelete,
		computed(() => {
			const sourceValues = [...rawValues.value].sort((a, b) => a - b);
			const targetValues = [...cacheValues.value].sort((a, b) => a - b);
			const counts = {};
			targetValues.forEach((val) => {
				counts[val] = (counts[val] || 0) + 1;
			});
			sourceValues.forEach((val) => {
				counts[val] = (counts[val] || 0) - 1;
			});
			const maxDiffCount = editable.value ? 1 : 0;
			return Object.values(counts).reduce((prev, next) => prev + Math.abs(next), 0) <= maxDiffCount ? cacheValues.value : rawValues.value;
		}),
		onStartMove
	];
}
var useDrag_default = useDrag;
export { useDrag_default as default };
