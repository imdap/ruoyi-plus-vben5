//#region src/dropdown/style/status.ts
const genStatusStyle = (token) => {
	const { componentCls, menuCls, colorError, colorTextLightSolid } = token;
	const itemCls = `${menuCls}-item`;
	return { [`${componentCls}, ${componentCls}-menu-submenu`]: { [`${menuCls} ${itemCls}`]: { [`&${itemCls}-danger:not(${itemCls}-disabled)`]: {
		color: colorError,
		"&:hover": {
			color: colorTextLightSolid,
			backgroundColor: colorError
		}
	} } } };
};
var status_default = genStatusStyle;

//#endregion
export { status_default as default };