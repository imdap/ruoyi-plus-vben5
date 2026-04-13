import { attachToAnimation } from "./attach-animation.mjs";
import { attachToFunction } from "./attach-function.mjs";
import { noop } from "../../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/noop.mjs";
function scroll(onScroll, { axis = "y", container = document.scrollingElement, ...options } = {}) {
  if (!container)
    return noop;
  const optionsWithDefaults = { axis, container, ...options };
  return typeof onScroll === "function" ? attachToFunction(onScroll, optionsWithDefaults) : attachToAnimation(onScroll, optionsWithDefaults);
}
export {
  scroll
};
