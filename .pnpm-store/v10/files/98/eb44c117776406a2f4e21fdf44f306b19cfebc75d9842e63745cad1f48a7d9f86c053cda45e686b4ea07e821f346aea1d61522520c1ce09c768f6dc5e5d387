import { isPresetColor, isPresetStatusColor } from "../../_util/colors.js";
import { computed } from "vue";
import { FastColor } from "@ant-design/fast-color";

//#region src/tag/hooks/useColor.ts
/**
* Convert color related props to a unified object,
* which is used to flatten the compatibility requirements.
*/
function useColor(props, contextVariant) {
	const { color, variant, bordered } = props;
	const convertColors = computed(() => {
		const isInverseColor = color.value?.endsWith?.("-inverse");
		let nextVariant;
		if (variant.value) nextVariant = variant.value;
		else if (isInverseColor) nextVariant = "solid";
		else if (bordered.value === false) nextVariant = "filled";
		else nextVariant = contextVariant?.value || "filled";
		const nextColor = isInverseColor ? color?.value?.replace("-inverse", "") : color.value;
		const nextIsPreset = isPresetColor(color.value);
		const nextIsStatus = isPresetStatusColor(color.value);
		const tagStyle = {};
		if (!nextIsPreset && !nextIsStatus && nextColor) if (nextVariant === "solid") tagStyle.backgroundColor = color.value;
		else {
			const hsl = new FastColor(nextColor).toHsl();
			hsl.l = .95;
			tagStyle.backgroundColor = new FastColor(hsl).toHexString();
			tagStyle.color = color.value;
			if (nextVariant === "outlined") tagStyle.borderColor = color.value;
		}
		return [
			nextVariant,
			nextColor,
			nextIsPreset,
			nextIsStatus,
			tagStyle
		];
	});
	return [
		computed(() => convertColors.value[0]),
		computed(() => convertColors.value[1]),
		computed(() => convertColors.value[2]),
		computed(() => convertColors.value[3]),
		computed(() => convertColors.value[4])
	];
}

//#endregion
export { useColor as default };