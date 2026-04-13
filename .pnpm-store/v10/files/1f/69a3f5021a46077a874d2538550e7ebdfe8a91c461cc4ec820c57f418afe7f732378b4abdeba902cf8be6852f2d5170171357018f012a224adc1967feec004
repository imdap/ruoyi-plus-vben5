import devWarning from "@v-c/util/dist/warning";

//#region src/linters/utils.ts
function lintWarning(message, info) {
	const { path, parentSelectors } = info;
	devWarning(false, `[Ant Design CSS-in-JS] ${path ? `Error in ${path}: ` : ""}${message}${parentSelectors.length ? ` Selector: ${parentSelectors.join(" | ")}` : ""}`);
}

//#endregion
export { lintWarning };