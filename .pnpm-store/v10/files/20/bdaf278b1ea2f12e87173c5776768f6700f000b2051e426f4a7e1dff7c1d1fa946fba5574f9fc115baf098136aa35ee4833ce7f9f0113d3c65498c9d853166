import { toArray } from "./valueUtil.js";
import warning from "@v-c/util/dist/warning";
function warningProps(props) {
	const { searchPlaceholder, treeCheckStrictly, treeCheckable, labelInValue, value, multiple, showCheckedStrategy, maxCount } = props;
	warning(!searchPlaceholder, "`searchPlaceholder` has been removed.");
	if (treeCheckStrictly && labelInValue === false) warning(false, "`treeCheckStrictly` will force set `labelInValue` to `true`.");
	if (labelInValue || treeCheckStrictly) warning(toArray(value).every((val) => val && typeof val === "object" && "value" in val), "Invalid prop `value` supplied to `TreeSelect`. You should use { label: string, value: string | number } or [{ label: string, value: string | number }] instead.");
	if (treeCheckStrictly || multiple || treeCheckable) warning(!value || Array.isArray(value), "`value` should be an array when `TreeSelect` is checkable or multiple.");
	else warning(!Array.isArray(value), "`value` should not be array when `TreeSelect` is single mode.");
	if (maxCount && (showCheckedStrategy === "SHOW_ALL" && !treeCheckStrictly || showCheckedStrategy === "SHOW_PARENT")) warning(false, "`maxCount` not work with `showCheckedStrategy=SHOW_ALL` (when `treeCheckStrictly=false`) or `showCheckedStrategy=SHOW_PARENT`.");
}
export { warningProps as default };
