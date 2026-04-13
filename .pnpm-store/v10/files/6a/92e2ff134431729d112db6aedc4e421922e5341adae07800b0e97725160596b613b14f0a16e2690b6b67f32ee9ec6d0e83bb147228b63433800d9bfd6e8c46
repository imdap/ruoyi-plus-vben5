import useDelayState from "./useDelayState.js";
import { computed } from "vue";
function useOpen(open, defaultOpen, disabledList, onOpenChange) {
	const [rafOpen, setRafOpen] = useDelayState(computed(() => disabledList.value?.every((disabled) => disabled) ? false : open.value), defaultOpen.value || false, onOpenChange);
	function setOpen(next, config = {}) {
		if (!config.inherit || rafOpen.value) setRafOpen(next, config.force);
	}
	return [rafOpen, setOpen];
}
export { useOpen as default };
