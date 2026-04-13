import { computed, unref } from "vue";

//#region src/_util/hooks/useMergedMask.ts
function normalizeMaskConfig(mask, maskClosable) {
	let maskConfig = {};
	if (mask && typeof mask === "object") maskConfig = mask;
	if (typeof mask === "boolean") maskConfig = { enabled: mask };
	if (maskConfig.closable === void 0 && maskClosable !== void 0) maskConfig.closable = maskClosable;
	return maskConfig;
}
function useMergedMask(mask, contextMask, prefixCls, maskClosable) {
	const context = computed(() => {
		const maskConfig = normalizeMaskConfig(mask.value, unref(maskClosable));
		const contextMaskConfig = normalizeMaskConfig(contextMask.value);
		const mergedConfig = {
			blur: false,
			...contextMaskConfig,
			...maskConfig,
			closable: maskConfig.closable ?? unref(maskClosable) ?? contextMaskConfig.closable ?? true
		};
		const className = mergedConfig.blur ? `${prefixCls.value}-mask-blur` : void 0;
		return {
			enabled: mergedConfig.enabled !== false,
			classNames: { mask: className },
			closable: !!mergedConfig.closable
		};
	});
	return [
		computed(() => context.value.enabled),
		computed(() => context.value.classNames),
		computed(() => context.value.closable)
	];
}

//#endregion
export { normalizeMaskConfig, useMergedMask };