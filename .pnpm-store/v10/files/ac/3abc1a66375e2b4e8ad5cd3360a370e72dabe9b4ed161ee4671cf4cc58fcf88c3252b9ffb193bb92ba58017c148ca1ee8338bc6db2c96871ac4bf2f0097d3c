import { useSizeContext } from "../SizeContext.js";
import { computed } from "vue";

//#region src/config-provider/hooks/useSize.ts
function useSize(customSize) {
	const size = useSizeContext();
	return computed(() => {
		if (!customSize) return size.value;
		if (typeof customSize === "object") return customSize.value ?? size.value;
		if (typeof customSize === "function") return customSize(size.value);
		return size.value;
	});
}

//#endregion
export { useSize };