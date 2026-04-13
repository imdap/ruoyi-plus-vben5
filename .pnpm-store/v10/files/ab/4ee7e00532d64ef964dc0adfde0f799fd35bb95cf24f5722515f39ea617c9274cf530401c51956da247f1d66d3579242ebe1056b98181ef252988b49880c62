import { addPointerInfo } from "./event-info.mjs";
import { addDomEvent } from "./add-dom-event.mjs";
function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, eventName, addPointerInfo(handler), options);
}
export {
  addPointerEvent
};
