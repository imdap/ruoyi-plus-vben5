import { animateMotionValue } from "../interfaces/motion-value.mjs";
import { isMotionValue } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/value/utils/is-motion-value.mjs";
import { motionValue } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/value/index.mjs";
function animateSingleValue(value, keyframes, options) {
  const motionValue$1 = isMotionValue(value) ? value : motionValue(value);
  motionValue$1.start(animateMotionValue("", motionValue$1, keyframes, options));
  return motionValue$1.animation;
}
export {
  animateSingleValue
};
