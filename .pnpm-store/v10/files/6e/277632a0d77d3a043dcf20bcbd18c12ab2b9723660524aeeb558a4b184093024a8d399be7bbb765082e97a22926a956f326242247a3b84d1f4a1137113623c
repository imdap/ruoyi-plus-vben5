import { useMergedMask } from "../../_util/hooks/useMergedMask.js";
import { useZIndex } from "../../_util/hooks/useZIndex.js";
import { computed } from "vue";
import { clsx } from "@v-c/util";
import { getTransitionName } from "@v-c/util/dist/utils/transition";

//#region src/image/hooks/useMergedPreviewConfig.ts
function useMergedPreviewConfig(previewConfig, contextPreviewConfig, prefixCls, mergedRootClassName, getContextPopupContainer, icons, defaultCover) {
	const [zIndex] = useZIndex("ImagePreview", computed(() => previewConfig.value?.zIndex));
	const [mergedPreviewMask, blurClassName] = useMergedMask(computed(() => previewConfig.value?.mask), computed(() => contextPreviewConfig.value?.mask), computed(() => `${prefixCls.value}-preview`));
	return computed(() => {
		if (!previewConfig.value) return previewConfig.value;
		const { cover, getContainer, closeIcon, rootClassName: previewRootClassName } = previewConfig.value;
		const { closeIcon: contextCloseIcon } = contextPreviewConfig.value ?? {};
		return {
			motionName: getTransitionName(`${prefixCls.value}-preview`, "fade"),
			...previewConfig.value,
			...defaultCover?.value ? { cover: cover ?? defaultCover.value } : {},
			icons: icons.value,
			getContainer: getContainer ?? getContextPopupContainer,
			zIndex: zIndex.value,
			closeIcon: closeIcon ?? contextCloseIcon,
			rootClassName: clsx(mergedRootClassName.value, previewRootClassName),
			mask: mergedPreviewMask.value,
			blurClassName: blurClassName.value?.mask
		};
	});
}
var useMergedPreviewConfig_default = useMergedPreviewConfig;

//#endregion
export { useMergedPreviewConfig_default as default };