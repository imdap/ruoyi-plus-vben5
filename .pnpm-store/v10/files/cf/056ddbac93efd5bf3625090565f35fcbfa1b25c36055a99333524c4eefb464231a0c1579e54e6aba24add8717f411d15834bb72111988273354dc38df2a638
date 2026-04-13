import { shallowRef } from "vue";
var CacheMap = class {
	maps;
	id = shallowRef(0);
	diffRecords = /* @__PURE__ */ new Map();
	constructor() {
		this.maps = Object.create(null);
	}
	set(key, value) {
		this.diffRecords.set(key, this.maps[key]);
		this.maps[key] = value;
		this.id.value += 1;
	}
	get(key) {
		return this.maps[key];
	}
	resetRecord() {
		this.diffRecords.clear();
	}
	getRecord() {
		return this.diffRecords;
	}
};
var CacheMap_default = CacheMap;
export { CacheMap_default as default };
