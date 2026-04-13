import { computed } from "vue";
function useSearchConfig(showSearch, props) {
	return [computed(() => {
		return typeof showSearch.value === "object" ? true : showSearch.value;
	}), computed(() => {
		const { searchValue, inputValue, onSearch, autoClearSearchValue, filterTreeNode, treeNodeFilterProp } = props.value;
		const isObject = typeof showSearch.value === "object";
		return {
			searchValue: searchValue ?? inputValue,
			onSearch,
			autoClearSearchValue,
			filterTreeNode,
			treeNodeFilterProp,
			...isObject ? showSearch.value : {}
		};
	})];
}
export { useSearchConfig as default };
