import { getAttrStyleAndClass } from "../../_util/hooks/useMergeSemantic.js";
import isNonNullable_default from "../../_util/isNonNullable.js";
import { NoStyleItemContextProvider, useFormContext } from "../context.js";
import { getStatus } from "../util.js";
import row_default from "../../grid/row.js";
import FormItemInput_default from "../FormItemInput.js";
import FormItemLabel_default from "../FormItemLabel.js";
import StatusProvider_default from "./StatusProvider.js";
import { computed, createVNode, defineComponent, mergeProps, nextTick, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import isVisible from "@v-c/util/dist/Dom/isVisible";

//#region src/form/FormItem/ItemHolder.tsx
const ItemHolder = /* @__PURE__ */ defineComponent((props, { attrs, slots }) => {
	const itemPrefixCls = computed(() => `${props.prefixCls}-item`);
	const formContext = useFormContext();
	const layout = computed(() => props?.layout ?? formContext.value?.layout);
	const vertical = computed(() => layout.value === "vertical");
	const itemRef = shallowRef();
	const hasHelp = computed(() => isNonNullable_default(props.help));
	const hasError = computed(() => !!(hasHelp.value || props?.errors?.length || props?.warnings?.length));
	const isOnScreen = computed(() => !!itemRef.value && isVisible(itemRef.value));
	const marginBottom = shallowRef();
	watch([hasError, isOnScreen], async () => {
		await nextTick();
		if (hasError.value && itemRef.value) {
			const itemStyle = getComputedStyle(itemRef.value);
			marginBottom.value = Number.parseInt(itemStyle.marginBottom, 10);
		}
	}, { immediate: true });
	const onErrorVisibleChanged = (visible) => {
		if (!visible) marginBottom.value = null;
	};
	function getValidateState(isDebounce = false) {
		return getStatus(isDebounce ? props?.errors : props?.meta?.errors, isDebounce ? props?.warnings : props?.meta?.warnings, props?.meta, "", !!props?.hasFeedback, props?.validateStatus);
	}
	return () => {
		const mergedValidateStatus = getValidateState();
		const { prefixCls, rootClass, hasFeedback, hidden, fieldId, required, isRequired, meta, help, onSubItemMetaChange, name } = props;
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const debounceErrors = props?.errors;
		const debounceWarnings = props?.warnings;
		const itemClassName = clsx(itemPrefixCls.value, className, rootClass, {
			[`${itemPrefixCls.value}-with-help`]: hasHelp.value || debounceErrors.length || debounceWarnings.length,
			[`${itemPrefixCls.value}-has-feedback`]: mergedValidateStatus && hasFeedback,
			[`${itemPrefixCls.value}-has-success`]: mergedValidateStatus === "success",
			[`${itemPrefixCls.value}-has-warning`]: mergedValidateStatus === "warning",
			[`${itemPrefixCls.value}-has-error`]: mergedValidateStatus === "error",
			[`${itemPrefixCls.value}-is-validating`]: mergedValidateStatus === "validating",
			[`${itemPrefixCls.value}-hidden`]: hidden,
			[`${itemPrefixCls.value}-${layout.value}`]: layout.value
		});
		return createVNode("div", {
			"class": itemClassName,
			"style": style,
			"ref": itemRef
		}, [createVNode(row_default, mergeProps({ "class": `${itemPrefixCls.value}-row` }, restAttrs), { default: () => [createVNode(FormItemLabel_default, mergeProps(props, {
			"htmlFor": props.htmlFor ?? fieldId,
			"requiredMark": formContext.value?.requiredMark,
			"required": required ?? isRequired,
			"prefixCls": prefixCls,
			"vertical": vertical.value
		}), null), createVNode(FormItemInput_default, mergeProps(props, meta, {
			"errors": debounceErrors,
			"warnings": debounceWarnings,
			"prefixCls": prefixCls,
			"status": mergedValidateStatus,
			"help": help,
			"marginBottom": marginBottom.value,
			"onErrorVisibleChanged": onErrorVisibleChanged
		}), { default: () => [createVNode(NoStyleItemContextProvider, { "value": onSubItemMetaChange }, { default: () => [createVNode(StatusProvider_default, {
			"prefixCls": prefixCls,
			"meta": meta,
			"errors": meta.errors,
			"warnings": meta.warnings,
			"hasFeedback": hasFeedback,
			"validateStatus": mergedValidateStatus,
			"name": name
		}, { default: () => [slots?.default?.()] })] })] })] }), !!marginBottom.value && createVNode("div", {
			"class": `${itemPrefixCls.value}-margin-offset`,
			"style": { marginBottom: `${-marginBottom.value}px` }
		}, null)]);
	};
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
		},
		errors: {
			type: Array,
			required: true
		},
		warnings: {
			type: Array,
			required: true
		},
		meta: {
			type: Object,
			required: true
		},
		isRequired: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onSubItemMetaChange: {
			type: Function,
			required: true
		}
	},
	name: "FormItemHolder",
	inheritAttrs: false
});
var ItemHolder_default = ItemHolder;

//#endregion
export { ItemHolder_default as default };