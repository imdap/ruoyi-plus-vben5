import { animateElements } from "./animate-elements.mjs";
import { GroupAnimationWithThen } from "../../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs";
const createScopedWaapiAnimate = (scope) => {
  function scopedAnimate(elementOrSelector, keyframes, options) {
    return new GroupAnimationWithThen(animateElements(elementOrSelector, keyframes, options, scope));
  }
  return scopedAnimate;
};
const animateMini = /* @__PURE__ */ createScopedWaapiAnimate();
export {
  animateMini,
  createScopedWaapiAnimate
};
