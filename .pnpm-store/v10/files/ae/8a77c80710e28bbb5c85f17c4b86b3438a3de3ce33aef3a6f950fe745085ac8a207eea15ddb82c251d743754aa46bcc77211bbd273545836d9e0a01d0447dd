import { pickProps } from "../../../utils/miscUtil.js";
import { computed } from "vue";
var propNames = ["onMouseEnter", "onMouseLeave"];
function useRootProps(props) {
	return computed(() => {
		return pickProps(props, propNames);
	});
}
export { useRootProps as default };
