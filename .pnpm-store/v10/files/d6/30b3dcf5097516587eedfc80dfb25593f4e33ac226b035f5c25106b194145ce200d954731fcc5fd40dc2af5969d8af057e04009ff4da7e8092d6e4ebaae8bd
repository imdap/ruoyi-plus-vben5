import CSSCalculator from "./CSSCalculator.js";
import NumCalculator from "./NumCalculator.js";

//#region src/theme/calc/index.ts
function genCalc(type, unitlessCssVar) {
	const Calculator = type === "css" ? CSSCalculator : NumCalculator;
	return (num) => new Calculator(num, unitlessCssVar);
}
var calc_default = genCalc;

//#endregion
export { calc_default as default };