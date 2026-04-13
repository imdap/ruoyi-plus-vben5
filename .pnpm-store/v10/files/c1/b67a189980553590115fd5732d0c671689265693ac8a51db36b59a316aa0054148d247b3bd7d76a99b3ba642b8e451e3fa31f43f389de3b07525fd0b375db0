import { watch, onMounted, onUnmounted } from "vue";
import { mountedStates } from "../../state/motion-state.mjs";
import { usePopLayout } from "./use-pop-layout.mjs";
import { provideAnimatePresence, PRESENCE_CHILD_ATTR } from "./presence.mjs";
function usePresenceContainer(props) {
  const containerStates = /* @__PURE__ */ new Map();
  const pendingStates = /* @__PURE__ */ new Set();
  const { addPopStyle, removePopStyle } = usePopLayout(props);
  function register(container, state) {
    let containerState = containerStates.get(container);
    if (!containerState) {
      containerState = {
        motions: /* @__PURE__ */ new Set(),
        exitingMotions: /* @__PURE__ */ new Set(),
        el: container
      };
      containerStates.set(container, containerState);
    }
    containerState.motions.add(state);
  }
  function onMotionExitComplete(container, state) {
    const containerState = containerStates.get(container);
    if (!containerState)
      return;
    containerState.exitingMotions.delete(state);
    if (containerState.exitingMotions.size === 0 && containerState.done) {
      finalizeExit(containerState);
    }
  }
  function registerPending(state) {
    pendingStates.add(state);
  }
  function unregisterPending(state) {
    pendingStates.delete(state);
  }
  const presenceContext = {
    initial: props.initial,
    custom: props.custom,
    register,
    onMotionExitComplete,
    registerPending,
    unregisterPending
  };
  watch(() => props.custom, (v) => {
    presenceContext.custom = v;
  }, { flush: "pre" });
  provideAnimatePresence(presenceContext);
  onMounted(() => {
    presenceContext.initial = void 0;
  });
  function markChild(el) {
    if (el instanceof HTMLElement && !el.hasAttribute(PRESENCE_CHILD_ATTR)) {
      el.setAttribute(PRESENCE_CHILD_ATTR, "");
      const state = mountedStates.get(el);
      if (state && !state.presenceContainer) {
        state.presenceContainer = el;
        register(el, state);
      }
    }
  }
  function finalizeExit(containerState) {
    var _a, _b, _c, _d, _e;
    removePopStyle(containerState.el);
    containerState.motions.forEach((state) => {
      state.getSnapshot(state.options, false);
    });
    (_a = containerState.done) == null ? void 0 : _a.call(containerState);
    containerState.done = void 0;
    if (!((_b = containerState.el) == null ? void 0 : _b.isConnected)) {
      containerState.motions.forEach((state) => {
        state.unmount();
      });
      containerState.motions.clear();
    } else {
      (_d = (_c = containerState.motions.values().next()) == null ? void 0 : _c.value) == null ? void 0 : _d.didUpdate();
    }
    (_e = props.onExitComplete) == null ? void 0 : _e.call(props);
  }
  function enter(el, done) {
    markChild(el);
    const containerState = containerStates.get(el);
    if (containerState) {
      containerState.exitingMotions.clear();
      containerState.motions.forEach((s) => {
        s.setActive("exit", false);
        s.getSnapshot(s.options, true);
      });
    }
    done();
  }
  function exit(el, done) {
    var _a, _b, _c;
    const container = el;
    markChild(container);
    pendingStates.forEach((state) => {
      if (state.element && container.contains(state.element)) {
        state.presenceContainer = container;
        register(container, state);
        pendingStates.delete(state);
      }
    });
    const containerState = containerStates.get(container);
    const containerMotionState = mountedStates.get(container);
    if ((!containerState || containerState.motions.size === 0) && !containerMotionState) {
      done();
      (_a = props.onExitComplete) == null ? void 0 : _a.call(props);
      return;
    }
    containerState.done = done;
    addPopStyle(container);
    containerState.motions.forEach((state) => {
      containerState.exitingMotions.add(state);
      state.setActive("exit", true);
      state.getSnapshot(state.options, false);
    });
    (_c = (_b = containerState.motions.values().next()) == null ? void 0 : _b.value) == null ? void 0 : _c.didUpdate();
  }
  onUnmounted(() => {
    containerStates.forEach((containerState) => {
      containerState.motions.forEach((state) => {
        state.unmount();
      });
    });
    containerStates.clear();
  });
  return {
    enter,
    exit
  };
}
export {
  usePresenceContainer
};
