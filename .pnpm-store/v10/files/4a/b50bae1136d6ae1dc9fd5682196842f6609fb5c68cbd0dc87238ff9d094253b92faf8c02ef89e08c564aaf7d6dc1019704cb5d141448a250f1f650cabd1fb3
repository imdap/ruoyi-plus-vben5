import { resolve } from "node:path";
import { createSyncFn } from "synckit";
import { getWorkerOptions } from "../async-utils/worker.js";
export let getDissectedClasses = () => { throw new Error("getDissectedClasses() called before being initialized"); };
export function createGetDissectedClasses(ctx) {
    const workerPath = getWorkerPath(ctx);
    const workerOptions = getWorkerOptions();
    const runWorker = createSyncFn(workerPath, workerOptions);
    getDissectedClasses = (ctx, classes) => runWorker("getDissectedClasses", ctx, classes);
    return getDissectedClasses;
}
function getWorkerPath(ctx) {
    return resolve(import.meta.dirname, `./tailwind.async.worker.v${ctx.version.major}.js`);
}
//# sourceMappingURL=dissect-classes.js.map