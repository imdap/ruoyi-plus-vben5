import calculator_default from "./calculator.js";
import { isNumber } from "../../util/index.js";

//#region src/theme/calc/CSSCalculator.ts
const CALC_UNIT = "CALC_UNIT";
const regexp = new RegExp(CALC_UNIT, "g");
function unit(value) {
	if (isNumber(value)) return `${value}${CALC_UNIT}`;
	return value;
}
var CSSCalculator = class CSSCalculator extends calculator_default {
	result = "";
	unitlessCssVar;
	lowPriority;
	constructor(num, unitlessCssVar) {
		super();
		const numType = typeof num;
		this.unitlessCssVar = unitlessCssVar;
		if (num instanceof CSSCalculator) this.result = `(${num.result})`;
		else if (isNumber(num)) this.result = unit(num);
		else if (numType === "string") this.result = num;
	}
	add(num) {
		if (num instanceof CSSCalculator) this.result = `${this.result} + ${num.getResult()}`;
		else if (typeof num === "number" || typeof num === "string") this.result = `${this.result} + ${unit(num)}`;
		this.lowPriority = true;
		return this;
	}
	sub(num) {
		if (num instanceof CSSCalculator) this.result = `${this.result} - ${num.getResult()}`;
		else if (typeof num === "number" || typeof num === "string") this.result = `${this.result} - ${unit(num)}`;
		this.lowPriority = true;
		return this;
	}
	mul(num) {
		if (this.lowPriority) this.result = `(${this.result})`;
		if (num instanceof CSSCalculator) this.result = `${this.result} * ${num.getResult(true)}`;
		else if (typeof num === "number" || typeof num === "string") this.result = `${this.result} * ${num}`;
		this.lowPriority = false;
		return this;
	}
	div(num) {
		if (this.lowPriority) this.result = `(${this.result})`;
		if (num instanceof CSSCalculator) this.result = `${this.result} / ${num.getResult(true)}`;
		else if (typeof num === "number" || typeof num === "string") this.result = `${this.result} / ${num}`;
		this.lowPriority = false;
		return this;
	}
	getResult(force) {
		return this.lowPriority || force ? `(${this.result})` : this.result;
	}
	equal(options) {
		const { unit: cssUnit } = options || {};
		let mergedUnit = true;
		if (typeof cssUnit === "boolean") mergedUnit = cssUnit;
		else if (Array.from(this.unitlessCssVar).some((cssVar) => this.result.includes(cssVar))) mergedUnit = false;
		this.result = this.result.replace(regexp, mergedUnit ? "px" : "");
		if (typeof this.lowPriority !== "undefined") return `calc(${this.result})`;
		return this.result;
	}
};

//#endregion
export { CSSCalculator as default };