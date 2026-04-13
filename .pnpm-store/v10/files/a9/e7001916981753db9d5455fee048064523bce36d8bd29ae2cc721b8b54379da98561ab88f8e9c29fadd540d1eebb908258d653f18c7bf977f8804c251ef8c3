import { isE, isEmpty, num2str, trimNumber, validateNumber } from "./numberUtil.js";
var BigIntDecimal = class BigIntDecimal {
	origin = "";
	negative = false;
	integer = 0n;
	decimal = 0n;
	decimalLen = 0;
	empty = false;
	nan = false;
	constructor(value) {
		if (isEmpty(value)) {
			this.empty = true;
			return;
		}
		this.origin = String(value);
		if (value === "-" || Number.isNaN(value)) {
			this.nan = true;
			return;
		}
		let mergedValue = value;
		if (isE(mergedValue)) mergedValue = Number(mergedValue);
		mergedValue = typeof mergedValue === "string" ? mergedValue : num2str(mergedValue);
		if (validateNumber(mergedValue)) {
			const trimRet = trimNumber(mergedValue);
			this.negative = trimRet.negative;
			const numbers = trimRet.trimStr.split(".");
			this.integer = BigInt(numbers[0]);
			const decimalStr = numbers[1] || "0";
			this.decimal = BigInt(decimalStr);
			this.decimalLen = decimalStr.length;
		} else this.nan = true;
	}
	getMark() {
		return this.negative ? "-" : "";
	}
	getIntegerStr() {
		return this.integer.toString();
	}
	getDecimalStr() {
		return this.decimal.toString().padStart(this.decimalLen, "0");
	}
	alignDecimal(decimalLength) {
		const str = `${this.getMark()}${this.getIntegerStr()}${this.getDecimalStr().padEnd(decimalLength, "0")}`;
		return BigInt(str);
	}
	negate() {
		const clone = new BigIntDecimal(this.toString());
		clone.negative = !clone.negative;
		return clone;
	}
	cal(offset, calculator, calDecimalLen) {
		const maxDecimalLength = Math.max(this.getDecimalStr().length, offset.getDecimalStr().length);
		const valueStr = calculator(this.alignDecimal(maxDecimalLength), offset.alignDecimal(maxDecimalLength)).toString();
		const nextDecimalLength = calDecimalLen(maxDecimalLength);
		const { negativeStr, trimStr } = trimNumber(valueStr);
		const hydrateValueStr = `${negativeStr}${trimStr.padStart(nextDecimalLength + 1, "0")}`;
		return new BigIntDecimal(`${hydrateValueStr.slice(0, -nextDecimalLength)}.${hydrateValueStr.slice(-nextDecimalLength)}`);
	}
	add(value) {
		if (this.isInvalidate()) return new BigIntDecimal(value);
		const offset = new BigIntDecimal(value);
		if (offset.isInvalidate()) return this;
		return this.cal(offset, (num1, num2) => num1 + num2, (len) => len);
	}
	multi(value) {
		const target = new BigIntDecimal(value);
		if (this.isInvalidate() || target.isInvalidate()) return new BigIntDecimal(NaN);
		return this.cal(target, (num1, num2) => num1 * num2, (len) => len * 2);
	}
	isEmpty() {
		return this.empty;
	}
	isNaN() {
		return this.nan;
	}
	isInvalidate() {
		return this.isEmpty() || this.isNaN();
	}
	equals(target) {
		return this.toString() === target?.toString();
	}
	lessEquals(target) {
		return this.add(target.negate().toString()).toNumber() <= 0;
	}
	toNumber() {
		if (this.isNaN()) return NaN;
		return Number(this.toString());
	}
	toString(safe = true) {
		if (!safe) return this.origin;
		if (this.isInvalidate()) return "";
		return trimNumber(`${this.getMark()}${this.getIntegerStr()}.${this.getDecimalStr()}`).fullStr;
	}
};
export { BigIntDecimal as default };
