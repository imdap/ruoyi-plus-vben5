import { devUseWarning, isDev } from "../_util/warning.js";
import { getSlotPropsFnRun } from "../_util/tools.js";
import { Fragment, createVNode } from "vue";
import { CheckOutlined, CloseCircleFilled, CloseOutlined, DownOutlined, LoadingOutlined, SearchOutlined } from "@antdv-next/icons";

//#region src/select/useIcons.tsx
function useIcons({ suffixIcon, clearIcon, menuItemSelectedIcon, removeIcon, loading, loadingIcon, multiple, hasFeedback, showSuffixIcon, feedbackIcon, showArrow, componentName }) {
	if (isDev) devUseWarning(componentName).deprecated(!clearIcon, "clearIcon", "allowClear={{ clearIcon: VueNode }}");
	const mergedClearIcon = clearIcon ?? createVNode(CloseCircleFilled, null, null);
	const getSuffixIconNode = (arrowIcon) => {
		if (suffixIcon === null && !hasFeedback && !showArrow) return null;
		arrowIcon = getSlotPropsFnRun({}, { arrowIcon }, "arrowIcon");
		return createVNode(Fragment, null, [showSuffixIcon !== false && arrowIcon, hasFeedback && feedbackIcon]);
	};
	let mergedSuffixIcon = null;
	if (suffixIcon !== void 0) mergedSuffixIcon = getSuffixIconNode(suffixIcon);
	else if (loading) mergedSuffixIcon = getSuffixIconNode(loadingIcon ?? createVNode(LoadingOutlined, { "spin": true }, null));
	else mergedSuffixIcon = ({ open, showSearch }) => {
		if (open && showSearch) return getSuffixIconNode(createVNode(SearchOutlined, null, null));
		return getSuffixIconNode(createVNode(DownOutlined, null, null));
	};
	let mergedItemIcon = null;
	if (menuItemSelectedIcon !== void 0) mergedItemIcon = menuItemSelectedIcon;
	else if (multiple) mergedItemIcon = createVNode(CheckOutlined, null, null);
	else mergedItemIcon = null;
	let mergedRemoveIcon = null;
	if (removeIcon !== void 0) mergedRemoveIcon = removeIcon;
	else mergedRemoveIcon = createVNode(CloseOutlined, null, null);
	return {
		clearIcon: mergedClearIcon,
		suffixIcon: mergedSuffixIcon,
		itemIcon: mergedItemIcon,
		removeIcon: mergedRemoveIcon
	};
}

//#endregion
export { useIcons as default };