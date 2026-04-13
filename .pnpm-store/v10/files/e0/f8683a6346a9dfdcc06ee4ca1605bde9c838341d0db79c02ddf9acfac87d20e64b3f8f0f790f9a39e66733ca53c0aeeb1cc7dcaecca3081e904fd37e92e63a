import { cloneVNode, computed, createVNode, defineComponent, isVNode } from "vue";
import KeyCode from "@v-c/util/dist/KeyCode";
function cloneCharacterNode(node) {
	if (Array.isArray(node)) return node.map((item) => isVNode(item) ? cloneVNode(item) : item);
	return isVNode(node) ? cloneVNode(node) : node;
}
var Star_default = /* @__PURE__ */ defineComponent((props) => {
	const onHover = (e) => {
		const { index } = props;
		props?.onHover?.(e, index);
	};
	const onClick = (e) => {
		const { index } = props;
		props?.onClick?.(e, index);
	};
	const onKeyDown = (e) => {
		const { index } = props;
		if (e.keyCode === KeyCode.ENTER) props?.onClick?.(e, index);
	};
	const cls = computed(() => {
		const { prefixCls, index, value, allowHalf, focused } = props;
		const starValue = index + 1;
		let className = prefixCls;
		if (value === 0 && index === 0 && focused) className += ` ${prefixCls}-focused`;
		else if (allowHalf && value + .5 >= starValue && value < starValue) {
			className += ` ${prefixCls}-half ${prefixCls}-active`;
			if (focused) className += ` ${prefixCls}-focused`;
		} else {
			if (starValue <= value) className += ` ${prefixCls}-full`;
			else className += ` ${prefixCls}-zero`;
			if (starValue === value && focused) className += ` ${prefixCls}-focused`;
		}
		return className;
	});
	return () => {
		const { disabled, prefixCls, characterRender, character, index, count, value } = props;
		const characterNode = typeof character === "function" ? character({
			disabled,
			prefixCls,
			index,
			count,
			value
		}) : character;
		const firstCharacterNode = cloneCharacterNode(characterNode);
		const secondCharacterNode = cloneCharacterNode(characterNode);
		let star = createVNode("li", { "class": cls.value }, [createVNode("div", {
			"onClick": disabled ? null : onClick,
			"onKeydown": disabled ? null : onKeyDown,
			"onMousemove": disabled ? null : onHover,
			"role": "radio",
			"aria-checked": value > index ? "true" : "false",
			"aria-posinset": index + 1,
			"aria-setsize": count,
			"tabindex": disabled ? -1 : 0
		}, [createVNode("div", { "class": `${prefixCls}-first` }, [firstCharacterNode]), createVNode("div", { "class": `${prefixCls}-second` }, [secondCharacterNode])])]);
		if (characterRender) star = characterRender(star, props);
		return star;
	};
}, {
	props: {
		value: {
			type: Number,
			required: false,
			default: void 0
		},
		index: {
			type: Number,
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		allowHalf: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		character: {
			type: [
				Function,
				Object,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		characterRender: {
			type: Function,
			required: false,
			default: void 0
		},
		onClick: {
			type: Function,
			required: false,
			default: void 0
		},
		onHover: {
			type: Function,
			required: false,
			default: void 0
		},
		focused: {
			type: Boolean,
			required: false,
			default: void 0
		},
		count: {
			type: Number,
			required: false,
			default: void 0
		}
	},
	name: "RateStar",
	inheritAttrs: false
});
export { Star_default as default };
