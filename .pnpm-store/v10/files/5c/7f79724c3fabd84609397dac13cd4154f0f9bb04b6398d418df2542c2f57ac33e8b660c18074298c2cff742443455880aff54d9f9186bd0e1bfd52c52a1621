//#region src/select/style/select-input-customize.ts
const genSelectInputCustomizeStyle = (token) => {
	const { componentCls } = token;
	return { [`&${componentCls}-customize`]: {
		border: 0,
		padding: 0,
		fontSize: "inherit",
		lineHeight: "inherit",
		[`${componentCls}-placeholder`]: { display: "none" },
		[`${componentCls}-content`]: {
			margin: 0,
			padding: 0,
			"&-value": { display: "none" }
		}
	} };
};
var select_input_customize_default = genSelectInputCustomizeStyle;

//#endregion
export { select_input_customize_default as default };