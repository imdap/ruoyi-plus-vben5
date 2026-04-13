import { operationUnit } from "../../style/index.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/table/style/expand.ts
const genExpandStyle = (token) => {
	const { componentCls, antCls, motionDurationSlow, lineWidth, paddingXS, lineType, tableBorderColor, tableExpandIconBg, tableExpandColumnWidth, borderRadius, tablePaddingVertical, tablePaddingHorizontal, tableExpandedRowBg, paddingXXS, expandIconMarginTop, expandIconSize, expandIconHalfInner, expandIconScale, calc } = token;
	const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
	const expandIconLineOffset = calc(paddingXXS).sub(lineWidth).equal();
	return { [`${componentCls}-wrapper`]: {
		[`${componentCls}-expand-icon-col`]: { width: tableExpandColumnWidth },
		[`${componentCls}-row-expand-icon-cell`]: {
			textAlign: "center",
			[`${componentCls}-row-expand-icon`]: {
				display: "inline-flex",
				float: "none",
				verticalAlign: "sub"
			}
		},
		[`${componentCls}-row-indent`]: {
			height: 1,
			float: "left"
		},
		[`${componentCls}-row-expand-icon`]: {
			...operationUnit(token),
			position: "relative",
			float: "left",
			width: expandIconSize,
			height: expandIconSize,
			color: "inherit",
			lineHeight: unit(expandIconSize),
			background: tableExpandIconBg,
			border: tableBorder,
			borderRadius,
			transform: `scale(${expandIconScale})`,
			"&:focus, &:hover, &:active": { borderColor: "currentcolor" },
			"&::before, &::after": {
				position: "absolute",
				background: "currentcolor",
				transition: `transform ${motionDurationSlow} ease-out`,
				content: "\"\""
			},
			"&::before": {
				top: expandIconHalfInner,
				insetInlineEnd: expandIconLineOffset,
				insetInlineStart: expandIconLineOffset,
				height: lineWidth
			},
			"&::after": {
				top: expandIconLineOffset,
				bottom: expandIconLineOffset,
				insetInlineStart: expandIconHalfInner,
				width: lineWidth,
				transform: "rotate(90deg)"
			},
			"&-collapsed::before": { transform: "rotate(-180deg)" },
			"&-collapsed::after": { transform: "rotate(0deg)" },
			"&-spaced": {
				"&::before, &::after": {
					display: "none",
					content: "none"
				},
				background: "transparent",
				border: 0,
				visibility: "hidden"
			}
		},
		[`${componentCls}-row-indent + ${componentCls}-row-expand-icon`]: {
			marginTop: expandIconMarginTop,
			marginInlineEnd: paddingXS
		},
		[`tr${componentCls}-expanded-row`]: {
			"&, &:hover": { "> th, > td": { background: tableExpandedRowBg } },
			[`${antCls}-descriptions-view`]: {
				display: "flex",
				table: {
					flex: "auto",
					width: "100%"
				}
			}
		},
		[`${componentCls}-expanded-row-fixed`]: {
			position: "relative",
			margin: `${unit(calc(tablePaddingVertical).mul(-1).equal())} ${unit(calc(tablePaddingHorizontal).mul(-1).equal())}`,
			padding: `${unit(tablePaddingVertical)} ${unit(tablePaddingHorizontal)}`
		}
	} };
};
var expand_default = genExpandStyle;

//#endregion
export { expand_default as default };