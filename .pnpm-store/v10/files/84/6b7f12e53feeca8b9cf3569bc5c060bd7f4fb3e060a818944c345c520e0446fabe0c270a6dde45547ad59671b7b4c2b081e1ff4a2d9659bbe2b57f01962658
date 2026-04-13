import { onUnmounted, watch } from "vue";
function smoothScrollOffset(offset) {
	return Math.floor(offset ** .5);
}
function getPageXY(e, horizontal) {
	return ("touches" in e ? e.touches[0] : e)[horizontal ? "pageX" : "pageY"] - window[horizontal ? "scrollX" : "scrollY"];
}
function useScrollDrag(inVirtual, componentRef, onScrollOffset) {
	let cachedElement = null;
	let cachedDocument = null;
	let mouseDownLock = false;
	let rafId = null;
	let offset = 0;
	const stopScroll = () => {
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
	};
	const continueScroll = () => {
		stopScroll();
		rafId = requestAnimationFrame(() => {
			onScrollOffset(offset);
			continueScroll();
		});
	};
	const clearDragState = () => {
		mouseDownLock = false;
		stopScroll();
	};
	const onMouseDown = (e) => {
		if (e.target.draggable || e.button !== 0) return;
		const event = e;
		if (!event._virtualHandled) {
			event._virtualHandled = true;
			mouseDownLock = true;
		}
	};
	const onMouseMove = (e) => {
		if (mouseDownLock && cachedElement) {
			const mouseY = getPageXY(e, false);
			const { top, bottom } = cachedElement.getBoundingClientRect();
			if (mouseY <= top) {
				offset = -smoothScrollOffset(top - mouseY);
				continueScroll();
			} else if (mouseY >= bottom) {
				offset = smoothScrollOffset(mouseY - bottom);
				continueScroll();
			} else stopScroll();
		}
	};
	const teardown = () => {
		if (cachedElement) {
			cachedElement.removeEventListener("mousedown", onMouseDown);
			cachedElement = null;
		}
		if (cachedDocument) {
			cachedDocument.removeEventListener("mouseup", clearDragState);
			cachedDocument.removeEventListener("mousemove", onMouseMove);
			cachedDocument.removeEventListener("dragend", clearDragState);
			cachedDocument = null;
		}
		clearDragState();
	};
	onUnmounted(teardown);
	watch([inVirtual, componentRef], ([enabled, ele], _prev, onCleanup) => {
		if (enabled && ele) {
			cachedElement = ele;
			cachedDocument = ele.ownerDocument;
			cachedElement.addEventListener("mousedown", onMouseDown);
			cachedDocument.addEventListener("mouseup", clearDragState);
			cachedDocument.addEventListener("mousemove", onMouseMove);
			cachedDocument.addEventListener("dragend", clearDragState);
			onCleanup(() => {
				teardown();
			});
		} else teardown();
	}, { immediate: true });
}
export { useScrollDrag as default, getPageXY };
