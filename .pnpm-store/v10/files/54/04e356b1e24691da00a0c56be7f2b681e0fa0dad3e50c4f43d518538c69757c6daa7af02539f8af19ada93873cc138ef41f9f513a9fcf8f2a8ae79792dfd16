import { visualElementStore } from "../../render/store.mjs";
import { animateTarget } from "../interfaces/visual-element-target.mjs";
import { createDOMVisualElement, createObjectVisualElement } from "../utils/create-visual-element.mjs";
import { isDOMKeyframes } from "../utils/is-dom-keyframes.mjs";
import { resolveSubjects } from "./resolve-subjects.mjs";
import { animateSingleValue } from "./single-value.mjs";
import { invariant } from "../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/errors.mjs";
import { isMotionValue } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/value/utils/is-motion-value.mjs";
function isSingleValue(subject, keyframes) {
  return isMotionValue(subject) || typeof subject === "number" || typeof subject === "string" && !isDOMKeyframes(keyframes);
}
function animateSubject(subject, keyframes, options, scope) {
  const animations = [];
  if (isSingleValue(subject, keyframes)) {
    animations.push(animateSingleValue(subject, isDOMKeyframes(keyframes) ? keyframes.default || keyframes : keyframes, options ? options.default || options : options));
  } else {
    const subjects = resolveSubjects(subject, keyframes, scope);
    const numSubjects = subjects.length;
    invariant(Boolean(numSubjects), "No valid elements provided.", "no-valid-elements");
    for (let i = 0; i < numSubjects; i++) {
      const thisSubject = subjects[i];
      invariant(thisSubject !== null, "You're trying to perform an animation on null. Ensure that selectors are correctly finding elements and refs are correctly hydrated.", "animate-null");
      const createVisualElement = thisSubject instanceof Element ? createDOMVisualElement : createObjectVisualElement;
      if (!visualElementStore.has(thisSubject)) {
        createVisualElement(thisSubject);
      }
      const visualElement = visualElementStore.get(thisSubject);
      const transition = { ...options };
      if ("delay" in transition && typeof transition.delay === "function") {
        transition.delay = transition.delay(i, numSubjects);
      }
      animations.push(...animateTarget(visualElement, { ...keyframes, transition }, {}));
    }
  }
  return animations;
}
export {
  animateSubject
};
