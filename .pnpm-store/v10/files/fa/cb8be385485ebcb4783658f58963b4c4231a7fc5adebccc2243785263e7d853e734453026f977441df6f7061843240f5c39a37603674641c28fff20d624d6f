import { isEmptyValue } from "../util.js";
import rule_default from "../rule/index.js";
var any = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value) && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options);
	}
	callback(errors);
};
var any_default = any;
export { any_default as default };
