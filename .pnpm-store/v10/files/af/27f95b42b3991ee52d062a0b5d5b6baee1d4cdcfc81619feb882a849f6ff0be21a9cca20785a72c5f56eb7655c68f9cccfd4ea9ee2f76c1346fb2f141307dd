import { unit } from "@antdv-next/cssinjs";

//#region src/table/style/summary.ts
const genSummaryStyle = (token) => {
	const { componentCls, lineWidth, tableBorderColor, calc } = token;
	const tableBorder = `${unit(lineWidth)} ${token.lineType} ${tableBorderColor}`;
	return { [`${componentCls}-wrapper`]: {
		[`${componentCls}-summary`]: {
			position: "relative",
			zIndex: token.zIndexTableFixed,
			background: token.tableBg,
			"> tr": { "> th, > td": { borderBottom: tableBorder } }
		},
		[`div${componentCls}-summary`]: { boxShadow: `0 ${unit(calc(lineWidth).mul(-1).equal())} 0 ${tableBorderColor}` }
	} };
};
var summary_default = genSummaryStyle;

//#endregion
export { summary_default as default };