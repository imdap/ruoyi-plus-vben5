import { watch, isRef } from "vue";
import { animateValue } from "../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/animation/JSAnimation.mjs";
import { motionValue } from "../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/value/index.mjs";
import { isMotionValue } from "../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/value/utils/is-motion-value.mjs";
import { frame, frameData } from "../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/frameloop/frame.mjs";
function toNumber(v) {
  if (typeof v === "number")
    return v;
  return parseFloat(v);
}
function useSpring(source, config = {}) {
  let activeSpringAnimation = null;
  const value = motionValue(
    isMotionValue(source) ? toNumber(source.get()) : source
  );
  let latestValue = value.get();
  let latestSetter = () => {
  };
  const stopAnimation = () => {
    if (activeSpringAnimation) {
      activeSpringAnimation.stop();
      activeSpringAnimation = null;
    }
  };
  const startAnimation = () => {
    const animation = activeSpringAnimation;
    if ((animation == null ? void 0 : animation.time) === 0) {
      animation.sample(frameData.delta);
    }
    stopAnimation();
    const springConfig = isRef(config) ? config.value : config;
    activeSpringAnimation = animateValue({
      keyframes: [value.get(), latestValue],
      velocity: value.getVelocity(),
      type: "spring",
      restDelta: 1e-3,
      restSpeed: 0.01,
      ...springConfig,
      onUpdate: latestSetter
    });
  };
  watch(() => {
    if (isRef(config)) {
      return config.value;
    }
    return config;
  }, () => {
    value.attach((v, set) => {
      latestValue = v;
      latestSetter = set;
      frame.update(startAnimation);
      return value.get();
    }, stopAnimation);
  }, { immediate: true });
  if (isMotionValue(source)) {
    source.on("change", (v) => {
      value.set(toNumber(v));
    });
  }
  return value;
}
export {
  useSpring
};
