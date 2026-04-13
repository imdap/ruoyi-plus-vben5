function notify(node) {
  return !node.isLayoutDirty && node.willUpdate(false);
}
function nodeGroup() {
  const nodes = /* @__PURE__ */ new Set();
  const subscriptions = /* @__PURE__ */ new WeakMap();
  const dirtyAll = (node) => {
    nodes.forEach(notify);
  };
  return {
    add: (node) => {
      nodes.add(node);
      subscriptions.set(
        node,
        node.addEventListener("willUpdate", () => dirtyAll())
      );
    },
    remove: (node) => {
      nodes.delete(node);
      const unsubscribe = subscriptions.get(node);
      if (unsubscribe) {
        unsubscribe();
        subscriptions.delete(node);
      }
    },
    dirty: dirtyAll
  };
}
export {
  nodeGroup
};
