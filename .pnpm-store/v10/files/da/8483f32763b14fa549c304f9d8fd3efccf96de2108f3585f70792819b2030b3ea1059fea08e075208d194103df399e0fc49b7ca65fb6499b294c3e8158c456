Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
const require_Notice = require("./Notice.cjs");
const require_useStack = require("./hooks/useStack.cjs");
const require_NotificationProvider = require("./NotificationProvider.cjs");
let vue = require("vue");
let _v_c_util = require("@v-c/util");
let _v_c_util_dist_utils_transition = require("@v-c/util/dist/utils/transition");
let _v_c_util_dist_vueuse_unref_element = require("@v-c/util/dist/vueuse/unref-element");
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !(0, vue.isVNode)(s);
}
var NoticeList = /* @__PURE__ */ (0, vue.defineComponent)((props, { attrs }) => {
	const ctx = require_NotificationProvider.useNotificationContext();
	const dictRef = (0, vue.reactive)({});
	const keys = (0, vue.computed)(() => (props.configList ?? []).map((config) => ({
		config,
		key: String(config.key)
	})));
	const latestNotice = (0, vue.shallowRef)(null);
	const hoverKeys = (0, vue.ref)([]);
	const stackConfig = (0, vue.toRef)(props, "stack");
	const [stackEnabled, stackOptions] = require_useStack.default(stackConfig);
	const stackActive = (0, vue.computed)(() => stackEnabled.value || stackConfig.value === false);
	const expanded = (0, vue.computed)(() => {
		if (!stackActive.value) return false;
		if (!stackEnabled.value) return true;
		return hoverKeys.value.length > 0 || keys.value.length <= stackOptions.threshold.value;
	});
	const placementMotion = (0, vue.computed)(() => {
		if (typeof props.motion === "function") return props.placement ? props.motion(props.placement) : void 0;
		return props.motion;
	});
	(0, vue.watch)([
		hoverKeys,
		keys,
		stackEnabled
	], () => {
		if (stackEnabled.value && hoverKeys.value.length > 1) hoverKeys.value = hoverKeys.value.filter((key) => keys.value.some(({ key: dataKey }) => key === dataKey));
	});
	(0, vue.watch)(stackEnabled, (enabled) => {
		if (!enabled && hoverKeys.value.length) hoverKeys.value = [];
	});
	(0, vue.watchEffect)(() => {
		if (!stackActive.value) {
			latestNotice.value = null;
			return;
		}
		const lastKey = keys.value[keys.value.length - 1]?.key;
		latestNotice.value = lastKey ? dictRef[lastKey] ?? null : null;
	}, { flush: "post" });
	const checkAllClosed = () => {
		if (!props.placement) return;
		if (keys.value.length === 0) props.onAllNoticeRemoved?.(props.placement);
	};
	return () => {
		let _slot;
		const { prefixCls = "", placement = "topRight", onNoticeClose } = props;
		const renderNotify = () => keys.value.map(({ config }, motionIndex) => {
			const { key, times } = config;
			const strKey = String(key);
			const { className: configClassName, style: configStyle, classNames: configClassNames, styles: configStyles, ...restConfig } = config;
			const dataIndex = keys.value.findIndex((item) => item.key === strKey);
			const stackStyle = {};
			if (stackActive.value) {
				const index = keys.value.length - 1 - (dataIndex > -1 ? dataIndex : motionIndex - 1);
				const transformX = placement === "top" || placement === "bottom" ? "-50%" : "0";
				if (index > 0) {
					stackStyle.height = expanded.value ? dictRef[strKey]?.offsetHeight : latestNotice.value?.offsetHeight;
					if (stackStyle.height && typeof stackStyle.height === "number") stackStyle.height = `${stackStyle.height}px`;
					let verticalOffset = 0;
					for (let i = 0; i < index; i += 1) {
						const targetKey = keys.value[keys.value.length - 1 - i]?.key;
						const node = targetKey ? dictRef[targetKey] : null;
						verticalOffset += (node?.offsetHeight ?? 0) + stackOptions.gap.value;
					}
					const transformY = (expanded.value ? verticalOffset : index * stackOptions.offset.value) * (placement.startsWith("top") ? 1 : -1);
					const currentWidth = dictRef[strKey]?.offsetWidth;
					const latestWidth = latestNotice.value?.offsetWidth;
					stackStyle.transform = `translate3d(${transformX}, ${transformY}px, 0) scaleX(${!expanded.value && latestWidth && currentWidth ? (latestWidth - stackOptions.offset.value * 2 * (index < 3 ? index : 3)) / currentWidth : 1})`;
				} else stackStyle.transform = `translate3d(${transformX}, 0, 0)`;
			}
			return (0, vue.createVNode)("div", {
				"key": strKey,
				"class": (0, _v_c_util.classNames)(`${prefixCls}-notice-wrapper`, configClassNames?.wrapper),
				"style": {
					...stackStyle,
					...configStyles?.wrapper
				},
				"onMouseenter": () => {
					if (!stackEnabled.value) return;
					hoverKeys.value = hoverKeys.value.includes(strKey) ? hoverKeys.value : [...hoverKeys.value, strKey];
				},
				"onMouseleave": () => {
					if (!stackEnabled.value) return;
					hoverKeys.value = hoverKeys.value.filter((k) => k !== strKey);
				}
			}, [(0, vue.createVNode)(require_Notice.default, (0, vue.mergeProps)(restConfig, {
				"ref": (el) => {
					const element = (0, _v_c_util_dist_vueuse_unref_element.unrefElement)(el) ?? void 0;
					if (dataIndex > -1) dictRef[strKey] = element;
					else delete dictRef[strKey];
				},
				"prefixCls": prefixCls,
				"classNames": configClassNames,
				"styles": configStyles,
				"class": (0, _v_c_util.classNames)(configClassName, ctx.value?.classNames?.notice),
				"style": configStyle,
				"times": times,
				"eventKey": key,
				"onNoticeClose": onNoticeClose,
				"hovering": stackEnabled.value && hoverKeys.value.length > 0
			}), null)]);
		});
		let motionGroupProps = {};
		if (placementMotion.value) motionGroupProps = (0, _v_c_util_dist_utils_transition.getTransitionGroupProps)(placementMotion.value.name, placementMotion.value);
		return (0, vue.createVNode)(vue.TransitionGroup, (0, vue.mergeProps)({
			"key": placement,
			"tag": "div",
			"appear": true
		}, {
			class: (0, _v_c_util.classNames)(prefixCls, `${prefixCls}-${placement}`, ctx.value?.classNames?.list, attrs.class, {
				[`${prefixCls}-stack-expanded`]: expanded.value,
				[`${prefixCls}-stack`]: stackActive.value
			}),
			style: attrs.style
		}, motionGroupProps, { "onAfterLeave": checkAllClosed }), _isSlot(_slot = renderNotify()) ? _slot : { default: () => [_slot] });
	};
}, { props: {
	configList: {
		type: Array,
		required: false,
		default: void 0
	},
	placement: {
		type: String,
		required: false,
		default: void 0
	},
	prefixCls: {
		type: String,
		required: false,
		default: void 0
	},
	motion: {
		type: [Object, Function],
		required: false,
		default: void 0
	},
	stack: {
		type: [Boolean, Object],
		required: false,
		default: void 0
	},
	onAllNoticeRemoved: {
		type: Function,
		required: false,
		default: void 0
	},
	onNoticeClose: {
		type: Function,
		required: false,
		default: void 0
	}
} });
var NoticeList_default = NoticeList;
exports.default = NoticeList_default;
