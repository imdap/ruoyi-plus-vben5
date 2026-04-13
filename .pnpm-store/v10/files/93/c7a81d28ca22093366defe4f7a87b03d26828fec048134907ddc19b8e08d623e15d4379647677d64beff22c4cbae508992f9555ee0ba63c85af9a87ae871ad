//#region src/table/style/empty.ts
const genEmptyStyle = (token) => {
	const { componentCls } = token;
	return { [`${componentCls}-wrapper`]: { [`${componentCls}-tbody > tr${componentCls}-placeholder`]: {
		textAlign: "center",
		color: token.colorTextDisabled,
		[`
          &:hover > th,
          &:hover > td,
        `]: { background: token.colorBgContainer }
	} } };
};
var empty_default = genEmptyStyle;

//#endregion
export { empty_default as default };