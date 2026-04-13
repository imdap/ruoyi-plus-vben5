Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
const require_NoticeList = require("./NoticeList.cjs");
let vue = require("vue");
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !(0, vue.isVNode)(s);
}
var defaults = { prefixCls: "vc-notification" };
var Notifications = /* @__PURE__ */ (0, vue.defineComponent)((props, { expose }) => {
	const configList = (0, vue.shallowRef)([]);
	const onNoticeClose = (key) => {
		const config = configList.value.find((item) => item.key === key);
		const closable = config?.closable;
		(closable && typeof closable === "object" ? closable : {}).onClose?.();
		config?.onClose?.();
		configList.value = configList.value.filter((item) => item.key !== key);
	};
	expose({
		open: (config) => {
			const list = configList.value;
			let clone = [...configList.value];
			const index = clone.findIndex((item) => item.key === config.key);
			const innerConfig = { ...config };
			if (index >= 0) {
				innerConfig.times = (list[index]?.times || 0) + 1;
				clone[index] = innerConfig;
			} else {
				innerConfig.times = 0;
				clone.push(innerConfig);
			}
			const maxCount = props.maxCount ?? 0;
			if (maxCount > 0 && clone.length > maxCount) clone = clone.slice(-maxCount);
			configList.value = clone;
		},
		close: onNoticeClose,
		destroy: () => {
			configList.value = [];
		}
	});
	const placements = (0, vue.shallowRef)({});
	(0, vue.watch)(configList, () => {
		const nextPlacements = {};
		configList.value.forEach((config) => {
			const { placement = "topRight" } = config;
			if (placement) {
				nextPlacements[placement] = nextPlacements[placement] || [];
				nextPlacements[placement].push(config);
			}
		});
		Object.keys(placements.value).forEach((_placement) => {
			const placement = _placement;
			nextPlacements[placement] = nextPlacements[placement] || [];
		});
		placements.value = nextPlacements;
	});
	const onAllNoticeRemoved = (placement) => {
		const clone = { ...placements.value };
		if (!(clone[placement] || []).length) delete clone[placement];
		placements.value = clone;
	};
	const emptyRef = (0, vue.shallowRef)(false);
	(0, vue.watch)(placements, () => {
		if (Object.keys(placements.value).length > 0) emptyRef.value = true;
		else if (emptyRef.value) {
			props?.onAllRemoved?.();
			emptyRef.value = false;
		}
	});
	return () => {
		let _slot;
		const { container } = props;
		const prefixCls = props.prefixCls ?? defaults.prefixCls ?? "";
		if (!container) return null;
		return (0, vue.createVNode)(vue.Teleport, { "to": container }, _isSlot(_slot = Object.keys(placements.value).map((placement) => {
			const placementConfigList = placements.value[placement];
			const list = (0, vue.createVNode)(require_NoticeList.default, {
				"key": placement,
				"configList": placementConfigList,
				"placement": placement,
				"prefixCls": prefixCls,
				"class": props.className?.(placement),
				"style": props.style?.(placement),
				"motion": props.motion,
				"stack": props.stack,
				"onAllNoticeRemoved": () => onAllNoticeRemoved(placement),
				"onNoticeClose": onNoticeClose
			}, null);
			return props.renderNotifications ? props.renderNotifications(list, {
				prefixCls,
				key: placement
			}) : list;
		})) ? _slot : { default: () => [_slot] });
	};
}, {
	props: /* @__PURE__ */ (0, vue.mergeDefaults)({
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
		container: {
			required: false,
			default: void 0
		},
		maxCount: {
			type: Number,
			required: false,
			default: void 0
		},
		className: {
			type: Function,
			required: false,
			default: void 0
		},
		style: {
			type: Function,
			required: false,
			default: void 0
		},
		onAllRemoved: {
			required: false,
			default: void 0
		},
		stack: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		renderNotifications: {
			type: Function,
			required: false,
			default: void 0
		}
	}, defaults),
	name: "Notifications"
});
var Notifications_default = Notifications;
exports.default = Notifications_default;
