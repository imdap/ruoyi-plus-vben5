import { shallowRef, watch } from "vue";
import { warning } from "@v-c/util";
var MAX_TIMES = 10;
function useScrollTo(containerRef, data, heights, itemHeight, getKey, collectHeight, syncScrollTop, triggerFlash) {
	const syncState = shallowRef(null);
	const getTotalHeight = () => {
		let totalHeight = 0;
		for (let i = 0; i < data.value.length; i += 1) {
			const key = getKey(data.value[i]);
			const cacheHeight = heights.get(key);
			totalHeight += cacheHeight === void 0 ? itemHeight.value : cacheHeight;
		}
		return totalHeight;
	};
	watch(syncState, () => {
		if (syncState.value && syncState.value.times < MAX_TIMES) {
			if (!containerRef.value) {
				syncState.value = { ...syncState.value };
				return;
			}
			collectHeight();
			const { targetAlign, originAlign, index, offset } = syncState.value;
			const height = containerRef.value.clientHeight;
			let needCollectHeight = false;
			let newTargetAlign = targetAlign ?? null;
			let targetTop = null;
			if (height) {
				const mergedAlign = targetAlign || originAlign;
				let stackTop = 0;
				let itemTop = 0;
				let itemBottom = 0;
				const maxLen = Math.min(data.value.length - 1, index);
				for (let i = 0; i <= maxLen; i += 1) {
					const key = getKey(data.value[i]);
					itemTop = stackTop;
					const cacheHeight = heights.get(key);
					itemBottom = itemTop + (cacheHeight === void 0 ? itemHeight.value : cacheHeight);
					stackTop = itemBottom;
				}
				let leftHeight = mergedAlign === "top" ? offset : height - offset;
				for (let i = maxLen; i >= 0; i -= 1) {
					const key = getKey(data.value[i]);
					const cacheHeight = heights.get(key);
					if (cacheHeight === void 0) {
						needCollectHeight = true;
						break;
					}
					leftHeight -= cacheHeight;
					if (leftHeight <= 0) break;
				}
				switch (mergedAlign) {
					case "top":
						targetTop = itemTop - offset;
						break;
					case "bottom":
						targetTop = itemBottom - height + offset;
						break;
					default: {
						const { scrollTop } = containerRef.value;
						const scrollBottom = scrollTop + height;
						if (itemTop < scrollTop) newTargetAlign = "top";
						else if (itemBottom > scrollBottom) newTargetAlign = "bottom";
					}
				}
				if (targetTop !== null) syncScrollTop(targetTop);
				if (targetTop !== syncState.value.lastTop) needCollectHeight = true;
			}
			if (needCollectHeight) syncState.value = {
				...syncState.value,
				times: syncState.value.times + 1,
				targetAlign: newTargetAlign,
				lastTop: targetTop
			};
		} else if (process.env.NODE_ENV !== "production" && syncState.value?.times === MAX_TIMES) warning(false, "Seems `scrollTo` with `rc-virtual-list` reach the max limitation. Please fire issue for us. Thanks.");
	}, {
		immediate: true,
		flush: "post"
	});
	const scrollTo = (arg) => {
		if (arg === null || arg === void 0) {
			triggerFlash();
			return;
		}
		if (typeof arg === "number") syncScrollTop(arg);
		else if (arg && typeof arg === "object") {
			let index;
			const { align } = arg;
			if ("index" in arg) ({index} = arg);
			else index = data.value.findIndex((item) => getKey(item) === arg.key);
			const { offset = 0 } = arg;
			syncState.value = {
				times: 0,
				index,
				offset,
				originAlign: align
			};
		}
	};
	return [scrollTo, getTotalHeight];
}
export { useScrollTo as default };
