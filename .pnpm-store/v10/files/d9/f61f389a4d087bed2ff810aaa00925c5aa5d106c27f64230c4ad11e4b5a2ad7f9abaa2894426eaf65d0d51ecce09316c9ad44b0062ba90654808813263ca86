import { isGenerator } from "../generators/utils/is-generator.mjs";
import { isAnimatable } from "./is-animatable.mjs";
import { warning } from "../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/errors.mjs";
function hasKeyframesChanged(keyframes) {
  const current = keyframes[0];
  if (keyframes.length === 1)
    return true;
  for (let i = 0; i < keyframes.length; i++) {
    if (keyframes[i] !== current)
      return true;
  }
}
function canAnimate(keyframes, name, type, velocity) {
  const originKeyframe = keyframes[0];
  if (originKeyframe === null)
    return false;
  if (name === "display" || name === "visibility")
    return true;
  const targetKeyframe = keyframes[keyframes.length - 1];
  const isOriginAnimatable = isAnimatable(originKeyframe, name);
  const isTargetAnimatable = isAnimatable(targetKeyframe, name);
  warning(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". "${isOriginAnimatable ? targetKeyframe : originKeyframe}" is not an animatable value.`, "value-not-animatable");
  if (!isOriginAnimatable || !isTargetAnimatable) {
    return false;
  }
  return hasKeyframesChanged(keyframes) || (type === "spring" || isGenerator(type)) && velocity;
}
export {
  canAnimate
};
