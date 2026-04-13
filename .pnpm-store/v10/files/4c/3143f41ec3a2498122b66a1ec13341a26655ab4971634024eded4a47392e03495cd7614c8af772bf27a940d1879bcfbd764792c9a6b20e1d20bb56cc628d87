import { usePreviewGroupContext } from "../context.js";
import { onBeforeUnmount, onMounted, shallowRef, watch } from "vue";
//#region src/hooks/useRegisterImage.ts
var uid = 0;
function useRegisterImage(canPreview, data) {
	uid += 1;
	const id = shallowRef(String(uid));
	const groupContext = usePreviewGroupContext();
	const registerData = () => ({
		data: data.value,
		canPreview: canPreview.value
	});
	let unRegister;
	onMounted(() => {
		if (groupContext) unRegister = groupContext.register(id.value, registerData());
	});
	watch([canPreview, data], () => {
		if (groupContext) groupContext.register(id.value, registerData());
	}, { deep: true });
	onBeforeUnmount(() => {
		unRegister?.();
	});
	return id.value;
}
//#endregion
export { useRegisterImage as default };
