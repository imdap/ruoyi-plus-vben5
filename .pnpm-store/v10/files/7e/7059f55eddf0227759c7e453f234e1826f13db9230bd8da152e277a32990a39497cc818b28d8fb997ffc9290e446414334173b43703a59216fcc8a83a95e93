import { useComponentBaseConfig } from "../config-provider/context.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import style_default from "./style/index.js";
import { parseColor } from "./util.js";
import { computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { Popup } from "@v-c/tooltip";
import { omit } from "es-toolkit";

//#region src/tooltip/PurePanel.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
/** @private Internal Component. Do not use in your production. */
const PurePanel = /* @__PURE__ */ defineComponent((props, { attrs, slots }) => {
	const { prefixCls, rootPrefixCls } = useComponentBaseConfig("tooltip", props);
	const rootCls = useCSSVarCls_default(prefixCls);
	const { placement, classes, styles } = toPropsRefs(props, "placement", "classes", "styles");
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const mergedProps = computed(() => ({
		...props,
		placement: placement.value
	}));
	const colorInfo = computed(() => parseColor(rootPrefixCls.value, prefixCls.value, props.color));
	const innerStyles = computed(() => {
		return { container: { ...colorInfo.value.overlayStyle } };
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(classes), useToArr(innerStyles, styles), useToProps(mergedProps));
	return () => {
		const arrowContentStyle = colorInfo.value.arrowStyle;
		const title = getSlotPropsFnRun(slots, props, "title");
		const rootClassName = clsx(rootCls.value, hashId.value, cssVarCls.value, prefixCls.value, `${prefixCls.value}-pure`, `${prefixCls.value}-placement-${placement.value}`, attrs.class, colorInfo.value.className);
		return createVNode("div", {
			"class": rootClassName,
			"style": arrowContentStyle
		}, [createVNode("div", { "class": `${prefixCls.value}-arrow` }, null), createVNode(Popup, mergeProps(omit(props, ["class"]), {
			"className": hashId.value,
			"prefixCls": prefixCls.value,
			"classNames": mergedClassNames.value,
			"styles": mergedStyles.value
		}), _isSlot(title) ? title : { default: () => [title] })]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		afterOpenChange: {
			type: Function,
			required: false
		},
		builtinPlacements: { required: false },
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
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
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
	}, { placement: "top" }),
	name: "TooltipPurePanel",
	inheritAttrs: false
});
var PurePanel_default = PurePanel;

//#endregion
export { PurePanel_default as default };