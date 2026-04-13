import { Feature } from "../../feature.mjs";
import { VisualElementDragControls } from "./VisualElementDragControls.mjs";
import { noop } from "../../../external/.pnpm/motion-utils@12.24.10/external/motion-utils/dist/es/noop.mjs";
class DragGesture extends Feature {
  constructor(state) {
    super(state);
    this.removeGroupControls = noop;
    this.removeListeners = noop;
    this.controls = new VisualElementDragControls(state.visualElement);
  }
  mount() {
    const { dragControls } = this.state.options;
    if (dragControls) {
      this.removeGroupControls = dragControls.subscribe(this.controls);
    }
    this.removeListeners = this.controls.addListeners() || noop;
  }
  unmount() {
    this.removeGroupControls();
    this.removeListeners();
  }
}
export {
  DragGesture
};
