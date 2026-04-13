import { computed } from "vue";
function useSearchConfig(showSearch, props, mode) {
	const { filterOption, searchValue, optionFilterProp, filterSort, onSearch, autoClearSearchValue } = props;
	return [computed(() => {
		return typeof showSearch.value === "object" || mode.value === "combobox" || mode.value === "tags" || mode.value === "multiple" && showSearch.value === void 0 ? true : showSearch.value;
	}), computed(() => {
		const isObject = typeof showSearch.value === "object";
		const config = {
			filterOption: filterOption?.value,
			searchValue: searchValue?.value,
			optionFilterProp: optionFilterProp?.value,
			filterSort: filterSort?.value,
			onSearch: onSearch?.value,
			autoClearSearchValue: autoClearSearchValue?.value,
			...isObject ? showSearch.value : {}
		};
		if (config.autoClearSearchValue === void 0) config.autoClearSearchValue = true;
		return config;
	})];
}
export { useSearchConfig as default };
