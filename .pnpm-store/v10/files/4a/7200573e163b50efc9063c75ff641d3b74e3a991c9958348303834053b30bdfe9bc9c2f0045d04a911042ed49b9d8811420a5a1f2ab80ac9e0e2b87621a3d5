//#region src/cssinjs-utils/_util/hooks/useUniqueMemo.ts
const BEAT_LIMIT = 1e3 * 60 * 10;
var ArrayKeyMap = class {
	map = /* @__PURE__ */ new Map();
	objectIDMap = /* @__PURE__ */ new WeakMap();
	lastAccessBeat = /* @__PURE__ */ new Map();
	nextID = 0;
	accessBeat = 0;
	set(keys, value) {
		this.clear();
		const compositeKey = this.getCompositeKey(keys);
		this.map.set(compositeKey, value);
		this.lastAccessBeat.set(compositeKey, Date.now());
	}
	get(keys) {
		const compositeKey = this.getCompositeKey(keys);
		const cache = this.map.get(compositeKey);
		if (cache !== void 0) this.lastAccessBeat.set(compositeKey, Date.now());
		this.accessBeat += 1;
		return cache;
	}
	getCompositeKey(keys) {
		return keys.map((key) => {
			if (key && typeof key === "object") return `obj_${this.getObjectID(key)}`;
			return `${typeof key}_${String(key)}`;
		}).join("|");
	}
	getObjectID(obj) {
		if (this.objectIDMap.has(obj)) return this.objectIDMap.get(obj);
		const id = this.nextID;
		this.objectIDMap.set(obj, id);
		this.nextID += 1;
		return id;
	}
	clear() {
		if (this.accessBeat > 1e4) {
			const now = Date.now();
			this.lastAccessBeat.forEach((beat, key) => {
				if (now - beat > BEAT_LIMIT) {
					this.map.delete(key);
					this.lastAccessBeat.delete(key);
				}
			});
			this.accessBeat = 0;
		}
	}
};
const uniqueMap = new ArrayKeyMap();
/**
* Shared memoization helper across component instances.
*/
function useUniqueMemo(memoFn, deps) {
	const cachedValue = uniqueMap.get(deps);
	if (cachedValue !== void 0) return cachedValue;
	const newValue = memoFn();
	uniqueMap.set(deps, newValue);
	return newValue;
}
var useUniqueMemo_default = useUniqueMemo;

//#endregion
export { useUniqueMemo_default as default };