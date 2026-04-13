import { computed, createVNode, defineComponent, onMounted, onUnmounted, ref, shallowRef, watch } from "vue";
import raf from "@v-c/util/dist/raf";
function getPageXY(e, horizontal) {
	return ("touches" in e ? e.touches[0] : e)[horizontal ? "pageX" : "pageY"] - window[horizontal ? "scrollX" : "scrollY"];
}
var ScrollBar_default = /* @__PURE__ */ defineComponent({
	props: {
		prefixCls: {
			type: String,
			required: true,
			default: void 0
		},
		scrollOffset: {
			type: Number,
			required: true,
			default: void 0
		},
		scrollRange: {
			type: Number,
			required: true,
			default: void 0
		},
		rtl: {
			type: Boolean,
			required: true,
			default: void 0
		},
		onScroll: {
			type: Function,
			required: true,
			default: void 0
		},
		onStartMove: {
			type: Function,
			required: true,
			default: void 0
		},
		onStopMove: {
			type: Function,
			required: true,
			default: void 0
		},
		horizontal: {
			type: Boolean,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false,
			default: void 0
		},
		thumbStyle: {
			type: Object,
			required: false,
			default: void 0
		},
		spinSize: {
			type: Number,
			required: true,
			default: void 0
		},
		containerSize: {
			type: Number,
			required: true,
			default: void 0
		},
		showScrollBar: {
			type: [Boolean, String],
			required: false,
			default: void 0
		}
	},
	name: "ScrollBar",
	setup(props, { expose }) {
		const dragging = ref(false);
		const pageXY = ref(null);
		const startTop = ref(null);
		const isLTR = computed(() => !props.rtl);
		const scrollbarRef = shallowRef();
		const thumbRef = shallowRef();
		const visible = ref(props.showScrollBar === "optional" ? true : props.showScrollBar);
		let visibleTimeout = null;
		const delayHidden = () => {
			if (props.showScrollBar === true || props.showScrollBar === false) return;
			if (visibleTimeout) clearTimeout(visibleTimeout);
			visible.value = true;
			visibleTimeout = setTimeout(() => {
				visible.value = false;
			}, 3e3);
		};
		const enableScrollRange = computed(() => props.scrollRange - props.containerSize || 0);
		const enableOffsetRange = computed(() => props.containerSize - props.spinSize || 0);
		const top = computed(() => {
			if (props.scrollOffset === 0 || enableScrollRange.value === 0) return 0;
			return props.scrollOffset / enableScrollRange.value * enableOffsetRange.value;
		});
		const stateRef = shallowRef({
			top: top.value,
			dragging: dragging.value,
			pageY: pageXY.value,
			startTop: startTop.value
		});
		watch([
			top,
			dragging,
			pageXY,
			startTop
		], () => {
			stateRef.value = {
				top: top.value,
				dragging: dragging.value,
				pageY: pageXY.value,
				startTop: startTop.value
			};
		});
		const onContainerMouseDown = (e) => {
			e.stopPropagation();
			e.preventDefault();
		};
		const onThumbMouseDown = (e) => {
			dragging.value = true;
			pageXY.value = getPageXY(e, props.horizontal || false);
			startTop.value = stateRef.value.top;
			props?.onStartMove?.();
			e.stopPropagation();
			e.preventDefault();
		};
		onMounted(() => {
			const onScrollbarTouchStart = (e) => {
				e.preventDefault();
			};
			const scrollbarEle = scrollbarRef.value;
			const thumbEle = thumbRef.value;
			if (scrollbarEle && thumbEle) {
				scrollbarEle.addEventListener("touchstart", onScrollbarTouchStart, { passive: false });
				thumbEle.addEventListener("touchstart", onThumbMouseDown, { passive: false });
				onUnmounted(() => {
					scrollbarEle.removeEventListener("touchstart", onScrollbarTouchStart);
					thumbEle.removeEventListener("touchstart", onThumbMouseDown);
				});
			}
		});
		watch(dragging, (isDragging, _O, onCleanup) => {
			if (isDragging) {
				let moveRafId = null;
				const onMouseMove = (e) => {
					const { dragging: stateDragging, pageY: statePageY, startTop: stateStartTop } = stateRef.value;
					raf.cancel(moveRafId);
					const rect = scrollbarRef.value.getBoundingClientRect();
					const scale = props.containerSize / (props.horizontal ? rect.width : rect.height);
					if (stateDragging) {
						const offset = (getPageXY(e, props.horizontal || false) - (statePageY || 0)) * scale;
						let newTop = stateStartTop || 0;
						if (!isLTR.value && props.horizontal) newTop -= offset;
						else newTop += offset;
						const tmpEnableScrollRange = enableScrollRange.value;
						const tmpEnableOffsetRange = enableOffsetRange.value;
						const ptg = tmpEnableOffsetRange ? newTop / tmpEnableOffsetRange : 0;
						let newScrollTop = Math.ceil(ptg * tmpEnableScrollRange);
						newScrollTop = Math.max(newScrollTop, 0);
						newScrollTop = Math.min(newScrollTop, tmpEnableScrollRange);
						moveRafId = raf(() => {
							props?.onScroll?.(newScrollTop, props.horizontal);
						});
					}
				};
				const onMouseUp = () => {
					dragging.value = false;
					props.onStopMove();
				};
				window.addEventListener("mousemove", onMouseMove, { passive: true });
				window.addEventListener("touchmove", onMouseMove, { passive: true });
				window.addEventListener("mouseup", onMouseUp, { passive: true });
				window.addEventListener("touchend", onMouseUp, { passive: true });
				onCleanup(() => {
					window.removeEventListener("mousemove", onMouseMove);
					window.removeEventListener("touchmove", onMouseMove);
					window.removeEventListener("mouseup", onMouseUp);
					window.removeEventListener("touchend", onMouseUp);
					raf.cancel(moveRafId);
				});
			}
		});
		watch(() => props.scrollOffset, (_n, _o, onCleanup) => {
			delayHidden();
			onCleanup(() => {
				if (visibleTimeout) clearTimeout(visibleTimeout);
			});
		});
		expose({ delayHidden });
		return () => {
			const { prefixCls, horizontal } = props;
			const scrollbarPrefixCls = `${prefixCls}-scrollbar`;
			const containerStyle = {
				position: "absolute",
				visibility: visible.value ? void 0 : "hidden"
			};
			const thumbStyle = {
				position: "absolute",
				borderRadius: "99px",
				background: "var(--vc-virtual-list-scrollbar-bg, rgba(0, 0, 0, 0.5))",
				cursor: "pointer",
				userSelect: "none"
			};
			if (props.horizontal) {
				Object.assign(containerStyle, {
					height: "8px",
					left: 0,
					right: 0,
					bottom: 0
				});
				Object.assign(thumbStyle, {
					height: "100%",
					width: `${props.spinSize}px`,
					[isLTR.value ? "left" : "right"]: `${top.value}px`
				});
			} else {
				Object.assign(containerStyle, {
					width: "8px",
					top: 0,
					bottom: 0,
					[isLTR.value ? "right" : "left"]: 0
				});
				Object.assign(thumbStyle, {
					width: "100%",
					height: `${props.spinSize}px`,
					top: `${top.value}px`
				});
			}
			return createVNode("div", {
				"ref": scrollbarRef,
				"class": [scrollbarPrefixCls, {
					[`${scrollbarPrefixCls}-horizontal`]: horizontal,
					[`${scrollbarPrefixCls}-vertical`]: !horizontal,
					[`${scrollbarPrefixCls}-visible`]: visible.value
				}],
				"style": {
					...containerStyle,
					...props.style
				},
				"onMousedown": onContainerMouseDown,
				"onMousemove": delayHidden
			}, [createVNode("div", {
				"ref": thumbRef,
				"class": [`${scrollbarPrefixCls}-thumb`, { [`${scrollbarPrefixCls}-thumb-moving`]: dragging.value }],
				"style": {
					...thumbStyle,
					...props.thumbStyle
				},
				"onMousedown": onThumbMouseDown
			}, null)]);
		};
	}
});
export { ScrollBar_default as default };
