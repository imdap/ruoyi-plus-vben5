import { resetComponent } from "../../style/index.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/table/style/filter.ts
const genFilterStyle = (token) => {
	const { componentCls, antCls, iconCls, tableFilterDropdownWidth, tableFilterDropdownSearchWidth, paddingXXS, paddingXS, colorText, lineWidth, lineType, tableBorderColor, headerIconColor, fontSizeSM, tablePaddingHorizontal, borderRadius, motionDurationSlow, colorIcon, colorPrimary, tableHeaderFilterActiveBg, colorTextDisabled, tableFilterDropdownBg, tableFilterDropdownHeight, controlItemBgHover, controlItemBgActive, boxShadowSecondary, filterDropdownMenuBg, calc } = token;
	const dropdownPrefixCls = `${antCls}-dropdown`;
	const tableFilterDropdownPrefixCls = `${componentCls}-filter-dropdown`;
	const treePrefixCls = `${antCls}-tree`;
	const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
	return [
		{ [`${componentCls}-wrapper`]: {
			[`${componentCls}-filter-column`]: {
				display: "flex",
				justifyContent: "space-between"
			},
			[`${componentCls}-filter-trigger`]: {
				position: "relative",
				display: "flex",
				alignItems: "center",
				marginBlock: calc(paddingXXS).mul(-1).equal(),
				marginInline: `${unit(paddingXXS)} ${unit(calc(tablePaddingHorizontal).div(2).mul(-1).equal())}`,
				padding: `0 ${unit(paddingXXS)}`,
				color: headerIconColor,
				fontSize: fontSizeSM,
				borderRadius,
				cursor: "pointer",
				transition: `all ${motionDurationSlow}`,
				"&:hover": {
					color: colorIcon,
					background: tableHeaderFilterActiveBg
				},
				"&.active": { color: colorPrimary }
			}
		} },
		{ [`${antCls}-dropdown`]: { [tableFilterDropdownPrefixCls]: {
			...resetComponent(token),
			minWidth: tableFilterDropdownWidth,
			backgroundColor: tableFilterDropdownBg,
			borderRadius,
			boxShadow: boxShadowSecondary,
			overflow: "hidden",
			[`${dropdownPrefixCls}-menu`]: {
				maxHeight: tableFilterDropdownHeight,
				overflowX: "hidden",
				border: 0,
				boxShadow: "none",
				borderRadius: "unset",
				backgroundColor: filterDropdownMenuBg,
				"&:empty::after": {
					display: "block",
					padding: `${unit(paddingXS)} 0`,
					color: colorTextDisabled,
					fontSize: fontSizeSM,
					textAlign: "center",
					content: "\"Not Found\""
				}
			},
			[`${tableFilterDropdownPrefixCls}-tree`]: {
				paddingBlock: `${unit(paddingXS)} 0`,
				paddingInline: paddingXS,
				[treePrefixCls]: { padding: 0 },
				[`${treePrefixCls}-treenode ${treePrefixCls}-node-content-wrapper:hover`]: { backgroundColor: controlItemBgHover },
				[`${treePrefixCls}-treenode-checkbox-checked ${treePrefixCls}-node-content-wrapper`]: { "&, &:hover": { backgroundColor: controlItemBgActive } }
			},
			[`${tableFilterDropdownPrefixCls}-search`]: {
				padding: paddingXS,
				borderBottom: tableBorder,
				"&-input": {
					input: { minWidth: tableFilterDropdownSearchWidth },
					[iconCls]: { color: colorTextDisabled }
				}
			},
			[`${tableFilterDropdownPrefixCls}-checkall`]: {
				width: "100%",
				marginBottom: paddingXXS,
				marginInlineStart: paddingXXS
			},
			[`${tableFilterDropdownPrefixCls}-btns`]: {
				display: "flex",
				justifyContent: "space-between",
				padding: `${unit(calc(paddingXS).sub(lineWidth).equal())} ${unit(paddingXS)}`,
				overflow: "hidden",
				borderTop: tableBorder
			}
		} } },
		{ [`${antCls}-dropdown ${tableFilterDropdownPrefixCls}, ${tableFilterDropdownPrefixCls}-submenu`]: {
			[`${antCls}-checkbox-wrapper + span`]: {
				paddingInlineStart: paddingXS,
				color: colorText
			},
			"> ul": {
				maxHeight: "calc(100vh - 130px)",
				overflowX: "hidden",
				overflowY: "auto"
			}
		} }
	];
};
var filter_default = genFilterStyle;

//#endregion
export { filter_default as default };