import Notifications_default from "../Notifications.js";
import { computed, createVNode, onMounted, shallowRef, unref, watch } from "vue";
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
	const configRef = computed(() => unref(rootConfig) || {});
	const container = shallowRef();
	const notificationRef = shallowRef();
	const shareConfig = computed(() => {
		const { getContainer, motion, prefixCls, maxCount, className, style, onAllRemoved, stack, renderNotifications, ...restConfig } = configRef.value;
		return restConfig;
	});
	const resolveContainer = () => {
		return (configRef.value.getContainer || defaultGetContainer)();
	};
	const contextHolder = () => createVNode(Notifications_default, {
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
	const taskQueue = shallowRef([]);
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
	onMounted(() => {
		container.value = resolveContainer();
	});
	watch(() => configRef.value.getContainer, () => {
		container.value = resolveContainer();
	});
	watch(taskQueue, () => {
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
export { useNotification as default };
