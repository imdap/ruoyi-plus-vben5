import { createAnimationsFromSequence } from "../sequence/create.mjs";
import { animateSubject } from "./subject.mjs";
import { spring } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/animation/generators/spring/index.mjs";
function animateSequence(sequence, options, scope) {
  const animations = [];
  const animationDefinitions = createAnimationsFromSequence(sequence, options, scope, { spring });
  animationDefinitions.forEach(({ keyframes, transition }, subject) => {
    animations.push(...animateSubject(subject, keyframes, transition));
  });
  return animations;
}
export {
  animateSequence
};
