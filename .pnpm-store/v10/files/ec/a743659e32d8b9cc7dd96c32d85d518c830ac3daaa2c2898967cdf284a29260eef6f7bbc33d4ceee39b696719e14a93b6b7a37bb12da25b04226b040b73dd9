import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { getAttrStyleAndClass as getAttrStyleAndClass$1, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import { useDisabledContext } from "../config-provider/DisabledContext.js";
import { TARGET_CLS } from "../_util/wave/interface.js";
import wave_default from "../_util/wave/index.js";
import { checkRenderNode } from "../_util/vueNode.js";
import { useFormItemInputContext } from "../form/context.js";
import { useRadioGroupContext, useRadioOptionTypeContext } from "./context.js";
import useBubbleLock from "../checkbox/useBubbleLock.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, mergeProps, shallowRef } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
import { omit } from "es-toolkit";
import VcCheckbox from "@v-c/checkbox";

//#region src/radio/radio.tsx
const InternalRadio = /* @__PURE__ */ defineComponent((props, { slots, expose, attrs, emit }) => {
	const groupContext = useRadioGroupContext();
	const radioOptionTypeContext = useRadioOptionTypeContext();
	const { prefixCls: radioPrefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("radio", props);
	const innerRef = shallowRef();
	const formItemInputContext = useFormItemInputContext();
	if (isDev) devUseWarning("Radio")(!props.optionType, "usage", "`optionType` is only support in RadioGroup.");
	const onChange = (e) => {
		emit("change", e);
		groupContext?.value?.onChange?.(e);
	};
	const { classes, styles } = toPropsRefs$1(props, "classes", "styles");
	const isButtonType = computed(() => (groupContext?.value?.optionType || radioOptionTypeContext?.value) === "button");
	const prefixCls = computed(() => isButtonType.value ? `${radioPrefixCls.value}-button` : radioPrefixCls.value);
	const rootCls = useCSSVarCls_default(radioPrefixCls);
	const [hashId, cssVarCls] = style_default(radioPrefixCls, rootCls);
	const disabled = useDisabledContext();
	const radioProps = computed(() => {
		const _radioProps = { ...omit(props, [
			"prefixCls",
			"classes",
			"styles",
			"title",
			"rootClass"
		]) };
		_radioProps.onChange = onChange;
		if (groupContext?.value) {
			_radioProps.name = groupContext.value.name;
			_radioProps.checked = props.value === groupContext.value.value;
			_radioProps.disabled = _radioProps.disabled ?? groupContext.value.disabled;
		}
		_radioProps.disabled = _radioProps.disabled ?? disabled.value;
		return _radioProps;
	});
	const mergedChecked = computed(() => {
		if (groupContext?.value) return props.value === groupContext.value?.value;
		return radioProps.value.checked;
	});
	const mergedProps = computed(() => {
		return {
			...props,
			...radioProps.value,
			disabled: mergedChecked.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const [onLabelClick, onInputClick] = useBubbleLock((e) => {
		emit("click", e);
	});
	expose({
		blur: () => innerRef.value?.blur?.(),
		focus: () => innerRef.value?.focus?.(),
		input: computed(() => innerRef.value?.input)
	});
	return () => {
		const { rootClass, title } = props;
		const { className, style, restAttrs } = getAttrStyleAndClass$1(attrs);
		const wrapperClassString = clsx(`${prefixCls.value}-wrapper`, {
			[`${prefixCls.value}-wrapper-checked`]: mergedChecked.value,
			[`${prefixCls.value}-wrapper-disabled`]: radioProps.value.disabled,
			[`${prefixCls.value}-wrapper-rtl`]: direction.value === "rtl",
			[`${prefixCls.value}-wrapper-in-form-item`]: formItemInputContext?.value?.isFormItemInput,
			[`${prefixCls.value}-wrapper-block`]: !!groupContext?.value?.block
		}, contextClassName.value, className, rootClass, mergedClassNames.value.root, hashId.value, cssVarCls.value, rootCls.value);
		const children = checkRenderNode(filterEmpty(slots?.default?.() ?? []));
		return createVNode(wave_default, {
			"component": "Radio",
			"disabled": radioProps.value.disabled
		}, { default: () => [createVNode("label", mergeProps(restAttrs, {
			"class": wrapperClassString,
			"style": {
				...mergedStyles.value.root,
				...contextStyle.value,
				...style
			},
			"onMouseenter": (e) => {
				emit("mouseenter", e);
			},
			"onMouseleave": (e) => {
				emit("mouseleave", e);
			},
			"title": title,
			"onClick": onLabelClick
		}), [createVNode(VcCheckbox, mergeProps(radioProps.value, {
			"class": clsx(mergedClassNames.value.icon, { [TARGET_CLS]: !isButtonType.value }),
			"checked": mergedChecked.value,
			"style": mergedStyles.value.icon,
			"type": "radio",
			"prefixCls": prefixCls.value,
			"ref": innerRef,
			"onClick": onInputClick
		}, { "onUpdate:checked": (checked) => {
			emit("update:checked", checked);
		} }), null), children ? createVNode("span", {
			"class": clsx(`${prefixCls.value}-label`, mergedClassNames.value.label),
			"style": mergedStyles.value.label
		}, [children]) : null])] });
	};
}, {
	props: {
		optionType: {
			type: String,
			required: false
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
	},
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
	name: "ARadio",
	inheritAttrs: false
});
var radio_default = InternalRadio;

//#endregion
export { radio_default as default };