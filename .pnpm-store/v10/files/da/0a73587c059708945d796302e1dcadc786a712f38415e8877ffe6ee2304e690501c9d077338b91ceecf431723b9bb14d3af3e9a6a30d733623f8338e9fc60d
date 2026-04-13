const require_rolldown_runtime = require('../rolldown-runtime.cjs');
const vue = require_rolldown_runtime.__toESM(require("vue"));

//#region src/shared/useForwardRef.ts
function useForwardRef() {
	const instance = (0, vue.getCurrentInstance)();
	function handleRefChange(ref) {
		if (typeof ref === "object") {
			instance.exposed = ref;
			instance.exposeProxy = ref;
		}
	}
	return handleRefChange;
}

//#endregion
Object.defineProperty(exports, 'useForwardRef', {
  enumerable: true,
  get: function () {
    return useForwardRef;
  }
});
//# sourceMappingURL=useForwardRef.cjs.map