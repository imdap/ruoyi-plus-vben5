import { computed } from "vue";
function useShowNow(picker, mode, showNow, showToday, rangePicker) {
	return computed(() => {
		if (mode.value !== "date" && mode.value !== "time") return false;
		if (showNow.value !== void 0) return showNow.value;
		if (showToday.value !== void 0) return showToday.value;
		return !rangePicker?.value && (picker.value === "date" || picker.value === "time");
	});
}
export { useShowNow as default };
