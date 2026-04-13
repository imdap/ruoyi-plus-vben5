import { isWillChangeMotionValue } from "./is.mjs";
import { MotionGlobalConfig } from "../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/global-config.mjs";
function addValueToWillChange(visualElement, key) {
  const willChange = visualElement.getValue("willChange");
  if (isWillChangeMotionValue(willChange)) {
    return willChange.add(key);
  } else if (!willChange && MotionGlobalConfig.WillChange) {
    const newWillChange = new MotionGlobalConfig.WillChange("auto");
    visualElement.addValue("willChange", newWillChange);
    newWillChange.add(key);
  }
}
export {
  addValueToWillChange
};
