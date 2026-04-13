import { isBodyOverflowing } from "./util.js";
import { computed, shallowRef, unref, watch } from "vue";
import { removeCSS, updateCSS } from "@v-c/util/dist/Dom/dynamicCSS";
import { getTargetScrollBarSize } from "@v-c/util/dist/getScrollBarSize";
var UNIQUE_ID = `vc-util-locker-${Date.now()}`;
var uuid = 0;
function useScrollLocker(lock) {
	const mergedLock = computed(() => unref(lock));
	uuid += 1;
	const id = shallowRef(`${UNIQUE_ID}_${uuid}`);
	watch([id, mergedLock], async (_, _o, onCleanup) => {
		if (mergedLock.value) {
			const scrollbarSize = getTargetScrollBarSize(document.body).width;
			updateCSS(`
html body {
  overflow-y: hidden;
  ${isBodyOverflowing() ? `width: calc(100% - ${scrollbarSize}px);` : ""}
}`, id.value);
			onCleanup(() => {
				removeCSS(id.value);
			});
		} else removeCSS(id.value);
	}, {
		flush: "post",
		immediate: true
	});
}
export { useScrollLocker as default };
