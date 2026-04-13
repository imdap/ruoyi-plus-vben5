import { generateColor } from "../util.js";
import { computed } from "vue";
import useMergedState from "@v-c/util/dist/hooks/useMergedState";
function useColorState(defaultValue, value) {
	const [mergedValue, setValue] = useMergedState(defaultValue, {
		value,
		defaultValue
	});
	return [computed(() => generateColor(mergedValue.value)), setValue];
}
var useColorState_default = useColorState;
export { useColorState_default as default };
