import { useSizeContext } from "../SizeContext.js";
import { useDisabledContext } from "../DisabledContext.js";

//#region src/config-provider/hooks/useConfig.ts
function useExportConfig() {
	return {
		componentDisabled: useDisabledContext(),
		componentSize: useSizeContext()
	};
}

//#endregion
export { useExportConfig };