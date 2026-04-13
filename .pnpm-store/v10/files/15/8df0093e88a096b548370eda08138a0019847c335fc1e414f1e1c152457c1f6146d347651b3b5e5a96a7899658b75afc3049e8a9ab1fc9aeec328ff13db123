import { Feature } from "../../feature.mjs";
import { inView } from "../../../external/.pnpm/framer-motion@12.25.0/external/framer-motion/dist/es/render/dom/viewport/index.mjs";
import { frame } from "../../../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/frameloop/frame.mjs";
function handleHoverEvent(state, entry, lifecycle) {
  const props = state.options;
  if (props.whileInView) {
    state.setActive("whileInView", lifecycle === "Enter");
  }
  const eventName = `onViewport${lifecycle}`;
  const callback = props[eventName];
  if (callback) {
    frame.postRender(() => callback(entry));
  }
}
class InViewGesture extends Feature {
  isActive() {
    const { whileInView, onViewportEnter, onViewportLeave } = this.state.options;
    return Boolean(whileInView || onViewportEnter || onViewportLeave);
  }
  constructor(state) {
    super(state);
  }
  startObserver() {
    const element = this.state.element;
    if (!element || !this.isActive())
      return;
    this.unmount();
    const { once, ...viewOptions } = this.state.options.inViewOptions || {};
    this.unmount = inView(
      element,
      (_, entry) => {
        handleHoverEvent(this.state, entry, "Enter");
        if (!once) {
          return (endEvent) => {
            handleHoverEvent(this.state, entry, "Leave");
          };
        }
      },
      viewOptions
    );
  }
  mount() {
    this.startObserver();
  }
  update() {
    const { props, prevProps } = this.state.visualElement;
    const hasOptionsChanged = ["amount", "margin", "root"].some(
      hasViewportOptionChanged(props, prevProps)
    );
    if (hasOptionsChanged) {
      this.startObserver();
    }
  }
}
function hasViewportOptionChanged({ inViewOptions = {} }, { inViewOptions: prevViewport = {} } = {}) {
  return (name) => inViewOptions[name] !== prevViewport[name];
}
export {
  InViewGesture
};
