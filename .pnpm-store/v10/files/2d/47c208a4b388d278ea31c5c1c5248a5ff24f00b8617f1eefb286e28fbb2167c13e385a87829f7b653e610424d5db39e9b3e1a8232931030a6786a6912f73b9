import useToken from "../theme/useToken.js";
import { WatermarkContextProvider } from "./context.js";
import toList_default from "../_util/toList.js";
import useClips_default, { FontGap } from "./useClips.js";
import useRafDebounce from "./useRafDebounce.js";
import useSingletonCache from "./useSingletonCache.js";
import { getPixelRatio, reRendering } from "./utils.js";
import useWatermark from "./useWatermark.js";
import { computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, ref, shallowRef, watch } from "vue";
import { omit } from "es-toolkit";
import canUseDom from "@v-c/util/dist/Dom/canUseDom";
import { useMutateObserver } from "@v-c/mutate-observer";

//#region src/watermark/index.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
/**
* Only return `next` when size changed.
* This is only used for elements compare, not a shallow equal!
*/
function getSizeDiff(prev, next) {
	return prev.size === next.size ? prev : next;
}
const DEFAULT_GAP_X = 100;
const DEFAULT_GAP_Y = 100;
const fixedStyle = {
	position: "relative",
	overflow: "hidden"
};
const defaults = {
	zIndex: 9,
	rotate: -22,
	inherit: true,
	gap: [DEFAULT_GAP_X, DEFAULT_GAP_Y],
	font: {}
};
const Watermark = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const [, token] = useToken();
	const onRemove = computed(() => props.onRemove);
	const color = computed(() => props.font?.color ?? token.value.colorFill);
	const fontSize = computed(() => props?.font?.fontSize ?? token.value?.fontSizeLG);
	const fontWeight = computed(() => props?.font?.fontWeight ?? "normal");
	const fontStyle = computed(() => props?.font?.fontStyle ?? "normal");
	const fontFamily = computed(() => props?.font?.fontFamily ?? "sans-serif");
	const textAlign = computed(() => props?.font?.textAlign ?? "center");
	const gap = computed(() => props.gap);
	const gapXCenter = computed(() => gap.value[0] / 2);
	const gapYCenter = computed(() => gap.value[1] / 2);
	const offsetLeft = computed(() => props.offset?.[0] ?? gapXCenter.value);
	const offsetTop = computed(() => props.offset?.[1] ?? gapYCenter.value);
	const mergedStyle = computed(() => {
		return {
			...fixedStyle,
			...attrs.style
		};
	});
	const markStyle = computed(() => {
		const mergedMarkStyle = {
			zIndex: props.zIndex,
			position: "absolute",
			left: 0,
			top: 0,
			width: "100%",
			height: "100%",
			pointerEvents: "none",
			backgroundRepeat: "repeat"
		};
		/** Calculate the style of the offset */
		let positionLeft = offsetLeft.value - gapXCenter.value;
		let positionTop = offsetTop.value - gapYCenter.value;
		if (positionLeft > 0) {
			mergedMarkStyle.left = `${positionLeft}px`;
			mergedMarkStyle.width = `calc(100% - ${positionLeft}px)`;
			positionLeft = 0;
		}
		if (positionTop > 0) {
			mergedMarkStyle.top = `${positionTop}px`;
			mergedMarkStyle.height = `calc(100% - ${positionTop}px)`;
			positionTop = 0;
		}
		mergedMarkStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`;
		return mergedMarkStyle;
	});
	const container = shallowRef(null);
	const subElements = ref(/* @__PURE__ */ new Set());
	const targetElements = computed(() => {
		return [...container.value ? [container.value] : [], ...Array.from(subElements.value)];
	});
	/**
	* Get the width and height of the watermark. The default values are as follows
	* Image: [120, 64]; Content: It's calculated by content;
	*/
	const getMarkSize = (ctx) => {
		let defaultWidth = 120;
		let defaultHeight = 64;
		if (!props.image && ctx.measureText) {
			ctx.font = `${Number(fontSize.value)}px ${fontFamily.value}`;
			const contents = toList_default(props.content);
			const sizes = contents.map((item) => {
				const metrics = ctx.measureText(item);
				return [metrics.width, metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent];
			});
			defaultWidth = Math.ceil(Math.max(...sizes.map((size) => size[0])));
			defaultHeight = Math.ceil(Math.max(...sizes.map((size) => size[1]))) * contents.length + (contents.length - 1) * FontGap;
		}
		const width = props.width;
		const height = props.height;
		return [width ?? defaultWidth, height ?? defaultHeight];
	};
	const getClips = useClips_default();
	const getClipsCache = useSingletonCache();
	const watermarkInfo = ref(null);
	const renderWatermark = () => {
		if (!canUseDom()) return;
		const ctx = document.createElement("canvas").getContext("2d");
		if (ctx) {
			const ratio = getPixelRatio();
			const [markWidth, markHeight] = getMarkSize(ctx);
			const drawCanvas = (drawContent) => {
				const params = [
					drawContent || "",
					props.rotate,
					ratio,
					markWidth,
					markHeight,
					{
						color: color.value,
						fontSize: fontSize.value,
						fontStyle: fontStyle.value,
						fontWeight: fontWeight.value,
						fontFamily: fontFamily.value,
						textAlign: textAlign.value
					},
					gap.value[0],
					gap.value[1]
				];
				const [nextClips, clipWidth] = getClipsCache(params, () => getClips(...params));
				watermarkInfo.value = [nextClips, clipWidth];
			};
			if (props.image) {
				const img = new Image();
				img.onload = () => {
					drawCanvas(img);
				};
				img.onerror = () => {
					drawCanvas(props.content);
				};
				img.crossOrigin = "anonymous";
				img.referrerPolicy = "no-referrer";
				img.src = props.image;
			} else drawCanvas(props.content);
		}
	};
	const syncWatermark = useRafDebounce(renderWatermark);
	const [appendWatermark, removeWatermark, isWatermarkEle] = useWatermark(markStyle, onRemove);
	watch([watermarkInfo, targetElements], ([watermarkInfo, targetElements]) => {
		if (watermarkInfo) targetElements.forEach((holder) => {
			appendWatermark(watermarkInfo[0], watermarkInfo[1], holder);
		});
	});
	const onMutate = (mutations) => {
		mutations.forEach((mutation) => {
			if (reRendering(mutation, isWatermarkEle)) syncWatermark();
			else if (mutation.target === container.value && mutation.attributeName === "style") {
				const keyStyles = Object.keys(fixedStyle);
				for (let i = 0; i < keyStyles.length; i += 1) {
					const key = keyStyles[i];
					const oriValue = mergedStyle.value[key];
					const currentValue = container.value.style[key];
					if (oriValue && oriValue !== currentValue) container.value.style[key] = oriValue;
				}
			}
		});
	};
	useMutateObserver(targetElements, onMutate);
	watch([
		() => props.offset,
		() => props.zIndex,
		() => props.width,
		() => props.height,
		() => props.rotate,
		() => props.image,
		() => props.content,
		fontSize,
		fontWeight,
		fontStyle,
		fontFamily,
		textAlign,
		gap,
		offsetLeft,
		offsetTop
	], syncWatermark, { immediate: true });
	const watermarkContext = {
		add: (ele) => {
			const clone = new Set(subElements.value);
			clone.add(ele);
			subElements.value = getSizeDiff(subElements.value, clone);
		},
		remove: (ele) => {
			removeWatermark(ele);
			const clone = new Set(subElements.value);
			clone.delete(ele);
			subElements.value = getSizeDiff(subElements.value, clone);
		}
	};
	return () => {
		const children = slots?.default?.();
		const childNode = props.inherit ? createVNode(WatermarkContextProvider, watermarkContext, _isSlot(children) ? children : { default: () => [children] }) : children;
		return createVNode("div", mergeProps({
			"ref": container,
			"class": [props.rootClass, attrs.class]
		}, omit(attrs, ["style", "class"]), { "style": mergedStyle.value }), [childNode]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		zIndex: {
			type: Number,
			required: false
		},
		rotate: {
			type: Number,
			required: false
		},
		width: {
			type: Number,
			required: false
		},
		height: {
			type: Number,
			required: false
		},
		image: {
			type: String,
			required: false
		},
		content: {
			type: [String, Array],
			required: false
		},
		font: {
			type: Object,
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		gap: {
			type: Array,
			required: false
		},
		offset: {
			type: Array,
			required: false
		},
		inherit: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onRemove: {
			type: [Function, null],
			required: false
		}
	}, defaults),
	name: "AWatermark",
	inheritAttrs: false
});
Watermark.install = (app) => {
	app.component(Watermark.name, Watermark);
};
var watermark_default = Watermark;

//#endregion
export { watermark_default as default };