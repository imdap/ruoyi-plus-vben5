import { useConfig } from "../../config-provider/context.js";
import { computed } from "vue";

//#region src/cascader/hooks/useBase.ts
function useBase(customizePrefixCls, direction) {
	const config = useConfig();
	const mergedDirection = computed(() => direction?.value ?? config.value.direction);
	return {
		prefixCls: computed(() => config.value.getPrefixCls("select", customizePrefixCls.value)),
		cascaderPrefixCls: computed(() => config.value.getPrefixCls("cascader", customizePrefixCls.value)),
		direction: mergedDirection,
		renderEmpty: computed(() => config.value.renderEmpty)
	};
}

//#endregion
export { useBase as default };