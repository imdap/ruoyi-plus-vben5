Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_qrcodegen = require("./libs/qrcodegen.cjs");
const ERROR_LEVEL_MAP = {
	L: require_qrcodegen.Ecc.LOW,
	M: require_qrcodegen.Ecc.MEDIUM,
	Q: require_qrcodegen.Ecc.QUARTILE,
	H: require_qrcodegen.Ecc.HIGH
};
const DEFAULT_SIZE = 128;
const DEFAULT_LEVEL = "L";
const DEFAULT_BACKGROUND_COLOR = "#FFFFFF";
const DEFAULT_FRONT_COLOR = "#000000";
const DEFAULT_NEED_MARGIN = false;
const DEFAULT_MINVERSION = 1;
const SPEC_MARGIN_SIZE = 4;
const DEFAULT_MARGIN_SIZE = 0;
const DEFAULT_IMG_SCALE = .1;
function generatePath(modules, margin = 0) {
	const ops = [];
	modules.forEach((row, y) => {
		let start = null;
		row.forEach((cell, x) => {
			if (!cell && start !== null) {
				ops.push(`M${start + margin} ${y + margin}h${x - start}v1H${start + margin}z`);
				start = null;
				return;
			}
			if (x === row.length - 1) {
				if (!cell) return;
				if (start === null) ops.push(`M${x + margin},${y + margin} h1v1H${x + margin}z`);
				else ops.push(`M${start + margin},${y + margin} h${x + 1 - start}v1H${start + margin}z`);
				return;
			}
			if (cell && start === null) start = x;
		});
	});
	return ops.join("");
}
function excavateModules(modules, excavation) {
	return modules.slice().map((row, y) => {
		if (y < excavation.y || y >= excavation.y + excavation.h) return row;
		return row.map((cell, x) => {
			if (x < excavation.x || x >= excavation.x + excavation.w) return cell;
			return false;
		});
	});
}
function getImageSettings(cells, size, margin, imageSettings) {
	if (imageSettings == null) return null;
	const numCells = cells.length + margin * 2;
	const defaultSize = Math.floor(size * DEFAULT_IMG_SCALE);
	const scale = numCells / size;
	const w = (imageSettings.width || defaultSize) * scale;
	const h = (imageSettings.height || defaultSize) * scale;
	const x = imageSettings.x == null ? cells.length / 2 - w / 2 : imageSettings.x * scale;
	const y = imageSettings.y == null ? cells.length / 2 - h / 2 : imageSettings.y * scale;
	const opacity = imageSettings.opacity == null ? 1 : imageSettings.opacity;
	let excavation = null;
	if (imageSettings.excavate) {
		const floorX = Math.floor(x);
		const floorY = Math.floor(y);
		excavation = {
			x: floorX,
			y: floorY,
			w: Math.ceil(w + x - floorX),
			h: Math.ceil(h + y - floorY)
		};
	}
	const crossOrigin = imageSettings.crossOrigin;
	return {
		x,
		y,
		h,
		w,
		excavation,
		opacity,
		crossOrigin
	};
}
function getMarginSize(needMargin, marginSize) {
	if (marginSize != null) return Math.max(Math.floor(marginSize), 0);
	return needMargin ? 4 : 0;
}
const isSupportPath2d = (() => {
	try {
		new Path2D().addPath(new Path2D());
	} catch {
		return false;
	}
	return true;
})();
exports.DEFAULT_BACKGROUND_COLOR = DEFAULT_BACKGROUND_COLOR;
exports.DEFAULT_FRONT_COLOR = DEFAULT_FRONT_COLOR;
exports.DEFAULT_IMG_SCALE = DEFAULT_IMG_SCALE;
exports.DEFAULT_LEVEL = DEFAULT_LEVEL;
exports.DEFAULT_MARGIN_SIZE = DEFAULT_MARGIN_SIZE;
exports.DEFAULT_MINVERSION = DEFAULT_MINVERSION;
exports.DEFAULT_NEED_MARGIN = DEFAULT_NEED_MARGIN;
exports.DEFAULT_SIZE = DEFAULT_SIZE;
exports.ERROR_LEVEL_MAP = ERROR_LEVEL_MAP;
exports.SPEC_MARGIN_SIZE = SPEC_MARGIN_SIZE;
exports.excavateModules = excavateModules;
exports.generatePath = generatePath;
exports.getImageSettings = getImageSettings;
exports.getMarginSize = getMarginSize;
exports.isSupportPath2d = isSupportPath2d;
