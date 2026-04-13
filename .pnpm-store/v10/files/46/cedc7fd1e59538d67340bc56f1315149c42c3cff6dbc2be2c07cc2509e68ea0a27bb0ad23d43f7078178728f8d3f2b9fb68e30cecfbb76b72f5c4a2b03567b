import { useComponentBaseConfig } from "../../config-provider/context.js";
import { getSlotPropsFnRun } from "../../_util/tools.js";
import useCSSVarCls_default from "../../config-provider/hooks/useCSSVarCls.js";
import { checkRenderNode } from "../../_util/vueNode.js";
import { useFormContext, useFormItemProvider, useNoStyleItemContext } from "../context.js";
import { getFieldId, initialValueFormat, toArray } from "../util.js";
import style_default from "../style/index.js";
import { getNamePath, getValue, setValue } from "../utils/valueUtil.js";
import { validateRules } from "../utils/validateUtil.js";
import StatusProvider_default from "./StatusProvider.js";
import ItemHolder_default from "./ItemHolder.js";
import { computed, createVNode, defineComponent, isVNode, mergeProps, onBeforeUnmount, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/form/FormItem/index.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const NAME_SPLIT = "__SPLIT__";
function genEmptyMeta() {
	return {
		errors: [],
		warnings: [],
		touched: false,
		validating: false,
		name: [],
		validated: false
	};
}
const InternalFormItem = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const formContext = useFormContext();
	const mergedValidateTrigger = computed(() => {
		const { trigger, validateTrigger } = props;
		return validateTrigger !== void 0 ? validateTrigger : trigger !== void 0 ? trigger : formContext.value?.validateTrigger;
	});
	const { prefixCls } = useComponentBaseConfig("form", props);
	const notifyParentMetaChange = useNoStyleItemContext();
	const hasName = computed(() => !(props.name === void 0 || props.name === null));
	const namePath = computed(() => hasName.value ? getNamePath(props.name) : []);
	const fieldId = computed(() => getFieldId(namePath.value, formContext.value?.name));
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const meta = shallowRef({
		...genEmptyMeta(),
		name: namePath.value
	});
	watch(namePath, (val, prev) => {
		const pathChanged = !!(props.noStyle && notifyParentMetaChange && prev?.length && (prev.length !== val.length || prev.some((seg, index) => seg !== val[index])));
		if (pathChanged) notifyParentMetaChange({
			...meta.value,
			name: prev,
			destroy: true
		}, prev);
		const nextMeta = {
			...meta.value,
			name: val
		};
		meta.value = nextMeta;
		if (pathChanged) notifyParentMetaChange(nextMeta, val);
	});
	const errors = shallowRef([]);
	const warnings = shallowRef([]);
	const validateDisabled = shallowRef(false);
	const subFieldErrors = shallowRef({});
	const initialValue = shallowRef(initialValueFormat(formContext.value?.getFieldValue?.(namePath.value)));
	const mergedRules = computed(() => {
		const collectedRules = [];
		const formRules = formContext.value?.rules ? getValue(formContext.value.rules, namePath.value) : void 0;
		if (formRules) collectedRules.push(...Array.isArray(formRules) ? formRules : [formRules]);
		if (props.rules) collectedRules.push(...props.rules);
		if (props.required !== void 0) {
			let ruleType = collectedRules.find((r) => r.type)?.type;
			if (!ruleType) {
				const currentValue = hasName.value ? formContext.value?.getFieldValue?.(namePath.value) ?? getValue(formContext.value?.model ?? {}, namePath.value) : void 0;
				if (typeof currentValue === "number") ruleType = "number";
				else if (typeof currentValue === "boolean") ruleType = "boolean";
				else if (Array.isArray(currentValue)) ruleType = "array";
			}
			const requiredRule = {
				required: !!props.required,
				...ruleType ? { type: ruleType } : {}
			};
			if (mergedValidateTrigger.value !== void 0) requiredRule.validateTrigger = mergedValidateTrigger.value || [];
			collectedRules.push(requiredRule);
		}
		return collectedRules;
	});
	const isRequired = computed(() => mergedRules.value.some((rule) => rule?.required && !rule?.warningOnly));
	const messageVariables = computed(() => {
		let variables = {};
		if (typeof props.label === "string") variables.label = props.label;
		else if (props.name) variables.label = Array.isArray(props.name) ? props.name.join(".") : String(props.name);
		if (props.messageVariables) variables = {
			...variables,
			...props.messageVariables
		};
		return variables;
	});
	const fieldValue = computed(() => {
		if (!hasName.value) return void 0;
		if (formContext.value?.getFieldValue) return formContext.value.getFieldValue(namePath.value);
		return getValue(formContext.value?.model ?? {}, namePath.value);
	});
	const updateMeta = (state) => {
		meta.value = {
			...meta.value,
			...state
		};
		if (props.noStyle && notifyParentMetaChange) notifyParentMetaChange(meta.value, meta.value.name);
	};
	const getRuleTrigger = (rule) => {
		const ruleTrigger = rule.validateTrigger ?? rule.trigger;
		if (ruleTrigger !== void 0) return ruleTrigger;
		if (mergedValidateTrigger.value !== void 0) return mergedValidateTrigger.value;
		return "change";
	};
	const getRuleTriggerList = (rule) => {
		const ruleTrigger = getRuleTrigger(rule);
		if (ruleTrigger === false) return [];
		return toArray(ruleTrigger);
	};
	const validateRulesInner = (options = {}) => {
		if (!namePath.value.length) return Promise.resolve();
		let filteredRules = mergedRules.value;
		const { triggerName } = options;
		if (triggerName) if (mergedValidateTrigger.value === false) filteredRules = [];
		else filteredRules = filteredRules.filter((rule) => {
			return getRuleTriggerList(rule).includes(triggerName);
		});
		if (!filteredRules.length) {
			errors.value = [];
			warnings.value = [];
			updateMeta({
				errors: [],
				warnings: [],
				validating: false,
				validated: true
			});
			formContext.value?.onValidate?.(namePath.value, true, null);
			formContext.value?.triggerFieldsChange?.([namePath.value]);
			return Promise.resolve();
		}
		updateMeta({
			validating: true,
			validated: true
		});
		return validateRules(namePath.value, fieldValue.value, filteredRules, {
			validateMessages: formContext.value?.validateMessages,
			...options
		}, props.validateFirst ?? false, messageVariables.value).catch((e) => e).then((results = []) => {
			const mergedErrors = [];
			const mergedWarnings = [];
			results.forEach(({ rule: { warningOnly }, errors: ruleErrors }) => {
				if (warningOnly) mergedWarnings.push(...ruleErrors);
				else mergedErrors.push(...ruleErrors);
			});
			errors.value = mergedErrors;
			warnings.value = mergedWarnings;
			updateMeta({
				errors: mergedErrors,
				warnings: mergedWarnings,
				validating: false,
				validated: true,
				touched: meta.value.touched
			});
			formContext.value?.onValidate?.(namePath.value, mergedErrors.length === 0, mergedErrors.length ? mergedErrors : null);
			formContext.value?.triggerFieldsChange?.([namePath.value]);
			if (mergedErrors.length) return Promise.reject(results);
			return results;
		});
	};
	const triggerValidate = (triggerName) => {
		if (mergedValidateTrigger.value === false) return;
		if (!mergedRules.value.some((rule) => getRuleTriggerList(rule).includes(triggerName))) return;
		validateRulesInner({ triggerName }).catch((e) => e);
	};
	const clearValidate = () => {
		errors.value = [];
		warnings.value = [];
		updateMeta({
			errors: [],
			warnings: [],
			validating: false
		});
	};
	const resetField = () => {
		validateDisabled.value = true;
		errors.value = [];
		warnings.value = [];
		updateMeta({
			errors: [],
			warnings: [],
			validating: false,
			touched: false,
			validated: false
		});
		if (hasName.value && formContext.value?.model) {
			const newStore = setValue(formContext.value.model, namePath.value, initialValueFormat(initialValue.value));
			Object.assign(formContext.value.model, newStore);
		}
	};
	const onFieldBlur = () => {
		updateMeta({ touched: true });
		triggerValidate("blur");
	};
	const onFieldChange = () => {
		updateMeta({ touched: true });
		triggerValidate("change");
	};
	const onFieldFocus = () => {
		updateMeta({ touched: true });
		triggerValidate("focus");
	};
	watch(fieldValue, (val, prev) => {
		if (!hasName.value) return;
		if (validateDisabled.value) {
			validateDisabled.value = false;
			return;
		}
		if (!meta.value.touched && val !== prev) updateMeta({ touched: true });
		formContext.value?.triggerValuesChange?.(namePath.value, val);
		triggerValidate("change");
	}, { immediate: false });
	const onSubItemMetaChange = (subMeta, uniqueKeys) => {
		const clone = { ...subFieldErrors.value };
		const mergedNameKey = [...subMeta.name.slice(0, -1), ...uniqueKeys].join(NAME_SPLIT);
		if (subMeta.destroy) delete clone[mergedNameKey];
		else clone[mergedNameKey] = subMeta;
		subFieldErrors.value = clone;
	};
	const mergedErrorList = computed(() => {
		const errorList = [...errors.value];
		const warningList = [...warnings.value];
		Object.values(subFieldErrors.value).forEach((subFieldError) => {
			errorList.push(...subFieldError.errors || []);
			warningList.push(...subFieldError.warnings || []);
		});
		return {
			errors: errorList,
			warnings: warningList
		};
	});
	const rootClassName = computed(() => clsx(cssVarCls.value, rootCls.value, hashId.value, props.rootClass));
	const eventKey = computed(() => `form-item-${fieldId.value || namePath.value.join("-") || Math.random().toString(36).slice(2)}`);
	watch(hasName, (val, _, onCleanup) => {
		if (val && formContext.value?.addField) {
			formContext.value.addField(eventKey.value, {
				onFieldBlur,
				namePath: () => namePath.value,
				getValue: () => fieldValue.value,
				getMeta: () => meta.value,
				rules: () => mergedRules.value,
				validateRules: (options) => validateRulesInner(options),
				resetField,
				clearValidate,
				setFieldState: (state) => {
					if (state.errors) errors.value = state.errors;
					if (state.warnings) warnings.value = state.warnings;
					updateMeta({
						...meta.value,
						...state,
						errors: state.errors ?? meta.value.errors,
						warnings: state.warnings ?? meta.value.warnings
					});
				}
			});
			onCleanup(() => {
				formContext.value?.removeField?.(eventKey.value);
			});
		} else formContext.value?.removeField?.(eventKey.value);
	}, { immediate: true });
	onBeforeUnmount(() => {
		if (props.noStyle && notifyParentMetaChange) notifyParentMetaChange({
			...meta.value,
			destroy: true
		}, meta.value.name);
		formContext.value?.removeField?.(eventKey.value);
	});
	useFormItemProvider({
		fieldId,
		triggerBlur: onFieldBlur,
		triggerChange: onFieldChange,
		clearValidate,
		triggerFocus: onFieldFocus
	});
	return () => {
		return renderLayout(checkRenderNode(filterEmpty(slots.default?.() ?? [])), fieldId.value, isRequired.value);
	};
	function renderLayout(baseChildren, currentFieldId, isRequiredMark) {
		if (Array.isArray(baseChildren) && baseChildren.length === 1 && isVNode(baseChildren[0]) || isVNode(baseChildren)) {
			const child = isVNode(baseChildren) ? baseChildren : baseChildren[0];
			const childProps = child.props || {};
			const _onBlur = childProps.onBlur;
			const _onFocus = childProps.onFocus;
			if (_onBlur) delete child.props.onBlur;
			if (_onFocus) delete child.props.onFocus;
			baseChildren = createVNode(child, {
				id: childProps.id || currentFieldId,
				onBlur: (...args) => {
					onFieldBlur();
					if (_onBlur) if (Array.isArray(_onBlur)) _onBlur.forEach((fn) => {
						if (typeof fn === "function") fn(...args);
					});
					else _onBlur?.(...args);
				},
				onFocus: (...args) => {
					onFieldFocus();
					if (_onFocus) if (Array.isArray(_onFocus)) _onFocus.forEach((fn) => {
						if (typeof fn === "function") fn(...args);
					});
					else _onFocus?.(...args);
				}
			});
		}
		if (props.noStyle && !props.hidden) return createVNode(StatusProvider_default, {
			"prefixCls": prefixCls.value,
			"hasFeedback": props.hasFeedback,
			"validateStatus": props.validateStatus,
			"meta": meta.value,
			"errors": mergedErrorList.value.errors,
			"warnings": mergedErrorList.value.warnings,
			"noStyle": true,
			"name": props.name
		}, _isSlot(baseChildren) ? baseChildren : { default: () => [baseChildren] });
		const tooltipSlotValue = getSlotPropsFnRun(slots, props, "tooltip", false, props.tooltip);
		let mergedTooltip = props.tooltip;
		if (tooltipSlotValue !== void 0) if (!!(props.tooltip && typeof props.tooltip === "object" && !Array.isArray(props.tooltip) && !isVNode(props.tooltip))) mergedTooltip = !!(tooltipSlotValue && typeof tooltipSlotValue === "object" && !Array.isArray(tooltipSlotValue) && !isVNode(tooltipSlotValue)) ? {
			...props.tooltip,
			...tooltipSlotValue
		} : {
			...props.tooltip,
			title: tooltipSlotValue
		};
		else mergedTooltip = tooltipSlotValue;
		return createVNode(ItemHolder_default, mergeProps(props, {
			"tooltip": mergedTooltip,
			"label": getSlotPropsFnRun(slots, props, "label"),
			"extra": getSlotPropsFnRun(slots, props, "extra"),
			"help": getSlotPropsFnRun(slots, props, "help")
		}, attrs, {
			"rootClass": rootClassName.value,
			"prefixCls": prefixCls.value,
			"fieldId": currentFieldId,
			"isRequired": isRequiredMark,
			"errors": mergedErrorList.value.errors,
			"warnings": mergedErrorList.value.warnings,
			"meta": meta.value,
			"onSubItemMetaChange": onSubItemMetaChange,
			"layout": props.layout,
			"name": props.name
		}), { default: () => [createVNode(StatusProvider_default, {
			"prefixCls": prefixCls.value,
			"meta": meta.value,
			"errors": mergedErrorList.value.errors,
			"warnings": mergedErrorList.value.warnings,
			"hasFeedback": props.hasFeedback,
			"validateStatus": props.validateStatus,
			"name": props.name
		}, _isSlot(baseChildren) ? baseChildren : { default: () => [baseChildren] })] });
	}
}, {
	props: {
		name: { required: false },
		rules: {
			type: Array,
			required: false
		},
		trigger: {
			type: [String, Array],
			required: false
		},
		validateTrigger: {
			type: [
				String,
				Array,
				Boolean
			],
			required: false,
			default: void 0
		},
		validateDebounce: {
			type: Number,
			required: false
		},
		validateFirst: {
			type: [Boolean, String],
			required: false,
			default: void 0
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		colon: {
			type: Boolean,
			required: false,
			default: void 0
		},
		htmlFor: {
			type: String,
			required: false
		},
		label: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		labelAlign: {
			type: String,
			required: false
		},
		labelCol: {
			type: Object,
			required: false
		},
		tooltip: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean
			],
			required: false,
			default: void 0
		},
		vertical: {
			type: Boolean,
			required: false,
			default: void 0
		},
		wrapperCol: {
			type: Object,
			required: false
		},
		extra: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		status: {
			type: String,
			required: false
		},
		help: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		fieldId: {
			type: String,
			required: false
		},
		noStyle: {
			type: Boolean,
			required: false,
			default: void 0
		},
		id: {
			type: String,
			required: false
		},
		hasFeedback: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		validateStatus: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false,
			default: void 0
		},
		hidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		messageVariables: {
			type: Object,
			required: false
		},
		layout: {
			type: String,
			required: false
		}
	},
	name: "AFormItem",
	inheritAttrs: false
});
var FormItem_default = InternalFormItem;

//#endregion
export { FormItem_default as default };