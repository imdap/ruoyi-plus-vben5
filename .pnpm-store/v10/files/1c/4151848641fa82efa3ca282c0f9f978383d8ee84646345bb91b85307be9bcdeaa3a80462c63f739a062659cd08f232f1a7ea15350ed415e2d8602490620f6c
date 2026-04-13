import { motionValue } from "./index.mjs";
import { JSAnimation } from "../animation/JSAnimation.mjs";
import { isMotionValue } from "./utils/is-motion-value.mjs";
import { frame } from "../frameloop/frame.mjs";
function springValue(source, options) {
  const initialValue = isMotionValue(source) ? source.get() : source;
  const value = motionValue(initialValue);
  attachSpring(value, source, options);
  return value;
}
function attachSpring(value, source, options) {
  const initialValue = value.get();
  let activeAnimation = null;
  let latestValue = initialValue;
  let latestSetter;
  const unit = typeof initialValue === "string" ? initialValue.replace(/[\d.-]/g, "") : void 0;
  const stopAnimation = () => {
    if (activeAnimation) {
      activeAnimation.stop();
      activeAnimation = null;
    }
  };
  const startAnimation = () => {
    stopAnimation();
    activeAnimation = new JSAnimation({
      keyframes: [asNumber(value.get()), asNumber(latestValue)],
      velocity: value.getVelocity(),
      type: "spring",
      restDelta: 1e-3,
      restSpeed: 0.01,
      ...options,
      onUpdate: latestSetter
    });
  };
  value.attach((v, set) => {
    latestValue = v;
    latestSetter = (latest) => set(parseValue(latest, unit));
    frame.postRender(() => {
      var _a;
      startAnimation();
      (_a = value["events"].animationStart) == null ? void 0 : _a.notify();
      activeAnimation == null ? void 0 : activeAnimation.then(() => {
        var _a2;
        (_a2 = value["events"].animationComplete) == null ? void 0 : _a2.notify();
      });
    });
  }, stopAnimation);
  if (isMotionValue(source)) {
    const removeSourceOnChange = source.on("change", (v) => value.set(parseValue(v, unit)));
    const removeValueOnDestroy = value.on("destroy", removeSourceOnChange);
    return () => {
      removeSourceOnChange();
      removeValueOnDestroy();
    };
  }
  return stopAnimation;
}
function parseValue(v, unit) {
  return unit ? v + unit : v;
}
function asNumber(v) {
  return typeof v === "number" ? v : parseFloat(v);
}
export {
  attachSpring,
  springValue
};
