//#region src/Cache.ts
const SPLIT = "%";
/** Connect key with `SPLIT` */
function pathKey(keys) {
	return keys.join(SPLIT);
}
/** Record update id for extract static style order. */
let updateId = 0;
var Entity = class {
	instanceId;
	constructor(instanceId) {
		this.instanceId = instanceId;
	}
	/** @private Internal cache map. Do not access this directly */
	cache = /* @__PURE__ */ new Map();
	/** @private Record update times for each key */
	updateTimes = /* @__PURE__ */ new Map();
	extracted = /* @__PURE__ */ new Set();
	get(keys) {
		return this.opGet(pathKey(keys));
	}
	/** A fast get cache with `get` concat. */
	opGet(keyPathStr) {
		return this.cache.get(keyPathStr) || null;
	}
	update(keys, valueFn) {
		return this.opUpdate(pathKey(keys), valueFn);
	}
	/** A fast get cache with `get` concat. */
	opUpdate(keyPathStr, valueFn) {
		const nextValue = valueFn(this.cache.get(keyPathStr));
		if (nextValue === null) {
			this.cache.delete(keyPathStr);
			this.updateTimes.delete(keyPathStr);
		} else {
			this.cache.set(keyPathStr, nextValue);
			this.updateTimes.set(keyPathStr, updateId);
			updateId += 1;
		}
	}
};
var Cache_default = Entity;

//#endregion
export { Cache_default as default, pathKey };