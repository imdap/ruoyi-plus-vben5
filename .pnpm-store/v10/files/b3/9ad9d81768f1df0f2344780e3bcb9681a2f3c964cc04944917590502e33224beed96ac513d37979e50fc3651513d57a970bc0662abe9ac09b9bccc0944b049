import { onMounted, onUnmounted, ref } from "vue";
//#region src/hooks/useTouchMove.ts
var MIN_SWIPE_DISTANCE = .1;
var STOP_SWIPE_DISTANCE = .01;
var REFRESH_INTERVAL = 20;
var SPEED_OFF_MULTIPLE = .995 ** REFRESH_INTERVAL;
function useTouchMove(elRef, onOffset) {
	const touchPosition = ref(null);
	const lastTimestamp = ref(0);
	const lastTimeDiff = ref(0);
	const lastOffset = ref(null);
	const motionRef = ref();
	const lastWheelDirectionRef = ref();
	function onTouchStart(e) {
		const { screenX, screenY } = e.touches[0];
		touchPosition.value = {
			x: screenX,
			y: screenY
		};
		if (motionRef.value != null) window.clearInterval(motionRef.value);
	}
	function onTouchMove(e) {
		if (!touchPosition.value) return;
		const { screenX, screenY } = e.touches[0];
		const prev = touchPosition.value;
		touchPosition.value = {
			x: screenX,
			y: screenY
		};
		const offsetX = screenX - prev.x;
		const offsetY = screenY - prev.y;
		onOffset(offsetX, offsetY);
		const now = Date.now();
		lastTimeDiff.value = now - lastTimestamp.value;
		lastTimestamp.value = now;
		lastOffset.value = {
			x: offsetX,
			y: offsetY
		};
	}
	function onTouchEnd() {
		if (!touchPosition.value) return;
		touchPosition.value = null;
		const lo = lastOffset.value;
		lastOffset.value = null;
		if (lo) {
			const distanceX = lo.x / (lastTimeDiff.value || 1);
			const distanceY = lo.y / (lastTimeDiff.value || 1);
			if (Math.max(Math.abs(distanceX), Math.abs(distanceY)) < MIN_SWIPE_DISTANCE) return;
			let currentX = distanceX;
			let currentY = distanceY;
			motionRef.value = window.setInterval(() => {
				if (Math.abs(currentX) < STOP_SWIPE_DISTANCE && Math.abs(currentY) < STOP_SWIPE_DISTANCE) {
					if (motionRef.value != null) window.clearInterval(motionRef.value);
					return;
				}
				currentX *= SPEED_OFF_MULTIPLE;
				currentY *= SPEED_OFF_MULTIPLE;
				onOffset(currentX * REFRESH_INTERVAL, currentY * REFRESH_INTERVAL);
			}, REFRESH_INTERVAL);
		}
	}
	function onWheel(e) {
		const { deltaX, deltaY } = e;
		let mixed = 0;
		const absX = Math.abs(deltaX);
		const absY = Math.abs(deltaY);
		if (absX === absY) mixed = lastWheelDirectionRef.value === "x" ? deltaX : deltaY;
		else if (absX > absY) {
			mixed = deltaX;
			lastWheelDirectionRef.value = "x";
		} else {
			mixed = deltaY;
			lastWheelDirectionRef.value = "y";
		}
		if (onOffset(-mixed, -mixed)) e.preventDefault();
	}
	const touchEventsRef = ref();
	touchEventsRef.value = {
		onTouchStart,
		onTouchMove,
		onTouchEnd,
		onWheel
	};
	onMounted(() => {
		function onProxyTouchStart(e) {
			touchEventsRef.value?.onTouchStart(e);
		}
		function onProxyTouchMove(e) {
			touchEventsRef.value?.onTouchMove(e);
		}
		function onProxyTouchEnd(e) {
			touchEventsRef.value?.onTouchEnd(e);
		}
		function onProxyWheel(e) {
			touchEventsRef.value?.onWheel(e);
		}
		document.addEventListener("touchmove", onProxyTouchMove, { passive: false });
		document.addEventListener("touchend", onProxyTouchEnd, { passive: true });
		const el = elRef.value;
		if (el) {
			el.addEventListener("touchstart", onProxyTouchStart, { passive: true });
			el.addEventListener("wheel", onProxyWheel, { passive: false });
		}
		onUnmounted(() => {
			document.removeEventListener("touchmove", onProxyTouchMove);
			document.removeEventListener("touchend", onProxyTouchEnd);
			if (el) {
				el.removeEventListener("touchstart", onProxyTouchStart);
				el.removeEventListener("wheel", onProxyWheel);
			}
			if (motionRef.value != null) window.clearInterval(motionRef.value);
		});
	});
}
//#endregion
export { useTouchMove as default };
