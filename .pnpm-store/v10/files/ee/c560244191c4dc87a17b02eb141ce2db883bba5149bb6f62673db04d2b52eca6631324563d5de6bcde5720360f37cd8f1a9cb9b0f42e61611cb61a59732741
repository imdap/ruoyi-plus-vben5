import { microtask } from "../frameloop/microtask.mjs";
import { startViewAnimation } from "./start.mjs";
import { removeItem } from "../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/array.mjs";
let builders = [];
let current = null;
function next() {
  current = null;
  const [nextBuilder] = builders;
  if (nextBuilder)
    start(nextBuilder);
}
function start(builder) {
  removeItem(builders, builder);
  current = builder;
  startViewAnimation(builder).then((animation) => {
    builder.notifyReady(animation);
    animation.finished.finally(next);
  });
}
function processQueue() {
  var _a;
  for (let i = builders.length - 1; i >= 0; i--) {
    const builder = builders[i];
    const { interrupt } = builder.options;
    if (interrupt === "immediate") {
      const batchedUpdates = builders.slice(0, i + 1).map((b) => b.update);
      const remaining = builders.slice(i + 1);
      builder.update = () => {
        batchedUpdates.forEach((update) => update());
      };
      builders = [builder, ...remaining];
      break;
    }
  }
  if (!current || ((_a = builders[0]) == null ? void 0 : _a.options.interrupt) === "immediate") {
    next();
  }
}
function addToQueue(builder) {
  builders.push(builder);
  microtask.render(processQueue);
}
export {
  addToQueue
};
