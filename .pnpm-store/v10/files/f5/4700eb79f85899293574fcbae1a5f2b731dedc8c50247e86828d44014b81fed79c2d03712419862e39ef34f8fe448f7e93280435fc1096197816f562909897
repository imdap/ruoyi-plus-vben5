import default_props_default from "./default-props.js";
import { canUseDOM, filterSettings } from "./utils/innerSliderUtils.js";
import InnerSlider_default from "./InnerSlider.js";
import { cloneVNode, createVNode, defineComponent, isVNode, mergeProps, onBeforeUnmount, onMounted, shallowRef } from "vue";
import { filterEmpty } from "@v-c/util/dist/props-util";
import { toArray } from "@v-c/util/dist/Children/toArray";
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function toMediaQuery(query) {
	const parts = [];
	if (typeof query.minWidth === "number") parts.push(`(min-width: ${query.minWidth}px)`);
	if (typeof query.maxWidth === "number") parts.push(`(max-width: ${query.maxWidth}px)`);
	return parts.join(" and ");
}
var Slider_default = /* @__PURE__ */ defineComponent((props, { slots, expose }) => {
	const breakpoint = shallowRef(null);
	const innerSliderRef = shallowRef(null);
	const responsiveMediaHandlers = [];
	const media = (query, handler) => {
		if (!canUseDOM()) return;
		const mql = window.matchMedia(query);
		const listener = (e) => {
			if (e.matches) handler();
		};
		if (mql.addEventListener) mql.addEventListener("change", listener);
		else mql.addListener(listener);
		responsiveMediaHandlers.push({
			mql,
			listener
		});
	};
	onMounted(() => {
		if (props.responsive) {
			const breakpoints = props.responsive.map((breakpt) => breakpt.breakpoint);
			breakpoints.sort((x, y) => x - y);
			breakpoints.forEach((value, index) => {
				let bQuery = "";
				if (index === 0) bQuery = toMediaQuery({
					minWidth: 0,
					maxWidth: value
				});
				else bQuery = toMediaQuery({
					minWidth: breakpoints[index - 1] + 1,
					maxWidth: value
				});
				canUseDOM() && media(bQuery, () => {
					breakpoint.value = value;
				});
			});
			const query = toMediaQuery({ minWidth: breakpoints.slice(-1)[0] });
			canUseDOM() && media(query, () => {
				breakpoint.value = null;
			});
		}
	});
	onBeforeUnmount(() => {
		responsiveMediaHandlers.forEach((obj) => {
			if (obj.mql.removeEventListener) obj.mql.removeEventListener("change", obj.listener);
			else obj.mql.removeListener(obj.listener);
		});
	});
	const slickPrev = () => innerSliderRef.value?.slickPrev();
	const slickNext = () => innerSliderRef.value?.slickNext();
	const slickGoTo = (slide, dontAnimate = false) => innerSliderRef.value?.slickGoTo(slide, dontAnimate);
	const slickPause = () => innerSliderRef.value?.pause("paused");
	const slickPlay = () => innerSliderRef.value?.autoPlay("play");
	expose({
		innerSlider: innerSliderRef,
		slickPrev,
		slickNext,
		slickGoTo,
		slickPause,
		slickPlay
	});
	return () => {
		let settings;
		if (breakpoint.value && props.responsive) {
			const newProps = props.responsive.filter((resp) => resp.breakpoint === breakpoint.value);
			settings = newProps[0].settings === "unslick" ? "unslick" : {
				...default_props_default,
				...props,
				...newProps[0].settings
			};
		} else settings = {
			...default_props_default,
			...props
		};
		if (settings.centerMode) {
			if (settings.slidesToScroll > 1 && process.env.NODE_ENV !== "production") console.warn(`slidesToScroll should be equal to 1 in centerMode, you are using ${settings.slidesToScroll}`);
			settings.slidesToScroll = 1;
		}
		if (settings.fade) {
			if (settings.slidesToShow > 1 && process.env.NODE_ENV !== "production") console.warn(`slidesToShow should be equal to 1 when fade is true, you're using ${settings.slidesToShow}`);
			if (settings.slidesToScroll > 1 && process.env.NODE_ENV !== "production") console.warn(`slidesToScroll should be equal to 1 when fade is true, you're using ${settings.slidesToScroll}`);
			settings.slidesToShow = 1;
			settings.slidesToScroll = 1;
		}
		let children = filterEmpty(toArray(slots.default?.() ?? []));
		children = children.filter((child) => {
			if (typeof child === "string") return !!child.trim();
			return !!child;
		});
		if (settings.variableWidth && (settings.rows > 1 || settings.slidesPerRow > 1)) {
			console.warn("variableWidth is not supported in case of rows > 1 or slidesPerRow > 1");
			settings.variableWidth = false;
		}
		const newChildren = [];
		let currentWidth = null;
		const rows = settings.rows || 1;
		const slidesPerRow = settings.slidesPerRow || 1;
		for (let i = 0; i < children.length; i += rows * slidesPerRow) {
			const newSlide = [];
			for (let j = i; j < i + rows * slidesPerRow; j += slidesPerRow) {
				const row = [];
				for (let k = j; k < j + slidesPerRow; k += 1) {
					if (k >= children.length) break;
					const rawChild = children[k];
					const child = isVNode(rawChild) ? rawChild : createVNode("div", null, [rawChild]);
					if (settings.variableWidth && child.props?.style) currentWidth = child.props.style.width;
					row.push(cloneVNode(child, {
						key: 100 * i + 10 * j + k,
						tabindex: -1,
						style: {
							width: `${100 / slidesPerRow}%`,
							display: "inline-block"
						}
					}));
				}
				newSlide.push(createVNode("div", { "key": 10 * i + j }, [row]));
			}
			if (settings.variableWidth) newChildren.push(createVNode("div", {
				"key": i,
				"style": { width: currentWidth }
			}, [newSlide]));
			else newChildren.push(createVNode("div", { "key": i }, [newSlide]));
		}
		if (settings === "unslick") {
			const className = `regular slider ${props.className || ""}`;
			return createVNode("div", { "class": className }, [children]);
		} else if (newChildren.length <= settings.slidesToShow) settings.unslick = true;
		return createVNode(InnerSlider_default, mergeProps({
			"ref": innerSliderRef,
			"style": props.style
		}, filterSettings(settings)), _isSlot(newChildren) ? newChildren : { default: () => [newChildren] });
	};
}, { props: {
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
		required: false,
		default: void 0
	},
	appendDots: {
		type: Function,
		required: false,
		default: void 0
	},
	arrows: {
		type: Boolean,
		required: false,
		default: void 0
	},
	autoplay: {
		type: Boolean,
		required: false,
		default: void 0
	},
	autoplaySpeed: {
		type: Number,
		required: false,
		default: void 0
	},
	beforeChange: {
		type: [Function, null],
		required: false,
		default: void 0
	},
	centerMode: {
		type: Boolean,
		required: false,
		default: void 0
	},
	centerPadding: {
		type: String,
		required: false,
		default: void 0
	},
	className: {
		type: String,
		required: false,
		default: void 0
	},
	cssEase: {
		type: String,
		required: false,
		default: void 0
	},
	customPaging: {
		type: Function,
		required: false,
		default: void 0
	},
	dots: {
		type: Boolean,
		required: false,
		default: void 0
	},
	dotsClass: {
		type: String,
		required: false,
		default: void 0
	},
	draggable: {
		type: Boolean,
		required: false,
		default: void 0
	},
	easing: {
		type: String,
		required: false,
		default: void 0
	},
	edgeFriction: {
		type: Number,
		required: false,
		default: void 0
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
	nextArrow: {
		type: [
			Object,
			String,
			Number,
			Boolean,
			null,
			Array
		],
		required: false,
		default: void 0
	},
	onEdge: {
		type: [Function, null],
		required: false,
		default: void 0
	},
	onInit: {
		type: [Function, null],
		required: false,
		default: void 0
	},
	onLazyLoad: {
		type: [Function, null],
		required: false,
		default: void 0
	},
	onLazyLoadError: {
		type: [Function, null],
		required: false,
		default: void 0
	},
	onReInit: {
		type: [Function, null],
		required: false,
		default: void 0
	},
	onSwipe: {
		type: [Function, null],
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
	prevArrow: {
		type: [
			Object,
			String,
			Number,
			Boolean,
			null,
			Array
		],
		required: false,
		default: void 0
	},
	responsive: {
		type: [Array, null],
		required: false,
		default: void 0
	},
	rows: {
		type: Number,
		required: false,
		default: void 0
	},
	rtl: {
		type: Boolean,
		required: false,
		default: void 0
	},
	slide: {
		type: String,
		required: false,
		default: void 0
	},
	slidesPerRow: {
		type: Number,
		required: false,
		default: void 0
	},
	slidesToScroll: {
		type: Number,
		required: false,
		default: void 0
	},
	slidesToShow: {
		type: Number,
		required: false,
		default: void 0
	},
	speed: {
		type: Number,
		required: false,
		default: void 0
	},
	swipe: {
		type: Boolean,
		required: false,
		default: void 0
	},
	swipeEvent: {
		type: [Function, null],
		required: false,
		default: void 0
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
		required: false,
		default: void 0
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
	waitForAnimate: {
		type: Boolean,
		required: false,
		default: void 0
	},
	asNavFor: {
		type: [Object, null],
		required: false,
		default: void 0
	},
	unslick: {
		type: Boolean,
		required: false,
		default: void 0
	},
	style: {
		type: Object,
		required: false,
		default: void 0
	}
} });
export { Slider_default as default };
