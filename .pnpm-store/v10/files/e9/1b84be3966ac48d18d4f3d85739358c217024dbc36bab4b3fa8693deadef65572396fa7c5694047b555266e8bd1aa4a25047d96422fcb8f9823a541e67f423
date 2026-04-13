import useToken from "../useToken.js";
import { genIconStyle } from "../../style/index.js";
import { computed } from "vue";
import { useStyleRegister } from "@antdv-next/cssinjs";

//#region src/theme/util/useResetIconStyle.ts
function useResetIconStyle(iconPrefixCls, csp) {
	const [theme, token] = useToken();
	return useStyleRegister(computed(() => ({
		theme: theme.value,
		token: token.value,
		hashId: "",
		path: ["ant-design-icons", iconPrefixCls.value],
		nonce: () => csp?.value?.nonce ?? "",
		layer: { name: "antd" }
	})), () => genIconStyle(iconPrefixCls.value));
}
var useResetIconStyle_default = useResetIconStyle;

//#endregion
export { useResetIconStyle_default as default };