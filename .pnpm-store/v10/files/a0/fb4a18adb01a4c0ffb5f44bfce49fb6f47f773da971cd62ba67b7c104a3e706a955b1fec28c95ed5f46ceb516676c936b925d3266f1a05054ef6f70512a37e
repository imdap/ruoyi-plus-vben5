Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_qrcodegen = require("../libs/qrcodegen.cjs");
const require_utils = require("../utils.cjs");
let vue = require("vue");
function useQRCode(ctx) {
	const memoizedQrcode = (0, vue.computed)(() => {
		const { value, level, minVersion, boostLevel } = ctx.value;
		const segments = (Array.isArray(value) ? value : [value]).reduce((acc, val) => {
			acc.push(...require_qrcodegen.QrSegment.makeSegments(val));
			return acc;
		}, []);
		return require_qrcodegen.QrCode.encodeSegments(segments, require_utils.ERROR_LEVEL_MAP[level], minVersion, void 0, void 0, boostLevel);
	});
	return (0, vue.computed)(() => {
		const { includeMargin, marginSize, size, imageSettings } = ctx.value;
		const cs = memoizedQrcode.value.getModules();
		const mg = require_utils.getMarginSize(includeMargin, marginSize);
		return {
			cells: cs,
			margin: mg,
			numCells: cs.length + mg * 2,
			calculatedImageSettings: require_utils.getImageSettings(cs, size, mg, imageSettings),
			qrcode: memoizedQrcode.value
		};
	});
}
exports.useQRCode = useQRCode;
