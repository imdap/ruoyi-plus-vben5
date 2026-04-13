//#region src/form/utils/NameMap.ts
const SPLIT = "__@field_split__";
/**
* Convert name path into string to fast the fetch speed of Map.
*/
function normalize(namePath) {
	return namePath.map((cell) => `${typeof cell}:${cell}`).join(SPLIT);
}
/**
* NameMap like a `Map` but accepts `string[]` as key.
*/
var NameMap = class {
	kvs = /* @__PURE__ */ new Map();
	set(key, value) {
		this.kvs.set(normalize(key), value);
	}
	get(key) {
		return this.kvs.get(normalize(key));
	}
	update(key, updater) {
		const next = updater(this.get(key));
		if (!next) this.delete(key);
		else this.set(key, next);
	}
	delete(key) {
		this.kvs.delete(normalize(key));
	}
	map(callback) {
		return [...this.kvs.entries()].map(([key, value]) => {
			return callback({
				key: key.split(SPLIT).map((cell) => {
					const [, type, unit] = cell.match(/^([^:]*):(.*)$/);
					return type === "number" ? Number(unit) : unit;
				}),
				value
			});
		});
	}
	toJSON() {
		const json = {};
		this.map(({ key, value }) => {
			json[key.join(".")] = value;
			return null;
		});
		return json;
	}
};
var NameMap_default = NameMap;

//#endregion
export { NameMap_default as default };