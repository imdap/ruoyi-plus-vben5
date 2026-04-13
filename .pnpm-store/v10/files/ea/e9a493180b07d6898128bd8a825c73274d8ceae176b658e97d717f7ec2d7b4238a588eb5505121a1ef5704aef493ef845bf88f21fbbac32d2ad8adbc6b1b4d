import { useRefContext } from "./context.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import pickAttrs from "@v-c/util/dist/pickAttrs";
import { getAttrStyleAndClass } from "@v-c/util/dist/props-util";
//#region src/DrawerPanel.tsx
var DrawerPanel_default = /* @__PURE__ */ defineComponent({
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		id: {
			type: String,
			required: false,
			default: void 0
		},
		onMouseEnter: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseOver: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseLeave: {
			type: Function,
			required: false,
			default: void 0
		},
		onClick: {
			type: Function,
			required: false,
			default: void 0
		},
		onKeyDown: {
			type: Function,
			required: false,
			default: void 0
		},
		onKeyUp: {
			type: Function,
			required: false,
			default: void 0
		}
	},
	name: "DrawerPanel",
	inheritAttrs: false,
	setup(props, { slots, attrs }) {
		const { setPanel } = useRefContext();
		const setRef = (el) => {
			setPanel?.(el);
		};
		return () => {
			const { prefixCls, id } = props;
			const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
			const attrsProps = {
				onMouseenter: props.onMouseEnter,
				onMouseover: props.onMouseOver,
				onMouseleave: props.onMouseLeave,
				onClick: props.onClick,
				onKeydown: props.onKeyDown,
				onKeyup: props.onKeyUp
			};
			return createVNode("div", mergeProps({
				"class": clsx(`${prefixCls}-section`, className),
				"style": style,
				"role": "dialog"
			}, pickAttrs(restAttrs, { aria: true }), attrsProps, {
				"aria-modal": "true",
				"id": id,
				"ref": setRef
			}), [slots.default?.()]);
		};
	}
});
//#endregion
export { DrawerPanel_default as default };
