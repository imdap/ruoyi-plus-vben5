import { computed, createVNode, defineComponent, mergeProps, shallowRef, watch } from "vue";
import { classNames } from "@v-c/util";
import KeyCode from "@v-c/util/dist/KeyCode";
import pickAttrs from "@v-c/util/dist/pickAttrs";
var defaults = {
	duration: 4.5,
	pauseOnHover: true,
	closeIcon: "x"
};
var Notice_default = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const hovering = shallowRef(false);
	const percent = shallowRef(0);
	const spentTime = shallowRef(0);
	const mergedHovering = computed(() => props.hovering || hovering.value);
	const mergedDuration = computed(() => {
		if (typeof props.duration === "number") return props.duration;
		if (props.duration === void 0) return defaults.duration;
		return 0;
	});
	const mergedPauseOnHover = computed(() => props.pauseOnHover === void 0 ? defaults.pauseOnHover : props.pauseOnHover);
	const mergedShowProgress = computed(() => mergedDuration.value > 0 && props.showProgress);
	const mergedCloseIcon = computed(() => props.closeIcon ?? defaults.closeIcon);
	const onInternalClose = () => {
		props.onNoticeClose?.(props.eventKey);
	};
	const onCloseKeyDown = (e) => {
		if (e.key === "Enter" || e.code === "Enter" || e.keyCode === KeyCode.ENTER) onInternalClose();
	};
	watch([
		() => props.times,
		mergedDuration,
		mergedHovering
	], (_n, _, onCleanup) => {
		const duration = mergedDuration.value;
		const hoveringValue = mergedHovering.value;
		const pauseOnHover = mergedPauseOnHover.value;
		if (!hoveringValue && duration > 0) {
			const start = Date.now() - spentTime.value;
			const timeoutId = window.setTimeout(() => {
				onInternalClose();
			}, duration * 1e3 - spentTime.value);
			onCleanup(() => {
				if (pauseOnHover) clearTimeout(timeoutId);
				spentTime.value = Date.now() - start;
			});
		}
	}, { immediate: true });
	watch([
		() => props.times,
		mergedDuration,
		spentTime,
		mergedHovering,
		mergedShowProgress
	], (_n, _, onCleanup) => {
		const hoveringValue = mergedHovering.value;
		const showProgress = mergedShowProgress.value;
		const pauseOnHover = mergedPauseOnHover.value;
		const duration = mergedDuration.value;
		const baseSpentTime = spentTime.value;
		if (!hoveringValue && showProgress && (pauseOnHover || baseSpentTime === 0)) {
			const start = performance.now();
			let animationFrame = 0;
			const calculate = () => {
				cancelAnimationFrame(animationFrame);
				animationFrame = requestAnimationFrame((timestamp) => {
					const runtime = timestamp + baseSpentTime - start;
					const progress = Math.min(runtime / (duration * 1e3), 1);
					percent.value = progress * 100;
					if (progress < 1) calculate();
				});
			};
			calculate();
			onCleanup(() => {
				if (pauseOnHover) cancelAnimationFrame(animationFrame);
			});
		}
	}, { immediate: true });
	return () => {
		const { closable, prefixCls, props: divProps, onClick, content, className, style } = props;
		const closableConfig = typeof closable === "object" && closable !== null ? closable : closable ? { closeIcon: mergedCloseIcon.value } : {};
		const ariaProps = pickAttrs(closableConfig, true);
		const validPercent = 100 - (percent.value <= 0 ? 0 : percent.value > 100 ? 100 : percent.value);
		const noticePrefixCls = `${prefixCls}-notice`;
		const mergedStyle = {
			...typeof divProps?.style === "object" && divProps?.style ? divProps.style : {},
			...typeof attrs.style === "object" && attrs.style ? attrs.style : {},
			...typeof style === "object" && style ? style : {}
		};
		return createVNode("div", mergeProps(divProps, {
			"class": classNames(noticePrefixCls, className, attrs.class, { [`${noticePrefixCls}-closable`]: !!closable }),
			"style": mergedStyle,
			"onMouseenter": (e) => {
				hovering.value = true;
				divProps?.onMouseEnter?.(e);
			},
			"onMouseleave": (e) => {
				hovering.value = false;
				divProps?.onMouseLeave?.(e);
			},
			"onClick": onClick
		}), [
			createVNode("div", { "class": `${noticePrefixCls}-content` }, [content]),
			closable && createVNode("button", mergeProps({
				"type": "button",
				"class": `${noticePrefixCls}-close`,
				"onKeydown": onCloseKeyDown,
				"aria-label": "Close"
			}, ariaProps, { "onClick": (e) => {
				e.preventDefault();
				e.stopPropagation();
				onInternalClose();
			} }), [closableConfig.closeIcon ?? mergedCloseIcon.value]),
			mergedShowProgress.value && createVNode("progress", {
				"class": `${noticePrefixCls}-progress`,
				"max": "100",
				"value": validPercent
			}, [`${validPercent}%`])
		]);
	};
}, { props: {
	prefixCls: {
		type: String,
		required: true,
		default: void 0
	},
	eventKey: {
		type: [String, Number],
		required: true,
		default: void 0
	},
	onClick: {
		type: Function,
		required: false,
		default: void 0
	},
	onNoticeClose: {
		type: Function,
		required: false,
		default: void 0
	},
	hovering: {
		type: Boolean,
		required: false,
		default: void 0
	},
	props: {
		type: Object,
		required: false,
		default: void 0
	},
	content: {
		type: [
			Object,
			Function,
			String,
			Number,
			null,
			Boolean,
			Array
		],
		required: false,
		default: void 0
	},
	duration: {
		type: [
			Number,
			Boolean,
			null
		],
		required: false,
		default: void 0
	},
	showProgress: {
		type: Boolean,
		required: false,
		default: void 0
	},
	pauseOnHover: {
		type: Boolean,
		required: false,
		default: void 0
	},
	closeIcon: {
		type: [
			Object,
			Function,
			String,
			Number,
			null,
			Boolean,
			Array
		],
		required: false,
		default: void 0
	},
	closable: {
		type: [Boolean, Object],
		required: false,
		default: void 0
	},
	className: {
		type: String,
		required: false,
		default: void 0
	},
	style: {
		type: Object,
		required: false,
		default: void 0
	},
	classNames: {
		type: Object,
		required: false,
		default: void 0
	},
	styles: {
		type: Object,
		required: false,
		default: void 0
	},
	times: {
		type: Number,
		required: false,
		default: void 0
	}
} });
export { Notice_default as default };
