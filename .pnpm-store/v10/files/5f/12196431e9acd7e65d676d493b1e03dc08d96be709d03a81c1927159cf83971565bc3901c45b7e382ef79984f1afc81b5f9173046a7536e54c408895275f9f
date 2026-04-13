//#region src/theme/ThemeCache.ts
function sameDerivativeOption(left, right) {
	if (left.length !== right.length) return false;
	for (let i = 0; i < left.length; i++) if (left[i] !== right[i]) return false;
	return true;
}
var ThemeCache = class ThemeCache {
	static MAX_CACHE_SIZE = 20;
	static MAX_CACHE_OFFSET = 5;
	cache;
	keys;
	cacheCallTimes;
	constructor() {
		this.cache = /* @__PURE__ */ new Map();
		this.keys = [];
		this.cacheCallTimes = 0;
	}
	size() {
		return this.keys.length;
	}
	internalGet(derivativeOption, updateCallTimes = false) {
		let cache = { map: this.cache };
		derivativeOption.forEach((derivative) => {
			if (!cache) cache = void 0;
			else cache = cache?.map?.get(derivative);
		});
		if (cache?.value && updateCallTimes) cache.value[1] = this.cacheCallTimes++;
		return cache?.value;
	}
	get(derivativeOption) {
		return this.internalGet(derivativeOption, true)?.[0];
	}
	has(derivativeOption) {
		return !!this.internalGet(derivativeOption);
	}
	set(derivativeOption, value) {
		if (!this.has(derivativeOption)) {
			if (this.size() + 1 > ThemeCache.MAX_CACHE_SIZE + ThemeCache.MAX_CACHE_OFFSET) {
				const [targetKey] = this.keys.reduce((result, key) => {
					const [, callTimes] = result;
					if (this.internalGet(key)[1] < callTimes) return [key, this.internalGet(key)[1]];
					return result;
				}, [this.keys[0], this.cacheCallTimes]);
				this.delete(targetKey);
			}
			this.keys.push(derivativeOption);
		}
		let cache = this.cache;
		derivativeOption.forEach((derivative, index) => {
			if (index === derivativeOption.length - 1) cache.set(derivative, { value: [value, this.cacheCallTimes++] });
			else {
				const cacheValue = cache.get(derivative);
				if (!cacheValue) cache.set(derivative, { map: /* @__PURE__ */ new Map() });
				else if (!cacheValue.map) cacheValue.map = /* @__PURE__ */ new Map();
				cache = cache.get(derivative).map;
			}
		});
	}
	deleteByPath(currentCache, derivatives) {
		const cache = currentCache.get(derivatives[0]);
		if (derivatives.length === 1) {
			if (!cache.map) currentCache.delete(derivatives[0]);
			else currentCache.set(derivatives[0], { map: cache.map });
			return cache.value?.[0];
		}
		const result = this.deleteByPath(cache.map, derivatives.slice(1));
		if ((!cache.map || cache.map.size === 0) && !cache.value) currentCache.delete(derivatives[0]);
		return result;
	}
	delete(derivativeOption) {
		if (this.has(derivativeOption)) {
			this.keys = this.keys.filter((item) => !sameDerivativeOption(item, derivativeOption));
			return this.deleteByPath(this.cache, derivativeOption);
		}
	}
};

//#endregion
export { ThemeCache as default, sameDerivativeOption };