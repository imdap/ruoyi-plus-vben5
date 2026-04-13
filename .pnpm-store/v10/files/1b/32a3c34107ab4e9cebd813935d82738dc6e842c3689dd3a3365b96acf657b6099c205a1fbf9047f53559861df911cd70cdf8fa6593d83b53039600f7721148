import { warning } from "@v-c/util";
function warningNullOptions(options, fieldNames) {
	if (options) {
		const recursiveOptions = (optionsList) => {
			for (let i = 0; i < optionsList.length; i += 1) {
				const option = optionsList[i];
				if (option[fieldNames?.value] === null) {
					warning(false, "`value` in Cascader options should not be `null`.");
					return true;
				}
				if (Array.isArray(option[fieldNames?.children]) && recursiveOptions(option[fieldNames?.children])) return true;
			}
		};
		recursiveOptions(options);
	}
}
export { warningNullOptions };
