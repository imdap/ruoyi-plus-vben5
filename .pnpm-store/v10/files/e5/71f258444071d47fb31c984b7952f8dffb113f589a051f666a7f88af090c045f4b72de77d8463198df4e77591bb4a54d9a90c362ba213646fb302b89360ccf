Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_supportUtil = require("./supportUtil.cjs");
const require_numberUtil = require("./numberUtil.cjs");
const require_BigIntDecimal = require("./BigIntDecimal.cjs");
const require_NumberDecimal = require("./NumberDecimal.cjs");
function getMiniDecimal(value) {
	if (require_supportUtil.supportBigInt()) return new require_BigIntDecimal.default(value);
	return new require_NumberDecimal.default(value);
}
function toFixed(numStr, separatorStr, precision, cutOnly = false) {
	if (numStr === "") return "";
	const { negativeStr, integerStr, decimalStr } = require_numberUtil.trimNumber(numStr);
	const precisionDecimalStr = `${separatorStr}${decimalStr}`;
	const numberWithoutDecimal = `${negativeStr}${integerStr}`;
	if (typeof precision === "number" && precision >= 0) {
		const advancedNum = Number(decimalStr[precision]);
		if (advancedNum >= 5 && !cutOnly) return toFixed(getMiniDecimal(numStr).add(`${negativeStr}0.${"0".repeat(precision)}${10 - advancedNum}`).toString(), separatorStr, precision, cutOnly);
		if (precision === 0) return numberWithoutDecimal;
		return `${numberWithoutDecimal}${separatorStr}${decimalStr.padEnd(precision, "0").slice(0, precision)}`;
	}
	if (precisionDecimalStr === ".0") return numberWithoutDecimal;
	return `${numberWithoutDecimal}${precisionDecimalStr}`;
}
exports.BigIntDecimal = require_BigIntDecimal.default;
exports.NumberDecimal = require_NumberDecimal.default;
exports.default = getMiniDecimal;
exports.toFixed = toFixed;
