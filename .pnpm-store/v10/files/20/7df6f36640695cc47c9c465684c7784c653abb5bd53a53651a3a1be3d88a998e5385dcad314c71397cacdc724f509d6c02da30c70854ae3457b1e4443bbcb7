import calculator_default from "./calculator.js";

//#region src/theme/calc/NumCalculator.ts
var NumCalculator = class NumCalculator extends calculator_default {
	result = 0;
	constructor(num) {
		super();
		if (num instanceof NumCalculator) this.result = num.result;
		else if (typeof num === "number") this.result = num;
	}
	add(num) {
		if (num instanceof NumCalculator) this.result += num.result;
		else if (typeof num === "number") this.result += num;
		return this;
	}
	sub(num) {
		if (num instanceof NumCalculator) this.result -= num.result;
		else if (typeof num === "number") this.result -= num;
		return this;
	}
	mul(num) {
		if (num instanceof NumCalculator) this.result *= num.result;
		else if (typeof num === "number") this.result *= num;
		return this;
	}
	div(num) {
		if (num instanceof NumCalculator) this.result /= num.result;
		else if (typeof num === "number") this.result /= num;
		return this;
	}
	equal() {
		return this.result;
	}
};

//#endregion
export { NumCalculator as default };