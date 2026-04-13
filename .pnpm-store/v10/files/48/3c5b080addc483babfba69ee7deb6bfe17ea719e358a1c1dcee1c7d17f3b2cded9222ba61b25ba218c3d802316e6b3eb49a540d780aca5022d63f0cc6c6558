import { getSlotPropsFnRun } from "../tools.js";
import isNonNullable_default from "../isNonNullable.js";
import en_US_default from "../../locale/en_US.js";
import useLocale_default from "../../locale/useLocale.js";
import { getVNode } from "../vueNode.js";
import extendsObject_default from "../extendsObject.js";
import { computed, createVNode, isVNode, mergeProps, ref, unref } from "vue";
import { filterEmpty } from "@v-c/util/dist/props-util";
import { CloseOutlined } from "@antdv-next/icons";
import pickAttrs from "@v-c/util/dist/pickAttrs";

//#region src/_util/hooks/useClosable.tsx
function pickClosable(context) {
	return computed(() => {
		if (!context.value) return;
		const { closable, closeIcon } = context.value;
		return {
			closable,
			closeIcon
		};
	});
}
/** Collection contains the all the props related with closable. e.g. `closable`, `closeIcon` */
/** Convert `closable` and `closeIcon` to config object */
function useClosableConfig(closableCollection) {
	return computed(() => {
		const { closable, closeIcon } = closableCollection?.value ?? {};
		if (!closable && (closable === false || closeIcon === false || closeIcon === null)) return false;
		if (closable === void 0 && closeIcon === void 0) return null;
		let closableConfig = { closeIcon: typeof closeIcon !== "boolean" && closeIcon !== null ? closeIcon : void 0 };
		if (closable && typeof closable === "object") closableConfig = {
			...closableConfig,
			...closable
		};
		return closableConfig;
	});
}
/** Use same object to support `useMemo` optimization */
const EmptyFallbackCloseCollection = {};
function useClosable(propCloseCollection, contextCloseCollection, fallbackCloseCollection = ref(EmptyFallbackCloseCollection)) {
	const propCloseConfig = useClosableConfig(propCloseCollection);
	const contextCloseConfig = useClosableConfig(contextCloseCollection);
	const [contextLocale] = useLocale_default("global", en_US_default.global);
	const closeBtnIsDisabled = computed(() => {
		return typeof propCloseConfig.value !== "boolean" ? !!propCloseConfig.value?.disabled : false;
	});
	const mergedFallbackCloseCollection = computed(() => {
		return {
			closeIcon: createVNode(CloseOutlined, null, null),
			...fallbackCloseCollection.value
		};
	});
	const mergedClosableConfig = computed(() => {
		if (propCloseConfig.value === false) return false;
		if (propCloseConfig.value) return extendsObject_default(mergedFallbackCloseCollection.value, contextCloseConfig.value, propCloseConfig.value);
		if (contextCloseConfig.value === false) return false;
		if (contextCloseConfig.value) return extendsObject_default(mergedFallbackCloseCollection.value, contextCloseConfig.value);
		return !mergedFallbackCloseCollection.value.closable ? false : mergedFallbackCloseCollection.value;
	});
	return computed(() => {
		if (mergedClosableConfig.value === false) return [
			false,
			null,
			closeBtnIsDisabled.value,
			{}
		];
		const { closeIconRender } = mergedFallbackCloseCollection.value;
		const { closeIcon } = mergedClosableConfig.value;
		let mergedCloseIcon = getVNode(closeIcon);
		const ariaOrDataProps = pickAttrs(mergedClosableConfig.value, true);
		if (mergedCloseIcon !== null && mergedCloseIcon !== void 0) {
			if (closeIconRender) {
				mergedCloseIcon = closeIconRender(mergedCloseIcon);
				if (Array.isArray(mergedCloseIcon)) mergedCloseIcon = filterEmpty(mergedCloseIcon)?.[0];
				else mergedCloseIcon = filterEmpty([mergedCloseIcon])?.[0];
			}
			mergedCloseIcon = isVNode(mergedCloseIcon) ? createVNode(mergedCloseIcon, {
				...mergedCloseIcon.props,
				"aria-label": mergedCloseIcon.props?.["aria-label"] ?? contextLocale?.value?.close,
				...ariaOrDataProps
			}) : createVNode("span", mergeProps({ "aria-label": contextLocale?.value?.close }, ariaOrDataProps), [mergedCloseIcon]);
			return [
				true,
				mergedCloseIcon,
				closeBtnIsDisabled.value,
				ariaOrDataProps
			];
		}
	});
}
function computeClosableConfig(closable, closeIcon) {
	if (!closable && (closable === false || closeIcon === false || closeIcon === null)) return false;
	if (closable === void 0 && closeIcon === void 0) return null;
	let closableConfig = { closeIcon: typeof closeIcon !== "boolean" && closeIcon !== null ? closeIcon : void 0 };
	if (closable && typeof closable === "object") closableConfig = {
		...closableConfig,
		...closable
	};
	return closableConfig;
}
function computeCloseIcon(mergedConfig, fallbackCloseCollection, closeLabel) {
	const { closeIconRender } = fallbackCloseCollection;
	const { closeIcon, ...restConfig } = mergedConfig;
	let finalCloseIcon = getSlotPropsFnRun({}, { closeIcon }, "closeIcon");
	const ariaOrDataProps = pickAttrs(restConfig, true);
	if (isNonNullable_default(finalCloseIcon)) {
		if (closeIconRender) finalCloseIcon = closeIconRender(finalCloseIcon);
		finalCloseIcon = isVNode(finalCloseIcon) ? createVNode(finalCloseIcon, {
			"aria-label": closeLabel,
			...ariaOrDataProps
		}) : createVNode("span", mergeProps({ "aria-label": closeLabel }, ariaOrDataProps), [finalCloseIcon]);
	}
	return [finalCloseIcon, ariaOrDataProps];
}
function mergeClosableConfigs(propConfig, contextConfig, fallbackConfig) {
	if (propConfig === false) return false;
	if (propConfig) return extendsObject_default(fallbackConfig, contextConfig, propConfig);
	if (contextConfig === false) return false;
	if (contextConfig) return extendsObject_default(fallbackConfig, contextConfig);
	return fallbackConfig.closable ? fallbackConfig : false;
}
function computeClosable(propCloseCollection, contextCloseCollection, fallbackCloseCollection = ref(EmptyFallbackCloseCollection), closeLabel = "Close") {
	const propConfig = computeClosableConfig(unref(propCloseCollection)?.closable, unref(propCloseCollection)?.closeIcon);
	const contextConfig = computeClosableConfig(unref(contextCloseCollection)?.closable, unref(contextCloseCollection)?.closeIcon);
	const mergedFallback = {
		closeIcon: createVNode(CloseOutlined, null, null),
		...fallbackCloseCollection.value
	};
	const mergedConfig = mergeClosableConfigs(propConfig, contextConfig, mergedFallback);
	const closeBtnIsDisabled = typeof mergedConfig !== "boolean" ? !!mergedConfig?.disabled : false;
	if (mergedConfig === false) return [
		false,
		null,
		closeBtnIsDisabled,
		{}
	];
	const [closeIcon, ariaProps] = computeCloseIcon(mergedConfig, mergedFallback, closeLabel);
	return [
		true,
		closeIcon,
		closeBtnIsDisabled,
		ariaProps
	];
}

//#endregion
export { computeClosable, useClosable as default, pickClosable };