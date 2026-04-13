import { useIconContext } from "./Context.js";
import { normalizeTwoToneColors } from "../utils.js";
import IconBaseComp from "./IconBase.js";
import { getTwoToneColor, setTwoToneColor } from "./twoTonePrimaryColor.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import { classNames } from "@v-c/util";
import { blue } from "@ant-design/colors";

//#region src/components/AntdIcon.tsx
setTwoToneColor(blue.primary);
const AntdIcon = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const iconContext = useIconContext();
	return () => {
		const { icon, spin, rotate, onClick, tabIndex, twoToneColor, ...restProps } = props;
		const { prefixCls = "anticon", rootClass } = iconContext.value;
		const classString = classNames(rootClass, prefixCls, {
			[`${prefixCls}-${icon.name}`]: !!icon.name,
			[`${prefixCls}-spin`]: !!spin || icon.name === "loading"
		});
		let iconTabIndex = tabIndex;
		if (iconTabIndex === void 0 && onClick) iconTabIndex = -1;
		const svgStyle = rotate ? {
			msTransform: `rotate(${rotate}deg)`,
			transform: `rotate(${rotate}deg)`
		} : void 0;
		const [primaryColor, secondaryColor] = normalizeTwoToneColors(twoToneColor);
		const restAttrs = { ...attrs };
		delete restAttrs.class;
		return createVNode("span", mergeProps({
			"role": "img",
			"aria-label": icon.name
		}, restProps, restAttrs, {
			"tabindex": iconTabIndex,
			"onClick": onClick,
			"class": [classString, attrs.class]
		}), [createVNode(IconBaseComp, {
			"icon": icon,
			"primaryColor": primaryColor,
			"secondaryColor": secondaryColor,
			"style": svgStyle
		}, null)]);
	};
}, {
	props: {
		icon: {
			type: Object,
			required: true
		},
		twoToneColor: {
			type: [String, Array],
			required: false
		},
		onClick: {
			type: Function,
			required: false
		},
		tabIndex: {
			type: Number,
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
	inheritAttrs: false
});
AntdIcon.getTwoToneColor = getTwoToneColor;
AntdIcon.setTwoToneColor = setTwoToneColor;

//#endregion
export { AntdIcon as default };