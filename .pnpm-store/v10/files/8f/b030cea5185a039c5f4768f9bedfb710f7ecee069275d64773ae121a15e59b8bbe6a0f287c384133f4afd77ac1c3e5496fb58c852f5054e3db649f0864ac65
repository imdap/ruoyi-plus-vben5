import { useComponentBaseConfig } from "../config-provider/context.js";
import { pureAttrs, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import style_default from "./style/index.js";
import { cloneVNode, computed, createVNode, defineComponent, isVNode, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled, InfoCircleFilled, LoadingOutlined } from "@antdv-next/icons";
import { omit } from "es-toolkit";
import { Notice } from "@v-c/notification";

//#region src/message/PurePanel.tsx
const TypeIcon = {
	info: InfoCircleFilled,
	success: CheckCircleFilled,
	error: CloseCircleFilled,
	warning: ExclamationCircleFilled,
	loading: LoadingOutlined
};
const PureContent = /* @__PURE__ */ defineComponent((props, { slots }) => {
	return () => {
		const { prefixCls, type, icon, classNames: pureContentClassNames, styles } = props;
		const renderIcon = () => {
			if (!icon && !type) return null;
			if (icon && isVNode(icon)) return cloneVNode(icon, {
				class: clsx(icon.props?.class, pureContentClassNames?.icon),
				style: {
					...icon.props?.style,
					...styles?.icon
				}
			});
			if (icon) return createVNode("span", {
				"class": clsx(`${prefixCls}-icon`, pureContentClassNames?.icon),
				"style": styles?.icon
			}, [icon]);
			const IconNode = type ? TypeIcon[type] : null;
			return IconNode ? createVNode(IconNode, {
				"class": clsx(`${prefixCls}-icon`, pureContentClassNames?.icon),
				"style": styles?.icon
			}, null) : null;
		};
		const iconNode = renderIcon();
		return createVNode("div", { "class": clsx(`${prefixCls}-custom-content`, type && `${prefixCls}-${type}`) }, [iconNode, createVNode("span", {
			"class": pureContentClassNames?.content,
			"style": styles?.content
		}, [slots.default?.()])]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: false
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
		classNames: {
			type: Object,
			required: false
		},
		styles: {
			type: Object,
			required: false
		}
	},
	name: "MessagePureContent",
	inheritAttrs: false
});
const omitKeys = [
	"prefixCls",
	"type",
	"icon",
	"content",
	"classes",
	"styles",
	"class"
];
/** @private Internal Component. Do not use in your production. */
const PurePanel = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const { classes: messageClassNames, styles } = toPropsRefs(props, "classes", "styles");
	const { getPrefixCls, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("message", props);
	const prefixCls = computed(() => props.prefixCls ?? getPrefixCls("message"));
	const mergedProps = computed(() => props);
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, messageClassNames), useToArr(contextStyles, styles), useToProps(mergedProps));
	return () => {
		const restProps = omit(props, omitKeys);
		return createVNode(Notice, mergeProps(pureAttrs(attrs), restProps, {
			"prefixCls": prefixCls.value,
			"eventKey": "pure",
			"duration": null,
			"className": clsx(contextClassName.value, mergedClassNames.value?.root, props.class, hashId.value, cssVarCls.value, rootCls.value, `${prefixCls.value}-notice-pure-panel`),
			"style": {
				...mergedStyles.value.root,
				...contextStyle.value,
				...attrs.style
			},
			"content": createVNode(PureContent, {
				"prefixCls": prefixCls.value,
				"type": props.type,
				"icon": props.icon,
				"classNames": mergedClassNames.value,
				"styles": mergedStyles.value
			}, { default: () => [props.content] })
		}), null);
	};
}, {
	props: {
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
		duration: {
			type: [
				Number,
				Boolean,
				null
			],
			required: false,
			default: void 0
		},
		showProgress: {
			type: Boolean,
			required: false,
			default: void 0
		},
		pauseOnHover: {
			type: Boolean,
			required: false,
			default: void 0
		},
		closable: {
			type: [Boolean, Object],
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
		props: {
			type: Object,
			required: false
		},
		onClose: { required: false },
		onClick: {
			type: Function,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		class: {
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
		type: {
			type: String,
			required: false
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
		}
	},
	name: "MessagePurePanel",
	inheritAttrs: false
});
var PurePanel_default = PurePanel;

//#endregion
export { PureContent, PurePanel_default as default };