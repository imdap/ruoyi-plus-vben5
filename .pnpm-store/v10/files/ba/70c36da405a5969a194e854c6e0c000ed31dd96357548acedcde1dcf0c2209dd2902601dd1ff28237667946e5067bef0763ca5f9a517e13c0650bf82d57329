var formatRegExp = /%[sdj%]/g;
let warning = () => {};
if (typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production" && typeof window !== "undefined" && typeof document !== "undefined") warning = (type, errors) => {
	if (typeof console !== "undefined" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING === "undefined") {
		if (errors.every((e) => typeof e === "string")) console.warn(type, errors);
	}
};
function convertFieldsError(errors) {
	if (!errors || !errors.length) return null;
	const fields = {};
	errors.forEach((error) => {
		const field = error.field;
		fields[field] = fields[field] || [];
		fields[field].push(error);
	});
	return fields;
}
function format(template, ...args) {
	let i = 0;
	const len = args.length;
	if (typeof template === "function") return template.apply(null, args);
	if (typeof template === "string") return template.replace(formatRegExp, (x) => {
		if (x === "%%") return "%";
		if (i >= len) return x;
		switch (x) {
			case "%s": return String(args[i++]);
			case "%d": return Number(args[i++]);
			case "%j":
				try {
					return JSON.stringify(args[i++]);
				} catch (_) {
					return "[Circular]";
				}
				break;
			default: return x;
		}
	});
	return template;
}
function isNativeStringType(type) {
	return type === "string" || type === "url" || type === "hex" || type === "email" || type === "date" || type === "pattern" || type === "tel";
}
function isEmptyValue(value, type) {
	if (value === void 0 || value === null) return true;
	if (type === "array" && Array.isArray(value) && !value.length) return true;
	if (isNativeStringType(type) && typeof value === "string" && !value) return true;
	return false;
}
function isEmptyObject(obj) {
	return Object.keys(obj).length === 0;
}
function asyncParallelArray(arr, func, callback) {
	const results = [];
	let total = 0;
	const arrLength = arr.length;
	function count(errors) {
		results.push(...errors || []);
		total++;
		if (total === arrLength) callback(results);
	}
	arr.forEach((a) => {
		func(a, count);
	});
}
function asyncSerialArray(arr, func, callback) {
	let index = 0;
	const arrLength = arr.length;
	function next(errors) {
		if (errors && errors.length) {
			callback(errors);
			return;
		}
		const original = index;
		index = index + 1;
		if (original < arrLength) func(arr[original], next);
		else callback([]);
	}
	next([]);
}
function flattenObjArr(objArr) {
	const ret = [];
	Object.keys(objArr).forEach((k) => {
		ret.push(...objArr[k] || []);
	});
	return ret;
}
var AsyncValidationError = class extends Error {
	errors;
	fields;
	constructor(errors, fields) {
		super("Async Validation Error");
		this.errors = errors;
		this.fields = fields;
	}
};
function asyncMap(objArr, option, func, callback, source) {
	if (option.first) {
		const pending$1 = new Promise((resolve, reject) => {
			const next = (errors) => {
				callback(errors);
				return errors.length ? reject(new AsyncValidationError(errors, convertFieldsError(errors))) : resolve(source);
			};
			asyncSerialArray(flattenObjArr(objArr), func, next);
		});
		pending$1.catch((e) => e);
		return pending$1;
	}
	const firstFields = option.firstFields === true ? Object.keys(objArr) : option.firstFields || [];
	const objArrKeys = Object.keys(objArr);
	const objArrLength = objArrKeys.length;
	let total = 0;
	const results = [];
	const pending = new Promise((resolve, reject) => {
		const next = (errors) => {
			results.push.apply(results, errors);
			total++;
			if (total === objArrLength) {
				callback(results);
				return results.length ? reject(new AsyncValidationError(results, convertFieldsError(results))) : resolve(source);
			}
		};
		if (!objArrKeys.length) {
			callback(results);
			resolve(source);
		}
		objArrKeys.forEach((key) => {
			const arr = objArr[key];
			if (firstFields.includes(key)) asyncSerialArray(arr, func, next);
			else asyncParallelArray(arr, func, next);
		});
	});
	pending.catch((e) => e);
	return pending;
}
function isErrorObj(obj) {
	return !!(obj && obj.message !== void 0);
}
function getValue(value, path) {
	let v = value;
	for (let i = 0; i < path.length; i++) {
		if (v === void 0 || v === null) return v;
		v = v[path[i]];
	}
	return v;
}
function complementError(rule, source) {
	return (oe) => {
		let fieldValue;
		if (rule.fullFields) fieldValue = getValue(source, rule.fullFields);
		else fieldValue = source[oe.field || rule.fullField];
		if (isErrorObj(oe)) {
			oe.field = oe.field || rule.fullField;
			oe.fieldValue = fieldValue;
			return oe;
		}
		return {
			message: typeof oe === "function" ? oe() : oe,
			fieldValue,
			field: oe.field || rule.fullField
		};
	};
}
function deepMerge(target, source) {
	if (source) {
		for (const s in source) if (source.hasOwnProperty(s)) {
			const value = source[s];
			if (typeof value === "object" && typeof target[s] === "object") target[s] = {
				...target[s],
				...value
			};
			else target[s] = value;
		}
	}
	return target;
}
export { AsyncValidationError, asyncMap, complementError, convertFieldsError, deepMerge, format, isEmptyObject, isEmptyValue, warning };
