import button_default from "../button/index.js";
import { cloneVNode, createVNode, defineComponent, isVNode, mergeProps } from "vue";
import { LeftOutlined, RightOutlined } from "@antdv-next/icons";

//#region src/transfer/Actions.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function getArrowIcon(type, direction) {
	const isRight = type === "right";
	if (direction !== "rtl") return isRight ? createVNode(RightOutlined, null, null) : createVNode(LeftOutlined, null, null);
	return isRight ? createVNode(LeftOutlined, null, null) : createVNode(RightOutlined, null, null);
}
const Action = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		const isRight = props.type === "right";
		const button = isRight ? props.actions[0] : props.actions[1];
		const moveHandler = isRight ? props.moveToRight : props.moveToLeft;
		const active = isRight ? props.rightActive : props.leftActive;
		const icon = getArrowIcon(props.type, props.direction);
		if (isVNode(button)) {
			const onClick = (event) => {
				(button.props || {})?.onClick?.(event);
				moveHandler?.(event);
			};
			return cloneVNode(button, {
				disabled: props.disabled || !active,
				onClick
			});
		}
		return createVNode(button_default, {
			"type": "primary",
			"size": "small",
			"disabled": props.disabled || !active,
			"onClick": (event) => moveHandler?.(event),
			"icon": icon
		}, _isSlot(button) ? button : { default: () => [button] });
	};
}, {
	props: {
		type: {
			type: String,
			required: true
		},
		actions: {
			type: Array,
			required: true
		},
		moveToLeft: {
			type: Function,
			required: false
		},
		moveToRight: {
			type: Function,
			required: false
		},
		leftActive: {
			type: Boolean,
			required: false,
			default: void 0
		},
		rightActive: {
			type: Boolean,
			required: false,
			default: void 0
		},
		direction: {
			type: [String, null],
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	name: "ATransferAction",
	inheritAttrs: false
});
const Actions = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		const { class: className, style, oneWay, actions, ...restProps } = props;
		return createVNode("div", {
			"class": className,
			"style": style
		}, [
			createVNode(Action, mergeProps({
				"type": "right",
				"actions": actions
			}, restProps), null),
			!oneWay && createVNode(Action, mergeProps({
				"type": "left",
				"actions": actions
			}, restProps), null),
			actions.slice(oneWay ? 1 : 2).map((node) => node)
		]);
	};
}, {
	props: {
		class: {
			type: String,
			required: false
		},
		actions: {
			type: Array,
			required: true
		},
		moveToLeft: {
			type: Function,
			required: false
		},
		moveToRight: {
			type: Function,
			required: false
		},
		leftActive: {
			type: Boolean,
			required: false,
			default: void 0
		},
		rightActive: {
			type: Boolean,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		direction: {
			type: [String, null],
			required: false
		},
		oneWay: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	name: "ATransferOperation",
	inheritAttrs: false
});
var Actions_default = Actions;

//#endregion
export { Actions_default as default };