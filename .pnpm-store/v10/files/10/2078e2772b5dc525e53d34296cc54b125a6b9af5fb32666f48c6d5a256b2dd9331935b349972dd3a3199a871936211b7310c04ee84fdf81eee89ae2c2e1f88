import { t as createPluginWithCommands } from "./plugin-Dvjr_-Vh.mjs";
import src_default from "./index.mjs";

//#region src/config.ts
function config(options = {}) {
	const plugin = options.commands ? createPluginWithCommands(options) : src_default;
	const { name = "command" } = options;
	return {
		name,
		plugins: { [name]: plugin },
		rules: { [`${name}/command`]: "error" }
	};
}

//#endregion
export { config as default };