import { createTextVNode, createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import pickAttrs from "@v-c/util/dist/pickAttrs";
var DefaultPanel_default = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	return () => {
		const { prefixCls, current, total, title, description, onClose, onPrev, onNext, onFinish, closable, classNames: tourClassNames, styles } = props;
		const ariaProps = pickAttrs(closable || {}, true);
		const closeIcon = closable?.closeIcon ?? createVNode("span", { "class": `${prefixCls}-close-x` }, [createTextVNode("×")]);
		const mergedClosable = !!closable;
		const className = attrs.class;
		return createVNode("div", { "class": clsx(`${prefixCls}-panel`, className) }, [createVNode("div", {
			"class": clsx(`${prefixCls}-section`, tourClassNames?.section),
			"style": styles?.section
		}, [
			mergedClosable && createVNode("button", mergeProps({
				"type": "button",
				"onClick": onClose,
				"aria-label": "Close"
			}, ariaProps, { "class": `${prefixCls}-close` }), [closeIcon]),
			createVNode("div", {
				"class": clsx(`${prefixCls}-header`, tourClassNames?.header),
				"style": styles?.header
			}, [createVNode("div", {
				"class": clsx(`${prefixCls}-title`, tourClassNames?.title),
				"style": styles?.title
			}, [title])]),
			createVNode("div", {
				"class": clsx(`${prefixCls}-description`, tourClassNames?.description),
				"style": styles?.description
			}, [description]),
			createVNode("div", {
				"class": clsx(`${prefixCls}-footer`, tourClassNames?.footer),
				"style": styles?.footer
			}, [createVNode("div", { "class": `${prefixCls}-sliders` }, [total > 1 ? [...Array.from({ length: total }).keys()].map((item, index) => {
				return createVNode("span", {
					"key": item,
					"class": index === current ? "active" : ""
				}, null);
			}) : null]), createVNode("div", {
				"class": clsx(`${prefixCls}-actions`, tourClassNames?.actions),
				"style": styles?.actions
			}, [current !== 0 ? createVNode("button", {
				"class": `${prefixCls}-prev-btn`,
				"onClick": onPrev
			}, [createTextVNode("Prev")]) : null, current === total - 1 ? createVNode("button", {
				"class": `${prefixCls}-finish-btn`,
				"onClick": onFinish
			}, [createTextVNode("Finish")]) : createVNode("button", {
				"class": `${prefixCls}-next-btn`,
				"onClick": onNext
			}, [createTextVNode("Next")])])])
		])]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		total: {
			type: Number,
			required: false,
			default: void 0
		},
		current: {
			type: Number,
			required: false,
			default: void 0
		},
		onClose: {
			type: Function,
			required: false,
			default: void 0
		},
		onFinish: {
			type: Function,
			required: false,
			default: void 0
		},
		renderPanel: {
			type: Function,
			required: false,
			default: void 0
		},
		onPrev: {
			type: Function,
			required: false,
			default: void 0
		},
		onNext: {
			type: Function,
			required: false,
			default: void 0
		},
		classNames: {
			type: Object,
			required: false,
			default: void 0
		},
		styles: {
			type: Object,
			required: false,
			default: void 0
		},
		arrow: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		target: {
			type: [
				Object,
				null,
				Function
			],
			required: false,
			skipCheck: true,
			default: void 0
		},
		title: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: true,
			default: void 0
		},
		description: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		placement: {
			type: String,
			required: false,
			default: void 0
		},
		className: {
			type: String,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false,
			default: void 0
		},
		mask: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		scrollIntoViewOptions: {
			type: Boolean,
			required: false,
			skipCheck: true,
			default: void 0
		},
		closeIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		closable: {
			type: [
				Boolean,
				Object,
				null
			],
			required: false,
			default: void 0
		}
	},
	name: "TourDefaultPanel",
	inheritAttrs: false
});
export { DefaultPanel_default as default };
