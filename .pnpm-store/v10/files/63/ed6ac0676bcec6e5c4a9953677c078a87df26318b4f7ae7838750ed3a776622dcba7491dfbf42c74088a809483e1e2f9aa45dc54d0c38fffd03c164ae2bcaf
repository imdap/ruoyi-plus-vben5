import { calcGeneratorDuration, maxGeneratorDuration } from "./calc-duration.mjs";
import { millisecondsToSeconds } from "../../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/time-conversion.mjs";
function createGeneratorEasing(options, scale = 100, createGenerator) {
  const generator = createGenerator({ ...options, keyframes: [0, scale] });
  const duration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
  return {
    type: "keyframes",
    ease: (progress) => {
      return generator.next(duration * progress).value / scale;
    },
    duration: millisecondsToSeconds(duration)
  };
}
export {
  createGeneratorEasing
};
