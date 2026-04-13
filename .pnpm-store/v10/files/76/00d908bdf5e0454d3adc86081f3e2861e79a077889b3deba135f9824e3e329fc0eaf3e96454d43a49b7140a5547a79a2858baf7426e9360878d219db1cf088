import { isWillChangeMotionValue } from "./is.mjs";
function addValueToWillChange(visualElement, key) {
  const willChange = visualElement.getValue("willChange");
  if (isWillChangeMotionValue(willChange)) {
    return willChange.add(key);
  }
}
export {
  addValueToWillChange
};
