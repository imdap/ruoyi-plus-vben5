import { devUseWarning } from "../_util/warning.js";
import { useBaseConfig, useComponentBaseConfig } from "../config-provider/context.js";
import { mergeClassNames, mergeStyles, resolveStyleOrClass, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import style_default from "./style/index.js";
import { PureContent } from "./PurePanel.js";
import { getMotion, wrapPromiseFn } from "./util.js";
import { computed, createVNode, defineComponent, isVNode, mergeProps, shallowRef, unref } from "vue";
import { clsx } from "@v-c/util";
import { useNotification, useNotificationProvider } from "@v-c/notification";

//#region src/message/useMessage.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DEFAULT_OFFSET = 8;
const DEFAULT_DURATION = 3;
const Wrapper = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const prefixCls = computed(() => props.prefixCls);
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	useNotificationProvider(computed(() => {
		return { classNames: { list: clsx(hashId.value, cssVarCls.value, rootCls.value) } };
	}));
	return () => slots.default?.();
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
const Holder = /* @__PURE__ */ defineComponent((props, { expose }) => {
	const { getPrefixCls, direction, getPopupContainer } = useBaseConfig("message");
	const { class: contextClassName, style: contextStyle, classes: contextClasses, styles: contextStyles } = useComponentBaseConfig("message", props);
	const { classes, styles } = toPropsRefs(props, "classes", "styles");
	const prefixCls = computed(() => props.prefixCls ?? getPrefixCls("message"));
	const mergedTop = computed(() => {
		if (typeof props.top === "number") return `${props.top}px`;
		if (typeof props.top === "string") return props.top;
		return `${DEFAULT_OFFSET}px`;
	});
	const mergedDuration = computed(() => props.duration ?? DEFAULT_DURATION);
	const mergedPauseOnHover = computed(() => props.pauseOnHover === void 0 ? true : props.pauseOnHover);
	const getStyle = () => ({
		left: "50%",
		transform: "translateX(-50%)",
		top: mergedTop.value
	});
	const getClassName = () => clsx({ [`${prefixCls.value}-rtl`]: props.rtl ?? direction.value === "rtl" });
	const getNotificationMotion = () => getMotion(prefixCls.value, props.transitionName);
	const [api, holder] = useNotification({
		prefixCls: prefixCls.value,
		style: getStyle,
		className: getClassName,
		motion: getNotificationMotion,
		closable: false,
		duration: mergedDuration.value,
		getContainer: () => props.getContainer?.() || getPopupContainer?.() || document.body,
		maxCount: props.maxCount,
		onAllRemoved: props.onAllRemoved,
		renderNotifications,
		pauseOnHover: mergedPauseOnHover.value
	});
	const mergedProps = computed(() => props);
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(classes, contextClasses), useToArr(styles, contextStyles), useToProps(mergedProps));
	expose({
		...api,
		prefixCls,
		contextClassName,
		contextStyle,
		contextClasses,
		contextStyles,
		classNames: mergedClassNames,
		styles: mergedStyles
	});
	return () => holder?.();
}, {
	props: {
		top: {
			type: [String, Number],
			required: false
		},
		duration: {
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
		transitionName: {
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
		pauseOnHover: {
			type: Boolean,
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
		appContext: {
			type: Object,
			required: false
		},
		onAllRemoved: { required: false }
	},
	name: "MessageHolder",
	inheritAttrs: false
});
let keyIndex = 0;
function useInternalMessage(messageConfig) {
	const holderRef = shallowRef();
	const warning = devUseWarning("Message");
	const wrapAPI = () => {
		const close = (key) => {
			holderRef.value?.close(key);
		};
		const open = (config) => {
			if (!holderRef.value) {
				warning(false, "usage", "You are calling notice in render which will break in concurrent mode. Please trigger in effect instead.");
				const fakeResult = () => {};
				fakeResult.then = () => {};
				return fakeResult;
			}
			const { open: originOpen, prefixCls, contextClassName, contextStyle, contextClasses, contextStyles, classNames: originClassNames, styles: originStyles } = holderRef.value;
			const noticePrefixCls = `${prefixCls}-notice`;
			const { content, icon, type, key, class: className, style, onClose, classes: configClassNames = {}, styles = {}, ...restConfig } = config;
			let mergedKey = key;
			if (mergedKey === void 0 || mergedKey === null) {
				keyIndex += 1;
				mergedKey = `antd-message-${keyIndex}`;
			}
			const contextConfig = {
				...messageConfig,
				...config
			};
			const resolvedContextClassNames = resolveStyleOrClass(contextClasses, { props: contextConfig });
			const semanticClassNames = resolveStyleOrClass(configClassNames, { props: contextConfig });
			const resolvedContextStyles = resolveStyleOrClass(contextStyles, { props: contextConfig });
			const semanticStyles = resolveStyleOrClass(styles, { props: contextConfig });
			const mergedClassNames = mergeClassNames(void 0, resolvedContextClassNames, semanticClassNames, originClassNames);
			const mergedStyles = mergeStyles(resolvedContextStyles, semanticStyles, originStyles);
			return wrapPromiseFn((resolve) => {
				originOpen({
					...restConfig,
					key: mergedKey,
					placement: "top",
					content: createVNode(PureContent, {
						"prefixCls": prefixCls,
						"type": type,
						"icon": icon,
						"classNames": mergedClassNames,
						"styles": mergedStyles
					}, _isSlot(content) ? content : { default: () => [content] }),
					className: clsx({ [`${noticePrefixCls}-${type}`]: !!type }, className, contextClassName, mergedClassNames.root),
					style: {
						...mergedStyles.root,
						...contextStyle,
						...style
					},
					onClose: () => {
						onClose?.();
						resolve();
					}
				});
				return () => {
					close(mergedKey);
				};
			});
		};
		const destroy = (key) => {
			if (key !== void 0) close(key);
			else holderRef.value?.destroy();
		};
		const instance = {
			open,
			destroy
		};
		[
			"info",
			"success",
			"warning",
			"error",
			"loading"
		].forEach((type) => {
			const typeOpen = (jointContent, duration, onClose) => {
				let config;
				if (jointContent && typeof jointContent === "object" && "content" in jointContent) config = jointContent;
				else config = { content: jointContent };
				let mergedDuration;
				let mergedOnClose;
				if (typeof duration === "function") mergedOnClose = duration;
				else {
					mergedDuration = duration;
					mergedOnClose = onClose;
				}
				return open({
					onClose: mergedOnClose,
					duration: mergedDuration,
					...config,
					type
				});
			};
			instance[type] = typeOpen;
		});
		return instance;
	};
	const holderContext = () => createVNode(Holder, mergeProps({ "key": "message-holder" }, unref(messageConfig), { "ref": holderRef }), null);
	return [wrapAPI(), holderContext];
}
function useMessage(messageConfig) {
	return useInternalMessage(messageConfig);
}

//#endregion
export { useMessage as default, useInternalMessage };