import { computed } from "vue";

//#region src/splitter/hooks/useResizable.ts
function getShowCollapsibleIcon(prev, next) {
	if (prev.collapsible && next.collapsible) {
		if (prev.showCollapsibleIcon === true || next.showCollapsibleIcon === true) return true;
		if (prev.showCollapsibleIcon === "auto" || next.showCollapsibleIcon === "auto") return "auto";
		return false;
	}
	if (prev.collapsible) return prev.showCollapsibleIcon;
	if (next.collapsible) return next.showCollapsibleIcon;
	return false;
}
function useResizable(items, pxSizes, reverse) {
	return computed(() => {
		const resizeInfos = [];
		const itemsLen = items.value.length;
		for (let i = 0; i < itemsLen - 1; i += 1) {
			const prevItem = items.value[i];
			const nextItem = items.value[i + 1];
			const prevSize = pxSizes.value[i];
			const nextSize = pxSizes.value[i + 1];
			const { resizable: prevResizable = true, min: prevMin, collapsible: prevCollapsible } = prevItem;
			const { resizable: nextResizable = true, min: nextMin, collapsible: nextCollapsible } = nextItem;
			const mergedResizable = prevResizable && nextResizable && (prevSize !== 0 || !prevMin) && (nextSize !== 0 || !nextMin);
			const prevEndCollapsible = !!prevCollapsible.end && prevSize > 0;
			const nextStartExpandable = !!nextCollapsible.start && nextSize === 0 && prevSize > 0;
			const startCollapsible = prevEndCollapsible || nextStartExpandable;
			const nextStartCollapsible = !!nextCollapsible.start && nextSize > 0;
			const prevEndExpandable = !!prevCollapsible.end && prevSize === 0 && nextSize > 0;
			const endCollapsible = nextStartCollapsible || prevEndExpandable;
			const showStartCollapsibleIcon = getShowCollapsibleIcon({
				collapsible: prevEndCollapsible,
				showCollapsibleIcon: prevCollapsible.showCollapsibleIcon
			}, {
				collapsible: nextStartExpandable,
				showCollapsibleIcon: nextCollapsible.showCollapsibleIcon
			});
			const showEndCollapsibleIcon = getShowCollapsibleIcon({
				collapsible: nextStartCollapsible,
				showCollapsibleIcon: nextCollapsible.showCollapsibleIcon
			}, {
				collapsible: prevEndExpandable,
				showCollapsibleIcon: prevCollapsible.showCollapsibleIcon
			});
			resizeInfos[i] = {
				resizable: mergedResizable,
				startCollapsible: !!(reverse.value ? endCollapsible : startCollapsible),
				endCollapsible: !!(reverse.value ? startCollapsible : endCollapsible),
				showStartCollapsibleIcon: reverse.value ? showEndCollapsibleIcon : showStartCollapsibleIcon,
				showEndCollapsibleIcon: reverse.value ? showStartCollapsibleIcon : showEndCollapsibleIcon
			};
		}
		return resizeInfos;
	});
}

//#endregion
export { useResizable as default };