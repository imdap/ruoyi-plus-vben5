import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import useMergedPreviewConfig_default from "./hooks/useMergedPreviewConfig.js";
import usePreviewConfig from "./hooks/usePreviewConfig.js";
import style_default from "./style/index.js";
import PreviewGroup_default, { icons } from "./PreviewGroup.js";
import { computed, createVNode, defineComponent, mergeProps, ref } from "vue";
import { clsx } from "@v-c/util";
import { getAttrStyleAndClass } from "@v-c/util/dist/props-util";
import { omit } from "es-toolkit";
import VcImage from "@v-c/image";

//#region src/image/index.tsx
const Image = /* @__PURE__ */ defineComponent((props, { slots, emit, attrs }) => {
	const { preview, classes, styles } = toPropsRefs$1(props, "preview", "classes", "styles");
	const { getPopupContainer: getContextPopupContainer, class: contextClassName, style: contextStyle, preview: contextPreview, styles: contextStyles, classes: contextClassNames, fallback: contextFallback, prefixCls } = useComponentBaseConfig("image", props, ["preview", "fallback"]);
	if (isDev) devUseWarning("Image").deprecated(!props.wrapperStyle, "wrapperStyle", "styles.root");
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const mergedRootClassName = computed(() => clsx(props.rootClass, hashId.value, cssVarCls.value, rootCls.value));
	const usePreviewConfig_ = usePreviewConfig(preview);
	const useContextPreviewConfig_ = usePreviewConfig(contextPreview);
	const previewConfig = computed(() => usePreviewConfig_.value[0]);
	const previewMaskClassName = computed(() => usePreviewConfig_.value[2]);
	const previewRootClassName = computed(() => usePreviewConfig_.value[1]);
	const contextPreviewConfig = computed(() => useContextPreviewConfig_.value[0]);
	const contextPreviewMaskClassName = computed(() => useContextPreviewConfig_.value[2]);
	const contextPreviewRootClassName = computed(() => useContextPreviewConfig_.value[1]);
	const mergedPreviewConfig = useMergedPreviewConfig_default(previewConfig, contextPreviewConfig, prefixCls, mergedRootClassName, getContextPopupContainer, computed(() => icons), ref(true));
	const mergedProps = computed(() => {
		return {
			...props,
			preview: mergedPreviewConfig.value
		};
	});
	const mergedLegacyClassNames = computed(() => {
		return {
			cover: clsx(contextPreviewMaskClassName.value, previewMaskClassName.value),
			popup: { root: clsx(contextPreviewRootClassName.value, previewRootClassName.value) }
		};
	});
	const mergedMask = computed(() => mergedPreviewConfig?.value?.mask);
	const blurClassName = computed(() => mergedPreviewConfig?.value?.blurClassName);
	const mergedPopupClassNames = computed(() => {
		return { mask: clsx({ [`${prefixCls.value}-preview-mask-hidden`]: !mergedMask.value }, blurClassName.value) };
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes, mergedLegacyClassNames, computed(() => ({ popup: mergedPopupClassNames.value }))), useToArr(contextStyles, computed(() => ({ root: props.wrapperStyle })), styles), useToProps(mergedProps), computed(() => {
		return { popup: { _default: "root" } };
	}));
	return () => {
		const mergedFallback = getSlotPropsFnRun(slots, props, "fallback") ?? contextFallback.value;
		const placeholder = getSlotPropsFnRun(slots, props, "placeholder", false);
		const { style, className, restAttrs } = getAttrStyleAndClass(attrs);
		const mergedClassName = clsx(className, hashId.value, contextClassName.value);
		const mergedStyle = {
			...contextStyle.value,
			...style
		};
		const otherProps = omit(props, [
			"prefixCls",
			"preview",
			"styles",
			"classes",
			"rootClass",
			"wrapperStyle",
			"fallback"
		]);
		const onEvents = {
			onError: (e) => {
				emit("error", e);
			},
			onClick: (e) => {
				emit("click", e);
			}
		};
		if (slots?.imageRender) mergedPreviewConfig.value.imageRender = slots.imageRender;
		if (slots?.cover && (mergedPreviewConfig.value?.mask || typeof mergedPreviewConfig.value?.mask === "boolean")) mergedPreviewConfig.value.cover = slots.cover();
		return createVNode(VcImage, mergeProps(restAttrs, {
			"prefixCls": prefixCls.value,
			"preview": mergedPreviewConfig.value || false,
			"rootClassName": mergedRootClassName.value,
			"class": mergedClassName,
			"style": mergedStyle,
			"fallback": mergedFallback
		}, omit(otherProps, ["placeholder"]), onEvents, {
			"placeholder": placeholder,
			"classNames": mergedClassNames.value,
			"styles": mergedStyles.value
		}), null);
	};
}, {
	props: {
		preview: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		wrapperStyle: {
			type: Object,
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
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		previewPrefixCls: {
			type: String,
			required: false
		},
		src: {
			type: String,
			required: false
		},
		placeholder: {
			type: [
				Boolean,
				Object,
				Function,
				String,
				Number,
				null,
				Array
			],
			required: false,
			default: void 0
		},
		fallback: {
			type: String,
			required: false
		},
		onKeydown: {
			type: Function,
			required: false
		},
		width: {
			type: [String, Number],
			required: false
		},
		height: {
			type: [String, Number],
			required: false
		},
		fetchPriority: { required: false }
	},
	emits: ["error", "click"],
	name: "AImage",
	inheritAttrs: false
});
Image.install = (app) => {
	app.component(Image.name, Image);
	app.component(PreviewGroup_default.name, PreviewGroup_default);
};
Image.PreviewGroup = PreviewGroup_default;
var image_default = Image;
const ImagePreviewGroup = PreviewGroup_default;

//#endregion
export { ImagePreviewGroup, image_default as default };