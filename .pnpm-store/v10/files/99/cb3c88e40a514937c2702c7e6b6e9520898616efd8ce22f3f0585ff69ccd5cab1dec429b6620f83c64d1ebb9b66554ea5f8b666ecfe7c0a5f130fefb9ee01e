import { unit } from "@antdv-next/cssinjs";

//#region src/table/style/bordered.ts
const genBorderedStyle = (token) => {
	const { componentCls, lineWidth, lineType, tableBorderColor, tableHeaderBg, tablePaddingVertical, tablePaddingHorizontal, calc } = token;
	const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
	const getSizeBorderStyle = (size, paddingVertical, paddingHorizontal) => ({ [`&${componentCls}-${size}`]: { [`> ${componentCls}-container`]: { [`> ${componentCls}-content, > ${componentCls}-body`]: { [`
            > table > tbody > tr > th,
            > table > tbody > tr > td
          `]: { [`> ${componentCls}-expanded-row-fixed`]: { margin: `${unit(calc(paddingVertical).mul(-1).equal())}
              ${unit(calc(calc(paddingHorizontal).add(lineWidth)).mul(-1).equal())}` } } } } } });
	return { [`${componentCls}-wrapper`]: {
		[`${componentCls}${componentCls}-bordered`]: {
			[`> ${componentCls}-title`]: {
				border: tableBorder,
				borderBottom: 0
			},
			[`> ${componentCls}-container`]: {
				borderInlineStart: tableBorder,
				borderTop: tableBorder,
				[`
            > ${componentCls}-content,
            > ${componentCls}-header,
            > ${componentCls}-body,
            > ${componentCls}-summary
          `]: { "> table": {
					[`
                > thead > tr > th,
                > thead > tr > td,
                > tbody > tr > th,
                > tbody > tr > td,
                > tfoot > tr > th,
                > tfoot > tr > td
              `]: { borderInlineEnd: tableBorder },
					"> thead": {
						"> tr:not(:last-child) > th": { borderBottom: tableBorder },
						"> tr > th::before": { backgroundColor: "transparent !important" }
					},
					[`
                > thead > tr,
                > tbody > tr,
                > tfoot > tr
              `]: { [`> ${componentCls}-cell-fix-right-first::after`]: { borderInlineEnd: tableBorder } },
					[`
                > tbody > tr > th,
                > tbody > tr > td
              `]: { [`> ${componentCls}-expanded-row-fixed`]: {
						margin: `${unit(calc(tablePaddingVertical).mul(-1).equal())} ${unit(calc(calc(tablePaddingHorizontal).add(lineWidth)).mul(-1).equal())}`,
						"&::after": {
							position: "absolute",
							top: 0,
							insetInlineEnd: lineWidth,
							bottom: 0,
							borderInlineEnd: tableBorder,
							content: "\"\""
						}
					} }
				} }
			},
			[`&${componentCls}-scroll-horizontal`]: { [`> ${componentCls}-container > ${componentCls}-body`]: { "> table > tbody": { [`
                > tr${componentCls}-expanded-row,
                > tr${componentCls}-placeholder
              `]: { "> th, > td": { borderInlineEnd: 0 } } } } },
			...getSizeBorderStyle("medium", token.tablePaddingVerticalMiddle, token.tablePaddingHorizontalMiddle),
			...getSizeBorderStyle("small", token.tablePaddingVerticalSmall, token.tablePaddingHorizontalSmall),
			[`> ${componentCls}-footer`]: {
				border: tableBorder,
				borderTop: 0
			}
		},
		[`${componentCls}-cell`]: {
			[`${componentCls}-container:first-child`]: { borderTop: 0 },
			"&-scrollbar:not([rowspan])": { boxShadow: `0 ${unit(lineWidth)} 0 ${unit(lineWidth)} ${tableHeaderBg}` }
		},
		[`${componentCls}-bordered ${componentCls}-cell-scrollbar`]: { borderInlineEnd: tableBorder }
	} };
};
var bordered_default = genBorderedStyle;

//#endregion
export { bordered_default as default };