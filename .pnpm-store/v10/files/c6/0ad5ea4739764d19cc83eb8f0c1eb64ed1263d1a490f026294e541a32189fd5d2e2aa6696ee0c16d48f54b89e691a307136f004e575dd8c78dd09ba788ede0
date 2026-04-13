import tooltip_default from "../../tooltip/index.js";
import { getNode, toList } from "./util.js";
import { createVNode, defineComponent } from "vue";
import { classNames } from "@v-c/util";
import { CheckOutlined, CopyOutlined, LoadingOutlined } from "@antdv-next/icons";

//#region src/typography/Base/CopyBtn.tsx
const CopyBtn = /* @__PURE__ */ defineComponent((props, { emit }) => {
	const handleCopy = (e) => {
		emit("copy", e);
	};
	return () => {
		const tooltipNodes = toList(props.tooltips);
		const iconNodes = toList(props.icon);
		const { copied: copiedText, copy: copyText } = props.locale ?? {};
		const systemStr = props.copied ? copiedText : copyText;
		const copyTitle = getNode(tooltipNodes[props.copied ? 1 : 0], systemStr);
		const ariaLabel = typeof copyTitle === "string" ? copyTitle : systemStr;
		return createVNode(tooltip_default, { "title": copyTitle }, { default: () => [createVNode("button", {
			"type": "button",
			"class": classNames(`${props.prefixCls}-copy`, {
				[`${props.prefixCls}-copy-success`]: props.copied,
				[`${props.prefixCls}-copy-icon-only`]: props.iconOnly
			}, props.className),
			"onClick": handleCopy,
			"aria-label": ariaLabel,
			"tabindex": props.tabIndex,
			"style": props.style
		}, [props.copied ? getNode(iconNodes[1], createVNode(CheckOutlined, null, null), true) : getNode(iconNodes[0], props.loading ? createVNode(LoadingOutlined, null, null) : createVNode(CopyOutlined, null, null), true)])] });
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		copied: {
			type: Boolean,
			required: true
		},
		locale: {
			type: Object,
			required: true
		},
		iconOnly: {
			type: Boolean,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		className: {
			type: String,
			required: false
		},
		style: {
			type: Object,
			required: false
		},
		text: {
			type: [String, Function],
			required: false
		},
		icon: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		tooltips: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		format: {
			type: String,
			required: false
		},
		tabIndex: {
			type: Number,
			required: false
		}
	},
	emits: ["copy"],
	name: "TypographyCopyBtn",
	inheritAttrs: false
});
CopyBtn.install = (app) => {
	app.component(CopyBtn.name, CopyBtn);
};
var CopyBtn_default = CopyBtn;

//#endregion
export { CopyBtn_default as default };