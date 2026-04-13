import { shallowRef } from "vue";
import raf from "@v-c/util/dist/raf";

//#region src/checkbox/useBubbleLock.ts
/**
* When click on the label,
* the event will be stopped to prevent the label from being clicked twice.
* label click -> input click -> label click again
*/
function useBubbleLock(onOriginInputClick) {
	const labelClickLockRef = shallowRef(null);
	const clearLock = () => {
		raf.cancel(labelClickLockRef.value);
		labelClickLockRef.value = null;
	};
	const onLabelClick = () => {
		clearLock();
		labelClickLockRef.value = raf(() => {
			labelClickLockRef.value = null;
		});
	};
	const onInputClick = (e) => {
		if (labelClickLockRef.value) {
			e.stopPropagation();
			clearLock();
		}
		onOriginInputClick?.(e);
	};
	return [onLabelClick, onInputClick];
}

//#endregion
export { useBubbleLock as default };