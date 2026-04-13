import { isNil } from "../utils/valueUtil.js";
import { shallowRef, watchEffect } from "vue";
import { convertDataToEntities } from "@v-c/tree";
import { warning } from "@v-c/util";
function useDataEntities(treeData, fieldNames) {
	const valueEntities = shallowRef(/* @__PURE__ */ new Map());
	const keyEntities = shallowRef({});
	watchEffect(() => {
		const mergedFieldNames = fieldNames.value;
		const collection = convertDataToEntities(treeData.value, {
			fieldNames: mergedFieldNames,
			initWrapper: (wrapper) => ({
				...wrapper,
				valueEntities: /* @__PURE__ */ new Map()
			}),
			processEntity: (entity, wrapper) => {
				const val = entity.node[mergedFieldNames.value];
				if (process.env.NODE_ENV !== "production") {
					const key = entity.node.key;
					warning(!isNil(val), "TreeNode `value` is invalidate: undefined");
					warning(!wrapper.valueEntities.has(val), `Same \`value\` exist in the tree: ${val}`);
					warning(!key || String(key) === String(val), `\`key\` or \`value\` with TreeNode must be the same or you can remove one of them. key: ${key}, value: ${val}.`);
				}
				wrapper.valueEntities.set(val, entity);
			}
		});
		keyEntities.value = collection.keyEntities;
		valueEntities.value = collection.valueEntities;
	});
	return {
		valueEntities,
		keyEntities
	};
}
export { useDataEntities as default };
