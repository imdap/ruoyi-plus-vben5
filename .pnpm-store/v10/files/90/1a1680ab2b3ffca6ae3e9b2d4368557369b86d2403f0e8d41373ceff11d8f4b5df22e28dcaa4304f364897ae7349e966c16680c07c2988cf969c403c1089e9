import { raf } from "../Selector/util.js";
import { watch } from "vue";
function useLockEffect(condition, callback) {
	watch(condition, (val) => {
		if (val) callback(val);
		else raf(() => {
			callback(!!val);
		});
	}, { flush: "post" });
}
export { useLockEffect as default };
