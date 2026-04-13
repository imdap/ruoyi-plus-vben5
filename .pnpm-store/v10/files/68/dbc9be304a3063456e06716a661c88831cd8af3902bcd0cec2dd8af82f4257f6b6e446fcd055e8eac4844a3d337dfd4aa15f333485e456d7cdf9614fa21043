import { computed } from "vue";
import { warning } from "@v-c/util";
function useSearchConfig(showSearch, props) {
	const mergedShowSearch = computed(() => {
		if (!showSearch.value) return false;
		return typeof showSearch.value === "object" ? true : !!showSearch.value;
	});
	return [mergedShowSearch, computed(() => {
		if (!mergedShowSearch.value) return {};
		const { autoClearSearchValue, searchValue, onSearch } = props.value;
		let config = {
			matchInputWidth: true,
			limit: 50,
			autoClearSearchValue,
			searchValue,
			onSearch
		};
		if (showSearch.value && typeof showSearch.value === "object") config = {
			...config,
			...showSearch.value
		};
		if (config.limit <= 0) {
			config.limit = false;
			if (process.env.NODE_ENV !== "production") warning(false, "'limit' of showSearch should be positive number or false.");
		}
		return config;
	})];
}
export { useSearchConfig as default };
