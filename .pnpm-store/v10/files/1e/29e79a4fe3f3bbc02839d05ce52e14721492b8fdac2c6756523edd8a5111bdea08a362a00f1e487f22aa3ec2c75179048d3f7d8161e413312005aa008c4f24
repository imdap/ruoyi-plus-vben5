import useOffsetStyle from "../hooks/useOffsetStyle.js";
import { Transition, computed, createVNode, defineComponent, shallowRef, vShow, watchEffect, withDirectives } from "vue";
import { toPropsRefs } from "@v-c/util/dist/props-util";
import { getTransitionProps } from "@v-c/util/dist/utils/transition";
var UniqueContainer_default = /* @__PURE__ */ defineComponent((props) => {
	const motionVisible = shallowRef(false);
	const { open, isMobile, align, ready, offsetR, offsetB, offsetX, offsetY } = toPropsRefs(props, "open", "isMobile", "align", "ready", "offsetR", "offsetB", "offsetX", "offsetY");
	const offsetStyle = useOffsetStyle(isMobile, ready, open, align, offsetR, offsetB, offsetX, offsetY);
	const cachedOffsetStyleRef = shallowRef(offsetStyle.value);
	watchEffect(() => {
		if (ready.value) cachedOffsetStyleRef.value = offsetStyle.value;
	});
	const mergedOffsetStyle = computed(() => {
		if (cachedOffsetStyleRef.value && Object.keys(cachedOffsetStyleRef.value).length > 0) return cachedOffsetStyleRef.value;
		return offsetStyle.value;
	});
	return () => {
		const { popupSize, motion, prefixCls, uniqueContainerClassName, arrowPos, uniqueContainerStyle } = props;
		const sizeStyle = {};
		if (popupSize) {
			sizeStyle.width = `${popupSize.width}px`;
			sizeStyle.height = `${popupSize.height}px`;
		}
		const baseTransitionProps = getTransitionProps(motion?.name, motion);
		const containerCls = `${prefixCls}-unique-container`;
		return createVNode(Transition, {
			...baseTransitionProps,
			onAfterEnter: (element) => {
				motionVisible.value = true;
				baseTransitionProps.onAfterEnter?.(element);
			},
			onAfterLeave: (element) => {
				motionVisible.value = false;
				baseTransitionProps.onAfterLeave?.(element);
			}
		}, { default: () => [withDirectives(createVNode("div", {
			"class": [
				containerCls,
				uniqueContainerClassName,
				{
					[`${containerCls}-visible`]: motionVisible.value,
					[`${containerCls}-hidden`]: !open.value
				}
			],
			"style": [
				{
					"--arrow-x": `${arrowPos?.x || 0}px`,
					"--arrow-y": `${arrowPos?.y || 0}px`
				},
				mergedOffsetStyle.value,
				sizeStyle,
				uniqueContainerStyle
			]
		}, null), [[vShow, open.value]])] });
	};
}, { props: {
	prefixCls: {
		type: String,
		required: true,
		default: void 0
	},
	isMobile: {
		type: Boolean,
		required: true,
		default: void 0
	},
	ready: {
		type: Boolean,
		required: true,
		default: void 0
	},
	open: {
		type: Boolean,
		required: true,
		default: void 0
	},
	align: {
		type: Object,
		required: true,
		default: void 0
	},
	offsetR: {
		type: Number,
		required: true,
		default: void 0
	},
	offsetB: {
		type: Number,
		required: true,
		default: void 0
	},
	offsetX: {
		type: Number,
		required: true,
		default: void 0
	},
	offsetY: {
		type: Number,
		required: true,
		default: void 0
	},
	arrowPos: {
		type: Object,
		required: false,
		default: void 0
	},
	popupSize: {
		type: Object,
		required: false,
		default: void 0
	},
	motion: {
		type: Object,
		required: false,
		default: void 0
	},
	uniqueContainerClassName: {
		type: String,
		required: false,
		default: void 0
	},
	uniqueContainerStyle: {
		type: Object,
		required: false,
		default: void 0
	}
} });
export { UniqueContainer_default as default };
