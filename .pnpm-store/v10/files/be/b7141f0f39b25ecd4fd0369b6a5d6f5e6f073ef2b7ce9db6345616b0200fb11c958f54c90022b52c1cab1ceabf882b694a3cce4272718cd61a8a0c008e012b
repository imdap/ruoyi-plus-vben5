import { devUseWarning } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { AppConfigProvider, useAppConfig, useAppContextProvider } from "./context.js";
import useMessage from "../message/useMessage.js";
import useModal from "../modal/useModal/index.js";
import useNotification from "../notification/useNotification.js";
import style_default from "./style/index.js";
import { Fragment, computed, createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
import { getAttrStyleAndClass } from "@v-c/util/dist/props-util";

//#region src/app/App.tsx
const App$1 = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const { direction, prefixCls, class: contextClassName, style: contextStyle } = useComponentBaseConfig("app", props);
	const [hashId, cssVarCls] = style_default(prefixCls);
	const appConfig = useAppConfig();
	const mergedAppConfig = computed(() => {
		return {
			message: {
				...appConfig.message,
				...props?.message
			},
			notification: {
				...appConfig.notification,
				...props?.notification
			}
		};
	});
	const [messageApi, MessageContextHolder] = useMessage(computed(() => mergedAppConfig?.value?.message));
	const [notificationApi, NotificationContextHolder] = useNotification(computed(() => mergedAppConfig?.value?.notification));
	const [ModalApi, ModalContextHolder] = useModal();
	useAppContextProvider({
		message: messageApi,
		notification: notificationApi,
		modal: ModalApi
	});
	return () => {
		const { rootClass } = props;
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const customClassName = clsx(hashId.value, prefixCls.value, className, rootClass, cssVarCls.value, { [`${prefixCls.value}-rtl`]: direction.value === "rtl" });
		const { component = "div" } = props;
		devUseWarning("App")(!(cssVarCls.value && component === false), "usage", "When using cssVar, ensure `component` is assigned a valid Vue component string.");
		const Component = component === false ? Fragment : component;
		const rootProps = {
			...restAttrs,
			class: clsx(contextClassName.value, customClassName),
			style: {
				...contextStyle.value,
				...style
			}
		};
		return createVNode(AppConfigProvider, mergedAppConfig.value, { default: () => [createVNode(Component, component === false ? void 0 : rootProps, { default: () => [
			createVNode(MessageContextHolder, null, null),
			createVNode(NotificationContextHolder, null, null),
			createVNode(ModalContextHolder, null, null),
			slots?.default?.()
		] })] });
	};
}, {
	props: {
		component: { required: false },
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		message: {
			type: Object,
			required: false
		},
		notification: {
			type: Object,
			required: false
		}
	},
	name: "AApp",
	inheritAttrs: false
});
App$1.install = (app) => {
	app.component(App$1.name, App$1);
};
var App_default = App$1;

//#endregion
export { App_default as default };