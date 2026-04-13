import Notice_default from "./Notice.js";
import useStack_default from "./hooks/useStack.js";
import { useNotificationContext } from "./NotificationProvider.js";
import { TransitionGroup, computed, createVNode, defineComponent, isVNode, mergeProps, reactive, ref, shallowRef, toRef, watch, watchEffect } from "vue";
import { classNames } from "@v-c/util";
import { getTransitionGroupProps } from "@v-c/util/dist/utils/transition";
import { unrefElement } from "@v-c/util/dist/vueuse/unref-element";
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var NoticeList_default = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const ctx = useNotificationContext();
	const dictRef = reactive({});
	const keys = computed(() => (props.configList ?? []).map((config) => ({
		config,
		key: String(config.key)
	})));
	const latestNotice = shallowRef(null);
	const hoverKeys = ref([]);
	const stackConfig = toRef(props, "stack");
	const [stackEnabled, stackOptions] = useStack_default(stackConfig);
	const stackActive = computed(() => stackEnabled.value || stackConfig.value === false);
	const expanded = computed(() => {
		if (!stackActive.value) return false;
		if (!stackEnabled.value) return true;
		return hoverKeys.value.length > 0 || keys.value.length <= stackOptions.threshold.value;
	});
	const placementMotion = computed(() => {
		if (typeof props.motion === "function") return props.placement ? props.motion(props.placement) : void 0;
		return props.motion;
	});
	watch([
		hoverKeys,
		keys,
		stackEnabled
	], () => {
		if (stackEnabled.value && hoverKeys.value.length > 1) hoverKeys.value = hoverKeys.value.filter((key) => keys.value.some(({ key: dataKey }) => key === dataKey));
	});
	watch(stackEnabled, (enabled) => {
		if (!enabled && hoverKeys.value.length) hoverKeys.value = [];
	});
	watchEffect(() => {
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
			return createVNode("div", {
				"key": strKey,
				"class": classNames(`${prefixCls}-notice-wrapper`, configClassNames?.wrapper),
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
			}, [createVNode(Notice_default, mergeProps(restConfig, {
				"ref": (el) => {
					const element = unrefElement(el) ?? void 0;
					if (dataIndex > -1) dictRef[strKey] = element;
					else delete dictRef[strKey];
				},
				"prefixCls": prefixCls,
				"classNames": configClassNames,
				"styles": configStyles,
				"class": classNames(configClassName, ctx.value?.classNames?.notice),
				"style": configStyle,
				"times": times,
				"eventKey": key,
				"onNoticeClose": onNoticeClose,
				"hovering": stackEnabled.value && hoverKeys.value.length > 0
			}), null)]);
		});
		let motionGroupProps = {};
		if (placementMotion.value) motionGroupProps = getTransitionGroupProps(placementMotion.value.name, placementMotion.value);
		return createVNode(TransitionGroup, mergeProps({
			"key": placement,
			"tag": "div",
			"appear": true
		}, {
			class: classNames(prefixCls, `${prefixCls}-${placement}`, ctx.value?.classNames?.list, attrs.class, {
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
export { NoticeList_default as default };
