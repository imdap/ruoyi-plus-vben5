import { VisualElement } from "../VisualElement.mjs";
import { DOMKeyframesResolver } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs";
import { isMotionValue } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/value/utils/is-motion-value.mjs";
class DOMVisualElement extends VisualElement {
  constructor() {
    super(...arguments);
    this.KeyframeResolver = DOMKeyframesResolver;
  }
  sortInstanceNodePosition(a, b) {
    return a.compareDocumentPosition(b) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(props, key) {
    return props.style ? props.style[key] : void 0;
  }
  removeValueFromRenderState(key, { vars, style }) {
    delete vars[key];
    delete style[key];
  }
  handleChildMotionValue() {
    if (this.childSubscription) {
      this.childSubscription();
      delete this.childSubscription;
    }
    const { children } = this.props;
    if (isMotionValue(children)) {
      this.childSubscription = children.on("change", (latest) => {
        if (this.current) {
          this.current.textContent = `${latest}`;
        }
      });
    }
  }
}
export {
  DOMVisualElement
};
