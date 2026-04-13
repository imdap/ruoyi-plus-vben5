import { isEmptyValue } from "../util.js";
import rule_default from "../rule/index.js";
var ENUM = "enum";
var enumerable = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value) && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options);
		if (value !== void 0) rule_default[ENUM](rule, value, source, errors, options);
	}
	callback(errors);
};
var enum_default = enumerable;
export { enum_default as default };
