import { usePreviewGroupProvider } from "./context.js";
import Preview from "./Preview/index.js";
import usePreviewItems from "./hooks/usePreviewItems.js";
import { Fragment, computed, createVNode, defineComponent, mergeDefaults, mergeProps, shallowRef, toRef, watch } from "vue";
import useMergedState from "@v-c/util/dist/hooks/useMergedState";
//#region src/PreviewGroup.tsx
var PreviewGroup = /* @__PURE__ */ defineComponent((props, { slots, emit }) => {
	const mergedPreviewConfig = computed(() => {
		if (props.preview && typeof props.preview === "object") return props.preview;
		return {};
	});
	const previewOpen = computed(() => mergedPreviewConfig.value.open);
	const previewCurrent = computed(() => mergedPreviewConfig.value.current);
	const [mergedItems, register, fromItems] = usePreviewItems(toRef(props, "items"));
	const [current, setCurrent] = useMergedState(0, { value: previewCurrent });
	const keepOpenIndex = shallowRef(false);
	const [isShowPreview, setShowPreview] = useMergedState(!!previewOpen.value, { value: previewOpen });
	const triggerShowPreview = (next) => {
		const prev = isShowPreview.value;
		setShowPreview(next);
		if (next !== prev) mergedPreviewConfig.value.onOpenChange?.(next, { current: current.value });
	};
	const mousePosition = shallowRef(null);
	const onPreviewFromImage = (id, imageSrc, mouseX, mouseY) => {
		const itemsList = mergedItems.value;
		const index = fromItems.value ? itemsList.findIndex((item) => item.data.src === imageSrc) : itemsList.findIndex((item) => item.id === id);
		setCurrent(index < 0 ? 0 : index);
		triggerShowPreview(true);
		mousePosition.value = {
			x: mouseX,
			y: mouseY
		};
		keepOpenIndex.value = true;
	};
	watch(isShowPreview, (open) => {
		if (open) {
			if (!keepOpenIndex.value) setCurrent(0);
		} else keepOpenIndex.value = false;
	});
	const onInternalChange = (next, prev) => {
		setCurrent(next);
		mergedPreviewConfig.value.onChange?.(next, prev);
		emit("change", next, prev);
	};
	const onPreviewClose = () => {
		triggerShowPreview(false);
		mousePosition.value = null;
	};
	usePreviewGroupProvider({
		register,
		onPreview: onPreviewFromImage
	});
	return () => {
		const itemsList = mergedItems.value;
		const { src, ...imgCommonProps } = itemsList[current.value]?.data || {};
		const countRender = slots.countRender ? (currentNum, total) => slots.countRender?.(currentNum, total) : mergedPreviewConfig.value.countRender;
		const { open: _open, current: _current, onOpenChange: _onOpenChange, onChange: _onChange, ...restPreviewConfig } = mergedPreviewConfig.value;
		return createVNode(Fragment, null, [slots.default?.(), createVNode(Preview, mergeProps({
			"aria-hidden": !isShowPreview.value,
			"open": isShowPreview.value,
			"prefixCls": props.previewPrefixCls,
			"onClose": onPreviewClose,
			"mousePosition": mousePosition.value,
			"imgCommonProps": imgCommonProps,
			"src": src,
			"fallback": props.fallback,
			"icons": props.icons,
			"current": current.value,
			"count": itemsList.length,
			"onChange": onInternalChange
		}, restPreviewConfig, {
			"countRender": countRender,
			"classNames": props.classNames?.popup,
			"styles": props.styles?.popup
		}), slots)]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		previewPrefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		classNames: {
			type: Object,
			required: false,
			default: void 0
		},
		styles: {
			type: Object,
			required: false,
			default: void 0
		},
		icons: {
			required: false,
			default: void 0
		},
		items: {
			type: Array,
			required: false,
			default: void 0
		},
		fallback: {
			type: String,
			required: false,
			default: void 0
		},
		preview: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		children: {
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
		}
	}, {
		previewPrefixCls: "vc-image-preview",
		icons: {}
	}),
	name: "ImagePreviewGroup",
	inheritAttrs: false,
	emits: ["change"]
});
//#endregion
export { PreviewGroup as default };
