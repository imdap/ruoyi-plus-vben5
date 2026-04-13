//#region src/tree/style/directory.ts
function genDirectoryStyle({ treeCls, treeNodeCls, directoryNodeSelectedBg, directoryNodeSelectedColor, motionDurationMid, borderRadius, controlItemBgHover }) {
	return { [`${treeCls}${treeCls}-directory ${treeNodeCls}`]: {
		[`${treeCls}-node-content-wrapper`]: {
			position: "static",
			[`&:has(${treeCls}-drop-indicator)`]: { position: "relative" },
			[`> *:not(${treeCls}-drop-indicator)`]: { position: "relative" },
			"&:hover": { background: "transparent" },
			"&:before": {
				position: "absolute",
				inset: 0,
				transition: `background-color ${motionDurationMid}`,
				content: "\"\"",
				borderRadius
			},
			"&:hover:before": { background: controlItemBgHover }
		},
		[`${treeCls}-switcher, ${treeCls}-checkbox, ${treeCls}-draggable-icon`]: { zIndex: 1 },
		"&-selected": {
			background: directoryNodeSelectedBg,
			borderRadius,
			[`${treeCls}-switcher, ${treeCls}-draggable-icon`]: { color: directoryNodeSelectedColor },
			[`${treeCls}-node-content-wrapper`]: {
				color: directoryNodeSelectedColor,
				background: "transparent",
				"&, &:hover": { color: directoryNodeSelectedColor },
				"&:before, &:hover:before": { background: directoryNodeSelectedBg }
			}
		}
	} };
}

//#endregion
export { genDirectoryStyle };