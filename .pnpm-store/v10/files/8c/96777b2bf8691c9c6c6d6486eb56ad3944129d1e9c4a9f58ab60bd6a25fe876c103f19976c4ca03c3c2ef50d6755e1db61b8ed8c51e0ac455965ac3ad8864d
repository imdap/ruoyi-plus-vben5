import { getNumberPrecision, isEmpty, num2str } from "./numberUtil.js";
var NumberDecimal = class NumberDecimal {
	origin = "";
	number = 0;
	empty = false;
	constructor(value) {
		if (isEmpty(value)) {
			this.empty = true;
			return;
		}
		this.origin = String(value);
		this.number = Number(value);
	}
	negate() {
		return new NumberDecimal(-this.toNumber());
	}
	add(value) {
		if (this.isInvalidate()) return new NumberDecimal(value);
		const target = Number(value);
		if (Number.isNaN(target)) return this;
		const number = this.number + target;
		if (number > Number.MAX_SAFE_INTEGER) return new NumberDecimal(Number.MAX_SAFE_INTEGER);
		if (number < Number.MIN_SAFE_INTEGER) return new NumberDecimal(Number.MIN_SAFE_INTEGER);
		const maxPrecision = Math.max(getNumberPrecision(this.number), getNumberPrecision(target));
		return new NumberDecimal(number.toFixed(maxPrecision));
	}
	multi(value) {
		const target = Number(value);
		if (this.isInvalidate() || Number.isNaN(target)) return new NumberDecimal(NaN);
		const number = this.number * target;
		if (number > Number.MAX_SAFE_INTEGER) return new NumberDecimal(Number.MAX_SAFE_INTEGER);
		if (number < Number.MIN_SAFE_INTEGER) return new NumberDecimal(Number.MIN_SAFE_INTEGER);
		const maxPrecision = Math.max(getNumberPrecision(this.number), getNumberPrecision(target));
		return new NumberDecimal(number.toFixed(maxPrecision));
	}
	isEmpty() {
		return this.empty;
	}
	isNaN() {
		return Number.isNaN(this.number);
	}
	isInvalidate() {
		return this.isEmpty() || this.isNaN();
	}
	equals(target) {
		return this.toNumber() === target?.toNumber();
	}
	lessEquals(target) {
		return this.add(target.negate().toString()).toNumber() <= 0;
	}
	toNumber() {
		return this.number;
	}
	toString(safe = true) {
		if (!safe) return this.origin;
		if (this.isInvalidate()) return "";
		return num2str(this.number);
	}
};
export { NumberDecimal as default };
