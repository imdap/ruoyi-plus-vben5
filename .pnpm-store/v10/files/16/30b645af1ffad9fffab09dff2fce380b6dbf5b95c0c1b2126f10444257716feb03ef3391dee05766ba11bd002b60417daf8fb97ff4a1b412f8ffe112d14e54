//#region src/select/mergedBuiltinPlacements.ts
function getBuiltInPlacements(popupOverflow) {
	const sharedConfig = {
		overflow: {
			adjustX: true,
			adjustY: true,
			shiftY: true
		},
		htmlRegion: popupOverflow === "scroll" ? "scroll" : "visible",
		dynamicInset: true
	};
	return {
		bottomLeft: {
			...sharedConfig,
			points: ["tl", "bl"],
			offset: [0, 4]
		},
		bottomRight: {
			...sharedConfig,
			points: ["tr", "br"],
			offset: [0, 4]
		},
		topLeft: {
			...sharedConfig,
			points: ["bl", "tl"],
			offset: [0, -4]
		},
		topRight: {
			...sharedConfig,
			points: ["br", "tr"],
			offset: [0, -4]
		}
	};
}
function mergedBuiltinPlacements(buildInPlacements, popupOverflow) {
	return buildInPlacements || getBuiltInPlacements(popupOverflow);
}
var mergedBuiltinPlacements_default = mergedBuiltinPlacements;

//#endregion
export { mergedBuiltinPlacements_default as default };