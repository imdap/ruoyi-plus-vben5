import { VALUE_SPLIT } from "../utils/commonUtil.js";
import { shallowRef } from "vue";
import { convertDataToEntities } from "@v-c/tree";
function useEntities(options, fieldNames) {
	const cacheRef = shallowRef({
		options: [],
		fieldNames: null,
		info: {
			keyEntities: {},
			pathKeyEntities: {}
		}
	});
	const getEntities = () => {
		const mergedOptions = options.value;
		const mergedFieldNames = fieldNames.value;
		if (cacheRef.value.options !== mergedOptions || cacheRef.value.fieldNames !== mergedFieldNames) {
			cacheRef.value.options = mergedOptions;
			cacheRef.value.fieldNames = mergedFieldNames;
			cacheRef.value.info = convertDataToEntities(mergedOptions, {
				fieldNames: mergedFieldNames,
				initWrapper: (wrapper) => ({
					...wrapper,
					pathKeyEntities: {}
				}),
				processEntity: (entity, wrapper) => {
					const pathKey = entity.nodes.map((node) => node[mergedFieldNames.value]).join(VALUE_SPLIT);
					wrapper.pathKeyEntities[pathKey] = entity;
					entity.key = pathKey;
				}
			});
		}
		return cacheRef.value.info.pathKeyEntities;
	};
	return getEntities;
}
export { useEntities as default };
