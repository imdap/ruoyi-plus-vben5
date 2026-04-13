import { genSubStyleComponent } from "../../theme/util/genStyleUtils.js";
import { prepareToken } from "./index.js";

//#region src/form/style/fallbackCmp.ts
const genFallbackStyle = (token) => {
	const { formItemCls } = token;
	return { "@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)": { [`${formItemCls}-control`]: { display: "flex" } } };
};
var fallbackCmp_default = genSubStyleComponent(["Form", "item-item"], (token, { rootPrefixCls }) => {
	return genFallbackStyle(prepareToken(token, rootPrefixCls));
});

//#endregion
export { fallbackCmp_default as default };