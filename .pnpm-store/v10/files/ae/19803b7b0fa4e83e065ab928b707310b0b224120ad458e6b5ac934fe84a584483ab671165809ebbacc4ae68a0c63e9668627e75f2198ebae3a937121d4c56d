import isMobile_default from "../isMobile.js";
import { onMounted, onUpdated, shallowRef } from "vue";
function useMobile() {
	const mobile = shallowRef(false);
	onMounted(() => {
		mobile.value = isMobile_default();
	});
	onUpdated(() => {
		mobile.value = isMobile_default();
	});
	return mobile;
}
var useMobile_default = useMobile;
export { useMobile_default as default, useMobile };
