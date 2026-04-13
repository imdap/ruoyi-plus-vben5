import { QrCode, QrSegment } from "../libs/qrcodegen.js";
import { ERROR_LEVEL_MAP, getImageSettings, getMarginSize } from "../utils.js";
import { computed } from "vue";
function useQRCode(ctx) {
	const memoizedQrcode = computed(() => {
		const { value, level, minVersion, boostLevel } = ctx.value;
		const segments = (Array.isArray(value) ? value : [value]).reduce((acc, val) => {
			acc.push(...QrSegment.makeSegments(val));
			return acc;
		}, []);
		return QrCode.encodeSegments(segments, ERROR_LEVEL_MAP[level], minVersion, void 0, void 0, boostLevel);
	});
	return computed(() => {
		const { includeMargin, marginSize, size, imageSettings } = ctx.value;
		const cs = memoizedQrcode.value.getModules();
		const mg = getMarginSize(includeMargin, marginSize);
		return {
			cells: cs,
			margin: mg,
			numCells: cs.length + mg * 2,
			calculatedImageSettings: getImageSettings(cs, size, mg, imageSettings),
			qrcode: memoizedQrcode.value
		};
	});
}
export { useQRCode };
