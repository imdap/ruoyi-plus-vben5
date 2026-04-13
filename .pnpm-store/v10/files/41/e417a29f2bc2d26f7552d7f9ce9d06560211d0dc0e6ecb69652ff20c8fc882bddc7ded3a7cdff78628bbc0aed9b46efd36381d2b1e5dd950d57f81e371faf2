import { textEllipsis } from "../../style/index.js";

//#region src/table/style/ellipsis.ts
const genEllipsisStyle = (token) => {
	const { componentCls } = token;
	return { [`${componentCls}-wrapper`]: { [`${componentCls}-cell-ellipsis`]: {
		...textEllipsis,
		wordBreak: "keep-all",
		[`
          &${componentCls}-cell-fix-start-shadow,
          &${componentCls}-cell-fix-end-shadow
        `]: {
			overflow: "visible",
			[`${componentCls}-cell-content`]: {
				...textEllipsis,
				display: "block"
			}
		},
		[`${componentCls}-column-title`]: {
			...textEllipsis,
			wordBreak: "keep-all"
		}
	} } };
};
var ellipsis_default = genEllipsisStyle;

//#endregion
export { ellipsis_default as default };