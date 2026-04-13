import { isDOMKeyframes } from "../utils/is-dom-keyframes.mjs";
import { resolveElements } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/utils/resolve-elements.mjs";
function resolveSubjects(subject, keyframes, scope, selectorCache) {
  if (typeof subject === "string" && isDOMKeyframes(keyframes)) {
    return resolveElements(subject, scope, selectorCache);
  } else if (subject instanceof NodeList) {
    return Array.from(subject);
  } else if (Array.isArray(subject)) {
    return subject;
  } else {
    return [subject];
  }
}
export {
  resolveSubjects
};
