import { velocityPerSecond } from "../../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/velocity-per-second.mjs";
const velocitySampleDuration = 5;
function calcGeneratorVelocity(resolveValue, t, current) {
  const prevT = Math.max(t - velocitySampleDuration, 0);
  return velocityPerSecond(current - resolveValue(prevT), t - prevT);
}
export {
  calcGeneratorVelocity
};
