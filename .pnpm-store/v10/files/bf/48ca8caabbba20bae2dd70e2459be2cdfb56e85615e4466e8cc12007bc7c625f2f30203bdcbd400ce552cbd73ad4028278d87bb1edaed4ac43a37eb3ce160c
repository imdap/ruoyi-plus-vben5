import { unrefElement } from "@vueuse/core";
import "vue";
function getMotionElement(el) {
  if (!el)
    return void 0;
  if (el.nodeType === 3 || el.nodeType === 8) {
    return getMotionElement(el.nextSibling);
  }
  return el;
}
function getElement(target) {
  return getMotionElement(unrefElement(target));
}
export {
  getElement,
  getMotionElement
};
