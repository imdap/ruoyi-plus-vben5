import { mix } from "./mix/index.mjs";
import { invariant } from "../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/errors.mjs";
import { clamp } from "../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/clamp.mjs";
import { MotionGlobalConfig } from "../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/global-config.mjs";
import { noop } from "../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/noop.mjs";
import { pipe } from "../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/pipe.mjs";
import { progress } from "../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/progress.mjs";
function createMixers(output, ease, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || MotionGlobalConfig.mix || mix;
  const numMixers = output.length - 1;
  for (let i = 0; i < numMixers; i++) {
    let mixer = mixerFactory(output[i], output[i + 1]);
    if (ease) {
      const easingFunction = Array.isArray(ease) ? ease[i] || noop : ease;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
  const inputLength = input.length;
  invariant(inputLength === output.length, "Both input and output ranges must be the same length", "range-length");
  if (inputLength === 1)
    return () => output[0];
  if (inputLength === 2 && output[0] === output[1])
    return () => output[1];
  const isZeroDeltaRange = input[0] === input[1];
  if (input[0] > input[inputLength - 1]) {
    input = [...input].reverse();
    output = [...output].reverse();
  }
  const mixers = createMixers(output, ease, mixer);
  const numMixers = mixers.length;
  const interpolator = (v) => {
    if (isZeroDeltaRange && v < input[0])
      return output[0];
    let i = 0;
    if (numMixers > 1) {
      for (; i < input.length - 2; i++) {
        if (v < input[i + 1])
          break;
      }
    }
    const progressInRange = progress(input[i], input[i + 1], v);
    return mixers[i](progressInRange);
  };
  return isClamp ? (v) => interpolator(clamp(input[0], input[inputLength - 1], v)) : interpolator;
}
export {
  interpolate
};
