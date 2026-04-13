import { Transition, computed, createVNode, defineComponent, mergeDefaults, onBeforeUnmount, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { getTransitionProps } from "@v-c/util/dist/utils/transition";
//#region src/MotionThumb.tsx
function calcThumbStyle(targetElement, vertical) {
	if (!targetElement) return null;
	const style = {
		left: targetElement.offsetLeft,
		right: targetElement.parentElement.clientWidth - targetElement.clientWidth - targetElement.offsetLeft,
		width: targetElement.clientWidth,
		top: targetElement.offsetTop,
		bottom: targetElement.parentElement.clientHeight - targetElement.clientHeight - targetElement.offsetTop,
		height: targetElement.clientHeight
	};
	if (vertical) return {
		left: 0,
		right: 0,
		width: 0,
		top: style.top,
		bottom: style.bottom,
		height: style.height
	};
	return {
		left: style.left,
		right: style.right,
		width: style.width,
		top: 0,
		bottom: 0,
		height: 0
	};
}
function toPX(value) {
	return value !== void 0 ? `${value}px` : void 0;
}
var MotionThumb = /* @__PURE__ */ defineComponent((props) => {
	const preValue = shallowRef(props.value);
	const prevStyle = shallowRef(null);
	const nextStyle = shallowRef(null);
	const motionKey = shallowRef(0);
	let asyncId = null;
	const clearAsync = () => {
		if (asyncId) {
			clearTimeout(asyncId);
			asyncId = null;
		}
	};
	const findValueElement = (val) => {
		const getValueIndex = props.getValueIndex;
		const containerRef = props.containerRef;
		const prefixCls = props.prefixCls;
		const index = getValueIndex(val);
		const ele = containerRef?.querySelectorAll(`.${prefixCls}-item`)[index];
		return ele?.offsetParent && ele;
	};
	watch(() => props.value, () => {
		if (preValue.value !== props.value) {
			clearAsync();
			const prev = findValueElement(preValue.value);
			const next = findValueElement(props.value);
			const calcPrevStyle = calcThumbStyle(prev, props.vertical);
			const calcNextStyle = calcThumbStyle(next, props.vertical);
			preValue.value = props.value;
			prevStyle.value = calcPrevStyle;
			nextStyle.value = calcNextStyle;
			motionKey.value += 1;
			if (prev && next) props.onMotionStart?.();
			else props?.onMotionEnd?.();
		}
	}, {
		immediate: true,
		flush: "post"
	});
	const thumbStart = computed(() => {
		if (props.vertical) return toPX(prevStyle.value?.top ?? 0);
		if (props.direction === "rtl") return toPX(-prevStyle.value?.right);
		return toPX(prevStyle.value?.left);
	});
	const thumbActive = computed(() => {
		if (props.vertical) return toPX(nextStyle.value?.top ?? 0);
		if (props.direction === "rtl") return toPX(-nextStyle.value?.right);
		return toPX(nextStyle.value?.left);
	});
	const isLatestMotion = (el) => {
		return Number(el.dataset.motionKey ?? -1) === motionKey.value;
	};
	const onAppearStart = (_el) => {
		clearAsync();
		const el = _el;
		if (!isLatestMotion(el)) return;
		if (props.vertical) {
			el.style.transform = "translateY(var(--thumb-start-top))";
			el.style.height = "var(--thumb-start-height)";
			return;
		}
		el.style.transform = "translateX(var(--thumb-start-left))";
		el.style.width = "var(--thumb-start-width)";
	};
	const onAppearActive = (_el) => {
		const el = _el;
		if (!isLatestMotion(el)) return;
		clearAsync();
		asyncId = setTimeout(() => {
			if (!isLatestMotion(el)) return;
			if (props.vertical) {
				el.style.transform = "translateY(var(--thumb-active-top))";
				el.style.height = "var(--thumb-active-height)";
				return;
			}
			el.style.transform = "translateX(var(--thumb-active-left))";
			el.style.width = "var(--thumb-active-width)";
		});
	};
	const onVisibleChanged = (_el) => {
		if (_el && !isLatestMotion(_el)) return;
		clearAsync();
		prevStyle.value = null;
		nextStyle.value = null;
		props?.onMotionEnd?.();
	};
	onBeforeUnmount(() => {
		clearAsync();
	});
	return () => {
		const { prefixCls } = props;
		if (!prevStyle.value || !nextStyle.value) return null;
		const transitionProps = getTransitionProps(props?.motionName, {
			onBeforeEnter: onAppearStart,
			onEnter: onAppearActive,
			onAfterEnter: onVisibleChanged,
			onBeforeLeave: (el) => {
				el.style.display = "none";
			},
			onLeave: (_el, done) => {
				done();
			}
		});
		const mergedStyle = {
			"--thumb-start-left": thumbStart.value,
			"--thumb-start-width": toPX(prevStyle.value?.width),
			"--thumb-active-left": thumbActive.value,
			"--thumb-active-width": toPX(nextStyle.value?.width),
			"--thumb-start-top": thumbStart.value,
			"--thumb-start-height": toPX(prevStyle.value?.height),
			"--thumb-active-top": thumbActive.value,
			"--thumb-active-height": toPX(nextStyle.value?.height)
		};
		return createVNode(Transition, transitionProps, { default: () => [createVNode("div", {
			"key": motionKey.value,
			"data-motion-key": motionKey.value,
			"style": mergedStyle,
			"class": clsx(`${prefixCls}-thumb`)
		}, null)] });
	};
}, { props: /* @__PURE__ */ mergeDefaults({
	containerRef: { required: true },
	value: {
		type: [String, Number],
		required: true
	},
	getValueIndex: {
		type: Function,
		required: true
	},
	prefixCls: {
		type: String,
		required: true
	},
	motionName: {
		type: String,
		required: true
	},
	onMotionStart: { required: true },
	onMotionEnd: { required: true },
	direction: {
		type: String,
		required: false,
		default: void 0
	},
	vertical: {
		type: Boolean,
		required: false,
		default: void 0
	}
}, { vertical: false }) });
//#endregion
export { MotionThumb as default };
