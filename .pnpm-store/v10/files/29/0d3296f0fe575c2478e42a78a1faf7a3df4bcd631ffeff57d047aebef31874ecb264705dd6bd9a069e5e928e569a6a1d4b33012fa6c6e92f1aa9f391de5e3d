import { onMounted, onUnmounted } from "vue";
function isInside(elements, target) {
	return elements.filter((element) => element).some((element) => element.contains(target) || element === target);
}
function useSelectTriggerControl(elements, open, triggerOpen, customizedTrigger) {
	const onGlobalMouseDown = (event) => {
		if (customizedTrigger.value) return;
		let target = event.target;
		if (target.shadowRoot && event.composed) target = event.composedPath()[0] || target;
		if (event._ori_target) target = event._ori_target;
		if (open.value && !isInside(elements(), target)) triggerOpen(false);
	};
	onMounted(() => {
		window.addEventListener("mousedown", onGlobalMouseDown);
		onUnmounted(() => {
			window.removeEventListener("mousedown", onGlobalMouseDown);
		});
	});
}
export { useSelectTriggerControl as default, isInside };
