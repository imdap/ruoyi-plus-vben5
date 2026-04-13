import { useInjectTableContext } from "./context/TableContext.js";
import { useLayoutState } from "./hooks/useFrame.js";
import { getOffset } from "./utils/offsetUtil.js";
import { computed, createVNode, defineComponent, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { clsx } from "@v-c/util";
import { getDOM } from "@v-c/util/dist/Dom/findDOMNode";
import getScrollBarSize from "@v-c/util/dist/getScrollBarSize";
import raf from "@v-c/util/dist/raf";
//#region src/stickyScrollBar.tsx
var MOUSEUP_EVENT = "mouseup";
var MOUSEMOVE_EVENT = "mousemove";
var SCROLL_EVENT = "scroll";
var RESIZE_EVENT = "resize";
var StickyScrollBar = /* @__PURE__ */ defineComponent({
	name: "TableStickyScrollBar",
	props: [
		"scrollBodyRef",
		"onScroll",
		"offsetScroll",
		"container",
		"direction"
	],
	setup(props, { expose }) {
		const { prefixCls } = useInjectTableContext();
		const scrollBarRef = ref(null);
		const [scrollState, setScrollState] = useLayoutState({
			scrollLeft: 0,
			isHiddenScrollBar: true
		});
		const refState = ref({
			delta: 0,
			x: 0
		});
		const isActive = ref(false);
		const rafRef = ref(null);
		const bodyScrollWidth = computed(() => props.scrollBodyRef.value?.scrollWidth || 0);
		const bodyWidth = computed(() => props.scrollBodyRef.value?.clientWidth || 0);
		const scrollBarWidth = computed(() => {
			const totalWidth = bodyScrollWidth.value;
			const clientWidth = bodyWidth.value;
			return totalWidth ? clientWidth * (clientWidth / totalWidth) : 0;
		});
		const onMouseUp = () => {
			isActive.value = false;
		};
		const onMouseDown = (event) => {
			refState.value.delta = event.pageX - scrollState.value.scrollLeft;
			refState.value.x = 0;
			isActive.value = true;
			event.preventDefault();
		};
		const onMouseMove = (event) => {
			const buttons = event?.buttons ?? window?.event?.buttons;
			if (!isActive.value || buttons === 0) {
				if (isActive.value) isActive.value = false;
				return;
			}
			let left = refState.value.x + event.pageX - refState.value.x - refState.value.delta;
			const isRTL = props.direction === "rtl";
			left = Math.max(isRTL ? scrollBarWidth.value - bodyWidth.value : 0, Math.min(isRTL ? 0 : bodyWidth.value - scrollBarWidth.value, left));
			if (!isRTL || Math.abs(left) + Math.abs(scrollBarWidth.value) < bodyWidth.value) {
				props.onScroll({ scrollLeft: left / bodyWidth.value * (bodyScrollWidth.value + 2) });
				refState.value.x = event.pageX;
			}
		};
		const checkScrollBarVisible = () => {
			raf.cancel(rafRef.value);
			rafRef.value = raf(() => {
				if (!props.scrollBodyRef.value || !props.container) return;
				const container = props.container;
				const tableOffsetTop = getOffset(props.scrollBodyRef.value).top;
				const tableBottomOffset = tableOffsetTop + props.scrollBodyRef.value.offsetHeight;
				const currentClientOffset = container === window ? document.documentElement.scrollTop + window.innerHeight : getOffset(container).top + container.clientHeight;
				if (tableBottomOffset - getScrollBarSize() <= currentClientOffset || tableOffsetTop >= currentClientOffset - props.offsetScroll) setScrollState((state) => ({
					...state,
					isHiddenScrollBar: true
				}));
				else setScrollState((state) => ({
					...state,
					isHiddenScrollBar: false
				}));
			});
		};
		const setScrollLeft = (left) => {
			setScrollState((state) => ({
				...state,
				scrollLeft: left / bodyScrollWidth.value * bodyWidth.value || 0
			}));
		};
		expose({
			setScrollLeft,
			checkScrollBarVisible
		});
		onMounted(() => {
			document.body.addEventListener(MOUSEUP_EVENT, onMouseUp, false);
			document.body.addEventListener(MOUSEMOVE_EVENT, onMouseMove, false);
			checkScrollBarVisible();
		});
		const removeScrollListeners = ref(null);
		onBeforeUnmount(() => {
			document.body.removeEventListener(MOUSEUP_EVENT, onMouseUp);
			document.body.removeEventListener(MOUSEMOVE_EVENT, onMouseMove);
			raf.cancel(rafRef.value);
			removeScrollListeners.value?.();
		});
		watch(() => [scrollBarWidth.value, isActive.value], () => {
			checkScrollBarVisible();
		});
		watch(() => props.container, () => {
			removeScrollListeners.value?.();
			removeScrollListeners.value = null;
			if (!props.scrollBodyRef.value || !props.container) return;
			const container = props.container;
			const scrollParents = [];
			let parent = getDOM(props.scrollBodyRef.value);
			while (parent) {
				scrollParents.push(parent);
				parent = parent.parentElement;
			}
			scrollParents.forEach((p) => {
				p.addEventListener(SCROLL_EVENT, checkScrollBarVisible, false);
			});
			window.addEventListener(RESIZE_EVENT, checkScrollBarVisible, false);
			window.addEventListener(SCROLL_EVENT, checkScrollBarVisible, false);
			container.addEventListener(SCROLL_EVENT, checkScrollBarVisible, false);
			removeScrollListeners.value = () => {
				scrollParents.forEach((p) => {
					p.removeEventListener(SCROLL_EVENT, checkScrollBarVisible);
				});
				window.removeEventListener(RESIZE_EVENT, checkScrollBarVisible);
				window.removeEventListener(SCROLL_EVENT, checkScrollBarVisible);
				container.removeEventListener(SCROLL_EVENT, checkScrollBarVisible);
			};
		}, { immediate: true });
		watch(() => scrollState.value.isHiddenScrollBar, (hidden) => {
			if (!hidden) setScrollState((state) => {
				const bodyNode = props.scrollBodyRef.value;
				if (!bodyNode) return state;
				return {
					...state,
					scrollLeft: bodyNode.scrollLeft / bodyNode.scrollWidth * bodyNode.clientWidth
				};
			});
		});
		return () => {
			if (bodyScrollWidth.value <= bodyWidth.value || !scrollBarWidth.value || scrollState.value.isHiddenScrollBar) return null;
			return createVNode("div", {
				"style": {
					height: `${getScrollBarSize()}px`,
					width: `${bodyWidth.value}px`,
					bottom: `${props.offsetScroll}px`
				},
				"class": `${prefixCls}-sticky-scroll`
			}, [createVNode("div", {
				"onMousedown": onMouseDown,
				"ref": scrollBarRef,
				"class": clsx(`${prefixCls}-sticky-scroll-bar`, { [`${prefixCls}-sticky-scroll-bar-active`]: isActive.value }),
				"style": {
					width: `${scrollBarWidth.value}px`,
					transform: `translate3d(${scrollState.value.scrollLeft}px, 0, 0)`
				}
			}, null)]);
		};
	}
});
//#endregion
export { StickyScrollBar as default };
