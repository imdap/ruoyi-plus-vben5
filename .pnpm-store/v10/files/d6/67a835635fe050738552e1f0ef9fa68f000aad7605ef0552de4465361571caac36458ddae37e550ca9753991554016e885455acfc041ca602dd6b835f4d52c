import { useComponentBaseConfig } from "../config-provider/context.js";
import { clsx } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import style_default from "./style/index.js";
import CheckableTag_default from "./CheckableTag.js";
import { computed, createVNode, defineComponent, mergeProps, shallowRef } from "vue";
import pickAttrs from "@v-c/util/dist/pickAttrs";

//#region src/tag/CheckableTagGroup.tsx
const CheckableTagGroup = /* @__PURE__ */ defineComponent((props, { emit, attrs, expose }) => {
	const { prefixCls, direction } = useComponentBaseConfig("tag", props);
	const groupPrefixCls = computed(() => `${prefixCls.value}-checkable-group`);
	const [hashId, cssVarCls] = style_default(prefixCls, useCSSVarCls_default(prefixCls));
	const mergedClassNames = computed(() => props.classes || {});
	const mergedStyles = computed(() => props.styles || {});
	const parsedOptions = computed(() => {
		return (props.options ?? []).map((option) => {
			if (option && typeof option === "object") return option;
			return {
				value: option,
				label: option
			};
		});
	});
	const _mergedValue = shallowRef(props.defaultValue ?? props.value ?? null);
	const mergedValue = computed({
		set(value) {
			_mergedValue.value = value;
			emit("update:value", value);
		},
		get() {
			return props.value ?? _mergedValue.value;
		}
	});
	const handleChange = (checked, option) => {
		let newValue = null;
		if (props.multiple) {
			const valueList = mergedValue.value || [];
			newValue = checked ? [...valueList, option.value] : valueList.filter((v) => v !== option.value);
		} else newValue = checked ? option.value : null;
		mergedValue.value = newValue;
		emit("change", newValue);
	};
	const divRef = shallowRef();
	expose({ nativeElement: divRef });
	return () => {
		const { rootClass, disabled, id, multiple } = props;
		return createVNode("div", mergeProps(pickAttrs(attrs, {
			aria: true,
			data: true
		}), {
			"class": clsx(groupPrefixCls.value, rootClass, {
				[`${groupPrefixCls.value}-disabled`]: disabled,
				[`${groupPrefixCls.value}-rtl`]: direction.value === "rtl"
			}, hashId.value, cssVarCls.value, attrs.class, mergedClassNames.value.root),
			"style": [mergedStyles.value.root, attrs.style],
			"id": id,
			"ref": divRef
		}), [parsedOptions.value.map((option) => {
			return createVNode(CheckableTag_default, {
				"key": option.value,
				"class": clsx(`${groupPrefixCls.value}-item`, mergedClassNames.value.item),
				"style": mergedStyles.value.item,
				"checked": multiple ? (mergedValue.value || []).includes(option.value) : mergedValue.value === option.value,
				"onChange": (checked) => handleChange(checked, option),
				"disabled": option.disabled ?? disabled
			}, { default: () => [option.label] });
		})]);
	};
}, {
	props: {
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		classes: {
			type: Object,
			required: false
		},
		styles: {
			type: Object,
			required: false
		},
		options: {
			type: Array,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		role: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		multiple: {
			type: Boolean,
			required: false,
			default: void 0
		},
		value: { required: false },
		defaultValue: { required: false },
		onChange: {
			type: Function,
			required: false
		}
	},
	emits: ["change", "update:value"],
	name: "ACheckableTagGroup",
	inheritAttrs: false
});
var CheckableTagGroup_default = CheckableTagGroup;

//#endregion
export { CheckableTagGroup_default as default };