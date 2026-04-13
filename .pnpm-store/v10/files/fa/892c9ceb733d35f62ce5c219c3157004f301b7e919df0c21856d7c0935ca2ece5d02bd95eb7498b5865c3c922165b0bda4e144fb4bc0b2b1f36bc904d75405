//#region src/table/style/sorter.ts
const genSorterStyle = (token) => {
	const { componentCls, marginXXS, fontSizeIcon, headerIconColor, headerIconHoverColor } = token;
	return { [`${componentCls}-wrapper`]: {
		[`${componentCls}-thead th${componentCls}-column-has-sorters`]: {
			outline: "none",
			cursor: "pointer",
			transition: `all ${token.motionDurationSlow}, left 0s`,
			"&:hover": {
				background: token.tableHeaderSortHoverBg,
				"&::before": { backgroundColor: "transparent !important" }
			},
			"&:focus-visible": { color: token.colorPrimary },
			[`
          &${componentCls}-cell-fix-left:hover,
          &${componentCls}-cell-fix-right:hover
        `]: { background: token.tableFixedHeaderSortActiveBg }
		},
		[`${componentCls}-thead th${componentCls}-column-sort`]: {
			background: token.tableHeaderSortBg,
			"&::before": { backgroundColor: "transparent !important" }
		},
		[`td${componentCls}-column-sort`]: { background: token.tableBodySortBg },
		[`${componentCls}-column-title`]: {
			position: "relative",
			zIndex: 1,
			flex: 1,
			minWidth: 0
		},
		[`${componentCls}-column-sorters`]: {
			display: "flex",
			flex: "auto",
			alignItems: "center",
			justifyContent: "space-between",
			"&::after": {
				position: "absolute",
				inset: 0,
				width: "100%",
				height: "100%",
				content: "\"\""
			}
		},
		[`${componentCls}-column-sorters-tooltip-target-sorter`]: { "&::after": { content: "none" } },
		[`${componentCls}-column-sorter`]: {
			marginInlineStart: marginXXS,
			color: headerIconColor,
			fontSize: 0,
			transition: `color ${token.motionDurationSlow}`,
			"&-inner": {
				display: "inline-flex",
				flexDirection: "column",
				alignItems: "center"
			},
			"&-up, &-down": {
				fontSize: fontSizeIcon,
				"&.active": { color: token.colorPrimary }
			},
			[`${componentCls}-column-sorter-up + ${componentCls}-column-sorter-down`]: { marginTop: "-0.3em" }
		},
		[`${componentCls}-column-sorters:hover ${componentCls}-column-sorter`]: { color: headerIconHoverColor }
	} };
};
var sorter_default = genSorterStyle;

//#endregion
export { sorter_default as default };