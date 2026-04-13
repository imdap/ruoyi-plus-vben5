import { isEmptyValue } from "../util.js";
import rule_default from "../rule/index.js";
var integer = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value) && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options);
		if (value !== void 0) {
			rule_default.type(rule, value, source, errors, options);
			rule_default.range(rule, value, source, errors, options);
		}
	}
	callback(errors);
};
var integer_default = integer;
export { integer_default as default };
