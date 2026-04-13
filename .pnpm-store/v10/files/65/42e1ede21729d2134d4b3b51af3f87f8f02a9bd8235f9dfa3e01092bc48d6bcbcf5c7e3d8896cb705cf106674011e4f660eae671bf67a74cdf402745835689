import { mountedStates } from "../../state/motion-state.mjs";
import { invariant } from "hey-listen";
import { setTarget } from "../../external/.pnpm/framer-motion@12.25.0/external/framer-motion/dist/es/render/utils/setters.mjs";
import { resolveVariant } from "../../state/utils.mjs";
function stopAnimation(visualElement) {
  visualElement.values.forEach((value) => value.stop());
}
function setStateTarget(state, definition) {
  const resolvedVariant = resolveVariant(definition, state.options.variants, state.options.custom);
  Object.entries(resolvedVariant).forEach(([key, value]) => {
    if (key === "transition")
      return;
    state.target[key] = value;
  });
}
function animationControls() {
  let hasMounted = false;
  const subscribers = /* @__PURE__ */ new Set();
  const controls = {
    subscribe(state) {
      subscribers.add(state);
      return () => void subscribers.delete(state);
    },
    start(definition, transitionOverride) {
      invariant(
        hasMounted,
        "controls.start() should only be called after a component has mounted. Consider calling within a useEffect hook."
      );
      const animations = [];
      subscribers.forEach((state) => {
        animations.push(
          state.animateUpdates({
            directAnimate: definition,
            directTransition: transitionOverride
          })
        );
      });
      return Promise.all(animations);
    },
    set(definition) {
      invariant(
        hasMounted,
        "controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook."
      );
      return subscribers.forEach((state) => {
        setValues(state, definition);
      });
    },
    stop() {
      subscribers.forEach((state) => {
        stopAnimation(state.visualElement);
      });
    },
    mount() {
      hasMounted = true;
      return () => {
        hasMounted = false;
        controls.stop();
      };
    }
  };
  return controls;
}
function setValues(state, definition) {
  if (typeof definition === "string") {
    return setVariants(state, [definition]);
  } else if (Array.isArray(definition)) {
    return setVariants(state, definition);
  } else {
    setStateTarget(state, definition);
    setTarget(state.visualElement, definition);
  }
}
function setVariants(state, variantLabels) {
  const reversedLabels = [...variantLabels].reverse();
  const visualElement = state.visualElement;
  reversedLabels.forEach((key) => {
    const variant = visualElement.getVariant(key);
    variant && setTarget(visualElement, variant);
    setStateTarget(state, variant);
    if (visualElement.variantChildren) {
      visualElement.variantChildren.forEach((child) => {
        setVariants(mountedStates.get(child.current), variantLabels);
      });
    }
  });
}
export {
  animationControls,
  setValues
};
