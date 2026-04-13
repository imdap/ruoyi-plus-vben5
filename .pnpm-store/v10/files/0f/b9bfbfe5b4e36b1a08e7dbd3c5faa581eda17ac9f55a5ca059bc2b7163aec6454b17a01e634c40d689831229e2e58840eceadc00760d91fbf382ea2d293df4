import { devUseWarning, isDev } from "../../_util/warning.js";
import { getSlotPropsFnRun } from "../../_util/tools.js";
import { computed, isVNode } from "vue";

//#region src/image/hooks/usePreviewConfig.ts
function normalizeMask(mask) {
	mask = getSlotPropsFnRun({}, { mask }, "mask");
	if (isVNode(mask)) return [mask, void 0];
	if (mask === true) return [void 0, { blur: true }];
	if (mask === false) return [void 0, false];
	if (mask && typeof mask === "object") return [void 0, {
		blur: true,
		...mask
	}];
	return [void 0, void 0];
}
function usePreviewConfig(preview) {
	const rawPreviewConfig = computed(() => {
		if (typeof preview.value === "boolean") return preview.value ? {} : null;
		return preview.value && typeof preview.value === "object" ? preview.value : {};
	});
	const splittedPreviewConfig = computed(() => {
		if (!rawPreviewConfig.value) return [
			rawPreviewConfig.value,
			"",
			""
		];
		const { open, onOpenChange, cover, actionsRender, visible, onVisibleChange, rootClassName, maskClassName, mask, forceRender: _forceRender, destroyOnClose: _destroyOnClose, toolbarRender, ...restPreviewConfig } = rawPreviewConfig.value;
		let onInternalOpenChange;
		if (onOpenChange) onInternalOpenChange = onOpenChange;
		else if (onVisibleChange) onInternalOpenChange = (nextOpen, info) => {
			const { current } = info || {};
			if (current !== void 0) onVisibleChange(nextOpen, !nextOpen, current);
			else onVisibleChange(nextOpen, !nextOpen);
		};
		const [coverElement, maskConfig] = normalizeMask(mask);
		return [
			{
				...restPreviewConfig,
				open: open ?? visible,
				onOpenChange: onInternalOpenChange,
				cover: cover ?? coverElement,
				mask: maskConfig,
				actionsRender: actionsRender ?? toolbarRender
			},
			rootClassName,
			maskClassName
		];
	});
	if (isDev) {
		const warning = devUseWarning("Image");
		if (rawPreviewConfig.value) {
			[
				["visible", "open"],
				["onVisibleChange", "onOpenChange"],
				["maskClassName", "classNames.cover"],
				["rootClassName", "classNames.root"],
				["toolbarRender", "actionsRender"]
			].forEach(([deprecatedName, newName]) => {
				warning.deprecated(!(deprecatedName in rawPreviewConfig.value), deprecatedName, newName);
			});
			warning(!isVNode(rawPreviewConfig.value?.mask), "deprecated", "`mask` used as ReactNode is deprecated. Please use `cover` instead.");
			warning(!("forceRender" in rawPreviewConfig.value), "breaking", "`forceRender` is no longer supported.");
			warning(!("destroyOnClose" in rawPreviewConfig.value), "breaking", "`destroyOnClose` is no longer supported.");
		}
	}
	return splittedPreviewConfig;
}

//#endregion
export { usePreviewConfig as default };