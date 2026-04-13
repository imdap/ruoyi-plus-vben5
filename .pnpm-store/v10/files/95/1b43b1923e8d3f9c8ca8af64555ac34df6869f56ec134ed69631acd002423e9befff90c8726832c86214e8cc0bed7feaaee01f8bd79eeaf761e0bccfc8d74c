import { stepsOrder } from "./order.mjs";
import { frame, cancelFrame } from "./frame.mjs";
const sync = frame;
const cancelSync = stepsOrder.reduce((acc, key) => {
  acc[key] = (process) => cancelFrame(process);
  return acc;
}, {});
export {
  cancelSync,
  sync
};
