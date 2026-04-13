import { useBaseConfig } from "../config-provider/context.js";
import { getAttrStyleAndClass } from "../_util/hooks/useMergeSemantic.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import style_default from "./style/index.js";
import { useGroupContextProvider } from "./GroupContext.js";
import Checkbox_default from "./Checkbox.js";
import { computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { omit } from "es-toolkit";

//#region src/checkbox/Group.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const defaults = {
	options: [],
	role: "group"
};
const CheckboxGroup = /* @__PURE__ */ defineComponent((props, { slots, emit, attrs }) => {
	const { prefixCls, direction } = useBaseConfig("checkbox", props);
	const value = shallowRef(props?.value ?? props?.defaultValue ?? []);
	const registeredValues = shallowRef([]);
	watch(() => props.value, () => {
		value.value = props?.value ?? [];
	});
	const memoizedOptions = computed(() => {
		return (props?.options ?? []).map((option) => {
			if (typeof option === "string" || typeof option === "number") return {
				label: option,
				value: option
			};
			return option;
		});
	});
	const cancelValue = (val) => {
		registeredValues.value = registeredValues.value.filter((v) => v !== val);
	};
	const registerValue = (val) => {
		registeredValues.value = [...registeredValues.value, val];
	};
	const toggleOption = (option) => {
		const optionIndex = value.value.indexOf(option.value);
		const newValue = [...value.value];
		if (optionIndex === -1) newValue.push(option.value);
		else newValue.splice(optionIndex, 1);
		const sortVals = newValue.filter((val) => registeredValues.value.includes(val)).sort((a, b) => {
			return memoizedOptions.value.findIndex((opt) => opt.value === a) - memoizedOptions.value.findIndex((opt) => opt.value === b);
		});
		emit("change", sortVals);
		props?.["onUpdate:value"]?.(sortVals);
		if (props.value === void 0) value.value = newValue;
	};
	const groupPrefixCls = computed(() => `${prefixCls.value}-group`);
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	useGroupContextProvider(computed(() => {
		return {
			toggleOption,
			value: value.value,
			disabled: props.disabled,
			name: props.name,
			registerValue,
			cancelValue
		};
	}));
	return () => {
		const { options = [], rootClass, role } = props;
		const restProps = omit(props, [
			"options",
			"rootClass",
			"defaultValue",
			"prefixCls"
		]);
		const children = slots?.default?.();
		const { restAttrs, className, style } = getAttrStyleAndClass(attrs);
		const labelRender = slots?.labelRender ?? props?.labelRender;
		const childrenNode = options.length ? memoizedOptions.value.map((option, index) => {
			const _label = labelRender ? labelRender({
				item: option,
				index
			}) : option.label;
			return createVNode(Checkbox_default, mergeProps({
				"prefixCls": prefixCls.value,
				"key": option.value.toString(),
				"disabled": "disabled" in option ? option.disabled : restProps.disabled,
				"value": option.value,
				"checked": value.value.includes(option.value)
			}, { onChange: option.onChange }, {
				"class": clsx(`${groupPrefixCls.value}-item`, option.class),
				"style": option.style,
				"title": option.title,
				"id": option.id,
				"required": option.required
			}), _isSlot(_label) ? _label : { default: () => [_label] });
		}) : children;
		const classString = clsx(groupPrefixCls.value, { [`${groupPrefixCls.value}-rtl`]: direction.value === "rtl" }, className, rootClass, cssVarCls.value, rootCls.value, hashId.value);
		return createVNode("div", mergeProps({
			"class": classString,
			"role": role,
			"style": style
		}, restAttrs), [childrenNode]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		name: {
			type: String,
			required: false
		},
		defaultValue: {
			type: Array,
			required: false
		},
		value: {
			type: Array,
			required: false
		},
		labelRender: {
			type: Function,
			required: false
		},
		role: {
			type: String,
			required: false
		},
		"onUpdate:value": {
			type: Function,
			required: false
		},
		options: {
			type: Array,
			required: false
		},
		disabled: {
			type: Boolean,
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
	}, defaults),
	emits: ["change"],
	name: "ACheckboxGroup",
	inheritAttrs: false
});
var Group_default = CheckboxGroup;

//#endregion
export { Group_default as default };