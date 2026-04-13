import { isAnimationControls } from "../../animation/utils.mjs";
import { Feature } from "../feature.mjs";
import { mountedStates } from "../../state/motion-state.mjs";
import { visualElementStore } from "../../external/.pnpm/framer-motion@12.25.0/external/framer-motion/dist/es/render/store.mjs";
import { motionEvent } from "../../state/event.mjs";
import { style } from "../../state/style.mjs";
import { transformResetValue } from "../../state/transform.mjs";
import { hasChanged, resolveVariant } from "../../state/utils.mjs";
import { isDef } from "@vueuse/core";
import { createVisualElement } from "../../state/create-visual-element.mjs";
import { prefersReducedMotion } from "../../external/.pnpm/framer-motion@12.25.0/external/framer-motion/dist/es/utils/reduced-motion/state.mjs";
import { calcChildStagger } from "./calc-child-stagger.mjs";
import { animate } from "../../external/.pnpm/framer-motion@12.25.0/external/framer-motion/dist/es/animation/animate/index.mjs";
import { noop } from "../../external/.pnpm/motion-utils@12.24.10/external/motion-utils/dist/es/noop.mjs";
const STATE_TYPES = ["initial", "animate", "whileInView", "whileHover", "whilePress", "whileDrag", "whileFocus", "exit"];
class AnimationFeature extends Feature {
  constructor(state) {
    var _a, _b;
    super(state);
    this.animateUpdates = ({
      controlActiveState,
      directAnimate,
      directTransition,
      controlDelay = 0,
      isExit
    } = {}) => {
      const { reducedMotion } = this.state.options.motionConfig;
      this.state.visualElement.shouldReduceMotion = reducedMotion === "always" || reducedMotion === "user" && !!prefersReducedMotion.current;
      const prevTarget = this.state.target;
      this.state.target = { ...this.state.baseTarget };
      let animationOptions = {};
      animationOptions = this.resolveStateAnimation({
        controlActiveState,
        directAnimate,
        directTransition
      });
      this.state.finalTransition = animationOptions;
      const factories = this.createAnimationFactories(prevTarget, animationOptions, controlDelay);
      const { getChildAnimations } = this.setupChildAnimations(animationOptions, this.state.activeStates);
      return this.executeAnimations({
        factories,
        getChildAnimations,
        transition: animationOptions,
        controlActiveState,
        isExit
      });
    };
    this.state.visualElement = createVisualElement(this.state.options.as, {
      presenceContext: null,
      parent: (_a = this.state.parent) == null ? void 0 : _a.visualElement,
      props: {
        ...this.state.options,
        whileTap: this.state.options.whilePress
      },
      visualState: {
        renderState: {
          transform: {},
          transformOrigin: {},
          style: {},
          vars: {},
          attrs: {}
        },
        latestValues: {
          ...this.state.baseTarget
        }
      },
      reducedMotionConfig: this.state.options.motionConfig.reducedMotion
    });
    (_b = this.state.visualElement.parent) == null ? void 0 : _b.addChild(this.state.visualElement);
    this.state.animateUpdates = this.animateUpdates;
    if (this.state.isMounted())
      this.state.startAnimation();
  }
  updateAnimationControlsSubscription() {
    const { animate: animate2 } = this.state.options;
    if (isAnimationControls(animate2)) {
      this.unmountControls = animate2.subscribe(this.state);
    }
  }
  executeAnimations({
    factories,
    getChildAnimations,
    transition,
    controlActiveState,
    isExit = false
  }) {
    const getAnimation = () => Promise.all(factories.map((factory) => factory()).filter(Boolean));
    const animationTarget = { ...this.state.target };
    const element = this.state.element;
    const finishAnimation = (animationPromise) => {
      var _a, _b;
      if (isExit) {
        this.state.isExiting = true;
      }
      element.dispatchEvent(motionEvent("motionstart", animationTarget));
      (_b = (_a = this.state.options).onAnimationStart) == null ? void 0 : _b.call(_a, animationTarget);
      animationPromise.then(() => {
        var _a2, _b2, _c, _d;
        if (isExit) {
          this.state.isExiting = false;
          const presenceContext = this.state.options.animatePresenceContext;
          if ((presenceContext == null ? void 0 : presenceContext.onMotionExitComplete) && this.state.presenceContainer) {
            const state = this.state;
            const projection = state.visualElement.projection;
            if (!(((_a2 = state.options) == null ? void 0 : _a2.layoutId) && ((_b2 = projection.currentAnimation) == null ? void 0 : _b2.state) === "running" && !state.options.exit)) {
              presenceContext.onMotionExitComplete(state.presenceContainer, state);
            }
          }
        }
        element.dispatchEvent(motionEvent("motioncomplete", animationTarget, isExit));
        (_d = (_c = this.state.options).onAnimationComplete) == null ? void 0 : _d.call(_c, animationTarget);
      }).catch(noop);
    };
    const getAnimationPromise = () => {
      const animationPromise = (transition == null ? void 0 : transition.when) ? (transition.when === "beforeChildren" ? getAnimation() : getChildAnimations()).then(() => transition.when === "beforeChildren" ? getChildAnimations() : getAnimation()) : Promise.all([getAnimation(), getChildAnimations()]);
      finishAnimation(animationPromise);
      return animationPromise;
    };
    return controlActiveState ? getAnimationPromise : getAnimationPromise();
  }
  /**
   * Setup child animations
   */
  setupChildAnimations(transition, controlActiveState) {
    var _a;
    const visualElement = this.state.visualElement;
    if (!((_a = visualElement.variantChildren) == null ? void 0 : _a.size) || !controlActiveState)
      return { getChildAnimations: () => Promise.resolve() };
    const { staggerChildren = 0, staggerDirection = 1, delayChildren = 0 } = transition || {};
    const numChildren = visualElement.variantChildren.size;
    const maxStaggerDuration = (numChildren - 1) * staggerChildren;
    const delayIsFunction = typeof delayChildren === "function";
    const generateStaggerDuration = delayIsFunction ? (i) => delayChildren(i, numChildren) : staggerDirection === 1 ? (i = 0) => i * staggerChildren : (i = 0) => maxStaggerDuration - i * staggerChildren;
    const childAnimations = Array.from(visualElement.variantChildren).map((child, index) => {
      return child.state.animateUpdates({
        controlActiveState,
        controlDelay: (delayIsFunction ? 0 : delayChildren) + generateStaggerDuration(index)
      });
    });
    return {
      getChildAnimations: () => Promise.all(childAnimations.map((animation) => {
        return animation();
      }))
    };
  }
  createAnimationFactories(prevTarget, animationOptions, controlDelay) {
    const factories = [];
    Object.keys(this.state.target).forEach((key) => {
      var _a;
      if (!hasChanged(prevTarget[key], this.state.target[key]))
        return;
      (_a = this.state.baseTarget)[key] ?? (_a[key] = style.get(this.state.element, key));
      const keyValue = this.state.target[key] === "none" && isDef(transformResetValue[key]) ? transformResetValue[key] : this.state.target[key];
      factories.push(() => {
        var _a2;
        return animate(
          this.state.element,
          { [key]: keyValue },
          {
            ...(animationOptions == null ? void 0 : animationOptions[key]) || animationOptions,
            delay: (((_a2 = animationOptions == null ? void 0 : animationOptions[key]) == null ? void 0 : _a2.delay) || (animationOptions == null ? void 0 : animationOptions.delay) || 0) + controlDelay
          }
        );
      });
    });
    return factories;
  }
  resolveStateAnimation({
    controlActiveState,
    directAnimate,
    directTransition
  }) {
    let variantTransition = this.state.options.transition;
    let variant = {};
    const { variants, custom, transition, animatePresenceContext } = this.state.options;
    const customValue = custom ?? (animatePresenceContext == null ? void 0 : animatePresenceContext.custom);
    this.state.activeStates = { ...this.state.activeStates, ...controlActiveState };
    STATE_TYPES.forEach((name) => {
      if (!this.state.activeStates[name] || isAnimationControls(this.state.options[name]))
        return;
      const definition = this.state.options[name];
      let resolvedVariant = isDef(definition) ? resolveVariant(definition, variants, customValue) : void 0;
      if (this.state.visualElement.isVariantNode) {
        const controlVariant = resolveVariant(this.state.context[name], variants, customValue);
        resolvedVariant = controlVariant ? Object.assign(controlVariant || {}, resolvedVariant) : Object.assign(variant, resolvedVariant);
      }
      if (!resolvedVariant)
        return;
      if (name !== "initial")
        variantTransition = resolvedVariant.transition || this.state.options.transition || {};
      variant = Object.assign(variant, resolvedVariant);
    });
    if (directAnimate) {
      variant = resolveVariant(directAnimate, variants, customValue);
      variantTransition = variant.transition || directTransition || transition;
    }
    Object.entries(variant).forEach(([key, value]) => {
      if (key === "transition")
        return;
      this.state.target[key] = value;
    });
    return variantTransition;
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    var _a, _b;
    const { element } = this.state;
    mountedStates.set(element, this.state);
    if (!visualElementStore.get(element)) {
      this.state.visualElement.mount(element);
      visualElementStore.set(element, this.state.visualElement);
    }
    this.state.visualElement.state = this.state;
    this.updateAnimationControlsSubscription();
    const visualElement = this.state.visualElement;
    const parentVisualElement = visualElement.parent;
    visualElement.enteringChildren = void 0;
    if (((_a = this.state.parent) == null ? void 0 : _a.isMounted()) && !visualElement.isControllingVariants && ((_b = parentVisualElement == null ? void 0 : parentVisualElement.enteringChildren) == null ? void 0 : _b.has(visualElement))) {
      const { delayChildren } = this.state.parent.finalTransition || {};
      this.animateUpdates({
        controlActiveState: this.state.parent.activeStates,
        controlDelay: calcChildStagger(parentVisualElement.enteringChildren, visualElement, delayChildren)
      })();
    }
  }
  update() {
    const { animate: animate2 } = this.state.options;
    const { animate: prevAnimate } = this.state.visualElement.prevProps || {};
    if (animate2 !== prevAnimate) {
      this.updateAnimationControlsSubscription();
    }
  }
  unmount() {
    var _a;
    (_a = this.unmountControls) == null ? void 0 : _a.call(this);
  }
}
export {
  AnimationFeature
};
