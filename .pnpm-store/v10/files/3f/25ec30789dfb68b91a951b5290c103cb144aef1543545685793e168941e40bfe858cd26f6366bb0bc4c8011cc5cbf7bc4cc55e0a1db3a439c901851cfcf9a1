const threshold = 50;
const maxSpeed = 25;
const overflowStyles = /* @__PURE__ */ new Set(["auto", "scroll"]);
const initialScrollLimits = /* @__PURE__ */ new WeakMap();
const activeScrollEdge = /* @__PURE__ */ new WeakMap();
let currentGroupElement = null;
function resetAutoScrollState() {
  if (currentGroupElement) {
    const scrollableAncestor = findScrollableAncestor(
      currentGroupElement,
      "y"
    );
    if (scrollableAncestor) {
      activeScrollEdge.delete(scrollableAncestor);
      initialScrollLimits.delete(scrollableAncestor);
    }
    const scrollableAncestorX = findScrollableAncestor(
      currentGroupElement,
      "x"
    );
    if (scrollableAncestorX && scrollableAncestorX !== scrollableAncestor) {
      activeScrollEdge.delete(scrollableAncestorX);
      initialScrollLimits.delete(scrollableAncestorX);
    }
    currentGroupElement = null;
  }
}
function isScrollableElement(element, axis) {
  const style = getComputedStyle(element);
  const overflow = axis === "x" ? style.overflowX : style.overflowY;
  return overflowStyles.has(overflow);
}
function findScrollableAncestor(element, axis) {
  let current = element == null ? void 0 : element.parentElement;
  while (current) {
    if (isScrollableElement(current, axis)) {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}
function getScrollAmount(pointerPosition, scrollElement, axis) {
  const rect = scrollElement.getBoundingClientRect();
  const start = axis === "x" ? rect.left : rect.top;
  const end = axis === "x" ? rect.right : rect.bottom;
  const distanceFromStart = pointerPosition - start;
  const distanceFromEnd = end - pointerPosition;
  if (distanceFromStart < threshold) {
    const intensity = 1 - distanceFromStart / threshold;
    return { amount: -maxSpeed * intensity * intensity, edge: "start" };
  } else if (distanceFromEnd < threshold) {
    const intensity = 1 - distanceFromEnd / threshold;
    return { amount: maxSpeed * intensity * intensity, edge: "end" };
  }
  return { amount: 0, edge: null };
}
function autoScrollIfNeeded(groupElement, pointerPosition, axis, velocity) {
  if (!groupElement)
    return;
  currentGroupElement = groupElement;
  const scrollableAncestor = findScrollableAncestor(groupElement, axis);
  if (!scrollableAncestor)
    return;
  const { amount: scrollAmount, edge } = getScrollAmount(
    pointerPosition,
    scrollableAncestor,
    axis
  );
  if (edge === null) {
    activeScrollEdge.delete(scrollableAncestor);
    initialScrollLimits.delete(scrollableAncestor);
    return;
  }
  const currentActiveEdge = activeScrollEdge.get(scrollableAncestor);
  if (currentActiveEdge !== edge) {
    const shouldStart = edge === "start" && velocity < 0 || edge === "end" && velocity > 0;
    if (!shouldStart)
      return;
    activeScrollEdge.set(scrollableAncestor, edge);
    const maxScroll = axis === "x" ? scrollableAncestor.scrollWidth - scrollableAncestor.clientWidth : scrollableAncestor.scrollHeight - scrollableAncestor.clientHeight;
    initialScrollLimits.set(scrollableAncestor, maxScroll);
  }
  if (scrollAmount > 0) {
    const initialLimit = initialScrollLimits.get(scrollableAncestor);
    const currentScroll = axis === "x" ? scrollableAncestor.scrollLeft : scrollableAncestor.scrollTop;
    if (currentScroll >= initialLimit)
      return;
  }
  if (axis === "x") {
    scrollableAncestor.scrollLeft += scrollAmount;
  } else {
    scrollableAncestor.scrollTop += scrollAmount;
  }
}
export {
  autoScrollIfNeeded,
  resetAutoScrollState
};
