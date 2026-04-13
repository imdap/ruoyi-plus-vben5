import { genCssVar, genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/grid/style/index.ts
const genGridRowStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		display: "flex",
		flexFlow: "row wrap",
		minWidth: 0,
		"&::before, &::after": { display: "flex" },
		"&-no-wrap": { flexWrap: "nowrap" },
		"&-start": { justifyContent: "flex-start" },
		"&-center": { justifyContent: "center" },
		"&-end": { justifyContent: "flex-end" },
		"&-space-between": { justifyContent: "space-between" },
		"&-space-around": { justifyContent: "space-around" },
		"&-space-evenly": { justifyContent: "space-evenly" },
		"&-top": { alignItems: "flex-start" },
		"&-middle": { alignItems: "center" },
		"&-bottom": { alignItems: "flex-end" }
	} };
};
const genGridColStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		position: "relative",
		maxWidth: "100%",
		minHeight: 1
	} };
};
function genLoopGridColumnsStyle(token, sizeCls) {
	const { componentCls, gridColumns, antCls } = token;
	const [gridVarName, gridVarRef] = genCssVar(antCls, "grid");
	const [, colVarRef] = genCssVar(antCls, "col");
	const gridColumnsStyle = {};
	for (let i = gridColumns; i >= 0; i--) if (i === 0) {
		gridColumnsStyle[`${componentCls}${sizeCls}-${i}`] = { display: "none" };
		gridColumnsStyle[`${componentCls}-push-${i}`] = { insetInlineStart: "auto" };
		gridColumnsStyle[`${componentCls}-pull-${i}`] = { insetInlineEnd: "auto" };
		gridColumnsStyle[`${componentCls}${sizeCls}-push-${i}`] = { insetInlineStart: "auto" };
		gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i}`] = { insetInlineEnd: "auto" };
		gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i}`] = { marginInlineStart: 0 };
		gridColumnsStyle[`${componentCls}${sizeCls}-order-${i}`] = { order: 0 };
	} else {
		gridColumnsStyle[`${componentCls}${sizeCls}-${i}`] = [{
			[gridVarName("display")]: "block",
			display: "block"
		}, {
			display: gridVarRef("display"),
			flex: `0 0 ${i / gridColumns * 100}%`,
			maxWidth: `${i / gridColumns * 100}%`
		}];
		gridColumnsStyle[`${componentCls}${sizeCls}-push-${i}`] = { insetInlineStart: `${i / gridColumns * 100}%` };
		gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i}`] = { insetInlineEnd: `${i / gridColumns * 100}%` };
		gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i}`] = { marginInlineStart: `${i / gridColumns * 100}%` };
		gridColumnsStyle[`${componentCls}${sizeCls}-order-${i}`] = { order: i };
	}
	gridColumnsStyle[`${componentCls}${sizeCls}-flex`] = { flex: colVarRef(`${sizeCls.replace(/-/, "")}-flex`) };
	return gridColumnsStyle;
}
function genGridStyle(token, sizeCls) {
	return genLoopGridColumnsStyle(token, sizeCls);
}
function genGridMediaStyle(token, screenSize, sizeCls) {
	return { [`@media (min-width: ${unit(screenSize)})`]: { ...genGridStyle(token, sizeCls) } };
}
const prepareRowComponentToken = () => ({});
const prepareColComponentToken = () => ({});
const useRowStyle = genStyleHooks("Grid", genGridRowStyle, prepareRowComponentToken);
function getMediaSize(token) {
	return {
		xs: token.screenXSMin,
		sm: token.screenSMMin,
		md: token.screenMDMin,
		lg: token.screenLGMin,
		xl: token.screenXLMin,
		xxl: token.screenXXLMin,
		xxxl: token.screenXXXLMin
	};
}
const useColStyle = genStyleHooks("Grid", (token) => {
	const gridToken = mergeToken(token, { gridColumns: 24 });
	const gridMediaSizesMap = getMediaSize(gridToken);
	delete gridMediaSizesMap.xs;
	return [
		genGridColStyle(gridToken),
		genGridStyle(gridToken, ""),
		genGridStyle(gridToken, "-xs"),
		Object.keys(gridMediaSizesMap).map((key) => genGridMediaStyle(gridToken, gridMediaSizesMap[key], `-${key}`)).reduce((pre, cur) => ({
			...pre,
			...cur
		}), {})
	];
}, prepareColComponentToken);

//#endregion
export { getMediaSize, prepareColComponentToken, prepareRowComponentToken, useColStyle, useRowStyle };