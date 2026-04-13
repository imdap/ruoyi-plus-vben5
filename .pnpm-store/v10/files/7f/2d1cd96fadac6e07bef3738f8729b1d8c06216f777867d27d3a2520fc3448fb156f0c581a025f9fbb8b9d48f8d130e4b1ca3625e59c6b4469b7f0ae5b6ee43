import { genComponentStyleHook } from "../../theme/util/genStyleUtils.js";
import columns_default from "./columns.js";
import { prepareComponentToken } from "./index.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/cascader/style/panel.ts
const genPanelStyle = (token) => {
	const { componentCls } = token;
	return { [`${componentCls}-panel`]: [columns_default(token), {
		display: "inline-flex",
		border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
		borderRadius: token.borderRadiusLG,
		overflowX: "auto",
		maxWidth: "100%",
		[`${componentCls}-menus`]: { alignItems: "stretch" },
		[`${componentCls}-menu`]: { height: "auto" },
		"&-empty": { padding: token.paddingXXS }
	}] };
};
var panel_default = genComponentStyleHook(["Cascader", "Panel"], genPanelStyle, prepareComponentToken, { resetFont: false });

//#endregion
export { panel_default as default };