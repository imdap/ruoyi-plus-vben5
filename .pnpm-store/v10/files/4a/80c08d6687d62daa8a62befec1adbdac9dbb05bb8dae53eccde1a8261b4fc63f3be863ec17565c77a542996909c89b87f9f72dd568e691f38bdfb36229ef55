import { ref } from "vue";
import canUseDom from "@v-c/util/dist/Dom/canUseDom";
var uuid = 0;
const isBrowserClient = process.env.NODE_ENV !== "test" && canUseDom();
function getUUID() {
	let retId;
	if (isBrowserClient) {
		retId = uuid;
		uuid += 1;
	} else retId = "TEST_OR_SSR";
	return retId;
}
var useId_default = (id) => {
	const innerId = ref();
	innerId.value = `vc_progress_${getUUID()}`;
	return id || innerId.value;
};
export { useId_default as default, isBrowserClient };
