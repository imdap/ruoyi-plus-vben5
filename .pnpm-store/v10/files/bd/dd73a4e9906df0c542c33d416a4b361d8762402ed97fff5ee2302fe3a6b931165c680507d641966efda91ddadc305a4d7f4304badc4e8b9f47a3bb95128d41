import useEntities from "./useEntities.js";
import { computed } from "vue";
function useOptions(mergedFieldNames, options) {
	const emptyOptions = [];
	const mergedOptions = computed(() => options.value || emptyOptions);
	const getPathKeyEntities = useEntities(mergedOptions, mergedFieldNames);
	const getValueByKeyPath = (pathKeys) => {
		const keyPathEntities = getPathKeyEntities();
		return pathKeys.map((pathKey) => {
			const { nodes } = keyPathEntities[pathKey];
			return nodes.map((node) => node[mergedFieldNames.value.value]);
		});
	};
	return [
		mergedOptions,
		getPathKeyEntities,
		getValueByKeyPath
	];
}
export { useOptions as default };
