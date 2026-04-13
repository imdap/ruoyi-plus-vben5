import { useBaseConfig, useComponentConfig } from "../config-provider/context.js";
import { useLayoutProvider } from "./context.js";
import style_default from "./style/index.js";
import useHasSider from "./hooks/useHasSider.js";
import { createVNode, defineComponent, mergeDefaults, mergeProps, ref } from "vue";
import { classNames } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/layout/layout.tsx
const basicDefaultProps = { hasSider: void 0 };
function generator({ suffixCls, tagName, displayName }) {
	return (BasicComponent) => {
		return /* @__PURE__ */ defineComponent((props, { attrs, slots }) => {
			return () => {
				return createVNode(BasicComponent, mergeProps(props, {
					"suffixCls": props?.suffixCls ?? suffixCls,
					"tagName": tagName
				}, attrs), slots);
			};
		}, {
			props: /* @__PURE__ */ mergeDefaults({
				suffixCls: {
					type: String,
					required: false
				},
				hasSider: {
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
			}, basicDefaultProps),
			name: displayName,
			inheritAttrs: false
		});
	};
}
const Basic = /* @__PURE__ */ defineComponent((props, { attrs, slots }) => {
	const { prefixCls } = useBaseConfig("layout", props);
	const [hashId, cssVarCls] = style_default(prefixCls);
	return () => {
		const { suffixCls, tagName, prefixCls: customizePrefixCls } = props;
		const prefixWithSuffixCls = suffixCls ? `${prefixCls.value}-${suffixCls}` : prefixCls.value;
		const { class: _attrClass, ...restAttrs } = attrs;
		return createVNode(tagName, {
			...restAttrs,
			class: classNames(customizePrefixCls || prefixWithSuffixCls, hashId.value, cssVarCls.value)
		}, slots);
	};
}, { props: /* @__PURE__ */ mergeDefaults({
	tagName: {
		type: String,
		required: true
	},
	suffixCls: {
		type: String,
		required: false
	},
	hasSider: {
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
}, basicDefaultProps) });
const BasicLayout = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const { direction, prefixCls } = useBaseConfig("layout", props);
	const compCtx = useComponentConfig("layout");
	const siders = ref([]);
	const [hashId, cssVarCls] = style_default(prefixCls);
	const addSider = (id) => {
		siders.value = [...siders.value, id];
	};
	const removeSider = (id) => {
		siders.value = siders.value.filter((currentId) => currentId !== id);
	};
	useLayoutProvider({ siderHook: {
		addSider,
		removeSider
	} });
	return () => {
		const { hasSider, rootClass, tagName, suffixCls } = props;
		const children = filterEmpty(slots?.default?.() || []);
		const mergedHasSider = useHasSider(siders.value, children, hasSider);
		const { class: _attrClass, style: attrStyle, ...restAttrs } = attrs;
		const classString = classNames(prefixCls.value, {
			[`${prefixCls.value}-has-sider`]: mergedHasSider,
			[`${prefixCls.value}-rtl`]: direction.value === "rtl"
		}, compCtx.value.class, rootClass, hashId.value, cssVarCls.value);
		return createVNode(tagName, {
			...restAttrs,
			suffixCls,
			class: classString,
			style: [compCtx.value.style, attrStyle]
		}, { default: () => children });
	};
}, { props: /* @__PURE__ */ mergeDefaults({
	tagName: {
		type: String,
		required: true
	},
	suffixCls: {
		type: String,
		required: false
	},
	hasSider: {
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
}, basicDefaultProps) });
const Layout = generator({
	tagName: "div",
	displayName: "ALayout"
})(BasicLayout);
const Header = generator({
	suffixCls: "header",
	tagName: "header",
	displayName: "ALayoutHeader"
})(Basic);
const Footer = generator({
	suffixCls: "footer",
	tagName: "footer",
	displayName: "ALayoutFooter"
})(Basic);
const Content = generator({
	suffixCls: "content",
	tagName: "main",
	displayName: "ALayoutContent"
})(Basic);
var layout_default = Layout;

//#endregion
export { Content, Footer, Header, layout_default as default };