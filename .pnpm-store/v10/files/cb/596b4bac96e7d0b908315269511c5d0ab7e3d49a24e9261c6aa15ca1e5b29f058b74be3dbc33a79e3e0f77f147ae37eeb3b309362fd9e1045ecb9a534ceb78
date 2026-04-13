import { isEmptyValue } from "../util.js";
import rule_default from "../rule/index.js";
var pattern = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value, "string") && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options);
		if (!isEmptyValue(value, "string")) rule_default.pattern(rule, value, source, errors, options);
	}
	callback(errors);
};
var pattern_default = pattern;
export { pattern_default as default };
