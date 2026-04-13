import { defaultValidateMessages } from "./messages.js";
import { createVNode, isVNode } from "vue";
import { warning } from "@v-c/util/dist/warning";
import { merge } from "@v-c/util/dist/utils/set";
import RawAsyncValidator from "@v-c/async-validator";

//#region src/form/utils/validateUtil.ts
const AsyncValidator = RawAsyncValidator;
/**
* Replace with template.
*   `I'm ${name}` + { name: 'bamboo' } = I'm bamboo
*/
function replaceMessage(template, kv) {
	return template.replace(/\\?\$\{\w+\}/g, (str) => {
		if (str.startsWith("\\")) return str.slice(1);
		return kv[str.slice(2, -1)];
	});
}
const CODE_LOGIC_ERROR = "CODE_LOGIC_ERROR";
async function validateRule(name, value, rule, options, messageVariables) {
	const cloneRule = { ...rule };
	delete cloneRule.ruleIndex;
	delete cloneRule.trigger;
	delete cloneRule.validateTrigger;
	AsyncValidator.warning = () => void 0;
	if (cloneRule.validator) {
		const originValidator = cloneRule.validator;
		cloneRule.validator = (...args) => {
			try {
				return originValidator(...args);
			} catch (error) {
				console.error(error);
				return Promise.reject(CODE_LOGIC_ERROR);
			}
		};
	}
	let subRuleField = null;
	if (cloneRule && cloneRule.type === "array" && cloneRule.defaultField) {
		subRuleField = cloneRule.defaultField;
		delete cloneRule.defaultField;
	}
	const validator = new AsyncValidator({ [name]: [cloneRule] });
	const messages = merge(defaultValidateMessages, options.validateMessages);
	validator.messages(messages);
	let result = [];
	try {
		await Promise.resolve(validator.validate({ [name]: value }, { ...options }));
	} catch (errObj) {
		if (errObj.errors) result = errObj.errors.map(({ message }, index) => {
			const mergedMessage = message === CODE_LOGIC_ERROR ? messages.default : message;
			return isVNode(mergedMessage) ? createVNode(mergedMessage, { key: `error_${index}` }) : mergedMessage;
		});
	}
	if (!result.length && subRuleField && Array.isArray(value) && value.length > 0) return (await Promise.all(value.map((subValue, i) => validateRule(`${name}.${i}`, subValue, subRuleField, options, messageVariables)))).reduce((prev, errors) => [...prev, ...errors], []);
	const kv = {
		...rule,
		name,
		label: messageVariables && messageVariables.label ? messageVariables.label : name,
		enum: (rule.enum || []).join(", "),
		...messageVariables
	};
	return result.map((error) => {
		if (typeof error === "string") return replaceMessage(error, kv);
		return error;
	});
}
/**
* We use `async-validator` to validate the value.
* But only check one value in a time to avoid namePath validate issue.
*/
function validateRules(namePath, value, rules, options, validateFirst, messageVariables) {
	const name = namePath.join(".");
	const filledRules = rules.map((currentRule, ruleIndex) => {
		const originValidatorFunc = currentRule.validator;
		const cloneRule = {
			...currentRule,
			ruleIndex
		};
		if (originValidatorFunc) cloneRule.validator = (rule, val, callback) => {
			let hasPromise = false;
			const wrappedCallback = (...args) => {
				Promise.resolve().then(() => {
					warning(!hasPromise, "Your validator function has already return a promise. `callback` will be ignored.");
					if (!hasPromise) callback(...args);
				});
			};
			const promise = originValidatorFunc(rule, val, wrappedCallback);
			hasPromise = promise && typeof promise.then === "function" && typeof promise.catch === "function";
			/**
			* 1. Use promise as the first priority.
			* 2. If promise not exist, use callback with warning instead
			*/
			warning(hasPromise, "`callback` is deprecated. Please return a promise instead.");
			if (hasPromise) promise.then(() => {
				callback();
			}).catch((err) => {
				callback(err || " ");
			});
		};
		return cloneRule;
	}).sort(({ warningOnly: w1, ruleIndex: i1 }, { warningOnly: w2, ruleIndex: i2 }) => {
		if (!!w1 === !!w2) return i1 - i2;
		if (w1) return 1;
		return -1;
	});
	let summaryPromise;
	if (validateFirst === true) summaryPromise = new Promise(async (resolve, reject) => {
		for (let i = 0; i < filledRules.length; i += 1) {
			const rule = filledRules[i];
			const errors = await validateRule(name, value, rule, options, messageVariables);
			if (errors.length) {
				reject([{
					errors,
					rule
				}]);
				return;
			}
		}
		resolve([]);
	});
	else {
		const rulePromises = filledRules.map((rule) => validateRule(name, value, rule, options, messageVariables).then((errors) => ({
			errors,
			rule
		})));
		summaryPromise = (validateFirst ? finishOnFirstFailed(rulePromises) : finishOnAllFailed(rulePromises)).then((errors) => {
			return Promise.reject(errors);
		});
	}
	summaryPromise.catch((e) => e);
	return summaryPromise;
}
async function finishOnAllFailed(rulePromises) {
	return Promise.all(rulePromises).then((errorsList) => {
		return [].concat(...errorsList);
	});
}
async function finishOnFirstFailed(rulePromises) {
	let count = 0;
	return new Promise((resolve) => {
		rulePromises.forEach((promise) => {
			promise.then((ruleError) => {
				if (ruleError.errors.length) resolve([ruleError]);
				count += 1;
				if (count === rulePromises.length) resolve([]);
			});
		});
	});
}

//#endregion
export { validateRules };