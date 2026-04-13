import { resolve } from "node:path";
import { createSyncFn } from "synckit";
import { getWorkerOptions } from "../async-utils/worker.js";
export let getUnknownClasses = () => { throw new Error("getUnknownClasses() called before being initialized"); };
export function createGetUnknownClasses(ctx) {
    const workerPath = getWorkerPath(ctx);
    const workerOptions = getWorkerOptions();
    const runWorker = createSyncFn(workerPath, workerOptions);
    getUnknownClasses = (ctx, classes) => runWorker("getUnknownClasses", ctx, classes);
    return getUnknownClasses;
}
function getWorkerPath(ctx) {
    return resolve(import.meta.dirname, `./tailwind.async.worker.v${ctx.version.major}.js`);
}
//# sourceMappingURL=unknown-classes.js.map