import { getTimeline } from "./utils/get-timeline.mjs";
import { observeTimeline } from "../../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/scroll/observe.mjs";
function attachToAnimation(animation, options) {
  const timeline = getTimeline(options);
  return animation.attachTimeline({
    timeline: options.target ? void 0 : timeline,
    observe: (valueAnimation) => {
      valueAnimation.pause();
      return observeTimeline((progress) => {
        valueAnimation.time = valueAnimation.iterationDuration * progress;
      }, timeline);
    }
  });
}
export {
  attachToAnimation
};
