import { Feature } from "../../feature.mjs";
import { hover } from "../../../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/gestures/hover.mjs";
import { extractEventInfo } from "../press/index.mjs";
import { frame } from "../../../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/frameloop/frame.mjs";
function handleHoverEvent(state, event, lifecycle) {
  const props = state.options;
  if (props.whileHover) {
    state.setActive("whileHover", lifecycle === "Start");
  }
  const eventName = `onHover${lifecycle}`;
  const callback = props[eventName];
  if (callback) {
    frame.postRender(() => callback(event, extractEventInfo(event)));
  }
}
class HoverGesture extends Feature {
  isActive() {
    const { whileHover, onHoverStart, onHoverEnd } = this.state.options;
    return Boolean(whileHover || onHoverStart || onHoverEnd);
  }
  constructor(state) {
    super(state);
  }
  mount() {
    this.register();
  }
  update() {
    const { whileHover, onHoverStart, onHoverEnd } = this.state.visualElement.prevProps;
    if (!(whileHover || onHoverStart || onHoverEnd)) {
      this.register();
    }
  }
  register() {
    const element = this.state.element;
    if (!element || !this.isActive())
      return;
    this.unmount();
    this.unmount = hover(
      element,
      (el, startEvent) => {
        handleHoverEvent(this.state, startEvent, "Start");
        return (endEvent) => {
          handleHoverEvent(this.state, endEvent, "End");
        };
      }
    );
  }
}
export {
  HoverGesture
};
