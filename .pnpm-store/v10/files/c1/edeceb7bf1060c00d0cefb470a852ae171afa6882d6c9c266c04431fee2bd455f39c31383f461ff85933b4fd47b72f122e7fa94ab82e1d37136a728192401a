import { Feature } from "../../feature.mjs";
import { press } from "../../../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/gestures/press/index.mjs";
import { frame } from "../../../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/frameloop/frame.mjs";
function extractEventInfo(event) {
  return {
    point: {
      x: event.pageX,
      y: event.pageY
    }
  };
}
function handlePressEvent(state, event, lifecycle) {
  const props = state.options;
  if (props.whilePress) {
    state.setActive("whilePress", lifecycle === "Start");
  }
  const eventName = `onPress${lifecycle === "End" ? "" : lifecycle}`;
  const callback = props[eventName];
  if (callback) {
    frame.postRender(() => callback(event, extractEventInfo(event)));
  }
}
class PressGesture extends Feature {
  isActive() {
    const { whilePress, onPress, onPressCancel, onPressStart } = this.state.options;
    return Boolean(whilePress || onPress || onPressCancel || onPressStart);
  }
  constructor(state) {
    super(state);
  }
  mount() {
    this.register();
  }
  update() {
    const { whilePress, onPress, onPressCancel, onPressStart } = this.state.options;
    if (!(whilePress || onPress || onPressCancel || onPressStart)) {
      this.register();
    }
  }
  register() {
    const element = this.state.element;
    if (!element || !this.isActive())
      return;
    this.unmount();
    this.unmount = press(
      element,
      (el, startEvent) => {
        handlePressEvent(this.state, startEvent, "Start");
        return (endEvent, { success }) => handlePressEvent(
          this.state,
          endEvent,
          success ? "End" : "Cancel"
        );
      },
      { useGlobalTarget: this.state.options.globalPressTarget }
    );
  }
}
export {
  PressGesture,
  extractEventInfo
};
