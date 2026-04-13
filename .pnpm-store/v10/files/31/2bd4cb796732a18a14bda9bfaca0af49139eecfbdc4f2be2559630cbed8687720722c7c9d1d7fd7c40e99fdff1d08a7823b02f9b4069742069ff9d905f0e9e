import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { getAttrStyleAndClass as getAttrStyleAndClass$1 } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun } from "../_util/tools.js";
import style_default, { DotDuration } from "./style/index.js";
import { computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
import { omit } from "es-toolkit";
import SlickCarousel from "@v-c/slick";

//#region src/carousel/index.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const omitKeys = [
	"dots",
	"arrows",
	"prevArrow",
	"nextArrow",
	"draggable",
	"waitForAnimate",
	"dotPosition",
	"dotPlacement",
	"vertical",
	"rootClass",
	"id",
	"autoplay",
	"autoplaySpeed",
	"rtl"
];
const dotsClass = "slick-dots";
const ArrowButton = /* @__PURE__ */ defineComponent((_, { slots, attrs }) => {
	return () => {
		return createVNode("button", mergeProps({ "type": "button" }, attrs), [slots?.default?.()]);
	};
}, {
	props: {
		currentSlide: {
			type: Number,
			required: false
		},
		slideCount: {
			type: Number,
			required: false
		}
	},
	name: "ArrowButton",
	inheritAttrs: false
});
const Carousel = /* @__PURE__ */ defineComponent((props, { slots, emit, expose, attrs }) => {
	const mergedDotPlacement = computed(() => {
		const { dotPlacement, dotPosition } = props;
		const placement = dotPlacement ?? dotPosition ?? "bottom";
		switch (placement) {
			case "left": return "start";
			case "right": return "end";
			default: return placement;
		}
	});
	const mergedVertical = computed(() => props?.vertical ?? (mergedDotPlacement.value === "start" || mergedDotPlacement.value === "end"));
	const { prefixCls, direction, class: contextClassName, style: contextStyle } = useComponentBaseConfig("carousel", props);
	const slickRef = shallowRef();
	const goTo = (slide, dontAnimate = false) => {
		slickRef.value?.slickGoTo?.(slide, dontAnimate);
	};
	expose({
		goTo,
		autoPlay: (playType) => slickRef?.value?.innerSlider?.autoPlay?.(playType),
		next: () => slickRef?.value?.innerSlider?.slickNext?.(),
		prev: () => slickRef?.value?.innerSlider?.slickPrev?.(),
		innerSlider: computed(() => slickRef.value?.innerSlider)
	});
	const count = shallowRef(0);
	const isRTL = computed(() => (props?.rtl ?? direction.value === "rtl") && !props.vertical);
	watch([
		count,
		() => props?.initialSlide,
		isRTL
	], () => {
		const { initialSlide = 0 } = props;
		if (count.value > 0) goTo(isRTL.value ? count.value - initialSlide - 1 : initialSlide, false);
	}, { immediate: true });
	if (isDev) devUseWarning("Carousel").deprecated(!props?.dotPosition, "dotPosition", "dotPlacement");
	const [hashId, cssVarCls] = style_default(prefixCls);
	const onAttrs = {
		onSwipe(...args) {
			emit("swipe", ...args);
		},
		onInit() {
			emit("init");
		},
		onEdge(...args) {
			emit("edge", ...args);
		},
		onReInit() {
			emit("reInit");
		},
		onLazyLoad(...args) {
			emit("lazyLoad", ...args);
		},
		onLazyLoadError() {
			emit("lazyLoadError");
		}
	};
	return () => {
		const { dots, rootClass, autoplay, autoplaySpeed, id, arrows, draggable, waitForAnimate } = props;
		const otherProps = omit(props, omitKeys);
		const enableDots = !!dots;
		const dsClass = clsx(dotsClass, `${dotsClass}-${mergedDotPlacement.value}`, typeof dots === "boolean" ? false : dots?.class);
		const { className: customClassName, style, restAttrs } = getAttrStyleAndClass$1(attrs);
		const newProps = {
			vertical: mergedVertical.value,
			className: clsx(customClassName, contextClassName.value),
			style: {
				...contextStyle.value,
				...style
			},
			autoplay: !!autoplay,
			...otherProps
		};
		if (newProps.effect === "fade") newProps.fade = true;
		const className = clsx(prefixCls.value, {
			[`${prefixCls.value}-rtl`]: isRTL.value,
			[`${prefixCls.value}-vertical`]: newProps.vertical
		}, hashId.value, cssVarCls.value, rootClass);
		const dotDurationStyle = autoplay && (typeof autoplay === "object" ? autoplay.dotDuration : false) ? { [DotDuration]: `${autoplaySpeed}ms` } : {};
		const children = slots?.default?.();
		const childNodes = filterEmpty(children || []).filter(Boolean);
		if (count.value !== childNodes.length) count.value = childNodes.length;
		const prevArrow = getSlotPropsFnRun(slots, props, "prevArrow");
		const nextArrow = getSlotPropsFnRun(slots, props, "nextArrow");
		return createVNode("div", mergeProps(restAttrs, {
			"class": className,
			"id": id,
			"style": dotDurationStyle
		}), [createVNode(SlickCarousel, mergeProps({ "ref": slickRef }, onAttrs, newProps, {
			"dots": enableDots,
			"dotsClass": dsClass,
			"arrows": arrows,
			"prevArrow": prevArrow ?? createVNode(ArrowButton, { "aria-label": isRTL.value ? "next" : "prev" }, null),
			"nextArrow": nextArrow ?? createVNode(ArrowButton, { "aria-label": isRTL.value ? "prev" : "next" }, null),
			"draggable": draggable,
			"verticalSwiping": mergedVertical.value,
			"autoplaySpeed": autoplaySpeed,
			"waitForAnimate": waitForAnimate,
			"rtl": isRTL.value
		}), _isSlot(children) ? children : { default: () => [children] })]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		effect: {
			type: String,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		slickGoTo: {
			type: Number,
			required: false
		},
		dotPosition: {
			type: String,
			required: false
		},
		dotPlacement: {
			type: String,
			required: false
		},
		dots: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		waitForAnimate: {
			type: Boolean,
			required: false,
			default: void 0
		},
		autoplay: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		prevArrow: {
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
		nextArrow: {
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
		accessibility: {
			type: Boolean,
			required: false,
			default: void 0
		},
		adaptiveHeight: {
			type: Boolean,
			required: false,
			default: void 0
		},
		afterChange: {
			type: [Function, null],
			required: false
		},
		appendDots: {
			type: Function,
			required: false
		},
		arrows: {
			type: Boolean,
			required: false,
			default: void 0
		},
		autoplaySpeed: {
			type: Number,
			required: false
		},
		beforeChange: {
			type: [Function, null],
			required: false
		},
		centerMode: {
			type: Boolean,
			required: false,
			default: void 0
		},
		centerPadding: {
			type: String,
			required: false
		},
		cssEase: {
			type: String,
			required: false
		},
		customPaging: {
			type: Function,
			required: false
		},
		draggable: {
			type: Boolean,
			required: false,
			default: void 0
		},
		easing: {
			type: String,
			required: false
		},
		edgeFriction: {
			type: Number,
			required: false
		},
		fade: {
			type: Boolean,
			required: false,
			default: void 0
		},
		focusOnSelect: {
			type: Boolean,
			required: false,
			default: void 0
		},
		infinite: {
			type: Boolean,
			required: false,
			default: void 0
		},
		initialSlide: {
			type: Number,
			required: false
		},
		lazyLoad: {
			type: [
				String,
				Boolean,
				null
			],
			required: false,
			default: void 0
		},
		pauseOnDotsHover: {
			type: Boolean,
			required: false,
			default: void 0
		},
		pauseOnFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		pauseOnHover: {
			type: Boolean,
			required: false,
			default: void 0
		},
		responsive: {
			type: [Array, null],
			required: false
		},
		rows: {
			type: Number,
			required: false
		},
		rtl: {
			type: Boolean,
			required: false,
			default: void 0
		},
		slide: {
			type: String,
			required: false
		},
		slidesPerRow: {
			type: Number,
			required: false
		},
		slidesToScroll: {
			type: Number,
			required: false
		},
		slidesToShow: {
			type: Number,
			required: false
		},
		speed: {
			type: Number,
			required: false
		},
		swipe: {
			type: Boolean,
			required: false,
			default: void 0
		},
		swipeEvent: {
			type: [Function, null],
			required: false
		},
		swipeToSlide: {
			type: Boolean,
			required: false,
			default: void 0
		},
		touchMove: {
			type: Boolean,
			required: false,
			default: void 0
		},
		touchThreshold: {
			type: Number,
			required: false
		},
		useCSS: {
			type: Boolean,
			required: false,
			default: void 0
		},
		useTransform: {
			type: Boolean,
			required: false,
			default: void 0
		},
		variableWidth: {
			type: Boolean,
			required: false,
			default: void 0
		},
		vertical: {
			type: Boolean,
			required: false,
			default: void 0
		},
		verticalSwiping: {
			type: Boolean,
			required: false,
			default: void 0
		},
		asNavFor: {
			type: [Object, null],
			required: false
		},
		unslick: {
			type: Boolean,
			required: false,
			default: void 0
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	}, {
		dots: true,
		arrows: false,
		draggable: false,
		waitForAnimate: false,
		autoplay: false,
		autoplaySpeed: 3e3,
		initialSlide: 0
	}),
	emits: [
		"init",
		"reInit",
		"edge",
		"swipe",
		"lazyLoad",
		"lazyLoadError"
	],
	name: "ACarousel",
	inheritAttrs: false
});
Carousel.install = (app) => {
	app.component(Carousel.name, Carousel);
};
var carousel_default = Carousel;

//#endregion
export { carousel_default as default };