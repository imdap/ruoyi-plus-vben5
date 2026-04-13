import { format, isEmptyValue } from "../util.js";
var required = (rule, value, source, errors, options, type) => {
	if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) errors.push(format(options.messages.required, rule.fullField));
};
var required_default = required;
export { required_default as default };
