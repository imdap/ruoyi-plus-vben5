import defu from 'defu';
import { ref, unref, watch, computed, reactive, toRaw, inject, onUpdated, nextTick, defineComponent, useSlots, h, Fragment, isRef } from 'vue';
import { isObject as isObject$1, useEventListener, useIntersectionObserver, unrefElement, useMediaQuery } from '@vueuse/core';
import { tryOnUnmounted } from '@vueuse/shared';
import sync, { getFrameData } from 'framesync';
import { velocityPerSecond, inertia, animate, cubicBezier, bounceOut, bounceInOut, bounceIn, anticipate, backOut, backInOut, backIn, circOut, circInOut, circIn, easeOut, easeInOut, easeIn, linear } from 'popmotion';
import { number, alpha, filter, px, progressPercentage, degrees, scale, color, complex } from 'style-value-types';

const motionState = {};

class SubscriptionManager {
  subscriptions = /* @__PURE__ */ new Set();
  add(handler) {
    this.subscriptions.add(handler);
    return () => this.subscriptions.delete(handler);
  }
  notify(a, b, c) {
    if (!this.subscriptions.size)
      return;
    for (const handler of this.subscriptions) handler(a, b, c);
  }
  clear() {
    this.subscriptions.clear();
  }
}

function isFloat(value) {
  return !Number.isNaN(Number.parseFloat(value));
}
class MotionValue {
  /**
   * The current state of the `MotionValue`.
   */
  current;
  /**
   * The previous state of the `MotionValue`.
   */
  prev;
  /**
   * Duration, in milliseconds, since last updating frame.
   */
  timeDelta = 0;
  /**
   * Timestamp of the last time this `MotionValue` was updated.
   */
  lastUpdated = 0;
  /**
   * Functions to notify when the `MotionValue` updates.
   */
  updateSubscribers = new SubscriptionManager();
  /**
   * A reference to the currently-controlling Popmotion animation
   */
  stopAnimation;
  /**
   * Tracks whether this value can output a velocity.
   */
  canTrackVelocity = false;
  /**
   * init - The initiating value
   * config - Optional configuration options
   */
  constructor(init) {
    this.prev = this.current = init;
    this.canTrackVelocity = isFloat(this.current);
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   */
  onChange(subscription) {
    return this.updateSubscribers.add(subscription);
  }
  clearListeners() {
    this.updateSubscribers.clear();
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @param v
   * @param render
   */
  set(v) {
    this.updateAndNotify(v);
  }
  /**
   * Update and notify `MotionValue` subscribers.
   *
   * @param v
   * @param render
   */
  updateAndNotify = (v) => {
    this.prev = this.current;
    this.current = v;
    const { delta, timestamp } = getFrameData();
    if (this.lastUpdated !== timestamp) {
      this.timeDelta = delta;
      this.lastUpdated = timestamp;
    }
    sync.postRender(this.scheduleVelocityCheck);
    this.updateSubscribers.notify(this.current);
  };
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   */
  get() {
    return this.current;
  }
  /**
   * Get previous value.
   *
   * @returns - The previous latest state of `MotionValue`
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   */
  getVelocity() {
    return this.canTrackVelocity ? velocityPerSecond(Number.parseFloat(this.current) - Number.parseFloat(this.prev), this.timeDelta) : 0;
  }
  /**
   * Schedule a velocity check for the next frame.
   */
  scheduleVelocityCheck = () => sync.postRender(this.velocityCheck);
  /**
   * Updates `prev` with `current` if the value hasn't been updated this frame.
   * This ensures velocity calculations return `0`.
   */
  velocityCheck = ({ timestamp }) => {
    if (!this.canTrackVelocity)
      this.canTrackVelocity = isFloat(this.current);
    if (timestamp !== this.lastUpdated)
      this.prev = this.current;
  };
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   */
  start(animation) {
    this.stop();
    return new Promise((resolve) => {
      const { stop } = animation(resolve);
      this.stopAnimation = stop;
    }).then(() => this.clearAnimation());
  }
  /**
   * Stop the currently active animation.
   */
  stop() {
    if (this.stopAnimation)
      this.stopAnimation();
    this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   */
  isAnimating() {
    return !!this.stopAnimation;
  }
  /**
   * Clear the current animation reference.
   */
  clearAnimation() {
    this.stopAnimation = null;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   */
  destroy() {
    this.updateSubscribers.clear();
    this.stop();
  }
}
function getMotionValue(init) {
  return new MotionValue(init);
}

const { isArray } = Array;
function useMotionValues() {
  const motionValues = ref({});
  const stop = (keys) => {
    const destroyKey = (key) => {
      if (!motionValues.value[key])
        return;
      motionValues.value[key].stop();
      motionValues.value[key].destroy();
      delete motionValues.value[key];
    };
    if (keys) {
      if (isArray(keys)) {
        keys.forEach(destroyKey);
      } else {
        destroyKey(keys);
      }
    } else {
      Object.keys(motionValues.value).forEach(destroyKey);
    }
  };
  const get = (key, from, target) => {
    if (motionValues.value[key])
      return motionValues.value[key];
    const motionValue = getMotionValue(from);
    motionValue.onChange((v) => target[key] = v);
    motionValues.value[key] = motionValue;
    return motionValue;
  };
  tryOnUnmounted(stop);
  return {
    motionValues,
    get,
    stop
  };
}

function isKeyframesTarget(v) {
  return Array.isArray(v);
}
function underDampedSpring() {
  return {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restDelta: 0.5,
    restSpeed: 10
  };
}
function criticallyDampedSpring(to) {
  return {
    type: "spring",
    stiffness: 550,
    damping: to === 0 ? 2 * Math.sqrt(550) : 30,
    restDelta: 0.01,
    restSpeed: 10
  };
}
function overDampedSpring(to) {
  return {
    type: "spring",
    stiffness: 550,
    damping: to === 0 ? 100 : 30,
    restDelta: 0.01,
    restSpeed: 10
  };
}
function linearTween() {
  return {
    type: "keyframes",
    ease: "linear",
    duration: 300
  };
}
function keyframes(values) {
  return {
    type: "keyframes",
    duration: 800,
    values
  };
}
const defaultTransitions = {
  default: overDampedSpring,
  x: underDampedSpring,
  y: underDampedSpring,
  z: underDampedSpring,
  rotate: underDampedSpring,
  rotateX: underDampedSpring,
  rotateY: underDampedSpring,
  rotateZ: underDampedSpring,
  scaleX: criticallyDampedSpring,
  scaleY: criticallyDampedSpring,
  scale: criticallyDampedSpring,
  backgroundColor: linearTween,
  color: linearTween,
  opacity: linearTween
};
function getDefaultTransition(valueKey, to) {
  let transitionFactory;
  if (isKeyframesTarget(to)) {
    transitionFactory = keyframes;
  } else {
    transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
  }
  return { to, ...transitionFactory(to) };
}

const int = {
  ...number,
  transform: Math.round
};
const valueTypes = {
  // Color props
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  // Border props
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  // Positioning props
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  size: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  // Spacing props
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  // Transform props
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px,
  // Misc
  zIndex: int,
  filter,
  WebkitFilter: filter,
  // SVG
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};
const getValueType = (key) => valueTypes[key];
function getValueAsType(value, type) {
  return type && typeof value === "number" && type.transform ? type.transform(value) : value;
}
function getAnimatableNone(key, value) {
  let defaultValueType = getValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}

const easingLookup = {
  linear,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate,
  bounceIn,
  bounceInOut,
  bounceOut
};
function easingDefinitionToFunction(definition) {
  if (Array.isArray(definition)) {
    const [x1, y1, x2, y2] = definition;
    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    return easingLookup[definition];
  }
  return definition;
}
function isEasingArray(ease) {
  return Array.isArray(ease) && typeof ease[0] !== "number";
}
function isAnimatable(key, value) {
  if (key === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && complex.test(value) && !value.startsWith("url(")) {
    return true;
  }
  return false;
}
function hydrateKeyframes(options) {
  if (Array.isArray(options.to) && options.to[0] === null) {
    options.to = [...options.to];
    options.to[0] = options.from;
  }
  return options;
}
function convertTransitionToAnimationOptions({ ease, times, delay, ...transition }) {
  const options = { ...transition };
  if (times)
    options.offset = times;
  if (ease) {
    options.ease = isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
  }
  if (delay)
    options.elapsed = -delay;
  return options;
}
function getPopmotionAnimationOptions(transition, options, key) {
  if (Array.isArray(options.to)) {
    if (!transition.duration)
      transition.duration = 800;
  }
  hydrateKeyframes(options);
  if (!isTransitionDefined(transition)) {
    transition = {
      ...transition,
      ...getDefaultTransition(key, options.to)
    };
  }
  return {
    ...options,
    ...convertTransitionToAnimationOptions(transition)
  };
}
function isTransitionDefined({ delay, repeat, repeatType, repeatDelay, from, ...transition }) {
  return !!Object.keys(transition).length;
}
function getValueTransition(transition, key) {
  return transition[key] || transition.default || transition;
}
function getAnimation(key, value, target, transition, onComplete) {
  const valueTransition = getValueTransition(transition, key);
  let origin = valueTransition.from === null || valueTransition.from === void 0 ? value.get() : valueTransition.from;
  const isTargetAnimatable = isAnimatable(key, target);
  if (origin === "none" && isTargetAnimatable && typeof target === "string")
    origin = getAnimatableNone(key, target);
  const isOriginAnimatable = isAnimatable(key, origin);
  function start(complete) {
    const options = {
      from: origin,
      to: target,
      velocity: transition.velocity ? transition.velocity : value.getVelocity(),
      onUpdate: (v) => value.set(v)
    };
    return valueTransition.type === "inertia" || valueTransition.type === "decay" ? inertia({ ...options, ...valueTransition }) : animate({
      ...getPopmotionAnimationOptions(valueTransition, options, key),
      onUpdate: (v) => {
        options.onUpdate(v);
        if (valueTransition.onUpdate)
          valueTransition.onUpdate(v);
      },
      onComplete: () => {
        if (onComplete)
          onComplete();
        if (complete)
          complete();
      }
    });
  }
  function set(complete) {
    value.set(target);
    if (onComplete)
      onComplete();
    if (complete)
      complete();
    return { stop: () => {
    } };
  }
  return !isOriginAnimatable || !isTargetAnimatable || valueTransition.type === false ? set : start;
}

function useMotionTransitions() {
  const { motionValues, stop, get } = useMotionValues();
  const push = (key, value, target, transition = {}, onComplete) => {
    const from = target[key];
    const motionValue = get(key, from, target);
    if (transition && transition.immediate) {
      motionValue.set(value);
      return;
    }
    const animation = getAnimation(key, motionValue, value, transition, onComplete);
    motionValue.start(animation);
  };
  return { motionValues, stop, push };
}

function useMotionControls(motionProperties, variants = {}, { motionValues, push, stop } = useMotionTransitions()) {
  const _variants = unref(variants);
  const isAnimating = ref(false);
  watch(
    motionValues,
    (newVal) => {
      isAnimating.value = Object.values(newVal).filter((value) => value.isAnimating()).length > 0;
    },
    {
      immediate: true,
      deep: true
    }
  );
  const getVariantFromKey = (variant) => {
    if (!_variants || !_variants[variant])
      throw new Error(`The variant ${variant} does not exist.`);
    return _variants[variant];
  };
  const apply = (variant) => {
    if (typeof variant === "string")
      variant = getVariantFromKey(variant);
    const animations = Object.entries(variant).map(([key, value]) => {
      if (key === "transition")
        return void 0;
      return new Promise(
        (resolve) => (
          // @ts-expect-error - Fix errors later for typescript 5
          push(key, value, motionProperties, variant.transition || getDefaultTransition(key, variant[key]), resolve)
        )
      );
    }).filter(Boolean);
    async function waitForComplete() {
      await Promise.all(animations);
      variant.transition?.onComplete?.();
    }
    return Promise.all([waitForComplete()]);
  };
  const set = (variant) => {
    const variantData = isObject$1(variant) ? variant : getVariantFromKey(variant);
    Object.entries(variantData).forEach(([key, value]) => {
      if (key === "transition")
        return;
      push(key, value, motionProperties, {
        immediate: true
      });
    });
  };
  const leave = async (done) => {
    let leaveVariant;
    if (_variants) {
      if (_variants.leave)
        leaveVariant = _variants.leave;
      if (!_variants.leave && _variants.initial)
        leaveVariant = _variants.initial;
    }
    if (!leaveVariant) {
      done();
      return;
    }
    await apply(leaveVariant);
    done();
  };
  return {
    isAnimating,
    apply,
    set,
    leave,
    stop
  };
}

const isBrowser = typeof window !== "undefined";
const supportsPointerEvents = () => isBrowser && (window.onpointerdown === null || import.meta.env?.TEST);
const supportsTouchEvents = () => isBrowser && (window.ontouchstart === null || import.meta.env?.TEST);
const supportsMouseEvents = () => isBrowser && (window.onmousedown === null || import.meta.env?.TEST);

function registerEventListeners({ target, state, variants, apply }) {
  const _variants = unref(variants);
  const hovered = ref(false);
  const tapped = ref(false);
  const focused = ref(false);
  const mutableKeys = computed(() => {
    let result = [...Object.keys(state.value || {})];
    if (!_variants)
      return result;
    if (_variants.hovered)
      result = [...result, ...Object.keys(_variants.hovered)];
    if (_variants.tapped)
      result = [...result, ...Object.keys(_variants.tapped)];
    if (_variants.focused)
      result = [...result, ...Object.keys(_variants.focused)];
    return result;
  });
  const computedProperties = computed(() => {
    const result = {};
    Object.assign(result, state.value);
    if (hovered.value && _variants.hovered)
      Object.assign(result, _variants.hovered);
    if (tapped.value && _variants.tapped)
      Object.assign(result, _variants.tapped);
    if (focused.value && _variants.focused)
      Object.assign(result, _variants.focused);
    for (const key in result) {
      if (!mutableKeys.value.includes(key))
        delete result[key];
    }
    return result;
  });
  if (_variants.hovered) {
    useEventListener(target, "mouseenter", () => hovered.value = true);
    useEventListener(target, "mouseleave", () => {
      hovered.value = false;
      tapped.value = false;
    });
  }
  if (_variants.tapped) {
    if (supportsMouseEvents()) {
      useEventListener(target, "mousedown", () => tapped.value = true);
      useEventListener(target, "mouseup", () => tapped.value = false);
    }
    if (supportsPointerEvents()) {
      useEventListener(target, "pointerdown", () => tapped.value = true);
      useEventListener(target, "pointerup", () => tapped.value = false);
    }
    if (supportsTouchEvents()) {
      useEventListener(target, "touchstart", () => tapped.value = true);
      useEventListener(target, "touchend", () => tapped.value = false);
    }
  }
  if (_variants.focused) {
    useEventListener(target, "focus", () => focused.value = true);
    useEventListener(target, "blur", () => focused.value = false);
  }
  watch([hovered, tapped, focused], () => {
    apply(computedProperties.value);
  });
}

function registerLifeCycleHooks({ set, target, variants, variant }) {
  const _variants = unref(variants);
  watch(
    () => target,
    () => {
      if (!_variants)
        return;
      if (_variants.initial) {
        set("initial");
        variant.value = "initial";
      }
      if (_variants.enter)
        variant.value = "enter";
    },
    {
      immediate: true,
      flush: "pre"
    }
  );
}

function registerVariantsSync({ state, apply }) {
  watch(
    state,
    (newVal) => {
      if (newVal)
        apply(newVal);
    },
    {
      immediate: true
    }
  );
}

function registerVisibilityHooks({ target, variants, variant }) {
  const _variants = unref(variants);
  if (_variants && (_variants.visible || _variants.visibleOnce)) {
    useIntersectionObserver(target, ([{ isIntersecting }]) => {
      if (_variants.visible) {
        if (isIntersecting)
          variant.value = "visible";
        else variant.value = "initial";
      } else if (_variants.visibleOnce) {
        if (isIntersecting && variant.value !== "visibleOnce")
          variant.value = "visibleOnce";
        else if (!variant.value)
          variant.value = "initial";
      }
    });
  }
}

function useMotionFeatures(instance, options = {
  syncVariants: true,
  lifeCycleHooks: true,
  visibilityHooks: true,
  eventListeners: true
}) {
  if (options.lifeCycleHooks)
    registerLifeCycleHooks(instance);
  if (options.syncVariants)
    registerVariantsSync(instance);
  if (options.visibilityHooks)
    registerVisibilityHooks(instance);
  if (options.eventListeners)
    registerEventListeners(instance);
}

function reactiveStyle(props = {}) {
  const state = reactive({
    ...props
  });
  const style = ref({});
  watch(
    state,
    () => {
      const result = {};
      for (const [key, value] of Object.entries(state)) {
        const valueType = getValueType(key);
        const valueAsType = getValueAsType(value, valueType);
        result[key] = valueAsType;
      }
      style.value = result;
    },
    {
      immediate: true,
      deep: true
    }
  );
  return {
    state,
    style
  };
}

function usePermissiveTarget(target, onTarget) {
  watch(
    () => unrefElement(target),
    (el) => {
      if (!el)
        return;
      onTarget(el);
    },
    {
      immediate: true
    }
  );
}

const translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ"
};
function reactiveTransform(props = {}, enableHardwareAcceleration = true) {
  const state = reactive({ ...props });
  const transform = ref("");
  watch(
    state,
    (newVal) => {
      let result = "";
      let hasHardwareAcceleration = false;
      if (enableHardwareAcceleration && (newVal.x || newVal.y || newVal.z)) {
        const str = [newVal.x || 0, newVal.y || 0, newVal.z || 0].map((val) => getValueAsType(val, px)).join(",");
        result += `translate3d(${str}) `;
        hasHardwareAcceleration = true;
      }
      for (const [key, value] of Object.entries(newVal)) {
        if (enableHardwareAcceleration && (key === "x" || key === "y" || key === "z"))
          continue;
        const valueType = getValueType(key);
        const valueAsType = getValueAsType(value, valueType);
        result += `${translateAlias[key] || key}(${valueAsType}) `;
      }
      if (enableHardwareAcceleration && !hasHardwareAcceleration)
        result += "translateZ(0px) ";
      transform.value = result.trim();
    },
    {
      immediate: true,
      deep: true
    }
  );
  return {
    state,
    transform
  };
}

const transformAxes = ["", "X", "Y", "Z"];
const order = ["perspective", "translate", "scale", "rotate", "skew"];
const transformProps = ["transformPerspective", "x", "y", "z"];
order.forEach((operationKey) => {
  transformAxes.forEach((axesKey) => {
    const key = operationKey + axesKey;
    transformProps.push(key);
  });
});
const transformPropSet = new Set(transformProps);
function isTransformProp(key) {
  return transformPropSet.has(key);
}
const transformOriginProps = /* @__PURE__ */ new Set(["originX", "originY", "originZ"]);
function isTransformOriginProp(key) {
  return transformOriginProps.has(key);
}
function splitValues(variant) {
  const transform = {};
  const style = {};
  Object.entries(variant).forEach(([key, value]) => {
    if (isTransformProp(key) || isTransformOriginProp(key))
      transform[key] = value;
    else style[key] = value;
  });
  return { transform, style };
}
function variantToStyle(variant) {
  const { transform: _transform, style: _style } = splitValues(variant);
  const { transform } = reactiveTransform(_transform);
  const { style } = reactiveStyle(_style);
  if (transform.value)
    style.value.transform = transform.value;
  return style.value;
}

function useElementStyle(target, onInit) {
  let _cache;
  let _target;
  const { state, style } = reactiveStyle();
  usePermissiveTarget(target, (el) => {
    _target = el;
    for (const key of Object.keys(valueTypes)) {
      if (el.style[key] === null || el.style[key] === "" || isTransformProp(key) || isTransformOriginProp(key))
        continue;
      state[key] = el.style[key];
    }
    if (_cache) {
      Object.entries(_cache).forEach(([key, value]) => el.style[key] = value);
    }
    if (onInit)
      onInit(state);
  });
  watch(
    style,
    (newVal) => {
      if (!_target) {
        _cache = newVal;
        return;
      }
      for (const key in newVal) _target.style[key] = newVal[key];
    },
    {
      immediate: true
    }
  );
  return {
    style: state
  };
}

function parseTransform(transform) {
  const transforms = transform.trim().split(/\) |\)/);
  if (transforms.length === 1)
    return {};
  const parseValues = (value) => {
    if (value.endsWith("px") || value.endsWith("deg"))
      return Number.parseFloat(value);
    if (Number.isNaN(Number(value)))
      return Number(value);
    return value;
  };
  return transforms.reduce((acc, transform2) => {
    if (!transform2)
      return acc;
    const [name, transformValue] = transform2.split("(");
    const valueArray = transformValue.split(",");
    const values = valueArray.map((val) => {
      return parseValues(val.endsWith(")") ? val.replace(")", "") : val.trim());
    });
    const value = values.length === 1 ? values[0] : values;
    return {
      ...acc,
      [name]: value
    };
  }, {});
}
function stateFromTransform(state, transform) {
  Object.entries(parseTransform(transform)).forEach(([key, value]) => {
    const axes = ["x", "y", "z"];
    if (key === "translate3d") {
      if (value === 0) {
        axes.forEach((axis) => state[axis] = 0);
        return;
      }
      value.forEach((axisValue, index) => state[axes[index]] = axisValue);
      return;
    }
    value = Number.parseFloat(`${value}`);
    if (key === "translateX") {
      state.x = value;
      return;
    }
    if (key === "translateY") {
      state.y = value;
      return;
    }
    if (key === "translateZ") {
      state.z = value;
      return;
    }
    state[key] = value;
  });
}

function useElementTransform(target, onInit) {
  let _cache;
  let _target;
  const { state, transform } = reactiveTransform();
  usePermissiveTarget(target, (el) => {
    _target = el;
    if (el.style.transform)
      stateFromTransform(state, el.style.transform);
    if (_cache)
      el.style.transform = _cache;
    if (onInit)
      onInit(state);
  });
  watch(
    transform,
    (newValue) => {
      if (!_target) {
        _cache = newValue;
        return;
      }
      _target.style.transform = newValue;
    },
    {
      immediate: true
    }
  );
  return {
    transform: state
  };
}

function objectEntries(obj) {
  return Object.entries(obj);
}

function useMotionProperties(target, defaultValues) {
  const motionProperties = reactive({});
  const apply = (values) => Object.entries(values).forEach(([key, value]) => motionProperties[key] = value);
  const { style } = useElementStyle(target, apply);
  const { transform } = useElementTransform(target, apply);
  watch(
    motionProperties,
    (newVal) => {
      objectEntries(newVal).forEach(([key, value]) => {
        const target2 = isTransformProp(key) ? transform : style;
        if (target2[key] && target2[key] === value)
          return;
        target2[key] = value;
      });
    },
    {
      immediate: true,
      deep: true
    }
  );
  usePermissiveTarget(target, () => defaultValues && apply(defaultValues));
  return {
    motionProperties,
    style,
    transform
  };
}

function useMotionVariants(variants = {}) {
  const _variants = unref(variants);
  const variant = ref();
  const state = computed(() => {
    if (!variant.value)
      return;
    return _variants[variant.value];
  });
  return {
    state,
    variant
  };
}

function useMotion(target, variants = {}, options) {
  const { motionProperties } = useMotionProperties(target);
  const { variant, state } = useMotionVariants(variants);
  const controls = useMotionControls(motionProperties, variants);
  const instance = {
    target,
    variant,
    variants,
    state,
    motionProperties,
    ...controls
  };
  useMotionFeatures(instance, options);
  return instance;
}

const transitionKeys = ["delay", "duration"];
const directivePropsKeys = ["initial", "enter", "leave", "visible", "visible-once", "visibleOnce", "hovered", "tapped", "focused", ...transitionKeys];
function isTransitionKey(val) {
  return transitionKeys.includes(val);
}
function resolveVariants(node, variantsRef) {
  const target = node.props ? node.props : node.data && node.data.attrs ? node.data.attrs : {};
  if (target) {
    if (target.variants && isObject$1(target.variants)) {
      variantsRef.value = {
        ...variantsRef.value,
        ...target.variants
      };
    }
    for (let key of directivePropsKeys) {
      if (!target || !target[key])
        continue;
      if (isTransitionKey(key) && typeof target[key] === "number") {
        for (const variantKey of ["enter", "visible", "visibleOnce"]) {
          const variantConfig = variantsRef.value[variantKey];
          if (variantConfig == null)
            continue;
          variantConfig.transition ??= {};
          variantConfig.transition[key] = target[key];
        }
        continue;
      }
      if (isObject$1(target[key])) {
        const prop = target[key];
        if (key === "visible-once")
          key = "visibleOnce";
        variantsRef.value[key] = prop;
      }
    }
  }
}

function directive(variants, isPreset = false) {
  const register = (el, binding, node) => {
    const key = binding.value && typeof binding.value === "string" ? binding.value : node.key;
    if (key && motionState[key])
      motionState[key].stop();
    const variantsObject = isPreset ? structuredClone(toRaw(variants) || {}) : variants || {};
    const variantsRef = ref(variantsObject);
    if (typeof binding.value === "object")
      variantsRef.value = binding.value;
    resolveVariants(node, variantsRef);
    const motionOptions = { eventListeners: true, lifeCycleHooks: true, syncVariants: true, visibilityHooks: false };
    const motionInstance = useMotion(
      el,
      variantsRef,
      motionOptions
    );
    el.motionInstance = motionInstance;
    if (key)
      motionState[key] = motionInstance;
  };
  const mounted = (el, _binding, _node) => {
    el.motionInstance && registerVisibilityHooks(el.motionInstance);
  };
  return {
    created: register,
    mounted,
    getSSRProps(binding, node) {
      let { initial: bindingInitial } = binding.value || node && node?.props || {};
      bindingInitial = unref(bindingInitial);
      const initial = defu({}, variants?.initial || {}, bindingInitial || {});
      if (!initial || Object.keys(initial).length === 0)
        return;
      const style = variantToStyle(initial);
      return {
        style
      };
    }
  };
}

const fade = {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 1
  }
};
const fadeVisible = {
  initial: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
};
const fadeVisibleOnce = {
  initial: {
    opacity: 0
  },
  visibleOnce: {
    opacity: 1
  }
};

const pop = {
  initial: {
    scale: 0,
    opacity: 0
  },
  enter: {
    scale: 1,
    opacity: 1
  }
};
const popVisible = {
  initial: {
    scale: 0,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1
  }
};
const popVisibleOnce = {
  initial: {
    scale: 0,
    opacity: 0
  },
  visibleOnce: {
    scale: 1,
    opacity: 1
  }
};

const rollLeft = {
  initial: {
    x: -100,
    rotate: 90,
    opacity: 0
  },
  enter: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleLeft = {
  initial: {
    x: -100,
    rotate: 90,
    opacity: 0
  },
  visible: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleOnceLeft = {
  initial: {
    x: -100,
    rotate: 90,
    opacity: 0
  },
  visibleOnce: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollRight = {
  initial: {
    x: 100,
    rotate: -90,
    opacity: 0
  },
  enter: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleRight = {
  initial: {
    x: 100,
    rotate: -90,
    opacity: 0
  },
  visible: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleOnceRight = {
  initial: {
    x: 100,
    rotate: -90,
    opacity: 0
  },
  visibleOnce: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollTop = {
  initial: {
    y: -100,
    rotate: -90,
    opacity: 0
  },
  enter: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleTop = {
  initial: {
    y: -100,
    rotate: -90,
    opacity: 0
  },
  visible: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleOnceTop = {
  initial: {
    y: -100,
    rotate: -90,
    opacity: 0
  },
  visibleOnce: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollBottom = {
  initial: {
    y: 100,
    rotate: 90,
    opacity: 0
  },
  enter: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleBottom = {
  initial: {
    y: 100,
    rotate: 90,
    opacity: 0
  },
  visible: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleOnceBottom = {
  initial: {
    y: 100,
    rotate: 90,
    opacity: 0
  },
  visibleOnce: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};

const slideLeft = {
  initial: {
    x: -100,
    opacity: 0
  },
  enter: {
    x: 0,
    opacity: 1
  }
};
const slideVisibleLeft = {
  initial: {
    x: -100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1
  }
};
const slideVisibleOnceLeft = {
  initial: {
    x: -100,
    opacity: 0
  },
  visibleOnce: {
    x: 0,
    opacity: 1
  }
};
const slideRight = {
  initial: {
    x: 100,
    opacity: 0
  },
  enter: {
    x: 0,
    opacity: 1
  }
};
const slideVisibleRight = {
  initial: {
    x: 100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1
  }
};
const slideVisibleOnceRight = {
  initial: {
    x: 100,
    opacity: 0
  },
  visibleOnce: {
    x: 0,
    opacity: 1
  }
};
const slideTop = {
  initial: {
    y: -100,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1
  }
};
const slideVisibleTop = {
  initial: {
    y: -100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1
  }
};
const slideVisibleOnceTop = {
  initial: {
    y: -100,
    opacity: 0
  },
  visibleOnce: {
    y: 0,
    opacity: 1
  }
};
const slideBottom = {
  initial: {
    y: 100,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1
  }
};
const slideVisibleBottom = {
  initial: {
    y: 100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1
  }
};
const slideVisibleOnceBottom = {
  initial: {
    y: 100,
    opacity: 0
  },
  visibleOnce: {
    y: 0,
    opacity: 1
  }
};

const presets = {
  __proto__: null,
  fade: fade,
  fadeVisible: fadeVisible,
  fadeVisibleOnce: fadeVisibleOnce,
  pop: pop,
  popVisible: popVisible,
  popVisibleOnce: popVisibleOnce,
  rollBottom: rollBottom,
  rollLeft: rollLeft,
  rollRight: rollRight,
  rollTop: rollTop,
  rollVisibleBottom: rollVisibleBottom,
  rollVisibleLeft: rollVisibleLeft,
  rollVisibleOnceBottom: rollVisibleOnceBottom,
  rollVisibleOnceLeft: rollVisibleOnceLeft,
  rollVisibleOnceRight: rollVisibleOnceRight,
  rollVisibleOnceTop: rollVisibleOnceTop,
  rollVisibleRight: rollVisibleRight,
  rollVisibleTop: rollVisibleTop,
  slideBottom: slideBottom,
  slideLeft: slideLeft,
  slideRight: slideRight,
  slideTop: slideTop,
  slideVisibleBottom: slideVisibleBottom,
  slideVisibleLeft: slideVisibleLeft,
  slideVisibleOnceBottom: slideVisibleOnceBottom,
  slideVisibleOnceLeft: slideVisibleOnceLeft,
  slideVisibleOnceRight: slideVisibleOnceRight,
  slideVisibleOnceTop: slideVisibleOnceTop,
  slideVisibleRight: slideVisibleRight,
  slideVisibleTop: slideVisibleTop
};

function slugify(str) {
  const a = "\xE0\xE1\xE2\xE4\xE6\xE3\xE5\u0101\u0103\u0105\xE7\u0107\u010D\u0111\u010F\xE8\xE9\xEA\xEB\u0113\u0117\u0119\u011B\u011F\u01F5\u1E27\xEE\xEF\xED\u012B\u012F\xEC\u0142\u1E3F\xF1\u0144\u01F9\u0148\xF4\xF6\xF2\xF3\u0153\xF8\u014D\xF5\u0151\u1E55\u0155\u0159\xDF\u015B\u0161\u015F\u0219\u0165\u021B\xFB\xFC\xF9\xFA\u016B\u01D8\u016F\u0171\u0173\u1E83\u1E8D\xFF\xFD\u017E\u017A\u017C\xB7/_,:;";
  const b = "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");
  return str.toString().replace(/[A-Z]/g, (s) => `-${s}`).toLowerCase().replace(/\s+/g, "-").replace(p, (c) => b.charAt(a.indexOf(c))).replace(/&/g, "-and-").replace(/[^\w\-]+/g, "").replace(/-{2,}/g, "-").replace(/^-+/, "").replace(/-+$/, "");
}

const CUSTOM_PRESETS = Symbol(
  import.meta.env?.MODE === "development" ? "motionCustomPresets" : ""
);

const MotionComponentProps = {
  // Preset to be loaded
  preset: {
    type: String,
    required: false
  },
  // Instance
  instance: {
    type: Object,
    required: false
  },
  // Variants
  variants: {
    type: Object,
    required: false
  },
  // Initial variant
  initial: {
    type: Object,
    required: false
  },
  // Lifecycle hooks variants
  enter: {
    type: Object,
    required: false
  },
  leave: {
    type: Object,
    required: false
  },
  // Intersection observer variants
  visible: {
    type: Object,
    required: false
  },
  visibleOnce: {
    type: Object,
    required: false
  },
  // Event listeners variants
  hovered: {
    type: Object,
    required: false
  },
  tapped: {
    type: Object,
    required: false
  },
  focused: {
    type: Object,
    required: false
  },
  // Helpers
  delay: {
    type: [Number, String],
    required: false
  },
  duration: {
    type: [Number, String],
    required: false
  }
};
function isObject(val) {
  return Object.prototype.toString.call(val) === "[object Object]";
}
function clone(v) {
  if (Array.isArray(v)) {
    return v.map(clone);
  }
  if (isObject(v)) {
    const res = {};
    for (const key in v) {
      res[key] = clone(v[key]);
    }
    return res;
  }
  return v;
}
function setupMotionComponent(props) {
  const instances = reactive({});
  const customPresets = inject(CUSTOM_PRESETS, {});
  const preset = computed(() => {
    if (props.preset == null) {
      return {};
    }
    if (customPresets != null && props.preset in customPresets) {
      return structuredClone(toRaw(customPresets)[props.preset]);
    }
    if (props.preset in presets) {
      return structuredClone(presets[props.preset]);
    }
    return {};
  });
  const propsConfig = computed(() => ({
    initial: props.initial,
    enter: props.enter,
    leave: props.leave,
    visible: props.visible,
    visibleOnce: props.visibleOnce,
    hovered: props.hovered,
    tapped: props.tapped,
    focused: props.focused
  }));
  function applyTransitionHelpers(config, values) {
    for (const transitionKey of ["delay", "duration"]) {
      if (values[transitionKey] == null)
        continue;
      const transitionValueParsed = Number.parseInt(
        values[transitionKey]
      );
      for (const variantKey of ["enter", "visible", "visibleOnce"]) {
        const variantConfig = config[variantKey];
        if (variantConfig == null)
          continue;
        variantConfig.transition ??= {};
        variantConfig.transition[transitionKey] = transitionValueParsed;
      }
    }
    return config;
  }
  const motionConfig = computed(() => {
    const config = defu(
      {},
      propsConfig.value,
      preset.value,
      props.variants || {}
    );
    return applyTransitionHelpers({ ...config }, props);
  });
  if (import.meta.env?.MODE === "development") {
    if (props.preset != null && presets?.[props.preset] == null && customPresets?.[props.preset] == null) {
      console.warn(`[@vueuse/motion]: Preset \`${props.preset}\` not found.`);
    }
    const replayAnimation = (instance) => {
      if (instance.variants?.initial) {
        instance.set("initial");
      }
      nextTick(() => {
        if (instance.variants?.enter)
          instance.apply("enter");
        if (instance.variants?.visible)
          instance.apply("visible");
        if (instance.variants?.visibleOnce)
          instance.apply("visibleOnce");
      });
    };
    onUpdated(() => {
      for (const key in instances) {
        replayAnimation(instances[key]);
      }
    });
  }
  function setNodeInstance(node, index, style) {
    node.props ??= {};
    node.props.style ??= {};
    node.props.style = { ...node.props.style, ...style };
    const elementMotionConfig = applyTransitionHelpers(
      clone(motionConfig.value),
      node.props
    );
    node.props.onVnodeMounted = ({ el }) => {
      instances[index] = useMotion(
        el,
        elementMotionConfig
      );
    };
    node.props.onVnodeUpdated = ({ el }) => {
      const styles = variantToStyle(instances[index].state);
      for (const [key, val] of Object.entries(styles)) {
        el.style[key] = val;
      }
    };
    return node;
  }
  return {
    motionConfig,
    setNodeInstance
  };
}

const MotionComponent = defineComponent({
  name: "Motion",
  props: {
    ...MotionComponentProps,
    is: {
      type: [String, Object],
      default: "div"
    }
  },
  setup(props) {
    const slots = useSlots();
    const { motionConfig, setNodeInstance } = setupMotionComponent(props);
    return () => {
      const style = variantToStyle(motionConfig.value.initial || {});
      const node = h(props.is, void 0, slots);
      setNodeInstance(node, 0, style);
      return node;
    };
  }
});

const MotionGroupComponent = defineComponent({
  name: "MotionGroup",
  props: {
    ...MotionComponentProps,
    is: {
      type: [String, Object],
      required: false
    }
  },
  setup(props) {
    const slots = useSlots();
    const { motionConfig, setNodeInstance } = setupMotionComponent(props);
    return () => {
      const style = variantToStyle(motionConfig.value.initial || {});
      const nodes = slots.default?.() || [];
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (n.type === Fragment && Array.isArray(n.children)) {
          n.children.forEach(function setChildInstance(child, index) {
            if (child == null)
              return;
            if (Array.isArray(child)) {
              setChildInstance(child, index);
              return;
            }
            if (typeof child === "object") {
              setNodeInstance(child, index, style);
            }
          });
        } else {
          setNodeInstance(n, i, style);
        }
      }
      if (props.is) {
        return h(props.is, void 0, nodes);
      }
      return nodes;
    };
  }
});

const MotionPlugin = {
  install(app, options) {
    app.directive("motion", directive());
    if (!options || options && !options.excludePresets) {
      for (const key in presets) {
        const preset = presets[key];
        app.directive(`motion-${slugify(key)}`, directive(preset, true));
      }
    }
    if (options && options.directives) {
      for (const key in options.directives) {
        const variants = options.directives[key];
        if (!variants.initial && import.meta.env?.MODE === "development") {
          console.warn(
            `Your directive v-motion-${key} is missing initial variant!`
          );
        }
        app.directive(`motion-${key}`, directive(variants, true));
      }
    }
    app.provide(CUSTOM_PRESETS, options?.directives);
    app.component("Motion", MotionComponent);
    app.component("MotionGroup", MotionGroupComponent);
  }
};

function isMotionInstance(obj) {
  const _obj = obj;
  return _obj.apply !== void 0 && typeof _obj.apply === "function" && _obj.set !== void 0 && typeof _obj.set === "function" && _obj.target !== void 0 && isRef(_obj.target);
}

function useMotions() {
  return motionState;
}

function useSpring(values, spring) {
  const { stop, get } = useMotionValues();
  return {
    values,
    stop,
    set: (properties) => Promise.all(
      Object.entries(properties).map(([key, value]) => {
        const motionValue = get(key, values[key], values);
        return motionValue.start((onComplete) => {
          const options = {
            type: "spring",
            ...spring || getDefaultTransition(key, value)
          };
          return animate({
            from: motionValue.get(),
            to: value,
            velocity: motionValue.getVelocity(),
            onUpdate: (v) => motionValue.set(v),
            onComplete,
            ...options
          });
        });
      })
    )
  };
}

function useReducedMotion(options = {}) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", options);
  return computed(() => reducedMotion.value);
}

export { MotionComponent, directive as MotionDirective, MotionGroupComponent, MotionPlugin, fade, fadeVisible, fadeVisibleOnce, isMotionInstance, pop, popVisible, popVisibleOnce, reactiveStyle, reactiveTransform, rollBottom, rollLeft, rollRight, rollTop, rollVisibleBottom, rollVisibleLeft, rollVisibleOnceBottom, rollVisibleOnceLeft, rollVisibleOnceRight, rollVisibleOnceTop, rollVisibleRight, rollVisibleTop, slideBottom, slideLeft, slideRight, slideTop, slideVisibleBottom, slideVisibleLeft, slideVisibleOnceBottom, slideVisibleOnceLeft, slideVisibleOnceRight, slideVisibleOnceTop, slideVisibleRight, slideVisibleTop, slugify, useElementStyle, useElementTransform, useMotion, useMotionControls, useMotionFeatures, useMotionProperties, useMotionTransitions, useMotionVariants, useMotions, useReducedMotion, useSpring };
