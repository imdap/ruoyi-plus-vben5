import { unit } from "@antdv-next/cssinjs";

//#region src/table/style/size.ts
const genSizeStyle = (token) => {
	const { componentCls, tableExpandColumnWidth, calc } = token;
	const getSizeStyle = (size, paddingVertical, paddingHorizontal, fontSize) => ({ [`${componentCls}${componentCls}-${size}`]: {
		fontSize,
		[`
        ${componentCls}-title,
        ${componentCls}-footer,
        ${componentCls}-cell,
        ${componentCls}-thead > tr > th,
        ${componentCls}-tbody > tr > th,
        ${componentCls}-tbody > tr > td,
        tfoot > tr > th,
        tfoot > tr > td
      `]: { padding: `${unit(paddingVertical)} ${unit(paddingHorizontal)}` },
		[`${componentCls}-filter-trigger`]: { marginInlineEnd: unit(calc(paddingHorizontal).div(2).mul(-1).equal()) },
		[`${componentCls}-expanded-row-fixed`]: { margin: `${unit(calc(paddingVertical).mul(-1).equal())} ${unit(calc(paddingHorizontal).mul(-1).equal())}` },
		[`${componentCls}-tbody`]: { [`${componentCls}-wrapper:only-child ${componentCls}`]: {
			marginBlock: unit(calc(paddingVertical).mul(-1).equal()),
			marginInline: `${unit(calc(tableExpandColumnWidth).sub(paddingHorizontal).equal())} ${unit(calc(paddingHorizontal).mul(-1).equal())}`
		} },
		[`${componentCls}-selection-extra`]: { paddingInlineStart: unit(calc(paddingHorizontal).div(4).equal()) }
	} });
	return { [`${componentCls}-wrapper`]: {
		...getSizeStyle("medium", token.tablePaddingVerticalMiddle, token.tablePaddingHorizontalMiddle, token.tableFontSizeMiddle),
		...getSizeStyle("small", token.tablePaddingVerticalSmall, token.tablePaddingHorizontalSmall, token.tableFontSizeSmall)
	} };
};
var size_default = genSizeStyle;

//#endregion
export { size_default as default };