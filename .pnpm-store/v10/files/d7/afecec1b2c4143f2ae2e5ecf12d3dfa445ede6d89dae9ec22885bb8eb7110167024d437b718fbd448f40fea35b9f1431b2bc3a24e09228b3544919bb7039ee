const interactiveElements = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function isElementKeyboardAccessible(element) {
  return interactiveElements.has(element.tagName) || element.isContentEditable === true;
}
export {
  isElementKeyboardAccessible
};
