import { Fragment, createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
//#region src/Preview/PrevNext.tsx
var PrevNext = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		const { prefixCls, onActive, current, count, icons } = props;
		const switchCls = `${prefixCls}-switch`;
		const prevIcon = icons.prev ?? icons.left;
		const nextIcon = icons.next ?? icons.right;
		const prevDisabled = current === 0;
		const nextDisabled = current === count - 1;
		return createVNode(Fragment, null, [createVNode("button", {
			"type": "button",
			"class": clsx(switchCls, `${switchCls}-prev`, { [`${switchCls}-disabled`]: prevDisabled }),
			"onClick": () => {
				if (!prevDisabled) onActive(-1);
			}
		}, [prevIcon]), createVNode("button", {
			"type": "button",
			"class": clsx(switchCls, `${switchCls}-next`, { [`${switchCls}-disabled`]: nextDisabled }),
			"onClick": () => {
				if (!nextDisabled) onActive(1);
			}
		}, [nextIcon])]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		onActive: {
			type: Function,
			required: true
		},
		current: {
			type: Number,
			required: true
		},
		count: {
			type: Number,
			required: true
		},
		icons: {
			type: Object,
			required: true
		}
	},
	name: "ImagePreviewPrevNext"
});
//#endregion
export { PrevNext as default };
