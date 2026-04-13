//#region src/shared/object.ts
function pick(object, keys) {
	return Object.assign({}, ...keys.map((key) => {
		if (object && Object.hasOwn(object, key)) return { [key]: object[key] };
	}));
}
function omit(obj, ...keys) {
	keys.forEach((key) => delete obj[key]);
	return obj;
}

//#endregion
export { omit, pick };
//# sourceMappingURL=object.js.map