import { ref } from "vue";
function useTargetState() {
	const options = ref();
	const open = ref(false);
	const isAnimating = ref(false);
	const pendingOptionsRef = ref();
	const trigger = (nextOptions) => {
		const wasOpen = open.value;
		if (nextOptions === false) {
			pendingOptionsRef.value = null;
			open.value = false;
		} else if (isAnimating.value && wasOpen) pendingOptionsRef.value = nextOptions;
		else {
			open.value = true;
			options.value = nextOptions;
			pendingOptionsRef.value = null;
			if (!wasOpen) isAnimating.value = true;
		}
	};
	const onVisibleChanged = (visible) => {
		if (visible) {
			isAnimating.value = false;
			if (pendingOptionsRef.value) {
				options.value = pendingOptionsRef.value;
				pendingOptionsRef.value = null;
			}
		} else {
			isAnimating.value = false;
			pendingOptionsRef.value = null;
		}
	};
	return [
		trigger,
		open,
		options,
		onVisibleChanged
	];
}
export { useTargetState as default };
