import { unit } from "@antdv-next/cssinjs";

//#region src/table/style/pagination.ts
const genPaginationStyle = (token) => {
	const { componentCls, antCls, margin } = token;
	return { [`${componentCls}-wrapper`]: {
		[`${componentCls}-pagination${antCls}-pagination`]: { margin: `${unit(margin)} 0` },
		[`${componentCls}-pagination`]: {
			display: "flex",
			flexWrap: "wrap",
			rowGap: token.paddingXS,
			"> *": { flex: "none" },
			"&-start": { justifyContent: "flex-start" },
			"&-center": { justifyContent: "center" },
			"&-end": { justifyContent: "flex-end" }
		}
	} };
};
var pagination_default = genPaginationStyle;

//#endregion
export { pagination_default as default };