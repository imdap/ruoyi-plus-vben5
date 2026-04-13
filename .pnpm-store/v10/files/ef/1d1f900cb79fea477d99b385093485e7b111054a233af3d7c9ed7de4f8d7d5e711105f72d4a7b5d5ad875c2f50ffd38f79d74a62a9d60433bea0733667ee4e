import { onUnmounted, ref } from "vue";
import raf from "@v-c/util/dist/raf";
var useFrame_default = () => {
	const idRef = ref(0);
	const cleanUp = () => {
		raf.cancel(idRef.value);
	};
	onUnmounted(cleanUp);
	return (callback) => {
		cleanUp();
		idRef.value = raf(() => {
			callback();
		});
	};
};
export { useFrame_default as default };
