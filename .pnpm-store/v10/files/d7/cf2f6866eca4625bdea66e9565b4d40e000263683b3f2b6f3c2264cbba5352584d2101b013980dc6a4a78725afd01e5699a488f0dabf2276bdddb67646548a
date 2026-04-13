import { useComponentBaseConfig } from "../config-provider/context.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import useMergedPreviewConfig_default from "./hooks/useMergedPreviewConfig.js";
import usePreviewConfig from "./hooks/usePreviewConfig.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { getAttrStyleAndClass } from "@v-c/util/dist/props-util";
import { CloseOutlined, LeftOutlined, RightOutlined, RotateLeftOutlined, RotateRightOutlined, SwapOutlined, ZoomInOutlined, ZoomOutOutlined } from "@antdv-next/icons";
import { omit } from "es-toolkit";
import { PreviewGroup } from "@v-c/image";

//#region src/image/PreviewGroup.tsx
const icons = {
	rotateLeft: createVNode(RotateLeftOutlined, null, null),
	rotateRight: createVNode(RotateRightOutlined, null, null),
	zoomIn: createVNode(ZoomInOutlined, null, null),
	zoomOut: createVNode(ZoomOutOutlined, null, null),
	close: createVNode(CloseOutlined, null, null),
	left: createVNode(LeftOutlined, null, null),
	right: createVNode(RightOutlined, null, null),
	flipX: createVNode(SwapOutlined, null, null),
	flipY: createVNode(SwapOutlined, { "rotate": 90 }, null)
};
const InternalPreviewGroup = /* @__PURE__ */ defineComponent((props, { attrs, slots }) => {
	const { getPrefixCls, getPopupContainer: getContextPopupContainer, direction, preview: contextPreview, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("image", void 0, ["preview"]);
	const { preview, classes, styles } = toPropsRefs$1(props, "preview", "classes", "styles");
	const prefixCls = computed(() => getPrefixCls("image", props.previewPrefixCls));
	const previewPrefixCls = computed(() => `${prefixCls.value}-preview`);
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const mergedRootClassName = computed(() => clsx(hashId.value, cssVarCls.value, rootCls.value));
	const previewConfigCtx = usePreviewConfig(preview);
	const previewConfig = computed(() => previewConfigCtx.value?.[0]);
	const previewRootClassName = computed(() => previewConfigCtx.value?.[1]);
	const previewMaskClassName = computed(() => previewConfigCtx.value?.[2]);
	const contextPreviewConfigCtx = usePreviewConfig(contextPreview);
	const contextPreviewConfig = computed(() => contextPreviewConfigCtx.value?.[0]);
	const contextPreviewRootClassName = computed(() => contextPreviewConfigCtx.value?.[1]);
	const contextPreviewMaskClassName = computed(() => contextPreviewConfigCtx.value?.[2]);
	const memoizedIcons = computed(() => {
		return {
			...icons,
			left: direction.value === "rtl" ? createVNode(RightOutlined, null, null) : createVNode(LeftOutlined, null, null),
			right: direction.value === "rtl" ? createVNode(LeftOutlined, null, null) : createVNode(RightOutlined, null, null)
		};
	});
	const mergedPreview = useMergedPreviewConfig_default(previewConfig, contextPreviewConfig, prefixCls, mergedRootClassName, getContextPopupContainer, computed(() => icons));
	const mergedMask = computed(() => mergedPreview.value?.mask);
	const blurClassName = computed(() => mergedPreview.value?.blurClassName);
	const mergedProps = computed(() => {
		return { ...props };
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes, computed(() => {
		return {
			cover: clsx(contextPreviewMaskClassName.value, previewMaskClassName.value),
			popup: {
				root: clsx(contextPreviewRootClassName.value, previewRootClassName.value),
				mask: clsx({ [`${prefixCls.value}-preview-mask-hidden`]: !mergedMask.value }, blurClassName.value)
			}
		};
	})), useToArr(contextStyles, styles), useToProps(mergedProps), computed(() => {
		return { popup: { _default: "root" } };
	}));
	return () => {
		const otherProps = omit(props, [
			"previewPrefixCls",
			"preview",
			"classNames",
			"classes",
			"styles"
		]);
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		return createVNode(PreviewGroup, mergeProps(restAttrs, {
			"class": className,
			"style": style,
			"preview": mergedPreview.value,
			"previewPrefixCls": previewPrefixCls.value,
			"icons": memoizedIcons.value
		}, otherProps, {
			"classNames": mergedClassNames.value,
			"styles": mergedStyles.value
		}), slots);
	};
}, {
	props: {
		preview: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		previewPrefixCls: {
			type: String,
			required: false
		},
		classNames: {
			type: Object,
			required: false
		},
		icons: { required: false },
		items: {
			type: Array,
			required: false
		},
		fallback: {
			type: String,
			required: false
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
	},
	name: "AImagePreviewGroup",
	inheritAttrs: false
});
var PreviewGroup_default = InternalPreviewGroup;

//#endregion
export { PreviewGroup_default as default, icons };