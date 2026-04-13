import default_props_default from "./default-props.js";
import { canGoNext, changeSlide, extractObject, getHeight, getOnDemandLazySlides, getPostClones, getPreClones, getTrackCSS, getTrackLeft, initializedState, keyHandler, slideHandler, swipeEnd, swipeMove, swipeStart } from "./utils/innerSliderUtils.js";
import { NextArrow, PrevArrow } from "./Arrows.js";
import Dots_default from "./Dots.js";
import initial_state_default from "./initial-state.js";
import Track_default from "./Track.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, nextTick, onBeforeUnmount, onMounted, onUpdated, reactive, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty, getStylePxValue } from "@v-c/util/dist/props-util";
import { toArray } from "@v-c/util/dist/Children/toArray";
import { debounce } from "es-toolkit";
var InnerSlider_default = /* @__PURE__ */ defineComponent((props, { slots, expose }) => {
	const mergedProps = computed(() => ({ ...props }));
	const listRef = shallowRef(null);
	const trackRef = shallowRef(null);
	const callbackTimers = [];
	let autoplayTimer = null;
	let lazyLoadTimer = null;
	let animationEndCallback = null;
	let debouncedResize = null;
	let ro = null;
	let asNavForIndex = null;
	let clickable = true;
	let latestChildren = [];
	let latestChildrenCount = 0;
	let lastChildrenCount = 0;
	const resolveChildren = () => {
		return filterEmpty(toArray(slots?.default?.() || [])).filter((child) => child !== false);
	};
	const state = reactive({
		...initial_state_default,
		currentSlide: mergedProps.value.initialSlide ?? 0,
		targetSlide: mergedProps.value.initialSlide ?? 0,
		slideCount: 0
	});
	const setState = (nextState, callback) => {
		Object.assign(state, nextState);
		if (callback) nextTick(callback);
	};
	const getSpec = (extra) => ({
		...mergedProps.value,
		...state,
		listRef: listRef.value,
		trackRef: trackRef.value,
		slideCount: latestChildrenCount,
		children: latestChildren,
		...extra
	});
	const adaptHeight = () => {
		if (!mergedProps.value.adaptiveHeight || !listRef.value) return;
		const elem = listRef.value.querySelector(`[data-index="${state.currentSlide}"]`);
		if (elem) listRef.value.style.height = `${getHeight(elem)}px`;
	};
	const updateState = (spec, setTrackStyle, callback) => {
		const updatedState = initializedState(spec);
		const mergedSpec = {
			...spec,
			...updatedState,
			slideIndex: updatedState.currentSlide
		};
		const targetLeft = getTrackLeft(mergedSpec);
		const trackStyle = getTrackCSS({
			...mergedSpec,
			left: targetLeft
		});
		if (setTrackStyle) updatedState.trackStyle = trackStyle;
		setState(updatedState, callback);
	};
	const getSsrState = (children, slideCount) => {
		if (slideCount === 0) return {};
		if (mergedProps.value.variableWidth) {
			let trackWidth$1 = 0;
			let trackLeft$1 = 0;
			const childrenWidths = [];
			const preClones = getPreClones({
				...mergedProps.value,
				...state,
				slideCount
			});
			const postClones = getPostClones({
				...mergedProps.value,
				...state,
				slideCount
			});
			children.forEach((child) => {
				const width = child?.props?.style?.width;
				const widthValue = typeof width === "number" ? width : Number.parseFloat(String(width)) || 0;
				childrenWidths.push(widthValue);
				trackWidth$1 += widthValue;
			});
			for (let i = 0; i < preClones; i += 1) {
				trackLeft$1 += childrenWidths[childrenWidths.length - 1 - i];
				trackWidth$1 += childrenWidths[childrenWidths.length - 1 - i];
			}
			for (let i = 0; i < postClones; i += 1) trackWidth$1 += childrenWidths[i];
			for (let i = 0; i < state.currentSlide; i += 1) trackLeft$1 += childrenWidths[i];
			const trackStyle$1 = {
				width: `${trackWidth$1}px`,
				left: `${-trackLeft$1}px`
			};
			if (mergedProps.value.centerMode) {
				const currentWidth = `${childrenWidths[state.currentSlide]}px`;
				trackStyle$1.left = `calc(${trackStyle$1.left} + (100% - ${currentWidth}) / 2 )`;
			}
			return { trackStyle: trackStyle$1 };
		}
		const spec = {
			...mergedProps.value,
			...state,
			slideCount
		};
		const totalSlideCount = getPreClones(spec) + getPostClones(spec) + slideCount;
		const trackWidth = 100 / mergedProps.value.slidesToShow * totalSlideCount;
		const slideWidth = 100 / totalSlideCount;
		let trackLeft = -slideWidth * (getPreClones(spec) + state.currentSlide) * trackWidth / 100;
		if (mergedProps.value.centerMode) trackLeft += (100 - slideWidth * trackWidth / 100) / 2;
		const trackStyle = {
			width: `${trackWidth}%`,
			left: `${trackLeft}%`
		};
		return {
			slideWidth: `${slideWidth}%`,
			trackStyle
		};
	};
	const ssrInit = () => {
		return getSsrState(latestChildren, latestChildrenCount);
	};
	Object.assign(state, ssrInit());
	const checkImagesLoad = () => {
		const listNode = listRef.value;
		if (!listNode || typeof document === "undefined") return;
		const images = listNode.querySelectorAll(".slick-slide img") || [];
		const imagesCount = images.length;
		let loadedCount = 0;
		Array.prototype.forEach.call(images, (image) => {
			const handler = () => {
				loadedCount += 1;
				if (loadedCount >= imagesCount) onWindowResized();
			};
			if (!image.onclick) image.onclick = () => image.parentElement?.focus();
			else {
				const prevClickHandler = image.onclick;
				image.onclick = (e) => {
					prevClickHandler(e);
					image.parentElement?.focus();
				};
			}
			if (!image.onload) if (mergedProps.value.lazyLoad) image.onload = () => {
				adaptHeight();
				callbackTimers.push(setTimeout(onWindowResized, mergedProps.value.speed));
			};
			else {
				image.onload = handler;
				image.onerror = () => {
					handler();
					mergedProps.value.onLazyLoadError?.();
				};
			}
		});
	};
	const progressiveLazyLoad = () => {
		const slidesToLoad = [];
		const spec = getSpec();
		for (let index = state.currentSlide; index < state.slideCount + getPostClones(spec); index += 1) if (!state.lazyLoadedList.includes(index)) {
			slidesToLoad.push(index);
			break;
		}
		for (let index = state.currentSlide - 1; index >= -getPreClones(spec); index -= 1) if (!state.lazyLoadedList.includes(index)) {
			slidesToLoad.push(index);
			break;
		}
		if (slidesToLoad.length > 0) {
			setState({ lazyLoadedList: state.lazyLoadedList.concat(slidesToLoad) });
			mergedProps.value.onLazyLoad?.(slidesToLoad);
		} else if (lazyLoadTimer) {
			clearInterval(lazyLoadTimer);
			lazyLoadTimer = null;
		}
	};
	const resolveInnerSlider = (nav) => {
		if (!nav) return null;
		if (typeof nav.slideHandler === "function") return nav;
		if (nav.innerSlider) {
			const inner = nav.innerSlider;
			if (inner && typeof inner === "object" && "value" in inner) return inner.value ?? null;
			return inner;
		}
		return null;
	};
	const slideHandler$1 = (index, dontAnimate = false) => {
		const { asNavFor, beforeChange, onLazyLoad, speed, afterChange } = mergedProps.value;
		const currentSlide = state.currentSlide;
		const { state: newState, nextState } = slideHandler({
			index,
			...mergedProps.value,
			...state,
			trackRef: trackRef.value,
			useCSS: mergedProps.value.useCSS && !dontAnimate
		});
		if (!newState) return;
		beforeChange?.(currentSlide, newState.currentSlide);
		const slidesToLoad = newState.lazyLoadedList?.filter((value) => !state.lazyLoadedList.includes(value)) ?? [];
		if (onLazyLoad && slidesToLoad.length > 0) onLazyLoad(slidesToLoad);
		if (!mergedProps.value.waitForAnimate && animationEndCallback) {
			clearTimeout(animationEndCallback);
			animationEndCallback = null;
			afterChange?.(currentSlide);
		}
		setState(newState, () => {
			const navTarget = resolveInnerSlider(asNavFor);
			if (navTarget && asNavForIndex !== index) {
				asNavForIndex = index;
				navTarget.slideHandler(index);
			}
			if (!nextState) return;
			animationEndCallback = setTimeout(() => {
				const { animating, ...firstBatch } = nextState;
				setState(firstBatch, () => {
					callbackTimers.push(setTimeout(() => setState({ animating }), 10));
					afterChange?.(newState.currentSlide);
					animationEndCallback = null;
				});
			}, speed);
		});
	};
	const changeSlide$1 = (options, dontAnimate = false) => {
		const targetSlide = changeSlide(getSpec(), options);
		if (targetSlide !== 0 && !targetSlide) return;
		if (dontAnimate === true) slideHandler$1(targetSlide, dontAnimate);
		else slideHandler$1(targetSlide);
		if (mergedProps.value.autoplay) autoPlay("update");
		if (mergedProps.value.focusOnSelect && listRef.value) (listRef.value.querySelectorAll(".slick-current")?.[0])?.focus();
	};
	const clickHandler = (e) => {
		if (clickable === false) {
			e.stopPropagation();
			e.preventDefault();
		}
		clickable = true;
	};
	const keyHandler$1 = (e) => {
		const dir = keyHandler(e, mergedProps.value.accessibility, mergedProps.value.rtl);
		if (dir !== "") changeSlide$1({ message: dir });
	};
	const selectHandler = (options) => {
		changeSlide$1(options);
	};
	const disableBodyScroll = () => {
		if (typeof window === "undefined") return;
		const preventDefault = (event) => {
			event.preventDefault();
		};
		window.ontouchmove = preventDefault;
	};
	const enableBodyScroll = () => {
		if (typeof window === "undefined") return;
		window.ontouchmove = null;
	};
	const swipeStart$1 = (e) => {
		if (mergedProps.value.verticalSwiping) disableBodyScroll();
		const swipeState = swipeStart(e, mergedProps.value.swipe, mergedProps.value.draggable);
		if (swipeState !== "") setState(swipeState);
	};
	const swipeMove$1 = (e) => {
		const swipeState = swipeMove(e, {
			...mergedProps.value,
			...state,
			trackRef: trackRef.value,
			listRef: listRef.value,
			slideIndex: state.currentSlide
		});
		if (!swipeState) return;
		if (swipeState.swiping) clickable = false;
		setState(swipeState);
	};
	const swipeEnd$1 = (e) => {
		const swipeState = swipeEnd(e, {
			...mergedProps.value,
			...state,
			trackRef: trackRef.value,
			listRef: listRef.value,
			slideIndex: state.currentSlide
		});
		if (!swipeState) return;
		const triggerSlideHandler = swipeState.triggerSlideHandler;
		delete swipeState.triggerSlideHandler;
		setState(swipeState);
		if (triggerSlideHandler === void 0) return;
		slideHandler$1(triggerSlideHandler);
		if (mergedProps.value.verticalSwiping) enableBodyScroll();
	};
	const touchEnd = (e) => {
		swipeEnd$1(e);
		clickable = true;
	};
	const slickPrev = () => {
		callbackTimers.push(setTimeout(() => changeSlide$1({ message: "previous" }), 0));
	};
	const slickNext = () => {
		callbackTimers.push(setTimeout(() => changeSlide$1({ message: "next" }), 0));
	};
	const slickGoTo = (slide, dontAnimate = false) => {
		const target = Number(slide);
		if (Number.isNaN(target)) return;
		callbackTimers.push(setTimeout(() => changeSlide$1({
			message: "index",
			index: target,
			currentSlide: state.currentSlide
		}, dontAnimate), 0));
	};
	const play = () => {
		let nextIndex = 0;
		if (mergedProps.value.rtl) nextIndex = state.currentSlide - mergedProps.value.slidesToScroll;
		else if (canGoNext({
			...mergedProps.value,
			...state
		})) nextIndex = state.currentSlide + mergedProps.value.slidesToScroll;
		else return false;
		slideHandler$1(nextIndex);
		return true;
	};
	function autoPlay(playType) {
		if (autoplayTimer) clearInterval(autoplayTimer);
		const autoplaying = state.autoplaying;
		if (playType === "update") {
			if (autoplaying === "hovered" || autoplaying === "focused" || autoplaying === "paused") return;
		} else if (playType === "leave") {
			if (autoplaying === "paused" || autoplaying === "focused") return;
		} else if (playType === "blur") {
			if (autoplaying === "paused" || autoplaying === "hovered") return;
		}
		autoplayTimer = setInterval(play, mergedProps.value.autoplaySpeed + 50);
		setState({ autoplaying: "playing" });
	}
	const pause = (pauseType) => {
		if (autoplayTimer) {
			clearInterval(autoplayTimer);
			autoplayTimer = null;
		}
		const autoplaying = state.autoplaying;
		if (pauseType === "paused") setState({ autoplaying: "paused" });
		else if (pauseType === "focused") {
			if (autoplaying === "hovered" || autoplaying === "playing") setState({ autoplaying: "focused" });
		} else if (autoplaying === "playing") setState({ autoplaying: "hovered" });
	};
	const onDotsOver = () => mergedProps.value.autoplay && pause("hovered");
	const onDotsLeave = () => mergedProps.value.autoplay && state.autoplaying === "hovered" && autoPlay("leave");
	const onTrackOver = () => mergedProps.value.autoplay && pause("hovered");
	const onTrackLeave = () => mergedProps.value.autoplay && state.autoplaying === "hovered" && autoPlay("leave");
	const onSlideFocus = () => mergedProps.value.autoplay && pause("focused");
	const onSlideBlur = () => mergedProps.value.autoplay && state.autoplaying === "focused" && autoPlay("blur");
	function onWindowResized(setTrackStyle) {
		if (debouncedResize?.cancel) debouncedResize.cancel();
		debouncedResize = debounce(() => resizeWindow(setTrackStyle), 50);
		debouncedResize();
	}
	function resizeWindow(setTrackStyle = true) {
		if (!Boolean(trackRef.value)) return;
		updateState(getSpec(), setTrackStyle, () => {
			if (mergedProps.value.autoplay) autoPlay("update");
			else pause("paused");
		});
		setState({ animating: false });
		if (animationEndCallback) {
			clearTimeout(animationEndCallback);
			animationEndCallback = null;
		}
	}
	const didPropsChange = (prevProps, nextProps, prevChildren, nextChildren) => {
		let setTrackStyle = false;
		for (const key of Object.keys(nextProps)) {
			if (!Object.prototype.hasOwnProperty.call(prevProps, key)) {
				setTrackStyle = true;
				break;
			}
			const prevValue = prevProps[key];
			if (typeof prevValue === "object" || typeof prevValue === "function" || Number.isNaN(prevValue)) continue;
			if (prevValue !== nextProps[key]) {
				setTrackStyle = true;
				break;
			}
		}
		return setTrackStyle || prevChildren !== nextChildren;
	};
	onMounted(() => {
		lastChildrenCount = latestChildrenCount;
		mergedProps.value.onInit?.();
		if (mergedProps.value.lazyLoad) {
			const slidesToLoad = getOnDemandLazySlides(getSpec());
			if (slidesToLoad.length > 0) {
				setState({ lazyLoadedList: state.lazyLoadedList.concat(slidesToLoad) });
				mergedProps.value.onLazyLoad?.(slidesToLoad);
			}
		}
		updateState(getSpec(), true, () => {
			adaptHeight();
			if (mergedProps.value.autoplay) autoPlay("playing");
		});
		if (mergedProps.value.lazyLoad === "progressive") lazyLoadTimer = setInterval(progressiveLazyLoad, 1e3);
		if (typeof ResizeObserver !== "undefined" && listRef.value) {
			ro = new ResizeObserver(() => {
				if (state.animating) {
					onWindowResized(false);
					callbackTimers.push(setTimeout(() => onWindowResized(), mergedProps.value.speed));
				} else onWindowResized();
			});
			ro.observe(listRef.value);
		}
		if (typeof document !== "undefined") {
			const slides = document.querySelectorAll(".slick-slide");
			Array.prototype.forEach.call(slides, (slide) => {
				slide.onfocus = mergedProps.value.pauseOnFocus ? onSlideFocus : null;
				slide.onblur = mergedProps.value.pauseOnFocus ? onSlideBlur : null;
			});
		}
		if (typeof window !== "undefined") {
			if (window.addEventListener) window.addEventListener("resize", onWindowResized);
			else if (window.attachEvent) window.attachEvent("onresize", onWindowResized);
		}
	});
	const handlePropsOrChildrenChange = (prevProps, nextProps, prevCount, nextCount) => {
		if (!prevProps) return;
		checkImagesLoad();
		mergedProps.value.onReInit?.();
		if (mergedProps.value.lazyLoad) {
			const slidesToLoad = getOnDemandLazySlides(getSpec());
			if (slidesToLoad.length > 0) {
				setState({ lazyLoadedList: state.lazyLoadedList.concat(slidesToLoad) });
				mergedProps.value.onLazyLoad?.(slidesToLoad);
			}
		}
		adaptHeight();
		const setTrackStyle = didPropsChange(prevProps, nextProps, prevCount, nextCount);
		if (setTrackStyle) updateState(getSpec(), setTrackStyle, () => {
			if (state.currentSlide >= latestChildrenCount) changeSlide$1({
				message: "index",
				index: latestChildrenCount - mergedProps.value.slidesToShow,
				currentSlide: state.currentSlide
			});
			if (prevProps.autoplay !== mergedProps.value.autoplay || prevProps.autoplaySpeed !== mergedProps.value.autoplaySpeed) if (!prevProps.autoplay && mergedProps.value.autoplay) autoPlay("playing");
			else if (mergedProps.value.autoplay) autoPlay("update");
			else pause("paused");
		});
	};
	watch(mergedProps, (nextProps, prevProps) => {
		if (prevProps) {
			handlePropsOrChildrenChange(prevProps, nextProps, lastChildrenCount, latestChildrenCount);
			lastChildrenCount = latestChildrenCount;
		}
	}, { flush: "post" });
	onUpdated(() => {
		if (latestChildrenCount !== lastChildrenCount) {
			handlePropsOrChildrenChange(mergedProps.value, mergedProps.value, lastChildrenCount, latestChildrenCount);
			lastChildrenCount = latestChildrenCount;
		}
	});
	onBeforeUnmount(() => {
		if (animationEndCallback) clearTimeout(animationEndCallback);
		if (lazyLoadTimer) clearInterval(lazyLoadTimer);
		if (callbackTimers.length) {
			callbackTimers.forEach((timer) => clearTimeout(timer));
			callbackTimers.length = 0;
		}
		if (typeof window !== "undefined") {
			if (window.removeEventListener) window.removeEventListener("resize", onWindowResized);
			else if (window.detachEvent) window.detachEvent("onresize", onWindowResized);
		}
		if (autoplayTimer) clearInterval(autoplayTimer);
		ro?.disconnect();
	});
	expose({
		slickPrev,
		slickNext,
		slickGoTo,
		autoPlay,
		pause,
		play,
		slideHandler: slideHandler$1,
		changeSlide: changeSlide$1
	});
	return () => {
		const renderChildren = resolveChildren();
		latestChildren = renderChildren;
		latestChildrenCount = renderChildren.length;
		const fallbackSsrState = state.trackStyle ? null : getSsrState(renderChildren, latestChildrenCount);
		const className = clsx("slick-slider", mergedProps.value.className, {
			"slick-vertical": mergedProps.value.vertical,
			"slick-initialized": true
		});
		const spec = {
			...mergedProps.value,
			...state,
			...fallbackSsrState || {},
			slideCount: latestChildrenCount,
			children: renderChildren
		};
		let trackProps = extractObject(spec, [
			"fade",
			"cssEase",
			"speed",
			"infinite",
			"centerMode",
			"focusOnSelect",
			"currentSlide",
			"lazyLoad",
			"lazyLoadedList",
			"rtl",
			"slideWidth",
			"slideHeight",
			"listHeight",
			"vertical",
			"slidesToShow",
			"slidesToScroll",
			"slideCount",
			"trackStyle",
			"variableWidth",
			"unslick",
			"centerPadding",
			"targetSlide",
			"useCSS"
		]);
		const { pauseOnHover } = mergedProps.value;
		trackProps = {
			...trackProps,
			onMouseEnter: pauseOnHover ? onTrackOver : void 0,
			onMouseLeave: pauseOnHover ? onTrackLeave : void 0,
			onMouseOver: pauseOnHover ? onTrackOver : void 0,
			focusOnSelect: mergedProps.value.focusOnSelect && clickable ? selectHandler : void 0,
			children: renderChildren,
			nodeRef: trackRef
		};
		let dots;
		if (mergedProps.value.dots === true && latestChildrenCount >= mergedProps.value.slidesToShow) {
			let dotProps = extractObject(spec, [
				"dotsClass",
				"slideCount",
				"slidesToShow",
				"currentSlide",
				"slidesToScroll",
				"customPaging",
				"infinite",
				"appendDots"
			]);
			const { pauseOnDotsHover } = mergedProps.value;
			dotProps = {
				...dotProps,
				clickHandler: changeSlide$1,
				onMouseEnter: pauseOnDotsHover ? onDotsLeave : void 0,
				onMouseOver: pauseOnDotsHover ? onDotsOver : void 0,
				onMouseLeave: pauseOnDotsHover ? onDotsLeave : void 0
			};
			dots = createVNode(Dots_default, dotProps, null);
		}
		let prevArrow;
		let nextArrow;
		const arrowProps = extractObject(spec, [
			"infinite",
			"centerMode",
			"currentSlide",
			"slideCount",
			"slidesToShow",
			"prevArrow",
			"nextArrow"
		]);
		arrowProps.clickHandler = changeSlide$1;
		if (mergedProps.value.arrows) {
			prevArrow = createVNode(PrevArrow, arrowProps, null);
			nextArrow = createVNode(NextArrow, arrowProps, null);
		}
		let verticalHeightStyle = null;
		if (mergedProps.value.vertical) verticalHeightStyle = { height: getStylePxValue(state.listHeight) };
		let centerPaddingStyle = null;
		if (mergedProps.value.vertical === false) {
			if (mergedProps.value.centerMode === true) centerPaddingStyle = { padding: `0px ${mergedProps.value.centerPadding}` };
		} else if (mergedProps.value.centerMode === true) centerPaddingStyle = { padding: `${mergedProps.value.centerPadding} 0px` };
		const listStyle = {
			...verticalHeightStyle,
			...centerPaddingStyle
		};
		const touchMove = mergedProps.value.touchMove;
		let listProps = {
			class: "slick-list",
			style: listStyle,
			onClick: clickHandler,
			onMousedown: touchMove ? swipeStart$1 : void 0,
			onMousemove: state.dragging && touchMove ? swipeMove$1 : void 0,
			onMouseup: touchMove ? swipeEnd$1 : void 0,
			onMouseleave: state.dragging && touchMove ? swipeEnd$1 : void 0,
			onTouchstart: touchMove ? swipeStart$1 : void 0,
			onTouchmove: state.dragging && touchMove ? swipeMove$1 : void 0,
			onTouchend: touchMove ? touchEnd : void 0,
			onTouchcancel: state.dragging && touchMove ? swipeEnd$1 : void 0,
			onKeydown: mergedProps.value.accessibility ? keyHandler$1 : void 0
		};
		let innerSliderProps = {
			class: className,
			dir: "ltr",
			style: mergedProps.value.style
		};
		if (mergedProps.value.unslick) {
			listProps = { class: "slick-list" };
			innerSliderProps = {
				class: className,
				style: mergedProps.value.style
			};
		}
		return createVNode("div", innerSliderProps, [
			!mergedProps.value.unslick ? prevArrow : "",
			createVNode("div", mergeProps({ "ref": listRef }, listProps), [createVNode(Track_default, trackProps, null)]),
			!mergedProps.value.unslick ? nextArrow : "",
			!mergedProps.value.unslick ? dots : ""
		]);
	};
}, { props: /* @__PURE__ */ mergeDefaults({
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
}, default_props_default) });
export { InnerSlider_default as default };
