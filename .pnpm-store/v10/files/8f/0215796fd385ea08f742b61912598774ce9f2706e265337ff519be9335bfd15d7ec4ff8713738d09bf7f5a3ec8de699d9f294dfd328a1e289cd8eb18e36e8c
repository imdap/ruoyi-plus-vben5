import default_props_default from "../default-props.js";
import { getStylePxValue } from "@v-c/util/dist/props-util";
function getTrackNode(trackRef) {
	if (!trackRef) return null;
	return trackRef.node ?? trackRef;
}
function clamp(number, lowerBound, upperBound) {
	return Math.max(lowerBound, Math.min(number, upperBound));
}
function safePreventDefault(event) {
	if (!event || typeof event.preventDefault !== "function") return;
	if ("cancelable" in event && event.cancelable === false) return;
	event.preventDefault();
}
function getOnDemandLazySlides(spec) {
	const onDemandSlides = [];
	const startIndex = lazyStartIndex(spec);
	const endIndex = lazyEndIndex(spec);
	for (let slideIndex = startIndex; slideIndex < endIndex; slideIndex++) if (!spec.lazyLoadedList.includes(slideIndex)) onDemandSlides.push(slideIndex);
	return onDemandSlides;
}
function getRequiredLazySlides(spec) {
	const requiredSlides = [];
	const startIndex = lazyStartIndex(spec);
	const endIndex = lazyEndIndex(spec);
	for (let slideIndex = startIndex; slideIndex < endIndex; slideIndex++) requiredSlides.push(slideIndex);
	return requiredSlides;
}
function lazyStartIndex(spec) {
	return spec.currentSlide - lazySlidesOnLeft(spec);
}
function lazyEndIndex(spec) {
	return spec.currentSlide + lazySlidesOnRight(spec);
}
function lazySlidesOnLeft(spec) {
	return spec.centerMode ? Math.floor(spec.slidesToShow / 2) + (parseInt(spec.centerPadding) > 0 ? 1 : 0) : 0;
}
function lazySlidesOnRight(spec) {
	return spec.centerMode ? Math.floor((spec.slidesToShow - 1) / 2) + 1 + (parseInt(spec.centerPadding) > 0 ? 1 : 0) : spec.slidesToShow;
}
const getWidth = (elem) => elem && elem.offsetWidth || 0;
const getHeight = (elem) => elem && elem.offsetHeight || 0;
function getSwipeDirection(touchObject, verticalSwiping = false) {
	let xDist = 0;
	let yDist = 0;
	let r = 0;
	let swipeAngle = 0;
	xDist = touchObject.startX - touchObject.curX;
	yDist = touchObject.startY - touchObject.curY;
	r = Math.atan2(yDist, xDist);
	swipeAngle = Math.round(r * 180 / Math.PI);
	if (swipeAngle < 0) swipeAngle = 360 - Math.abs(swipeAngle);
	if (swipeAngle <= 45 && swipeAngle >= 0 || swipeAngle <= 360 && swipeAngle >= 315) return "left";
	if (swipeAngle >= 135 && swipeAngle <= 225) return "right";
	if (verticalSwiping === true) if (swipeAngle >= 35 && swipeAngle <= 135) return "up";
	else return "down";
	return "vertical";
}
function canGoNext(spec) {
	let canGo = true;
	if (!spec.infinite) {
		if (spec.centerMode && spec.currentSlide >= spec.slideCount - 1) canGo = false;
		else if (spec.slideCount <= spec.slidesToShow || spec.currentSlide >= spec.slideCount - spec.slidesToShow) canGo = false;
	}
	return canGo;
}
function extractObject(spec, keys) {
	const newObject = {};
	keys.forEach((key) => newObject[key] = spec[key]);
	return newObject;
}
function initializedState(spec) {
	const slideCount = Array.isArray(spec.children) ? spec.children.length : 0;
	const listNode = spec.listRef;
	const listWidth = Math.ceil(getWidth(listNode));
	const trackNode = getTrackNode(spec.trackRef);
	const trackWidth = Math.ceil(getWidth(trackNode));
	let slideWidth = 0;
	if (!spec.vertical) {
		let centerPaddingAdj = spec.centerMode ? parseInt(spec.centerPadding) * 2 : 0;
		if (typeof spec.centerPadding === "string" && spec.centerPadding.slice(-1) === "%") centerPaddingAdj *= listWidth / 100;
		slideWidth = Math.ceil((listWidth - centerPaddingAdj) / spec.slidesToShow);
	} else slideWidth = listWidth;
	const slideHeight = listNode ? getHeight(listNode.querySelector("[data-index=\"0\"]")) : 0;
	const listHeight = slideHeight * spec.slidesToShow;
	let currentSlide = spec.currentSlide === void 0 ? spec.initialSlide : spec.currentSlide;
	if (spec.rtl && spec.currentSlide === void 0) currentSlide = slideCount - 1 - spec.initialSlide;
	let lazyLoadedList = spec.lazyLoadedList || [];
	const slidesToLoad = getOnDemandLazySlides({
		...spec,
		currentSlide,
		lazyLoadedList
	});
	lazyLoadedList = lazyLoadedList.concat(slidesToLoad);
	const state = {
		slideCount,
		slideWidth,
		listWidth,
		trackWidth,
		currentSlide,
		slideHeight,
		listHeight,
		lazyLoadedList
	};
	if (spec.autoplaying === null && spec.autoplay) state.autoplaying = "playing";
	return state;
}
function slideHandler(spec) {
	const { waitForAnimate, animating, fade, infinite, index, slideCount, lazyLoad, currentSlide, centerMode, slidesToScroll, slidesToShow, useCSS } = spec;
	let { lazyLoadedList } = spec;
	if (waitForAnimate && animating) return {};
	let animationSlide = index;
	let finalSlide = 0;
	let animationLeft = 0;
	let finalLeft = 0;
	let state = {};
	let nextState = {};
	const targetSlide = infinite ? index : clamp(index, 0, slideCount - 1);
	if (fade) {
		if (!infinite && (index < 0 || index >= slideCount)) return {};
		if (index < 0) animationSlide = index + slideCount;
		else if (index >= slideCount) animationSlide = index - slideCount;
		if (lazyLoad && !lazyLoadedList.includes(animationSlide)) lazyLoadedList = lazyLoadedList.concat(animationSlide);
		state = {
			animating: true,
			currentSlide: animationSlide,
			lazyLoadedList,
			targetSlide: animationSlide
		};
		nextState = {
			animating: false,
			targetSlide: animationSlide
		};
	} else {
		finalSlide = animationSlide;
		if (animationSlide < 0) {
			finalSlide = animationSlide + slideCount;
			if (!infinite) finalSlide = 0;
			else if (slideCount % slidesToScroll !== 0) finalSlide = slideCount - slideCount % slidesToScroll;
		} else if (!canGoNext(spec) && animationSlide > currentSlide) animationSlide = finalSlide = currentSlide;
		else if (centerMode && animationSlide >= slideCount) {
			animationSlide = infinite ? slideCount : slideCount - 1;
			finalSlide = infinite ? 0 : slideCount - 1;
		} else if (animationSlide >= slideCount) {
			finalSlide = animationSlide - slideCount;
			if (!infinite) finalSlide = slideCount - slidesToShow;
			else if (slideCount % slidesToScroll !== 0) finalSlide = 0;
		}
		if (!infinite && animationSlide + slidesToShow >= slideCount) finalSlide = slideCount - slidesToShow;
		animationLeft = getTrackLeft({
			...spec,
			slideIndex: animationSlide
		});
		finalLeft = getTrackLeft({
			...spec,
			slideIndex: finalSlide
		});
		if (!infinite) {
			if (animationLeft === finalLeft) animationSlide = finalSlide;
			animationLeft = finalLeft;
		}
		if (lazyLoad) lazyLoadedList = lazyLoadedList.concat(getOnDemandLazySlides({
			...spec,
			currentSlide: animationSlide
		}));
		if (!useCSS) state = {
			currentSlide: finalSlide,
			trackStyle: getTrackCSS({
				...spec,
				left: finalLeft
			}),
			lazyLoadedList,
			targetSlide
		};
		else {
			state = {
				animating: true,
				currentSlide: finalSlide,
				trackStyle: getTrackAnimateCSS({
					...spec,
					left: animationLeft
				}),
				lazyLoadedList,
				targetSlide
			};
			nextState = {
				animating: false,
				currentSlide: finalSlide,
				trackStyle: getTrackCSS({
					...spec,
					left: finalLeft
				}),
				swipeLeft: null,
				targetSlide
			};
		}
	}
	return {
		state,
		nextState
	};
}
function changeSlide(spec, options) {
	let indexOffset = 0;
	let previousInt = 0;
	let slideOffset = 0;
	let unevenOffset = false;
	let targetSlide = 0;
	const { slidesToScroll, slidesToShow, slideCount, currentSlide, targetSlide: previousTargetSlide, lazyLoad, infinite } = spec;
	unevenOffset = slideCount % slidesToScroll !== 0;
	indexOffset = unevenOffset ? 0 : (slideCount - currentSlide) % slidesToScroll;
	if (options.message === "previous") {
		slideOffset = indexOffset === 0 ? slidesToScroll : slidesToShow - indexOffset;
		targetSlide = currentSlide - slideOffset;
		if (lazyLoad && !infinite) {
			previousInt = currentSlide - slideOffset;
			targetSlide = previousInt === -1 ? slideCount - 1 : previousInt;
		}
		if (!infinite) targetSlide = previousTargetSlide - slidesToScroll;
	} else if (options.message === "next") {
		slideOffset = indexOffset === 0 ? slidesToScroll : indexOffset;
		targetSlide = currentSlide + slideOffset;
		if (lazyLoad && !infinite) targetSlide = (currentSlide + slidesToScroll) % slideCount + indexOffset;
		if (!infinite) targetSlide = previousTargetSlide + slidesToScroll;
	} else if (options.message === "dots") targetSlide = options.index * options.slidesToScroll;
	else if (options.message === "children") {
		targetSlide = options.index;
		if (infinite) {
			const direction = siblingDirection({
				...spec,
				targetSlide
			});
			if (targetSlide > options.currentSlide && direction === "left") targetSlide = targetSlide - slideCount;
			else if (targetSlide < options.currentSlide && direction === "right") targetSlide = targetSlide + slideCount;
		}
	} else if (options.message === "index") targetSlide = Number(options.index);
	return targetSlide;
}
function keyHandler(e, accessibility, rtl) {
	if (e.target.tagName.match("TEXTAREA|INPUT|SELECT") || !accessibility) return "";
	if (e.keyCode === 37) return rtl ? "next" : "previous";
	if (e.keyCode === 39) return rtl ? "previous" : "next";
	return "";
}
function swipeStart(e, swipe, draggable) {
	e.target.tagName === "IMG" && safePreventDefault(e);
	if (!swipe || !draggable && e.type.includes("mouse")) return "";
	return {
		dragging: true,
		touchObject: {
			startX: e.touches ? e.touches[0].pageX : e.clientX,
			startY: e.touches ? e.touches[0].pageY : e.clientY,
			curX: e.touches ? e.touches[0].pageX : e.clientX,
			curY: e.touches ? e.touches[0].pageY : e.clientY
		}
	};
}
function swipeMove(e, spec) {
	const { scrolling, animating, vertical, swipeToSlide, verticalSwiping, rtl, currentSlide, edgeFriction, edgeDragged, onEdge, swiped, swiping, slideCount, slidesToScroll, infinite, touchObject, swipeEvent, listHeight, listWidth } = spec;
	if (scrolling) return;
	if (animating) return safePreventDefault(e);
	if (vertical && swipeToSlide && verticalSwiping) safePreventDefault(e);
	let swipeLeft = 0;
	let state = {};
	const curLeft = getTrackLeft(spec);
	touchObject.curX = e.touches ? e.touches[0].pageX : e.clientX;
	touchObject.curY = e.touches ? e.touches[0].pageY : e.clientY;
	touchObject.swipeLength = Math.round(Math.sqrt((touchObject.curX - touchObject.startX) ** 2));
	const verticalSwipeLength = Math.round(Math.sqrt((touchObject.curY - touchObject.startY) ** 2));
	if (!verticalSwiping && !swiping && verticalSwipeLength > 10) return { scrolling: true };
	if (verticalSwiping) touchObject.swipeLength = verticalSwipeLength;
	let positionOffset = (!rtl ? 1 : -1) * (touchObject.curX > touchObject.startX ? 1 : -1);
	if (verticalSwiping) positionOffset = touchObject.curY > touchObject.startY ? 1 : -1;
	const dotCount = Math.ceil(slideCount / slidesToScroll);
	const swipeDirection = getSwipeDirection(spec.touchObject, verticalSwiping);
	let touchSwipeLength = touchObject.swipeLength;
	if (!infinite) {
		if (currentSlide === 0 && (swipeDirection === "right" || swipeDirection === "down") || currentSlide + 1 >= dotCount && (swipeDirection === "left" || swipeDirection === "up") || !canGoNext(spec) && (swipeDirection === "left" || swipeDirection === "up")) {
			touchSwipeLength = touchObject.swipeLength * edgeFriction;
			if (edgeDragged === false && onEdge) {
				onEdge(swipeDirection);
				state.edgeDragged = true;
			}
		}
	}
	if (!swiped && swipeEvent) {
		swipeEvent(swipeDirection);
		state.swiped = true;
	}
	if (!vertical) if (!rtl) swipeLeft = curLeft + touchSwipeLength * positionOffset;
	else swipeLeft = curLeft - touchSwipeLength * positionOffset;
	else swipeLeft = curLeft + touchSwipeLength * (listHeight / listWidth) * positionOffset;
	if (verticalSwiping) swipeLeft = curLeft + touchSwipeLength * positionOffset;
	state = {
		...state,
		touchObject,
		swipeLeft,
		trackStyle: getTrackCSS({
			...spec,
			left: swipeLeft
		})
	};
	if (Math.abs(touchObject.curX - touchObject.startX) < Math.abs(touchObject.curY - touchObject.startY) * .8) return state;
	if (touchObject.swipeLength > 10) {
		state.swiping = true;
		safePreventDefault(e);
	}
	return state;
}
function swipeEnd(e, spec) {
	const { dragging, swipe, touchObject, listWidth, touchThreshold, verticalSwiping, listHeight, swipeToSlide, scrolling, onSwipe, targetSlide, currentSlide, infinite } = spec;
	if (!dragging) {
		if (swipe) safePreventDefault(e);
		return {};
	}
	const minSwipe = verticalSwiping ? listHeight / touchThreshold : listWidth / touchThreshold;
	const swipeDirection = getSwipeDirection(touchObject, verticalSwiping);
	const state = {
		dragging: false,
		edgeDragged: false,
		scrolling: false,
		swiping: false,
		swiped: false,
		swipeLeft: null,
		touchObject: {}
	};
	if (scrolling) return state;
	if (!touchObject.swipeLength) return state;
	if (touchObject.swipeLength > minSwipe) {
		safePreventDefault(e);
		if (onSwipe) onSwipe(swipeDirection);
		let slideCount = 0;
		let newSlide = 0;
		const activeSlide = infinite ? currentSlide : targetSlide;
		switch (swipeDirection) {
			case "left":
			case "up":
				newSlide = activeSlide + getSlideCount(spec);
				slideCount = swipeToSlide ? checkNavigable(spec, newSlide) : newSlide;
				state.currentDirection = 0;
				break;
			case "right":
			case "down":
				newSlide = activeSlide - getSlideCount(spec);
				slideCount = swipeToSlide ? checkNavigable(spec, newSlide) : newSlide;
				state.currentDirection = 1;
				break;
			default: slideCount = activeSlide;
		}
		state.triggerSlideHandler = slideCount;
	} else {
		const currentLeft = getTrackLeft(spec);
		state.trackStyle = getTrackAnimateCSS({
			...spec,
			left: currentLeft
		});
	}
	return state;
}
function getNavigableIndexes(spec) {
	const max = spec.infinite ? spec.slideCount * 2 : spec.slideCount;
	let breakpoint = spec.infinite ? spec.slidesToShow * -1 : 0;
	let counter = spec.infinite ? spec.slidesToShow * -1 : 0;
	const indexes = [];
	while (breakpoint < max) {
		indexes.push(breakpoint);
		breakpoint = counter + spec.slidesToScroll;
		counter += Math.min(spec.slidesToScroll, spec.slidesToShow);
	}
	return indexes;
}
function checkNavigable(spec, index) {
	const navigables = getNavigableIndexes(spec);
	let prevNavigable = 0;
	if (index > navigables[navigables.length - 1]) index = navigables[navigables.length - 1];
	else for (const n in navigables) {
		if (index < navigables[n]) {
			index = prevNavigable;
			break;
		}
		prevNavigable = navigables[n];
	}
	return index;
}
function getSlideCount(spec) {
	const centerOffset = spec.centerMode ? spec.slideWidth * Math.floor(spec.slidesToShow / 2) : 0;
	if (spec.swipeToSlide) {
		let swipedSlide = null;
		const slickList = spec.listRef;
		const slides = slickList.querySelectorAll && slickList.querySelectorAll(".slick-slide") || [];
		Array.from(slides).every((slide) => {
			if (!spec.vertical) {
				if (slide.offsetLeft - centerOffset + getWidth(slide) / 2 > spec.swipeLeft * -1) {
					swipedSlide = slide;
					return false;
				}
			} else if (slide.offsetTop + getHeight(slide) / 2 > spec.swipeLeft * -1) {
				swipedSlide = slide;
				return false;
			}
			return true;
		});
		if (!swipedSlide) return 0;
		const currentIndex = spec.rtl === true ? spec.slideCount - spec.currentSlide : spec.currentSlide;
		return Math.abs(swipedSlide.dataset.index - currentIndex) || 1;
	} else return spec.slidesToScroll;
}
function checkSpecKeys(spec, keysArray) {
	return keysArray.reduce((value, key) => value && Object.prototype.hasOwnProperty.call(spec, key), true) ? null : console.error("Keys Missing:", spec);
}
function getTrackCSS(spec) {
	checkSpecKeys(spec, [
		"left",
		"variableWidth",
		"slideCount",
		"slidesToShow",
		"slideWidth"
	]);
	let trackWidth = 0;
	let trackHeight = 0;
	if (!spec.vertical) trackWidth = getTotalSlides(spec) * spec.slideWidth;
	else trackHeight = (spec.unslick ? spec.slideCount : spec.slideCount + 2 * spec.slidesToShow) * spec.slideHeight;
	let style = {
		opacity: 1,
		transition: "",
		WebkitTransition: ""
	};
	if (spec.useTransform) {
		const WebkitTransform = !spec.vertical ? `translate3d(${spec.left}px, 0px, 0px)` : `translate3d(0px, ${spec.left}px, 0px)`;
		const transform = !spec.vertical ? `translate3d(${spec.left}px, 0px, 0px)` : `translate3d(0px, ${spec.left}px, 0px)`;
		const msTransform = !spec.vertical ? `translateX(${spec.left}px)` : `translateY(${spec.left}px)`;
		style = {
			...style,
			WebkitTransform,
			transform,
			msTransform
		};
	} else if (spec.vertical) style.top = spec.left;
	else style.left = spec.left;
	if (spec.fade) style = { opacity: 1 };
	if (trackWidth) style.width = getStylePxValue(trackWidth);
	if (trackHeight) style.height = getStylePxValue(trackHeight);
	return style;
}
function getTrackAnimateCSS(spec) {
	checkSpecKeys(spec, [
		"left",
		"variableWidth",
		"slideCount",
		"slidesToShow",
		"slideWidth",
		"speed",
		"cssEase"
	]);
	const style = getTrackCSS(spec);
	if (spec.useTransform) {
		style.WebkitTransition = `-webkit-transform ${spec.speed}ms ${spec.cssEase}`;
		style.transition = `transform ${spec.speed}ms ${spec.cssEase}`;
	} else if (spec.vertical) style.transition = `top ${spec.speed}ms ${spec.cssEase}`;
	else style.transition = `left ${spec.speed}ms ${spec.cssEase}`;
	return style;
}
function getTrackLeft(spec) {
	if (spec.unslick) return 0;
	checkSpecKeys(spec, [
		"slideIndex",
		"trackRef",
		"infinite",
		"centerMode",
		"slideCount",
		"slidesToShow",
		"slidesToScroll",
		"slideWidth",
		"listWidth",
		"variableWidth",
		"slideHeight"
	]);
	const { slideIndex, trackRef, infinite, centerMode, slideCount, slidesToShow, slidesToScroll, slideWidth, listWidth, variableWidth, slideHeight, fade, vertical } = spec;
	let slideOffset = 0;
	let targetLeft = 0;
	let targetSlide = null;
	let verticalOffset = 0;
	if (fade || spec.slideCount === 1) return 0;
	let slidesToOffset = 0;
	if (infinite) {
		slidesToOffset = -getPreClones(spec);
		if (slideCount % slidesToScroll !== 0 && slideIndex + slidesToScroll > slideCount) slidesToOffset = -(slideIndex > slideCount ? slidesToShow - (slideIndex - slideCount) : slideCount % slidesToScroll);
		if (centerMode) slidesToOffset += parseInt(String(slidesToShow / 2));
	} else {
		if (slideCount % slidesToScroll !== 0 && slideIndex + slidesToScroll > slideCount) slidesToOffset = slidesToShow - slideCount % slidesToScroll;
		if (centerMode) slidesToOffset = parseInt(String(slidesToShow / 2));
	}
	slideOffset = slidesToOffset * slideWidth;
	verticalOffset = slidesToOffset * slideHeight;
	if (!vertical) targetLeft = slideIndex * slideWidth * -1 + slideOffset;
	else targetLeft = slideIndex * slideHeight * -1 + verticalOffset;
	if (variableWidth === true) {
		let targetSlideIndex = 0;
		const trackElem = getTrackNode(trackRef);
		targetSlideIndex = slideIndex + getPreClones(spec);
		targetSlide = trackElem && trackElem.childNodes[targetSlideIndex];
		targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;
		if (centerMode === true) {
			targetSlideIndex = infinite ? slideIndex + getPreClones(spec) : slideIndex;
			targetSlide = trackElem && trackElem.children[targetSlideIndex];
			targetLeft = 0;
			for (let slide = 0; slide < targetSlideIndex; slide++) targetLeft -= trackElem && trackElem.children[slide] && trackElem.children[slide].offsetWidth;
			targetLeft -= parseInt(spec.centerPadding);
			targetLeft += targetSlide && (listWidth - targetSlide.offsetWidth) / 2;
		}
	}
	return targetLeft;
}
function getPreClones(spec) {
	if (spec.unslick || !spec.infinite) return 0;
	if (spec.variableWidth) return spec.slideCount;
	return spec.slidesToShow + (spec.centerMode ? 1 : 0);
}
function getPostClones(spec) {
	if (spec.unslick || !spec.infinite) return 0;
	if (spec.variableWidth) return spec.slideCount;
	return spec.slidesToShow + (spec.centerMode ? 1 : 0);
}
function getTotalSlides(spec) {
	return spec.slideCount === 1 ? 1 : getPreClones(spec) + spec.slideCount + getPostClones(spec);
}
function siblingDirection(spec) {
	if (spec.targetSlide > spec.currentSlide) {
		if (spec.targetSlide > spec.currentSlide + slidesOnRight(spec)) return "left";
		return "right";
	} else {
		if (spec.targetSlide < spec.currentSlide - slidesOnLeft(spec)) return "right";
		return "left";
	}
}
function slidesOnRight({ slidesToShow, centerMode, rtl, centerPadding }) {
	if (centerMode) {
		let right = (slidesToShow - 1) / 2 + 1;
		if (parseInt(centerPadding || "0") > 0) right += 1;
		if (rtl && slidesToShow % 2 === 0) right += 1;
		return right;
	}
	if (rtl) return 0;
	return slidesToShow - 1;
}
function slidesOnLeft({ slidesToShow, centerMode, rtl, centerPadding }) {
	if (centerMode) {
		let left = (slidesToShow - 1) / 2 + 1;
		if (parseInt(centerPadding || "0") > 0) left += 1;
		if (!rtl && slidesToShow % 2 === 0) left += 1;
		return left;
	}
	if (rtl) return slidesToShow - 1;
	return 0;
}
function canUseDOM() {
	return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
const validSettings = Object.keys(default_props_default);
function filterSettings(settings) {
	return validSettings.reduce((acc, settingName) => {
		if (settings.hasOwnProperty(settingName)) acc[settingName] = settings[settingName];
		return acc;
	}, {});
}
export { canGoNext, canUseDOM, changeSlide, checkNavigable, checkSpecKeys, clamp, extractObject, filterSettings, getHeight, getNavigableIndexes, getOnDemandLazySlides, getPostClones, getPreClones, getRequiredLazySlides, getSlideCount, getSwipeDirection, getTotalSlides, getTrackAnimateCSS, getTrackCSS, getTrackLeft, getWidth, initializedState, keyHandler, lazyEndIndex, lazySlidesOnLeft, lazySlidesOnRight, lazyStartIndex, safePreventDefault, siblingDirection, slideHandler, slidesOnLeft, slidesOnRight, swipeEnd, swipeMove, swipeStart, validSettings };
