import { HTMLVisualElement } from "../../render/html/HTMLVisualElement.mjs";
import { ObjectVisualElement } from "../../render/object/ObjectVisualElement.mjs";
import { visualElementStore } from "../../render/store.mjs";
import { SVGVisualElement } from "../../render/svg/SVGVisualElement.mjs";
import { isSVGElement } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/utils/is-svg-element.mjs";
import { isSVGSVGElement } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/utils/is-svg-svg-element.mjs";
function createDOMVisualElement(element) {
  const options = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        transform: {},
        transformOrigin: {},
        style: {},
        vars: {},
        attrs: {}
      },
      latestValues: {}
    }
  };
  const node = isSVGElement(element) && !isSVGSVGElement(element) ? new SVGVisualElement(options) : new HTMLVisualElement(options);
  node.mount(element);
  visualElementStore.set(element, node);
}
function createObjectVisualElement(subject) {
  const options = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  };
  const node = new ObjectVisualElement(options);
  node.mount(subject);
  visualElementStore.set(subject, node);
}
export {
  createDOMVisualElement,
  createObjectVisualElement
};
