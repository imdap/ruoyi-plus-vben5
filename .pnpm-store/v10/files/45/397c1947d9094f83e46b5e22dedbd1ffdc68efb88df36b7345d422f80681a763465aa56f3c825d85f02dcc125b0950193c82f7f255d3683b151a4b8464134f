
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
Object.defineProperty(exports, 'omit', {
  enumerable: true,
  get: function () {
    return omit;
  }
});
Object.defineProperty(exports, 'pick', {
  enumerable: true,
  get: function () {
    return pick;
  }
});
//# sourceMappingURL=object.cjs.map