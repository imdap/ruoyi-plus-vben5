Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
var targetOffset = [0, 0];
var basePlacements = {
	left: {
		points: ["cr", "cl"],
		offset: [-8, 0]
	},
	right: {
		points: ["cl", "cr"],
		offset: [8, 0]
	},
	top: {
		points: ["bc", "tc"],
		offset: [0, -8]
	},
	bottom: {
		points: ["tc", "bc"],
		offset: [0, 8]
	},
	topLeft: {
		points: ["bl", "tl"],
		offset: [0, -8]
	},
	leftTop: {
		points: ["tr", "tl"],
		offset: [-8, 0]
	},
	topRight: {
		points: ["br", "tr"],
		offset: [0, -8]
	},
	rightTop: {
		points: ["tl", "tr"],
		offset: [8, 0]
	},
	bottomRight: {
		points: ["tr", "br"],
		offset: [0, 8]
	},
	rightBottom: {
		points: ["bl", "br"],
		offset: [8, 0]
	},
	bottomLeft: {
		points: ["tl", "bl"],
		offset: [0, 8]
	},
	leftBottom: {
		points: ["br", "bl"],
		offset: [-8, 0]
	}
};
function getPlacements(arrowPointAtCenter = false) {
	const placements$1 = {};
	Object.keys(basePlacements).forEach((key) => {
		placements$1[key] = {
			...basePlacements[key],
			autoArrow: arrowPointAtCenter,
			targetOffset
		};
	});
	return placements$1;
}
const placements = getPlacements();
exports.getPlacements = getPlacements;
exports.placements = placements;
