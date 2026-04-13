import { devUseWarning } from "../_util/warning.js";
import { useBaseConfig, useComponentBaseConfig } from "../config-provider/context.js";
import useToken from "../theme/useToken.js";
import { mergeClassNames, mergeStyles, resolveStyleOrClass, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import { computeClosable, pickClosable } from "../_util/hooks/useClosable.js";
import style_default from "./style/index.js";
import { PureContent, getCloseIcon } from "./PurePanel.js";
import { getCloseIconConfig, getMotion, getPlacementStyle } from "./util.js";
import { computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, shallowRef, unref } from "vue";
import { clsx } from "@v-c/util";
import { useNotification as useNotification$1, useNotificationProvider } from "@v-c/notification";

//#region src/notification/useNotification.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DEFAULT_OFFSET = 24;
const DEFAULT_DURATION = 4.5;
const DEFAULT_PLACEMENT = "topRight";
const Wrapper = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const prefixCls = computed(() => props.prefixCls);
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	useNotificationProvider(computed(() => {
		return { classNames: { list: clsx(hashId.value, cssVarCls.value, rootCls.value) } };
	}));
	return () => {
		return slots?.default?.();
	};
}, { props: { prefixCls: {
	type: String,
	required: true
} } });
const renderNotifications = (node, { prefixCls, key }) => {
	return createVNode(Wrapper, {
		"prefixCls": prefixCls,
		"key": key
	}, _isSlot(node) ? node : { default: () => [node] });
};
const holderDefaultProps = {
	duration: DEFAULT_DURATION,
	pauseOnHover: true
};
const Holder = /* @__PURE__ */ defineComponent((props, { expose }) => {
	const { getPrefixCls, getPopupContainer, notification, direction } = useBaseConfig("notification");
	const { classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("notification", props);
	const { classes, styles } = toPropsRefs(props, "classes", "styles");
	const [, token] = useToken();
	const prefixCls = computed(() => props.prefixCls || getPrefixCls("notification"));
	const mergedDuration = computed(() => {
		return typeof props.duration === "number" && props.duration > 0 ? props.duration : false;
	});
	const getStyle = (placement) => {
		return getPlacementStyle(placement, props?.top ?? DEFAULT_OFFSET, props?.bottom ?? DEFAULT_DURATION);
	};
	const getClassName = () => clsx({ [`${prefixCls.value}-rtl`]: props.rtl ?? direction.value === "rtl" });
	const getNotificationMotion = () => getMotion(prefixCls.value);
	const [api, holder] = useNotification$1(computed(() => ({
		prefixCls: prefixCls.value,
		style: getStyle,
		className: getClassName,
		motion: getNotificationMotion,
		closable: { closeIcon: getCloseIcon(prefixCls.value) },
		duration: mergedDuration.value,
		getContainer: () => props?.getContainer?.() || getPopupContainer?.() || document.body,
		maxCount: props?.maxCount,
		pauseOnHover: props?.pauseOnHover,
		showProgress: props?.showProgress,
		onAllRemoved: props.onAllRemoved,
		renderNotifications,
		stack: props.stack === false ? false : {
			threshold: typeof props.stack === "object" ? props.stack.threshold : void 0,
			offset: 8,
			gap: token.value?.margin
		}
	})));
	const mergedProps = computed(() => props);
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	expose({
		...api,
		prefixCls,
		notification,
		classNames: mergedClassNames,
		styles: mergedStyles
	});
	return () => {
		return holder?.();
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		top: {
			type: Number,
			required: false
		},
		bottom: {
			type: Number,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		getContainer: {
			type: Function,
			required: false
		},
		placement: {
			type: String,
			required: false
		},
		maxCount: {
			type: Number,
			required: false
		},
		rtl: {
			type: Boolean,
			required: false,
			default: void 0
		},
		stack: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		duration: {
			type: [Number, Boolean],
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
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		onAllRemoved: { required: false }
	}, holderDefaultProps),
	name: "NotificationHolder",
	inheritAttrs: false
});
function useInternalNotification(notificationConfig) {
	const holderRef = shallowRef();
	const warning = devUseWarning("Notification");
	const { notification: notificationContext } = useBaseConfig("notification");
	const wrapAPIFn = () => {
		const open = (config) => {
			if (!holderRef.value) {
				warning(false, "usage", "You are calling notice in render which will break in React 18 concurrent mode. Please trigger in effect instead.");
				return;
			}
			const { open: originOpen, prefixCls, notification, classNames: originClassNames, styles: originStyles } = holderRef.value;
			const contextClassName = notification?.class || {};
			const contextStyle = notification?.style || {};
			const noticePrefixCls = `${prefixCls}-notice`;
			const { title, description, icon, type, actions, class: className, style, role = "alert", closeIcon, closable, classes: configClassNames = {}, styles = {}, ...restConfig } = config;
			const mergedTitle = title;
			const mergedActions = actions;
			const realCloseIcon = getCloseIcon(noticePrefixCls, getCloseIconConfig(closeIcon, unref(notificationConfig), notification));
			const [rawClosable, mergedCloseIcon, , ariaProps] = computeClosable(pickClosable(computed(() => ({
				...unref(notificationConfig) || {},
				...config
			}))), pickClosable(notificationContext), computed(() => ({
				closable: true,
				closeIcon: realCloseIcon
			})));
			const mergedClosable = rawClosable ? {
				onClose: closable && typeof closable === "object" ? closable.onClose : void 0,
				closeIcon: mergedCloseIcon,
				...ariaProps
			} : false;
			const semanticClassNames = resolveStyleOrClass(configClassNames, { props: config });
			const semanticStyles = resolveStyleOrClass(styles, { props: config });
			const mergedClassNames = mergeClassNames(void 0, originClassNames, semanticClassNames);
			const mergedStyles = mergeStyles(originStyles, semanticStyles);
			return originOpen({
				placement: unref(notificationConfig)?.placement ?? DEFAULT_PLACEMENT,
				...restConfig,
				content: createVNode(PureContent, {
					"prefixCls": noticePrefixCls,
					"icon": icon,
					"type": type,
					"title": mergedTitle,
					"description": description,
					"actions": mergedActions,
					"role": role,
					"classes": mergedClassNames,
					"styles": mergedStyles
				}, null),
				className: clsx({ [`${noticePrefixCls}-${type}`]: type }, className, contextClassName, mergedClassNames.root),
				style: {
					...contextStyle,
					...mergedStyles.root,
					...style
				},
				closable: mergedClosable
			});
		};
		const destroy = (key) => {
			if (key !== void 0) holderRef.value?.close(key);
			else holderRef.value?.destroy();
		};
		const clone = {
			open,
			destroy
		};
		[
			"success",
			"info",
			"warning",
			"error"
		].forEach((type) => {
			clone[type] = (config) => open({
				...config,
				type
			});
		});
		return clone;
	};
	const holderContext = () => {
		return createVNode(Holder, mergeProps({ "key": "notificaion-holder" }, unref(notificationConfig), { "ref": holderRef }), null);
	};
	return [wrapAPIFn(), holderContext];
}
function useNotification(notificationConfig) {
	return useInternalNotification(notificationConfig);
}

//#endregion
export { useNotification as default, useInternalNotification };