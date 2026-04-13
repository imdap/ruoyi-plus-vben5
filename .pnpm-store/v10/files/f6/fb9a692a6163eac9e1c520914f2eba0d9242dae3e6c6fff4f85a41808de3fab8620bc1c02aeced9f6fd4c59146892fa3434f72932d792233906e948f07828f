//#region src/_util/transKeys.ts
function groupKeysMap(keys) {
	const map = /* @__PURE__ */ new Map();
	keys.forEach((key, index) => {
		map.set(key, index);
	});
	return map;
}
function groupDisabledKeysMap(dataSource) {
	const map = /* @__PURE__ */ new Map();
	dataSource.forEach(({ disabled, key }, index) => {
		if (disabled && key !== void 0) map.set(key, index);
	});
	return map;
}

//#endregion
export { groupDisabledKeysMap, groupKeysMap };