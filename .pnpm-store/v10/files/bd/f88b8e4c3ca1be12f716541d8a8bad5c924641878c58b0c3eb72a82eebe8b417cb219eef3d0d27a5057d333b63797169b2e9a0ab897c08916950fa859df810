import { resolveElements } from "../../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/utils/resolve-elements.mjs";
import { invariant } from "../../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/errors.mjs";
import { getValueTransition } from "../../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/animation/utils/get-value-transition.mjs";
import { getAnimationMap, animationMapKey } from "../../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/animation/utils/active-animations.mjs";
import { getComputedStyle } from "../../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/render/dom/style-computed.mjs";
import { fillWildcards } from "../../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs";
import { applyPxDefaults } from "../../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/animation/keyframes/utils/apply-px-defaults.mjs";
import { NativeAnimation } from "../../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/animation/NativeAnimation.mjs";
import { secondsToMilliseconds } from "../../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/time-conversion.mjs";
function animateElements(elementOrSelector, keyframes, options, scope) {
  const elements = resolveElements(elementOrSelector, scope);
  const numElements = elements.length;
  invariant(Boolean(numElements), "No valid elements provided.", "no-valid-elements");
  const animationDefinitions = [];
  for (let i = 0; i < numElements; i++) {
    const element = elements[i];
    const elementTransition = { ...options };
    if (typeof elementTransition.delay === "function") {
      elementTransition.delay = elementTransition.delay(i, numElements);
    }
    for (const valueName in keyframes) {
      let valueKeyframes = keyframes[valueName];
      if (!Array.isArray(valueKeyframes)) {
        valueKeyframes = [valueKeyframes];
      }
      const valueOptions = {
        ...getValueTransition(elementTransition, valueName)
      };
      valueOptions.duration && (valueOptions.duration = secondsToMilliseconds(valueOptions.duration));
      valueOptions.delay && (valueOptions.delay = secondsToMilliseconds(valueOptions.delay));
      const map = getAnimationMap(element);
      const key = animationMapKey(valueName, valueOptions.pseudoElement || "");
      const currentAnimation = map.get(key);
      currentAnimation && currentAnimation.stop();
      animationDefinitions.push({
        map,
        key,
        unresolvedKeyframes: valueKeyframes,
        options: {
          ...valueOptions,
          element,
          name: valueName,
          allowFlatten: !elementTransition.type && !elementTransition.ease
        }
      });
    }
  }
  for (let i = 0; i < animationDefinitions.length; i++) {
    const { unresolvedKeyframes, options: animationOptions } = animationDefinitions[i];
    const { element, name, pseudoElement } = animationOptions;
    if (!pseudoElement && unresolvedKeyframes[0] === null) {
      unresolvedKeyframes[0] = getComputedStyle(element, name);
    }
    fillWildcards(unresolvedKeyframes);
    applyPxDefaults(unresolvedKeyframes, name);
    if (!pseudoElement && unresolvedKeyframes.length < 2) {
      unresolvedKeyframes.unshift(getComputedStyle(element, name));
    }
    animationOptions.keyframes = unresolvedKeyframes;
  }
  const animations = [];
  for (let i = 0; i < animationDefinitions.length; i++) {
    const { map, key, options: animationOptions } = animationDefinitions[i];
    const animation = new NativeAnimation(animationOptions);
    map.set(key, animation);
    animation.finished.finally(() => map.delete(key));
    animations.push(animation);
  }
  return animations;
}
export {
  animateElements
};
