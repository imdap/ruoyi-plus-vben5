import { useIconContext } from "./Context.js";
import { svgBaseProps, useInsertStyles } from "../utils.js";
import { createVNode, defineComponent, mergeProps, shallowRef } from "vue";
import { classNames, warning } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/components/Icon.tsx
const Icon = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	useInsertStyles(shallowRef());
	const iconContext = useIconContext();
	return () => {
		const { rootClass, prefixCls = "anticon" } = iconContext.value;
		const { spin, component, rotate, viewBox, tabIndex, onClick } = props;
		const classString = classNames(rootClass, prefixCls, { [`${prefixCls}-spin`]: !!spin && !!component });
		const svgClassString = classNames({ [`${prefixCls}-spin`]: !!spin });
		const svgStyle = rotate ? {
			msTransform: `rotate(${rotate}deg)`,
			transform: `rotate(${rotate}deg)`
		} : void 0;
		const innerSvgProps = {
			...svgBaseProps,
			class: svgClassString,
			style: svgStyle,
			viewBox
		};
		if (!viewBox) delete innerSvgProps.viewBox;
		const children = filterEmpty(slots?.default?.());
		const comp = filterEmpty(slots?.component?.(innerSvgProps));
		warning(Boolean(component || children.length || comp.length), "Should have `component` prop or `children`.");
		const renderInnerNode = () => {
			if (slots?.component) return slots.component();
			if (component) return createVNode(component, innerSvgProps, slots);
			if (children.length) {
				warning(Boolean(viewBox) || children.length === 1 && children[0]?.props?.type === "use", "Make sure that you provide correct `viewBox` prop (default `0 0 1024 1024`) to the icon.");
				return createVNode("svg", mergeProps(innerSvgProps, { "viewBox": viewBox }), [slots?.default?.()]);
			}
			return null;
		};
		let iconTabIndex = tabIndex;
		if (iconTabIndex === void 0 && onClick) iconTabIndex = -1;
		return createVNode("span", mergeProps({ "role": "img" }, attrs, {
			"tabindex": iconTabIndex,
			"onClick": onClick,
			"class": classString
		}), [renderInnerNode()]);
	};
}, {
	props: {
		viewBox: {
			type: String,
			required: false
		},
		component: { required: false },
		ariaLabel: { required: false },
		tabIndex: {
			type: Number,
			required: false
		},
		onClick: {
			type: Function,
			required: false
		},
		spin: {
			type: Boolean,
			required: false
		},
		rotate: {
			type: Number,
			required: false
		}
	},
	name: "AntdIcon",
	inheritAttrs: false
});

//#endregion
export { Icon as default };