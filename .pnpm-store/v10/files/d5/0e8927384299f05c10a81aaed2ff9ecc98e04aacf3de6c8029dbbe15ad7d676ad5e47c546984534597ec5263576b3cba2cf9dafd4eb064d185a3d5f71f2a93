import { getFromDate } from "../../utils/miscUtil.js";
import { isSame } from "../../utils/dateUtil.js";
function useRangeDisabledDate(values, disabled, activeIndexList, generateConfig, locale, disabledDate) {
	const rangeDisabledDate = (date, info) => {
		const activeIndex = activeIndexList.value[activeIndexList.value.length - 1];
		const [start, end] = values.value;
		const mergedInfo = {
			...info,
			from: getFromDate(values.value, activeIndexList.value)
		};
		if (activeIndex === 1 && disabled.value[0] && start && !isSame(generateConfig.value, locale.value, start, date, mergedInfo.type) && generateConfig.value.isAfter(start, date)) return true;
		if (activeIndex === 0 && disabled.value[1] && end && !isSame(generateConfig.value, locale.value, end, date, mergedInfo.type) && generateConfig.value.isAfter(date, end)) return true;
		return disabledDate.value?.(date, mergedInfo) || false;
	};
	return rangeDisabledDate;
}
export { useRangeDisabledDate as default };
