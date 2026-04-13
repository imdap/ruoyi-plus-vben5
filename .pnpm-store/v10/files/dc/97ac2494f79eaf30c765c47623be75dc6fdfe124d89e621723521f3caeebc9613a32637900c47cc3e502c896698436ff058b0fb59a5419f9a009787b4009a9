import { resolve } from "node:path";
import { createSyncFn } from "synckit";
import { getWorkerOptions } from "../async-utils/worker.js";
export let getCanonicalClasses = () => { throw new Error("getCanonicalClasses() called before being initialized"); };
export function createGetCanonicalClasses(ctx) {
    const workerPath = getWorkerPath(ctx);
    const workerOptions = getWorkerOptions();
    const runWorker = createSyncFn(workerPath, workerOptions);
    getCanonicalClasses = (ctx, classes, options) => runWorker("getCanonicalClasses", ctx, classes, options);
    return getCanonicalClasses;
}
function getWorkerPath(ctx) {
    return resolve(import.meta.dirname, `./tailwind.async.worker.v${ctx.version.major}.js`);
}
//# sourceMappingURL=canonical-classes.js.map