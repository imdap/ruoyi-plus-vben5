import { scaleCorrectors } from "../../projection/styles/scale-correction.mjs";
import { transformProps } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/render/utils/keys-transform.mjs";
function isForcedMotionValue(key, { layout, layoutId }) {
  return transformProps.has(key) || key.startsWith("origin") || (layout || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}
export {
  isForcedMotionValue
};
