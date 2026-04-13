import { Feature } from "../feature.mjs";
import { addScaleCorrector } from "../../external/.pnpm/framer-motion@12.25.0/external/framer-motion/dist/es/projection/styles/scale-correction.mjs";
import { defaultScaleCorrector } from "./config.mjs";
import { globalProjectionState } from "../../external/.pnpm/framer-motion@12.25.0/external/framer-motion/dist/es/projection/node/state.mjs";
import { isDef } from "@vueuse/core";
let hasLayoutUpdate = false;
class LayoutFeature extends Feature {
  constructor(state) {
    super(state);
    addScaleCorrector(defaultScaleCorrector);
    state.getSnapshot = this.getSnapshot.bind(this);
    state.didUpdate = this.didUpdate.bind(this);
  }
  beforeUpdate(newOptions) {
    this.getSnapshot(newOptions, void 0);
  }
  update() {
    this.didUpdate();
  }
  didUpdate() {
    var _a, _b;
    if (!hasLayoutUpdate)
      return;
    if (this.state.options.layout || this.state.options.layoutId || this.state.options.drag) {
      hasLayoutUpdate = false;
      (_b = (_a = this.state.visualElement.projection) == null ? void 0 : _a.root) == null ? void 0 : _b.didUpdate();
    }
  }
  mount() {
    var _a;
    const options = this.state.options;
    const layoutGroup = this.state.options.layoutGroup;
    if (options.layout || options.layoutId) {
      const projection = this.state.visualElement.projection;
      if (projection) {
        projection.promote();
        const stack = projection.getStack();
        if ((stack == null ? void 0 : stack.prevLead) && !stack.prevLead.snapshot) {
          stack.prevLead.willUpdate();
          hasLayoutUpdate = true;
        }
        (_a = layoutGroup == null ? void 0 : layoutGroup.group) == null ? void 0 : _a.add(projection);
      }
      globalProjectionState.hasEverUpdated = true;
    }
    this.didUpdate();
  }
  beforeUnmount() {
    this.getSnapshot(this.state.options, false);
  }
  unmount() {
    const layoutGroup = this.state.options.layoutGroup;
    const projection = this.state.visualElement.projection;
    if (projection) {
      if ((layoutGroup == null ? void 0 : layoutGroup.group) && (this.state.options.layout || this.state.options.layoutId)) {
        layoutGroup.group.remove(projection);
      }
      if (this.state.options.layoutId) {
        hasLayoutUpdate = true;
      }
      this.didUpdate();
    }
  }
  getSnapshot(newOptions, isPresent) {
    const projection = this.state.visualElement.projection;
    const { drag, layoutDependency, layout, layoutId } = newOptions;
    if (!projection || !layout && !layoutId && !drag) {
      return;
    }
    hasLayoutUpdate = true;
    const prevProps = this.state.options;
    if (drag || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0 || isDef(isPresent) && projection.isPresent !== isPresent) {
      projection.willUpdate();
    }
    if (isDef(isPresent) && isPresent !== projection.isPresent) {
      projection.isPresent = isPresent;
      if (isPresent) {
        projection.promote();
      } else {
        projection.relegate();
      }
    }
  }
}
export {
  LayoutFeature
};
