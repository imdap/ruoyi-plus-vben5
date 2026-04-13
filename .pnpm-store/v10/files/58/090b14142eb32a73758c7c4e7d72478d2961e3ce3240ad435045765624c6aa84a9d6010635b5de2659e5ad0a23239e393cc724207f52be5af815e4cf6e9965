import { GroupAnimation } from "../animation/GroupAnimation.mjs";
import { NativeAnimation } from "../animation/NativeAnimation.mjs";
import { NativeAnimationWrapper } from "../animation/NativeAnimationWrapper.mjs";
import { getValueTransition } from "../animation/utils/get-value-transition.mjs";
import { mapEasingToNativeEasing } from "../animation/waapi/easing/map-easing.mjs";
import { applyGeneratorOptions } from "../animation/waapi/utils/apply-generator.mjs";
import { chooseLayerType } from "./utils/choose-layer-type.mjs";
import { css } from "./utils/css.mjs";
import { getViewAnimationLayerInfo } from "./utils/get-layer-info.mjs";
import { getViewAnimations } from "./utils/get-view-animations.mjs";
import { hasTarget } from "./utils/has-target.mjs";
import { secondsToMilliseconds } from "../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/time-conversion.mjs";
const definitionNames = ["layout", "enter", "exit", "new", "old"];
function startViewAnimation(builder) {
  const { update, targets, options: defaultOptions } = builder;
  if (!document.startViewTransition) {
    return new Promise(async (resolve) => {
      await update();
      resolve(new GroupAnimation([]));
    });
  }
  if (!hasTarget("root", targets)) {
    css.set(":root", {
      "view-transition-name": "none"
    });
  }
  css.set("::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*)", { "animation-timing-function": "linear !important" });
  css.commit();
  const transition = document.startViewTransition(async () => {
    await update();
  });
  transition.finished.finally(() => {
    css.remove();
  });
  return new Promise((resolve) => {
    transition.ready.then(() => {
      const generatedViewAnimations = getViewAnimations();
      const animations = [];
      targets.forEach((definition, target) => {
        for (const key of definitionNames) {
          if (!definition[key])
            continue;
          const { keyframes, options } = definition[key];
          for (let [valueName, valueKeyframes] of Object.entries(keyframes)) {
            if (!valueKeyframes)
              continue;
            const valueOptions = {
              ...getValueTransition(defaultOptions, valueName),
              ...getValueTransition(options, valueName)
            };
            const type = chooseLayerType(key);
            if (valueName === "opacity" && !Array.isArray(valueKeyframes)) {
              const initialValue = type === "new" ? 0 : 1;
              valueKeyframes = [initialValue, valueKeyframes];
            }
            if (typeof valueOptions.delay === "function") {
              valueOptions.delay = valueOptions.delay(0, 1);
            }
            valueOptions.duration && (valueOptions.duration = secondsToMilliseconds(valueOptions.duration));
            valueOptions.delay && (valueOptions.delay = secondsToMilliseconds(valueOptions.delay));
            const animation = new NativeAnimation({
              ...valueOptions,
              element: document.documentElement,
              name: valueName,
              pseudoElement: `::view-transition-${type}(${target})`,
              keyframes: valueKeyframes
            });
            animations.push(animation);
          }
        }
      });
      for (const animation of generatedViewAnimations) {
        if (animation.playState === "finished")
          continue;
        const { effect } = animation;
        if (!effect || !(effect instanceof KeyframeEffect))
          continue;
        const { pseudoElement } = effect;
        if (!pseudoElement)
          continue;
        const name = getViewAnimationLayerInfo(pseudoElement);
        if (!name)
          continue;
        const targetDefinition = targets.get(name.layer);
        if (!targetDefinition) {
          const transitionName = name.type === "group" ? "layout" : "";
          let animationTransition = {
            ...getValueTransition(defaultOptions, transitionName)
          };
          animationTransition.duration && (animationTransition.duration = secondsToMilliseconds(animationTransition.duration));
          animationTransition = applyGeneratorOptions(animationTransition);
          const easing = mapEasingToNativeEasing(animationTransition.ease, animationTransition.duration);
          effect.updateTiming({
            delay: secondsToMilliseconds(animationTransition.delay ?? 0),
            duration: animationTransition.duration,
            easing
          });
          animations.push(new NativeAnimationWrapper(animation));
        } else if (hasOpacity(targetDefinition, "enter") && hasOpacity(targetDefinition, "exit") && effect.getKeyframes().some((keyframe) => keyframe.mixBlendMode)) {
          animations.push(new NativeAnimationWrapper(animation));
        } else {
          animation.cancel();
        }
      }
      resolve(new GroupAnimation(animations));
    });
  });
}
function hasOpacity(target, key) {
  var _a;
  return (_a = target == null ? void 0 : target[key]) == null ? void 0 : _a.keyframes.opacity;
}
export {
  startViewAnimation
};
