import { computed } from "vue";
const SEARCH_MARK = "__vc_cascader_search_mark__";
var defaultFilter = (search, options, { label = "" }) => options.some((opt) => String(opt[label]).toLowerCase().includes(search.toLowerCase()));
var defaultRender = (_inputValue, path, _prefixCls, fieldNames) => path.map((opt) => opt[fieldNames.label]).join(" / ");
function useSearchOptions(search, options, fieldNames, prefixCls, config, enableHalfPath) {
	return computed(() => {
		const mergedSearch = search.value;
		const mergedOptions = options.value;
		const mergedFieldNames = fieldNames.value;
		const mergedPrefixCls = prefixCls.value;
		const { filter = defaultFilter, render = defaultRender, limit = 50, sort } = config.value;
		const filteredOptions = [];
		if (!mergedSearch) return [];
		function dig(list, pathOptions, parentDisabled = false) {
			list.forEach((option) => {
				if (!sort && limit !== false && limit > 0 && filteredOptions.length >= limit) return;
				const connectedPathOptions = [...pathOptions, option];
				const children = option[mergedFieldNames.children];
				const mergedDisabled = parentDisabled || option.disabled;
				if (!children || children.length === 0 || enableHalfPath?.value) {
					if (filter?.(mergedSearch, connectedPathOptions, { label: mergedFieldNames.label })) filteredOptions.push({
						...option,
						disabled: mergedDisabled,
						[mergedFieldNames.label]: render?.(mergedSearch, connectedPathOptions, mergedPrefixCls, mergedFieldNames),
						[SEARCH_MARK]: connectedPathOptions,
						[mergedFieldNames.children]: void 0
					});
				}
				if (children) dig(option[mergedFieldNames.children], connectedPathOptions, mergedDisabled);
			});
		}
		dig(mergedOptions, []);
		if (sort) filteredOptions.sort((a, b) => {
			return sort(a[SEARCH_MARK], b[SEARCH_MARK], mergedSearch, mergedFieldNames);
		});
		return limit !== false && limit > 0 ? filteredOptions.slice(0, limit) : filteredOptions;
	});
}
var useSearchOptions_default = useSearchOptions;
export { SEARCH_MARK, useSearchOptions_default as default };
