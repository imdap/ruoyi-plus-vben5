import { isEmptyValue } from "../util.js";
import rule_default from "../rule/index.js";
var string = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value, "string") && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options, "string");
		if (!isEmptyValue(value, "string")) {
			rule_default.type(rule, value, source, errors, options);
			rule_default.range(rule, value, source, errors, options);
			rule_default.pattern(rule, value, source, errors, options);
			if (rule.whitespace === true) rule_default.whitespace(rule, value, source, errors, options);
		}
	}
	callback(errors);
};
var string_default = string;
export { string_default as default };
