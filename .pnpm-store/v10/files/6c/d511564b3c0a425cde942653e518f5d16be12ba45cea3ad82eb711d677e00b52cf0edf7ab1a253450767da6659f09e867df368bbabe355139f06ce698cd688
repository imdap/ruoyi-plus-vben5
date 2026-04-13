import { globalConfig } from "../config-provider/index.js";
import { getCurrentInstance } from "vue";

//#region src/_util/instance.ts
function getVueInstance() {
	const instance = getCurrentInstance();
	const global = globalConfig();
	if (!instance) return global.appContext ?? null;
	return instance.appContext;
}

//#endregion
export { getVueInstance };