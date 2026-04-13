import { computed, createVNode } from "vue";
import { warning } from "@v-c/util";
function fillClearIcon(prefixCls, allowClear, clearIcon) {
	if (process.env.NODE_ENV !== "production" && clearIcon) warning(false, "`clearIcon` will be removed in future. Please use `allowClear` instead.");
	if (allowClear === false) return null;
	return (allowClear && typeof allowClear === "object" ? allowClear : {}).clearIcon || clearIcon || createVNode("span", { "class": `${prefixCls}-clear-btn` }, null);
}
function useClearIcon(prefixCls, allowClear, clearIcon) {
	return computed(() => fillClearIcon(prefixCls.value, allowClear?.value, clearIcon?.value));
}
export { useClearIcon as default, fillClearIcon };
