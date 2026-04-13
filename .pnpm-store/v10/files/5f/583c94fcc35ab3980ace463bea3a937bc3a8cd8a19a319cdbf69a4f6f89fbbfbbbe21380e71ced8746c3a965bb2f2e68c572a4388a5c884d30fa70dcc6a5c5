import useIcons$1 from "../select/useIcons.js";
import { cloneVNode, isVNode } from "vue";

//#region src/date-picker/util.ts
function getPlaceholder(locale, picker, customizePlaceholder) {
	if (customizePlaceholder !== void 0) return customizePlaceholder;
	if (picker === "year" && locale.lang.yearPlaceholder) return locale.lang.yearPlaceholder;
	if (picker === "quarter" && locale.lang.quarterPlaceholder) return locale.lang.quarterPlaceholder;
	if (picker === "month" && locale.lang.monthPlaceholder) return locale.lang.monthPlaceholder;
	if (picker === "week" && locale.lang.weekPlaceholder) return locale.lang.weekPlaceholder;
	if (picker === "time" && locale.timePickerLocale.placeholder) return locale.timePickerLocale.placeholder;
	return locale.lang.placeholder;
}
function getRangePlaceholder(locale, picker, customizePlaceholder) {
	if (customizePlaceholder !== void 0) return customizePlaceholder;
	if (picker === "year" && locale.lang.yearPlaceholder) return locale.lang.rangeYearPlaceholder;
	if (picker === "quarter" && locale.lang.quarterPlaceholder) return locale.lang.rangeQuarterPlaceholder;
	if (picker === "month" && locale.lang.monthPlaceholder) return locale.lang.rangeMonthPlaceholder;
	if (picker === "week" && locale.lang.weekPlaceholder) return locale.lang.rangeWeekPlaceholder;
	if (picker === "time" && locale.timePickerLocale.placeholder) return locale.timePickerLocale.rangePlaceholder;
	return locale.lang.rangePlaceholder;
}
function useIcons(props, prefixCls) {
	const { allowClear = true } = props;
	const { clearIcon, removeIcon } = useIcons$1({
		...props,
		prefixCls,
		componentName: "DatePicker"
	});
	if (allowClear === false) return [false, removeIcon];
	const allowClearConfig = allowClear === true ? {} : allowClear;
	return [{
		clearIcon: isVNode(clearIcon) ? cloneVNode(clearIcon) : clearIcon,
		...allowClearConfig
	}, removeIcon];
}

//#endregion
export { getPlaceholder, getRangePlaceholder, useIcons };