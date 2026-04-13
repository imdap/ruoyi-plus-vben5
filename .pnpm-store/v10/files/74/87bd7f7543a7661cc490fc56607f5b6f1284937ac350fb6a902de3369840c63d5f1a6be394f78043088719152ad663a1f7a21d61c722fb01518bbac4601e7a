import { useComponentConfig } from "../../config-provider/context.js";
import { useMergeSemantic, useToArr, useToProps } from "../../_util/hooks/useMergeSemantic.js";
import { computed, unref } from "vue";
import { clsx } from "@v-c/util";

//#region src/date-picker/hooks/useMergedPickerSemantic.ts
function useMergedPickerSemantic(pickerType, classNames, styles, popupClassName, popupStyle, mergedProps) {
	const contextConfig = useComponentConfig(pickerType);
	const contextClassNames = computed(() => contextConfig.value?.classes);
	const contextStyles = computed(() => contextConfig.value?.styles);
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classNames), useToArr(contextStyles, styles), useToProps(mergedProps), computed(() => ({ popup: { _default: "root" } })));
	return [computed(() => {
		const className = unref(popupClassName);
		return {
			...mergedClassNames.value,
			popup: {
				...mergedClassNames.value.popup,
				root: clsx(mergedClassNames.value.popup?.root, className)
			}
		};
	}), computed(() => {
		const style = unref(popupStyle);
		return {
			...mergedStyles.value,
			popup: {
				...mergedStyles.value.popup,
				root: {
					...mergedStyles.value.popup?.root,
					...style ?? {}
				}
			}
		};
	})];
}

//#endregion
export { useMergedPickerSemantic as default };