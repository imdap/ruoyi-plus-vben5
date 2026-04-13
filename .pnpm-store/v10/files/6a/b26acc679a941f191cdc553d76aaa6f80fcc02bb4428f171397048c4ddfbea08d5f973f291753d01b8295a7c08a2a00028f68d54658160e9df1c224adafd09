import { animateSequence } from "./sequence.mjs";
import { animateSubject } from "./subject.mjs";
import { GroupAnimationWithThen } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs";
import { removeItem } from "../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/array.mjs";
function isSequence(value) {
  return Array.isArray(value) && value.some(Array.isArray);
}
function createScopedAnimate(scope) {
  function scopedAnimate(subjectOrSequence, optionsOrKeyframes, options) {
    let animations = [];
    let animationOnComplete;
    if (isSequence(subjectOrSequence)) {
      animations = animateSequence(subjectOrSequence, optionsOrKeyframes, scope);
    } else {
      const { onComplete, ...rest } = options || {};
      if (typeof onComplete === "function") {
        animationOnComplete = onComplete;
      }
      animations = animateSubject(subjectOrSequence, optionsOrKeyframes, rest, scope);
    }
    const animation = new GroupAnimationWithThen(animations);
    if (animationOnComplete) {
      animation.finished.then(animationOnComplete);
    }
    if (scope) {
      scope.animations.push(animation);
      animation.finished.then(() => {
        removeItem(scope.animations, animation);
      });
    }
    return animation;
  }
  return scopedAnimate;
}
const animate = createScopedAnimate();
export {
  animate,
  createScopedAnimate
};
