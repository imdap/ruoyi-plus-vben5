import { parentPort, workerData } from "node:worker_threads";
import { createCSpellRPCServer } from "cspell-lib/cspell-rpc/server";
//#region src/worker.ts
if (parentPort) createCSpellRPCServer({ port: workerData?.port || parentPort });
//#endregion
export {};

//# sourceMappingURL=worker.js.map