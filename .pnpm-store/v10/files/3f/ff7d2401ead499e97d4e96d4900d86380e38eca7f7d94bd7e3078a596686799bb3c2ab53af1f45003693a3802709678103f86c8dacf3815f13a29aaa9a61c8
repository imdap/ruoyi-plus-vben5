// runner.js
import { resolve } from "node:path";
import { createSyncFn } from "synckit";
import { getWorkerOptions } from "../async-utils/worker.js";
export let getConflictingClasses = () => { throw new Error("getConflictingClasses() called before being initialized"); };
export function createGetConflictingClasses(ctx) {
    const workerPath = getWorkerPath(ctx);
    const workerOptions = getWorkerOptions();
    const runWorker = createSyncFn(workerPath, workerOptions);
    getConflictingClasses = (ctx, classes) => runWorker("getConflictingClasses", ctx, classes);
    return getConflictingClasses;
}
function getWorkerPath(ctx) {
    return resolve(import.meta.dirname, `./tailwind.async.worker.v${ctx.version.major}.js`);
}
//# sourceMappingURL=conflicting-classes.js.map