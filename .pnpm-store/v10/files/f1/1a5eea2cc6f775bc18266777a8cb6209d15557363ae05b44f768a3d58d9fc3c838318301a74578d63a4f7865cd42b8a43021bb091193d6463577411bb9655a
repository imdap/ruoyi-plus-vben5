import { isEmptyValue } from "../util.js";
import rule_default from "../rule/index.js";
var date = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value, "date") && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options);
		if (!isEmptyValue(value, "date")) {
			let dateObject;
			if (value instanceof Date) dateObject = value;
			else dateObject = new Date(value);
			rule_default.type(rule, dateObject, source, errors, options);
			if (dateObject) rule_default.range(rule, dateObject.getTime(), source, errors, options);
		}
	}
	callback(errors);
};
var date_default = date;
export { date_default as default };
