//#region src/_util/extendsObject.ts
function mergeProps(...items) {
	const ret = {};
	items.forEach((item) => {
		if (item) Object.keys(item).forEach((key) => {
			if (item[key] !== void 0) ret[key] = item[key];
		});
	});
	return ret;
}
var extendsObject_default = mergeProps;

//#endregion
export { extendsObject_default as default };