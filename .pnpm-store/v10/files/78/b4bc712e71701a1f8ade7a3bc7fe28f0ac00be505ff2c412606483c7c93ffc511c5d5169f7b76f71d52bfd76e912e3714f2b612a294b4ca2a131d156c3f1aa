import { computed, unref } from "vue";

//#region src/typography/hooks/useMergedConfig.ts
function useMergedConfig(propConfig, templateConfig) {
	const support = computed(() => !!unref(propConfig));
	return [support, computed(() => {
		const current = unref(propConfig);
		return {
			...templateConfig,
			...support.value && typeof current === "object" ? current : null
		};
	})];
}

//#endregion
export { useMergedConfig as default };