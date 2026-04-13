import { supportsLinearEasing } from "../../../utils/supports/linear-easing.mjs";
import { supportedWaapiEasing } from "./supported.mjs";
import { isBezierDefinition } from "../../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs";
function isWaapiSupportedEasing(easing) {
  return Boolean(typeof easing === "function" && supportsLinearEasing() || !easing || typeof easing === "string" && (easing in supportedWaapiEasing || supportsLinearEasing()) || isBezierDefinition(easing) || Array.isArray(easing) && easing.every(isWaapiSupportedEasing));
}
export {
  isWaapiSupportedEasing
};
