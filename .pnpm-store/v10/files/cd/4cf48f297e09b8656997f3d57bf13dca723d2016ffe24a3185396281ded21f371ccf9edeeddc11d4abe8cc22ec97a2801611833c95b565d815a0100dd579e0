import { injectMotion, injectLayoutGroup, provideMotion } from "../context.mjs";
import { getMotionElement } from "../hooks/use-motion-elm.mjs";
import { useLazyMotionContext } from "../lazy-motion/context.mjs";
import { checkMotionIsHidden } from "./utils.mjs";
import { injectAnimatePresence, PRESENCE_CHILD_ATTR } from "../animate-presence/presence.mjs";
import { MotionState } from "../../state/motion-state.mjs";
import { convertSvgStyleToAttributes, createStyles } from "../../state/style.mjs";
import { warning, invariant } from "hey-listen";
import { ref, useAttrs, getCurrentInstance, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, onBeforeUpdate, onUpdated } from "vue";
import { useMotionConfig } from "../motion-config/context.mjs";
import { isMotionValue } from "../../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/value/utils/is-motion-value.mjs";
function useMotionState(props) {
  var _a;
  const parentState = injectMotion(null);
  const layoutGroup = injectLayoutGroup({});
  const config = useMotionConfig();
  const animatePresenceContext = injectAnimatePresence({});
  const lazyMotionContext = useLazyMotionContext({
    features: ref([]),
    strict: false
  });
  if (process.env.NODE_ENV !== "production" && ((_a = props.features) == null ? void 0 : _a.length) && lazyMotionContext.strict) {
    const strictMessage = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
    props.ignoreStrict ? warning(false, strictMessage) : invariant(false, strictMessage);
  }
  const attrs = useAttrs();
  function getLayoutId() {
    if (layoutGroup.id && props.layoutId)
      return `${layoutGroup.id}-${props.layoutId}`;
    return props.layoutId || void 0;
  }
  function getProps() {
    return {
      ...props,
      lazyMotionContext,
      layoutId: getLayoutId(),
      transition: props.transition ?? config.value.transition,
      layoutGroup,
      motionConfig: config.value,
      inViewOptions: props.inViewOptions ?? config.value.inViewOptions,
      animatePresenceContext,
      initial: animatePresenceContext.initial === false ? animatePresenceContext.initial : props.initial === true ? void 0 : props.initial
    };
  }
  function getMotionProps() {
    return {
      ...attrs,
      ...getProps()
    };
  }
  const state = new MotionState(
    getMotionProps(),
    parentState
  );
  provideMotion(state);
  function getAttrs() {
    var _a2;
    const isSVG = state.type === "svg";
    const attrsProps = { ...attrs };
    Object.keys(attrs).forEach((key) => {
      if (isMotionValue(attrs[key]))
        attrsProps[key] = attrs[key].get();
    });
    let styleProps = {
      ...props.style,
      ...isSVG ? {} : ((_a2 = state.visualElement) == null ? void 0 : _a2.latestValues) || state.baseTarget
    };
    if (isSVG) {
      const { attrs: attrs2, style: style2 } = convertSvgStyleToAttributes({
        ...state.isMounted() ? state.target : state.baseTarget,
        ...styleProps
      });
      if (style2.transform || attrs2.transformOrigin) {
        style2.transformOrigin = attrs2.transformOrigin ?? "50% 50%";
        delete attrs2.transformOrigin;
      }
      if (style2.transform) {
        style2.transformBox = style2.transformBox ?? "fill-box";
        delete attrs2.transformBox;
      }
      Object.assign(attrsProps, attrs2);
      styleProps = style2;
    }
    if (props.drag && props.dragListener !== false) {
      Object.assign(styleProps, {
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
        touchAction: props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`
      });
    }
    const style = createStyles(styleProps);
    if (style)
      attrsProps.style = style;
    return attrsProps;
  }
  const instance = getCurrentInstance().proxy;
  onBeforeMount(() => {
    state.beforeMount();
  });
  onMounted(() => {
    state.mount(getMotionElement(instance.$el), getMotionProps(), checkMotionIsHidden(instance));
    if (animatePresenceContext.register && state.element) {
      const container = state.element.closest(`[${PRESENCE_CHILD_ATTR}]`);
      if (container) {
        state.presenceContainer = container;
        animatePresenceContext.register(container, state);
      } else if (animatePresenceContext.registerPending) {
        animatePresenceContext.registerPending(state);
      }
    }
  });
  onBeforeUnmount(() => state.beforeUnmount());
  onUnmounted(() => {
    if (animatePresenceContext.unregisterPending) {
      animatePresenceContext.unregisterPending(state);
    }
    const el = getMotionElement(instance.$el);
    if (!(el == null ? void 0 : el.isConnected)) {
      state.unmount();
    }
  });
  onBeforeUpdate(() => {
    state.beforeUpdate(getMotionProps());
  });
  onUpdated(() => {
    state.update(getMotionProps());
  });
  return {
    getProps,
    getAttrs,
    layoutGroup,
    state
  };
}
export {
  useMotionState
};
