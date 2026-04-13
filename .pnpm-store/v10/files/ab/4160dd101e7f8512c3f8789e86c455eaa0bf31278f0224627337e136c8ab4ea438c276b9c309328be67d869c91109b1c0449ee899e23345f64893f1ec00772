import { getSlotPropsFnRun } from "../../_util/tools.js";
import { createVNode, defineComponent, isVNode } from "vue";
import { CaretDownFilled, FileOutlined, LoadingOutlined, MinusSquareOutlined, PlusSquareOutlined } from "@antdv-next/icons";

//#region src/tree/utils/iconUtil.tsx
const SwitcherIconCom = /* @__PURE__ */ defineComponent((props, { slots }) => {
	return () => {
		const { prefixCls, switcherIcon, treeNodeProps, showLine } = props;
		const switcherLoadingIcon = getSlotPropsFnRun(slots, props, "switcherLoadingIcon");
		const { isLeaf, expanded, loading } = treeNodeProps;
		if (loading) {
			if (isVNode(switcherLoadingIcon)) return switcherLoadingIcon;
			return createVNode(LoadingOutlined, { "class": `${prefixCls}-switcher-loading-icon` }, null);
		}
		let showLeafIcon;
		if (showLine && typeof showLine === "object") showLeafIcon = showLine.showLeafIcon;
		if (isLeaf) {
			if (!showLine) return null;
			if (typeof showLeafIcon !== "boolean" && !!showLeafIcon) {
				const leafIcon = typeof showLeafIcon === "function" ? showLeafIcon(treeNodeProps) : showLeafIcon;
				const leafCls = `${prefixCls}-switcher-line-custom-icon`;
				if (isVNode(showLeafIcon)) return createVNode(showLeafIcon, { class: leafCls });
				return leafIcon;
			}
			return showLeafIcon ? createVNode(FileOutlined, { "class": `${prefixCls}-switcher-line-icon` }, null) : createVNode("span", { "class": `${prefixCls}-switcher-leaf-line` }, null);
		}
		const switcherCls = `${prefixCls}-switcher-icon`;
		let switcher = typeof switcherIcon === "function" ? switcherIcon(treeNodeProps) : switcherIcon;
		if (Array.isArray(switcher) && switcher.length === 1) switcher = switcher[0];
		if (isVNode(switcher)) return createVNode(switcher, { class: [switcher.props?.classes, showLine ? `${prefixCls}-switcher-line-icon` : switcherCls] });
		if (switcher !== void 0) return switcher;
		if (showLine) return expanded ? createVNode(MinusSquareOutlined, { "class": `${prefixCls}-switcher-line-icon` }, null) : createVNode(PlusSquareOutlined, { "class": `${prefixCls}-switcher-line-icon` }, null);
		return createVNode(CaretDownFilled, { "class": switcherCls }, null);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		treeNodeProps: {
			type: Object,
			required: true
		},
		switcherIcon: {
			type: Function,
			required: false,
			skipCheck: true
		},
		switcherLoadingIcon: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		showLine: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		}
	},
	name: "SwitcherIconCom",
	inheritAttrs: false
});
var iconUtil_default = SwitcherIconCom;

//#endregion
export { iconUtil_default as default };