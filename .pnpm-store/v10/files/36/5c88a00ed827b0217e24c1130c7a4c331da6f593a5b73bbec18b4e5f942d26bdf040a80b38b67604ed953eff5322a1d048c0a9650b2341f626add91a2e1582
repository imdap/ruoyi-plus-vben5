import input_default from "../../../input/index.js";
import { createVNode } from "vue";
import { SearchOutlined } from "@antdv-next/icons";

//#region src/table/hooks/useFilter/FilterSearch.tsx
function FilterSearch(props) {
	const { value, filterSearch, tablePrefixCls, locale, onChange } = props;
	if (!filterSearch) return null;
	return createVNode("div", { "class": `${tablePrefixCls}-filter-dropdown-search` }, [createVNode(input_default, {
		"prefix": createVNode(SearchOutlined, null, null),
		"placeholder": locale.filterSearchPlaceholder,
		"onChange": onChange,
		"value": value,
		"htmlSize": 1,
		"class": `${tablePrefixCls}-filter-dropdown-search-input`
	}, null)]);
}
var FilterSearch_default = FilterSearch;

//#endregion
export { FilterSearch_default as default };