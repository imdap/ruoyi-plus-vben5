import { useBaseConfig } from "../config-provider/context.js";
import { getSlotPropsFnRun } from "../_util/tools.js";
import { addMediaQueryListener, removeMediaQueryListener } from "../_util/mediaQueryUtil.js";
import { useLayoutCtx } from "./context.js";
import sider_default from "./style/sider.js";
import { computed, createVNode, defineComponent, inject, mergeDefaults, mergeProps, onBeforeUnmount, provide, ref, shallowRef, watch } from "vue";
import { classNames } from "@v-c/util";
import { BarsOutlined, LeftOutlined, RightOutlined } from "@antdv-next/icons";
import { omit } from "es-toolkit";
import canUseDom from "@v-c/util/dist/Dom/canUseDom";

//#region src/layout/Sider.tsx
const dimensionMaxMap = {
	xs: "479.98px",
	sm: "575.98px",
	md: "767.98px",
	lg: "991.98px",
	xl: "1199.98px",
	xxl: "1599.98px",
	xxxl: `1839.98px`
};
function isNumeric(val) {
	return !Number.isNaN(Number.parseFloat(val)) && Number.isFinite(Number(val));
}
const SiderContextKey = Symbol("SiderContext");
function useSiderProvider(props) {
	provide(SiderContextKey, props);
}
function useSiderCtx() {
	return inject(SiderContextKey, { siderCollapsed: ref(false) });
}
const generateId = (() => {
	let i = 0;
	return (prefix = "") => {
		i += 1;
		return `${prefix}${i}`;
	};
})();
const Sider = /* @__PURE__ */ defineComponent((props, { emit, slots, attrs }) => {
	const { siderHook } = useLayoutCtx();
	const collapsed = shallowRef(!!(props.collapsed === void 0 ? props.defaultCollapsed : props.collapsed));
	watch(() => props.collapsed, (value) => {
		if (value !== void 0) collapsed.value = !!value;
	});
	const below = shallowRef(false);
	const handleSetCollapsed = (value, type) => {
		if (props.collapsed === void 0) collapsed.value = value;
		emit("collapse", value, type);
		emit("update:collapsed", value);
	};
	const { prefixCls, direction } = useBaseConfig("layout-sider", props);
	const [hashId, cssVarCls] = sider_default(prefixCls);
	const responsiveHandler = (mql) => {
		below.value = mql.matches;
		emit("breakpoint", mql.matches);
		if (collapsed.value !== mql.matches) handleSetCollapsed(mql.matches, "responsive");
	};
	watch(() => props.breakpoint, (_n, _ol, onCleanup) => {
		if (!canUseDom()) return;
		let mql;
		const breakpoint = props.breakpoint;
		if (typeof window?.matchMedia !== "undefined" && breakpoint && breakpoint in dimensionMaxMap) {
			mql = window.matchMedia(`screen and (max-width: ${dimensionMaxMap[breakpoint]})`);
			addMediaQueryListener(mql, responsiveHandler);
			responsiveHandler(mql);
		}
		onCleanup(() => {
			removeMediaQueryListener(mql, responsiveHandler);
		});
	}, { immediate: true });
	const uniqueId = generateId("ant-sider-");
	siderHook.addSider(uniqueId);
	onBeforeUnmount(() => {
		siderHook.removeSider(uniqueId);
	});
	const toggle = () => {
		handleSetCollapsed(!collapsed.value, "clickTrigger");
	};
	const rawWidth = computed(() => {
		return collapsed.value ? props.collapsedWidth : props.width;
	});
	const siderWidth = computed(() => isNumeric(rawWidth.value) ? `${rawWidth.value}px` : String(rawWidth.value));
	useSiderProvider({ siderCollapsed: collapsed });
	return () => {
		const { collapsedWidth, reverseArrow, zeroWidthTriggerStyle, theme, collapsible } = props;
		const trigger = getSlotPropsFnRun(slots, props, "trigger");
		const zeroWidthTrigger = Number.parseFloat(String(collapsedWidth || 0)) === 0 ? createVNode("span", {
			"onClick": toggle,
			"class": classNames(`${prefixCls.value}-zero-width-trigger`, `${prefixCls.value}-zero-width-trigger-${reverseArrow ? "right" : "left"}`),
			"style": zeroWidthTriggerStyle
		}, [trigger || createVNode(BarsOutlined, null, null)]) : null;
		const reverseIcon = direction.value === "rtl" === !reverseArrow;
		const defaultTrigger = {
			expanded: reverseIcon ? createVNode(RightOutlined, null, null) : createVNode(LeftOutlined, null, null),
			collapsed: reverseIcon ? createVNode(LeftOutlined, null, null) : createVNode(RightOutlined, null, null)
		}[collapsed.value ? "collapsed" : "expanded"];
		const triggerDom = trigger != null ? zeroWidthTrigger || createVNode("div", {
			"class": `${prefixCls.value}-trigger`,
			"onClick": toggle,
			"style": { width: `${siderWidth.value}` }
		}, [trigger || defaultTrigger]) : null;
		const divStyle = {
			flex: `0 0 ${siderWidth.value}`,
			maxWidth: `${siderWidth.value}`,
			minWidth: `${siderWidth.value}`,
			width: `${siderWidth.value}`
		};
		const siderCls = classNames(prefixCls.value, `${prefixCls.value}-${theme}`, {
			[`${prefixCls.value}-collapsed`]: collapsed.value,
			[`${prefixCls.value}-has-trigger`]: collapsible && trigger !== null && !zeroWidthTrigger,
			[`${prefixCls.value}-below`]: !!below.value,
			[`${prefixCls.value}-zero-width`]: Number.parseFloat(siderWidth.value) === 0
		}, attrs.class, hashId.value, cssVarCls.value);
		return createVNode("aside", mergeProps({ "class": siderCls }, omit(attrs, ["style", "class"]), { "style": [attrs.style, divStyle] }), [createVNode("div", { "class": `${prefixCls.value}-children` }, [slots?.default?.()]), collapsible || below.value && zeroWidthTrigger ? triggerDom : null]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		prefixCls: {
			type: String,
			required: false
		},
		collapsible: {
			type: Boolean,
			required: false,
			default: void 0
		},
		collapsed: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultCollapsed: {
			type: Boolean,
			required: false,
			default: void 0
		},
		reverseArrow: {
			type: Boolean,
			required: false,
			default: void 0
		},
		zeroWidthTriggerStyle: {
			type: Object,
			required: false
		},
		width: {
			type: [Number, String],
			required: false
		},
		collapsedWidth: {
			type: [Number, String],
			required: false
		},
		breakpoint: {
			type: String,
			required: false
		},
		theme: {
			type: String,
			required: false
		}
	}, {
		theme: "dark",
		width: 200,
		collapsedWidth: 80,
		collapsed: void 0
	}),
	emits: [
		"collapse",
		"update:collapsed",
		"breakpoint"
	],
	name: "ALayoutSider",
	inheritAttrs: false
});
var Sider_default = Sider;

//#endregion
export { Sider_default as default, useSiderCtx };