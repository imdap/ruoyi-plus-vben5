import { toPathOptions } from "../utils/treeUtil.js";
function useMissingValues(options, fieldNames) {
	return (rawValues) => {
		const missingValues = [];
		const existsValues = [];
		rawValues.forEach((valueCell) => {
			if (toPathOptions(valueCell, options.value, fieldNames.value).every((opt) => opt.option)) existsValues.push(valueCell);
			else missingValues.push(valueCell);
		});
		return [existsValues, missingValues];
	};
}
export { useMissingValues as default };
