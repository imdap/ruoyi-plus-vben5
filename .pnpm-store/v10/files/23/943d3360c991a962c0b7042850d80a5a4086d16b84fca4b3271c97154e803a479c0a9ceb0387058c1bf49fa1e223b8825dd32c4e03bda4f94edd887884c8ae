import { canGoNext } from "./utils/innerSliderUtils.js";
import { cloneVNode, createTextVNode, createVNode, defineComponent, isVNode, mergeProps } from "vue";
import { clsx } from "@v-c/util";
var PrevArrow = /* @__PURE__ */ defineComponent((props) => {
	const clickHandler = (options, e) => {
		e?.preventDefault();
		props.clickHandler?.(options, e);
	};
	return () => {
		const prevClasses = {
			"slick-arrow": true,
			"slick-prev": true
		};
		let prevHandler = (e) => {
			clickHandler({ message: "previous" }, e);
		};
		if (!props.infinite && (props.currentSlide === 0 || props.slideCount <= props.slidesToShow)) {
			prevClasses["slick-disabled"] = true;
			prevHandler = void 0;
		}
		const prevArrowProps = {
			"key": "0",
			"data-role": "none",
			"class": clsx(prevClasses),
			"style": { display: "block" },
			"onClick": prevHandler
		};
		const customProps = {
			currentSlide: props.currentSlide,
			slideCount: props.slideCount
		};
		if (props.prevArrow && isVNode(props.prevArrow)) return cloneVNode(props.prevArrow, {
			...prevArrowProps,
			...customProps
		});
		return createVNode("button", mergeProps({ "type": "button" }, prevArrowProps), [createTextVNode("Previous")]);
	};
}, { props: {
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
	currentSlide: {
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
	clickHandler: {
		type: Function,
		required: false,
		default: void 0
	}
} });
var NextArrow = /* @__PURE__ */ defineComponent((props) => {
	const clickHandler = (options, e) => {
		e?.preventDefault();
		props.clickHandler?.(options, e);
	};
	return () => {
		const nextClasses = {
			"slick-arrow": true,
			"slick-next": true
		};
		let nextHandler = (e) => {
			clickHandler({ message: "next" }, e);
		};
		if (!canGoNext(props)) {
			nextClasses["slick-disabled"] = true;
			nextHandler = void 0;
		}
		const nextArrowProps = {
			"key": "1",
			"data-role": "none",
			"class": clsx(nextClasses),
			"style": { display: "block" },
			"onClick": nextHandler
		};
		const customProps = {
			currentSlide: props.currentSlide,
			slideCount: props.slideCount
		};
		if (props.nextArrow && isVNode(props.nextArrow)) return cloneVNode(props.nextArrow, {
			...nextArrowProps,
			...customProps
		});
		return createVNode("button", mergeProps({ "type": "button" }, nextArrowProps), [createTextVNode("Next")]);
	};
}, { props: {
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
	currentSlide: {
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
	clickHandler: {
		type: Function,
		required: false,
		default: void 0
	}
} });
export { NextArrow, PrevArrow };
