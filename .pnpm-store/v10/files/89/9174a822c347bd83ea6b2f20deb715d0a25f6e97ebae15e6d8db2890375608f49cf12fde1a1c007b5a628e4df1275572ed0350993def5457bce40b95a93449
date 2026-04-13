import { scrollInfo } from "./track.mjs";
import { getTimeline } from "./utils/get-timeline.mjs";
import { observeTimeline } from "../../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/scroll/observe.mjs";
function isOnScrollWithInfo(onScroll) {
  return onScroll.length === 2;
}
function attachToFunction(onScroll, options) {
  if (isOnScrollWithInfo(onScroll)) {
    return scrollInfo((info) => {
      onScroll(info[options.axis].progress, info);
    }, options);
  } else {
    return observeTimeline(onScroll, getTimeline(options));
  }
}
export {
  attachToFunction
};
