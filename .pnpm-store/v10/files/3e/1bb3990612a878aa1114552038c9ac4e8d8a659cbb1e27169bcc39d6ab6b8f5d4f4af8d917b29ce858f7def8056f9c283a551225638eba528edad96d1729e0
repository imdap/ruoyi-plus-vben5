import { format } from "../util.js";
import required_default from "./required.js";
import url_default from "./url.js";
var pattern = {
	email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
	tel: /^(\+[0-9]{1,3}[-\s\u2011]?)?(\([0-9]{1,4}\)[-\s\u2011]?)?([0-9]+[-\s\u2011]?)*[0-9]+$/,
	hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};
var types = {
	integer(value) {
		return types.number(value) && parseInt(value, 10) === value;
	},
	float(value) {
		return types.number(value) && !types.integer(value);
	},
	array(value) {
		return Array.isArray(value);
	},
	regexp(value) {
		if (value instanceof RegExp) return true;
		try {
			return true;
		} catch (e) {
			return false;
		}
	},
	date(value) {
		return typeof value.getTime === "function" && typeof value.getMonth === "function" && typeof value.getYear === "function" && !isNaN(value.getTime());
	},
	number(value) {
		if (isNaN(value)) return false;
		return typeof value === "number";
	},
	object(value) {
		return typeof value === "object" && !types.array(value);
	},
	method(value) {
		return typeof value === "function";
	},
	email(value) {
		return typeof value === "string" && value.length <= 320 && !!value.match(pattern.email);
	},
	tel(value) {
		return typeof value === "string" && value.length <= 32 && !!value.match(pattern.tel);
	},
	url(value) {
		return typeof value === "string" && value.length <= 2048 && !!value.match(url_default());
	},
	hex(value) {
		return typeof value === "string" && !!value.match(pattern.hex);
	}
};
var type = (rule, value, source, errors, options) => {
	if (rule.required && value === void 0) {
		required_default(rule, value, source, errors, options);
		return;
	}
	const custom = [
		"integer",
		"float",
		"array",
		"regexp",
		"object",
		"method",
		"email",
		"tel",
		"number",
		"date",
		"url",
		"hex"
	];
	const ruleType = rule.type;
	if (custom.includes(ruleType)) {
		if (!types[ruleType](value)) errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
	} else {
		const comparableType = getComparableType(ruleType);
		if (comparableType && !matchesTypeof(comparableType, value)) errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
	}
};
var TYPEOF_TYPES = [
	"undefined",
	"object",
	"boolean",
	"number",
	"string",
	"function",
	"symbol",
	"bigint"
];
function getComparableType(type$1) {
	return TYPEOF_TYPES.includes(type$1) ? type$1 : null;
}
function matchesTypeof(type$1, value) {
	switch (type$1) {
		case "undefined": return typeof value === "undefined";
		case "object": return typeof value === "object";
		case "boolean": return typeof value === "boolean";
		case "number": return typeof value === "number";
		case "string": return typeof value === "string";
		case "function": return typeof value === "function";
		case "symbol": return typeof value === "symbol";
		case "bigint": return typeof value === "bigint";
		default: return false;
	}
}
var type_default = type;
export { type_default as default };
