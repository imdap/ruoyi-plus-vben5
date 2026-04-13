import { runAsWorker } from "synckit";
import { ESLint } from "eslint";

//#region lib/utils/get-auto-jsonc-rules-config/get-auto-jsonc-rules-config-worker.ts
runAsWorker(async (cwd, fileName) => {
	return { rules: (await new ESLint({ cwd }).calculateConfigForFile(fileName)).rules };
});

//#endregion
export {  };