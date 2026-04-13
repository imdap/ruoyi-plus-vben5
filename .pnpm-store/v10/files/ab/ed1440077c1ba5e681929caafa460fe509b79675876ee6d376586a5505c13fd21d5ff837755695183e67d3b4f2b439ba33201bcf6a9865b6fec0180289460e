import { interpolate } from "../../utils/interpolate.mjs";
import { defaultOffset } from "../keyframes/offsets/default.mjs";
import { convertOffsetToTimes } from "../keyframes/offsets/time.mjs";
import { easeInOut } from "../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/easing/ease.mjs";
import { isEasingArray } from "../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/easing/utils/is-easing-array.mjs";
import { easingDefinitionToFunction } from "../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/easing/utils/map.mjs";
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function keyframes({ duration = 300, keyframes: keyframeValues, times, ease = "easeInOut" }) {
  const easingFunctions = isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
  const state = {
    done: false,
    value: keyframeValues[0]
  };
  const absoluteTimes = convertOffsetToTimes(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues),
    duration
  );
  const mapTimeToKeyframe = interpolate(absoluteTimes, keyframeValues, {
    ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions)
  });
  return {
    calculatedDuration: duration,
    next: (t) => {
      state.value = mapTimeToKeyframe(t);
      state.done = t >= duration;
      return state;
    }
  };
}
export {
  defaultEasing,
  keyframes
};
