import { clearFix, resetComponent } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import bordered_default from "./bordered.js";
import ellipsis_default from "./ellipsis.js";
import empty_default from "./empty.js";
import expand_default from "./expand.js";
import filter_default from "./filter.js";
import fixed_default from "./fixed.js";
import pagination_default from "./pagination.js";
import radius_default from "./radius.js";
import rtl_default from "./rtl.js";
import selection_default from "./selection.js";
import size_default from "./size.js";
import sorter_default from "./sorter.js";
import sticky_default from "./sticky.js";
import summary_default from "./summary.js";
import virtual_default from "./virtual.js";
import { unit } from "@antdv-next/cssinjs";
import { FastColor } from "@ant-design/fast-color";

//#region src/table/style/index.ts
const genTableStyle = (token) => {
	const { componentCls, fontWeightStrong, tablePaddingVertical, tablePaddingHorizontal, tableExpandColumnWidth, lineWidth, lineType, tableBorderColor, tableFontSize, tableBg, tableRadius, tableHeaderTextColor, motionDurationMid, tableHeaderBg, tableHeaderCellSplitColor, tableFooterTextColor, tableFooterBg, calc } = token;
	const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
	return { [`${componentCls}-wrapper`]: {
		clear: "both",
		maxWidth: "100%",
		["--rc-virtual-list-scrollbar-bg"]: token.tableScrollBg,
		...clearFix(),
		[componentCls]: {
			...resetComponent(token),
			fontSize: tableFontSize,
			background: tableBg,
			borderRadius: `${unit(tableRadius)} ${unit(tableRadius)} 0 0`,
			scrollbarColor: `${token.tableScrollThumbBg} ${token.tableScrollBg}`
		},
		table: {
			width: "100%",
			textAlign: "start",
			borderRadius: `${unit(tableRadius)} ${unit(tableRadius)} 0 0`,
			borderCollapse: "separate",
			borderSpacing: 0
		},
		[`
          ${componentCls}-cell,
          ${componentCls}-thead > tr > th,
          ${componentCls}-tbody > tr > th,
          ${componentCls}-tbody > tr > td,
          tfoot > tr > th,
          tfoot > tr > td
        `]: {
			position: "relative",
			padding: `${unit(tablePaddingVertical)} ${unit(tablePaddingHorizontal)}`,
			overflowWrap: "break-word"
		},
		[`${componentCls}-title`]: { padding: `${unit(tablePaddingVertical)} ${unit(tablePaddingHorizontal)}` },
		[`${componentCls}-thead`]: {
			[`
          > tr > th,
          > tr > td
        `]: {
				position: "relative",
				color: tableHeaderTextColor,
				fontWeight: fontWeightStrong,
				textAlign: "start",
				background: tableHeaderBg,
				borderBottom: tableBorder,
				transition: `background-color ${motionDurationMid} ease`,
				"&[colspan]:not([colspan='1'])": { textAlign: "center" },
				[`&:not(:last-child):not(${componentCls}-selection-column):not(${componentCls}-row-expand-icon-cell):not([colspan])::before`]: {
					position: "absolute",
					top: "50%",
					insetInlineEnd: 0,
					width: 1,
					height: "1.6em",
					backgroundColor: tableHeaderCellSplitColor,
					transform: "translateY(-50%)",
					transition: `background-color ${motionDurationMid}`,
					content: "\"\""
				}
			},
			"> tr:not(:last-child) > th[colspan]": { borderBottom: 0 }
		},
		[`${componentCls}-tbody`]: { "> tr": {
			"> th, > td": {
				borderBottom: tableBorder,
				transition: [`background-color`, `border-color`].map((prop) => `${prop} ${motionDurationMid}`).join(", "),
				[`
              > ${componentCls}-wrapper:only-child,
              > ${componentCls}-expanded-row-fixed > ${componentCls}-wrapper:only-child
            `]: { [componentCls]: {
					marginBlock: unit(calc(tablePaddingVertical).mul(-1).equal()),
					marginInline: `${unit(calc(tableExpandColumnWidth).sub(tablePaddingHorizontal).equal())}
                ${unit(calc(tablePaddingHorizontal).mul(-1).equal())}`,
					[`${componentCls}-tbody > tr:last-child > td`]: {
						borderBottomWidth: 0,
						"&:first-child, &:last-child": { borderRadius: 0 }
					}
				} }
			},
			"> th": {
				position: "relative",
				color: tableHeaderTextColor,
				fontWeight: fontWeightStrong,
				textAlign: "start",
				background: tableHeaderBg,
				borderBottom: tableBorder,
				transition: `background-color ${motionDurationMid} ease`
			},
			[`& > ${componentCls}-measure-cell`]: {
				paddingBlock: `0 !important`,
				borderBlock: `0 !important`,
				[`${componentCls}-measure-cell-content`]: {
					height: 0,
					overflow: "hidden",
					pointerEvents: "none"
				}
			}
		} },
		[`${componentCls}-footer`]: {
			padding: `${unit(tablePaddingVertical)} ${unit(tablePaddingHorizontal)}`,
			color: tableFooterTextColor,
			background: tableFooterBg
		}
	} };
};
const prepareComponentToken = (token) => {
	const { colorFillAlter, colorBgContainer, colorTextHeading, colorFillSecondary, colorFillContent, controlItemBgActive, controlItemBgActiveHover, padding, paddingSM, paddingXS, colorBorderSecondary, borderRadiusLG, controlHeight, colorTextPlaceholder, fontSize, fontSizeSM, lineHeight, lineWidth, colorIcon, colorIconHover, opacityLoading, controlInteractiveSize } = token;
	const colorFillSecondarySolid = new FastColor(colorFillSecondary).onBackground(colorBgContainer).toHexString();
	const colorFillContentSolid = new FastColor(colorFillContent).onBackground(colorBgContainer).toHexString();
	const colorFillAlterSolid = new FastColor(colorFillAlter).onBackground(colorBgContainer).toHexString();
	const baseColorAction = new FastColor(colorIcon);
	const baseColorActionHover = new FastColor(colorIconHover);
	const expandIconHalfInner = controlInteractiveSize / 2 - lineWidth;
	const expandIconSize = expandIconHalfInner * 2 + lineWidth * 3;
	return {
		headerBg: colorFillAlterSolid,
		headerColor: colorTextHeading,
		headerSortActiveBg: colorFillSecondarySolid,
		headerSortHoverBg: colorFillContentSolid,
		bodySortBg: colorFillAlterSolid,
		rowHoverBg: colorFillAlterSolid,
		rowSelectedBg: controlItemBgActive,
		rowSelectedHoverBg: controlItemBgActiveHover,
		rowExpandedBg: colorFillAlter,
		cellPaddingBlock: padding,
		cellPaddingInline: padding,
		cellPaddingBlockMD: paddingSM,
		cellPaddingInlineMD: paddingXS,
		cellPaddingBlockSM: paddingXS,
		cellPaddingInlineSM: paddingXS,
		borderColor: colorBorderSecondary,
		headerBorderRadius: borderRadiusLG,
		footerBg: colorFillAlterSolid,
		footerColor: colorTextHeading,
		cellFontSize: fontSize,
		cellFontSizeMD: fontSize,
		cellFontSizeSM: fontSize,
		headerSplitColor: colorBorderSecondary,
		fixedHeaderSortActiveBg: colorFillSecondarySolid,
		headerFilterHoverBg: colorFillContent,
		filterDropdownMenuBg: colorBgContainer,
		filterDropdownBg: colorBgContainer,
		expandIconBg: colorBgContainer,
		selectionColumnWidth: controlHeight,
		stickyScrollBarBg: colorTextPlaceholder,
		stickyScrollBarBorderRadius: 100,
		expandIconMarginTop: (fontSize * lineHeight - lineWidth * 3) / 2 - Math.ceil((fontSizeSM * 1.4 - lineWidth * 3) / 2),
		headerIconColor: baseColorAction.clone().setA(baseColorAction.a * opacityLoading).toRgbString(),
		headerIconHoverColor: baseColorActionHover.clone().setA(baseColorActionHover.a * opacityLoading).toRgbString(),
		expandIconHalfInner,
		expandIconSize,
		expandIconScale: controlInteractiveSize / expandIconSize
	};
};
const zIndexTableFixed = 2;
var style_default = genStyleHooks("Table", (token) => {
	const { colorTextHeading, colorSplit, colorBgContainer, controlInteractiveSize: checkboxSize, headerBg, headerColor, headerSortActiveBg, headerSortHoverBg, bodySortBg, rowHoverBg, rowSelectedBg, rowSelectedHoverBg, rowExpandedBg, cellPaddingBlock, cellPaddingInline, cellPaddingBlockMD, cellPaddingInlineMD, cellPaddingBlockSM, cellPaddingInlineSM, borderColor, footerBg, footerColor, headerBorderRadius, cellFontSize, cellFontSizeMD, cellFontSizeSM, headerSplitColor, fixedHeaderSortActiveBg, headerFilterHoverBg, filterDropdownBg, expandIconBg, selectionColumnWidth, stickyScrollBarBg, calc } = token;
	const tableToken = mergeToken(token, {
		tableFontSize: cellFontSize,
		tableBg: colorBgContainer,
		tableRadius: headerBorderRadius,
		tablePaddingVertical: cellPaddingBlock,
		tablePaddingHorizontal: cellPaddingInline,
		tablePaddingVerticalMiddle: cellPaddingBlockMD,
		tablePaddingHorizontalMiddle: cellPaddingInlineMD,
		tablePaddingVerticalSmall: cellPaddingBlockSM,
		tablePaddingHorizontalSmall: cellPaddingInlineSM,
		tableBorderColor: borderColor,
		tableHeaderTextColor: headerColor,
		tableHeaderBg: headerBg,
		tableFooterTextColor: footerColor,
		tableFooterBg: footerBg,
		tableHeaderCellSplitColor: headerSplitColor,
		tableHeaderSortBg: headerSortActiveBg,
		tableHeaderSortHoverBg: headerSortHoverBg,
		tableBodySortBg: bodySortBg,
		tableFixedHeaderSortActiveBg: fixedHeaderSortActiveBg,
		tableHeaderFilterActiveBg: headerFilterHoverBg,
		tableFilterDropdownBg: filterDropdownBg,
		tableRowHoverBg: rowHoverBg,
		tableSelectedRowBg: rowSelectedBg,
		tableSelectedRowHoverBg: rowSelectedHoverBg,
		zIndexTableFixed,
		tableFontSizeMiddle: cellFontSizeMD,
		tableFontSizeSmall: cellFontSizeSM,
		tableSelectionColumnWidth: selectionColumnWidth,
		tableExpandIconBg: expandIconBg,
		tableExpandColumnWidth: calc(checkboxSize).add(calc(token.padding).mul(2)).equal(),
		tableExpandedRowBg: rowExpandedBg,
		tableFilterDropdownWidth: 120,
		tableFilterDropdownHeight: 264,
		tableFilterDropdownSearchWidth: 140,
		tableScrollThumbSize: 8,
		tableScrollThumbBg: stickyScrollBarBg,
		tableScrollThumbBgHover: colorTextHeading,
		tableScrollBg: colorSplit
	});
	return [
		genTableStyle(tableToken),
		pagination_default(tableToken),
		summary_default(tableToken),
		sorter_default(tableToken),
		filter_default(tableToken),
		bordered_default(tableToken),
		radius_default(tableToken),
		expand_default(tableToken),
		summary_default(tableToken),
		empty_default(tableToken),
		selection_default(tableToken),
		fixed_default(tableToken),
		sticky_default(tableToken),
		ellipsis_default(tableToken),
		size_default(tableToken),
		rtl_default(tableToken),
		virtual_default(tableToken)
	];
}, prepareComponentToken, {
	resetFont: false,
	unitless: { expandIconScale: true }
});

//#endregion
export { style_default as default, prepareComponentToken };