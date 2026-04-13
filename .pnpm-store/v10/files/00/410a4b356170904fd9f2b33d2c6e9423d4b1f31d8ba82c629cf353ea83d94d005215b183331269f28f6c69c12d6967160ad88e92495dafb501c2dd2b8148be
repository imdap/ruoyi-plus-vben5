import AbstractCalculator from "./calculator.js";
import CSSCalculator from "./CSSCalculator.js";
import NumCalculator from "./NumCalculator.js";

//#region src/theme/calc/index.d.ts
declare function genCalc(type: 'css' | 'js', unitlessCssVar: Set<string>): (num: number | string | AbstractCalculator) => CSSCalculator | NumCalculator;
//#endregion
export { genCalc as default };