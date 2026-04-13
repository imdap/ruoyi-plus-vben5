import { computed, createVNode, defineComponent, mergeProps } from "vue";
import Portal from "@v-c/portal";
var Placeholder_default = /* @__PURE__ */ defineComponent((props, { expose, attrs }) => {
	expose({
		getDom: () => {
			return props?.domRef.value ?? props?.fallbackDOM?.();
		},
		__$el: computed(() => props?.domRef?.value ?? props?.fallbackDOM?.())
	});
	return () => {
		const { open, autoLock, getContainer } = props;
		return createVNode(Portal, {
			"open": open,
			"autoLock": autoLock,
			"getContainer": getContainer
		}, { default: () => [createVNode("div", mergeProps({ "ref": props.domRef }, attrs), null)] });
	};
}, {
	props: {
		domRef: {
			type: Object,
			required: true,
			default: void 0
		},
		fallbackDOM: {
			type: Function,
			required: true,
			default: void 0
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		autoLock: {
			type: Boolean,
			required: false,
			default: void 0
		},
		getContainer: {
			type: [
				String,
				Function,
				Boolean
			],
			required: false,
			skipCheck: true,
			default: void 0
		}
	},
	name: "TourPlaceholder",
	inheritAttrs: false
});
export { Placeholder_default as default };
