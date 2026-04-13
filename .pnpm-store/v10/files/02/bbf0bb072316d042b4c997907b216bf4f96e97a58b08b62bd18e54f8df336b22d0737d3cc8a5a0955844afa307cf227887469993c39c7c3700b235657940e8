import { createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
//#region src/Preview/CloseBtn.tsx
var CloseBtn = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		const { prefixCls, icon, onClick, className, style } = props;
		return createVNode("button", {
			"class": clsx(`${prefixCls}-close`, className),
			"style": style,
			"type": "button",
			"onClick": onClick
		}, [icon]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		icon: {
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
		onClick: {
			type: Function,
			required: true
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
		}
	},
	name: "ImagePreviewCloseBtn"
});
//#endregion
export { CloseBtn as default };
