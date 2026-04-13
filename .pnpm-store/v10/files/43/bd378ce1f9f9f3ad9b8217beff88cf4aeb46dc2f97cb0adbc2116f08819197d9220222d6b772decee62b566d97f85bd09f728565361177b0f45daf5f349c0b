import { useComponentBaseConfig } from "../config-provider/context.js";
import { getAttrStyleAndClass as getAttrStyleAndClass$1, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import { Footer, renderCloseIcon } from "./shared.js";
import style_default from "./style/index.js";
import { ConfirmContent } from "./ConfirmDialog.js";
import { withPureRenderTheme } from "../_util/PurePanel.js";
import { computed, createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { toPropsRefs } from "@v-c/util/dist/props-util";
import { Panel } from "@v-c/dialog";

//#region src/modal/PurePanel.tsx
const PurePanel = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const { prefixCls, getPrefixCls, styles: contextStyles, classes: contextClassNames, class: contextClassName, style: contextStyle } = useComponentBaseConfig("modal", props, []);
	const { classes, styles } = toPropsRefs(props, "classes", "styles");
	const rootPrefixCls = computed(() => getPrefixCls(void 0, ""));
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(computed(() => props)));
	const rootCls = useCSSVarCls_default(rootPrefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const confirmPrefixCls = computed(() => `${prefixCls.value}-confirm`);
	return () => {
		const { className: attrClassName, restAttrs, style: attrStyle } = getAttrStyleAndClass$1(attrs);
		const { type, closable, closeIcon } = props;
		const footer = getSlotPropsFnRun(slots, props, "footer", false);
		const title = getSlotPropsFnRun(slots, props, "title", false);
		let additionalProps = {};
		if (type) additionalProps = {
			closable: closable ?? false,
			title: "",
			footer: "",
			children: createVNode(ConfirmContent, mergeProps(props, {
				"prefixCls": prefixCls.value,
				"confirmPrefixCls": confirmPrefixCls.value,
				"rootPrefixCls": rootPrefixCls.value,
				"content": slots.default?.()
			}), null)
		};
		else additionalProps = {
			closable: closable ?? true,
			title,
			footer: footer !== null && createVNode(Footer, mergeProps(props, { "footer": footer }), null),
			children: slots.default?.()
		};
		return createVNode(Panel, mergeProps({
			"prefixCls": prefixCls.value,
			"className": clsx(hashId.value, `${prefixCls.value}-pure-panel`, type && confirmPrefixCls.value, type && `${confirmPrefixCls.value}-${type}`, attrClassName, contextClassName.value, cssVarCls.value, rootCls.value, props.rootClass, mergedClassNames.value?.root),
			"animationVisible": true,
			"style": [
				contextStyle,
				mergedStyles.value?.root,
				attrStyle
			]
		}, restAttrs, {
			"closeIcon": renderCloseIcon(prefixCls.value, slots.closeIcon || closeIcon),
			"closable": closable,
			"visible": true
		}, additionalProps, {
			"classNames": mergedClassNames.value,
			"styles": mergedStyles.value
		}), { default: () => additionalProps.children });
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: false
		},
		rootClass: {
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
		className: {
			type: String,
			required: false
		},
		keyboard: {
			type: Boolean,
			required: false,
			default: void 0
		},
		rootStyle: {
			type: Object,
			required: false
		},
		mask: {
			type: Boolean,
			required: false,
			default: void 0
		},
		children: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		afterClose: {
			type: Function,
			required: false
		},
		afterOpenChange: {
			type: Function,
			required: false
		},
		onClose: {
			type: Function,
			required: false
		},
		closable: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		maskClosable: {
			type: Boolean,
			required: false,
			default: void 0
		},
		destroyOnHidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		mousePosition: {
			type: [Object, null],
			required: false
		},
		title: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		transitionName: {
			type: String,
			required: false
		},
		maskTransitionName: {
			type: String,
			required: false
		},
		animation: { required: false },
		maskAnimation: { required: false },
		wrapStyle: {
			type: Object,
			required: false
		},
		bodyStyle: {
			type: Object,
			required: false
		},
		maskStyle: {
			type: Object,
			required: false
		},
		wrapClassName: {
			type: String,
			required: false
		},
		width: {
			type: [String, Number],
			required: false
		},
		height: {
			type: [String, Number],
			required: false
		},
		zIndex: {
			type: Number,
			required: false
		},
		bodyProps: { required: false },
		maskProps: { required: false },
		rootClassName: {
			type: String,
			required: false
		},
		wrapProps: { required: false },
		getContainer: {
			type: [
				String,
				Function,
				Boolean
			],
			required: false,
			skipCheck: true,
			default: void 0
		},
		closeIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		modalRender: {
			type: Function,
			required: false
		},
		forceRender: {
			type: Boolean,
			required: false,
			default: void 0
		},
		focusTriggerAfterClose: {
			type: Boolean,
			required: false,
			default: void 0
		},
		focusTrap: {
			type: Boolean,
			required: false,
			default: void 0
		},
		panelRef: { required: false },
		type: {
			type: String,
			required: false
		},
		footer: {
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
		}
	},
	name: "AModalPurePanel",
	inheritAttrs: false
});
var PurePanel_default = withPureRenderTheme(PurePanel);

//#endregion
export { PurePanel_default as default };