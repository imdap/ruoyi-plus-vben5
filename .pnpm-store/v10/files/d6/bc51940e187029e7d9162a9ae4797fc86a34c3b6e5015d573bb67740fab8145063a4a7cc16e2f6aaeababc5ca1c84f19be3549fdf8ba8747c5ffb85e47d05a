import { generateColor } from "../util.js";
import useLocale_default from "../../locale/useLocale.js";
import { computed, shallowRef, watch } from "vue";

//#region src/color-picker/hooks/useModeColor.ts
function useModeColor(value, mode, defaultValue) {
	const [locale] = useLocale_default("ColorPicker");
	const mergedColor = shallowRef(value.value ?? defaultValue);
	watch(value, () => {
		mergedColor.value = value.value;
	});
	const modeState = shallowRef("single");
	const modeOptionListCompute = computed(() => {
		const list = (Array.isArray(mode.value) ? mode.value : [mode.value]).filter((m) => !!m);
		if (!list.length) list.push("single");
		const modes = new Set(list);
		const optionList = [];
		const pushOption = (modeType, localeTxt) => {
			if (modes.has(modeType)) optionList.push({
				label: localeTxt,
				value: modeType
			});
		};
		pushOption("single", locale?.value.singleColor);
		pushOption("gradient", locale?.value.gradientColor);
		return [optionList, modes];
	});
	const modeOptionList = computed(() => modeOptionListCompute.value[0]);
	const modeSet = computed(() => modeOptionListCompute.value[1]);
	const cacheColor = shallowRef();
	const setColor = (nextColor) => {
		cacheColor.value = nextColor;
		mergedColor.value = nextColor;
	};
	const postColor = computed(() => {
		const colorObj = generateColor(mergedColor.value || "");
		return colorObj.equals(cacheColor.value) ? cacheColor.value : colorObj;
	});
	const postMode = computed(() => {
		if (modeSet.value?.has(modeState.value)) return modeState.value;
		return modeOptionList.value[0]?.value;
	});
	watch(postColor, () => {
		modeState.value = postColor.value?.isGradient() ? "gradient" : "single";
	}, { immediate: true });
	const setModeState = (nextMode) => {
		modeState.value = nextMode;
	};
	return [
		postColor,
		setColor,
		postMode,
		setModeState,
		modeOptionList
	];
}

//#endregion
export { useModeColor as default };