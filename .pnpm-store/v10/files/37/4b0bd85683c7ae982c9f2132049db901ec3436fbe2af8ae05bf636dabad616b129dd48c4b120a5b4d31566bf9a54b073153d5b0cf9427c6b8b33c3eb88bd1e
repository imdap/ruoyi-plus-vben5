import { unit } from "@antdv-next/cssinjs";

//#region src/menu/style/rtl.ts
const getRTLStyle = ({ componentCls, menuArrowOffset, calc }) => ({
	[`${componentCls}-rtl`]: { direction: "rtl" },
	[`${componentCls}-submenu-rtl`]: { transformOrigin: "100% 0" },
	[`${componentCls}-rtl${componentCls}-vertical,
    ${componentCls}-submenu-rtl ${componentCls}-vertical`]: { [`${componentCls}-submenu-arrow`]: {
		"&::before": { transform: `rotate(-45deg) translateY(${unit(calc(menuArrowOffset).mul(-1).equal())})` },
		"&::after": { transform: `rotate(45deg) translateY(${unit(menuArrowOffset)})` }
	} }
});
var rtl_default = getRTLStyle;

//#endregion
export { rtl_default as default };