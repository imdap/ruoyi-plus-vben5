import { resetComponent, textEllipsis } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/descriptions/style/index.ts
const genBorderedStyle = (token) => {
	const { componentCls, labelBg } = token;
	return { [`&${componentCls}-bordered`]: {
		[`> ${componentCls}-view`]: {
			border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
			"> table": { tableLayout: "auto" },
			[`${componentCls}-row`]: {
				borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
				"&:first-child": { "> th:first-child, > td:first-child": { borderStartStartRadius: token.borderRadiusLG } },
				"&:last-child": {
					borderBottom: "none",
					"> th:first-child, > td:first-child": { borderEndStartRadius: token.borderRadiusLG }
				},
				[`> ${componentCls}-item-label, > ${componentCls}-item-content`]: {
					padding: `${unit(token.padding)} ${unit(token.paddingLG)}`,
					borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
					"&:last-child": { borderInlineEnd: "none" }
				},
				[`> ${componentCls}-item-label`]: {
					color: token.colorTextSecondary,
					backgroundColor: labelBg,
					"&::after": { display: "none" }
				}
			}
		},
		[`&${componentCls}-medium`]: { [`${componentCls}-row`]: { [`> ${componentCls}-item-label, > ${componentCls}-item-content`]: { padding: `${unit(token.paddingSM)} ${unit(token.paddingLG)}` } } },
		[`&${componentCls}-small`]: { [`${componentCls}-row`]: { [`> ${componentCls}-item-label, > ${componentCls}-item-content`]: { padding: `${unit(token.paddingXS)} ${unit(token.padding)}` } } }
	} };
};
const genDescriptionStyles = (token) => {
	const { componentCls, extraColor, itemPaddingBottom, itemPaddingEnd, colonMarginRight, colonMarginLeft, titleMarginBottom } = token;
	return { [componentCls]: {
		...resetComponent(token),
		...genBorderedStyle(token),
		"&-rtl": { direction: "rtl" },
		[`${componentCls}-header`]: {
			display: "flex",
			alignItems: "center",
			marginBottom: titleMarginBottom
		},
		[`${componentCls}-title`]: {
			...textEllipsis,
			flex: "auto",
			color: token.titleColor,
			fontWeight: token.fontWeightStrong,
			fontSize: token.fontSizeLG,
			lineHeight: token.lineHeightLG
		},
		[`${componentCls}-extra`]: {
			marginInlineStart: "auto",
			color: extraColor,
			fontSize: token.fontSize
		},
		[`${componentCls}-view`]: {
			width: "100%",
			borderRadius: token.borderRadiusLG,
			table: {
				width: "100%",
				tableLayout: "fixed",
				borderCollapse: "collapse"
			}
		},
		[`${componentCls}-row`]: {
			"> th, > td": {
				paddingBottom: itemPaddingBottom,
				paddingInlineEnd: itemPaddingEnd
			},
			"> th:last-child, > td:last-child": { paddingInlineEnd: 0 },
			"&:last-child": {
				borderBottom: "none",
				"> th, > td": { paddingBottom: 0 }
			}
		},
		[`${componentCls}-item-label`]: {
			color: token.labelColor,
			fontWeight: "normal",
			fontSize: token.fontSize,
			lineHeight: token.lineHeight,
			textAlign: "start",
			"&::after": {
				content: "\":\"",
				position: "relative",
				top: -.5,
				marginInline: `${unit(colonMarginLeft)} ${unit(colonMarginRight)}`
			},
			[`&${componentCls}-item-no-colon::after`]: { content: "\"\"" }
		},
		[`${componentCls}-item-no-label`]: { "&::after": {
			margin: 0,
			content: "\"\""
		} },
		[`${componentCls}-item-content`]: {
			display: "table-cell",
			flex: 1,
			color: token.contentColor,
			fontSize: token.fontSize,
			lineHeight: token.lineHeight,
			wordBreak: "break-word",
			overflowWrap: "break-word"
		},
		[`${componentCls}-item`]: {
			paddingBottom: 0,
			verticalAlign: "top",
			"&-container": {
				display: "flex",
				[`${componentCls}-item-label`]: {
					display: "inline-flex",
					alignItems: "baseline"
				},
				[`${componentCls}-item-content`]: {
					display: "inline-flex",
					alignItems: "baseline",
					minWidth: "1em"
				}
			}
		},
		"&-medium": { [`${componentCls}-row`]: { "> th, > td": { paddingBottom: token.paddingSM } } },
		"&-small": { [`${componentCls}-row`]: { "> th, > td": { paddingBottom: token.paddingXS } } }
	} };
};
const prepareComponentToken = (token) => ({
	labelBg: token.colorFillAlter,
	labelColor: token.colorTextTertiary,
	titleColor: token.colorText,
	titleMarginBottom: token.fontSizeSM * token.lineHeightSM,
	itemPaddingBottom: token.padding,
	itemPaddingEnd: token.padding,
	colonMarginRight: token.marginXS,
	colonMarginLeft: token.marginXXS / 2,
	contentColor: token.colorText,
	extraColor: token.colorText
});
var style_default = genStyleHooks("Descriptions", (token) => {
	return genDescriptionStyles(mergeToken(token, {}));
}, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };