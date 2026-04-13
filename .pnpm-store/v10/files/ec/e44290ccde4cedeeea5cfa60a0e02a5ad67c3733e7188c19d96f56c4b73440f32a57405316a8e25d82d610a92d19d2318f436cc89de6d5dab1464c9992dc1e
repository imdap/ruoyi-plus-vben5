import { addDomEvent } from "../../../events/add-dom-event.mjs";
import { Feature } from "../../feature.mjs";
import { pipe } from "../../../external/.pnpm/motion-utils@12.24.10/external/motion-utils/dist/es/pipe.mjs";
class FocusGesture extends Feature {
  constructor() {
    super(...arguments);
    this.isActive = false;
  }
  onFocus() {
    let isFocusVisible = false;
    try {
      isFocusVisible = this.state.element.matches(":focus-visible");
    } catch (e) {
      isFocusVisible = true;
    }
    if (!isFocusVisible)
      return;
    this.state.setActive("whileFocus", true);
    this.isActive = true;
  }
  onBlur() {
    if (!this.isActive)
      return;
    this.state.setActive("whileFocus", false);
    this.isActive = false;
  }
  mount() {
    this.unmount = pipe(
      addDomEvent(this.state.element, "focus", () => this.onFocus()),
      addDomEvent(this.state.element, "blur", () => this.onBlur())
    );
  }
}
export {
  FocusGesture
};
