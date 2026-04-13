import { unit } from "@antdv-next/cssinjs";

//#region src/table/style/radius.ts
const genRadiusStyle = (token) => {
	const { componentCls, tableRadius } = token;
	return { [`${componentCls}-wrapper`]: { [componentCls]: {
		[`${componentCls}-title, ${componentCls}-header`]: { borderRadius: `${unit(tableRadius)} ${unit(tableRadius)} 0 0` },
		[`${componentCls}-title + ${componentCls}-container`]: {
			borderStartStartRadius: 0,
			borderStartEndRadius: 0,
			[`${componentCls}-header, table`]: { borderRadius: 0 },
			"table > thead > tr:first-child": { "th:first-child, th:last-child, td:first-child, td:last-child": { borderRadius: 0 } }
		},
		"&-container": {
			borderStartStartRadius: tableRadius,
			borderStartEndRadius: tableRadius,
			"&::before": { borderStartStartRadius: tableRadius },
			"&::after": { borderStartEndRadius: tableRadius },
			[`> ${componentCls}-content`]: {
				borderStartStartRadius: tableRadius,
				borderStartEndRadius: tableRadius
			},
			"table > thead > tr:first-child": {
				"> *:first-child": { borderStartStartRadius: tableRadius },
				"> *:last-child": { borderStartEndRadius: tableRadius }
			}
		},
		"&-footer": { borderRadius: `0 0 ${unit(tableRadius)} ${unit(tableRadius)}` }
	} } };
};
var radius_default = genRadiusStyle;

//#endregion
export { radius_default as default };