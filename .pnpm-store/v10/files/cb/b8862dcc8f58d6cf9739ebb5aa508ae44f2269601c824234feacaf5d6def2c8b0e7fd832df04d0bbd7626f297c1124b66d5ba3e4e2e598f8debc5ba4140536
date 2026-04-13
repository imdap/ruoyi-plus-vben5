import default_props_default from "./default-props.js";
import { clamp } from "./utils/innerSliderUtils.js";
import { cloneVNode, createVNode, defineComponent, isVNode } from "vue";
import { clsx } from "@v-c/util";
function getDotCount(spec) {
	if (spec.infinite) return Math.ceil(spec.slideCount / spec.slidesToScroll);
	return Math.ceil((spec.slideCount - spec.slidesToShow) / spec.slidesToScroll) + 1;
}
var Dots_default = /* @__PURE__ */ defineComponent((props) => {
	const getCustomPaging = props.customPaging ?? default_props_default.customPaging ?? ((index) => createVNode("button", { "type": "button" }, [index + 1]));
	const appendDots = props.appendDots ?? default_props_default.appendDots ?? ((dots) => createVNode("ul", { "style": { display: "block" } }, [dots]));
	const clickHandler = (options, e) => {
		e?.preventDefault();
		props.clickHandler?.(options, e);
	};
	return () => {
		const { onMouseEnter, onMouseOver, onMouseLeave, infinite, slidesToScroll, slidesToShow, slideCount, currentSlide } = props;
		const dotCount = getDotCount({
			slideCount,
			slidesToScroll,
			slidesToShow,
			infinite
		});
		const dots = [];
		for (let i = 0; i < dotCount; i += 1) {
			const _rightBound = (i + 1) * slidesToScroll - 1;
			const rightBound = infinite ? _rightBound : clamp(_rightBound, 0, slideCount - 1);
			const _leftBound = rightBound - (slidesToScroll - 1);
			const leftBound = infinite ? _leftBound : clamp(_leftBound, 0, slideCount - 1);
			const className = clsx({ "slick-active": infinite ? currentSlide >= leftBound && currentSlide <= rightBound : currentSlide === leftBound });
			const dotOptions = {
				message: "dots",
				index: i,
				slidesToScroll,
				currentSlide
			};
			const onClick = (e) => clickHandler(dotOptions, e);
			const paging = getCustomPaging(i);
			const content = isVNode(paging) ? cloneVNode(paging, { onClick }) : createVNode("button", {
				"type": "button",
				"onClick": onClick
			}, [i + 1]);
			dots.push(createVNode("li", {
				"key": i,
				"class": className
			}, [content]));
		}
		const dotsNode = appendDots(dots);
		if (isVNode(dotsNode)) return cloneVNode(dotsNode, {
			class: props.dotsClass,
			onMouseenter: onMouseEnter,
			onMouseover: onMouseOver,
			onMouseleave: onMouseLeave
		});
		return dotsNode;
	};
}, { props: {
	dotsClass: {
		type: String,
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
	currentSlide: {
		type: Number,
		required: true,
		default: void 0
	},
	slidesToScroll: {
		type: Number,
		required: true,
		default: void 0
	},
	clickHandler: {
		type: Function,
		required: false,
		default: void 0
	},
	customPaging: {
		type: Function,
		required: false,
		default: void 0
	},
	infinite: {
		type: Boolean,
		required: false,
		default: void 0
	},
	appendDots: {
		type: Function,
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
	}
} });
export { Dots_default as default };
