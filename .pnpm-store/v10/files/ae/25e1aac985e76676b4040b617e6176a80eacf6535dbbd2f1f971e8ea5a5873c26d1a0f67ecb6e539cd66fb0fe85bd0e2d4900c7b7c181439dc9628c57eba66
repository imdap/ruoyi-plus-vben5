import rule_default from "../rule/index.js";
var array = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if ((value === void 0 || value === null) && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options, "array");
		if (value !== void 0 && value !== null) {
			rule_default.type(rule, value, source, errors, options);
			rule_default.range(rule, value, source, errors, options);
		}
	}
	callback(errors);
};
var array_default = array;
export { array_default as default };
