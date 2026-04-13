import { scrollInfo } from "../track.mjs";
import { supportsScrollTimeline } from "../../../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/utils/supports/scroll-timeline.mjs";
const timelineCache = /* @__PURE__ */ new Map();
function scrollTimelineFallback(options) {
  const currentTime = { value: 0 };
  const cancel = scrollInfo((info) => {
    currentTime.value = info[options.axis].progress * 100;
  }, options);
  return { currentTime, cancel };
}
function getTimeline({ source, container, ...options }) {
  const { axis } = options;
  if (source)
    container = source;
  const containerCache = timelineCache.get(container) ?? /* @__PURE__ */ new Map();
  timelineCache.set(container, containerCache);
  const targetKey = options.target ?? "self";
  const targetCache = containerCache.get(targetKey) ?? {};
  const axisKey = axis + (options.offset ?? []).join(",");
  if (!targetCache[axisKey]) {
    targetCache[axisKey] = !options.target && supportsScrollTimeline() ? new ScrollTimeline({ source: container, axis }) : scrollTimelineFallback({ container, ...options });
  }
  return targetCache[axisKey];
}
export {
  getTimeline
};
