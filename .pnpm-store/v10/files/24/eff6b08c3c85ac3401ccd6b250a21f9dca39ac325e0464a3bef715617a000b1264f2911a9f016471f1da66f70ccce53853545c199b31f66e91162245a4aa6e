import { isEmptyValue } from "../util.js";
import rule_default from "../rule/index.js";
var type = (rule, value, callback, source, options) => {
	const ruleType = rule.type;
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value, ruleType) && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options, ruleType);
		if (!isEmptyValue(value, ruleType)) rule_default.type(rule, value, source, errors, options);
	}
	callback(errors);
};
var type_default = type;
export { type_default as default };
