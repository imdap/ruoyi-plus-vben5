import { ref } from "vue";
function useState(defaultStateValue) {
	const innerValue = ref(typeof defaultStateValue === "function" ? defaultStateValue() : defaultStateValue);
	function triggerChange(newValue) {
		innerValue.value = newValue;
	}
	return [innerValue, triggerChange];
}
export { useState as default };
