import { collectMotionValues, motionValue } from "./index.mjs";
import { subscribeValue } from "./subscribe-value.mjs";
function transformValue(transform) {
  const collectedValues = [];
  collectMotionValues.current = collectedValues;
  const initialValue = transform();
  collectMotionValues.current = void 0;
  const value = motionValue(initialValue);
  subscribeValue(collectedValues, value, transform);
  return value;
}
export {
  transformValue
};
