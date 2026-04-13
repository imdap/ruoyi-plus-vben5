import { injectPropsWithOption, toArray } from "../utils/commonUtil.js";
import { computed } from "vue";
function includes(test, search) {
	return toArray(test).join("").toUpperCase().includes(search);
}
function useFilterOptions(options, fieldNames, searchValue, filterOption, optionFilterProp) {
	return computed(() => {
		if (!searchValue.value || filterOption.value === false) return options.value;
		const { options: fieldOptions, label: fieldLabel, value: fieldValue } = fieldNames.value;
		const filteredOptions = [];
		const customizeFilter = typeof filterOption.value === "function";
		const upperSearch = searchValue.value.toUpperCase();
		const defaultFilter = (_, option) => {
			if (optionFilterProp.value && option) return includes(option[optionFilterProp.value], upperSearch);
			if (option && option[fieldOptions]) return includes(option[fieldLabel !== "children" ? fieldLabel : "label"], upperSearch);
			return option ? includes(option[fieldValue], upperSearch) : false;
		};
		const filterFunc = customizeFilter ? filterOption.value : defaultFilter;
		const wrapOption = customizeFilter ? (opt) => injectPropsWithOption(opt) : (opt) => opt;
		options.value.forEach((item) => {
			if (item[fieldOptions]) {
				if (filterFunc(searchValue.value, wrapOption(item))) filteredOptions.push(item);
				else {
					const subOptions = item[fieldOptions].filter((subItem) => filterFunc(searchValue.value, wrapOption(subItem)));
					if (subOptions.length) filteredOptions.push({
						...item,
						[fieldOptions]: subOptions
					});
				}
				return;
			}
			if (filterFunc(searchValue.value, wrapOption(item))) filteredOptions.push(item);
		});
		return filteredOptions;
	});
}
export { useFilterOptions as default };
