Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
let vue = require("vue");
let _v_c_util = require("@v-c/util");
let _v_c_util_dist_KeyCode = require("@v-c/util/dist/KeyCode");
_v_c_util_dist_KeyCode = require_rolldown_runtime.__toESM(_v_c_util_dist_KeyCode);
let _v_c_util_dist_pickAttrs = require("@v-c/util/dist/pickAttrs");
_v_c_util_dist_pickAttrs = require_rolldown_runtime.__toESM(_v_c_util_dist_pickAttrs);
var defaults = {
	duration: 4.5,
	pauseOnHover: true,
	closeIcon: "x"
};
var Notify = /* @__PURE__ */ (0, vue.defineComponent)((props, { attrs }) => {
	const hovering = (0, vue.shallowRef)(false);
	const percent = (0, vue.shallowRef)(0);
	const spentTime = (0, vue.shallowRef)(0);
	const mergedHovering = (0, vue.computed)(() => props.hovering || hovering.value);
	const mergedDuration = (0, vue.computed)(() => {
		if (typeof props.duration === "number") return props.duration;
		if (props.duration === void 0) return defaults.duration;
		return 0;
	});
	const mergedPauseOnHover = (0, vue.computed)(() => props.pauseOnHover === void 0 ? defaults.pauseOnHover : props.pauseOnHover);
	const mergedShowProgress = (0, vue.computed)(() => mergedDuration.value > 0 && props.showProgress);
	const mergedCloseIcon = (0, vue.computed)(() => props.closeIcon ?? defaults.closeIcon);
	const onInternalClose = () => {
		props.onNoticeClose?.(props.eventKey);
	};
	const onCloseKeyDown = (e) => {
		if (e.key === "Enter" || e.code === "Enter" || e.keyCode === _v_c_util_dist_KeyCode.default.ENTER) onInternalClose();
	};
	(0, vue.watch)([
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
	(0, vue.watch)([
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
		const ariaProps = (0, _v_c_util_dist_pickAttrs.default)(closableConfig, true);
		const validPercent = 100 - (percent.value <= 0 ? 0 : percent.value > 100 ? 100 : percent.value);
		const noticePrefixCls = `${prefixCls}-notice`;
		const mergedStyle = {
			...typeof divProps?.style === "object" && divProps?.style ? divProps.style : {},
			...typeof attrs.style === "object" && attrs.style ? attrs.style : {},
			...typeof style === "object" && style ? style : {}
		};
		return (0, vue.createVNode)("div", (0, vue.mergeProps)(divProps, {
			"class": (0, _v_c_util.classNames)(noticePrefixCls, className, attrs.class, { [`${noticePrefixCls}-closable`]: !!closable }),
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
			(0, vue.createVNode)("div", { "class": `${noticePrefixCls}-content` }, [content]),
			closable && (0, vue.createVNode)("button", (0, vue.mergeProps)({
				"type": "button",
				"class": `${noticePrefixCls}-close`,
				"onKeydown": onCloseKeyDown,
				"aria-label": "Close"
			}, ariaProps, { "onClick": (e) => {
				e.preventDefault();
				e.stopPropagation();
				onInternalClose();
			} }), [closableConfig.closeIcon ?? mergedCloseIcon.value]),
			mergedShowProgress.value && (0, vue.createVNode)("progress", {
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
var Notice_default = Notify;
exports.default = Notice_default;
