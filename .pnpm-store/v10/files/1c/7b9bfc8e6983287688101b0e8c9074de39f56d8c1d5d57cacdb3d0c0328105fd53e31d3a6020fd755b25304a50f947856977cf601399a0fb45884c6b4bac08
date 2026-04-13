import { useConfig } from "../config-provider/context.js";
import SingleNumber_default from "./SingleNumber.js";
import { cloneVNode, computed, createVNode, defineComponent, isVNode, mergeProps } from "vue";
import { classNames } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/badge/ScrollNumber.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var ScrollNumber_default = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const configContext = useConfig();
	const prefixCls = computed(() => configContext.value.getPrefixCls("scroll-number", props.prefixCls));
	return () => {
		const { component = "sup", count, show, title } = props;
		const { class: attrClass, style: attrStyle, ...restAttrs } = attrs;
		const children = filterEmpty(slots.default?.() ?? []);
		const mergedStyleList = [attrStyle?.borderColor ? {
			...attrStyle,
			boxShadow: `0 0 0 1px ${attrStyle.borderColor} inset`
		} : attrStyle, attrStyle].filter(Boolean);
		if (children.length) {
			const child = children[0];
			return cloneVNode(child, { class: classNames(`${prefixCls.value}-custom-component`, child.props?.class) });
		}
		let numberNodes = count;
		const numericValue = Number(count);
		if (count !== null && count !== void 0 && !Number.isNaN(numericValue) && numericValue % 1 === 0) {
			const numberList = String(count).split("");
			numberNodes = createVNode("bdi", null, [numberList.map((num, index) => createVNode(SingleNumber_default, {
				"key": numberList.length - index,
				"prefixCls": prefixCls.value,
				"value": num,
				"count": numericValue
			}, null))]);
		}
		return createVNode(component, mergeProps(restAttrs, {
			"data-show": show,
			"class": classNames(prefixCls.value, attrClass),
			"style": mergedStyleList.length ? mergedStyleList : void 0,
			"title": title
		}), _isSlot(numberNodes) ? numberNodes : { default: () => [numberNodes] });
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: false
		},
		count: {
			type: [
				String,
				Number,
				null
			],
			required: false
		},
		component: {
			type: [String, Object],
			required: false
		},
		title: {
			type: [
				String,
				Number,
				null
			],
			required: false
		},
		show: {
			type: Boolean,
			required: true
		}
	},
	name: "AScrollNumber",
	inheritAttrs: false
});

//#endregion
export { ScrollNumber_default as default };