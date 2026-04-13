import { useComponentBaseConfig } from "../config-provider/context.js";
import { getSlotPropsFnRun, toPropsRefs } from "../_util/tools.js";
import { useDisabledContext } from "../config-provider/DisabledContext.js";
import useRemovePasswordTimeout from "./hooks/useRemovePasswordTimeout.js";
import Input_default from "./Input.js";
import { Fragment, cloneVNode, computed, createVNode, defineComponent, isVNode, mergeProps, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { EyeInvisibleOutlined, EyeOutlined } from "@antdv-next/icons";
import { omit } from "es-toolkit";

//#region src/input/Password.tsx
const defaultIconRender = (visible) => visible ? createVNode(EyeOutlined, null, null) : createVNode(EyeInvisibleOutlined, null, null);
const InternalPassword = /* @__PURE__ */ defineComponent((props, { slots, attrs, emit, expose }) => {
	const { disabled: customDisabled, inputPrefixCls: customizeInputPrefixCls } = toPropsRefs(props, "disabled", "inputPrefixCls");
	const { getPrefixCls } = useComponentBaseConfig("input", props);
	const inputPrefixCls = computed(() => getPrefixCls("input", customizeInputPrefixCls.value));
	const passwordPrefixCls = computed(() => getPrefixCls("input-password", props.prefixCls));
	const disabledContext = useDisabledContext();
	const mergedDisabled = computed(() => customDisabled.value ?? disabledContext.value);
	const inputRef = shallowRef();
	const removePasswordTimeout = useRemovePasswordTimeout(inputRef);
	const visibilityToggle = computed(() => props.visibilityToggle ?? true);
	const visibilityControlled = computed(() => typeof visibilityToggle.value === "object" && visibilityToggle.value.visible !== void 0);
	const visible = shallowRef(visibilityControlled.value ? Boolean(visibilityToggle.value.visible) : false);
	watch(visibilityToggle, (next) => {
		if (visibilityControlled.value) visible.value = Boolean(next.visible);
	});
	const triggerVisibleChange = () => {
		if (mergedDisabled.value || visibilityToggle.value === false) return;
		if (visible.value) removePasswordTimeout();
		const next = !visible.value;
		visible.value = next;
		if (typeof visibilityToggle.value === "object") visibilityToggle.value.onVisibleChange?.(next);
	};
	const action = computed(() => props.action ?? "click");
	const iconRender = (visible) => {
		const _iconRender = getSlotPropsFnRun(slots, props, "iconRender", true, { visible });
		if (_iconRender) return _iconRender;
		return defaultIconRender(visible);
	};
	const getIcon = () => {
		if (!visibilityToggle.value) return null;
		const iconNode = iconRender(visible.value);
		const originVNode = isVNode(iconNode) ? iconNode : createVNode("span", null, [iconNode]);
		const originalProps = originVNode.props || {};
		const iconVNode = originVNode;
		const eventName = action.value === "hover" ? "onMouseover" : "onClick";
		return cloneVNode(iconVNode, {
			[eventName]: (e) => {
				originalProps?.[eventName]?.(e);
				triggerVisibleChange();
			},
			class: clsx(iconVNode.props?.class, `${passwordPrefixCls.value}-icon`),
			key: "passwordIcon",
			onMousedown: (e) => e.preventDefault(),
			onMouseup: (e) => e.preventDefault()
		});
	};
	const handleUpdateValue = (value) => {
		emit("update:value", value);
	};
	const handleChange = (e) => {
		emit("change", e);
	};
	const handleFocus = (e) => emit("focus", e);
	const handleBlur = (e) => emit("blur", e);
	expose({
		focus: (...args) => inputRef.value?.focus?.(...args),
		blur: () => inputRef.value?.blur?.(),
		input: computed(() => inputRef.value?.input ?? null)
	});
	return () => {
		const restInputProps = omit(props, [
			"iconRender",
			"visibilityToggle",
			"action",
			"suffix",
			"inputPrefixCls",
			"rootClass",
			"prefixCls"
		]);
		const suffixSlot = getSlotPropsFnRun(slots, props, "suffix");
		const visibilityIcon = getIcon();
		const mergedSuffix = visibilityToggle.value && visibilityIcon ? createVNode(Fragment, null, [visibilityIcon, suffixSlot]) : suffixSlot;
		return createVNode(Input_default, mergeProps(attrs, restInputProps, {
			"ref": inputRef,
			"prefixCls": inputPrefixCls.value,
			"type": visible.value ? "text" : "password",
			"suffix": mergedSuffix,
			"disabled": mergedDisabled.value,
			"rootClass": clsx(passwordPrefixCls.value, props.rootClass, { [`${passwordPrefixCls.value}-${props.size}`]: props.size }),
			"onChange": handleChange,
			"onFocus": handleFocus,
			"onBlur": handleBlur,
			"onPressEnter": (e) => emit("pressEnter", e),
			"onClear": () => emit("clear"),
			"onCompositionstart": (e) => emit("compositionstart", e),
			"onCompositionend": (e) => emit("compositionend", e),
			"onKeydown": (e) => emit("keydown", e),
			"onKeyup": (e) => emit("keyup", e)
		}, { "onUpdate:value": handleUpdateValue }), { ...omit(slots, ["suffix", "iconRender"]) });
	};
}, {
	props: {
		inputPrefixCls: {
			type: String,
			required: false
		},
		action: {
			type: String,
			required: false
		},
		visibilityToggle: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		suffix: {
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
		iconRender: {
			type: Function,
			required: false
		},
		iconVisible: {
			type: Boolean,
			required: false,
			default: void 0
		},
		size: {
			type: [String, null],
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		status: {
			type: String,
			required: false
		},
		addonBefore: {
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
		addonAfter: {
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
		bordered: {
			type: Boolean,
			required: false,
			default: void 0
		},
		variant: {
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
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		value: { required: false },
		defaultValue: { required: false },
		showCount: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		autoComplete: {
			type: String,
			required: false
		},
		htmlSize: {
			type: Number,
			required: false
		},
		placeholder: {
			type: String,
			required: false
		},
		count: { required: false },
		maxlength: {
			type: Number,
			required: false
		},
		readonly: {
			type: Boolean,
			required: false,
			default: void 0
		},
		hidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		dataAttrs: { required: false },
		components: { required: false },
		prefix: {
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
		allowClear: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		changeOnComposing: {
			type: Boolean,
			required: false,
			default: void 0
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		inputMode: {
			type: String,
			required: false
		}
	},
	emits: [
		"update:iconVisible",
		"pressEnter",
		"clear",
		"change",
		"blur",
		"focus",
		"keydown",
		"keyup",
		"compositionstart",
		"compositionend",
		"update:value"
	],
	name: "AInputPassword",
	inheritAttrs: false
});
var Password_default = InternalPassword;

//#endregion
export { Password_default as default };