import { computed } from "vue";
import { warning } from "@v-c/util";
function usePresets(presets, legacyRanges) {
	return computed(() => {
		if (presets.value) return presets.value;
		if (legacyRanges?.value) {
			warning(false, "`ranges` is deprecated. Please use `presets` instead.");
			return Object.entries(legacyRanges.value).map(([label, value]) => ({
				label,
				value
			}));
		}
		return [];
	});
}
export { usePresets as default };
