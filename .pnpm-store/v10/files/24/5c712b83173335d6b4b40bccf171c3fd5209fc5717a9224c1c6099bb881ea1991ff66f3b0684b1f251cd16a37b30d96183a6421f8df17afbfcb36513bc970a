Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_supportUtil = require("./supportUtil.cjs");
function isEmpty(value) {
	return !value && value !== 0 && !Number.isNaN(value) || !String(value).trim();
}
function trimNumber(numStr) {
	let str = numStr.trim();
	let negative = str.startsWith("-");
	if (negative) str = str.slice(1);
	str = str.replace(/(\.\d*[^0])0*$/, "$1").replace(/\.0*$/, "").replace(/^0+/, "");
	if (str.startsWith(".")) str = `0${str}`;
	const trimStr = str || "0";
	const splitNumber = trimStr.split(".");
	const integerStr = splitNumber[0] || "0";
	const decimalStr = splitNumber[1] || "0";
	if (integerStr === "0" && decimalStr === "0") negative = false;
	const negativeStr = negative ? "-" : "";
	return {
		negative,
		negativeStr,
		trimStr,
		integerStr,
		decimalStr,
		fullStr: `${negativeStr}${trimStr}`
	};
}
function isE(number) {
	const str = String(number);
	return !Number.isNaN(Number(str)) && str.includes("e");
}
function getNumberPrecision(number) {
	const numStr = String(number);
	if (isE(number)) {
		let precision = Number(numStr.slice(numStr.indexOf("e-") + 2));
		const decimalMatch = numStr.match(/\.(\d+)/);
		if (decimalMatch?.[1]) precision += decimalMatch[1].length;
		return precision;
	}
	return numStr.includes(".") && validateNumber(numStr) ? numStr.length - numStr.indexOf(".") - 1 : 0;
}
function num2str(number) {
	let numStr = String(number);
	if (isE(number)) {
		if (number > Number.MAX_SAFE_INTEGER) return String(require_supportUtil.supportBigInt() ? BigInt(number).toString() : Number.MAX_SAFE_INTEGER);
		if (number < Number.MIN_SAFE_INTEGER) return String(require_supportUtil.supportBigInt() ? BigInt(number).toString() : Number.MIN_SAFE_INTEGER);
		numStr = number.toFixed(getNumberPrecision(numStr));
	}
	return trimNumber(numStr).fullStr;
}
function validateNumber(num) {
	if (typeof num === "number") return !Number.isNaN(num);
	if (!num) return false;
	return /^\s*-?\d+(\.\d+)?\s*$/.test(num) || /^\s*-?\d+\.\s*$/.test(num) || /^\s*-?\.\d+\s*$/.test(num);
}
exports.getNumberPrecision = getNumberPrecision;
exports.isE = isE;
exports.isEmpty = isEmpty;
exports.num2str = num2str;
exports.trimNumber = trimNumber;
exports.validateNumber = validateNumber;
