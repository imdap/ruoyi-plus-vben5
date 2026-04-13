import { toPathKey } from "../utils/commonUtil.js";
import { toPathOptions } from "../utils/treeUtil.js";
import { cloneVNode, computed, isVNode } from "vue";
var useDisplayValues_default = (rawValues, options, fieldNames, multiple, displayRender) => {
	return computed(() => {
		const mergedDisplayRender = displayRender.value || ((labels) => {
			const mergedLabels = multiple.value ? labels.slice(-1) : labels;
			const split = " / ";
			if (mergedLabels.every((label) => ["string", "number"].includes(typeof label))) return mergedLabels.join(split);
			return mergedLabels.reduce((list, label, index) => {
				const nextLabel = isVNode(label) ? cloneVNode(label, { key: index }) : label;
				if (index === 0) return [nextLabel];
				return [
					...list,
					split,
					nextLabel
				];
			}, []);
		});
		return rawValues.value.map((valueCells) => {
			const valueOptions = toPathOptions(valueCells, options.value, fieldNames.value);
			const label = mergedDisplayRender(valueOptions.map(({ option, value: value$1 }) => option?.[fieldNames.value.label] ?? value$1), valueOptions.map(({ option }) => option));
			const value = toPathKey(valueCells);
			return {
				label,
				value,
				key: value,
				valueCells,
				disabled: valueOptions[valueOptions.length - 1]?.option?.disabled
			};
		});
	});
};
export { useDisplayValues_default as default };
