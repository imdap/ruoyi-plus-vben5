import { num2str, trimNumber } from "@v-c/mini-decimal";
function getDecupleSteps(step) {
	const stepStr = typeof step === "number" ? num2str(step) : trimNumber(step).fullStr;
	if (!stepStr.includes(".")) return `${step}0`;
	return trimNumber(stepStr.replace(/(\d)\.(\d)/g, "$1$2.")).fullStr;
}
export { getDecupleSteps };
