import { resolve } from "node:path";
import { createSyncFn } from "synckit";
import { getWorkerOptions } from "../async-utils/worker.js";
export let getVariantOrder = () => { throw new Error("getVariantOrder() called before being initialized"); };
export function createGetVariantOrder(ctx) {
    const workerPath = getWorkerPath(ctx);
    const workerOptions = getWorkerOptions();
    const runWorker = createSyncFn(workerPath, workerOptions);
    getVariantOrder = (ctx, classes) => runWorker("getVariantOrder", ctx, classes);
    return getVariantOrder;
}
function getWorkerPath(ctx) {
    return resolve(import.meta.dirname, `./tailwind.async.worker.v${ctx.version.major}.js`);
}
//# sourceMappingURL=variant-order.js.map