import { isSame } from "../../utils/dateUtil.js";
function useDisabledBoundary(generateConfig, locale, disabledDate, minDate, maxDate) {
	const mergedDisabledDate = (date, info) => {
		if (disabledDate.value && disabledDate.value(date, info)) return true;
		if (minDate.value && generateConfig.value.isAfter(minDate.value, date) && !isSame(generateConfig.value, locale.value, minDate.value, date, info.type)) return true;
		if (maxDate.value && generateConfig.value.isAfter(date, maxDate.value) && !isSame(generateConfig.value, locale.value, maxDate.value, date, info.type)) return true;
		return false;
	};
	return mergedDisabledDate;
}
export { useDisabledBoundary as default };
