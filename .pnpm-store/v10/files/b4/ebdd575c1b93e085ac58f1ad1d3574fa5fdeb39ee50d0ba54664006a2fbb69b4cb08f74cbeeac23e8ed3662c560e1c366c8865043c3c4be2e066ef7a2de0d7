import { measureViewportBox } from "../../projection/utils/measure.mjs";
import { DOMVisualElement } from "../dom/DOMVisualElement.mjs";
import { buildHTMLStyles } from "./utils/build-styles.mjs";
import { renderHTML } from "./utils/render.mjs";
import { scrapeMotionValuesFromProps } from "./utils/scrape-motion-values.mjs";
import { transformProps } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/render/utils/keys-transform.mjs";
import { defaultTransformValue, readTransformValue } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/render/dom/parse-transform.mjs";
import { isCSSVariableName } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/animation/utils/is-css-variable.mjs";
function getComputedStyle(element) {
  return window.getComputedStyle(element);
}
class HTMLVisualElement extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "html";
    this.renderInstance = renderHTML;
  }
  readValueFromInstance(instance, key) {
    var _a;
    if (transformProps.has(key)) {
      return ((_a = this.projection) == null ? void 0 : _a.isProjecting) ? defaultTransformValue(key) : readTransformValue(instance, key);
    } else {
      const computedStyle = getComputedStyle(instance);
      const value = (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
      return typeof value === "string" ? value.trim() : value;
    }
  }
  measureInstanceViewportBox(instance, { transformPagePoint }) {
    return measureViewportBox(instance, transformPagePoint);
  }
  build(renderState, latestValues, props) {
    buildHTMLStyles(renderState, latestValues, props.transformTemplate);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps(props, prevProps, visualElement);
  }
}
export {
  HTMLVisualElement,
  getComputedStyle
};
