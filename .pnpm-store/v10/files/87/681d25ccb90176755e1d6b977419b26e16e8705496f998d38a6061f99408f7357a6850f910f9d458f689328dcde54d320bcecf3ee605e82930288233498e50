import { useComponentBaseConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs } from "../_util/tools.js";
import motion_default from "../_util/motion.js";
import { resolveSlotsNode } from "../_util/vnode/index.js";
import { checkRenderNode, cloneElement } from "../_util/vueNode.js";
import CollapsePanel_default, { COLLAPSE_PANEL_MARK } from "./CollapsePanel.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps } from "vue";
import { classNames } from "@v-c/util";
import { RightOutlined } from "@antdv-next/icons";
import { omit } from "es-toolkit";
import VcCollapse from "@v-c/collapse";

//#region src/collapse/Collapse.tsx
const Collapse = /* @__PURE__ */ defineComponent((props, { attrs, emit, slots }) => {
	const { class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, direction, prefixCls, getPrefixCls, expandIcon } = useComponentBaseConfig("collapse", props, ["expandIcon"]);
	const { styles, classes } = toPropsRefs(props, "styles", "classes");
	const mergedSize = useSize((ctxSize) => props?.size ?? ctxSize ?? "middle");
	const rootPrefixCls = getPrefixCls();
	const [hashId, cssVarCls] = style_default(prefixCls);
	const mergedPlacement = computed(() => props.expandIconPlacement ?? "start");
	const mergedProps = computed(() => props);
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const renderExpandIcon = (panelProps = {}) => {
		const mergedExpandIcon = slots?.expandIcon ?? props?.expandIcon ?? expandIcon.value;
		const icon = typeof mergedExpandIcon === "function" ? mergedExpandIcon?.(panelProps) : createVNode(RightOutlined, {
			"rotate": panelProps.isActive ? direction.value === "rtl" ? -90 : 90 : void 0,
			"aria-label": panelProps.isActive ? "expanded" : "collapsed"
		}, null);
		return cloneElement(icon, () => {
			return { class: classNames(icon.props?.class, `${prefixCls.value}-arrow`) };
		});
	};
	const openMotion = computed(() => {
		return {
			...motion_default(rootPrefixCls),
			appear: false
		};
	});
	const sourceItems = computed(() => {
		if (props.items) return props.items;
		return resolveSlotsNode(slots, "default", void 0, COLLAPSE_PANEL_MARK).map((item) => {
			return {
				...item,
				label: item.header ?? item.label,
				content: item.content ?? item.children
			};
		});
	});
	return () => {
		const { bordered, ghost, rootClass, destroyOnHidden } = props;
		const collapseClassName = classNames(`${prefixCls.value}-icon-position-${mergedPlacement.value}`, {
			[`${prefixCls.value}-borderless`]: !bordered,
			[`${prefixCls.value}-rtl`]: direction.value === "rtl",
			[`${prefixCls.value}-ghost`]: !!ghost,
			[`${prefixCls.value}-${mergedSize.value}`]: mergedSize.value !== "middle"
		}, contextClassName.value, attrs.class, rootClass, hashId.value, cssVarCls.value, mergedClassNames.value.root);
		const labelRender = slots?.labelRender ?? props?.labelRender;
		const contentRender = slots?.contentRender ?? props?.contentRender;
		const items = sourceItems.value.map((item, index) => {
			const { classes: itemClasses, ...restItem } = item;
			const label = checkRenderNode(labelRender ? labelRender?.({
				item,
				index
			}) : item.label);
			const children = checkRenderNode(contentRender ? contentRender?.({
				item,
				index
			}) : item.content);
			const _item = {
				...restItem,
				classNames: itemClasses
			};
			if (label) _item.label = label;
			if (children) _item.children = children;
			return _item;
		});
		return createVNode(VcCollapse, mergeProps({ "openMotion": openMotion.value }, omit(attrs, ["class", "style"]), omit(props, [
			"rootClass",
			"items",
			"expandIconPlacement",
			"classes",
			"styles"
		]), {
			"class": collapseClassName,
			"prefixCls": prefixCls.value,
			"style": [
				mergedStyles.value.root,
				contextStyle.value,
				attrs.style
			],
			"expandIcon": renderExpandIcon,
			"classNames": mergedClassNames.value,
			"styles": mergedStyles.value,
			"onChange": (key) => emit("change", key),
			"destroyOnHidden": destroyOnHidden,
			"items": items
		}), null);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		activeKey: {
			type: [
				Array,
				String,
				Number
			],
			required: false
		},
		defaultActiveKey: {
			type: [
				Array,
				String,
				Number
			],
			required: false
		},
		accordion: {
			type: Boolean,
			required: false,
			default: void 0
		},
		destroyOnHidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		rootClass: {
			type: String,
			required: false
		},
		bordered: {
			type: Boolean,
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false
		},
		expandIcon: {
			type: Function,
			required: false
		},
		expandIconPlacement: {
			type: String,
			required: false
		},
		ghost: {
			type: Boolean,
			required: false,
			default: void 0
		},
		size: {
			type: [String, null],
			required: false
		},
		collapsible: {
			type: String,
			required: false
		},
		labelRender: {
			type: Function,
			required: false
		},
		contentRender: {
			type: Function,
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
		items: {
			type: Array,
			required: false
		}
	}, {
		expandIconPlacement: "start",
		bordered: true
	}),
	emits: ["change"],
	name: "ACollapse",
	inheritAttrs: false
});
Collapse.install = (app) => {
	app.component(Collapse.name, Collapse);
	app.component(CollapsePanel_default.name, CollapsePanel_default);
};
var Collapse_default = Collapse;

//#endregion
export { Collapse_default as default };