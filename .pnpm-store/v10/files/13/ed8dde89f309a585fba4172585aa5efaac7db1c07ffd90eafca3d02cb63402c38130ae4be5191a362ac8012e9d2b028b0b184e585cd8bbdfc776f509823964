import { resolve } from "node:path";
import { createSyncFn } from "synckit";
import { getWorkerOptions } from "../async-utils/worker.js";
export let getClassOrder = () => { throw new Error("getClassOrder() called before being initialized"); };
export function createGetClassOrder(ctx) {
    const workerPath = getWorkerPath(ctx);
    const workerOptions = getWorkerOptions();
    const runWorker = createSyncFn(workerPath, workerOptions);
    getClassOrder = (ctx, classes) => runWorker("getClassOrder", ctx, classes);
    return getClassOrder;
}
function getWorkerPath(ctx) {
    return resolve(import.meta.dirname, `./tailwind.async.worker.v${ctx.version.major}.js`);
}
//# sourceMappingURL=class-order.js.map