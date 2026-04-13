const components = /* @__PURE__ */ new Set([
  "Motion",
  "AnimatePresence",
  "LayoutGroup",
  "MotionConfig",
  "ReorderGroup",
  "ReorderItem",
  "M"
]);
function index() {
  return {
    type: "component",
    resolve: (name) => {
      if (components.has(name)) {
        return {
          name,
          from: "motion-v"
        };
      }
    }
  };
}

export { index as default };
