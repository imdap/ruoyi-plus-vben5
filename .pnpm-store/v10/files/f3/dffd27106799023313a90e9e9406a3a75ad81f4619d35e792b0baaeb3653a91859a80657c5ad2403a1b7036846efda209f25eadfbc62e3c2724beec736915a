import get from "./get.js";
function internalSet(entity, paths, value, removeIfUndefined) {
	if (!paths.length) return value;
	const [path, ...restPath] = paths;
	let clone;
	if (!entity && typeof path === "number") clone = [];
	else if (Array.isArray(entity)) clone = [...entity];
	else clone = { ...entity };
	if (removeIfUndefined && value === void 0 && restPath.length === 1) delete clone[path][restPath[0]];
	else clone[path] = internalSet(clone[path], restPath, value, removeIfUndefined);
	return clone;
}
function set(entity, paths, value, removeIfUndefined = false) {
	if (paths.length && removeIfUndefined && value === void 0 && !get(entity, paths.slice(0, -1))) return entity;
	return internalSet(entity, paths, value, removeIfUndefined);
}
function isObject(obj) {
	return typeof obj === "object" && obj !== null && Object.getPrototypeOf(obj) === Object.prototype;
}
function createEmpty(source) {
	return Array.isArray(source) ? [] : {};
}
var keys = typeof Reflect === "undefined" ? Object.keys : Reflect.ownKeys;
function mergeWith(sources, config = {}) {
	const { prepareArray } = config;
	const finalPrepareArray = prepareArray || (() => []);
	let clone = createEmpty(sources[0]);
	sources.forEach((src) => {
		function internalMerge(path, parentLoopSet) {
			const loopSet = new Set(parentLoopSet);
			const value = get(src, path);
			const isArr = Array.isArray(value);
			if (isArr || isObject(value)) {
				if (!loopSet.has(value)) {
					loopSet.add(value);
					const originValue = get(clone, path);
					if (isArr) clone = set(clone, path, finalPrepareArray(originValue, value));
					else if (!originValue || typeof originValue !== "object") clone = set(clone, path, createEmpty(value));
					keys(value).forEach((key) => {
						if (Object?.getOwnPropertyDescriptor?.(value, key)?.enumerable) internalMerge([...path, key], loopSet);
					});
				}
			} else clone = set(clone, path, value);
		}
		internalMerge([]);
	});
	return clone;
}
function merge(...sources) {
	return mergeWith(sources);
}
export { set as default, isObject, merge, mergeWith };
