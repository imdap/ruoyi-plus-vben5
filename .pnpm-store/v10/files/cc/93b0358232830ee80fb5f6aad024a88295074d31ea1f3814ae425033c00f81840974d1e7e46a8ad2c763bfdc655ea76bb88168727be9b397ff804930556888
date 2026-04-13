import { useConfig } from "../config-provider/context.js";
import { pureAttrs } from "../_util/hooks/useMergeSemantic.js";
import FloatButton_default, { floatButtonPrefixCls } from "./FloatButton.js";
import BackTop_default from "./BackTop.js";
import FloatButtonGroup_default from "./FloatButtonGroup.js";
import { computed, createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { omit } from "es-toolkit";

//#region src/float-button/PurePanel.tsx
const PureFloatButton = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	return () => {
		if (props.backTop) return createVNode(BackTop_default, mergeProps(attrs, omit(props, ["backTop"]), { "visibilityHeight": 0 }), slots);
		return createVNode(FloatButton_default, mergeProps(omit(props, ["backTop"]), attrs), slots);
	};
}, {
	props: {
		backTop: {
			type: Boolean,
			required: false,
			default: void 0
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
		description: {
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
		content: {
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
		type: {
			type: String,
			required: false
		},
		shape: {
			type: String,
			required: false
		},
		tooltip: {
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
		href: {
			type: String,
			required: false
		},
		badge: {
			type: Object,
			required: false
		},
		htmlType: {
			type: String,
			required: false
		},
		ariaLabel: {
			type: String,
			required: false
		},
		style: {
			type: Object,
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
	name: "AFloatButtonPure",
	inheritAttrs: false
});
const PurePanel = /* @__PURE__ */ defineComponent((props, { attrs, slots }) => {
	const config = useConfig();
	const prefixCls = computed(() => config.value?.getPrefixCls?.(floatButtonPrefixCls, props.prefixCls));
	const pureCls = computed(() => `${prefixCls.value}-pure`);
	const renderItems = () => (props.items ?? []).map((item, index) => createVNode(PureFloatButton, mergeProps({ "key": index }, item), null));
	return () => {
		if (props.items && props.items.length) return createVNode(FloatButtonGroup_default, mergeProps(pureAttrs(attrs), omit(props, [
			"items",
			"classes",
			"styles"
		]), {
			"class": clsx(attrs.class, pureCls.value),
			"classes": props.classes,
			"styles": props.styles
		}), { default: () => renderItems() });
		return createVNode(PureFloatButton, mergeProps(pureAttrs(attrs), omit(props, ["items"]), {
			"class": clsx(attrs.class, pureCls.value),
			"classes": props.classes,
			"styles": props.styles
		}), slots);
	};
}, {
	props: {
		items: {
			type: Array,
			required: false
		},
		classes: {
			type: [Object, Function],
			required: false,
			skipCheck: true
		},
		styles: {
			type: [Object, Function],
			required: false,
			skipCheck: true
		},
		backTop: {
			type: Boolean,
			required: false,
			default: void 0
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
		description: {
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
		content: {
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
		type: {
			type: String,
			required: false
		},
		shape: {
			type: String,
			required: false
		},
		tooltip: {
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
		href: {
			type: String,
			required: false
		},
		badge: {
			type: Object,
			required: false
		},
		htmlType: {
			type: String,
			required: false
		},
		ariaLabel: {
			type: String,
			required: false
		},
		style: {
			type: Object,
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
		trigger: {
			type: String,
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: false,
			default: void 0
		},
		closeIcon: {
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
		placement: {
			type: String,
			required: false
		},
		target: {
			type: String,
			required: false
		}
	},
	name: "AFloatButtonPurePanel",
	inheritAttrs: false
});
var PurePanel_default = PurePanel;

//#endregion
export { PurePanel_default as default };