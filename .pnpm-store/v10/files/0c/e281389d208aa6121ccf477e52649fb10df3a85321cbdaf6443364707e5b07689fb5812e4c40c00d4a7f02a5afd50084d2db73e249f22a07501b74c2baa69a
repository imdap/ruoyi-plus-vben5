import { Variants, useConfig } from "../../config-provider/context.js";
import { useVariantContext } from "../context.js";
import { computed } from "vue";

//#region src/form/hooks/useVariant.ts
function useVariant(component, variant, legacyBordered) {
	const config = useConfig();
	const formVariant = useVariantContext();
	const mergedVariant = computed(() => {
		if (typeof variant?.value !== "undefined") return variant.value;
		if ((typeof legacyBordered === "object" ? legacyBordered.value : legacyBordered) === false) return "borderless";
		const componentConfigVariant = config.value?.[component]?.variant;
		const globalVariant = config.value?.variant;
		return formVariant.value ?? componentConfigVariant ?? globalVariant ?? "outlined";
	});
	return [mergedVariant, computed(() => Variants.includes(mergedVariant.value))];
}
const useVariants = useVariant;

//#endregion
export { useVariant as default, useVariants };