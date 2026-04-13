import { isEmptyValue } from "../util.js";
import rule_default from "../rule/index.js";
var regexp = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value) && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options);
		if (!isEmptyValue(value)) rule_default.type(rule, value, source, errors, options);
	}
	callback(errors);
};
var regexp_default = regexp;
export { regexp_default as default };
