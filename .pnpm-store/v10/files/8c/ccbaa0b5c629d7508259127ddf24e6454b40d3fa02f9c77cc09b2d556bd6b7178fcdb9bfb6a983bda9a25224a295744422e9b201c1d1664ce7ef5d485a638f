import { isPrimaryPointer } from "./utils/is-primary-pointer.mjs";
function extractEventInfo(event, pointType = "page") {
  return {
    point: {
      x: event[`${pointType}X`],
      y: event[`${pointType}Y`]
    }
  };
}
function addPointerInfo(handler) {
  return (event) => isPrimaryPointer(event) && handler(event, extractEventInfo(event));
}
export {
  addPointerInfo,
  extractEventInfo
};
