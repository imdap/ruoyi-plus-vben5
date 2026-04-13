import { format } from "../util.js";
var pattern = (rule, value, _source, errors, options) => {
	if (rule.pattern) {
		if (rule.pattern instanceof RegExp) {
			rule.pattern.lastIndex = 0;
			if (!rule.pattern.test(value)) errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
		} else if (typeof rule.pattern === "string") {
			if (!new RegExp(rule.pattern).test(value)) errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
		}
	}
};
var pattern_default = pattern;
export { pattern_default as default };
