import { genStyleHooks } from "../../theme/util/genStyleUtils.js";

//#region src/input/style/search.ts
const genSearchStyle = (token) => {
	const { componentCls } = token;
	const btnCls = `${componentCls}-btn`;
	return { [componentCls]: {
		width: "100%",
		[btnCls]: { "&-filled": {
			background: token.colorFillTertiary,
			"&:not(:disabled)": {
				"&:hover": { background: token.colorFillSecondary },
				"&:active": { background: token.colorFill }
			}
		} }
	} };
};
var search_default = genStyleHooks(["Input", "Search"], genSearchStyle);

//#endregion
export { search_default as default };