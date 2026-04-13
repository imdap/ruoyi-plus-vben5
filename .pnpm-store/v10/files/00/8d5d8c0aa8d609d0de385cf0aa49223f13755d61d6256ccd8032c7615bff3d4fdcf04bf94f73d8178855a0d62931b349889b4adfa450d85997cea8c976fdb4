import { format } from "../util.js";
var range = (rule, value, _source, errors, options) => {
	const len = typeof rule.len === "number";
	const min = typeof rule.min === "number";
	const max = typeof rule.max === "number";
	const spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
	let val = value;
	let key = null;
	const num = typeof value === "number";
	const str = typeof value === "string";
	const arr = Array.isArray(value);
	if (num) key = "number";
	else if (str) key = "string";
	else if (arr) key = "array";
	if (!key) return false;
	if (arr) val = value.length;
	if (str) val = value.replace(spRegexp, "_").length;
	if (len) {
		if (val !== rule.len) errors.push(format(options.messages[key].len, rule.fullField, rule.len));
	} else if (min && !max && val < rule.min) errors.push(format(options.messages[key].min, rule.fullField, rule.min));
	else if (max && !min && val > rule.max) errors.push(format(options.messages[key].max, rule.fullField, rule.max));
	else if (min && max && (val < rule.min || val > rule.max)) errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
};
var range_default = range;
export { range_default as default };
