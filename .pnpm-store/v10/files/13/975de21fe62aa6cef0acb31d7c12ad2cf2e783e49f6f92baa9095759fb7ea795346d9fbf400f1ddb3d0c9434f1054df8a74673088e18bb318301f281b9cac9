import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import { getAttrStyleAndClass, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs } from "../_util/tools.js";
import { useDisabledContext } from "../config-provider/DisabledContext.js";
import wave_default from "../_util/wave/index.js";
import { isValueEqual } from "../_util/isEqual.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, mergeProps, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { LoadingOutlined } from "@antdv-next/icons";
import { omit } from "es-toolkit";
import VcSwitch from "@v-c/switch";

//#region src/switch/index.tsx
const keys = [
	"prefixCls",
	"size",
	"disabled",
	"loading",
	"rootClass",
	"style",
	"checked",
	"value",
	"defaultChecked",
	"defaultValue",
	"checkedValue",
	"unCheckedValue",
	"styles",
	"classes",
	"checkedChildren",
	"unCheckedChildren"
];
const Switch = /* @__PURE__ */ defineComponent((props, { slots, emit, attrs }) => {
	const mergedCheckedValue = computed(() => props.checkedValue ?? true);
	const mergedUnCheckedValue = computed(() => props.unCheckedValue ?? false);
	const currentValue = shallowRef(props?.checked ?? props?.value ?? props?.defaultChecked ?? props?.defaultValue ?? mergedUnCheckedValue.value);
	watch([() => props.checked, () => props.value], ([newChecked, newValue]) => {
		if (newChecked !== void 0) currentValue.value = newChecked;
		else if (newValue !== void 0) currentValue.value = newValue;
		else currentValue.value = mergedUnCheckedValue.value;
	});
	const isChecked = computed(() => isValueEqual(currentValue.value, mergedCheckedValue.value));
	const { prefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("switch", props);
	const { classes, styles, size: customizeSize } = toPropsRefs(props, "size", "classes", "styles");
	const disabled = useDisabledContext();
	const mergedDisabled = computed(() => (props.disabled ?? disabled.value) || props.loading);
	const [hashId, cssVarCls] = style_default(prefixCls);
	const mergedSize = useSize(customizeSize);
	if (isDev) devUseWarning("Switch").deprecated(props.size !== "default", "size=\"default\"", "size=\"medium\"");
	const mergedProps = computed(() => {
		return {
			...props,
			size: mergedSize.value,
			disabled: mergedDisabled.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const changeHandler = (...args) => {
		emit("change", ...args);
	};
	const handleVMHandler = (checked) => {
		const newValue = checked ? mergedCheckedValue.value : mergedUnCheckedValue.value;
		if (props.checked === void 0 && props.value === void 0) currentValue.value = newValue;
		emit("update:checked", newValue);
		emit("update:value", newValue);
	};
	return () => {
		const { loading, rootClass } = props;
		const checkedChildren = getSlotPropsFnRun(slots, props, "checkedChildren");
		const unCheckedChildren = getSlotPropsFnRun(slots, props, "unCheckedChildren");
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const loadingIcon = createVNode("div", {
			"class": clsx(`${prefixCls.value}-handle`, mergedClassNames.value.indicator),
			"style": mergedStyles.value.indicator
		}, [loading && createVNode(LoadingOutlined, { "class": `${prefixCls.value}-loading-icon` }, null)]);
		const classes = clsx(contextClassName.value, {
			[`${prefixCls.value}-small`]: mergedSize.value === "small",
			[`${prefixCls.value}-loading`]: loading,
			[`${prefixCls.value}-rtl`]: direction.value === "rtl"
		}, className, rootClass, mergedClassNames.value.root, hashId.value, cssVarCls.value);
		const mergedStyle = {
			...mergedStyles.value.root,
			...contextStyle.value,
			...style
		};
		const restProps = omit(props, keys);
		return createVNode(wave_default, {
			"component": "Switch",
			"disabled": mergedDisabled.value
		}, { default: () => [createVNode(VcSwitch, mergeProps(restAttrs, restProps, {
			"classNames": mergedClassNames.value,
			"styles": mergedStyles.value,
			"checked": isChecked.value,
			"onChange": changeHandler,
			"prefixCls": prefixCls.value,
			"className": classes,
			"style": mergedStyle,
			"disabled": mergedDisabled.value,
			"loadingIcon": loadingIcon,
			"unCheckedChildren": unCheckedChildren,
			"checkedChildren": checkedChildren
		}, { "onUpdate:checked": handleVMHandler }), null)] });
	};
}, {
	props: {
		size: {
			type: [String, null],
			required: false
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
		value: {
			type: [
				String,
				Number,
				Boolean,
				Object
			],
			required: false,
			default: void 0
		},
		defaultValue: {
			type: [
				String,
				Number,
				Boolean,
				Object
			],
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
		checkedChildren: {
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
		unCheckedChildren: {
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
		loading: {
			type: Boolean,
			required: false,
			default: void 0
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		title: {
			type: String,
			required: false
		},
		tabIndex: {
			type: Number,
			required: false
		},
		id: {
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
		}
	},
	emits: [
		"change",
		"click",
		"update:checked",
		"update:value"
	],
	name: "ASwitch",
	inheritAttrs: false
});
Switch.install = (app) => {
	app.component(Switch.name, Switch);
};
var switch_default = Switch;

//#endregion
export { switch_default as default };