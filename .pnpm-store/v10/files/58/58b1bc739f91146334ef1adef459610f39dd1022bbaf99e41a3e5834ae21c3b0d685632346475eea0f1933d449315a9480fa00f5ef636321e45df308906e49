import { anticipate } from "../../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/easing/anticipate.mjs";
import { backInOut } from "../../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/easing/back.mjs";
import { circInOut } from "../../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/easing/circ.mjs";
const unsupportedEasingFunctions = {
  anticipate,
  backInOut,
  circInOut
};
function isUnsupportedEase(key) {
  return key in unsupportedEasingFunctions;
}
function replaceStringEasing(transition) {
  if (typeof transition.ease === "string" && isUnsupportedEase(transition.ease)) {
    transition.ease = unsupportedEasingFunctions[transition.ease];
  }
}
export {
  replaceStringEasing
};
