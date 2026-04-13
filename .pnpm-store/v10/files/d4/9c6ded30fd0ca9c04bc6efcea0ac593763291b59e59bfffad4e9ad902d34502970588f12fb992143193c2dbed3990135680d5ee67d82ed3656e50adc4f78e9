import { fillIndex } from "../../utils/miscUtil.js";
import { computed, ref } from "vue";
function useFieldsInvalidate(calendarValue, isInvalidateDate, allowEmpty = ref([])) {
	const fieldsInvalidates = ref([false, false]);
	const onSelectorInvalid = (invalid, index) => {
		fieldsInvalidates.value = fillIndex(fieldsInvalidates.value, index, invalid);
	};
	return [computed(() => {
		return fieldsInvalidates.value.map((invalid, index) => {
			if (invalid) return true;
			const current = calendarValue.value[index];
			if (!current) return false;
			if (!allowEmpty.value?.[index] && !current) return true;
			if (current && isInvalidateDate(current, { activeIndex: index })) return true;
			return false;
		});
	}), onSelectorInvalid];
}
export { useFieldsInvalidate as default };
