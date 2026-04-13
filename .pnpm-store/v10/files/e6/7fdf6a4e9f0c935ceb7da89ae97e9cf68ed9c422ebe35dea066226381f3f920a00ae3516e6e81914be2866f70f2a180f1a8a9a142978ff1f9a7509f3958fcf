import { getCurrentInstance } from "vue";

//#region src/shared/useForwardRef.ts
function useForwardRef() {
	const instance = getCurrentInstance();
	function handleRefChange(ref$1) {
		if (typeof ref$1 === "object") {
			instance.exposed = ref$1;
			instance.exposeProxy = ref$1;
		}
	}
	return handleRefChange;
}

//#endregion
export { useForwardRef };
//# sourceMappingURL=useForwardRef.js.map