import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { getAttrStyleAndClass as getAttrStyleAndClass$1, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import { useDisabledContext } from "../config-provider/DisabledContext.js";
import isNonNullable_default from "../_util/isNonNullable.js";
import { TARGET_CLS } from "../_util/wave/interface.js";
import wave_default from "../_util/wave/index.js";
import { checkRenderNode } from "../_util/vueNode.js";
import { useFormItemContext, useFormItemInputContext } from "../form/context.js";
import useBubbleLock from "./useBubbleLock.js";
import style_default from "./style/index.js";
import { isValueEqual } from "../_util/isEqual.js";
import { useGroupContext } from "./GroupContext.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, nextTick, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
import { omit } from "es-toolkit";
import VcCheckbox from "@v-c/checkbox";

//#region src/checkbox/Checkbox.tsx
const InternalCheckbox = /* @__PURE__ */ defineComponent((props, { slots, emit, attrs, expose }) => {
	const { direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, prefixCls } = useComponentBaseConfig("checkbox", props);
	const { classes, styles } = toPropsRefs$1(props, "classes", "styles");
	const checkboxGroup = useGroupContext();
	const formItemInputContext = useFormItemInputContext();
	const formItemContext = useFormItemContext();
	const contextDisabled = useDisabledContext();
	const mergedDisabled = computed(() => (checkboxGroup?.value?.disabled || props?.disabled) ?? contextDisabled.value);
	const mergedCheckedValue = computed(() => props.checkedValue ?? true);
	const mergedUnCheckedValue = computed(() => props.unCheckedValue ?? false);
	const currentValue = shallowRef(props?.checked ?? props?.defaultChecked ?? mergedUnCheckedValue.value);
	watch(() => props.checked, (newChecked) => {
		currentValue.value = newChecked ?? mergedUnCheckedValue.value;
	});
	const isChecked = computed(() => isValueEqual(currentValue.value, mergedCheckedValue.value));
	const mergedChecked = computed(() => {
		if (checkboxGroup?.value && !props.skipGroup) return checkboxGroup.value.value.includes?.(props.value);
		return isChecked.value;
	});
	const mergedProps = computed(() => {
		return {
			...props,
			disabled: mergedDisabled.value,
			checked: mergedChecked.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const prevValue = shallowRef(props.value);
	const checkboxRef = shallowRef();
	if (isDev) devUseWarning("Checkbox")("checked" in props || !!checkboxGroup?.value || !("value" in props), "usage", "`value` is not a valid prop, do you mean `checked`?");
	watch([() => props.value, () => props?.skipGroup], (_n, _o, onCleanup) => {
		if (props.skipGroup || !checkboxGroup?.value) return;
		if (prevValue.value !== props.value) {
			checkboxGroup?.value?.registerValue?.(props.value);
			prevValue.value = props.value;
		}
		onCleanup(() => {
			checkboxGroup?.value?.cancelValue?.(prevValue.value);
		});
	});
	if (checkboxGroup?.value) checkboxGroup?.value?.registerValue?.(prevValue.value);
	watch(() => props.indeterminate, async () => {
		await nextTick();
		if (checkboxRef.value) {
			if (checkboxRef.value?.input) checkboxRef.value.input.indeterminate = props.indeterminate;
		}
	}, { immediate: true });
	const rootCls = useCSSVarCls_default(prefixCls);
	const isControlled = computed(() => props.checked !== void 0);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const [onLabelClick, onInputClick] = useBubbleLock((e) => {
		emit("click", e);
	});
	const keys = [
		"prefixCls",
		"rootClass",
		"indeterminate",
		"skipGroup",
		"disabled",
		"classes",
		"styles",
		"checkedValue",
		"unCheckedValue"
	];
	expose({
		blur: () => checkboxRef.value?.blur?.(),
		focus: () => checkboxRef.value?.focus?.(),
		input: computed(() => checkboxRef.value?.input)
	});
	return () => {
		const { skipGroup, rootClass, indeterminate } = props;
		const children = checkRenderNode(filterEmpty(slots?.default?.() ?? []));
		const { className, style, restAttrs } = getAttrStyleAndClass$1(attrs);
		const checkboxProps = { ...omit(props, keys) };
		const inGroup = checkboxGroup?.value && !skipGroup;
		if (inGroup) {
			checkboxProps.onChange = (checked) => {
				emit("change", checked);
			};
			checkboxProps.name = checkboxGroup.value?.name;
			checkboxProps.checked = mergedChecked.value;
		} else checkboxProps.checked = mergedChecked.value;
		const classString = clsx(`${prefixCls.value}-wrapper`, {
			[`${prefixCls.value}-rtl`]: direction.value === "rtl",
			[`${prefixCls.value}-wrapper-checked`]: checkboxProps.checked,
			[`${prefixCls.value}-wrapper-disabled`]: mergedDisabled.value,
			[`${prefixCls.value}-wrapper-in-form-item`]: formItemInputContext.value?.isFormItemInput
		}, contextClassName.value, className, mergedClassNames.value.root, rootClass, cssVarCls.value, rootCls.value, hashId.value);
		const checkboxClass = clsx(mergedClassNames.value.icon, { [`${prefixCls.value}-indeterminate`]: indeterminate }, TARGET_CLS, hashId.value);
		return createVNode(wave_default, {
			"component": "Checkbox",
			"disabled": mergedDisabled.value
		}, { default: () => [createVNode("label", mergeProps({
			"class": classString,
			"style": [
				mergedStyles.value.root,
				contextStyle.value,
				style
			],
			"onMouseenter": (e) => emit("mouseenter", e),
			"onMouseleave": (e) => emit("mouseleave", e),
			"onClick": onLabelClick
		}, restAttrs), [createVNode(VcCheckbox, mergeProps(omit(checkboxProps, ["onChange"]), {
			"onChange": (e) => {
				if (!checkboxProps.onChange) emit("change", e);
				checkboxProps?.onChange?.(e);
			},
			"onUpdate:checked": (checked) => {
				if (inGroup) {
					emit("update:checked", checked);
					if (!skipGroup && checkboxGroup?.value?.toggleOption) checkboxGroup.value.toggleOption({
						label: children,
						value: props.value
					});
				} else {
					const newValue = checked ? mergedCheckedValue.value : mergedUnCheckedValue.value;
					if (!isControlled.value) currentValue.value = newValue;
					emit("update:checked", newValue);
				}
			}
		}, {
			"name": !skipGroup && checkboxGroup?.value ? checkboxGroup.value?.name : props.name,
			"onClick": onInputClick,
			"checked": mergedChecked.value,
			"prefixCls": prefixCls.value,
			"class": checkboxClass,
			"style": mergedStyles.value.icon,
			"disabled": mergedDisabled.value,
			"onBlur": (e) => {
				formItemContext?.triggerBlur?.();
				emit("blur", e);
			},
			"ref": checkboxRef,
			"value": props.value
		}), null), isNonNullable_default(children) && createVNode("span", {
			"class": clsx(`${prefixCls.value}-label`, mergedClassNames.value?.label),
			"style": mergedStyles.value?.label
		}, [children])])] });
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		indeterminate: {
			type: Boolean,
			required: false,
			default: void 0
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		defaultChecked: {
			type: [
				String,
				Number,
				Boolean,
				Object
			],
			required: false,
			default: void 0
		},
		checked: {
			type: [
				String,
				Number,
				Boolean,
				Object
			],
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		title: {
			type: String,
			required: false
		},
		value: { required: false },
		tabIndex: {
			type: Number,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		type: {
			type: String,
			required: false
		},
		skipGroup: {
			type: Boolean,
			required: false,
			default: void 0
		},
		required: {
			type: Boolean,
			required: false,
			default: void 0
		},
		checkedValue: {
			type: [
				String,
				Number,
				Boolean,
				Object
			],
			required: false,
			default: void 0
		},
		unCheckedValue: {
			type: [
				String,
				Number,
				Boolean,
				Object
			],
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
		}
	}, {
		indeterminate: false,
		skipGroup: false
	}),
	emits: [
		"change",
		"update:checked",
		"update:value",
		"mouseenter",
		"mouseleave",
		"keypress",
		"keydown",
		"focus",
		"blur",
		"click"
	],
	name: "ACheckbox",
	inheritAttrs: false
});
var Checkbox_default = InternalCheckbox;

//#endregion
export { Checkbox_default as default };