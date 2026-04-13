import { useComponentBaseConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import { getAttrStyleAndClass as getAttrStyleAndClass$1 } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import { responsiveArray } from "../_util/responsiveObserver.js";
import useBreakpoint_default from "../grid/hooks/useBreakpoint.js";
import { useAvatarContext } from "./AvatarContext.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, nextTick, onMounted, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
import ResizeObserver from "@v-c/resize-observer";

//#region src/avatar/Avatar.tsx
const Avatar = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const scale = shallowRef(1);
	const mounted = shallowRef(false);
	const isImgExist = shallowRef(true);
	const avatarNodeRef = shallowRef();
	const avatarChildrenRef = shallowRef();
	const { class: contextClassName, style: contextStyle, prefixCls } = useComponentBaseConfig("avatar", props);
	const avatarCtx = useAvatarContext();
	const setScaleParam = () => {
		if (!avatarChildrenRef.value || !avatarNodeRef.value) return;
		const childrenWidth = avatarChildrenRef.value.offsetWidth;
		const nodeWidth = avatarNodeRef.value.offsetWidth;
		const gap = props.gap;
		if (childrenWidth !== 0 && nodeWidth !== 0) {
			if (gap * 2 < nodeWidth) scale.value = nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1;
		}
	};
	onMounted(() => {
		mounted.value = true;
	});
	watch(() => props.gap, async () => {
		await nextTick();
		setScaleParam();
	}, { immediate: true });
	const handleImgLoadError = () => {
		if (props.onError?.() !== false) isImgExist.value = false;
	};
	const size = useSize((ctxSize) => props?.size ?? avatarCtx.value?.size ?? ctxSize ?? "medium");
	const screens = useBreakpoint_default(computed(() => {
		return Object.keys(typeof size.value === "object" ? size.value || {} : {}).some((key) => responsiveArray.includes(key));
	}));
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	return () => {
		const children = filterEmpty(slots?.default?.() ?? []);
		const icon = getSlotPropsFnRun(slots, props, "icon");
		const { shape, rootClass, draggable, srcSet, crossOrigin, alt } = props;
		const responsiveSizeStyleFn = () => {
			if (typeof size.value !== "object") return {};
			const currentBreakpoint = responsiveArray.find((screen) => screens.value[screen]);
			const currentSize = size.value[currentBreakpoint] || size.value;
			return currentSize ? {
				width: `${currentSize}px`,
				height: `${currentSize}px`,
				fontSize: currentSize && (icon || children.length) ? `${currentSize / 2}px` : "18px"
			} : {};
		};
		const responsiveSizeStyle = responsiveSizeStyleFn();
		const sizeCls = clsx({
			[`${prefixCls.value}-lg`]: size.value === "large",
			[`${prefixCls.value}-sm`]: size.value === "small"
		});
		const src = getSlotPropsFnRun(slots, props, "src");
		if (src) {
			isImgExist.value = true;
			scale.value = 1;
		}
		const hasImageElement = isVNode(src);
		const mergedShape = shape || avatarCtx?.value?.shape || "circle";
		const { className, style, restAttrs } = getAttrStyleAndClass$1(attrs);
		const classString = clsx(prefixCls.value, sizeCls, contextClassName.value, `${prefixCls.value}-${mergedShape}`, {
			[`${prefixCls.value}-image`]: hasImageElement || src && isImgExist.value,
			[`${prefixCls.value}-icon`]: !!icon
		}, cssVarCls.value, rootCls.value, className, rootClass, hashId.value);
		const sizeStyle = typeof size.value === "number" ? {
			width: `${size.value}px`,
			height: `${size.value}px`,
			fontSize: icon ? `${size.value / 2}px` : "18px"
		} : {};
		let childrenToRender;
		if (typeof src === "string" && isImgExist.value) childrenToRender = createVNode("img", {
			"src": src,
			"draggable": draggable,
			"srcset": srcSet,
			"onError": handleImgLoadError,
			"alt": alt,
			"crossorigin": crossOrigin
		}, null);
		else if (hasImageElement) childrenToRender = src;
		else if (icon) childrenToRender = icon;
		else if (mounted.value || scale.value !== 1) {
			const transformString = `scale(${scale.value})`;
			const childrenStyle = {
				msTransform: transformString,
				WebkitTransform: transformString,
				transform: transformString
			};
			childrenToRender = createVNode(ResizeObserver, { "onResize": setScaleParam }, { default: () => [createVNode("span", {
				"class": `${prefixCls.value}-string`,
				"ref": avatarChildrenRef,
				"style": childrenStyle
			}, [children])] });
		} else childrenToRender = createVNode("span", {
			"class": `${prefixCls.value}-string`,
			"style": { opacity: 0 },
			"ref": avatarChildrenRef
		}, [children]);
		return createVNode("span", mergeProps(restAttrs, {
			"style": {
				...sizeStyle,
				...responsiveSizeStyle,
				...contextStyle.value,
				...style
			},
			"class": classString,
			"ref": avatarNodeRef
		}), [childrenToRender]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		shape: {
			type: String,
			required: false
		},
		size: {
			type: [
				String,
				null,
				Number,
				Object
			],
			required: false
		},
		gap: {
			type: Number,
			required: false
		},
		src: {
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
		srcSet: {
			type: String,
			required: false
		},
		draggable: {
			type: [Boolean, String],
			required: false,
			default: void 0
		},
		icon: {
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
		alt: {
			type: String,
			required: false
		},
		crossOrigin: {
			type: String,
			required: false
		},
		onError: {
			type: Function,
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	}, { gap: 4 }),
	emits: ["click"],
	name: "AAvatar",
	inheritAttrs: false
});
Avatar.install = (app) => {
	app.component(Avatar.name, Avatar);
};
var Avatar_default = Avatar;

//#endregion
export { Avatar_default as default };