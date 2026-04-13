import { supportBigInt } from "./supportUtil.js";
import { trimNumber } from "./numberUtil.js";
import BigIntDecimal from "./BigIntDecimal.js";
import NumberDecimal from "./NumberDecimal.js";
function getMiniDecimal(value) {
	if (supportBigInt()) return new BigIntDecimal(value);
	return new NumberDecimal(value);
}
function toFixed(numStr, separatorStr, precision, cutOnly = false) {
	if (numStr === "") return "";
	const { negativeStr, integerStr, decimalStr } = trimNumber(numStr);
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
export { BigIntDecimal, NumberDecimal, getMiniDecimal as default, toFixed };
