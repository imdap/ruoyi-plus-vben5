// runner.js
import { resolve } from "node:path";
import { createSyncFn } from "synckit";
import { getWorkerOptions } from "../async-utils/worker.js";
export let getCustomComponentClasses = () => { throw new Error("getCustomComponentClasses() called before being initialized"); };
export function createGetCustomComponentClasses(ctx) {
    const workerPath = getWorkerPath(ctx);
    const workerOptions = getWorkerOptions();
    const runWorker = createSyncFn(workerPath, workerOptions);
    getCustomComponentClasses = ctx => runWorker("getCustomComponentClasses", ctx);
    return getCustomComponentClasses;
}
function getWorkerPath(ctx) {
    return resolve(import.meta.dirname, `./tailwind.async.worker.v${ctx.version.major}.js`);
}
//# sourceMappingURL=custom-component-classes.js.map