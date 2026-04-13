function calcChildStagger(children, child, delayChildren, staggerChildren = 0, staggerDirection = 1) {
  const sortedChildren = Array.from(children);
  const index = sortedChildren.indexOf(child);
  const numChildren = children.size;
  const maxStaggerDuration = (numChildren - 1) * staggerChildren;
  const delayIsFunction = typeof delayChildren === "function";
  if (index === sortedChildren.length - 1) {
    child.parent.enteringChildren = void 0;
  }
  return delayIsFunction ? delayChildren(index, numChildren) : staggerDirection === 1 ? index * staggerChildren : maxStaggerDuration - index * staggerChildren;
}
export {
  calcChildStagger
};
