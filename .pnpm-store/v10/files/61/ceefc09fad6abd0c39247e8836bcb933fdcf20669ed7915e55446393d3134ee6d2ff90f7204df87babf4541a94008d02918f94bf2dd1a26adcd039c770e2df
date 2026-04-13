import { isSVGElement } from "./utils.mjs";
import { HTMLVisualElement } from "../external/.pnpm/framer-motion@12.25.0/external/framer-motion/dist/es/render/html/HTMLVisualElement.mjs";
import { SVGVisualElement } from "../external/.pnpm/framer-motion@12.25.0/external/framer-motion/dist/es/render/svg/SVGVisualElement.mjs";
function createVisualElement(Component, options) {
  return isSVGElement(Component) ? new SVGVisualElement(options) : new HTMLVisualElement(options);
}
export {
  createVisualElement
};
