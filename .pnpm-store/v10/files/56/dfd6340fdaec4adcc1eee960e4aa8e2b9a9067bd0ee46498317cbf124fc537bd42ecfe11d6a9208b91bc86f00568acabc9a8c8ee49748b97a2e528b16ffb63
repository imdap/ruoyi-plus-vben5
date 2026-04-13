import { isSame } from "../utils/dateUtil.js";
function useToggleDates(generateConfig, locale, panelMode) {
	function toggleDates(list, target) {
		const index = list.findIndex((date) => isSame(generateConfig.value, locale.value, date, target, panelMode.value));
		if (index === -1) return [...list, target];
		const sliceList = [...list];
		sliceList.splice(index, 1);
		return sliceList;
	}
	return toggleDates;
}
export { useToggleDates as default };
