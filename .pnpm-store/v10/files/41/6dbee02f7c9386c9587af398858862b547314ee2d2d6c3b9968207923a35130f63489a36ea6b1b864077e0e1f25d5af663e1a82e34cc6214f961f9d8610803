import { format } from "../util.js";
var whitespace = (rule, value, _source, errors, options) => {
	if (/^\s+$/.test(value) || value === "") errors.push(format(options.messages.whitespace, rule.fullField));
};
var whitespace_default = whitespace;
export { whitespace_default as default };
