import { memo } from "../../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/memo.mjs";
const acceleratedValues = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]);
const supportsWaapi = /* @__PURE__ */ memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function supportsBrowserAnimation(options) {
  var _a;
  const { motionValue, name, repeatDelay, repeatType, damping, type } = options;
  const subject = (_a = motionValue == null ? void 0 : motionValue.owner) == null ? void 0 : _a.current;
  if (!(subject instanceof HTMLElement)) {
    return false;
  }
  const { onUpdate, transformTemplate } = motionValue.owner.getProps();
  return supportsWaapi() && name && acceleratedValues.has(name) && (name !== "transform" || !transformTemplate) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !onUpdate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
}
export {
  supportsBrowserAnimation
};
