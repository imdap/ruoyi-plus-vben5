import { unit } from "@antdv-next/cssinjs";

//#region src/table/style/virtual.ts
const genVirtualStyle = (token) => {
	const { componentCls, motionDurationMid, lineWidth, lineType, tableBorderColor, calc } = token;
	const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
	const rowCellCls = `${componentCls}-expanded-row-cell`;
	return { [`${componentCls}-wrapper`]: {
		[`${componentCls}-tbody-virtual`]: {
			[`${componentCls}-tbody-virtual-holder-inner`]: { [`
            & > ${componentCls}-row,
            & > div:not(${componentCls}-row) > ${componentCls}-row
          `]: {
				display: "flex",
				boxSizing: "border-box",
				width: "100%"
			} },
			[`${componentCls}-cell`]: {
				borderBottom: tableBorder,
				transition: `background-color ${motionDurationMid}`
			},
			[`${componentCls}-expanded-row`]: { [`${rowCellCls}${rowCellCls}-fixed`]: {
				position: "sticky",
				insetInlineStart: 0,
				overflow: "hidden",
				width: `calc(var(--virtual-width) - ${unit(lineWidth)})`,
				borderInlineEnd: "none"
			} }
		},
		[`${componentCls}-bordered`]: {
			[`${componentCls}-tbody-virtual`]: {
				"&:after": {
					content: "\"\"",
					insetInline: 0,
					bottom: 0,
					borderBottom: tableBorder,
					position: "absolute"
				},
				[`${componentCls}-cell`]: {
					borderInlineEnd: tableBorder,
					[`&${componentCls}-cell-fix-right-first:before`]: {
						content: "\"\"",
						position: "absolute",
						insetBlock: 0,
						insetInlineStart: calc(lineWidth).mul(-1).equal(),
						borderInlineStart: tableBorder
					}
				}
			},
			[`&${componentCls}-virtual`]: { [`${componentCls}-placeholder ${componentCls}-cell`]: {
				borderInlineEnd: tableBorder,
				borderBottom: tableBorder
			} }
		}
	} };
};
var virtual_default = genVirtualStyle;

//#endregion
export { virtual_default as default };