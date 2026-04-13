import tooltip_default from "../../tooltip/index.js";
import { createVNode, defineComponent, mergeProps } from "vue";

//#region src/typography/Base/EllipsisTooltip.tsx
const EllipsisTooltip = /* @__PURE__ */ defineComponent({
	props: {
		tooltipProps: {
			type: Object,
			required: false
		},
		enableEllipsis: {
			type: Boolean,
			required: true
		},
		isEllipsis: {
			type: Boolean,
			required: false,
			default: void 0
		},
		open: {
			type: Boolean,
			required: true
		}
	},
	name: "TypographyEllipsisTooltip",
	inheritAttrs: false,
	setup(props, { slots }) {
		return () => {
			if (!props.tooltipProps?.title || !props.enableEllipsis) return slots.default?.();
			const mergedOpen = props.open && props.isEllipsis;
			return createVNode(tooltip_default, mergeProps({ "open": mergedOpen }, props.tooltipProps), { default: () => [slots.default?.()] });
		};
	}
});
var EllipsisTooltip_default = EllipsisTooltip;

//#endregion
export { EllipsisTooltip_default as default };