import { computed, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
//#region src/hooks/useDrag.ts
function useDrag(options) {
	const { prefixCls, direction, className, style, maxSize, containerRef, currentSize, onResize, onResizeEnd, onResizeStart } = options;
	const isDragging = shallowRef(false);
	const startPos = shallowRef(0);
	const startSize = shallowRef(0);
	const isHorizontal = computed(() => direction.value === "left" || direction.value === "right");
	const handleMouseDown = (e) => {
		e.preventDefault();
		e.stopPropagation();
		isDragging.value = true;
		if (isHorizontal.value) startPos.value = e?.clientX;
		else startPos.value = e?.clientY;
		let _startSize;
		if (typeof currentSize.value === "number") _startSize = currentSize.value;
		else if (containerRef.value) {
			const rect = containerRef.value?.getBoundingClientRect?.();
			_startSize = isHorizontal.value ? rect?.width : rect?.height;
		}
		startSize.value = _startSize;
		onResizeStart?.(_startSize);
	};
	const handleMouseMove = (e) => {
		if (!isDragging.value) return;
		let delta = (isHorizontal.value ? e.clientX : e.clientY) - startPos.value;
		if (direction.value === "right" || direction.value === "bottom") delta = -delta;
		let newSize = startSize.value + delta;
		if (newSize < 0) newSize = 0;
		if (maxSize.value && newSize > maxSize.value) newSize = maxSize.value;
		onResize?.(newSize);
	};
	const handleMouseUp = () => {
		if (isDragging.value) {
			isDragging.value = false;
			if (containerRef.value) {
				const rect = containerRef.value?.getBoundingClientRect?.();
				const finalSize = isHorizontal.value ? rect?.width : rect?.height;
				onResizeEnd?.(finalSize);
			}
		}
	};
	watch([isDragging], (_n, _o, onCleanup) => {
		if (isDragging.value) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
			onCleanup(() => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
			});
		}
	}, { flush: "post" });
	const dragElementClassName = computed(() => clsx(`${prefixCls.value}-dragger`, `${prefixCls.value}-dragger-${direction.value}`, {
		[`${prefixCls.value}-dragger-dragging`]: isDragging.value,
		[`${prefixCls.value}-dragger-horizontal`]: isHorizontal.value,
		[`${prefixCls.value}-dragger-vertical`]: !isHorizontal.value
	}, className.value));
	return {
		dragElementProps: computed(() => {
			return {
				class: dragElementClassName.value,
				style: style.value,
				onMousedown: handleMouseDown
			};
		}),
		isDragging
	};
}
//#endregion
export { useDrag as default };
