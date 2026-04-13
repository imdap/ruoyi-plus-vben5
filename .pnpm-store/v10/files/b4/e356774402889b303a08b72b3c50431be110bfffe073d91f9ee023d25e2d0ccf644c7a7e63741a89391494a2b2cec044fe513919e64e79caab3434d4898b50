var FORMAT_KEYS = [
	"YYYY",
	"MM",
	"DD",
	"HH",
	"mm",
	"ss",
	"SSS"
];
var REPLACE_KEY = "顧";
var MaskFormat = class {
	format;
	maskFormat;
	cells;
	maskCells;
	constructor(format) {
		this.format = format;
		const replaceKeys = FORMAT_KEYS.map((key) => `(${key})`).join("|");
		const replaceReg = new RegExp(replaceKeys, "g");
		this.maskFormat = format.replace(replaceReg, (key) => REPLACE_KEY.repeat(key.length));
		const cellReg = /* @__PURE__ */ new RegExp(`(${FORMAT_KEYS.join("|")})`);
		const strCells = (format.split(cellReg) || []).filter((str) => str);
		let offset = 0;
		this.cells = strCells.map((text) => {
			const mask = FORMAT_KEYS.includes(text);
			const start = offset;
			const end = offset + text.length;
			offset = end;
			return {
				text,
				mask,
				start,
				end
			};
		});
		this.maskCells = this.cells.filter((cell) => cell.mask);
	}
	getSelection(maskCellIndex) {
		const { start, end } = this.maskCells[maskCellIndex] || {};
		return [start || 0, end || 0];
	}
	match(text) {
		for (let i = 0; i < this.maskFormat.length; i += 1) {
			const maskChar = this.maskFormat[i];
			const textChar = text[i];
			if (!textChar || maskChar !== REPLACE_KEY && maskChar !== textChar) return false;
		}
		return true;
	}
	size() {
		return this.maskCells.length;
	}
	getMaskCellIndex(anchorIndex) {
		let closetDist = Number.MAX_SAFE_INTEGER;
		let closetIndex = 0;
		for (let i = 0; i < this.maskCells.length; i += 1) {
			const { start, end } = this.maskCells[i];
			if (anchorIndex >= start && anchorIndex <= end) return i;
			const dist = Math.min(Math.abs(anchorIndex - start), Math.abs(anchorIndex - end));
			if (dist < closetDist) {
				closetDist = dist;
				closetIndex = i;
			}
		}
		return closetIndex;
	}
};
export { MaskFormat as default };
