import { getFinalKeyframe } from "../animators/waapi/utils/get-final-keyframe.mjs";
import { getDefaultTransition } from "../utils/default-transitions.mjs";
import { isTransitionDefined } from "../utils/is-transition-defined.mjs";
import { getValueTransition } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/animation/utils/get-value-transition.mjs";
import { secondsToMilliseconds } from "../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/time-conversion.mjs";
import { makeAnimationInstant } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/animation/utils/make-animation-instant.mjs";
import { MotionGlobalConfig } from "../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/global-config.mjs";
import { frame } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/frameloop/frame.mjs";
import { JSAnimation } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/animation/JSAnimation.mjs";
import { AsyncMotionValueAnimation } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs";
const animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
  const valueTransition = getValueTransition(transition, name) || {};
  const delay = valueTransition.delay || transition.delay || 0;
  let { elapsed = 0 } = transition;
  elapsed = elapsed - secondsToMilliseconds(delay);
  const options = {
    keyframes: Array.isArray(target) ? target : [null, target],
    ease: "easeOut",
    velocity: value.getVelocity(),
    ...valueTransition,
    delay: -elapsed,
    onUpdate: (v) => {
      value.set(v);
      valueTransition.onUpdate && valueTransition.onUpdate(v);
    },
    onComplete: () => {
      onComplete();
      valueTransition.onComplete && valueTransition.onComplete();
    },
    name,
    motionValue: value,
    element: isHandoff ? void 0 : element
  };
  if (!isTransitionDefined(valueTransition)) {
    Object.assign(options, getDefaultTransition(name, options));
  }
  options.duration && (options.duration = secondsToMilliseconds(options.duration));
  options.repeatDelay && (options.repeatDelay = secondsToMilliseconds(options.repeatDelay));
  if (options.from !== void 0) {
    options.keyframes[0] = options.from;
  }
  let shouldSkip = false;
  if (options.type === false || options.duration === 0 && !options.repeatDelay) {
    makeAnimationInstant(options);
    if (options.delay === 0) {
      shouldSkip = true;
    }
  }
  if (MotionGlobalConfig.instantAnimations || MotionGlobalConfig.skipAnimations) {
    shouldSkip = true;
    makeAnimationInstant(options);
    options.delay = 0;
  }
  options.allowFlatten = !valueTransition.type && !valueTransition.ease;
  if (shouldSkip && !isHandoff && value.get() !== void 0) {
    const finalKeyframe = getFinalKeyframe(options.keyframes, valueTransition);
    if (finalKeyframe !== void 0) {
      frame.update(() => {
        options.onUpdate(finalKeyframe);
        options.onComplete();
      });
      return;
    }
  }
  return valueTransition.isSync ? new JSAnimation(options) : new AsyncMotionValueAnimation(options);
};
export {
  animateMotionValue
};
