import { time } from "../frameloop/sync-time.mjs";
import { JSAnimation } from "./JSAnimation.mjs";
import { getFinalKeyframe } from "./keyframes/get-final.mjs";
import { KeyframeResolver, flushKeyframeResolvers } from "./keyframes/KeyframesResolver.mjs";
import { NativeAnimationExtended } from "./NativeAnimationExtended.mjs";
import { canAnimate } from "./utils/can-animate.mjs";
import { makeAnimationInstant } from "./utils/make-animation-instant.mjs";
import { WithPromise } from "./utils/WithPromise.mjs";
import { supportsBrowserAnimation } from "./waapi/supports/waapi.mjs";
import { MotionGlobalConfig } from "../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/global-config.mjs";
import { noop } from "../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/noop.mjs";
const MAX_RESOLVE_DELAY = 40;
class AsyncMotionValueAnimation extends WithPromise {
  constructor({ autoplay = true, delay = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", keyframes, name, motionValue, element, ...options }) {
    var _a;
    super();
    this.stop = () => {
      var _a2, _b;
      if (this._animation) {
        this._animation.stop();
        (_a2 = this.stopTimeline) == null ? void 0 : _a2.call(this);
      }
      (_b = this.keyframeResolver) == null ? void 0 : _b.cancel();
    };
    this.createdAt = time.now();
    const optionsWithDefaults = {
      autoplay,
      delay,
      type,
      repeat,
      repeatDelay,
      repeatType,
      name,
      motionValue,
      element,
      ...options
    };
    const KeyframeResolver$1 = (element == null ? void 0 : element.KeyframeResolver) || KeyframeResolver;
    this.keyframeResolver = new KeyframeResolver$1(keyframes, (resolvedKeyframes, finalKeyframe, forced) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe, optionsWithDefaults, !forced), name, motionValue, element);
    (_a = this.keyframeResolver) == null ? void 0 : _a.scheduleResolve();
  }
  onKeyframesResolved(keyframes, finalKeyframe, options, sync) {
    this.keyframeResolver = void 0;
    const { name, type, velocity, delay, isHandoff, onUpdate } = options;
    this.resolvedAt = time.now();
    if (!canAnimate(keyframes, name, type, velocity)) {
      if (MotionGlobalConfig.instantAnimations || !delay) {
        onUpdate == null ? void 0 : onUpdate(getFinalKeyframe(keyframes, options, finalKeyframe));
      }
      keyframes[0] = keyframes[keyframes.length - 1];
      makeAnimationInstant(options);
      options.repeat = 0;
    }
    const startTime = sync ? !this.resolvedAt ? this.createdAt : this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt : void 0;
    const resolvedOptions = {
      startTime,
      finalKeyframe,
      ...options,
      keyframes
    };
    const animation = !isHandoff && supportsBrowserAnimation(resolvedOptions) ? new NativeAnimationExtended({
      ...resolvedOptions,
      element: resolvedOptions.motionValue.owner.current
    }) : new JSAnimation(resolvedOptions);
    animation.finished.then(() => this.notifyFinished()).catch(noop);
    if (this.pendingTimeline) {
      this.stopTimeline = animation.attachTimeline(this.pendingTimeline);
      this.pendingTimeline = void 0;
    }
    this._animation = animation;
  }
  get finished() {
    if (!this._animation) {
      return this._finished;
    } else {
      return this.animation.finished;
    }
  }
  then(onResolve, _onReject) {
    return this.finished.finally(onResolve).then(() => {
    });
  }
  get animation() {
    var _a;
    if (!this._animation) {
      (_a = this.keyframeResolver) == null ? void 0 : _a.resume();
      flushKeyframeResolvers();
    }
    return this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(newTime) {
    this.animation.time = newTime;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(newSpeed) {
    this.animation.speed = newSpeed;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(timeline) {
    if (this._animation) {
      this.stopTimeline = this.animation.attachTimeline(timeline);
    } else {
      this.pendingTimeline = timeline;
    }
    return () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var _a;
    if (this._animation) {
      this.animation.cancel();
    }
    (_a = this.keyframeResolver) == null ? void 0 : _a.cancel();
  }
}
export {
  AsyncMotionValueAnimation
};
