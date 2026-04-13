import useToken from "../../theme/useToken.js";
import { computed } from "vue";

//#region src/config-provider/hooks/useCSSVarCls.ts
/**
* This hook is only for cssVar to add root className for components.
* If root ClassName is needed, this hook could be refactored with `-root`
* @param prefixCls
*/
function useCSSVarCls(prefixCls) {
	const [, , , , cssVar] = useToken();
	return computed(() => cssVar?.value ? `${prefixCls.value}-css-var` : "");
}
var useCSSVarCls_default = useCSSVarCls;

//#endregion
export { useCSSVarCls_default as default };