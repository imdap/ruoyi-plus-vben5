import { getRowFormat, toArray } from "../../utils/miscUtil.js";
import { computed } from "vue";
function useFieldFormat(picker, locale, format) {
	const info = computed(() => {
		const formatList = toArray(getRowFormat(picker.value, locale.value, format?.value));
		const firstFormat = formatList[0];
		const maskFormat = typeof firstFormat === "object" && firstFormat.type === "mask" ? firstFormat.format : void 0;
		return {
			formatList: formatList.map((config) => typeof config === "string" || typeof config === "function" ? config : config.format),
			maskFormat
		};
	});
	return [computed(() => info.value.formatList), computed(() => info.value.maskFormat)];
}
export { useFieldFormat };
