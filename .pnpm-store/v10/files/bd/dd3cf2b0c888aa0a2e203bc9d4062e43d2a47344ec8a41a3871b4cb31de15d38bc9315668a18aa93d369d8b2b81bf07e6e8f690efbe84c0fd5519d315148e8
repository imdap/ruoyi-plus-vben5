import { isEmptyValue } from "../util.js";
import rule_default from "../rule/index.js";
var object = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value) && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options);
		if (value !== void 0) rule_default.type(rule, value, source, errors, options);
	}
	callback(errors);
};
var object_default = object;
export { object_default as default };
