import { genStyleHooks } from "../../theme/util/genStyleUtils.js";

//#region src/space/style/compact.ts
const genSpaceCompactStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		display: "inline-flex",
		"&-block": {
			display: "flex",
			width: "100%"
		},
		"&-vertical": { flexDirection: "column" },
		"&-rtl": { direction: "rtl" }
	} };
};
var compact_default = genStyleHooks(["Space", "Compact"], genSpaceCompactStyle, () => ({}), { resetStyle: false });

//#endregion
export { compact_default as default };