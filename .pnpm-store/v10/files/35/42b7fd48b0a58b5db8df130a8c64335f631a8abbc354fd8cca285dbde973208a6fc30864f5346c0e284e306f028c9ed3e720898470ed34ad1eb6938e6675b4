import { useComponentBaseConfig } from "../config-provider/context.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import style_default from "./style/index.js";
import { Fragment, computed, createVNode, defineComponent, mergeDefaults, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
import { Popup } from "@v-c/tooltip";
import { omit } from "es-toolkit";

//#region src/popover/PurePanel.tsx
const Overlay = /* @__PURE__ */ defineComponent((props, { slots }) => {
	return () => {
		const { prefixCls, classes, styles } = props;
		const title = getSlotPropsFnRun(slots, props, "title");
		const content = getSlotPropsFnRun(slots, props, "content");
		if (!title && !content) return null;
		return createVNode(Fragment, null, [title && createVNode("div", {
			"class": clsx(`${prefixCls}-title`, classes?.title),
			"style": styles?.title
		}, [title]), content && createVNode("div", {
			"class": clsx(`${prefixCls}-content`, classes?.content),
			"style": styles?.content
		}, [content])]);
	};
}, { props: {
	prefixCls: {
		type: String,
		required: false
	},
	title: {
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
	classes: {
		type: Object,
		required: false
	},
	styles: {
		type: Object,
		required: false
	}
} });
const defaults = { placement: "top" };
const RawPurePanel = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const { classes, styles } = toPropsRefs$1(props, "styles", "classes");
	const mergedProps = computed(() => {
		return props;
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(classes), useToArr(styles), useToProps(mergedProps));
	return () => {
		const titleNode = getSlotPropsFnRun(slots, props, "title");
		const contentNode = getSlotPropsFnRun(slots, props, "content");
		const children = filterEmpty(slots?.default?.() ?? []);
		const { hashId, prefixCls, placement } = props;
		const rootClassName = clsx(hashId, prefixCls, `${prefixCls}-pure`, `${prefixCls}-placement-${placement}`, attrs.class);
		return createVNode("div", {
			"class": rootClassName,
			"style": attrs.style
		}, [createVNode("div", { "class": `${prefixCls}-arrow` }, null), createVNode(Popup, mergeProps(props, {
			"className": hashId,
			"prefixCls": prefixCls,
			"classNames": mergedClassNames.value,
			"styles": mergedStyles.value
		}), { default: () => [children.length ? children : createVNode(Overlay, {
			"prefixCls": prefixCls,
			"title": titleNode,
			"content": contentNode,
			"classes": mergedClassNames.value,
			"styles": mergedStyles.value
		}, null)] })]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		hashId: {
			type: String,
			required: true
		},
		title: {
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
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		afterOpenChange: {
			type: Function,
			required: false
		},
		builtinPlacements: { required: false },
		overlay: {
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
		openClass: {
			type: String,
			required: false
		},
		unique: {
			type: Boolean,
			required: false,
			default: void 0
		},
		align: {
			type: Object,
			required: false
		},
		arrow: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		autoAdjustOverflow: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		color: { required: false },
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
		getPopupContainer: {
			type: Function,
			required: false
		},
		destroyOnHidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		zIndex: {
			type: Number,
			required: false
		},
		placement: {
			type: String,
			required: false
		},
		trigger: {
			type: [String, Array],
			required: false
		},
		fresh: {
			type: Boolean,
			required: false,
			default: void 0
		},
		mouseEnterDelay: {
			type: Number,
			required: false
		},
		mouseLeaveDelay: {
			type: Number,
			required: false
		},
		getTooltipContainer: {
			type: Function,
			required: false
		},
		motion: { required: false },
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	}, defaults),
	name: "PopoverRawPurePanel",
	inheritAttrs: false
});
const PurePanel = /* @__PURE__ */ defineComponent((props, { attrs, slots }) => {
	const { prefixCls } = useComponentBaseConfig("popover", props);
	const [hashId, cssVarCls] = style_default(prefixCls);
	return () => {
		const content = getSlotPropsFnRun(slots, props, "content");
		return createVNode(RawPurePanel, mergeProps(omit(attrs, ["class"]), props, {
			"content": content,
			"prefixCls": prefixCls.value,
			"hashId": hashId.value,
			"class": clsx(attrs.class, cssVarCls.value)
		}), null);
	};
}, {
	props: {
		title: {
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
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		afterOpenChange: {
			type: Function,
			required: false
		},
		builtinPlacements: { required: false },
		overlay: {
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
		openClass: {
			type: String,
			required: false
		},
		unique: {
			type: Boolean,
			required: false,
			default: void 0
		},
		align: {
			type: Object,
			required: false
		},
		arrow: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		autoAdjustOverflow: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		color: { required: false },
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
		getPopupContainer: {
			type: Function,
			required: false
		},
		destroyOnHidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		zIndex: {
			type: Number,
			required: false
		},
		placement: {
			type: String,
			required: false
		},
		trigger: {
			type: [String, Array],
			required: false
		},
		fresh: {
			type: Boolean,
			required: false,
			default: void 0
		},
		mouseEnterDelay: {
			type: Number,
			required: false
		},
		mouseLeaveDelay: {
			type: Number,
			required: false
		},
		getTooltipContainer: {
			type: Function,
			required: false
		},
		motion: { required: false },
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	},
	name: "PopoverPurePanel",
	inheritAttrs: false
});
var PurePanel_default = PurePanel;

//#endregion
export { Overlay, RawPurePanel, PurePanel_default as default };