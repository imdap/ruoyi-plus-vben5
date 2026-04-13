import { time } from "../frameloop/sync-time.mjs";
import { JSAnimation } from "./JSAnimation.mjs";
import { NativeAnimation } from "./NativeAnimation.mjs";
import { replaceTransitionType } from "./utils/replace-transition-type.mjs";
import { replaceStringEasing } from "./waapi/utils/unsupported-easing.mjs";
import { clamp } from "../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/clamp.mjs";
const sampleDelta = 10;
class NativeAnimationExtended extends NativeAnimation {
  constructor(options) {
    replaceStringEasing(options);
    replaceTransitionType(options);
    super(options);
    if (options.startTime !== void 0) {
      this.startTime = options.startTime;
    }
    this.options = options;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(value) {
    const { motionValue, onUpdate, onComplete, element, ...options } = this.options;
    if (!motionValue)
      return;
    if (value !== void 0) {
      motionValue.set(value);
      return;
    }
    const sampleAnimation = new JSAnimation({
      ...options,
      autoplay: false
    });
    const sampleTime = Math.max(sampleDelta, time.now() - this.startTime);
    const delta = clamp(0, sampleDelta, sampleTime - sampleDelta);
    motionValue.setWithVelocity(sampleAnimation.sample(Math.max(0, sampleTime - delta)).value, sampleAnimation.sample(sampleTime).value, delta);
    sampleAnimation.stop();
  }
}
export {
  NativeAnimationExtended
};
