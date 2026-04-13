import { useLocaleContext } from "./index.js";
import en_US_default from "./en_US.js";
import { computed, ref } from "vue";

//#region src/locale/useLocale.ts
function useLocale(componentName, defaultLocale) {
	const { locale: fullLocale } = useLocaleContext() ?? { locale: ref(en_US_default) };
	return [computed(() => {
		const locale = defaultLocale || en_US_default[componentName];
		const localeFromContext = fullLocale.value?.[componentName] ?? {};
		return {
			...typeof locale === "function" ? locale() : locale,
			...localeFromContext || {}
		};
	}), computed(() => {
		const localeCode = fullLocale.value?.locale;
		if (fullLocale.value?.exist && !localeCode) return en_US_default.locale;
		return localeCode;
	})];
}
var useLocale_default = useLocale;

//#endregion
export { useLocale_default as default };