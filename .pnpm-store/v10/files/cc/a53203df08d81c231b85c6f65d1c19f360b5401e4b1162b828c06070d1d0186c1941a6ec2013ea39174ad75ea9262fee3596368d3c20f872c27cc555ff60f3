import { useComponentBaseConfig, useConfig } from "../config-provider/context.js";
import { pureAttrs } from "../_util/hooks/useMergeSemantic.js";
import { clsx, getSlotPropsFnRun, toPropsRefs } from "../_util/tools.js";
import { useDisabledContext } from "../config-provider/DisabledContext.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, mergeProps } from "vue";

//#region src/tag/CheckableTag.tsx
const CheckableTag = /* @__PURE__ */ defineComponent((props, { slots, emit, attrs }) => {
	const configCtx = useConfig();
	const { prefixCls } = useComponentBaseConfig("tag", props);
	const { disabled: customDisabled } = toPropsRefs(props, "disabled");
	const disabled = useDisabledContext();
	const mergedDisabled = computed(() => customDisabled.value ?? disabled.value);
	const handleClick = (e) => {
		if (mergedDisabled.value) return;
		const checked = !props.checked;
		emit("change", checked);
		emit("update:checked", checked);
		emit("click", e);
	};
	const [hashId, cssVarCls] = style_default(prefixCls);
	return () => {
		const tag = configCtx.value.tag;
		const { checked } = props;
		const cls = clsx(prefixCls.value, `${prefixCls.value}-checkable`, {
			[`${prefixCls.value}-checkable-checked`]: checked,
			[`${prefixCls.value}-checkable-disabled`]: mergedDisabled.value
		}, tag?.class, attrs.class, hashId.value, cssVarCls.value);
		const icon = getSlotPropsFnRun(slots, props, "icon");
		return createVNode("span", mergeProps(pureAttrs(attrs), {
			"style": [tag?.style, attrs.style],
			"class": cls,
			"onClick": handleClick
		}), [icon, createVNode("span", null, [slots?.default?.()])]);
	};
}, {
	props: {
		checked: {
			type: Boolean,
			required: true
		},
		icon: {
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
	},
	emits: [
		"change",
		"update:checked",
		"click"
	],
	name: "ACheckableTag",
	inheritAttrs: false
});
var CheckableTag_default = CheckableTag;

//#endregion
export { CheckableTag_default as default };