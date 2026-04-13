import { createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";

//#region src/splitter/Panel.tsx
const InternalPanel = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	return () => {
		const { prefixCls, class: className, size, style = {} } = props;
		const panelClassName = clsx(`${prefixCls}-panel`, { [`${prefixCls}-panel-hidden`]: size === 0 }, className);
		const hasSize = size !== void 0;
		return createVNode("div", mergeProps(attrs, {
			"class": panelClassName,
			"style": {
				...style,
				flexBasis: hasSize ? typeof size === "number" ? `${size}px` : size : "auto",
				flexGrow: hasSize ? 0 : 1
			}
		}), [slots?.default?.()]);
	};
}, {
	props: {
		class: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		style: {
			type: Object,
			required: false
		},
		min: {
			type: [Number, String],
			required: false
		},
		max: {
			type: [Number, String],
			required: false
		},
		size: {
			type: [Number, String],
			required: false
		},
		collapsible: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		resizable: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultSize: {
			type: [Number, String],
			required: false
		}
	},
	name: "ASplitterPanel",
	inheritAttrs: false
});
const Panel = /* @__PURE__ */ defineComponent(() => () => null, {
	props: {
		class: {
			type: String,
			required: false
		},
		style: {
			type: Object,
			required: false
		},
		min: {
			type: [Number, String],
			required: false
		},
		max: {
			type: [Number, String],
			required: false
		},
		size: {
			type: [Number, String],
			required: false
		},
		collapsible: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		resizable: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultSize: {
			type: [Number, String],
			required: false
		}
	},
	name: "ASplitterPanel"
});
var Panel_default = Panel;

//#endregion
export { InternalPanel, Panel_default as default };