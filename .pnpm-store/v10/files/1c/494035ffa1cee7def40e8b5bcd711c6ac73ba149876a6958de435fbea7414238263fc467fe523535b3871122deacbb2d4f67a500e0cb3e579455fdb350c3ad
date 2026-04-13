import { getPostClones, getPreClones, lazyEndIndex, lazyStartIndex } from "./utils/innerSliderUtils.js";
import { cloneVNode, createVNode, defineComponent, isVNode } from "vue";
import { clsx } from "@v-c/util";
import { getStylePxValue } from "@v-c/util/dist/props-util";
function getSlideClasses(spec) {
	let slickActive = false;
	let slickCenter = false;
	let slickCloned = false;
	let index = spec.index;
	if (spec.rtl) index = spec.slideCount - 1 - index;
	slickCloned = index < 0 || index >= spec.slideCount;
	if (spec.centerMode) {
		const centerOffset = Math.floor(spec.slidesToShow / 2);
		slickCenter = (index - spec.currentSlide) % spec.slideCount === 0;
		if (index > spec.currentSlide - centerOffset - 1 && index <= spec.currentSlide + centerOffset) slickActive = true;
	} else slickActive = spec.currentSlide <= index && index < spec.currentSlide + spec.slidesToShow;
	let focusedSlide = 0;
	if (spec.targetSlide < 0) focusedSlide = spec.targetSlide + spec.slideCount;
	else if (spec.targetSlide >= spec.slideCount) focusedSlide = spec.targetSlide - spec.slideCount;
	else focusedSlide = spec.targetSlide;
	const slickCurrent = index === focusedSlide;
	return {
		"slick-slide": true,
		"slick-active": slickActive,
		"slick-center": slickCenter,
		"slick-cloned": slickCloned,
		"slick-current": slickCurrent
	};
}
function getSlideStyle(spec) {
	const style = {};
	if (spec.variableWidth === void 0 || spec.variableWidth === false) style.width = getStylePxValue(spec.slideWidth);
	if (spec.fade) {
		style.position = "relative";
		if (spec.vertical && spec.slideHeight) style.top = getStylePxValue(-spec.index * parseInt(String(spec.slideHeight), 10));
		else if (spec.slideWidth) style.left = getStylePxValue(-spec.index * parseInt(String(spec.slideWidth), 10));
		style.opacity = spec.currentSlide === spec.index ? 1 : 0;
		style.zIndex = spec.currentSlide === spec.index ? 999 : 998;
		if (spec.useCSS) style.transition = `opacity ${spec.speed}ms ${spec.cssEase}, visibility ${spec.speed}ms ${spec.cssEase}`;
	}
	return style;
}
function getKey(child, fallbackKey) {
	return `${child?.key ?? "slick"}-${fallbackKey}`;
}
function normalizeStyle(style) {
	if (!style) return {};
	if (Array.isArray(style)) return Object.assign({}, ...style);
	if (typeof style === "object") return style;
	return {};
}
function renderSlides(spec) {
	let key = 0;
	const slides = [];
	const preCloneSlides = [];
	const postCloneSlides = [];
	const childrenCount = Array.isArray(spec.children) ? spec.children.length : 0;
	const startIndex = lazyStartIndex(spec);
	const endIndex = lazyEndIndex(spec);
	(Array.isArray(spec.children) ? spec.children : []).forEach((elem, index) => {
		let child;
		const childOnClickOptions = {
			message: "children",
			index,
			slidesToScroll: spec.slidesToScroll,
			currentSlide: spec.currentSlide
		};
		if (!spec.lazyLoad || spec.lazyLoad && spec.lazyLoadedList.includes(index)) child = elem;
		else child = createVNode("div", null, null);
		const childStyle = getSlideStyle({
			...spec,
			index
		});
		const childProps = isVNode(child) ? child.props ?? {} : {};
		const slideClass = childProps?.class ?? "";
		const slideClasses = getSlideClasses({
			...spec,
			index
		});
		const clickHandler = (e) => {
			childProps?.onClick?.(e);
			if (spec.focusOnSelect) spec.focusOnSelect(childOnClickOptions);
		};
		slides.push(cloneVNode(child, {
			"key": `original${getKey(child, index)}`,
			"data-index": index,
			"class": clsx(slideClasses, slideClass),
			"tabindex": -1,
			"aria-hidden": !slideClasses["slick-active"],
			"style": {
				outline: "none",
				...normalizeStyle(childProps?.style),
				...childStyle
			},
			"onClick": clickHandler
		}));
		if (spec.infinite && childrenCount > 1 && spec.fade === false && !spec.unslick) {
			const preCloneNo = childrenCount - index;
			if (preCloneNo <= getPreClones(spec)) {
				key = -preCloneNo;
				if (key >= startIndex) child = elem;
				const preSlideClasses = getSlideClasses({
					...spec,
					index: key
				});
				preCloneSlides.push(cloneVNode(child, {
					"key": `precloned${getKey(child, key)}`,
					"data-index": key,
					"tabindex": -1,
					"class": clsx(preSlideClasses, slideClass),
					"aria-hidden": !preSlideClasses["slick-active"],
					"style": {
						...normalizeStyle(childProps?.style),
						...childStyle
					},
					"onClick": clickHandler
				}));
			}
			if (index < getPostClones(spec)) {
				key = childrenCount + index;
				if (key < endIndex) child = elem;
				const postSlideClasses = getSlideClasses({
					...spec,
					index: key
				});
				postCloneSlides.push(cloneVNode(child, {
					"key": `postcloned${getKey(child, key)}`,
					"data-index": key,
					"tabindex": -1,
					"class": clsx(postSlideClasses, slideClass),
					"aria-hidden": !postSlideClasses["slick-active"],
					"style": {
						...normalizeStyle(childProps?.style),
						...childStyle
					},
					"onClick": clickHandler
				}));
			}
		}
	});
	if (spec.rtl) return preCloneSlides.concat(slides, postCloneSlides).reverse();
	return preCloneSlides.concat(slides, postCloneSlides);
}
var Track_default = /* @__PURE__ */ defineComponent((props) => {
	const setRef = (el) => {
		if (props.nodeRef) props.nodeRef.value = el;
	};
	return () => {
		const slides = renderSlides(props);
		return createVNode("div", {
			"ref": setRef,
			"class": "slick-track",
			"style": props.trackStyle,
			"onMouseenter": props.onMouseEnter,
			"onMouseover": props.onMouseOver,
			"onMouseleave": props.onMouseLeave
		}, [slides]);
	};
}, { props: {
	children: {
		type: Array,
		required: true,
		default: void 0
	},
	currentSlide: {
		type: Number,
		required: true,
		default: void 0
	},
	targetSlide: {
		type: Number,
		required: true,
		default: void 0
	},
	slideCount: {
		type: Number,
		required: true,
		default: void 0
	},
	slidesToShow: {
		type: Number,
		required: true,
		default: void 0
	},
	slidesToScroll: {
		type: Number,
		required: true,
		default: void 0
	},
	slideWidth: {
		type: [
			Number,
			String,
			null
		],
		required: false,
		default: void 0
	},
	slideHeight: {
		type: [Number, null],
		required: false,
		default: void 0
	},
	listHeight: {
		type: [Number, null],
		required: false,
		default: void 0
	},
	fade: {
		type: Boolean,
		required: false,
		default: void 0
	},
	cssEase: {
		type: String,
		required: false,
		default: void 0
	},
	speed: {
		type: Number,
		required: false,
		default: void 0
	},
	infinite: {
		type: Boolean,
		required: false,
		default: void 0
	},
	centerMode: {
		type: Boolean,
		required: false,
		default: void 0
	},
	focusOnSelect: {
		type: Function,
		required: false,
		default: void 0
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
	lazyLoadedList: {
		type: Array,
		required: true,
		default: void 0
	},
	rtl: {
		type: Boolean,
		required: false,
		default: void 0
	},
	vertical: {
		type: Boolean,
		required: false,
		default: void 0
	},
	variableWidth: {
		type: Boolean,
		required: false,
		default: void 0
	},
	unslick: {
		type: Boolean,
		required: false,
		default: void 0
	},
	centerPadding: {
		type: String,
		required: false,
		default: void 0
	},
	trackStyle: {
		type: Object,
		required: false,
		default: void 0
	},
	useCSS: {
		type: Boolean,
		required: false,
		default: void 0
	},
	onMouseEnter: {
		type: Function,
		required: false,
		default: void 0
	},
	onMouseOver: {
		type: Function,
		required: false,
		default: void 0
	},
	onMouseLeave: {
		type: Function,
		required: false,
		default: void 0
	},
	nodeRef: {
		type: Object,
		required: false,
		default: void 0
	}
} });
export { Track_default as default };
