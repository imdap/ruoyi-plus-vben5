var autoAdjustOverflowTopBottom = {
	shiftX: 64,
	adjustY: 1
};
var autoAdjustOverflowLeftRight = {
	adjustX: 1,
	shiftY: true
};
var targetOffset = [0, 0];
const placements = {
	left: {
		points: ["cr", "cl"],
		overflow: autoAdjustOverflowLeftRight,
		offset: [-4, 0],
		targetOffset
	},
	right: {
		points: ["cl", "cr"],
		overflow: autoAdjustOverflowLeftRight,
		offset: [4, 0],
		targetOffset
	},
	top: {
		points: ["bc", "tc"],
		overflow: autoAdjustOverflowTopBottom,
		offset: [0, -4],
		targetOffset
	},
	bottom: {
		points: ["tc", "bc"],
		overflow: autoAdjustOverflowTopBottom,
		offset: [0, 4],
		targetOffset
	},
	topLeft: {
		points: ["bl", "tl"],
		overflow: autoAdjustOverflowTopBottom,
		offset: [0, -4],
		targetOffset
	},
	leftTop: {
		points: ["tr", "tl"],
		overflow: autoAdjustOverflowLeftRight,
		offset: [-4, 0],
		targetOffset
	},
	topRight: {
		points: ["br", "tr"],
		overflow: autoAdjustOverflowTopBottom,
		offset: [0, -4],
		targetOffset
	},
	rightTop: {
		points: ["tl", "tr"],
		overflow: autoAdjustOverflowLeftRight,
		offset: [4, 0],
		targetOffset
	},
	bottomRight: {
		points: ["tr", "br"],
		overflow: autoAdjustOverflowTopBottom,
		offset: [0, 4],
		targetOffset
	},
	rightBottom: {
		points: ["bl", "br"],
		overflow: autoAdjustOverflowLeftRight,
		offset: [4, 0],
		targetOffset
	},
	bottomLeft: {
		points: ["tl", "bl"],
		overflow: autoAdjustOverflowTopBottom,
		offset: [0, 4],
		targetOffset
	},
	leftBottom: {
		points: ["br", "bl"],
		overflow: autoAdjustOverflowLeftRight,
		offset: [-4, 0],
		targetOffset
	}
};
var placements_default = placements;
export { placements_default as default, placements };
