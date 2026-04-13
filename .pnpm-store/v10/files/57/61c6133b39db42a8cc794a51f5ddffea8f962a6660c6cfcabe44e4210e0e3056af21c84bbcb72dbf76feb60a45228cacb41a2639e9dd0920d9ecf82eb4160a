Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
const require_Notifications = require("../Notifications.cjs");
let vue = require("vue");
var defaultGetContainer = () => document.body;
var uniqueKey = 0;
function mergeConfig(...objList) {
	const clone = {};
	objList.forEach((obj) => {
		if (obj) Object.keys(obj).forEach((key) => {
			const val = obj[key];
			if (val !== void 0) clone[key] = val;
		});
	});
	return clone;
}
function useNotification(rootConfig = {}) {
	const configRef = (0, vue.computed)(() => (0, vue.unref)(rootConfig) || {});
	const container = (0, vue.shallowRef)();
	const notificationRef = (0, vue.shallowRef)();
	const shareConfig = (0, vue.computed)(() => {
		const { getContainer, motion, prefixCls, maxCount, className, style, onAllRemoved, stack, renderNotifications, ...restConfig } = configRef.value;
		return restConfig;
	});
	const resolveContainer = () => {
		return (configRef.value.getContainer || defaultGetContainer)();
	};
	const contextHolder = () => (0, vue.createVNode)(require_Notifications.default, {
		"container": container.value,
		"ref": notificationRef,
		"prefixCls": configRef.value.prefixCls,
		"motion": configRef.value.motion,
		"maxCount": configRef.value.maxCount,
		"className": configRef.value.className,
		"style": configRef.value.style,
		"onAllRemoved": configRef.value.onAllRemoved,
		"stack": configRef.value.stack,
		"renderNotifications": configRef.value.renderNotifications
	}, null);
	const taskQueue = (0, vue.shallowRef)([]);
	const api = {
		open(config) {
			const mergedConfig = mergeConfig(shareConfig.value, config);
			if (mergedConfig.key === null || mergedConfig.key === void 0) {
				mergedConfig.key = `vc-notification-${uniqueKey}`;
				uniqueKey += 1;
			}
			taskQueue.value = [...taskQueue.value, {
				type: "open",
				config: mergedConfig
			}];
		},
		close(key) {
			taskQueue.value = [...taskQueue.value, {
				type: "close",
				key
			}];
		},
		destroy() {
			taskQueue.value = [...taskQueue.value, { type: "destroy" }];
		}
	};
	(0, vue.onMounted)(() => {
		container.value = resolveContainer();
	});
	(0, vue.watch)(() => configRef.value.getContainer, () => {
		container.value = resolveContainer();
	});
	(0, vue.watch)(taskQueue, () => {
		if (notificationRef.value && taskQueue.value.length) {
			taskQueue.value.forEach((task) => {
				switch (task.type) {
					case "open":
						notificationRef.value?.open(task.config);
						break;
					case "close":
						notificationRef.value?.close(task.key);
						break;
					case "destroy":
						notificationRef.value?.destroy();
						break;
					default: break;
				}
			});
			taskQueue.value = taskQueue.value.filter((task) => !taskQueue.value.includes(task));
		}
	});
	return [api, contextHolder];
}
exports.default = useNotification;
