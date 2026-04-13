import rule_default from "../rule/index.js";
var required = (rule, value, callback, source, options) => {
	const errors = [];
	const type = Array.isArray(value) ? "array" : typeof value;
	rule_default.required(rule, value, source, errors, options, type);
	callback(errors);
};
var required_default = required;
export { required_default as default };
