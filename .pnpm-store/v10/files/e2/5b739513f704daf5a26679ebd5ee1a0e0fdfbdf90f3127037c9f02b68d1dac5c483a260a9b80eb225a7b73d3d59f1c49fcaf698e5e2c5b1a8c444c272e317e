import { computed, inject, provide, ref } from "vue";

//#region src/config-provider/context.ts
const defaultPrefixCls = "ant";
const defaultIconPrefixCls = "anticon";
const EMPTY_OBJECT = {};
const Variants = [
	"outlined",
	"borderless",
	"filled",
	"underlined"
];
const ConfigConsumerKey = Symbol("ConfigConsumerContext");
function useConfigProvider(props) {
	provide(ConfigConsumerKey, props);
}
function defaultGetPrefixCls(suffixCls, customizePrefixCls) {
	if (customizePrefixCls) return customizePrefixCls;
	return suffixCls ? `${defaultPrefixCls}-${suffixCls}` : defaultPrefixCls;
}
function useConfig() {
	return inject(ConfigConsumerKey, ref({
		getPrefixCls: defaultGetPrefixCls,
		iconPrefixCls: defaultIconPrefixCls
	}));
}
function useBaseConfig(suffixCls, props) {
	const config = useConfig();
	return {
		result: computed(() => config.value?.result),
		modal: computed(() => config.value?.modal),
		timeline: computed(() => config.value?.timeline),
		notification: computed(() => config.value?.notification),
		getPrefixCls: (suffixCls, prefixCls) => config.value?.getPrefixCls(suffixCls, prefixCls),
		prefixCls: computed(() => {
			return config.value?.getPrefixCls(suffixCls, props?.prefixCls);
		}),
		direction: computed(() => {
			return config.value?.direction;
		}),
		getPopupContainer: config?.value.getPopupContainer
	};
}
/**
* Get ConfigProvider configured component props.
* This help to reduce bundle size for saving `?.` operator.
* Do not use as `useMemo` deps since we do not cache the object here.
*
* NOTE: not refactor this with `useMemo` since memo will cost another memory space,
* which will waste both compare calculation & memory.
*/
function useComponentConfig(propName) {
	const context = useConfig();
	return computed(() => {
		const { getPrefixCls, direction, getPopupContainer } = context.value;
		return {
			classes: EMPTY_OBJECT,
			styles: EMPTY_OBJECT,
			...context.value[propName],
			getPrefixCls,
			direction,
			getPopupContainer
		};
	});
}
function useComponentBaseConfig(propName, props, keys, suffixCls) {
	const context = useConfig();
	const propValue = computed(() => {
		return context.value[propName];
	});
	const toRefs = (propValues) => {
		const result = {
			classes: computed(() => propValues.value?.classes ?? EMPTY_OBJECT),
			styles: computed(() => propValues.value?.styles ?? EMPTY_OBJECT),
			class: computed(() => propValues.value?.class),
			style: computed(() => propValues.value?.style)
		};
		const __keys = Object.keys(result);
		for (const key in propValues.value) if (!__keys.includes(key)) result[key] = computed(() => propValues.value[key]);
		if (keys && keys.length) keys.forEach((key) => {
			if (!result[key]) result[key] = computed(() => propValues.value?.[key]);
		});
		return result;
	};
	return {
		...toRefs(propValue),
		direction: computed(() => context.value.direction),
		prefixCls: computed(() => {
			return context.value?.getPrefixCls(suffixCls ?? propName, props?.prefixCls);
		}),
		rootPrefixCls: computed(() => context.value?.getPrefixCls()),
		getPopupContainer: context.value.getPopupContainer,
		getPrefixCls: context.value.getPrefixCls,
		getTargetContainer: context.value.getTargetContainer,
		virtual: computed(() => context.value.virtual),
		renderEmpty: computed(() => context.value.renderEmpty),
		popupMatchSelectWidth: computed(() => context.value.popupMatchSelectWidth),
		popupOverflow: computed(() => context.value.popupOverflow)
	};
}

//#endregion
export { Variants, defaultIconPrefixCls, defaultPrefixCls, useBaseConfig, useComponentBaseConfig, useComponentConfig, useConfig, useConfigProvider };