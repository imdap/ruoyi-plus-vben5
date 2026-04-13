import { onWatcherCleanup, ref, shallowRef, watch } from "vue";
function getPosition(e) {
	const obj = "touches" in e ? e.touches[0] : e;
	const scrollXOffset = document.documentElement.scrollLeft || document.body.scrollLeft || window.pageXOffset;
	const scrollYOffset = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
	return {
		pageX: obj.pageX - scrollXOffset,
		pageY: obj.pageY - scrollYOffset
	};
}
function useColorDrag(props) {
	const { targetRef, containerRef, direction, onDragChange, onDragChangeComplete, calculate, disabledDrag } = props;
	const offsetValue = ref({
		x: 0,
		y: 0
	});
	const mouseMoveRef = shallowRef(() => {});
	const mouseUpRef = shallowRef(() => {});
	const removeEventListener = () => {
		document.removeEventListener("mousemove", mouseMoveRef.value);
		document.removeEventListener("mouseup", mouseUpRef.value);
		document.removeEventListener("touchmove", mouseMoveRef.value);
		document.removeEventListener("touchend", mouseUpRef.value);
		mouseMoveRef.value = () => {};
		mouseUpRef.value = () => {};
	};
	watch(() => props.color, () => {
		offsetValue.value = calculate();
		onWatcherCleanup(() => removeEventListener());
	}, { immediate: true });
	const updateOffset = (e) => {
		if (!containerRef.value || !targetRef.value) return false;
		const { pageX, pageY } = getPosition(e);
		const { x: rectX, y: rectY, width, height } = containerRef.value.getBoundingClientRect();
		const { width: targetWidth, height: targetHeight } = targetRef.value.transformDomRef.getBoundingClientRect();
		const percentX = (pageX - rectX) / width * 100;
		const percentY = (pageY - rectY) / height * 100;
		const calcOffset = {
			x: Math.max(0, Math.min(percentX, 100)),
			y: direction === "x" ? offsetValue.value.y : Math.max(0, Math.min(percentY, 100))
		};
		if (targetWidth === 0 && targetHeight === 0 || targetWidth !== targetHeight) return false;
		offsetValue.value = calcOffset;
		onDragChange?.(calcOffset);
	};
	const onDragMove = (e) => {
		e.preventDefault();
		updateOffset(e);
	};
	const onDragStop = (e) => {
		e.preventDefault();
		removeEventListener();
		onDragChangeComplete?.();
	};
	const onDragStart = (e) => {
		removeEventListener();
		if (disabledDrag) return;
		updateOffset(e);
		document.addEventListener("mousemove", onDragMove);
		document.addEventListener("mouseup", onDragStop);
		document.addEventListener("touchmove", onDragMove);
		document.addEventListener("touchend", onDragStop);
		mouseMoveRef.value = onDragMove;
		mouseUpRef.value = onDragStop;
	};
	return [offsetValue, onDragStart];
}
var useColorDrag_default = useColorDrag;
export { useColorDrag_default as default };
