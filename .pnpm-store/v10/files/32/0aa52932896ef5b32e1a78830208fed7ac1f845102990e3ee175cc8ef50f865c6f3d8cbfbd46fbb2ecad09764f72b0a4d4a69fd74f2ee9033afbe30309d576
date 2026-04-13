import { defaultConfig } from "../../theme/context.js";
import useThemeKey_default from "./useThemeKey.js";
import { computed } from "vue";

//#region src/config-provider/hooks/useTheme.ts
function useTheme(theme, parentTheme, config) {
	const themeConfig = computed(() => theme?.value ?? {});
	const parentThemeConfig = computed(() => {
		if (themeConfig.value.inherit === false || !parentTheme?.value) return {
			...defaultConfig,
			hashed: parentTheme?.value?.hashed ?? defaultConfig.hashed,
			cssVar: parentTheme?.value?.cssVar
		};
		return parentTheme.value;
	});
	const themeKey = useThemeKey_default();
	return computed(() => {
		if (!theme || !theme.value) return parentTheme?.value;
		const mergedComponents = { ...parentThemeConfig.value?.components };
		const themeComponents = theme?.value?.components ?? {};
		Object.keys(themeComponents).forEach((componentName) => {
			mergedComponents[componentName] = {
				...mergedComponents[componentName],
				...(theme?.value?.components)[componentName]
			};
		});
		const cssVarKey = `css-var-${themeKey.replace(/:/g, "")}`;
		const mergedCssVar = {
			prefix: config?.value?.prefixCls,
			...typeof parentThemeConfig.value.cssVar === "object" && parentThemeConfig.value.cssVar,
			...typeof themeConfig.value.cssVar === "object" && themeConfig.value.cssVar,
			key: typeof themeConfig.value.cssVar === "object" && themeConfig.value.cssVar?.key || cssVarKey
		};
		return {
			...parentThemeConfig.value,
			...themeConfig.value,
			token: {
				...parentThemeConfig.value.token,
				...themeConfig.value.token
			},
			components: mergedComponents,
			cssVar: mergedCssVar
		};
	});
}

//#endregion
export { useTheme };