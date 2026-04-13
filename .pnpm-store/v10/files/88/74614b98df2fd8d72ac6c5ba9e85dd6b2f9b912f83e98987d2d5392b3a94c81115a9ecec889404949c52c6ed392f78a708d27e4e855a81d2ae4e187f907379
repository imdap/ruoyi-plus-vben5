import { format } from "../util.js";
var ENUM = "enum";
var enumerable = (rule, value, _source, errors, options) => {
	rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
	if (!rule[ENUM].includes(value)) errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(", ")));
};
var enum_default = enumerable;
export { enum_default as default };
