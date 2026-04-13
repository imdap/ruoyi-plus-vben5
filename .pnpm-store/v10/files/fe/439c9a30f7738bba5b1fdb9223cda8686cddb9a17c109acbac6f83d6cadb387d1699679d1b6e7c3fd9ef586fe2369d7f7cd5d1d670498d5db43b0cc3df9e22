import { Feature } from "../feature.mjs";
import { HTMLProjectionNode } from "../../external/.pnpm/framer-motion@12.25.0/external/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs";
import { getClosestProjectingNode } from "./utils.mjs";
import { addScaleCorrector } from "../../external/.pnpm/framer-motion@12.25.0/external/framer-motion/dist/es/projection/styles/scale-correction.mjs";
import { defaultScaleCorrector } from "./config.mjs";
import { isHTMLElement } from "../gestures/drag/utils/is.mjs";
class ProjectionFeature extends Feature {
  constructor(state) {
    super(state);
    addScaleCorrector(defaultScaleCorrector);
  }
  initProjection() {
    const options = this.state.options;
    this.state.visualElement.projection = new HTMLProjectionNode(
      this.state.visualElement.latestValues,
      options["data-framer-portal-id"] ? void 0 : getClosestProjectingNode(this.state.visualElement.parent)
    );
    this.state.visualElement.projection.isPresent = true;
    this.setOptions();
  }
  beforeMount() {
    this.initProjection();
  }
  setOptions() {
    const options = this.state.options;
    const { layoutId, layout, drag = false, dragConstraints = false } = options;
    this.state.visualElement.projection.setOptions({
      layout,
      layoutId,
      alwaysMeasureLayout: Boolean(layoutId) || Boolean(drag) || dragConstraints && isHTMLElement(dragConstraints),
      visualElement: this.state.visualElement,
      animationType: typeof options.layout === "string" ? options.layout : "both",
      // initialPromotionConfig
      layoutRoot: options.layoutRoot,
      layoutScroll: options.layoutScroll,
      crossfade: options.crossfade,
      onExitComplete: () => {
        var _a, _b;
        if (!((_a = this.state.visualElement.projection) == null ? void 0 : _a.isPresent) && this.state.options.layoutId && !this.state.isExiting) {
          (_b = this.state.options.animatePresenceContext) == null ? void 0 : _b.onMotionExitComplete(this.state.presenceContainer, this.state);
        }
      }
    });
  }
  update() {
    this.setOptions();
  }
  mount() {
    var _a;
    (_a = this.state.visualElement.projection) == null ? void 0 : _a.mount(this.state.element);
  }
}
export {
  ProjectionFeature
};
