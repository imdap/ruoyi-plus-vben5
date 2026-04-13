import tooltip_default from "../tooltip/index.js";
import { computed, createVNode, defineComponent, mergeProps, nextTick, onUnmounted, shallowRef, watch } from "vue";
import raf from "@v-c/util/dist/raf";

//#region src/slider/SliderTooltip.tsx
const SliderTooltip = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const innerRef = shallowRef();
	const mergedOpen = computed(() => props?.open && !props?.draggingDelete);
	const rafRef = shallowRef(null);
	function cancelKeepAlign() {
		raf.cancel(rafRef.value);
		rafRef.value = null;
	}
	function keepAlign() {
		rafRef.value = raf(() => {
			innerRef.value?.forceAlign();
			rafRef.value = null;
		});
	}
	watch([
		mergedOpen,
		() => props.title,
		() => props.value
	], async (_n, _o, onCleanup) => {
		await nextTick();
		if (mergedOpen.value) keepAlign();
		else cancelKeepAlign();
		onCleanup(() => {
			cancelKeepAlign();
		});
	});
	onUnmounted(() => {
		cancelKeepAlign();
	});
	return () => {
		return createVNode(tooltip_default, mergeProps(props, {
			"open": mergedOpen.value,
			"ref": innerRef
		}), { default: () => [slots?.default?.()] });
	};
}, {
	props: {
		afterOpenChange: {
			type: Function,
			required: false
		},
		builtinPlacements: { required: false },
		title: {
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
		overlay: {
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
		openClass: {
			type: String,
			required: false
		},
		unique: {
			type: Boolean,
			required: false,
			default: void 0
		},
		align: {
			type: Object,
			required: false
		},
		arrow: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		autoAdjustOverflow: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		color: { required: false },
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: false,
			default: void 0
		},
		getPopupContainer: {
			type: Function,
			required: false
		},
		destroyOnHidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		zIndex: {
			type: Number,
			required: false
		},
		placement: {
			type: String,
			required: false
		},
		trigger: {
			type: [String, Array],
			required: false
		},
		fresh: {
			type: Boolean,
			required: false,
			default: void 0
		},
		mouseEnterDelay: {
			type: Number,
			required: false
		},
		mouseLeaveDelay: {
			type: Number,
			required: false
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		getTooltipContainer: {
			type: Function,
			required: false
		},
		motion: { required: false },
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		draggingDelete: {
			type: Boolean,
			required: false,
			default: void 0
		},
		value: {
			type: Number,
			required: false
		}
	},
	name: "SliderTooltip",
	inheritAttrs: false
});
var SliderTooltip_default = SliderTooltip;

//#endregion
export { SliderTooltip_default as default };