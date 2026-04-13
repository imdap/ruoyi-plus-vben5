//#region src/runtime/utils.ts
function get(obj, path) {
	if (obj == null) return void 0;
	let value = obj;
	for (let i = 0; i < path.length; i++) {
		if (value === void 0 || value[path[i]] === void 0) return void 0;
		if (value === null || value[path[i]] === null) return null;
		value = value[path[i]];
	}
	return value;
}
function set(obj, value, path) {
	if (path.length === 0) return value;
	const idx = path[0];
	if (path.length > 1) value = set(typeof obj !== "object" || obj === null || !Object.prototype.hasOwnProperty.call(obj, idx) ? Number.isInteger(Number(path[1])) ? [] : {} : obj[idx], value, Array.prototype.slice.call(path, 1));
	if (Number.isInteger(Number(idx)) && Array.isArray(obj)) return obj.slice()[idx];
	return Object.assign({}, obj, { [idx]: value });
}
function unset(obj, path) {
	if (obj == null || path.length === 0) return obj;
	if (path.length === 1) {
		if (obj == null) return obj;
		if (Number.isInteger(path[0]) && Array.isArray(obj)) return Array.prototype.slice.call(obj, 0).splice(path[0], 1);
		const result = {};
		for (const p in obj) result[p] = obj[p];
		delete result[path[0]];
		return result;
	}
	if (obj[path[0]] == null) {
		if (Number.isInteger(path[0]) && Array.isArray(obj)) return Array.prototype.concat.call([], obj);
		const result = {};
		for (const p in obj) result[p] = obj[p];
		return result;
	}
	return set(obj, unset(obj[path[0]], Array.prototype.slice.call(path, 1)), [path[0]]);
}
function deepPick(obj, paths) {
	return paths.map((p) => p.split(".")).map((p) => [p, get(obj, p)]).filter((t) => t[1] !== void 0).reduce((acc, cur) => set(acc, cur[1], cur[0]), {});
}
function deepOmit(obj, paths) {
	return paths.map((p) => p.split(".")).reduce((acc, cur) => unset(acc, cur), obj);
}

//#endregion
//#region src/runtime/core.ts
function hydrateStore(store, { storage, serializer, key, debug, pick, omit, beforeHydrate, afterHydrate }, context, runHooks = true) {
	try {
		if (runHooks) beforeHydrate?.(context);
		const fromStorage = storage.getItem(key);
		if (fromStorage) {
			const deserialized = serializer.deserialize(fromStorage);
			const picked = pick ? deepPick(deserialized, pick) : deserialized;
			const omitted = omit ? deepOmit(picked, omit) : picked;
			store.$patch(omitted);
		}
		if (runHooks) afterHydrate?.(context);
	} catch (error) {
		if (debug) console.error("[pinia-plugin-persistedstate]", error);
	}
}
function persistState(state, { storage, serializer, key, debug, pick, omit }) {
	try {
		const picked = pick ? deepPick(state, pick) : state;
		const omitted = omit ? deepOmit(picked, omit) : picked;
		const toStorage = serializer.serialize(omitted);
		storage.setItem(key, toStorage);
	} catch (error) {
		if (debug) console.error("[pinia-plugin-persistedstate]", error);
	}
}
function parsePersistKey(key, storeId) {
	return typeof key === "function" ? key(storeId) : typeof key === "string" ? key : storeId;
}
function createPersistence(context, optionsParser, auto) {
	const { pinia, store, options: { persist = auto } } = context;
	if (!persist) return;
	// v8 ignore if -- @preserve
	if (!(store.$id in pinia.state.value)) {
		const originalStore = pinia._s.get(store.$id.replace("__hot:", ""));
		if (originalStore) Promise.resolve().then(() => originalStore.$persist());
		return;
	}
	const persistences = (Array.isArray(persist) ? persist : persist === true ? [{}] : [persist]).map(optionsParser);
	store.$hydrate = ({ runHooks = true } = {}) => {
		persistences.forEach((p) => {
			hydrateStore(store, p, context, runHooks);
		});
	};
	store.$persist = () => {
		persistences.forEach((p) => {
			persistState(store.$state, p);
		});
	};
	persistences.forEach((p) => {
		hydrateStore(store, p, context);
		store.$subscribe((_mutation, state) => persistState(state, p), { detached: true });
	});
}

//#endregion
//#region src/index.ts
/**
* Create a Pinia persistence plugin.
* @see https://codeberg.org/praz/pinia-plugin-persistedstate
*/
function createPersistedState(options = {}) {
	return function(context) {
		createPersistence(context, (p) => {
			const persistKey = parsePersistKey(p.key, context.store.$id);
			return {
				key: (options.key ? options.key : (x) => x)(persistKey),
				debug: p.debug ?? options.debug ?? false,
				serializer: p.serializer ?? options.serializer ?? {
					serialize: (data) => JSON.stringify(data),
					deserialize: (data) => JSON.parse(data)
				},
				storage: p.storage ?? options.storage ?? window.localStorage,
				beforeHydrate: p.beforeHydrate ?? options.beforeHydrate,
				afterHydrate: p.afterHydrate ?? options.afterHydrate,
				pick: p.pick,
				omit: p.omit
			};
		}, options.auto ?? false);
	};
}
/**
* Pinia plugin to persist stores.
* @see https://codeberg.org/praz/pinia-plugin-persistedstate
*/
var src_default = createPersistedState();

//#endregion
export { createPersistedState, src_default as default };