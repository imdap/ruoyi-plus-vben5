"use strict";
var _a;
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const vue = require("vue");
const heyListen = require("hey-listen");
const core = require("@vueuse/core");
function addUniqueItem(arr, item) {
  if (arr.indexOf(item) === -1)
    arr.push(item);
}
function removeItem(arr, item) {
  const index = arr.indexOf(item);
  if (index > -1)
    arr.splice(index, 1);
}
function moveItem$1([...arr], fromIndex, toIndex) {
  const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;
  if (startIndex >= 0 && startIndex < arr.length) {
    const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
    const [item] = arr.splice(fromIndex, 1);
    arr.splice(endIndex, 0, item);
  }
  return arr;
}
const clamp = (min, max, v) => {
  if (v > max)
    return max;
  if (v < min)
    return min;
  return v;
};
function formatErrorMessage(message, errorCode) {
  return errorCode ? `${message}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${errorCode}` : message;
}
exports.warning = () => {
};
exports.invariant = () => {
};
if (typeof process !== "undefined" && ((_a = process.env) == null ? void 0 : _a.NODE_ENV) !== "production") {
  exports.warning = (check, message, errorCode) => {
    if (!check && typeof console !== "undefined") {
      console.warn(formatErrorMessage(message, errorCode));
    }
  };
  exports.invariant = (check, message, errorCode) => {
    if (!check) {
      throw new Error(formatErrorMessage(message, errorCode));
    }
  };
}
const MotionGlobalConfig = {};
const isNumericalString = (v) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);
function isObject(value) {
  return typeof value === "object" && value !== null;
}
const isZeroValueString = (v) => /^0[^.\s]+$/u.test(v);
// @__NO_SIDE_EFFECTS__
function memo(callback) {
  let result;
  return () => {
    if (result === void 0)
      result = callback();
    return result;
  };
}
const noop = /* @__NO_SIDE_EFFECTS__ */ (any) => any;
const combineFunctions = (a, b) => (v) => b(a(v));
const pipe = (...transformers) => transformers.reduce(combineFunctions);
const progress = /* @__NO_SIDE_EFFECTS__ */ (from, to, value) => {
  const toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};
class SubscriptionManager {
  constructor() {
    this.subscriptions = [];
  }
  add(handler) {
    addUniqueItem(this.subscriptions, handler);
    return () => removeItem(this.subscriptions, handler);
  }
  notify(a, b, c) {
    const numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions)
      return;
    if (numSubscriptions === 1) {
      this.subscriptions[0](a, b, c);
    } else {
      for (let i = 0; i < numSubscriptions; i++) {
        const handler = this.subscriptions[i];
        handler && handler(a, b, c);
      }
    }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const secondsToMilliseconds = /* @__NO_SIDE_EFFECTS__ */ (seconds) => seconds * 1e3;
const millisecondsToSeconds = /* @__NO_SIDE_EFFECTS__ */ (milliseconds) => milliseconds / 1e3;
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}
const warned = /* @__PURE__ */ new Set();
function hasWarned(message) {
  return warned.has(message);
}
function warnOnce(condition, message, errorCode) {
  if (condition || warned.has(message))
    return;
  console.warn(formatErrorMessage(message, errorCode));
  warned.add(message);
}
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};
const calcBezier = (t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t;
const subdivisionPrecision = 1e-7;
const subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - x;
    if (currentX > 0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return noop;
  const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
  return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}
const mirrorEasing = (easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
const reverseEasing = (easing) => (p) => 1 - easing(1 - p);
const backOut = /* @__PURE__ */ cubicBezier(0.33, 1.53, 0.69, 0.99);
const backIn = /* @__PURE__ */ reverseEasing(backOut);
const backInOut = /* @__PURE__ */ mirrorEasing(backIn);
const anticipate = (p) => (p *= 2) < 1 ? 0.5 * backIn(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
const circIn = (p) => 1 - Math.sin(Math.acos(p));
const circOut = reverseEasing(circIn);
const circInOut = mirrorEasing(circIn);
const easeIn = /* @__PURE__ */ cubicBezier(0.42, 0, 1, 1);
const easeOut = /* @__PURE__ */ cubicBezier(0, 0, 0.58, 1);
const easeInOut = /* @__PURE__ */ cubicBezier(0.42, 0, 0.58, 1);
function steps(numSteps, direction = "end") {
  return (progress2) => {
    progress2 = direction === "end" ? Math.min(progress2, 0.999) : Math.max(progress2, 1e-3);
    const expanded = progress2 * numSteps;
    const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
    return clamp(0, 1, rounded / numSteps);
  };
}
const isEasingArray = (ease2) => {
  return Array.isArray(ease2) && typeof ease2[0] !== "number";
};
function getEasingForSegment(easing, i) {
  return isEasingArray(easing) ? easing[wrap(0, easing.length, i)] : easing;
}
const isBezierDefinition = (easing) => Array.isArray(easing) && typeof easing[0] === "number";
const easingLookup = {
  linear: noop,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate
};
const isValidEasing = (easing) => {
  return typeof easing === "string";
};
const easingDefinitionToFunction = (definition) => {
  if (isBezierDefinition(definition)) {
    exports.invariant(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`, "cubic-bezier-length");
    const [x1, y1, x2, y2] = definition;
    return cubicBezier(x1, y1, x2, y2);
  } else if (isValidEasing(definition)) {
    exports.invariant(easingLookup[definition] !== void 0, `Invalid easing type '${definition}'`, "invalid-easing-type");
    return easingLookup[definition];
  }
  return definition;
};
const stepsOrder = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
const statsBuffer = {
  value: null,
  addProjectionMetrics: null
};
function createRenderStep(runNextFrame, stepName) {
  let thisFrame = /* @__PURE__ */ new Set();
  let nextFrame = /* @__PURE__ */ new Set();
  let isProcessing = false;
  let flushNextFrame = false;
  const toKeepAlive = /* @__PURE__ */ new WeakSet();
  let latestFrameData = {
    delta: 0,
    timestamp: 0,
    isProcessing: false
  };
  let numCalls = 0;
  function triggerCallback(callback) {
    if (toKeepAlive.has(callback)) {
      step.schedule(callback);
      runNextFrame();
    }
    numCalls++;
    callback(latestFrameData);
  }
  const step = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing;
      const queue = addToCurrentFrame ? thisFrame : nextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      if (!queue.has(callback))
        queue.add(callback);
      return callback;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (callback) => {
      nextFrame.delete(callback);
      toKeepAlive.delete(callback);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (frameData2) => {
      latestFrameData = frameData2;
      if (isProcessing) {
        flushNextFrame = true;
        return;
      }
      isProcessing = true;
      [thisFrame, nextFrame] = [nextFrame, thisFrame];
      thisFrame.forEach(triggerCallback);
      if (stepName && statsBuffer.value) {
        statsBuffer.value.frameloop[stepName].push(numCalls);
      }
      numCalls = 0;
      thisFrame.clear();
      isProcessing = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData2);
      }
    }
  };
  return step;
}
const maxElapsed$1 = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
  let runNextFrame = false;
  let useDefaultElapsed = true;
  const state = {
    delta: 0,
    timestamp: 0,
    isProcessing: false
  };
  const flagRunNextFrame = () => runNextFrame = true;
  const steps2 = stepsOrder.reduce((acc, key) => {
    acc[key] = createRenderStep(flagRunNextFrame, allowKeepAlive ? key : void 0);
    return acc;
  }, {});
  const { setup, read, resolveKeyframes, preUpdate, update, preRender, render, postRender } = steps2;
  const processBatch = () => {
    const timestamp = MotionGlobalConfig.useManualTiming ? state.timestamp : performance.now();
    runNextFrame = false;
    if (!MotionGlobalConfig.useManualTiming) {
      state.delta = useDefaultElapsed ? 1e3 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed$1), 1);
    }
    state.timestamp = timestamp;
    state.isProcessing = true;
    setup.process(state);
    read.process(state);
    resolveKeyframes.process(state);
    preUpdate.process(state);
    update.process(state);
    preRender.process(state);
    render.process(state);
    postRender.process(state);
    state.isProcessing = false;
    if (runNextFrame && allowKeepAlive) {
      useDefaultElapsed = false;
      scheduleNextBatch(processBatch);
    }
  };
  const wake = () => {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!state.isProcessing) {
      scheduleNextBatch(processBatch);
    }
  };
  const schedule = stepsOrder.reduce((acc, key) => {
    const step = steps2[key];
    acc[key] = (process2, keepAlive = false, immediate = false) => {
      if (!runNextFrame)
        wake();
      return step.schedule(process2, keepAlive, immediate);
    };
    return acc;
  }, {});
  const cancel = (process2) => {
    for (let i = 0; i < stepsOrder.length; i++) {
      steps2[stepsOrder[i]].cancel(process2);
    }
  };
  return { schedule, cancel, state, steps: steps2 };
}
const { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps } = /* @__PURE__ */ createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop, true);
let now;
function clearTime() {
  now = void 0;
}
const time = {
  now: () => {
    if (now === void 0) {
      time.set(frameData.isProcessing || MotionGlobalConfig.useManualTiming ? frameData.timestamp : performance.now());
    }
    return now;
  },
  set: (newTime) => {
    now = newTime;
    queueMicrotask(clearTime);
  }
};
const activeAnimations = {
  layout: 0,
  mainThread: 0,
  waapi: 0
};
const checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
const isCSSVariableName = /* @__PURE__ */ checkStringStartsWith("--");
const startsAsVariableToken = /* @__PURE__ */ checkStringStartsWith("var(--");
const isCSSVariableToken = (value) => {
  const startsWithToken = startsAsVariableToken(value);
  if (!startsWithToken)
    return false;
  return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
const singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function containsCSSVariable(value) {
  if (typeof value !== "string")
    return false;
  return value.split("/*")[0].includes("var(--");
}
const number = {
  test: (v) => typeof v === "number",
  parse: parseFloat,
  transform: (v) => v
};
const alpha = {
  ...number,
  transform: (v) => clamp(0, 1, v)
};
const scale = {
  ...number,
  default: 1
};
const sanitize = (v) => Math.round(v * 1e5) / 1e5;
const floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function isNullish(v) {
  return v == null;
}
const singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
const isColorString = (type, testProp) => (v) => {
  return Boolean(typeof v === "string" && singleColorRegex.test(v) && v.startsWith(type) || testProp && !isNullish(v) && Object.prototype.hasOwnProperty.call(v, testProp));
};
const splitColor = (aName, bName, cName) => (v) => {
  if (typeof v !== "string")
    return v;
  const [a, b, c, alpha2] = v.match(floatRegex);
  return {
    [aName]: parseFloat(a),
    [bName]: parseFloat(b),
    [cName]: parseFloat(c),
    alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
  };
};
const clampRgbUnit = (v) => clamp(0, 255, v);
const rgbUnit = {
  ...number,
  transform: (v) => Math.round(clampRgbUnit(v))
};
const rgba = {
  test: /* @__PURE__ */ isColorString("rgb", "red"),
  parse: /* @__PURE__ */ splitColor("red", "green", "blue"),
  transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};
function parseHex(v) {
  let r = "";
  let g = "";
  let b = "";
  let a = "";
  if (v.length > 5) {
    r = v.substring(1, 3);
    g = v.substring(3, 5);
    b = v.substring(5, 7);
    a = v.substring(7, 9);
  } else {
    r = v.substring(1, 2);
    g = v.substring(2, 3);
    b = v.substring(3, 4);
    a = v.substring(4, 5);
    r += r;
    g += g;
    b += b;
    a += a;
  }
  return {
    red: parseInt(r, 16),
    green: parseInt(g, 16),
    blue: parseInt(b, 16),
    alpha: a ? parseInt(a, 16) / 255 : 1
  };
}
const hex = {
  test: /* @__PURE__ */ isColorString("#"),
  parse: parseHex,
  transform: rgba.transform
};
const createUnitType = /* @__NO_SIDE_EFFECTS__ */ (unit) => ({
  test: (v) => typeof v === "string" && v.endsWith(unit) && v.split(" ").length === 1,
  parse: parseFloat,
  transform: (v) => `${v}${unit}`
});
const degrees = /* @__PURE__ */ createUnitType("deg");
const percent = /* @__PURE__ */ createUnitType("%");
const px = /* @__PURE__ */ createUnitType("px");
const vh = /* @__PURE__ */ createUnitType("vh");
const vw = /* @__PURE__ */ createUnitType("vw");
const progressPercentage = /* @__PURE__ */ (() => ({
  ...percent,
  parse: (v) => percent.parse(v) / 100,
  transform: (v) => percent.transform(v * 100)
}))();
const hsla = {
  test: /* @__PURE__ */ isColorString("hsl", "hue"),
  parse: /* @__PURE__ */ splitColor("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};
const color = {
  test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
  parse: (v) => {
    if (rgba.test(v)) {
      return rgba.parse(v);
    } else if (hsla.test(v)) {
      return hsla.parse(v);
    } else {
      return hex.parse(v);
    }
  },
  transform: (v) => {
    return typeof v === "string" ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
  },
  getAnimatableNone: (v) => {
    const parsed = color.parse(v);
    parsed.alpha = 0;
    return color.transform(parsed);
  }
};
const colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function test(v) {
  var _a2, _b;
  return isNaN(v) && typeof v === "string" && (((_a2 = v.match(floatRegex)) == null ? void 0 : _a2.length) || 0) + (((_b = v.match(colorRegex)) == null ? void 0 : _b.length) || 0) > 0;
}
const NUMBER_TOKEN = "number";
const COLOR_TOKEN = "color";
const VAR_TOKEN = "var";
const VAR_FUNCTION_TOKEN = "var(";
const SPLIT_TOKEN = "${}";
const complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(value) {
  const originalValue = value.toString();
  const values = [];
  const indexes = {
    color: [],
    number: [],
    var: []
  };
  const types = [];
  let i = 0;
  const tokenised = originalValue.replace(complexRegex, (parsedValue) => {
    if (color.test(parsedValue)) {
      indexes.color.push(i);
      types.push(COLOR_TOKEN);
      values.push(color.parse(parsedValue));
    } else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
      indexes.var.push(i);
      types.push(VAR_TOKEN);
      values.push(parsedValue);
    } else {
      indexes.number.push(i);
      types.push(NUMBER_TOKEN);
      values.push(parseFloat(parsedValue));
    }
    ++i;
    return SPLIT_TOKEN;
  });
  const split = tokenised.split(SPLIT_TOKEN);
  return { values, split, indexes, types };
}
function parseComplexValue(v) {
  return analyseComplexValue(v).values;
}
function createTransformer(source) {
  const { split, types } = analyseComplexValue(source);
  const numSections = split.length;
  return (v) => {
    let output = "";
    for (let i = 0; i < numSections; i++) {
      output += split[i];
      if (v[i] !== void 0) {
        const type = types[i];
        if (type === NUMBER_TOKEN) {
          output += sanitize(v[i]);
        } else if (type === COLOR_TOKEN) {
          output += color.transform(v[i]);
        } else {
          output += v[i];
        }
      }
    }
    return output;
  };
}
const convertNumbersToZero = (v) => typeof v === "number" ? 0 : color.test(v) ? color.getAnimatableNone(v) : v;
function getAnimatableNone$1(v) {
  const parsed = parseComplexValue(v);
  const transformer = createTransformer(v);
  return transformer(parsed.map(convertNumbersToZero));
}
const complex = {
  test,
  parse: parseComplexValue,
  createTransformer,
  getAnimatableNone: getAnimatableNone$1
};
function hueToRgb(p, q, t) {
  if (t < 0)
    t += 1;
  if (t > 1)
    t -= 1;
  if (t < 1 / 6)
    return p + (q - p) * 6 * t;
  if (t < 1 / 2)
    return q;
  if (t < 2 / 3)
    return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (!saturation) {
    red = green = blue = lightness;
  } else {
    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;
    red = hueToRgb(p, q, hue + 1 / 3);
    green = hueToRgb(p, q, hue);
    blue = hueToRgb(p, q, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha2
  };
}
function mixImmediate(a, b) {
  return (p) => p > 0 ? b : a;
}
const mixNumber$1 = (from, to, progress2) => {
  return from + (to - from) * progress2;
};
const mixLinearColor = (from, to, v) => {
  const fromExpo = from * from;
  const expo = v * (to * to - fromExpo) + fromExpo;
  return expo < 0 ? 0 : Math.sqrt(expo);
};
const colorTypes = [hex, rgba, hsla];
const getColorType = (v) => colorTypes.find((type) => type.test(v));
function asRGBA(color2) {
  const type = getColorType(color2);
  exports.warning(Boolean(type), `'${color2}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable");
  if (!Boolean(type))
    return false;
  let model = type.parse(color2);
  if (type === hsla) {
    model = hslaToRgba(model);
  }
  return model;
}
const mixColor = (from, to) => {
  const fromRGBA = asRGBA(from);
  const toRGBA = asRGBA(to);
  if (!fromRGBA || !toRGBA) {
    return mixImmediate(from, to);
  }
  const blended = { ...fromRGBA };
  return (v) => {
    blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
    blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
    blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
    blended.alpha = mixNumber$1(fromRGBA.alpha, toRGBA.alpha, v);
    return rgba.transform(blended);
  };
};
const invisibleValues = /* @__PURE__ */ new Set(["none", "hidden"]);
function mixVisibility(origin, target) {
  if (invisibleValues.has(origin)) {
    return (p) => p <= 0 ? origin : target;
  } else {
    return (p) => p >= 1 ? target : origin;
  }
}
function mixNumber(a, b) {
  return (p) => mixNumber$1(a, b, p);
}
function getMixer(a) {
  if (typeof a === "number") {
    return mixNumber;
  } else if (typeof a === "string") {
    return isCSSVariableToken(a) ? mixImmediate : color.test(a) ? mixColor : mixComplex;
  } else if (Array.isArray(a)) {
    return mixArray;
  } else if (typeof a === "object") {
    return color.test(a) ? mixColor : mixObject;
  }
  return mixImmediate;
}
function mixArray(a, b) {
  const output = [...a];
  const numValues = output.length;
  const blendValue = a.map((v, i) => getMixer(v)(v, b[i]));
  return (p) => {
    for (let i = 0; i < numValues; i++) {
      output[i] = blendValue[i](p);
    }
    return output;
  };
}
function mixObject(a, b) {
  const output = { ...a, ...b };
  const blendValue = {};
  for (const key in output) {
    if (a[key] !== void 0 && b[key] !== void 0) {
      blendValue[key] = getMixer(a[key])(a[key], b[key]);
    }
  }
  return (v) => {
    for (const key in blendValue) {
      output[key] = blendValue[key](v);
    }
    return output;
  };
}
function matchOrder(origin, target) {
  const orderedOrigin = [];
  const pointers = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < target.values.length; i++) {
    const type = target.types[i];
    const originIndex = origin.indexes[type][pointers[type]];
    const originValue = origin.values[originIndex] ?? 0;
    orderedOrigin[i] = originValue;
    pointers[type]++;
  }
  return orderedOrigin;
}
const mixComplex = (origin, target) => {
  const template = complex.createTransformer(target);
  const originStats = analyseComplexValue(origin);
  const targetStats = analyseComplexValue(target);
  const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length;
  if (canInterpolate) {
    if (invisibleValues.has(origin) && !targetStats.values.length || invisibleValues.has(target) && !originStats.values.length) {
      return mixVisibility(origin, target);
    }
    return pipe(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
  } else {
    exports.warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different");
    return mixImmediate(origin, target);
  }
};
function mix(from, to, p) {
  if (typeof from === "number" && typeof to === "number" && typeof p === "number") {
    return mixNumber$1(from, to, p);
  }
  const mixer = getMixer(from);
  return mixer(from, to);
}
const frameloopDriver = (update) => {
  const passTimestamp = ({ timestamp }) => update(timestamp);
  return {
    start: (keepAlive = true) => frame.update(passTimestamp, keepAlive),
    stop: () => cancelFrame(passTimestamp),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => frameData.isProcessing ? frameData.timestamp : time.now()
  };
};
const generateLinearEasing = (easing, duration, resolution = 10) => {
  let points = "";
  const numPoints = Math.max(Math.round(duration / resolution), 2);
  for (let i = 0; i < numPoints; i++) {
    points += Math.round(easing(i / (numPoints - 1)) * 1e4) / 1e4 + ", ";
  }
  return `linear(${points.substring(0, points.length - 2)})`;
};
const maxGeneratorDuration = 2e4;
function calcGeneratorDuration(generator) {
  let duration = 0;
  const timeStep = 50;
  let state = generator.next(duration);
  while (!state.done && duration < maxGeneratorDuration) {
    duration += timeStep;
    state = generator.next(duration);
  }
  return duration >= maxGeneratorDuration ? Infinity : duration;
}
function createGeneratorEasing(options, scale2 = 100, createGenerator) {
  const generator = createGenerator({ ...options, keyframes: [0, scale2] });
  const duration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
  return {
    type: "keyframes",
    ease: (progress2) => {
      return generator.next(duration * progress2).value / scale2;
    },
    duration: /* @__PURE__ */ millisecondsToSeconds(duration)
  };
}
const velocitySampleDuration = 5;
function calcGeneratorVelocity(resolveValue, t, current2) {
  const prevT = Math.max(t - velocitySampleDuration, 0);
  return velocityPerSecond(current2 - resolveValue(prevT), t - prevT);
}
const springDefaults = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};
const safeMin = 1e-3;
function findSpring({ duration = springDefaults.duration, bounce = springDefaults.bounce, velocity = springDefaults.velocity, mass = springDefaults.mass }) {
  let envelope;
  let derivative;
  exports.warning(duration <= /* @__PURE__ */ secondsToMilliseconds(springDefaults.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp(springDefaults.minDamping, springDefaults.maxDamping, dampingRatio);
  duration = clamp(springDefaults.minDuration, springDefaults.maxDuration, /* @__PURE__ */ millisecondsToSeconds(duration));
  if (dampingRatio < 1) {
    envelope = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const a = exponentialDecay - velocity;
      const b = calcAngularFreq(undampedFreq2, dampingRatio);
      const c = Math.exp(-delta);
      return safeMin - a / b * c;
    };
    derivative = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const d = delta * velocity + velocity;
      const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f = Math.exp(-delta);
      const g = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g;
    };
  } else {
    envelope = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a * b;
    };
    derivative = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b = (velocity - undampedFreq2) * (duration * duration);
      return a * b;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = /* @__PURE__ */ secondsToMilliseconds(duration);
  if (isNaN(undampedFreq)) {
    return {
      stiffness: springDefaults.stiffness,
      damping: springDefaults.damping,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
const rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
const durationKeys = ["duration", "bounce"];
const physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys2) {
  return keys2.some((key) => options[key] !== void 0);
}
function getSpringOptions(options) {
  let springOptions = {
    velocity: springDefaults.velocity,
    stiffness: springDefaults.stiffness,
    damping: springDefaults.damping,
    mass: springDefaults.mass,
    isResolvedFromDuration: false,
    ...options
  };
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    if (options.visualDuration) {
      const visualDuration = options.visualDuration;
      const root = 2 * Math.PI / (visualDuration * 1.2);
      const stiffness = root * root;
      const damping = 2 * clamp(0.05, 1, 1 - (options.bounce || 0)) * Math.sqrt(stiffness);
      springOptions = {
        ...springOptions,
        mass: springDefaults.mass,
        stiffness,
        damping
      };
    } else {
      const derived = findSpring(options);
      springOptions = {
        ...springOptions,
        ...derived,
        mass: springDefaults.mass
      };
      springOptions.isResolvedFromDuration = true;
    }
  }
  return springOptions;
}
function spring(optionsOrVisualDuration = springDefaults.visualDuration, bounce = springDefaults.bounce) {
  const options = typeof optionsOrVisualDuration !== "object" ? {
    visualDuration: optionsOrVisualDuration,
    keyframes: [0, 1],
    bounce
  } : optionsOrVisualDuration;
  let { restSpeed, restDelta } = options;
  const origin = options.keyframes[0];
  const target = options.keyframes[options.keyframes.length - 1];
  const state = { done: false, value: origin };
  const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = getSpringOptions({
    ...options,
    velocity: -/* @__PURE__ */ millisecondsToSeconds(options.velocity || 0)
  });
  const initialVelocity = velocity || 0;
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  const initialDelta = target - origin;
  const undampedAngularFreq = /* @__PURE__ */ millisecondsToSeconds(Math.sqrt(stiffness / mass));
  const isGranularScale = Math.abs(initialDelta) < 5;
  restSpeed || (restSpeed = isGranularScale ? springDefaults.restSpeed.granular : springDefaults.restSpeed.default);
  restDelta || (restDelta = isGranularScale ? springDefaults.restDelta.granular : springDefaults.restDelta.default);
  let resolveSpring;
  if (dampingRatio < 1) {
    const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
    resolveSpring = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
    };
  } else if (dampingRatio === 1) {
    resolveSpring = (t) => target - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
  } else {
    const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
    resolveSpring = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      const freqForT = Math.min(dampedAngularFreq * t, 300);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
    };
  }
  const generator = {
    calculatedDuration: isResolvedFromDuration ? duration || null : null,
    next: (t) => {
      const current2 = resolveSpring(t);
      if (!isResolvedFromDuration) {
        let currentVelocity = t === 0 ? initialVelocity : 0;
        if (dampingRatio < 1) {
          currentVelocity = t === 0 ? /* @__PURE__ */ secondsToMilliseconds(initialVelocity) : calcGeneratorVelocity(resolveSpring, t, current2);
        }
        const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        const isBelowDisplacementThreshold = Math.abs(target - current2) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t >= duration;
      }
      state.value = state.done ? target : current2;
      return state;
    },
    toString: () => {
      const calculatedDuration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
      const easing = generateLinearEasing((progress2) => generator.next(calculatedDuration * progress2).value, calculatedDuration, 30);
      return calculatedDuration + "ms " + easing;
    },
    toTransition: () => {
    }
  };
  return generator;
}
spring.applyToOptions = (options) => {
  const generatorOptions = createGeneratorEasing(options, 100, spring);
  options.ease = generatorOptions.ease;
  options.duration = /* @__PURE__ */ secondsToMilliseconds(generatorOptions.duration);
  options.type = "keyframes";
  return options;
};
function inertia({ keyframes: keyframes2, velocity = 0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed }) {
  const origin = keyframes2[0];
  const state = {
    done: false,
    value: origin
  };
  const isOutOfBounds = (v) => min !== void 0 && v < min || max !== void 0 && v > max;
  const nearestBoundary = (v) => {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  };
  let amplitude = power * velocity;
  const ideal = origin + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - origin;
  const calcDelta = (t) => -amplitude * Math.exp(-t / timeConstant);
  const calcLatest = (t) => target + calcDelta(t);
  const applyFriction = (t) => {
    const delta = calcDelta(t);
    const latest = calcLatest(t);
    state.done = Math.abs(delta) <= restDelta;
    state.value = state.done ? target : latest;
  };
  let timeReachedBoundary;
  let spring$1;
  const checkCatchBoundary = (t) => {
    if (!isOutOfBounds(state.value))
      return;
    timeReachedBoundary = t;
    spring$1 = spring({
      keyframes: [state.value, nearestBoundary(state.value)],
      velocity: calcGeneratorVelocity(calcLatest, t, state.value),
      // TODO: This should be passing * 1000
      damping: bounceDamping,
      stiffness: bounceStiffness,
      restDelta,
      restSpeed
    });
  };
  checkCatchBoundary(0);
  return {
    calculatedDuration: null,
    next: (t) => {
      let hasUpdatedFrame = false;
      if (!spring$1 && timeReachedBoundary === void 0) {
        hasUpdatedFrame = true;
        applyFriction(t);
        checkCatchBoundary(t);
      }
      if (timeReachedBoundary !== void 0 && t >= timeReachedBoundary) {
        return spring$1.next(t - timeReachedBoundary);
      } else {
        !hasUpdatedFrame && applyFriction(t);
        return state;
      }
    }
  };
}
function createMixers(output, ease2, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || MotionGlobalConfig.mix || mix;
  const numMixers = output.length - 1;
  for (let i = 0; i < numMixers; i++) {
    let mixer = mixerFactory(output[i], output[i + 1]);
    if (ease2) {
      const easingFunction = Array.isArray(ease2) ? ease2[i] || noop : ease2;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function interpolate(input, output, { clamp: isClamp = true, ease: ease2, mixer } = {}) {
  const inputLength = input.length;
  exports.invariant(inputLength === output.length, "Both input and output ranges must be the same length", "range-length");
  if (inputLength === 1)
    return () => output[0];
  if (inputLength === 2 && output[0] === output[1])
    return () => output[1];
  const isZeroDeltaRange = input[0] === input[1];
  if (input[0] > input[inputLength - 1]) {
    input = [...input].reverse();
    output = [...output].reverse();
  }
  const mixers = createMixers(output, ease2, mixer);
  const numMixers = mixers.length;
  const interpolator = (v) => {
    if (isZeroDeltaRange && v < input[0])
      return output[0];
    let i = 0;
    if (numMixers > 1) {
      for (; i < input.length - 2; i++) {
        if (v < input[i + 1])
          break;
      }
    }
    const progressInRange = /* @__PURE__ */ progress(input[i], input[i + 1], v);
    return mixers[i](progressInRange);
  };
  return isClamp ? (v) => interpolator(clamp(input[0], input[inputLength - 1], v)) : interpolator;
}
function fillOffset(offset, remaining) {
  const min = offset[offset.length - 1];
  for (let i = 1; i <= remaining; i++) {
    const offsetProgress = /* @__PURE__ */ progress(0, remaining, i);
    offset.push(mixNumber$1(min, 1, offsetProgress));
  }
}
function defaultOffset$1(arr) {
  const offset = [0];
  fillOffset(offset, arr.length - 1);
  return offset;
}
function convertOffsetToTimes(offset, duration) {
  return offset.map((o) => o * duration);
}
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function keyframes({ duration = 300, keyframes: keyframeValues, times, ease: ease2 = "easeInOut" }) {
  const easingFunctions = isEasingArray(ease2) ? ease2.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease2);
  const state = {
    done: false,
    value: keyframeValues[0]
  };
  const absoluteTimes = convertOffsetToTimes(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    times && times.length === keyframeValues.length ? times : defaultOffset$1(keyframeValues),
    duration
  );
  const mapTimeToKeyframe = interpolate(absoluteTimes, keyframeValues, {
    ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions)
  });
  return {
    calculatedDuration: duration,
    next: (t) => {
      state.value = mapTimeToKeyframe(t);
      state.done = t >= duration;
      return state;
    }
  };
}
const isNotNull$1 = (value) => value !== null;
function getFinalKeyframe$1(keyframes2, { repeat, repeatType = "loop" }, finalKeyframe, speed = 1) {
  const resolvedKeyframes = keyframes2.filter(isNotNull$1);
  const useFirstKeyframe = speed < 0 || repeat && repeatType !== "loop" && repeat % 2 === 1;
  const index = useFirstKeyframe ? 0 : resolvedKeyframes.length - 1;
  return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
}
const transitionTypeMap = {
  decay: inertia,
  inertia,
  tween: keyframes,
  keyframes,
  spring
};
function replaceTransitionType(transition) {
  if (typeof transition.type === "string") {
    transition.type = transitionTypeMap[transition.type];
  }
}
class WithPromise {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(onResolve, onReject) {
    return this.finished.then(onResolve, onReject);
  }
}
const percentToProgress = (percent2) => percent2 / 100;
class JSAnimation extends WithPromise {
  constructor(options) {
    super();
    this.state = "idle";
    this.startTime = null;
    this.isStopped = false;
    this.currentTime = 0;
    this.holdTime = null;
    this.playbackSpeed = 1;
    this.stop = () => {
      var _a2, _b;
      const { motionValue: motionValue2 } = this.options;
      if (motionValue2 && motionValue2.updatedAt !== time.now()) {
        this.tick(time.now());
      }
      this.isStopped = true;
      if (this.state === "idle")
        return;
      this.teardown();
      (_b = (_a2 = this.options).onStop) == null ? void 0 : _b.call(_a2);
    };
    activeAnimations.mainThread++;
    this.options = options;
    this.initAnimation();
    this.play();
    if (options.autoplay === false)
      this.pause();
  }
  initAnimation() {
    const { options } = this;
    replaceTransitionType(options);
    const { type = keyframes, repeat = 0, repeatDelay = 0, repeatType, velocity = 0 } = options;
    let { keyframes: keyframes$1 } = options;
    const generatorFactory = type || keyframes;
    if (process.env.NODE_ENV !== "production" && generatorFactory !== keyframes) {
      exports.invariant(keyframes$1.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${keyframes$1}`, "spring-two-frames");
    }
    if (generatorFactory !== keyframes && typeof keyframes$1[0] !== "number") {
      this.mixKeyframes = pipe(percentToProgress, mix(keyframes$1[0], keyframes$1[1]));
      keyframes$1 = [0, 100];
    }
    const generator = generatorFactory({ ...options, keyframes: keyframes$1 });
    if (repeatType === "mirror") {
      this.mirroredGenerator = generatorFactory({
        ...options,
        keyframes: [...keyframes$1].reverse(),
        velocity: -velocity
      });
    }
    if (generator.calculatedDuration === null) {
      generator.calculatedDuration = calcGeneratorDuration(generator);
    }
    const { calculatedDuration } = generator;
    this.calculatedDuration = calculatedDuration;
    this.resolvedDuration = calculatedDuration + repeatDelay;
    this.totalDuration = this.resolvedDuration * (repeat + 1) - repeatDelay;
    this.generator = generator;
  }
  updateTime(timestamp) {
    const animationTime = Math.round(timestamp - this.startTime) * this.playbackSpeed;
    if (this.holdTime !== null) {
      this.currentTime = this.holdTime;
    } else {
      this.currentTime = animationTime;
    }
  }
  tick(timestamp, sample = false) {
    const { generator, totalDuration, mixKeyframes, mirroredGenerator, resolvedDuration, calculatedDuration } = this;
    if (this.startTime === null)
      return generator.next(0);
    const { delay: delay2 = 0, keyframes: keyframes2, repeat, repeatType, repeatDelay, type, onUpdate, finalKeyframe } = this.options;
    if (this.speed > 0) {
      this.startTime = Math.min(this.startTime, timestamp);
    } else if (this.speed < 0) {
      this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
    }
    if (sample) {
      this.currentTime = timestamp;
    } else {
      this.updateTime(timestamp);
    }
    const timeWithoutDelay = this.currentTime - delay2 * (this.playbackSpeed >= 0 ? 1 : -1);
    const isInDelayPhase = this.playbackSpeed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
    this.currentTime = Math.max(timeWithoutDelay, 0);
    if (this.state === "finished" && this.holdTime === null) {
      this.currentTime = totalDuration;
    }
    let elapsed = this.currentTime;
    let frameGenerator = generator;
    if (repeat) {
      const progress2 = Math.min(this.currentTime, totalDuration) / resolvedDuration;
      let currentIteration = Math.floor(progress2);
      let iterationProgress = progress2 % 1;
      if (!iterationProgress && progress2 >= 1) {
        iterationProgress = 1;
      }
      iterationProgress === 1 && currentIteration--;
      currentIteration = Math.min(currentIteration, repeat + 1);
      const isOddIteration = Boolean(currentIteration % 2);
      if (isOddIteration) {
        if (repeatType === "reverse") {
          iterationProgress = 1 - iterationProgress;
          if (repeatDelay) {
            iterationProgress -= repeatDelay / resolvedDuration;
          }
        } else if (repeatType === "mirror") {
          frameGenerator = mirroredGenerator;
        }
      }
      elapsed = clamp(0, 1, iterationProgress) * resolvedDuration;
    }
    const state = isInDelayPhase ? { done: false, value: keyframes2[0] } : frameGenerator.next(elapsed);
    if (mixKeyframes) {
      state.value = mixKeyframes(state.value);
    }
    let { done } = state;
    if (!isInDelayPhase && calculatedDuration !== null) {
      done = this.playbackSpeed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0;
    }
    const isAnimationFinished = this.holdTime === null && (this.state === "finished" || this.state === "running" && done);
    if (isAnimationFinished && type !== inertia) {
      state.value = getFinalKeyframe$1(keyframes2, this.options, finalKeyframe, this.speed);
    }
    if (onUpdate) {
      onUpdate(state.value);
    }
    if (isAnimationFinished) {
      this.finish();
    }
    return state;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(resolve, reject) {
    return this.finished.then(resolve, reject);
  }
  get duration() {
    return /* @__PURE__ */ millisecondsToSeconds(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: delay2 = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ millisecondsToSeconds(delay2);
  }
  get time() {
    return /* @__PURE__ */ millisecondsToSeconds(this.currentTime);
  }
  set time(newTime) {
    var _a2;
    newTime = /* @__PURE__ */ secondsToMilliseconds(newTime);
    this.currentTime = newTime;
    if (this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0) {
      this.holdTime = newTime;
    } else if (this.driver) {
      this.startTime = this.driver.now() - newTime / this.playbackSpeed;
    }
    (_a2 = this.driver) == null ? void 0 : _a2.start(false);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(newSpeed) {
    this.updateTime(time.now());
    const hasChanged2 = this.playbackSpeed !== newSpeed;
    this.playbackSpeed = newSpeed;
    if (hasChanged2) {
      this.time = /* @__PURE__ */ millisecondsToSeconds(this.currentTime);
    }
  }
  play() {
    var _a2, _b;
    if (this.isStopped)
      return;
    const { driver = frameloopDriver, startTime } = this.options;
    if (!this.driver) {
      this.driver = driver((timestamp) => this.tick(timestamp));
    }
    (_b = (_a2 = this.options).onPlay) == null ? void 0 : _b.call(_a2);
    const now2 = this.driver.now();
    if (this.state === "finished") {
      this.updateFinished();
      this.startTime = now2;
    } else if (this.holdTime !== null) {
      this.startTime = now2 - this.holdTime;
    } else if (!this.startTime) {
      this.startTime = startTime ?? now2;
    }
    if (this.state === "finished" && this.speed < 0) {
      this.startTime += this.calculatedDuration;
    }
    this.holdTime = null;
    this.state = "running";
    this.driver.start();
  }
  pause() {
    this.state = "paused";
    this.updateTime(time.now());
    this.holdTime = this.currentTime;
  }
  complete() {
    if (this.state !== "running") {
      this.play();
    }
    this.state = "finished";
    this.holdTime = null;
  }
  finish() {
    var _a2, _b;
    this.notifyFinished();
    this.teardown();
    this.state = "finished";
    (_b = (_a2 = this.options).onComplete) == null ? void 0 : _b.call(_a2);
  }
  cancel() {
    var _a2, _b;
    this.holdTime = null;
    this.startTime = 0;
    this.tick(0);
    this.teardown();
    (_b = (_a2 = this.options).onCancel) == null ? void 0 : _b.call(_a2);
  }
  teardown() {
    this.state = "idle";
    this.stopDriver();
    this.startTime = this.holdTime = null;
    activeAnimations.mainThread--;
  }
  stopDriver() {
    if (!this.driver)
      return;
    this.driver.stop();
    this.driver = void 0;
  }
  sample(sampleTime) {
    this.startTime = 0;
    return this.tick(sampleTime, true);
  }
  attachTimeline(timeline) {
    var _a2;
    if (this.options.allowFlatten) {
      this.options.type = "keyframes";
      this.options.ease = "linear";
      this.initAnimation();
    }
    (_a2 = this.driver) == null ? void 0 : _a2.stop();
    return timeline.observe(this);
  }
}
function animateValue(options) {
  return new JSAnimation(options);
}
function fillWildcards(keyframes2) {
  for (let i = 1; i < keyframes2.length; i++) {
    keyframes2[i] ?? (keyframes2[i] = keyframes2[i - 1]);
  }
}
const radToDeg = (rad) => rad * 180 / Math.PI;
const rotate = (v) => {
  const angle = radToDeg(Math.atan2(v[1], v[0]));
  return rebaseAngle(angle);
};
const matrix2dParsers = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (v) => (Math.abs(v[0]) + Math.abs(v[3])) / 2,
  rotate,
  rotateZ: rotate,
  skewX: (v) => radToDeg(Math.atan(v[1])),
  skewY: (v) => radToDeg(Math.atan(v[2])),
  skew: (v) => (Math.abs(v[1]) + Math.abs(v[2])) / 2
};
const rebaseAngle = (angle) => {
  angle = angle % 360;
  if (angle < 0)
    angle += 360;
  return angle;
};
const rotateZ = rotate;
const scaleX = (v) => Math.sqrt(v[0] * v[0] + v[1] * v[1]);
const scaleY = (v) => Math.sqrt(v[4] * v[4] + v[5] * v[5]);
const matrix3dParsers = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX,
  scaleY,
  scale: (v) => (scaleX(v) + scaleY(v)) / 2,
  rotateX: (v) => rebaseAngle(radToDeg(Math.atan2(v[6], v[5]))),
  rotateY: (v) => rebaseAngle(radToDeg(Math.atan2(-v[2], v[0]))),
  rotateZ,
  rotate: rotateZ,
  skewX: (v) => radToDeg(Math.atan(v[4])),
  skewY: (v) => radToDeg(Math.atan(v[1])),
  skew: (v) => (Math.abs(v[1]) + Math.abs(v[4])) / 2
};
function defaultTransformValue(name) {
  return name.includes("scale") ? 1 : 0;
}
function parseValueFromTransform(transform2, name) {
  if (!transform2 || transform2 === "none") {
    return defaultTransformValue(name);
  }
  const matrix3dMatch = transform2.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let parsers;
  let match;
  if (matrix3dMatch) {
    parsers = matrix3dParsers;
    match = matrix3dMatch;
  } else {
    const matrix2dMatch = transform2.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    parsers = matrix2dParsers;
    match = matrix2dMatch;
  }
  if (!match) {
    return defaultTransformValue(name);
  }
  const valueParser = parsers[name];
  const values = match[1].split(",").map(convertTransformToNumber);
  return typeof valueParser === "function" ? valueParser(values) : values[valueParser];
}
const readTransformValue = (instance, name) => {
  const { transform: transform2 = "none" } = getComputedStyle(instance);
  return parseValueFromTransform(transform2, name);
};
function convertTransformToNumber(value) {
  return parseFloat(value.trim());
}
const transformPropOrder = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
];
const transformProps = /* @__PURE__ */ (() => new Set(transformPropOrder))();
const isNumOrPxType = (v) => v === number || v === px;
const transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
const nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
  const removedTransforms = [];
  nonTranslationalTransformKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    if (value !== void 0) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  return removedTransforms;
}
const positionalValues = {
  // Dimensions
  width: ({ x }, { paddingLeft = "0", paddingRight = "0" }) => x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
  height: ({ y }, { paddingTop = "0", paddingBottom = "0" }) => y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
  top: (_bbox, { top }) => parseFloat(top),
  left: (_bbox, { left }) => parseFloat(left),
  bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
  right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
  // Transform
  x: (_bbox, { transform: transform2 }) => parseValueFromTransform(transform2, "x"),
  y: (_bbox, { transform: transform2 }) => parseValueFromTransform(transform2, "y")
};
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;
const toResolve = /* @__PURE__ */ new Set();
let isScheduled = false;
let anyNeedsMeasurement = false;
let isForced = false;
function measureAllKeyframes() {
  if (anyNeedsMeasurement) {
    const resolversToMeasure = Array.from(toResolve).filter((resolver) => resolver.needsMeasurement);
    const elementsToMeasure = new Set(resolversToMeasure.map((resolver) => resolver.element));
    const transformsToRestore = /* @__PURE__ */ new Map();
    elementsToMeasure.forEach((element) => {
      const removedTransforms = removeNonTranslationalTransform(element);
      if (!removedTransforms.length)
        return;
      transformsToRestore.set(element, removedTransforms);
      element.render();
    });
    resolversToMeasure.forEach((resolver) => resolver.measureInitialState());
    elementsToMeasure.forEach((element) => {
      element.render();
      const restore = transformsToRestore.get(element);
      if (restore) {
        restore.forEach(([key, value]) => {
          var _a2;
          (_a2 = element.getValue(key)) == null ? void 0 : _a2.set(value);
        });
      }
    });
    resolversToMeasure.forEach((resolver) => resolver.measureEndState());
    resolversToMeasure.forEach((resolver) => {
      if (resolver.suspendedScrollY !== void 0) {
        window.scrollTo(0, resolver.suspendedScrollY);
      }
    });
  }
  anyNeedsMeasurement = false;
  isScheduled = false;
  toResolve.forEach((resolver) => resolver.complete(isForced));
  toResolve.clear();
}
function readAllKeyframes() {
  toResolve.forEach((resolver) => {
    resolver.readKeyframes();
    if (resolver.needsMeasurement) {
      anyNeedsMeasurement = true;
    }
  });
}
function flushKeyframeResolvers() {
  isForced = true;
  readAllKeyframes();
  measureAllKeyframes();
  isForced = false;
}
class KeyframeResolver {
  constructor(unresolvedKeyframes, onComplete, name, motionValue2, element, isAsync = false) {
    this.state = "pending";
    this.isAsync = false;
    this.needsMeasurement = false;
    this.unresolvedKeyframes = [...unresolvedKeyframes];
    this.onComplete = onComplete;
    this.name = name;
    this.motionValue = motionValue2;
    this.element = element;
    this.isAsync = isAsync;
  }
  scheduleResolve() {
    this.state = "scheduled";
    if (this.isAsync) {
      toResolve.add(this);
      if (!isScheduled) {
        isScheduled = true;
        frame.read(readAllKeyframes);
        frame.resolveKeyframes(measureAllKeyframes);
      }
    } else {
      this.readKeyframes();
      this.complete();
    }
  }
  readKeyframes() {
    const { unresolvedKeyframes, name, element, motionValue: motionValue2 } = this;
    if (unresolvedKeyframes[0] === null) {
      const currentValue = motionValue2 == null ? void 0 : motionValue2.get();
      const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
      if (currentValue !== void 0) {
        unresolvedKeyframes[0] = currentValue;
      } else if (element && name) {
        const valueAsRead = element.readValue(name, finalKeyframe);
        if (valueAsRead !== void 0 && valueAsRead !== null) {
          unresolvedKeyframes[0] = valueAsRead;
        }
      }
      if (unresolvedKeyframes[0] === void 0) {
        unresolvedKeyframes[0] = finalKeyframe;
      }
      if (motionValue2 && currentValue === void 0) {
        motionValue2.set(unresolvedKeyframes[0]);
      }
    }
    fillWildcards(unresolvedKeyframes);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(isForcedComplete = false) {
    this.state = "complete";
    this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, isForcedComplete);
    toResolve.delete(this);
  }
  cancel() {
    if (this.state === "scheduled") {
      toResolve.delete(this);
      this.state = "pending";
    }
  }
  resume() {
    if (this.state === "pending")
      this.scheduleResolve();
  }
}
const isCSSVar = (name) => name.startsWith("--");
function setStyle(element, name, value) {
  isCSSVar(name) ? element.style.setProperty(name, value) : element.style[name] = value;
}
const supportsScrollTimeline = /* @__PURE__ */ memo(() => window.ScrollTimeline !== void 0);
const supportsFlags = {};
function memoSupports(callback, supportsFlag) {
  const memoized = /* @__PURE__ */ memo(callback);
  return () => supportsFlags[supportsFlag] ?? memoized();
}
const supportsLinearEasing = /* @__PURE__ */ memoSupports(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch (e) {
    return false;
  }
  return true;
}, "linearEasing");
const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
const supportedWaapiEasing = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ cubicBezierAsString([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ cubicBezierAsString([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ cubicBezierAsString([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ cubicBezierAsString([0.33, 1.53, 0.69, 0.99])
};
function mapEasingToNativeEasing(easing, duration) {
  if (!easing) {
    return void 0;
  } else if (typeof easing === "function") {
    return supportsLinearEasing() ? generateLinearEasing(easing, duration) : "ease-out";
  } else if (isBezierDefinition(easing)) {
    return cubicBezierAsString(easing);
  } else if (Array.isArray(easing)) {
    return easing.map((segmentEasing) => mapEasingToNativeEasing(segmentEasing, duration) || supportedWaapiEasing.easeOut);
  } else {
    return supportedWaapiEasing[easing];
  }
}
function startWaapiAnimation(element, valueName, keyframes2, { delay: delay2 = 0, duration = 300, repeat = 0, repeatType = "loop", ease: ease2 = "easeOut", times } = {}, pseudoElement = void 0) {
  const keyframeOptions = {
    [valueName]: keyframes2
  };
  if (times)
    keyframeOptions.offset = times;
  const easing = mapEasingToNativeEasing(ease2, duration);
  if (Array.isArray(easing))
    keyframeOptions.easing = easing;
  if (statsBuffer.value) {
    activeAnimations.waapi++;
  }
  const options = {
    delay: delay2,
    duration,
    easing: !Array.isArray(easing) ? easing : "linear",
    fill: "both",
    iterations: repeat + 1,
    direction: repeatType === "reverse" ? "alternate" : "normal"
  };
  if (pseudoElement)
    options.pseudoElement = pseudoElement;
  const animation = element.animate(keyframeOptions, options);
  if (statsBuffer.value) {
    animation.finished.finally(() => {
      activeAnimations.waapi--;
    });
  }
  return animation;
}
function isGenerator(type) {
  return typeof type === "function" && "applyToOptions" in type;
}
function applyGeneratorOptions({ type, ...options }) {
  if (isGenerator(type) && supportsLinearEasing()) {
    return type.applyToOptions(options);
  } else {
    options.duration ?? (options.duration = 300);
    options.ease ?? (options.ease = "easeOut");
  }
  return options;
}
class NativeAnimation extends WithPromise {
  constructor(options) {
    super();
    this.finishedTime = null;
    this.isStopped = false;
    this.manualStartTime = null;
    if (!options)
      return;
    const { element, name, keyframes: keyframes2, pseudoElement, allowFlatten = false, finalKeyframe, onComplete } = options;
    this.isPseudoElement = Boolean(pseudoElement);
    this.allowFlatten = allowFlatten;
    this.options = options;
    exports.invariant(typeof options.type !== "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const transition = applyGeneratorOptions(options);
    this.animation = startWaapiAnimation(element, name, keyframes2, transition, pseudoElement);
    if (transition.autoplay === false) {
      this.animation.pause();
    }
    this.animation.onfinish = () => {
      this.finishedTime = this.time;
      if (!pseudoElement) {
        const keyframe = getFinalKeyframe$1(keyframes2, this.options, finalKeyframe, this.speed);
        if (this.updateMotionValue) {
          this.updateMotionValue(keyframe);
        } else {
          setStyle(element, name, keyframe);
        }
        this.animation.cancel();
      }
      onComplete == null ? void 0 : onComplete();
      this.notifyFinished();
    };
  }
  play() {
    if (this.isStopped)
      return;
    this.manualStartTime = null;
    this.animation.play();
    if (this.state === "finished") {
      this.updateFinished();
    }
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var _a2, _b;
    (_b = (_a2 = this.animation).finish) == null ? void 0 : _b.call(_a2);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch (e) {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = true;
    const { state } = this;
    if (state === "idle" || state === "finished") {
      return;
    }
    if (this.updateMotionValue) {
      this.updateMotionValue();
    } else {
      this.commitStyles();
    }
    if (!this.isPseudoElement)
      this.cancel();
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    var _a2, _b;
    if (!this.isPseudoElement) {
      (_b = (_a2 = this.animation).commitStyles) == null ? void 0 : _b.call(_a2);
    }
  }
  get duration() {
    var _a2, _b;
    const duration = ((_b = (_a2 = this.animation.effect) == null ? void 0 : _a2.getComputedTiming) == null ? void 0 : _b.call(_a2).duration) || 0;
    return /* @__PURE__ */ millisecondsToSeconds(Number(duration));
  }
  get iterationDuration() {
    const { delay: delay2 = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ millisecondsToSeconds(delay2);
  }
  get time() {
    return /* @__PURE__ */ millisecondsToSeconds(Number(this.animation.currentTime) || 0);
  }
  set time(newTime) {
    this.manualStartTime = null;
    this.finishedTime = null;
    this.animation.currentTime = /* @__PURE__ */ secondsToMilliseconds(newTime);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(newSpeed) {
    if (newSpeed < 0)
      this.finishedTime = null;
    this.animation.playbackRate = newSpeed;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(newStartTime) {
    this.manualStartTime = this.animation.startTime = newStartTime;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline, observe }) {
    var _a2;
    if (this.allowFlatten) {
      (_a2 = this.animation.effect) == null ? void 0 : _a2.updateTiming({ easing: "linear" });
    }
    this.animation.onfinish = null;
    if (timeline && supportsScrollTimeline()) {
      this.animation.timeline = timeline;
      return noop;
    } else {
      return observe(this);
    }
  }
}
const unsupportedEasingFunctions = {
  anticipate,
  backInOut,
  circInOut
};
function isUnsupportedEase(key) {
  return key in unsupportedEasingFunctions;
}
function replaceStringEasing(transition) {
  if (typeof transition.ease === "string" && isUnsupportedEase(transition.ease)) {
    transition.ease = unsupportedEasingFunctions[transition.ease];
  }
}
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
    const { motionValue: motionValue2, onUpdate, onComplete, element, ...options } = this.options;
    if (!motionValue2)
      return;
    if (value !== void 0) {
      motionValue2.set(value);
      return;
    }
    const sampleAnimation = new JSAnimation({
      ...options,
      autoplay: false
    });
    const sampleTime = Math.max(sampleDelta, time.now() - this.startTime);
    const delta = clamp(0, sampleDelta, sampleTime - sampleDelta);
    motionValue2.setWithVelocity(sampleAnimation.sample(Math.max(0, sampleTime - delta)).value, sampleAnimation.sample(sampleTime).value, delta);
    sampleAnimation.stop();
  }
}
const isAnimatable = (value, name) => {
  if (name === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && // It's animatable if we have a string
  (complex.test(value) || value === "0") && // And it contains numbers and/or colors
  !value.startsWith("url(")) {
    return true;
  }
  return false;
};
function hasKeyframesChanged(keyframes2) {
  const current2 = keyframes2[0];
  if (keyframes2.length === 1)
    return true;
  for (let i = 0; i < keyframes2.length; i++) {
    if (keyframes2[i] !== current2)
      return true;
  }
}
function canAnimate(keyframes2, name, type, velocity) {
  const originKeyframe = keyframes2[0];
  if (originKeyframe === null)
    return false;
  if (name === "display" || name === "visibility")
    return true;
  const targetKeyframe = keyframes2[keyframes2.length - 1];
  const isOriginAnimatable = isAnimatable(originKeyframe, name);
  const isTargetAnimatable = isAnimatable(targetKeyframe, name);
  exports.warning(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". "${isOriginAnimatable ? targetKeyframe : originKeyframe}" is not an animatable value.`, "value-not-animatable");
  if (!isOriginAnimatable || !isTargetAnimatable) {
    return false;
  }
  return hasKeyframesChanged(keyframes2) || (type === "spring" || isGenerator(type)) && velocity;
}
function makeAnimationInstant(options) {
  options.duration = 0;
  options.type = "keyframes";
}
const acceleratedValues$1 = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]);
const supportsWaapi = /* @__PURE__ */ memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function supportsBrowserAnimation(options) {
  var _a2;
  const { motionValue: motionValue2, name, repeatDelay, repeatType, damping, type } = options;
  const subject = (_a2 = motionValue2 == null ? void 0 : motionValue2.owner) == null ? void 0 : _a2.current;
  if (!(subject instanceof HTMLElement)) {
    return false;
  }
  const { onUpdate, transformTemplate } = motionValue2.owner.getProps();
  return supportsWaapi() && name && acceleratedValues$1.has(name) && (name !== "transform" || !transformTemplate) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !onUpdate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
}
const MAX_RESOLVE_DELAY = 40;
class AsyncMotionValueAnimation extends WithPromise {
  constructor({ autoplay = true, delay: delay2 = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", keyframes: keyframes2, name, motionValue: motionValue2, element, ...options }) {
    var _a2;
    super();
    this.stop = () => {
      var _a3, _b;
      if (this._animation) {
        this._animation.stop();
        (_a3 = this.stopTimeline) == null ? void 0 : _a3.call(this);
      }
      (_b = this.keyframeResolver) == null ? void 0 : _b.cancel();
    };
    this.createdAt = time.now();
    const optionsWithDefaults = {
      autoplay,
      delay: delay2,
      type,
      repeat,
      repeatDelay,
      repeatType,
      name,
      motionValue: motionValue2,
      element,
      ...options
    };
    const KeyframeResolver$1 = (element == null ? void 0 : element.KeyframeResolver) || KeyframeResolver;
    this.keyframeResolver = new KeyframeResolver$1(keyframes2, (resolvedKeyframes, finalKeyframe, forced) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe, optionsWithDefaults, !forced), name, motionValue2, element);
    (_a2 = this.keyframeResolver) == null ? void 0 : _a2.scheduleResolve();
  }
  onKeyframesResolved(keyframes2, finalKeyframe, options, sync2) {
    this.keyframeResolver = void 0;
    const { name, type, velocity, delay: delay2, isHandoff, onUpdate } = options;
    this.resolvedAt = time.now();
    if (!canAnimate(keyframes2, name, type, velocity)) {
      if (MotionGlobalConfig.instantAnimations || !delay2) {
        onUpdate == null ? void 0 : onUpdate(getFinalKeyframe$1(keyframes2, options, finalKeyframe));
      }
      keyframes2[0] = keyframes2[keyframes2.length - 1];
      makeAnimationInstant(options);
      options.repeat = 0;
    }
    const startTime = sync2 ? !this.resolvedAt ? this.createdAt : this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt : void 0;
    const resolvedOptions = {
      startTime,
      finalKeyframe,
      ...options,
      keyframes: keyframes2
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
    var _a2;
    if (!this._animation) {
      (_a2 = this.keyframeResolver) == null ? void 0 : _a2.resume();
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
    var _a2;
    if (this._animation) {
      this.animation.cancel();
    }
    (_a2 = this.keyframeResolver) == null ? void 0 : _a2.cancel();
  }
}
class GroupAnimation {
  constructor(animations) {
    this.stop = () => this.runAll("stop");
    this.animations = animations.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((animation) => animation.finished));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(propName) {
    return this.animations[0][propName];
  }
  setAll(propName, newValue) {
    for (let i = 0; i < this.animations.length; i++) {
      this.animations[i][propName] = newValue;
    }
  }
  attachTimeline(timeline) {
    const subscriptions = this.animations.map((animation) => animation.attachTimeline(timeline));
    return () => {
      subscriptions.forEach((cancel, i) => {
        cancel && cancel();
        this.animations[i].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(time2) {
    this.setAll("time", time2);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(speed) {
    this.setAll("speed", speed);
  }
  get state() {
    return this.getAll("state");
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    return getMax(this.animations, "duration");
  }
  get iterationDuration() {
    return getMax(this.animations, "iterationDuration");
  }
  runAll(methodName) {
    this.animations.forEach((controls) => controls[methodName]());
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
function getMax(animations, propName) {
  let max = 0;
  for (let i = 0; i < animations.length; i++) {
    const value = animations[i][propName];
    if (value !== null && value > max) {
      max = value;
    }
  }
  return max;
}
class GroupAnimationWithThen extends GroupAnimation {
  then(onResolve, _onReject) {
    return this.finished.finally(onResolve).then(() => {
    });
  }
}
class NativeAnimationWrapper extends NativeAnimation {
  constructor(animation) {
    super();
    this.animation = animation;
    animation.onfinish = () => {
      this.finishedTime = this.time;
      this.notifyFinished();
    };
  }
}
const animationMaps = /* @__PURE__ */ new WeakMap();
const animationMapKey = (name, pseudoElement = "") => `${name}:${pseudoElement}`;
function getAnimationMap(element) {
  const map = animationMaps.get(element) || /* @__PURE__ */ new Map();
  animationMaps.set(element, map);
  return map;
}
const splitCSSVariableRegex = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function parseCSSVariable(current2) {
  const match = splitCSSVariableRegex.exec(current2);
  if (!match)
    return [,];
  const [, token1, token2, fallback] = match;
  return [`--${token1 ?? token2}`, fallback];
}
const maxDepth = 4;
function getVariableValue(current2, element, depth = 1) {
  exports.invariant(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current2}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [token, fallback] = parseCSSVariable(current2);
  if (!token)
    return;
  const resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    const trimmed = resolved.trim();
    return isNumericalString(trimmed) ? parseFloat(trimmed) : trimmed;
  }
  return isCSSVariableToken(fallback) ? getVariableValue(fallback, element, depth + 1) : fallback;
}
function getValueTransition$1(transition, key) {
  return (transition == null ? void 0 : transition[key]) ?? (transition == null ? void 0 : transition["default"]) ?? transition;
}
const positionalKeys = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...transformPropOrder
]);
const auto = {
  test: (v) => v === "auto",
  parse: (v) => v
};
const testValueType = (v) => (type) => type.test(v);
const dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
const findDimensionValueType = (v) => dimensionValueTypes.find(testValueType(v));
function isNone(value) {
  if (typeof value === "number") {
    return value === 0;
  } else if (value !== null) {
    return value === "none" || value === "0" || isZeroValueString(value);
  } else {
    return true;
  }
}
const maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v) {
  const [name, value] = v.slice(0, -1).split("(");
  if (name === "drop-shadow")
    return v;
  const [number2] = value.match(floatRegex) || [];
  if (!number2)
    return v;
  const unit = value.replace(number2, "");
  let defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number2 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
const functionRegex = /\b([a-z-]*)\(.*?\)/gu;
const filter = {
  ...complex,
  getAnimatableNone: (v) => {
    const functions = v.match(functionRegex);
    return functions ? functions.map(applyDefaultFilter).join(" ") : v;
  }
};
const int = {
  ...number,
  transform: Math.round
};
const transformValueTypes = {
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
  originZ: px
};
const numberValueTypes = {
  // Border props
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
  top: px,
  right: px,
  bottom: px,
  left: px,
  inset: px,
  insetBlock: px,
  insetBlockStart: px,
  insetBlockEnd: px,
  insetInline: px,
  insetInlineStart: px,
  insetInlineEnd: px,
  // Spacing props
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  paddingBlock: px,
  paddingBlockStart: px,
  paddingBlockEnd: px,
  paddingInline: px,
  paddingInlineStart: px,
  paddingInlineEnd: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  marginBlock: px,
  marginBlockStart: px,
  marginBlockEnd: px,
  marginInline: px,
  marginInlineStart: px,
  marginInlineEnd: px,
  // Misc
  backgroundPositionX: px,
  backgroundPositionY: px,
  ...transformValueTypes,
  zIndex: int,
  // SVG
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};
const defaultValueTypes = {
  ...numberValueTypes,
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
  filter,
  WebkitFilter: filter
};
const getDefaultValueType = (key) => defaultValueTypes[key];
function getAnimatableNone(key, value) {
  let defaultValueType = getDefaultValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}
const invalidTemplates = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
  let i = 0;
  let animatableTemplate = void 0;
  while (i < unresolvedKeyframes.length && !animatableTemplate) {
    const keyframe = unresolvedKeyframes[i];
    if (typeof keyframe === "string" && !invalidTemplates.has(keyframe) && analyseComplexValue(keyframe).values.length) {
      animatableTemplate = unresolvedKeyframes[i];
    }
    i++;
  }
  if (animatableTemplate && name) {
    for (const noneIndex of noneKeyframeIndexes) {
      unresolvedKeyframes[noneIndex] = getAnimatableNone(name, animatableTemplate);
    }
  }
}
class DOMKeyframesResolver extends KeyframeResolver {
  constructor(unresolvedKeyframes, onComplete, name, motionValue2, element) {
    super(unresolvedKeyframes, onComplete, name, motionValue2, element, true);
  }
  readKeyframes() {
    const { unresolvedKeyframes, element, name } = this;
    if (!element || !element.current)
      return;
    super.readKeyframes();
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      let keyframe = unresolvedKeyframes[i];
      if (typeof keyframe === "string") {
        keyframe = keyframe.trim();
        if (isCSSVariableToken(keyframe)) {
          const resolved = getVariableValue(keyframe, element.current);
          if (resolved !== void 0) {
            unresolvedKeyframes[i] = resolved;
          }
          if (i === unresolvedKeyframes.length - 1) {
            this.finalKeyframe = keyframe;
          }
        }
      }
    }
    this.resolveNoneKeyframes();
    if (!positionalKeys.has(name) || unresolvedKeyframes.length !== 2) {
      return;
    }
    const [origin, target] = unresolvedKeyframes;
    const originType = findDimensionValueType(origin);
    const targetType = findDimensionValueType(target);
    const originHasVar = containsCSSVariable(origin);
    const targetHasVar = containsCSSVariable(target);
    if (originHasVar !== targetHasVar && positionalValues[name]) {
      this.needsMeasurement = true;
      return;
    }
    if (originType === targetType)
      return;
    if (isNumOrPxType(originType) && isNumOrPxType(targetType)) {
      for (let i = 0; i < unresolvedKeyframes.length; i++) {
        const value = unresolvedKeyframes[i];
        if (typeof value === "string") {
          unresolvedKeyframes[i] = parseFloat(value);
        }
      }
    } else if (positionalValues[name]) {
      this.needsMeasurement = true;
    }
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes, name } = this;
    const noneKeyframeIndexes = [];
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      if (unresolvedKeyframes[i] === null || isNone(unresolvedKeyframes[i])) {
        noneKeyframeIndexes.push(i);
      }
    }
    if (noneKeyframeIndexes.length) {
      makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name);
    }
  }
  measureInitialState() {
    const { element, unresolvedKeyframes, name } = this;
    if (!element || !element.current)
      return;
    if (name === "height") {
      this.suspendedScrollY = window.pageYOffset;
    }
    this.measuredOrigin = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    unresolvedKeyframes[0] = this.measuredOrigin;
    const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
    if (measureKeyframe !== void 0) {
      element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
    }
  }
  measureEndState() {
    var _a2;
    const { element, name, unresolvedKeyframes } = this;
    if (!element || !element.current)
      return;
    const value = element.getValue(name);
    value && value.jump(this.measuredOrigin, false);
    const finalKeyframeIndex = unresolvedKeyframes.length - 1;
    const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
    unresolvedKeyframes[finalKeyframeIndex] = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    if (finalKeyframe !== null && this.finalKeyframe === void 0) {
      this.finalKeyframe = finalKeyframe;
    }
    if ((_a2 = this.removedTransforms) == null ? void 0 : _a2.length) {
      this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue]) => {
        element.getValue(unsetTransformName).set(unsetTransformValue);
      });
    }
    this.resolveNoneKeyframes();
  }
}
const pxValues = /* @__PURE__ */ new Set([
  // Border props
  "borderWidth",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "borderRadius",
  "radius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius",
  // Positioning props
  "width",
  "maxWidth",
  "height",
  "maxHeight",
  "top",
  "right",
  "bottom",
  "left",
  "inset",
  "insetBlock",
  "insetBlockStart",
  "insetBlockEnd",
  "insetInline",
  "insetInlineStart",
  "insetInlineEnd",
  // Spacing props
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "paddingBlock",
  "paddingBlockStart",
  "paddingBlockEnd",
  "paddingInline",
  "paddingInlineStart",
  "paddingInlineEnd",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "marginBlock",
  "marginBlockStart",
  "marginBlockEnd",
  "marginInline",
  "marginInlineStart",
  "marginInlineEnd",
  // Misc
  "backgroundPositionX",
  "backgroundPositionY"
]);
function applyPxDefaults(keyframes2, name) {
  for (let i = 0; i < keyframes2.length; i++) {
    if (typeof keyframes2[i] === "number" && pxValues.has(name)) {
      keyframes2[i] = keyframes2[i] + "px";
    }
  }
}
function isWaapiSupportedEasing(easing) {
  return Boolean(typeof easing === "function" && supportsLinearEasing() || !easing || typeof easing === "string" && (easing in supportedWaapiEasing || supportsLinearEasing()) || isBezierDefinition(easing) || Array.isArray(easing) && easing.every(isWaapiSupportedEasing));
}
const supportsPartialKeyframes = /* @__PURE__ */ memo(() => {
  try {
    document.createElement("div").animate({ opacity: [1] });
  } catch (e) {
    return false;
  }
  return true;
});
const acceleratedValues = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]);
function camelToDash$1(str) {
  return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
}
function resolveElements(elementOrSelector, scope, selectorCache) {
  if (elementOrSelector instanceof EventTarget) {
    return [elementOrSelector];
  } else if (typeof elementOrSelector === "string") {
    let root = document;
    if (scope) {
      root = scope.current;
    }
    const elements = (selectorCache == null ? void 0 : selectorCache[elementOrSelector]) ?? root.querySelectorAll(elementOrSelector);
    return elements ? Array.from(elements) : [];
  }
  return Array.from(elementOrSelector);
}
function createSelectorEffect(subjectEffect) {
  return (subject, values) => {
    const elements = resolveElements(subject);
    const subscriptions = [];
    for (const element of elements) {
      const remove = subjectEffect(element, values);
      subscriptions.push(remove);
    }
    return () => {
      for (const remove of subscriptions)
        remove();
    };
  };
}
const getValueAsType = (value, type) => {
  return type && typeof value === "number" ? type.transform(value) : value;
};
class MotionValueState {
  constructor() {
    this.latest = {};
    this.values = /* @__PURE__ */ new Map();
  }
  set(name, value, render, computed, useDefaultValueType = true) {
    const existingValue = this.values.get(name);
    if (existingValue) {
      existingValue.onRemove();
    }
    const onChange = () => {
      const v = value.get();
      if (useDefaultValueType) {
        this.latest[name] = getValueAsType(v, numberValueTypes[name]);
      } else {
        this.latest[name] = v;
      }
      render && frame.render(render);
    };
    onChange();
    const cancelOnChange = value.on("change", onChange);
    computed && value.addDependent(computed);
    const remove = () => {
      cancelOnChange();
      render && cancelFrame(render);
      this.values.delete(name);
      computed && value.removeDependent(computed);
    };
    this.values.set(name, { value, onRemove: remove });
    return remove;
  }
  get(name) {
    var _a2;
    return (_a2 = this.values.get(name)) == null ? void 0 : _a2.value;
  }
  destroy() {
    for (const value of this.values.values()) {
      value.onRemove();
    }
  }
}
function createEffect(addValue) {
  const stateCache = /* @__PURE__ */ new WeakMap();
  const subscriptions = [];
  return (subject, values) => {
    const state = stateCache.get(subject) ?? new MotionValueState();
    stateCache.set(subject, state);
    for (const key in values) {
      const value = values[key];
      const remove = addValue(subject, state, key, value);
      subscriptions.push(remove);
    }
    return () => {
      for (const cancel of subscriptions)
        cancel();
    };
  };
}
function canSetAsProperty(element, name) {
  if (!(name in element))
    return false;
  const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), name) || Object.getOwnPropertyDescriptor(element, name);
  return descriptor && typeof descriptor.set === "function";
}
const addAttrValue = (element, state, key, value) => {
  const isProp = canSetAsProperty(element, key);
  const name = isProp ? key : key.startsWith("data") || key.startsWith("aria") ? camelToDash$1(key) : key;
  const render = isProp ? () => {
    element[name] = state.latest[key];
  } : () => {
    const v = state.latest[key];
    if (v === null || v === void 0) {
      element.removeAttribute(name);
    } else {
      element.setAttribute(name, String(v));
    }
  };
  return state.set(key, value, render);
};
const attrEffect = /* @__PURE__ */ createSelectorEffect(
  /* @__PURE__ */ createEffect(addAttrValue)
);
const propEffect = /* @__PURE__ */ createEffect((subject, state, key, value) => {
  return state.set(key, value, () => {
    subject[key] = state.latest[key];
  }, void 0, false);
});
function isHTMLElement$1(element) {
  return isObject(element) && "offsetHeight" in element;
}
const MAX_VELOCITY_DELTA = 30;
const isFloat = (value) => {
  return !isNaN(parseFloat(value));
};
const collectMotionValues = {
  current: void 0
};
class MotionValue {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(init, options = {}) {
    this.canTrackVelocity = null;
    this.events = {};
    this.updateAndNotify = (v) => {
      var _a2;
      const currentTime = time.now();
      if (this.updatedAt !== currentTime) {
        this.setPrevFrameValue();
      }
      this.prev = this.current;
      this.setCurrent(v);
      if (this.current !== this.prev) {
        (_a2 = this.events.change) == null ? void 0 : _a2.notify(this.current);
        if (this.dependents) {
          for (const dependent of this.dependents) {
            dependent.dirty();
          }
        }
      }
    };
    this.hasAnimated = false;
    this.setCurrent(init);
    this.owner = options.owner;
  }
  setCurrent(current2) {
    this.current = current2;
    this.updatedAt = time.now();
    if (this.canTrackVelocity === null && current2 !== void 0) {
      this.canTrackVelocity = isFloat(this.current);
    }
  }
  setPrevFrameValue(prevFrameValue = this.current) {
    this.prevFrameValue = prevFrameValue;
    this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(subscription) {
    if (process.env.NODE_ENV !== "production") {
      warnOnce(false, `value.onChange(callback) is deprecated. Switch to value.on("change", callback).`);
    }
    return this.on("change", subscription);
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    const unsubscribe = this.events[eventName].add(callback);
    if (eventName === "change") {
      return () => {
        unsubscribe();
        frame.read(() => {
          if (!this.events.change.getSize()) {
            this.stop();
          }
        });
      };
    }
    return unsubscribe;
  }
  clearListeners() {
    for (const eventManagers in this.events) {
      this.events[eventManagers].clear();
    }
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(passiveEffect, stopPassiveEffect) {
    this.passiveEffect = passiveEffect;
    this.stopPassiveEffect = stopPassiveEffect;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(v) {
    if (!this.passiveEffect) {
      this.updateAndNotify(v);
    } else {
      this.passiveEffect(v, this.updateAndNotify);
    }
  }
  setWithVelocity(prev, current2, delta) {
    this.set(current2);
    this.prev = void 0;
    this.prevFrameValue = prev;
    this.prevUpdatedAt = this.updatedAt - delta;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(v, endAnimation = true) {
    this.updateAndNotify(v);
    this.prev = v;
    this.prevUpdatedAt = this.prevFrameValue = void 0;
    endAnimation && this.stop();
    if (this.stopPassiveEffect)
      this.stopPassiveEffect();
  }
  dirty() {
    var _a2;
    (_a2 = this.events.change) == null ? void 0 : _a2.notify(this.current);
  }
  addDependent(dependent) {
    if (!this.dependents) {
      this.dependents = /* @__PURE__ */ new Set();
    }
    this.dependents.add(dependent);
  }
  removeDependent(dependent) {
    if (this.dependents) {
      this.dependents.delete(dependent);
    }
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    if (collectMotionValues.current) {
      collectMotionValues.current.push(this);
    }
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const currentTime = time.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
      return 0;
    }
    const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
    return velocityPerSecond(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(startAnimation) {
    this.stop();
    return new Promise((resolve) => {
      this.hasAnimated = true;
      this.animation = startAnimation(resolve);
      if (this.events.animationStart) {
        this.events.animationStart.notify();
      }
    }).then(() => {
      if (this.events.animationComplete) {
        this.events.animationComplete.notify();
      }
      this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    if (this.animation) {
      this.animation.stop();
      if (this.events.animationCancel) {
        this.events.animationCancel.notify();
      }
    }
    this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    var _a2, _b;
    (_a2 = this.dependents) == null ? void 0 : _a2.clear();
    (_b = this.events.destroy) == null ? void 0 : _b.notify();
    this.clearListeners();
    this.stop();
    if (this.stopPassiveEffect) {
      this.stopPassiveEffect();
    }
  }
}
function motionValue(init, options) {
  return new MotionValue(init, options);
}
const translateAlias$1 = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
function buildTransform$1(state) {
  let transform2 = "";
  let transformIsDefault = true;
  for (let i = 0; i < transformPropOrder.length; i++) {
    const key = transformPropOrder[i];
    const value = state.latest[key];
    if (value === void 0)
      continue;
    let valueIsDefault = true;
    if (typeof value === "number") {
      valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
    } else {
      valueIsDefault = parseFloat(value) === 0;
    }
    if (!valueIsDefault) {
      transformIsDefault = false;
      const transformName = translateAlias$1[key] || key;
      const valueToRender = state.latest[key];
      transform2 += `${transformName}(${valueToRender}) `;
    }
  }
  return transformIsDefault ? "none" : transform2.trim();
}
const originProps = /* @__PURE__ */ new Set(["originX", "originY", "originZ"]);
const addStyleValue = (element, state, key, value) => {
  let render = void 0;
  let computed = void 0;
  if (transformProps.has(key)) {
    if (!state.get("transform")) {
      if (!isHTMLElement$1(element) && !state.get("transformBox")) {
        addStyleValue(element, state, "transformBox", new MotionValue("fill-box"));
      }
      state.set("transform", new MotionValue("none"), () => {
        element.style.transform = buildTransform$1(state);
      });
    }
    computed = state.get("transform");
  } else if (originProps.has(key)) {
    if (!state.get("transformOrigin")) {
      state.set("transformOrigin", new MotionValue(""), () => {
        const originX = state.latest.originX ?? "50%";
        const originY = state.latest.originY ?? "50%";
        const originZ = state.latest.originZ ?? 0;
        element.style.transformOrigin = `${originX} ${originY} ${originZ}`;
      });
    }
    computed = state.get("transformOrigin");
  } else if (isCSSVar(key)) {
    render = () => {
      element.style.setProperty(key, state.latest[key]);
    };
  } else {
    render = () => {
      element.style[key] = state.latest[key];
    };
  }
  return state.set(key, value, render, computed);
};
const styleEffect = /* @__PURE__ */ createSelectorEffect(
  /* @__PURE__ */ createEffect(addStyleValue)
);
const toPx = px.transform;
function addSVGPathValue(element, state, key, value) {
  frame.render(() => element.setAttribute("pathLength", "1"));
  if (key === "pathOffset") {
    return state.set(key, value, () => element.setAttribute("stroke-dashoffset", toPx(-state.latest[key])));
  } else {
    if (!state.get("stroke-dasharray")) {
      state.set("stroke-dasharray", new MotionValue("1 1"), () => {
        const { pathLength = 1, pathSpacing } = state.latest;
        element.setAttribute("stroke-dasharray", `${toPx(pathLength)} ${toPx(pathSpacing ?? 1 - Number(pathLength))}`);
      });
    }
    return state.set(key, value, void 0, state.get("stroke-dasharray"));
  }
}
const addSVGValue = (element, state, key, value) => {
  if (key.startsWith("path")) {
    return addSVGPathValue(element, state, key, value);
  } else if (key.startsWith("attr")) {
    return addAttrValue(element, state, convertAttrKey(key), value);
  }
  const handler = key in element.style ? addStyleValue : addAttrValue;
  return handler(element, state, key, value);
};
const svgEffect = /* @__PURE__ */ createSelectorEffect(
  /* @__PURE__ */ createEffect(addSVGValue)
);
function convertAttrKey(key) {
  return key.replace(/^attr([A-Z])/, (_, firstChar) => firstChar.toLowerCase());
}
const { schedule: microtask, cancel: cancelMicrotask } = /* @__PURE__ */ createRenderBatcher(queueMicrotask, false);
const isDragging = {
  x: false,
  y: false
};
function isDragActive() {
  return isDragging.x || isDragging.y;
}
function setDragLock(axis) {
  if (axis === "x" || axis === "y") {
    if (isDragging[axis]) {
      return null;
    } else {
      isDragging[axis] = true;
      return () => {
        isDragging[axis] = false;
      };
    }
  } else {
    if (isDragging.x || isDragging.y) {
      return null;
    } else {
      isDragging.x = isDragging.y = true;
      return () => {
        isDragging.x = isDragging.y = false;
      };
    }
  }
}
function setupGesture(elementOrSelector, options) {
  const elements = resolveElements(elementOrSelector);
  const gestureAbortController = new AbortController();
  const eventOptions = {
    passive: true,
    ...options,
    signal: gestureAbortController.signal
  };
  const cancel = () => gestureAbortController.abort();
  return [elements, eventOptions, cancel];
}
function isValidHover(event) {
  return !(event.pointerType === "touch" || isDragActive());
}
function hover(elementOrSelector, onHoverStart, options = {}) {
  const [elements, eventOptions, cancel] = setupGesture(elementOrSelector, options);
  const onPointerEnter = (enterEvent) => {
    if (!isValidHover(enterEvent))
      return;
    const { target } = enterEvent;
    const onHoverEnd = onHoverStart(target, enterEvent);
    if (typeof onHoverEnd !== "function" || !target)
      return;
    const onPointerLeave = (leaveEvent) => {
      if (!isValidHover(leaveEvent))
        return;
      onHoverEnd(leaveEvent);
      target.removeEventListener("pointerleave", onPointerLeave);
    };
    target.addEventListener("pointerleave", onPointerLeave, eventOptions);
  };
  elements.forEach((element) => {
    element.addEventListener("pointerenter", onPointerEnter, eventOptions);
  });
  return cancel;
}
const isNodeOrChild = (parent, child) => {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild(parent, child.parentElement);
  }
};
const isPrimaryPointer$1 = (event) => {
  if (event.pointerType === "mouse") {
    return typeof event.button !== "number" || event.button <= 0;
  } else {
    return event.isPrimary !== false;
  }
};
const interactiveElements = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function isElementKeyboardAccessible(element) {
  return interactiveElements.has(element.tagName) || element.isContentEditable === true;
}
const isPressing = /* @__PURE__ */ new WeakSet();
function filterEvents(callback) {
  return (event) => {
    if (event.key !== "Enter")
      return;
    callback(event);
  };
}
function firePointerEvent(target, type) {
  target.dispatchEvent(new PointerEvent("pointer" + type, { isPrimary: true, bubbles: true }));
}
const enableKeyboardPress = (focusEvent, eventOptions) => {
  const element = focusEvent.currentTarget;
  if (!element)
    return;
  const handleKeydown = filterEvents(() => {
    if (isPressing.has(element))
      return;
    firePointerEvent(element, "down");
    const handleKeyup = filterEvents(() => {
      firePointerEvent(element, "up");
    });
    const handleBlur = () => firePointerEvent(element, "cancel");
    element.addEventListener("keyup", handleKeyup, eventOptions);
    element.addEventListener("blur", handleBlur, eventOptions);
  });
  element.addEventListener("keydown", handleKeydown, eventOptions);
  element.addEventListener("blur", () => element.removeEventListener("keydown", handleKeydown), eventOptions);
};
function isValidPressEvent(event) {
  return isPrimaryPointer$1(event) && !isDragActive();
}
function press(targetOrSelector, onPressStart, options = {}) {
  const [targets, eventOptions, cancelEvents] = setupGesture(targetOrSelector, options);
  const startPress = (startEvent) => {
    const target = startEvent.currentTarget;
    if (!isValidPressEvent(startEvent))
      return;
    isPressing.add(target);
    const onPressEnd = onPressStart(target, startEvent);
    const onPointerEnd = (endEvent, success) => {
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);
      if (isPressing.has(target)) {
        isPressing.delete(target);
      }
      if (!isValidPressEvent(endEvent)) {
        return;
      }
      if (typeof onPressEnd === "function") {
        onPressEnd(endEvent, { success });
      }
    };
    const onPointerUp = (upEvent) => {
      onPointerEnd(upEvent, target === window || target === document || options.useGlobalTarget || isNodeOrChild(target, upEvent.target));
    };
    const onPointerCancel = (cancelEvent) => {
      onPointerEnd(cancelEvent, false);
    };
    window.addEventListener("pointerup", onPointerUp, eventOptions);
    window.addEventListener("pointercancel", onPointerCancel, eventOptions);
  };
  targets.forEach((target) => {
    const pointerDownTarget = options.useGlobalTarget ? window : target;
    pointerDownTarget.addEventListener("pointerdown", startPress, eventOptions);
    if (isHTMLElement$1(target)) {
      target.addEventListener("focus", (event) => enableKeyboardPress(event, eventOptions));
      if (!isElementKeyboardAccessible(target) && !target.hasAttribute("tabindex")) {
        target.tabIndex = 0;
      }
    }
  });
  return cancelEvents;
}
function getComputedStyle$2(element, name) {
  const computedStyle = window.getComputedStyle(element);
  return isCSSVar(name) ? computedStyle.getPropertyValue(name) : computedStyle[name];
}
function isSVGElement$1(element) {
  return isObject(element) && "ownerSVGElement" in element;
}
const resizeHandlers = /* @__PURE__ */ new WeakMap();
let observer;
const getSize = (borderBoxAxis, svgAxis, htmlAxis) => (target, borderBoxSize) => {
  if (borderBoxSize && borderBoxSize[0]) {
    return borderBoxSize[0][borderBoxAxis + "Size"];
  } else if (isSVGElement$1(target) && "getBBox" in target) {
    return target.getBBox()[svgAxis];
  } else {
    return target[htmlAxis];
  }
};
const getWidth = /* @__PURE__ */ getSize("inline", "width", "offsetWidth");
const getHeight = /* @__PURE__ */ getSize("block", "height", "offsetHeight");
function notifyTarget({ target, borderBoxSize }) {
  var _a2;
  (_a2 = resizeHandlers.get(target)) == null ? void 0 : _a2.forEach((handler) => {
    handler(target, {
      get width() {
        return getWidth(target, borderBoxSize);
      },
      get height() {
        return getHeight(target, borderBoxSize);
      }
    });
  });
}
function notifyAll(entries) {
  entries.forEach(notifyTarget);
}
function createResizeObserver() {
  if (typeof ResizeObserver === "undefined")
    return;
  observer = new ResizeObserver(notifyAll);
}
function resizeElement(target, handler) {
  if (!observer)
    createResizeObserver();
  const elements = resolveElements(target);
  elements.forEach((element) => {
    let elementHandlers = resizeHandlers.get(element);
    if (!elementHandlers) {
      elementHandlers = /* @__PURE__ */ new Set();
      resizeHandlers.set(element, elementHandlers);
    }
    elementHandlers.add(handler);
    observer == null ? void 0 : observer.observe(element);
  });
  return () => {
    elements.forEach((element) => {
      const elementHandlers = resizeHandlers.get(element);
      elementHandlers == null ? void 0 : elementHandlers.delete(handler);
      if (!(elementHandlers == null ? void 0 : elementHandlers.size)) {
        observer == null ? void 0 : observer.unobserve(element);
      }
    });
  };
}
const windowCallbacks = /* @__PURE__ */ new Set();
let windowResizeHandler;
function createWindowResizeHandler() {
  windowResizeHandler = () => {
    const info = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    windowCallbacks.forEach((callback) => callback(info));
  };
  window.addEventListener("resize", windowResizeHandler);
}
function resizeWindow(callback) {
  windowCallbacks.add(callback);
  if (!windowResizeHandler)
    createWindowResizeHandler();
  return () => {
    windowCallbacks.delete(callback);
    if (!windowCallbacks.size && typeof windowResizeHandler === "function") {
      window.removeEventListener("resize", windowResizeHandler);
      windowResizeHandler = void 0;
    }
  };
}
function resize(a, b) {
  return typeof a === "function" ? resizeWindow(a) : resizeElement(a, b);
}
function observeTimeline(update, timeline) {
  let prevProgress;
  const onFrame = () => {
    const { currentTime } = timeline;
    const percentage = currentTime === null ? 0 : currentTime.value;
    const progress2 = percentage / 100;
    if (prevProgress !== progress2) {
      update(progress2);
    }
    prevProgress = progress2;
  };
  frame.preUpdate(onFrame, true);
  return () => cancelFrame(onFrame);
}
function record() {
  const { value } = statsBuffer;
  if (value === null) {
    cancelFrame(record);
    return;
  }
  value.frameloop.rate.push(frameData.delta);
  value.animations.mainThread.push(activeAnimations.mainThread);
  value.animations.waapi.push(activeAnimations.waapi);
  value.animations.layout.push(activeAnimations.layout);
}
function mean(values) {
  return values.reduce((acc, value) => acc + value, 0) / values.length;
}
function summarise(values, calcAverage = mean) {
  if (values.length === 0) {
    return {
      min: 0,
      max: 0,
      avg: 0
    };
  }
  return {
    min: Math.min(...values),
    max: Math.max(...values),
    avg: calcAverage(values)
  };
}
const msToFps = (ms) => Math.round(1e3 / ms);
function clearStatsBuffer() {
  statsBuffer.value = null;
  statsBuffer.addProjectionMetrics = null;
}
function reportStats() {
  const { value } = statsBuffer;
  if (!value) {
    throw new Error("Stats are not being measured");
  }
  clearStatsBuffer();
  cancelFrame(record);
  const summary = {
    frameloop: {
      setup: summarise(value.frameloop.setup),
      rate: summarise(value.frameloop.rate),
      read: summarise(value.frameloop.read),
      resolveKeyframes: summarise(value.frameloop.resolveKeyframes),
      preUpdate: summarise(value.frameloop.preUpdate),
      update: summarise(value.frameloop.update),
      preRender: summarise(value.frameloop.preRender),
      render: summarise(value.frameloop.render),
      postRender: summarise(value.frameloop.postRender)
    },
    animations: {
      mainThread: summarise(value.animations.mainThread),
      waapi: summarise(value.animations.waapi),
      layout: summarise(value.animations.layout)
    },
    layoutProjection: {
      nodes: summarise(value.layoutProjection.nodes),
      calculatedTargetDeltas: summarise(value.layoutProjection.calculatedTargetDeltas),
      calculatedProjections: summarise(value.layoutProjection.calculatedProjections)
    }
  };
  const { rate } = summary.frameloop;
  rate.min = msToFps(rate.min);
  rate.max = msToFps(rate.max);
  rate.avg = msToFps(rate.avg);
  [rate.min, rate.max] = [rate.max, rate.min];
  return summary;
}
function recordStats() {
  if (statsBuffer.value) {
    clearStatsBuffer();
    throw new Error("Stats are already being measured");
  }
  const newStatsBuffer = statsBuffer;
  newStatsBuffer.value = {
    frameloop: {
      setup: [],
      rate: [],
      read: [],
      resolveKeyframes: [],
      preUpdate: [],
      update: [],
      preRender: [],
      render: [],
      postRender: []
    },
    animations: {
      mainThread: [],
      waapi: [],
      layout: []
    },
    layoutProjection: {
      nodes: [],
      calculatedTargetDeltas: [],
      calculatedProjections: []
    }
  };
  newStatsBuffer.addProjectionMetrics = (metrics2) => {
    const { layoutProjection } = newStatsBuffer.value;
    layoutProjection.nodes.push(metrics2.nodes);
    layoutProjection.calculatedTargetDeltas.push(metrics2.calculatedTargetDeltas);
    layoutProjection.calculatedProjections.push(metrics2.calculatedProjections);
  };
  frame.postRender(record, true);
  return reportStats;
}
function isSVGSVGElement(element) {
  return isSVGElement$1(element) && element.tagName === "svg";
}
function getOriginIndex(from, total) {
  if (from === "first") {
    return 0;
  } else {
    const lastIndex = total - 1;
    return from === "last" ? lastIndex : lastIndex / 2;
  }
}
function stagger(duration = 0.1, { startDelay = 0, from = 0, ease: ease2 } = {}) {
  return (i, total) => {
    const fromIndex = typeof from === "number" ? from : getOriginIndex(from, total);
    const distance2 = Math.abs(fromIndex - i);
    let delay2 = duration * distance2;
    if (ease2) {
      const maxDelay = total * duration;
      const easingFunction = easingDefinitionToFunction(ease2);
      delay2 = easingFunction(delay2 / maxDelay) * maxDelay;
    }
    return startDelay + delay2;
  };
}
function transform(...args) {
  const useImmediate = !Array.isArray(args[0]);
  const argOffset = useImmediate ? 0 : -1;
  const inputValue = args[0 + argOffset];
  const inputRange = args[1 + argOffset];
  const outputRange = args[2 + argOffset];
  const options = args[3 + argOffset];
  const interpolator = interpolate(inputRange, outputRange, options);
  return useImmediate ? interpolator(inputValue) : interpolator;
}
function subscribeValue(inputValues, outputValue, getLatest) {
  const update = () => outputValue.set(getLatest());
  const scheduleUpdate = () => frame.preRender(update, false, true);
  const subscriptions = inputValues.map((v) => v.on("change", scheduleUpdate));
  outputValue.on("destroy", () => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
    cancelFrame(update);
  });
}
function transformValue(transform2) {
  const collectedValues = [];
  collectMotionValues.current = collectedValues;
  const initialValue = transform2();
  collectMotionValues.current = void 0;
  const value = motionValue(initialValue);
  subscribeValue(collectedValues, value, transform2);
  return value;
}
function mapValue(inputValue, inputRange, outputRange, options) {
  const map = transform(inputRange, outputRange, options);
  return transformValue(() => map(inputValue.get()));
}
const isMotionValue = (value) => Boolean(value && value.getVelocity);
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
  const stopAnimation2 = () => {
    if (activeAnimation) {
      activeAnimation.stop();
      activeAnimation = null;
    }
  };
  const startAnimation = () => {
    stopAnimation2();
    activeAnimation = new JSAnimation({
      keyframes: [asNumber$1(value.get()), asNumber$1(latestValue)],
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
      var _a2;
      startAnimation();
      (_a2 = value["events"].animationStart) == null ? void 0 : _a2.notify();
      activeAnimation == null ? void 0 : activeAnimation.then(() => {
        var _a3;
        (_a3 = value["events"].animationComplete) == null ? void 0 : _a3.notify();
      });
    });
  }, stopAnimation2);
  if (isMotionValue(source)) {
    const removeSourceOnChange = source.on("change", (v) => value.set(parseValue(v, unit)));
    const removeValueOnDestroy = value.on("destroy", removeSourceOnChange);
    return () => {
      removeSourceOnChange();
      removeValueOnDestroy();
    };
  }
  return stopAnimation2;
}
function parseValue(v, unit) {
  return unit ? v + unit : v;
}
function asNumber$1(v) {
  return typeof v === "number" ? v : parseFloat(v);
}
const valueTypes = [...dimensionValueTypes, color, complex];
const findValueType = (v) => valueTypes.find(testValueType(v));
function chooseLayerType(valueName) {
  if (valueName === "layout")
    return "group";
  if (valueName === "enter" || valueName === "new")
    return "new";
  if (valueName === "exit" || valueName === "old")
    return "old";
  return "group";
}
let pendingRules = {};
let style$1 = null;
const css = {
  set: (selector, values) => {
    pendingRules[selector] = values;
  },
  commit: () => {
    if (!style$1) {
      style$1 = document.createElement("style");
      style$1.id = "motion-view";
    }
    let cssText = "";
    for (const selector in pendingRules) {
      const rule = pendingRules[selector];
      cssText += `${selector} {
`;
      for (const [property, value] of Object.entries(rule)) {
        cssText += `  ${property}: ${value};
`;
      }
      cssText += "}\n";
    }
    style$1.textContent = cssText;
    document.head.appendChild(style$1);
    pendingRules = {};
  },
  remove: () => {
    if (style$1 && style$1.parentElement) {
      style$1.parentElement.removeChild(style$1);
    }
  }
};
function getViewAnimationLayerInfo(pseudoElement) {
  const match = pseudoElement.match(/::view-transition-(old|new|group|image-pair)\((.*?)\)/);
  if (!match)
    return null;
  return { layer: match[2], type: match[1] };
}
function filterViewAnimations(animation) {
  var _a2;
  const { effect } = animation;
  if (!effect)
    return false;
  return effect.target === document.documentElement && ((_a2 = effect.pseudoElement) == null ? void 0 : _a2.startsWith("::view-transition"));
}
function getViewAnimations() {
  return document.getAnimations().filter(filterViewAnimations);
}
function hasTarget(target, targets) {
  return targets.has(target) && Object.keys(targets.get(target)).length > 0;
}
const definitionNames = ["layout", "enter", "exit", "new", "old"];
function startViewAnimation(builder) {
  const { update, targets, options: defaultOptions } = builder;
  if (!document.startViewTransition) {
    return new Promise(async (resolve) => {
      await update();
      resolve(new GroupAnimation([]));
    });
  }
  if (!hasTarget("root", targets)) {
    css.set(":root", {
      "view-transition-name": "none"
    });
  }
  css.set("::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*)", { "animation-timing-function": "linear !important" });
  css.commit();
  const transition = document.startViewTransition(async () => {
    await update();
  });
  transition.finished.finally(() => {
    css.remove();
  });
  return new Promise((resolve) => {
    transition.ready.then(() => {
      const generatedViewAnimations = getViewAnimations();
      const animations = [];
      targets.forEach((definition, target) => {
        for (const key of definitionNames) {
          if (!definition[key])
            continue;
          const { keyframes: keyframes2, options } = definition[key];
          for (let [valueName, valueKeyframes] of Object.entries(keyframes2)) {
            if (!valueKeyframes)
              continue;
            const valueOptions = {
              ...getValueTransition$1(defaultOptions, valueName),
              ...getValueTransition$1(options, valueName)
            };
            const type = chooseLayerType(key);
            if (valueName === "opacity" && !Array.isArray(valueKeyframes)) {
              const initialValue = type === "new" ? 0 : 1;
              valueKeyframes = [initialValue, valueKeyframes];
            }
            if (typeof valueOptions.delay === "function") {
              valueOptions.delay = valueOptions.delay(0, 1);
            }
            valueOptions.duration && (valueOptions.duration = /* @__PURE__ */ secondsToMilliseconds(valueOptions.duration));
            valueOptions.delay && (valueOptions.delay = /* @__PURE__ */ secondsToMilliseconds(valueOptions.delay));
            const animation = new NativeAnimation({
              ...valueOptions,
              element: document.documentElement,
              name: valueName,
              pseudoElement: `::view-transition-${type}(${target})`,
              keyframes: valueKeyframes
            });
            animations.push(animation);
          }
        }
      });
      for (const animation of generatedViewAnimations) {
        if (animation.playState === "finished")
          continue;
        const { effect } = animation;
        if (!effect || !(effect instanceof KeyframeEffect))
          continue;
        const { pseudoElement } = effect;
        if (!pseudoElement)
          continue;
        const name = getViewAnimationLayerInfo(pseudoElement);
        if (!name)
          continue;
        const targetDefinition = targets.get(name.layer);
        if (!targetDefinition) {
          const transitionName = name.type === "group" ? "layout" : "";
          let animationTransition = {
            ...getValueTransition$1(defaultOptions, transitionName)
          };
          animationTransition.duration && (animationTransition.duration = /* @__PURE__ */ secondsToMilliseconds(animationTransition.duration));
          animationTransition = applyGeneratorOptions(animationTransition);
          const easing = mapEasingToNativeEasing(animationTransition.ease, animationTransition.duration);
          effect.updateTiming({
            delay: /* @__PURE__ */ secondsToMilliseconds(animationTransition.delay ?? 0),
            duration: animationTransition.duration,
            easing
          });
          animations.push(new NativeAnimationWrapper(animation));
        } else if (hasOpacity(targetDefinition, "enter") && hasOpacity(targetDefinition, "exit") && effect.getKeyframes().some((keyframe) => keyframe.mixBlendMode)) {
          animations.push(new NativeAnimationWrapper(animation));
        } else {
          animation.cancel();
        }
      }
      resolve(new GroupAnimation(animations));
    });
  });
}
function hasOpacity(target, key) {
  var _a2;
  return (_a2 = target == null ? void 0 : target[key]) == null ? void 0 : _a2.keyframes.opacity;
}
let builders = [];
let current = null;
function next() {
  current = null;
  const [nextBuilder] = builders;
  if (nextBuilder)
    start(nextBuilder);
}
function start(builder) {
  removeItem(builders, builder);
  current = builder;
  startViewAnimation(builder).then((animation) => {
    builder.notifyReady(animation);
    animation.finished.finally(next);
  });
}
function processQueue() {
  var _a2;
  for (let i = builders.length - 1; i >= 0; i--) {
    const builder = builders[i];
    const { interrupt } = builder.options;
    if (interrupt === "immediate") {
      const batchedUpdates = builders.slice(0, i + 1).map((b) => b.update);
      const remaining = builders.slice(i + 1);
      builder.update = () => {
        batchedUpdates.forEach((update) => update());
      };
      builders = [builder, ...remaining];
      break;
    }
  }
  if (!current || ((_a2 = builders[0]) == null ? void 0 : _a2.options.interrupt) === "immediate") {
    next();
  }
}
function addToQueue(builder) {
  builders.push(builder);
  microtask.render(processQueue);
}
class ViewTransitionBuilder {
  constructor(update, options = {}) {
    this.currentSubject = "root";
    this.targets = /* @__PURE__ */ new Map();
    this.notifyReady = noop;
    this.readyPromise = new Promise((resolve) => {
      this.notifyReady = resolve;
    });
    this.update = update;
    this.options = {
      interrupt: "wait",
      ...options
    };
    addToQueue(this);
  }
  get(subject) {
    this.currentSubject = subject;
    return this;
  }
  layout(keyframes2, options) {
    this.updateTarget("layout", keyframes2, options);
    return this;
  }
  new(keyframes2, options) {
    this.updateTarget("new", keyframes2, options);
    return this;
  }
  old(keyframes2, options) {
    this.updateTarget("old", keyframes2, options);
    return this;
  }
  enter(keyframes2, options) {
    this.updateTarget("enter", keyframes2, options);
    return this;
  }
  exit(keyframes2, options) {
    this.updateTarget("exit", keyframes2, options);
    return this;
  }
  crossfade(options) {
    this.updateTarget("enter", { opacity: 1 }, options);
    this.updateTarget("exit", { opacity: 0 }, options);
    return this;
  }
  updateTarget(target, keyframes2, options = {}) {
    const { currentSubject, targets } = this;
    if (!targets.has(currentSubject)) {
      targets.set(currentSubject, {});
    }
    const targetData = targets.get(currentSubject);
    targetData[target] = { keyframes: keyframes2, options };
  }
  then(resolve, reject) {
    return this.readyPromise.then(resolve, reject);
  }
}
function animateView(update, defaultOptions = {}) {
  return new ViewTransitionBuilder(update, defaultOptions);
}
const sync = frame;
const cancelSync = stepsOrder.reduce((acc, key) => {
  acc[key] = (process2) => cancelFrame(process2);
  return acc;
}, {});
function isDOMKeyframes(keyframes2) {
  return typeof keyframes2 === "object" && !Array.isArray(keyframes2);
}
function resolveSubjects(subject, keyframes2, scope, selectorCache) {
  if (typeof subject === "string" && isDOMKeyframes(keyframes2)) {
    return resolveElements(subject, scope, selectorCache);
  } else if (subject instanceof NodeList) {
    return Array.from(subject);
  } else if (Array.isArray(subject)) {
    return subject;
  } else {
    return [subject];
  }
}
function calculateRepeatDuration(duration, repeat, _repeatDelay) {
  return duration * (repeat + 1);
}
function calcNextTime(current2, next2, prev, labels) {
  if (typeof next2 === "number") {
    return next2;
  } else if (next2.startsWith("-") || next2.startsWith("+")) {
    return Math.max(0, current2 + parseFloat(next2));
  } else if (next2 === "<") {
    return prev;
  } else if (next2.startsWith("<")) {
    return Math.max(0, prev + parseFloat(next2.slice(1)));
  } else {
    return labels.get(next2) ?? current2;
  }
}
function eraseKeyframes(sequence, startTime, endTime) {
  for (let i = 0; i < sequence.length; i++) {
    const keyframe = sequence[i];
    if (keyframe.at > startTime && keyframe.at < endTime) {
      removeItem(sequence, keyframe);
      i--;
    }
  }
}
function addKeyframes(sequence, keyframes2, easing, offset, startTime, endTime) {
  eraseKeyframes(sequence, startTime, endTime);
  for (let i = 0; i < keyframes2.length; i++) {
    sequence.push({
      value: keyframes2[i],
      at: mixNumber$1(startTime, endTime, offset[i]),
      easing: getEasingForSegment(easing, i)
    });
  }
}
function normalizeTimes(times, repeat) {
  for (let i = 0; i < times.length; i++) {
    times[i] = times[i] / (repeat + 1);
  }
}
function compareByTime(a, b) {
  if (a.at === b.at) {
    if (a.value === null)
      return 1;
    if (b.value === null)
      return -1;
    return 0;
  } else {
    return a.at - b.at;
  }
}
const defaultSegmentEasing = "easeInOut";
const MAX_REPEAT = 20;
function createAnimationsFromSequence(sequence, { defaultTransition = {}, ...sequenceTransition } = {}, scope, generators) {
  const defaultDuration = defaultTransition.duration || 0.3;
  const animationDefinitions = /* @__PURE__ */ new Map();
  const sequences = /* @__PURE__ */ new Map();
  const elementCache = {};
  const timeLabels = /* @__PURE__ */ new Map();
  let prevTime = 0;
  let currentTime = 0;
  let totalDuration = 0;
  for (let i = 0; i < sequence.length; i++) {
    const segment = sequence[i];
    if (typeof segment === "string") {
      timeLabels.set(segment, currentTime);
      continue;
    } else if (!Array.isArray(segment)) {
      timeLabels.set(segment.name, calcNextTime(currentTime, segment.at, prevTime, timeLabels));
      continue;
    }
    let [subject, keyframes2, transition = {}] = segment;
    if (transition.at !== void 0) {
      currentTime = calcNextTime(currentTime, transition.at, prevTime, timeLabels);
    }
    let maxDuration = 0;
    const resolveValueSequence = (valueKeyframes, valueTransition, valueSequence, elementIndex = 0, numSubjects = 0) => {
      const valueKeyframesAsList = keyframesAsList(valueKeyframes);
      const { delay: delay2 = 0, times = defaultOffset$1(valueKeyframesAsList), type = "keyframes", repeat, repeatType, repeatDelay = 0, ...remainingTransition } = valueTransition;
      let { ease: ease2 = defaultTransition.ease || "easeOut", duration } = valueTransition;
      const calculatedDelay = typeof delay2 === "function" ? delay2(elementIndex, numSubjects) : delay2;
      const numKeyframes = valueKeyframesAsList.length;
      const createGenerator = isGenerator(type) ? type : generators == null ? void 0 : generators[type || "keyframes"];
      if (numKeyframes <= 2 && createGenerator) {
        let absoluteDelta = 100;
        if (numKeyframes === 2 && isNumberKeyframesArray(valueKeyframesAsList)) {
          const delta = valueKeyframesAsList[1] - valueKeyframesAsList[0];
          absoluteDelta = Math.abs(delta);
        }
        const springTransition = { ...remainingTransition };
        if (duration !== void 0) {
          springTransition.duration = /* @__PURE__ */ secondsToMilliseconds(duration);
        }
        const springEasing = createGeneratorEasing(springTransition, absoluteDelta, createGenerator);
        ease2 = springEasing.ease;
        duration = springEasing.duration;
      }
      duration ?? (duration = defaultDuration);
      const startTime = currentTime + calculatedDelay;
      if (times.length === 1 && times[0] === 0) {
        times[1] = 1;
      }
      const remainder = times.length - valueKeyframesAsList.length;
      remainder > 0 && fillOffset(times, remainder);
      valueKeyframesAsList.length === 1 && valueKeyframesAsList.unshift(null);
      if (repeat) {
        exports.invariant(repeat < MAX_REPEAT, "Repeat count too high, must be less than 20", "repeat-count-high");
        duration = calculateRepeatDuration(duration, repeat);
        const originalKeyframes = [...valueKeyframesAsList];
        const originalTimes = [...times];
        ease2 = Array.isArray(ease2) ? [...ease2] : [ease2];
        const originalEase = [...ease2];
        for (let repeatIndex = 0; repeatIndex < repeat; repeatIndex++) {
          valueKeyframesAsList.push(...originalKeyframes);
          for (let keyframeIndex = 0; keyframeIndex < originalKeyframes.length; keyframeIndex++) {
            times.push(originalTimes[keyframeIndex] + (repeatIndex + 1));
            ease2.push(keyframeIndex === 0 ? "linear" : getEasingForSegment(originalEase, keyframeIndex - 1));
          }
        }
        normalizeTimes(times, repeat);
      }
      const targetTime = startTime + duration;
      addKeyframes(valueSequence, valueKeyframesAsList, ease2, times, startTime, targetTime);
      maxDuration = Math.max(calculatedDelay + duration, maxDuration);
      totalDuration = Math.max(targetTime, totalDuration);
    };
    if (isMotionValue(subject)) {
      const subjectSequence = getSubjectSequence(subject, sequences);
      resolveValueSequence(keyframes2, transition, getValueSequence("default", subjectSequence));
    } else {
      const subjects = resolveSubjects(subject, keyframes2, scope, elementCache);
      const numSubjects = subjects.length;
      for (let subjectIndex = 0; subjectIndex < numSubjects; subjectIndex++) {
        keyframes2 = keyframes2;
        transition = transition;
        const thisSubject = subjects[subjectIndex];
        const subjectSequence = getSubjectSequence(thisSubject, sequences);
        for (const key in keyframes2) {
          resolveValueSequence(keyframes2[key], getValueTransition(transition, key), getValueSequence(key, subjectSequence), subjectIndex, numSubjects);
        }
      }
    }
    prevTime = currentTime;
    currentTime += maxDuration;
  }
  sequences.forEach((valueSequences, element) => {
    for (const key in valueSequences) {
      const valueSequence = valueSequences[key];
      valueSequence.sort(compareByTime);
      const keyframes2 = [];
      const valueOffset = [];
      const valueEasing = [];
      for (let i = 0; i < valueSequence.length; i++) {
        const { at, value, easing } = valueSequence[i];
        keyframes2.push(value);
        valueOffset.push(/* @__PURE__ */ progress(0, totalDuration, at));
        valueEasing.push(easing || "easeOut");
      }
      if (valueOffset[0] !== 0) {
        valueOffset.unshift(0);
        keyframes2.unshift(keyframes2[0]);
        valueEasing.unshift(defaultSegmentEasing);
      }
      if (valueOffset[valueOffset.length - 1] !== 1) {
        valueOffset.push(1);
        keyframes2.push(null);
      }
      if (!animationDefinitions.has(element)) {
        animationDefinitions.set(element, {
          keyframes: {},
          transition: {}
        });
      }
      const definition = animationDefinitions.get(element);
      definition.keyframes[key] = keyframes2;
      definition.transition[key] = {
        ...defaultTransition,
        duration: totalDuration,
        ease: valueEasing,
        times: valueOffset,
        ...sequenceTransition
      };
    }
  });
  return animationDefinitions;
}
function getSubjectSequence(subject, sequences) {
  !sequences.has(subject) && sequences.set(subject, {});
  return sequences.get(subject);
}
function getValueSequence(name, sequences) {
  if (!sequences[name])
    sequences[name] = [];
  return sequences[name];
}
function keyframesAsList(keyframes2) {
  return Array.isArray(keyframes2) ? keyframes2 : [keyframes2];
}
function getValueTransition(transition, key) {
  return transition && transition[key] ? {
    ...transition,
    ...transition[key]
  } : { ...transition };
}
const isNumber$1 = (keyframe) => typeof keyframe === "number";
const isNumberKeyframesArray = (keyframes2) => keyframes2.every(isNumber$1);
const visualElementStore = /* @__PURE__ */ new WeakMap();
const isKeyframesTarget = (v) => {
  return Array.isArray(v);
};
function getValueState(visualElement) {
  const state = [{}, {}];
  visualElement == null ? void 0 : visualElement.values.forEach((value, key) => {
    state[0][key] = value.get();
    state[1][key] = value.getVelocity();
  });
  return state;
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
  if (typeof definition === "function") {
    const [current2, velocity] = getValueState(visualElement);
    definition = definition(custom !== void 0 ? custom : props.custom, current2, velocity);
  }
  if (typeof definition === "string") {
    definition = props.variants && props.variants[definition];
  }
  if (typeof definition === "function") {
    const [current2, velocity] = getValueState(visualElement);
    definition = definition(custom !== void 0 ? custom : props.custom, current2, velocity);
  }
  return definition;
}
function resolveVariant$1(visualElement, definition, custom) {
  const props = visualElement.getProps();
  return resolveVariantFromProps(props, definition, props.custom, visualElement);
}
function setMotionValue(visualElement, key, value) {
  if (visualElement.hasValue(key)) {
    visualElement.getValue(key).set(value);
  } else {
    visualElement.addValue(key, motionValue(value));
  }
}
function resolveFinalValueInKeyframes(v) {
  return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
}
function setTarget(visualElement, definition) {
  const resolved = resolveVariant$1(visualElement, definition);
  let { transitionEnd = {}, transition = {}, ...target } = resolved || {};
  target = { ...target, ...transitionEnd };
  for (const key in target) {
    const value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement, key, value);
  }
}
function isWillChangeMotionValue$1(value) {
  return Boolean(isMotionValue(value) && value.add);
}
function addValueToWillChange$1(visualElement, key) {
  const willChange = visualElement.getValue("willChange");
  if (isWillChangeMotionValue$1(willChange)) {
    return willChange.add(key);
  } else if (!willChange && MotionGlobalConfig.WillChange) {
    const newWillChange = new MotionGlobalConfig.WillChange("auto");
    visualElement.addValue("willChange", newWillChange);
    newWillChange.add(key);
  }
}
const camelToDash = (str) => str.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase();
const optimizedAppearDataId = "framerAppearId";
const optimizedAppearDataAttribute = "data-" + camelToDash(optimizedAppearDataId);
function getOptimisedAppearId(visualElement) {
  return visualElement.props[optimizedAppearDataAttribute];
}
const isNotNull = (value) => value !== null;
function getFinalKeyframe(keyframes2, { repeat, repeatType = "loop" }, finalKeyframe) {
  const resolvedKeyframes = keyframes2.filter(isNotNull);
  const index = repeat && repeatType !== "loop" && repeat % 2 === 1 ? 0 : resolvedKeyframes.length - 1;
  return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
}
const underDampedSpring = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
};
const criticallyDampedSpring = (target) => ({
  type: "spring",
  stiffness: 550,
  damping: target === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
});
const keyframesTransition = {
  type: "keyframes",
  duration: 0.8
};
const ease = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
};
const getDefaultTransition = (valueKey, { keyframes: keyframes2 }) => {
  if (keyframes2.length > 2) {
    return keyframesTransition;
  } else if (transformProps.has(valueKey)) {
    return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes2[1]) : underDampedSpring;
  }
  return ease;
};
function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, elapsed, ...transition }) {
  return !!Object.keys(transition).length;
}
const animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
  const valueTransition = getValueTransition$1(transition, name) || {};
  const delay2 = valueTransition.delay || transition.delay || 0;
  let { elapsed = 0 } = transition;
  elapsed = elapsed - /* @__PURE__ */ secondsToMilliseconds(delay2);
  const options = {
    keyframes: Array.isArray(target) ? target : [null, target],
    ease: "easeOut",
    velocity: value.getVelocity(),
    ...valueTransition,
    delay: -elapsed,
    onUpdate: (v) => {
      value.set(v);
      valueTransition.onUpdate && valueTransition.onUpdate(v);
    },
    onComplete: () => {
      onComplete();
      valueTransition.onComplete && valueTransition.onComplete();
    },
    name,
    motionValue: value,
    element: isHandoff ? void 0 : element
  };
  if (!isTransitionDefined(valueTransition)) {
    Object.assign(options, getDefaultTransition(name, options));
  }
  options.duration && (options.duration = /* @__PURE__ */ secondsToMilliseconds(options.duration));
  options.repeatDelay && (options.repeatDelay = /* @__PURE__ */ secondsToMilliseconds(options.repeatDelay));
  if (options.from !== void 0) {
    options.keyframes[0] = options.from;
  }
  let shouldSkip = false;
  if (options.type === false || options.duration === 0 && !options.repeatDelay) {
    makeAnimationInstant(options);
    if (options.delay === 0) {
      shouldSkip = true;
    }
  }
  if (MotionGlobalConfig.instantAnimations || MotionGlobalConfig.skipAnimations) {
    shouldSkip = true;
    makeAnimationInstant(options);
    options.delay = 0;
  }
  options.allowFlatten = !valueTransition.type && !valueTransition.ease;
  if (shouldSkip && !isHandoff && value.get() !== void 0) {
    const finalKeyframe = getFinalKeyframe(options.keyframes, valueTransition);
    if (finalKeyframe !== void 0) {
      frame.update(() => {
        options.onUpdate(finalKeyframe);
        options.onComplete();
      });
      return;
    }
  }
  return valueTransition.isSync ? new JSAnimation(options) : new AsyncMotionValueAnimation(options);
};
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
  const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}
function animateTarget(visualElement, targetAndTransition, { delay: delay2 = 0, transitionOverride, type } = {}) {
  let { transition = visualElement.getDefaultTransition(), transitionEnd, ...target } = targetAndTransition;
  if (transitionOverride)
    transition = transitionOverride;
  const animations = [];
  const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
  for (const key in target) {
    const value = visualElement.getValue(key, visualElement.latestValues[key] ?? null);
    const valueTarget = target[key];
    if (valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    const valueTransition = {
      delay: delay2,
      ...getValueTransition$1(transition || {}, key)
    };
    const currentValue = value.get();
    if (currentValue !== void 0 && !value.isAnimating && !Array.isArray(valueTarget) && valueTarget === currentValue && !valueTransition.velocity) {
      continue;
    }
    let isHandoff = false;
    if (window.MotionHandoffAnimation) {
      const appearId = getOptimisedAppearId(visualElement);
      if (appearId) {
        const startTime = window.MotionHandoffAnimation(appearId, key, frame);
        if (startTime !== null) {
          valueTransition.startTime = startTime;
          isHandoff = true;
        }
      }
    }
    addValueToWillChange$1(visualElement, key);
    value.start(animateMotionValue(key, value, valueTarget, visualElement.shouldReduceMotion && positionalKeys.has(key) ? { type: false } : valueTransition, visualElement, isHandoff));
    const animation = value.animation;
    if (animation) {
      animations.push(animation);
    }
  }
  if (transitionEnd) {
    Promise.all(animations).then(() => {
      frame.update(() => {
        transitionEnd && setTarget(visualElement, transitionEnd);
      });
    });
  }
  return animations;
}
function convertBoundingBoxToBox$1({ top, left, right, bottom }) {
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
function transformBoxPoints$1(point2, transformPoint2) {
  if (!transformPoint2)
    return point2;
  const topLeft = transformPoint2({ x: point2.left, y: point2.top });
  const bottomRight = transformPoint2({ x: point2.right, y: point2.bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}
function isIdentityScale(scale2) {
  return scale2 === void 0 || scale2 === 1;
}
function hasScale({ scale: scale2, scaleX: scaleX2, scaleY: scaleY2 }) {
  return !isIdentityScale(scale2) || !isIdentityScale(scaleX2) || !isIdentityScale(scaleY2);
}
function hasTransform(values) {
  return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY || values.skewX || values.skewY;
}
function has2DTranslate(values) {
  return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
  return value && value !== "0%";
}
function scalePoint(point2, scale2, originPoint) {
  const distanceFromOrigin = point2 - originPoint;
  const scaled = scale2 * distanceFromOrigin;
  return originPoint + scaled;
}
function applyPointDelta(point2, translate, scale2, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point2 = scalePoint(point2, boxScale, originPoint);
  }
  return scalePoint(point2, scale2, originPoint) + translate;
}
function applyAxisDelta(axis, translate = 0, scale2 = 1, originPoint, boxScale) {
  axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function applyBoxDelta(box, { x, y }) {
  applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
  applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
const TREE_SCALE_SNAP_MIN = 0.999999999999;
const TREE_SCALE_SNAP_MAX = 1.0000000000001;
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
  const treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  let node;
  let delta;
  for (let i = 0; i < treeLength; i++) {
    node = treePath[i];
    delta = node.projectionDelta;
    const { visualElement } = node.options;
    if (visualElement && visualElement.props.style && visualElement.props.style.display === "contents") {
      continue;
    }
    if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
      transformBox(box, {
        x: -node.scroll.offset.x,
        y: -node.scroll.offset.y
      });
    }
    if (delta) {
      treeScale.x *= delta.x.scale;
      treeScale.y *= delta.y.scale;
      applyBoxDelta(box, delta);
    }
    if (isSharedTransition && hasTransform(node.latestValues)) {
      transformBox(box, node.latestValues);
    }
  }
  if (treeScale.x < TREE_SCALE_SNAP_MAX && treeScale.x > TREE_SCALE_SNAP_MIN) {
    treeScale.x = 1;
  }
  if (treeScale.y < TREE_SCALE_SNAP_MAX && treeScale.y > TREE_SCALE_SNAP_MIN) {
    treeScale.y = 1;
  }
}
function translateAxis$1(axis, distance2) {
  axis.min = axis.min + distance2;
  axis.max = axis.max + distance2;
}
function transformAxis(axis, axisTranslate, axisScale, boxScale, axisOrigin = 0.5) {
  const originPoint = mixNumber$1(axis.min, axis.max, axisOrigin);
  applyAxisDelta(axis, axisTranslate, axisScale, originPoint, boxScale);
}
function transformBox(box, transform2) {
  transformAxis(box.x, transform2.x, transform2.scaleX, transform2.scale, transform2.originX);
  transformAxis(box.y, transform2.y, transform2.scaleY, transform2.scale, transform2.originY);
}
function measureViewportBox$1(instance, transformPoint2) {
  return convertBoundingBoxToBox$1(transformBoxPoints$1(instance.getBoundingClientRect(), transformPoint2));
}
const featureProps = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
const featureDefinitions = {};
for (const key in featureProps) {
  featureDefinitions[key] = {
    isEnabled: (props) => featureProps[key].some((name) => !!props[name])
  };
}
const createAxisDelta = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
});
const createDelta = () => ({
  x: createAxisDelta(),
  y: createAxisDelta()
});
const createAxis$1 = () => ({ min: 0, max: 0 });
const createBox$1 = () => ({
  x: createAxis$1(),
  y: createAxis$1()
});
const isBrowser = typeof window !== "undefined";
const prefersReducedMotion = { current: null };
const hasReducedMotionListener = { current: false };
function initPrefersReducedMotion() {
  hasReducedMotionListener.current = true;
  if (!isBrowser)
    return;
  if (window.matchMedia) {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
    const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
    motionMediaQuery.addEventListener("change", setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    prefersReducedMotion.current = false;
  }
}
function isAnimationControls$1(v) {
  return v !== null && typeof v === "object" && typeof v.start === "function";
}
function isVariantLabel(v) {
  return typeof v === "string" || Array.isArray(v);
}
const variantPriorityOrder = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
];
const variantProps = ["initial", ...variantPriorityOrder];
function isControllingVariants(props) {
  return isAnimationControls$1(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
}
function isVariantNode(props) {
  return Boolean(isControllingVariants(props) || props.variants);
}
function updateMotionValuesFromProps(element, next2, prev) {
  for (const key in next2) {
    const nextValue = next2[key];
    const prevValue = prev[key];
    if (isMotionValue(nextValue)) {
      element.addValue(key, nextValue);
    } else if (isMotionValue(prevValue)) {
      element.addValue(key, motionValue(nextValue, { owner: element }));
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        const existingValue = element.getValue(key);
        if (existingValue.liveStyle === true) {
          existingValue.jump(nextValue);
        } else if (!existingValue.hasAnimated) {
          existingValue.set(nextValue);
        }
      } else {
        const latestValue = element.getStaticValue(key);
        element.addValue(key, motionValue(latestValue !== void 0 ? latestValue : nextValue, { owner: element }));
      }
    }
  }
  for (const key in prev) {
    if (next2[key] === void 0)
      element.removeValue(key);
  }
  return next2;
}
const propEventHandlers = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class VisualElement {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
    return {};
  }
  constructor({ parent, props, presenceContext, reducedMotionConfig, blockInitialAnimation, visualState }, options = {}) {
    this.current = null;
    this.children = /* @__PURE__ */ new Set();
    this.isVariantNode = false;
    this.isControllingVariants = false;
    this.shouldReduceMotion = null;
    this.values = /* @__PURE__ */ new Map();
    this.KeyframeResolver = KeyframeResolver;
    this.features = {};
    this.valueSubscriptions = /* @__PURE__ */ new Map();
    this.prevMotionValues = {};
    this.events = {};
    this.propEventSubscriptions = {};
    this.notifyUpdate = () => this.notify("Update", this.latestValues);
    this.render = () => {
      if (!this.current)
        return;
      this.triggerBuild();
      this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
    };
    this.renderScheduledAt = 0;
    this.scheduleRender = () => {
      const now2 = time.now();
      if (this.renderScheduledAt < now2) {
        this.renderScheduledAt = now2;
        frame.render(this.render, false, true);
      }
    };
    const { latestValues, renderState } = visualState;
    this.latestValues = latestValues;
    this.baseTarget = { ...latestValues };
    this.initialValues = props.initial ? { ...latestValues } : {};
    this.renderState = renderState;
    this.parent = parent;
    this.props = props;
    this.presenceContext = presenceContext;
    this.depth = parent ? parent.depth + 1 : 0;
    this.reducedMotionConfig = reducedMotionConfig;
    this.options = options;
    this.blockInitialAnimation = Boolean(blockInitialAnimation);
    this.isControllingVariants = isControllingVariants(props);
    this.isVariantNode = isVariantNode(props);
    if (this.isVariantNode) {
      this.variantChildren = /* @__PURE__ */ new Set();
    }
    this.manuallyAnimateOnMount = Boolean(parent && parent.current);
    const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
    for (const key in initialMotionValues) {
      const value = initialMotionValues[key];
      if (latestValues[key] !== void 0 && isMotionValue(value)) {
        value.set(latestValues[key]);
      }
    }
  }
  mount(instance) {
    var _a2;
    this.current = instance;
    visualElementStore.set(instance, this);
    if (this.projection && !this.projection.instance) {
      this.projection.mount(instance);
    }
    if (this.parent && this.isVariantNode && !this.isControllingVariants) {
      this.removeFromVariantTree = this.parent.addVariantChild(this);
    }
    this.values.forEach((value, key) => this.bindToMotionValue(key, value));
    if (this.reducedMotionConfig === "never") {
      this.shouldReduceMotion = false;
    } else if (this.reducedMotionConfig === "always") {
      this.shouldReduceMotion = true;
    } else {
      if (!hasReducedMotionListener.current) {
        initPrefersReducedMotion();
      }
      this.shouldReduceMotion = prefersReducedMotion.current;
    }
    if (process.env.NODE_ENV !== "production") {
      warnOnce(this.shouldReduceMotion !== true, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled");
    }
    (_a2 = this.parent) == null ? void 0 : _a2.addChild(this);
    this.update(this.props, this.presenceContext);
  }
  unmount() {
    var _a2;
    this.projection && this.projection.unmount();
    cancelFrame(this.notifyUpdate);
    cancelFrame(this.render);
    this.valueSubscriptions.forEach((remove) => remove());
    this.valueSubscriptions.clear();
    this.removeFromVariantTree && this.removeFromVariantTree();
    (_a2 = this.parent) == null ? void 0 : _a2.removeChild(this);
    for (const key in this.events) {
      this.events[key].clear();
    }
    for (const key in this.features) {
      const feature = this.features[key];
      if (feature) {
        feature.unmount();
        feature.isMounted = false;
      }
    }
    this.current = null;
  }
  addChild(child) {
    this.children.add(child);
    this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set());
    this.enteringChildren.add(child);
  }
  removeChild(child) {
    this.children.delete(child);
    this.enteringChildren && this.enteringChildren.delete(child);
  }
  bindToMotionValue(key, value) {
    if (this.valueSubscriptions.has(key)) {
      this.valueSubscriptions.get(key)();
    }
    const valueIsTransform = transformProps.has(key);
    if (valueIsTransform && this.onBindTransform) {
      this.onBindTransform();
    }
    const removeOnChange = value.on("change", (latestValue) => {
      this.latestValues[key] = latestValue;
      this.props.onUpdate && frame.preRender(this.notifyUpdate);
      if (valueIsTransform && this.projection) {
        this.projection.isTransformDirty = true;
      }
      this.scheduleRender();
    });
    let removeSyncCheck;
    if (window.MotionCheckAppearSync) {
      removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
    }
    this.valueSubscriptions.set(key, () => {
      removeOnChange();
      if (removeSyncCheck)
        removeSyncCheck();
      if (value.owner)
        value.stop();
    });
  }
  sortNodePosition(other) {
    if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
      return 0;
    }
    return this.sortInstanceNodePosition(this.current, other.current);
  }
  updateFeatures() {
    let key = "animation";
    for (key in featureDefinitions) {
      const featureDefinition = featureDefinitions[key];
      if (!featureDefinition)
        continue;
      const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
      if (!this.features[key] && FeatureConstructor && isEnabled(this.props)) {
        this.features[key] = new FeatureConstructor(this);
      }
      if (this.features[key]) {
        const feature = this.features[key];
        if (feature.isMounted) {
          feature.update();
        } else {
          feature.mount();
          feature.isMounted = true;
        }
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox$1();
  }
  getStaticValue(key) {
    return this.latestValues[key];
  }
  setStaticValue(key, value) {
    this.latestValues[key] = value;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(props, presenceContext) {
    if (props.transformTemplate || this.props.transformTemplate) {
      this.scheduleRender();
    }
    this.prevProps = this.props;
    this.props = props;
    this.prevPresenceContext = this.presenceContext;
    this.presenceContext = presenceContext;
    for (let i = 0; i < propEventHandlers.length; i++) {
      const key = propEventHandlers[i];
      if (this.propEventSubscriptions[key]) {
        this.propEventSubscriptions[key]();
        delete this.propEventSubscriptions[key];
      }
      const listenerName = "on" + key;
      const listener = props[listenerName];
      if (listener) {
        this.propEventSubscriptions[key] = this.on(key, listener);
      }
    }
    this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props, this.prevProps, this), this.prevMotionValues);
    if (this.handleChildMotionValue) {
      this.handleChildMotionValue();
    }
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(name) {
    return this.props.variants ? this.props.variants[name] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(child) {
    const closestVariantNode = this.getClosestVariantNode();
    if (closestVariantNode) {
      closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
      return () => closestVariantNode.variantChildren.delete(child);
    }
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(key, value) {
    const existingValue = this.values.get(key);
    if (value !== existingValue) {
      if (existingValue)
        this.removeValue(key);
      this.bindToMotionValue(key, value);
      this.values.set(key, value);
      this.latestValues[key] = value.get();
    }
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(key) {
    this.values.delete(key);
    const unsubscribe = this.valueSubscriptions.get(key);
    if (unsubscribe) {
      unsubscribe();
      this.valueSubscriptions.delete(key);
    }
    delete this.latestValues[key];
    this.removeValueFromRenderState(key, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(key) {
    return this.values.has(key);
  }
  getValue(key, defaultValue) {
    if (this.props.values && this.props.values[key]) {
      return this.props.values[key];
    }
    let value = this.values.get(key);
    if (value === void 0 && defaultValue !== void 0) {
      value = motionValue(defaultValue === null ? void 0 : defaultValue, { owner: this });
      this.addValue(key, value);
    }
    return value;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(key, target) {
    let value = this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : this.getBaseTargetFromProps(this.props, key) ?? this.readValueFromInstance(this.current, key, this.options);
    if (value !== void 0 && value !== null) {
      if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
        value = parseFloat(value);
      } else if (!findValueType(value) && complex.test(target)) {
        value = getAnimatableNone(key, target);
      }
      this.setBaseTarget(key, isMotionValue(value) ? value.get() : value);
    }
    return isMotionValue(value) ? value.get() : value;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(key, value) {
    this.baseTarget[key] = value;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(key) {
    var _a2;
    const { initial } = this.props;
    let valueFromInitial;
    if (typeof initial === "string" || typeof initial === "object") {
      const variant = resolveVariantFromProps(this.props, initial, (_a2 = this.presenceContext) == null ? void 0 : _a2.custom);
      if (variant) {
        valueFromInitial = variant[key];
      }
    }
    if (initial && valueFromInitial !== void 0) {
      return valueFromInitial;
    }
    const target = this.getBaseTargetFromProps(this.props, key);
    if (target !== void 0 && !isMotionValue(target))
      return target;
    return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    return this.events[eventName].add(callback);
  }
  notify(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].notify(...args);
    }
  }
  scheduleRenderMicrotask() {
    microtask.render(this.render);
  }
}
class DOMVisualElement extends VisualElement {
  constructor() {
    super(...arguments);
    this.KeyframeResolver = DOMKeyframesResolver;
  }
  sortInstanceNodePosition(a, b) {
    return a.compareDocumentPosition(b) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(props, key) {
    return props.style ? props.style[key] : void 0;
  }
  removeValueFromRenderState(key, { vars, style: style2 }) {
    delete vars[key];
    delete style2[key];
  }
  handleChildMotionValue() {
    if (this.childSubscription) {
      this.childSubscription();
      delete this.childSubscription;
    }
    const { children } = this.props;
    if (isMotionValue(children)) {
      this.childSubscription = children.on("change", (latest) => {
        if (this.current) {
          this.current.textContent = `${latest}`;
        }
      });
    }
  }
}
const translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
const numTransforms = transformPropOrder.length;
function buildTransform(latestValues, transform2, transformTemplate) {
  let transformString = "";
  let transformIsDefault = true;
  for (let i = 0; i < numTransforms; i++) {
    const key = transformPropOrder[i];
    const value = latestValues[key];
    if (value === void 0)
      continue;
    let valueIsDefault = true;
    if (typeof value === "number") {
      valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
    } else {
      valueIsDefault = parseFloat(value) === 0;
    }
    if (!valueIsDefault || transformTemplate) {
      const valueAsType = getValueAsType(value, numberValueTypes[key]);
      if (!valueIsDefault) {
        transformIsDefault = false;
        const transformName = translateAlias[key] || key;
        transformString += `${transformName}(${valueAsType}) `;
      }
      if (transformTemplate) {
        transform2[key] = valueAsType;
      }
    }
  }
  transformString = transformString.trim();
  if (transformTemplate) {
    transformString = transformTemplate(transform2, transformIsDefault ? "" : transformString);
  } else if (transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}
function buildHTMLStyles(state, latestValues, transformTemplate) {
  const { style: style2, vars, transformOrigin } = state;
  let hasTransform2 = false;
  let hasTransformOrigin = false;
  for (const key in latestValues) {
    const value = latestValues[key];
    if (transformProps.has(key)) {
      hasTransform2 = true;
      continue;
    } else if (isCSSVariableName(key)) {
      vars[key] = value;
      continue;
    } else {
      const valueAsType = getValueAsType(value, numberValueTypes[key]);
      if (key.startsWith("origin")) {
        hasTransformOrigin = true;
        transformOrigin[key] = valueAsType;
      } else {
        style2[key] = valueAsType;
      }
    }
  }
  if (!latestValues.transform) {
    if (hasTransform2 || transformTemplate) {
      style2.transform = buildTransform(latestValues, state.transform, transformTemplate);
    } else if (style2.transform) {
      style2.transform = "none";
    }
  }
  if (hasTransformOrigin) {
    const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
    style2.transformOrigin = `${originX} ${originY} ${originZ}`;
  }
}
function renderHTML(element, { style: style2, vars }, styleProp, projection) {
  const elementStyle = element.style;
  let key;
  for (key in style2) {
    elementStyle[key] = style2[key];
  }
  projection == null ? void 0 : projection.applyProjectionStyles(elementStyle, styleProp);
  for (key in vars) {
    elementStyle.setProperty(key, vars[key]);
  }
}
function pixelsToPercent(pixels, axis) {
  if (axis.max === axis.min)
    return 0;
  return pixels / (axis.max - axis.min) * 100;
}
const correctBorderRadius = {
  correct: (latest, node) => {
    if (!node.target)
      return latest;
    if (typeof latest === "string") {
      if (px.test(latest)) {
        latest = parseFloat(latest);
      } else {
        return latest;
      }
    }
    const x = pixelsToPercent(latest, node.target.x);
    const y = pixelsToPercent(latest, node.target.y);
    return `${x}% ${y}%`;
  }
};
const correctBoxShadow = {
  correct: (latest, { treeScale, projectionDelta }) => {
    const original = latest;
    const shadow = complex.parse(latest);
    if (shadow.length > 5)
      return original;
    const template = complex.createTransformer(latest);
    const offset = typeof shadow[0] !== "number" ? 1 : 0;
    const xScale = projectionDelta.x.scale * treeScale.x;
    const yScale = projectionDelta.y.scale * treeScale.y;
    shadow[0 + offset] /= xScale;
    shadow[1 + offset] /= yScale;
    const averageScale = mixNumber$1(xScale, yScale, 0.5);
    if (typeof shadow[2 + offset] === "number")
      shadow[2 + offset] /= averageScale;
    if (typeof shadow[3 + offset] === "number")
      shadow[3 + offset] /= averageScale;
    return template(shadow);
  }
};
const scaleCorrectors = {
  borderRadius: {
    ...correctBorderRadius,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow
};
function addScaleCorrector(correctors) {
  for (const key in correctors) {
    scaleCorrectors[key] = correctors[key];
    if (isCSSVariableName(key)) {
      scaleCorrectors[key].isCSSVariable = true;
    }
  }
}
function isForcedMotionValue(key, { layout, layoutId }) {
  return transformProps.has(key) || key.startsWith("origin") || (layout || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}
function scrapeMotionValuesFromProps$1(props, prevProps, visualElement) {
  var _a2;
  const { style: style2 } = props;
  const newValues = {};
  for (const key in style2) {
    if (isMotionValue(style2[key]) || prevProps.style && isMotionValue(prevProps.style[key]) || isForcedMotionValue(key, props) || ((_a2 = visualElement == null ? void 0 : visualElement.getValue(key)) == null ? void 0 : _a2.liveStyle) !== void 0) {
      newValues[key] = style2[key];
    }
  }
  return newValues;
}
function getComputedStyle$1(element) {
  return window.getComputedStyle(element);
}
class HTMLVisualElement extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "html";
    this.renderInstance = renderHTML;
  }
  readValueFromInstance(instance, key) {
    var _a2;
    if (transformProps.has(key)) {
      return ((_a2 = this.projection) == null ? void 0 : _a2.isProjecting) ? defaultTransformValue(key) : readTransformValue(instance, key);
    } else {
      const computedStyle = getComputedStyle$1(instance);
      const value = (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
      return typeof value === "string" ? value.trim() : value;
    }
  }
  measureInstanceViewportBox(instance, { transformPagePoint }) {
    return measureViewportBox$1(instance, transformPagePoint);
  }
  build(renderState, latestValues, props) {
    buildHTMLStyles(renderState, latestValues, props.transformTemplate);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps$1(props, prevProps, visualElement);
  }
}
function isObjectKey(key, object) {
  return key in object;
}
class ObjectVisualElement extends VisualElement {
  constructor() {
    super(...arguments);
    this.type = "object";
  }
  readValueFromInstance(instance, key) {
    if (isObjectKey(key, instance)) {
      const value = instance[key];
      if (typeof value === "string" || typeof value === "number") {
        return value;
      }
    }
    return void 0;
  }
  getBaseTargetFromProps() {
    return void 0;
  }
  removeValueFromRenderState(key, renderState) {
    delete renderState.output[key];
  }
  measureInstanceViewportBox() {
    return createBox$1();
  }
  build(renderState, latestValues) {
    Object.assign(renderState.output, latestValues);
  }
  renderInstance(instance, { output }) {
    Object.assign(instance, output);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
const dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
const camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath$1(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
  attrs.pathLength = 1;
  const keys2 = useDashCase ? dashKeys : camelKeys;
  attrs[keys2.offset] = px.transform(-offset);
  const pathLength = px.transform(length);
  const pathSpacing = px.transform(spacing);
  attrs[keys2.array] = `${pathLength} ${pathSpacing}`;
}
const cssMotionPathProperties = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function buildSVGAttrs(state, {
  attrX,
  attrY,
  attrScale,
  pathLength,
  pathSpacing = 1,
  pathOffset = 0,
  // This is object creation, which we try to avoid per-frame.
  ...latest
}, isSVGTag2, transformTemplate, styleProp) {
  buildHTMLStyles(state, latest, transformTemplate);
  if (isSVGTag2) {
    if (state.style.viewBox) {
      state.attrs.viewBox = state.style.viewBox;
    }
    return;
  }
  state.attrs = state.style;
  state.style = {};
  const { attrs, style: style2 } = state;
  if (attrs.transform) {
    style2.transform = attrs.transform;
    delete attrs.transform;
  }
  if (style2.transform || attrs.transformOrigin) {
    style2.transformOrigin = attrs.transformOrigin ?? "50% 50%";
    delete attrs.transformOrigin;
  }
  if (style2.transform) {
    style2.transformBox = (styleProp == null ? void 0 : styleProp.transformBox) ?? "fill-box";
    delete attrs.transformBox;
  }
  for (const key of cssMotionPathProperties) {
    if (attrs[key] !== void 0) {
      style2[key] = attrs[key];
      delete attrs[key];
    }
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (attrScale !== void 0)
    attrs.scale = attrScale;
  if (pathLength !== void 0) {
    buildSVGPath$1(attrs, pathLength, pathSpacing, pathOffset, false);
  }
}
const camelCaseAttributes = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);
const isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";
function renderSVG(element, renderState, _styleProp, projection) {
  renderHTML(element, renderState, void 0, projection);
  for (const key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
  const newValues = scrapeMotionValuesFromProps$1(props, prevProps, visualElement);
  for (const key in props) {
    if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
      const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}
class SVGVisualElement extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "svg";
    this.isSVGTag = false;
    this.measureInstanceViewportBox = createBox$1;
  }
  getBaseTargetFromProps(props, key) {
    return props[key];
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    }
    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
    return instance.getAttribute(key);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps(props, prevProps, visualElement);
  }
  build(renderState, latestValues, props) {
    buildSVGAttrs(renderState, latestValues, this.isSVGTag, props.transformTemplate, props.style);
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderSVG(instance, renderState, styleProp, projection);
  }
  mount(instance) {
    this.isSVGTag = isSVGTag(instance.tagName);
    super.mount(instance);
  }
}
function createDOMVisualElement(element) {
  const options = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        transform: {},
        transformOrigin: {},
        style: {},
        vars: {},
        attrs: {}
      },
      latestValues: {}
    }
  };
  const node = isSVGElement$1(element) && !isSVGSVGElement(element) ? new SVGVisualElement(options) : new HTMLVisualElement(options);
  node.mount(element);
  visualElementStore.set(element, node);
}
function createObjectVisualElement(subject) {
  const options = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  };
  const node = new ObjectVisualElement(options);
  node.mount(subject);
  visualElementStore.set(subject, node);
}
function animateSingleValue(value, keyframes2, options) {
  const motionValue$1 = isMotionValue(value) ? value : motionValue(value);
  motionValue$1.start(animateMotionValue("", motionValue$1, keyframes2, options));
  return motionValue$1.animation;
}
function isSingleValue(subject, keyframes2) {
  return isMotionValue(subject) || typeof subject === "number" || typeof subject === "string" && !isDOMKeyframes(keyframes2);
}
function animateSubject(subject, keyframes2, options, scope) {
  const animations = [];
  if (isSingleValue(subject, keyframes2)) {
    animations.push(animateSingleValue(subject, isDOMKeyframes(keyframes2) ? keyframes2.default || keyframes2 : keyframes2, options ? options.default || options : options));
  } else {
    const subjects = resolveSubjects(subject, keyframes2, scope);
    const numSubjects = subjects.length;
    exports.invariant(Boolean(numSubjects), "No valid elements provided.", "no-valid-elements");
    for (let i = 0; i < numSubjects; i++) {
      const thisSubject = subjects[i];
      exports.invariant(thisSubject !== null, "You're trying to perform an animation on null. Ensure that selectors are correctly finding elements and refs are correctly hydrated.", "animate-null");
      const createVisualElement2 = thisSubject instanceof Element ? createDOMVisualElement : createObjectVisualElement;
      if (!visualElementStore.has(thisSubject)) {
        createVisualElement2(thisSubject);
      }
      const visualElement = visualElementStore.get(thisSubject);
      const transition = { ...options };
      if ("delay" in transition && typeof transition.delay === "function") {
        transition.delay = transition.delay(i, numSubjects);
      }
      animations.push(...animateTarget(visualElement, { ...keyframes2, transition }, {}));
    }
  }
  return animations;
}
function animateSequence(sequence, options, scope) {
  const animations = [];
  const animationDefinitions = createAnimationsFromSequence(sequence, options, scope, { spring });
  animationDefinitions.forEach(({ keyframes: keyframes2, transition }, subject) => {
    animations.push(...animateSubject(subject, keyframes2, transition));
  });
  return animations;
}
function isSequence(value) {
  return Array.isArray(value) && value.some(Array.isArray);
}
function createScopedAnimate(scope) {
  function scopedAnimate(subjectOrSequence, optionsOrKeyframes, options) {
    let animations = [];
    let animationOnComplete;
    if (isSequence(subjectOrSequence)) {
      animations = animateSequence(subjectOrSequence, optionsOrKeyframes, scope);
    } else {
      const { onComplete, ...rest } = options || {};
      if (typeof onComplete === "function") {
        animationOnComplete = onComplete;
      }
      animations = animateSubject(subjectOrSequence, optionsOrKeyframes, rest, scope);
    }
    const animation = new GroupAnimationWithThen(animations);
    if (animationOnComplete) {
      animation.finished.then(animationOnComplete);
    }
    if (scope) {
      scope.animations.push(animation);
      animation.finished.then(() => {
        removeItem(scope.animations, animation);
      });
    }
    return animation;
  }
  return scopedAnimate;
}
const animate = createScopedAnimate();
function animateElements(elementOrSelector, keyframes2, options, scope) {
  const elements = resolveElements(elementOrSelector, scope);
  const numElements = elements.length;
  exports.invariant(Boolean(numElements), "No valid elements provided.", "no-valid-elements");
  const animationDefinitions = [];
  for (let i = 0; i < numElements; i++) {
    const element = elements[i];
    const elementTransition = { ...options };
    if (typeof elementTransition.delay === "function") {
      elementTransition.delay = elementTransition.delay(i, numElements);
    }
    for (const valueName in keyframes2) {
      let valueKeyframes = keyframes2[valueName];
      if (!Array.isArray(valueKeyframes)) {
        valueKeyframes = [valueKeyframes];
      }
      const valueOptions = {
        ...getValueTransition$1(elementTransition, valueName)
      };
      valueOptions.duration && (valueOptions.duration = /* @__PURE__ */ secondsToMilliseconds(valueOptions.duration));
      valueOptions.delay && (valueOptions.delay = /* @__PURE__ */ secondsToMilliseconds(valueOptions.delay));
      const map = getAnimationMap(element);
      const key = animationMapKey(valueName, valueOptions.pseudoElement || "");
      const currentAnimation = map.get(key);
      currentAnimation && currentAnimation.stop();
      animationDefinitions.push({
        map,
        key,
        unresolvedKeyframes: valueKeyframes,
        options: {
          ...valueOptions,
          element,
          name: valueName,
          allowFlatten: !elementTransition.type && !elementTransition.ease
        }
      });
    }
  }
  for (let i = 0; i < animationDefinitions.length; i++) {
    const { unresolvedKeyframes, options: animationOptions } = animationDefinitions[i];
    const { element, name, pseudoElement } = animationOptions;
    if (!pseudoElement && unresolvedKeyframes[0] === null) {
      unresolvedKeyframes[0] = getComputedStyle$2(element, name);
    }
    fillWildcards(unresolvedKeyframes);
    applyPxDefaults(unresolvedKeyframes, name);
    if (!pseudoElement && unresolvedKeyframes.length < 2) {
      unresolvedKeyframes.unshift(getComputedStyle$2(element, name));
    }
    animationOptions.keyframes = unresolvedKeyframes;
  }
  const animations = [];
  for (let i = 0; i < animationDefinitions.length; i++) {
    const { map, key, options: animationOptions } = animationDefinitions[i];
    const animation = new NativeAnimation(animationOptions);
    map.set(key, animation);
    animation.finished.finally(() => map.delete(key));
    animations.push(animation);
  }
  return animations;
}
const createScopedWaapiAnimate = (scope) => {
  function scopedAnimate(elementOrSelector, keyframes2, options) {
    return new GroupAnimationWithThen(animateElements(elementOrSelector, keyframes2, options, scope));
  }
  return scopedAnimate;
};
const animateMini = /* @__PURE__ */ createScopedWaapiAnimate();
const maxElapsed = 50;
const createAxisInfo = () => ({
  current: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
});
const createScrollInfo = () => ({
  time: 0,
  x: createAxisInfo(),
  y: createAxisInfo()
});
const keys = {
  x: {
    length: "Width",
    position: "Left"
  },
  y: {
    length: "Height",
    position: "Top"
  }
};
function updateAxisInfo(element, axisName, info, time2) {
  const axis = info[axisName];
  const { length, position } = keys[axisName];
  const prev = axis.current;
  const prevTime = info.time;
  axis.current = element[`scroll${position}`];
  axis.scrollLength = element[`scroll${length}`] - element[`client${length}`];
  axis.offset.length = 0;
  axis.offset[0] = 0;
  axis.offset[1] = axis.scrollLength;
  axis.progress = /* @__PURE__ */ progress(0, axis.scrollLength, axis.current);
  const elapsed = time2 - prevTime;
  axis.velocity = elapsed > maxElapsed ? 0 : velocityPerSecond(axis.current - prev, elapsed);
}
function updateScrollInfo(element, info, time2) {
  updateAxisInfo(element, "x", info, time2);
  updateAxisInfo(element, "y", info, time2);
  info.time = time2;
}
function calcInset(element, container) {
  const inset = { x: 0, y: 0 };
  let current2 = element;
  while (current2 && current2 !== container) {
    if (isHTMLElement$1(current2)) {
      inset.x += current2.offsetLeft;
      inset.y += current2.offsetTop;
      current2 = current2.offsetParent;
    } else if (current2.tagName === "svg") {
      const svgBoundingBox = current2.getBoundingClientRect();
      current2 = current2.parentElement;
      const parentBoundingBox = current2.getBoundingClientRect();
      inset.x += svgBoundingBox.left - parentBoundingBox.left;
      inset.y += svgBoundingBox.top - parentBoundingBox.top;
    } else if (current2 instanceof SVGGraphicsElement) {
      const { x, y } = current2.getBBox();
      inset.x += x;
      inset.y += y;
      let svg = null;
      let parent = current2.parentNode;
      while (!svg) {
        if (parent.tagName === "svg") {
          svg = parent;
        }
        parent = current2.parentNode;
      }
      current2 = svg;
    } else {
      break;
    }
  }
  return inset;
}
const namedEdges = {
  start: 0,
  center: 0.5,
  end: 1
};
function resolveEdge(edge, length, inset = 0) {
  let delta = 0;
  if (edge in namedEdges) {
    edge = namedEdges[edge];
  }
  if (typeof edge === "string") {
    const asNumber2 = parseFloat(edge);
    if (edge.endsWith("px")) {
      delta = asNumber2;
    } else if (edge.endsWith("%")) {
      edge = asNumber2 / 100;
    } else if (edge.endsWith("vw")) {
      delta = asNumber2 / 100 * document.documentElement.clientWidth;
    } else if (edge.endsWith("vh")) {
      delta = asNumber2 / 100 * document.documentElement.clientHeight;
    } else {
      edge = asNumber2;
    }
  }
  if (typeof edge === "number") {
    delta = length * edge;
  }
  return inset + delta;
}
const defaultOffset = [0, 0];
function resolveOffset(offset, containerLength, targetLength, targetInset) {
  let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset;
  let targetPoint = 0;
  let containerPoint = 0;
  if (typeof offset === "number") {
    offsetDefinition = [offset, offset];
  } else if (typeof offset === "string") {
    offset = offset.trim();
    if (offset.includes(" ")) {
      offsetDefinition = offset.split(" ");
    } else {
      offsetDefinition = [offset, namedEdges[offset] ? offset : `0`];
    }
  }
  targetPoint = resolveEdge(offsetDefinition[0], targetLength, targetInset);
  containerPoint = resolveEdge(offsetDefinition[1], containerLength);
  return targetPoint - containerPoint;
}
const ScrollOffset = {
  Enter: [
    [0, 1],
    [1, 1]
  ],
  Exit: [
    [0, 0],
    [1, 0]
  ],
  Any: [
    [1, 0],
    [0, 1]
  ],
  All: [
    [0, 0],
    [1, 1]
  ]
};
const point = { x: 0, y: 0 };
function getTargetSize(target) {
  return "getBBox" in target && target.tagName !== "svg" ? target.getBBox() : { width: target.clientWidth, height: target.clientHeight };
}
function resolveOffsets(container, info, options) {
  const { offset: offsetDefinition = ScrollOffset.All } = options;
  const { target = container, axis = "y" } = options;
  const lengthLabel = axis === "y" ? "height" : "width";
  const inset = target !== container ? calcInset(target, container) : point;
  const targetSize = target === container ? { width: container.scrollWidth, height: container.scrollHeight } : getTargetSize(target);
  const containerSize = {
    width: container.clientWidth,
    height: container.clientHeight
  };
  info[axis].offset.length = 0;
  let hasChanged2 = !info[axis].interpolate;
  const numOffsets = offsetDefinition.length;
  for (let i = 0; i < numOffsets; i++) {
    const offset = resolveOffset(offsetDefinition[i], containerSize[lengthLabel], targetSize[lengthLabel], inset[axis]);
    if (!hasChanged2 && offset !== info[axis].interpolatorOffsets[i]) {
      hasChanged2 = true;
    }
    info[axis].offset[i] = offset;
  }
  if (hasChanged2) {
    info[axis].interpolate = interpolate(info[axis].offset, defaultOffset$1(offsetDefinition), { clamp: false });
    info[axis].interpolatorOffsets = [...info[axis].offset];
  }
  info[axis].progress = clamp(0, 1, info[axis].interpolate(info[axis].current));
}
function measure(container, target = container, info) {
  info.x.targetOffset = 0;
  info.y.targetOffset = 0;
  if (target !== container) {
    let node = target;
    while (node && node !== container) {
      info.x.targetOffset += node.offsetLeft;
      info.y.targetOffset += node.offsetTop;
      node = node.offsetParent;
    }
  }
  info.x.targetLength = target === container ? target.scrollWidth : target.clientWidth;
  info.y.targetLength = target === container ? target.scrollHeight : target.clientHeight;
  info.x.containerLength = container.clientWidth;
  info.y.containerLength = container.clientHeight;
  if (process.env.NODE_ENV !== "production") {
    if (container && target && target !== container) {
      warnOnce(getComputedStyle(container).position !== "static", "Please ensure that the container has a non-static position, like 'relative', 'fixed', or 'absolute' to ensure scroll offset is calculated correctly.");
    }
  }
}
function createOnScrollHandler(element, onScroll, info, options = {}) {
  return {
    measure: (time2) => {
      measure(element, options.target, info);
      updateScrollInfo(element, info, time2);
      if (options.offset || options.target) {
        resolveOffsets(element, info, options);
      }
    },
    notify: () => onScroll(info)
  };
}
const scrollListeners = /* @__PURE__ */ new WeakMap();
const resizeListeners = /* @__PURE__ */ new WeakMap();
const onScrollHandlers = /* @__PURE__ */ new WeakMap();
const getEventTarget = (element) => element === document.scrollingElement ? window : element;
function scrollInfo(onScroll, { container = document.scrollingElement, ...options } = {}) {
  if (!container)
    return noop;
  let containerHandlers = onScrollHandlers.get(container);
  if (!containerHandlers) {
    containerHandlers = /* @__PURE__ */ new Set();
    onScrollHandlers.set(container, containerHandlers);
  }
  const info = createScrollInfo();
  const containerHandler = createOnScrollHandler(container, onScroll, info, options);
  containerHandlers.add(containerHandler);
  if (!scrollListeners.has(container)) {
    const measureAll = () => {
      for (const handler of containerHandlers) {
        handler.measure(frameData.timestamp);
      }
      frame.preUpdate(notifyAll2);
    };
    const notifyAll2 = () => {
      for (const handler of containerHandlers) {
        handler.notify();
      }
    };
    const listener2 = () => frame.read(measureAll);
    scrollListeners.set(container, listener2);
    const target = getEventTarget(container);
    window.addEventListener("resize", listener2, { passive: true });
    if (container !== document.documentElement) {
      resizeListeners.set(container, resize(container, listener2));
    }
    target.addEventListener("scroll", listener2, { passive: true });
    listener2();
  }
  const listener = scrollListeners.get(container);
  frame.read(listener, false, true);
  return () => {
    var _a2;
    cancelFrame(listener);
    const currentHandlers = onScrollHandlers.get(container);
    if (!currentHandlers)
      return;
    currentHandlers.delete(containerHandler);
    if (currentHandlers.size)
      return;
    const scrollListener = scrollListeners.get(container);
    scrollListeners.delete(container);
    if (scrollListener) {
      getEventTarget(container).removeEventListener("scroll", scrollListener);
      (_a2 = resizeListeners.get(container)) == null ? void 0 : _a2();
      window.removeEventListener("resize", scrollListener);
    }
  };
}
const timelineCache = /* @__PURE__ */ new Map();
function scrollTimelineFallback(options) {
  const currentTime = { value: 0 };
  const cancel = scrollInfo((info) => {
    currentTime.value = info[options.axis].progress * 100;
  }, options);
  return { currentTime, cancel };
}
function getTimeline({ source, container, ...options }) {
  const { axis } = options;
  if (source)
    container = source;
  const containerCache = timelineCache.get(container) ?? /* @__PURE__ */ new Map();
  timelineCache.set(container, containerCache);
  const targetKey = options.target ?? "self";
  const targetCache = containerCache.get(targetKey) ?? {};
  const axisKey = axis + (options.offset ?? []).join(",");
  if (!targetCache[axisKey]) {
    targetCache[axisKey] = !options.target && supportsScrollTimeline() ? new ScrollTimeline({ source: container, axis }) : scrollTimelineFallback({ container, ...options });
  }
  return targetCache[axisKey];
}
function attachToAnimation(animation, options) {
  const timeline = getTimeline(options);
  return animation.attachTimeline({
    timeline: options.target ? void 0 : timeline,
    observe: (valueAnimation) => {
      valueAnimation.pause();
      return observeTimeline((progress2) => {
        valueAnimation.time = valueAnimation.iterationDuration * progress2;
      }, timeline);
    }
  });
}
function isOnScrollWithInfo(onScroll) {
  return onScroll.length === 2;
}
function attachToFunction(onScroll, options) {
  if (isOnScrollWithInfo(onScroll)) {
    return scrollInfo((info) => {
      onScroll(info[options.axis].progress, info);
    }, options);
  } else {
    return observeTimeline(onScroll, getTimeline(options));
  }
}
function scroll(onScroll, { axis = "y", container = document.scrollingElement, ...options } = {}) {
  if (!container)
    return noop;
  const optionsWithDefaults = { axis, container, ...options };
  return typeof onScroll === "function" ? attachToFunction(onScroll, optionsWithDefaults) : attachToAnimation(onScroll, optionsWithDefaults);
}
const thresholds = {
  some: 0,
  all: 1
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "some" } = {}) {
  const elements = resolveElements(elementOrSelector);
  const activeIntersections = /* @__PURE__ */ new WeakMap();
  const onIntersectionChange = (entries) => {
    entries.forEach((entry) => {
      const onEnd = activeIntersections.get(entry.target);
      if (entry.isIntersecting === Boolean(onEnd))
        return;
      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry.target, entry);
        if (typeof newOnEnd === "function") {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer2.unobserve(entry.target);
        }
      } else if (typeof onEnd === "function") {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };
  const observer2 = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount]
  });
  elements.forEach((element) => observer2.observe(element));
  return () => observer2.disconnect();
}
function delay(callback, timeout) {
  const start2 = time.now();
  const checkElapsed = ({ timestamp }) => {
    const elapsed = timestamp - start2;
    if (elapsed >= timeout) {
      cancelFrame(checkElapsed);
      callback(elapsed - timeout);
    }
  };
  frame.setup(checkElapsed, true);
  return () => cancelFrame(checkElapsed);
}
function delayInSeconds(callback, timeout) {
  return delay(callback, /* @__PURE__ */ secondsToMilliseconds(timeout));
}
const distance = (a, b) => Math.abs(a - b);
function distance2D(a, b) {
  const xDelta = distance(a.x, b.x);
  const yDelta = distance(a.y, b.y);
  return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}
function getMotionElement(el) {
  if (!el)
    return void 0;
  if (el.nodeType === 3 || el.nodeType === 8) {
    return getMotionElement(el.nextSibling);
  }
  return el;
}
function getElement(target) {
  return getMotionElement(core.unrefElement(target));
}
function createContext(providerComponentName, contextName) {
  const symbolDescription = typeof providerComponentName === "string" && !contextName ? `${providerComponentName}Context` : contextName;
  const injectionKey = Symbol(symbolDescription);
  const injectContext = (fallback) => {
    const context = vue.inject(injectionKey, fallback);
    if (context === void 0) {
      throw new Error(
        `Injection \`${injectionKey.toString()}\` not found. Component must be used within ${Array.isArray(providerComponentName) ? `one of the following components: ${providerComponentName.join(
          ", "
        )}` : `\`${providerComponentName}\``}`
      );
    }
    return context;
  };
  const provideContext = (contextValue) => {
    vue.provide(injectionKey, contextValue);
    return contextValue;
  };
  return [injectContext, provideContext];
}
function useInView(domRef, options) {
  const isInView = vue.ref(false);
  vue.watchEffect((onCleanup) => {
    const realOptions = vue.unref(options) || {};
    const { once } = realOptions;
    const el = core.unrefElement(domRef);
    if (!el || once && isInView.value) {
      return;
    }
    const onEnter = () => {
      isInView.value = true;
      return once ? void 0 : () => {
        isInView.value = false;
      };
    };
    const cleanup = inView(el, onEnter, {
      ...realOptions,
      root: vue.unref(realOptions.root)
    });
    onCleanup(() => {
      cleanup();
    });
  }, {
    flush: "post"
  });
  return isInView;
}
function useAnimationFrame(callback) {
  let initialTimestamp = 0;
  const provideTimeSinceStart = ({ timestamp, delta }) => {
    if (!initialTimestamp)
      initialTimestamp = timestamp;
    callback(timestamp - initialTimestamp, delta);
  };
  const cancel = () => cancelFrame(provideTimeSinceStart);
  vue.onBeforeUpdate(() => {
    cancel();
    frame.update(provideTimeSinceStart, true);
  });
  vue.onUnmounted(() => cancel());
  frame.update(provideTimeSinceStart, true);
}
function getContextWindow({ current: current2 }) {
  return current2 ? current2.ownerDocument.defaultView : null;
}
function useDomRef() {
  const dom = vue.ref(null);
  const domProxy = new Proxy(dom, {
    get(target, key) {
      if (typeof key === "string" || typeof key === "symbol") {
        return Reflect.get(target, key);
      }
      return void 0;
    },
    set(target, key, value) {
      if (key === "value")
        return Reflect.set(target, key, getMotionElement((value == null ? void 0 : value.$el) || value));
      return true;
    }
  });
  return domProxy;
}
function usePageInView() {
  const isInView = vue.ref(true);
  const handleVisibilityChange = () => {
    isInView.value = !document.hidden;
  };
  vue.onMounted(() => {
    if (document.hidden) {
      handleVisibilityChange();
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
  });
  vue.onUnmounted(() => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  });
  return isInView;
}
const [injectMotion, provideMotion] = createContext("Motion");
const [injectLayoutGroup, provideLayoutGroup] = createContext("LayoutGroup");
const [useLazyMotionContext, lazyMotionContextProvider] = createContext("LazyMotionContext");
const defaultConfig = {
  reducedMotion: "never",
  transition: void 0,
  nonce: void 0
};
const [injectMotionConfig, provideMotionConfig] = createContext("MotionConfig");
function useMotionConfig() {
  return injectMotionConfig(vue.computed(() => defaultConfig));
}
const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "MotionConfig",
    inheritAttrs: false
  },
  __name: "MotionConfig",
  props: {
    transition: {},
    reduceMotion: {},
    reducedMotion: { default: ({ reduceMotion }) => {
      if (core.isDef(reduceMotion)) {
        heyListen.warning(false, "`reduceMotion` is deprecated. Use `reducedMotion` instead.");
        return reduceMotion;
      }
      return defaultConfig.reducedMotion;
    } },
    nonce: {},
    inViewOptions: {}
  },
  setup(__props) {
    const props = __props;
    const parentConfig = useMotionConfig();
    const config = vue.computed(() => ({
      transition: props.transition ?? parentConfig.value.transition,
      reducedMotion: props.reducedMotion ?? parentConfig.value.reducedMotion,
      nonce: props.nonce ?? parentConfig.value.nonce,
      inViewOptions: props.inViewOptions ?? parentConfig.value.inViewOptions
    }));
    provideMotionConfig(config);
    return (_ctx, _cache) => {
      return vue.renderSlot(_ctx.$slots, "default");
    };
  }
});
const PRESENCE_CHILD_ATTR = "data-ap-child";
const [injectAnimatePresence, provideAnimatePresence] = createContext("AnimatePresenceContext");
function resolveVariant(definition, variants, custom) {
  if (Array.isArray(definition)) {
    return definition.reduce((acc, item) => {
      const resolvedVariant = resolveVariant(item, variants, custom);
      return resolvedVariant ? { ...acc, ...resolvedVariant } : acc;
    }, {});
  } else if (typeof definition === "object") {
    return definition;
  } else if (definition && variants) {
    const variant = variants[definition];
    return typeof variant === "function" ? variant(custom) : variant;
  }
}
function hasChanged(a, b) {
  if (typeof a !== typeof b)
    return true;
  if (Array.isArray(a) && Array.isArray(b))
    return !shallowCompare(a, b);
  return a !== b;
}
function shallowCompare(next2, prev) {
  const prevLength = prev.length;
  if (prevLength !== next2.length)
    return false;
  for (let i = 0; i < prevLength; i++) {
    if (prev[i] !== next2[i])
      return false;
  }
  return true;
}
function isCssVar(name) {
  return name == null ? void 0 : name.startsWith("--");
}
const noopReturn = (v) => v;
function isNumber(value) {
  return typeof value === "number";
}
const svgElements = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "svg",
  "switch",
  "symbol",
  "text",
  "tspan",
  "use",
  "view",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "linearGradient",
  "radialGradient",
  "textPath"
];
const svgElementSet = new Set(svgElements);
function isSVGElement(as) {
  return svgElementSet.has(as);
}
class Feature {
  constructor(state) {
    this.state = state;
  }
  beforeMount() {
  }
  mount() {
  }
  unmount() {
  }
  update() {
  }
  beforeUpdate(options) {
  }
  beforeUnmount() {
  }
}
function handleHoverEvent$1(state, event, lifecycle) {
  const props = state.options;
  if (props.whileHover) {
    state.setActive("whileHover", lifecycle === "Start");
  }
  const eventName = `onHover${lifecycle}`;
  const callback = props[eventName];
  if (callback) {
    frame.postRender(() => callback(event, extractEventInfo$1(event)));
  }
}
class HoverGesture extends Feature {
  isActive() {
    const { whileHover, onHoverStart, onHoverEnd } = this.state.options;
    return Boolean(whileHover || onHoverStart || onHoverEnd);
  }
  constructor(state) {
    super(state);
  }
  mount() {
    this.register();
  }
  update() {
    const { whileHover, onHoverStart, onHoverEnd } = this.state.visualElement.prevProps;
    if (!(whileHover || onHoverStart || onHoverEnd)) {
      this.register();
    }
  }
  register() {
    const element = this.state.element;
    if (!element || !this.isActive())
      return;
    this.unmount();
    this.unmount = hover(
      element,
      (el, startEvent) => {
        handleHoverEvent$1(this.state, startEvent, "Start");
        return (endEvent) => {
          handleHoverEvent$1(this.state, endEvent, "End");
        };
      }
    );
  }
}
function extractEventInfo$1(event) {
  return {
    point: {
      x: event.pageX,
      y: event.pageY
    }
  };
}
function handlePressEvent(state, event, lifecycle) {
  const props = state.options;
  if (props.whilePress) {
    state.setActive("whilePress", lifecycle === "Start");
  }
  const eventName = `onPress${lifecycle === "End" ? "" : lifecycle}`;
  const callback = props[eventName];
  if (callback) {
    frame.postRender(() => callback(event, extractEventInfo$1(event)));
  }
}
class PressGesture extends Feature {
  isActive() {
    const { whilePress, onPress, onPressCancel, onPressStart } = this.state.options;
    return Boolean(whilePress || onPress || onPressCancel || onPressStart);
  }
  constructor(state) {
    super(state);
  }
  mount() {
    this.register();
  }
  update() {
    const { whilePress, onPress, onPressCancel, onPressStart } = this.state.options;
    if (!(whilePress || onPress || onPressCancel || onPressStart)) {
      this.register();
    }
  }
  register() {
    const element = this.state.element;
    if (!element || !this.isActive())
      return;
    this.unmount();
    this.unmount = press(
      element,
      (el, startEvent) => {
        handlePressEvent(this.state, startEvent, "Start");
        return (endEvent, { success }) => handlePressEvent(
          this.state,
          endEvent,
          success ? "End" : "Cancel"
        );
      },
      { useGlobalTarget: this.state.options.globalPressTarget }
    );
  }
}
function handleHoverEvent(state, entry, lifecycle) {
  const props = state.options;
  if (props.whileInView) {
    state.setActive("whileInView", lifecycle === "Enter");
  }
  const eventName = `onViewport${lifecycle}`;
  const callback = props[eventName];
  if (callback) {
    frame.postRender(() => callback(entry));
  }
}
class InViewGesture extends Feature {
  isActive() {
    const { whileInView, onViewportEnter, onViewportLeave } = this.state.options;
    return Boolean(whileInView || onViewportEnter || onViewportLeave);
  }
  constructor(state) {
    super(state);
  }
  startObserver() {
    const element = this.state.element;
    if (!element || !this.isActive())
      return;
    this.unmount();
    const { once, ...viewOptions } = this.state.options.inViewOptions || {};
    this.unmount = inView(
      element,
      (_, entry) => {
        handleHoverEvent(this.state, entry, "Enter");
        if (!once) {
          return (endEvent) => {
            handleHoverEvent(this.state, entry, "Leave");
          };
        }
      },
      viewOptions
    );
  }
  mount() {
    this.startObserver();
  }
  update() {
    const { props, prevProps } = this.state.visualElement;
    const hasOptionsChanged = ["amount", "margin", "root"].some(
      hasViewportOptionChanged(props, prevProps)
    );
    if (hasOptionsChanged) {
      this.startObserver();
    }
  }
}
function hasViewportOptionChanged({ inViewOptions = {} }, { inViewOptions: prevViewport = {} } = {}) {
  return (name) => inViewOptions[name] !== prevViewport[name];
}
function isPrimaryPointer(event) {
  if (event.pointerType === "mouse") {
    return typeof event.button !== "number" || event.button <= 0;
  } else {
    return event.isPrimary !== false;
  }
}
function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent$1(target, eventName, addPointerInfo(handler), options);
}
function extractEventInfo(event, pointType = "page") {
  return {
    point: {
      x: event[`${pointType}X`],
      y: event[`${pointType}Y`]
    }
  };
}
function addPointerInfo(handler) {
  return (event) => isPrimaryPointer(event) && handler(event, extractEventInfo(event));
}
function addDomEvent$1(target, eventName, handler, options = { passive: true }) {
  target.addEventListener(eventName, handler, options);
  return () => target.removeEventListener(eventName, handler);
}
function createLock(name) {
  let lock = null;
  return () => {
    const openLock = () => {
      lock = null;
    };
    if (lock === null) {
      lock = name;
      return openLock;
    }
    return false;
  };
}
const globalHorizontalLock = createLock("dragHorizontal");
const globalVerticalLock = createLock("dragVertical");
function getGlobalLock(drag) {
  let lock = false;
  if (drag === "y") {
    lock = globalVerticalLock();
  } else if (drag === "x") {
    lock = globalHorizontalLock();
  } else {
    const openHorizontal = globalHorizontalLock();
    const openVertical = globalVerticalLock();
    if (openHorizontal && openVertical) {
      lock = () => {
        openHorizontal();
        openVertical();
      };
    } else {
      if (openHorizontal)
        openHorizontal();
      if (openVertical)
        openVertical();
    }
  }
  return lock;
}
function calcLength$1(axis) {
  return axis.max - axis.min;
}
function applyConstraints(point2, { min, max }, elastic) {
  if (min !== void 0 && point2 < min) {
    point2 = elastic ? mixNumber$1(min, point2, elastic.min) : Math.max(point2, min);
  } else if (max !== void 0 && point2 > max) {
    point2 = elastic ? mixNumber$1(max, point2, elastic.max) : Math.min(point2, max);
  }
  return point2;
}
const defaultElastic = 0.35;
function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
function resolveDragElastic(dragElastic = defaultElastic) {
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic;
  }
  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
function resolvePointElastic(dragElastic, label) {
  return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
}
function rebaseAxisConstraints(layout, constraints) {
  const relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout.min;
  }
  return relativeConstraints;
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  let min = constraintsAxis.min - layoutAxis.min;
  let max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    [min, max] = [max, min];
  }
  return { min, max };
}
function calcOrigin(source, target) {
  let origin = 0.5;
  const sourceLength = calcLength$1(source);
  const targetLength = calcLength$1(target);
  if (targetLength > sourceLength) {
    origin = /* @__PURE__ */ progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = /* @__PURE__ */ progress(source.min, source.max - targetLength, target.min);
  }
  return clamp(0, 1, origin);
}
function isHTMLElement(value) {
  return typeof value === "object" && value !== null && "nodeType" in value;
}
const overflowStyles$1 = /* @__PURE__ */ new Set(["auto", "scroll"]);
class PanSession {
  constructor(event, handlers, { transformPagePoint, contextWindow, dragSnapToOrigin = false, element } = {}) {
    this.startEvent = null;
    this.lastMoveEvent = null;
    this.lastMoveEventInfo = null;
    this.handlers = {};
    this.contextWindow = window;
    this.scrollPositions = /* @__PURE__ */ new Map();
    this.onElementScroll = (event2) => {
      this.handleScroll(event2.target);
    };
    this.onWindowScroll = () => {
      this.handleScroll(window);
    };
    this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const info2 = getPanInfo(this.lastMoveEventInfo, this.history);
      const isPanStarted = this.startEvent !== null;
      const isDistancePastThreshold = distance2D(info2.offset, { x: 0, y: 0 }) >= 3;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      const { point: point3 } = info2;
      const { timestamp: timestamp2 } = frameData;
      this.history.push({ ...point3, timestamp: timestamp2 });
      const { onStart, onMove } = this.handlers;
      if (!isPanStarted) {
        onStart && onStart(this.lastMoveEvent, info2);
        this.startEvent = this.lastMoveEvent;
      }
      onMove && onMove(this.lastMoveEvent, info2);
    };
    this.handlePointerMove = (event2, info2) => {
      this.lastMoveEvent = event2;
      this.lastMoveEventInfo = transformPoint(info2, this.transformPagePoint);
      frame.update(this.updatePoint, true);
    };
    this.handlePointerUp = (event2, info2) => {
      this.end();
      const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
      if (this.dragSnapToOrigin || !this.startEvent) {
        resumeAnimation && resumeAnimation();
      }
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const panInfo = getPanInfo(
        event2.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(info2, this.transformPagePoint),
        this.history
      );
      if (this.startEvent && onEnd) {
        onEnd(event2, panInfo);
      }
      onSessionEnd && onSessionEnd(event2, panInfo);
    };
    if (!isPrimaryPointer(event))
      return;
    this.dragSnapToOrigin = dragSnapToOrigin;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    this.contextWindow = contextWindow || window;
    const info = extractEventInfo(event);
    const initialInfo = transformPoint(info, this.transformPagePoint);
    const { point: point2 } = initialInfo;
    const { timestamp } = frameData;
    this.history = [{ ...point2, timestamp }];
    const { onSessionStart } = handlers;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    this.removeListeners = pipe(
      addPointerEvent(
        this.contextWindow,
        "pointermove",
        this.handlePointerMove
      ),
      addPointerEvent(
        this.contextWindow,
        "pointerup",
        this.handlePointerUp
      ),
      addPointerEvent(
        this.contextWindow,
        "pointercancel",
        this.handlePointerUp
      )
    );
    if (element) {
      this.startScrollTracking(element);
    }
  }
  /**
   * Check if element has scrollable overflow
   */
  isScrollable(node) {
    const style2 = window.getComputedStyle(node);
    return style2.overflow === "auto" || style2.overflow === "scroll" || style2.overflowX === "auto" || style2.overflowX === "scroll" || style2.overflowY === "auto" || style2.overflowY === "scroll";
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(element) {
    let current2 = element.parentElement;
    while (current2) {
      const style2 = getComputedStyle(current2);
      if (overflowStyles$1.has(style2.overflowX) || overflowStyles$1.has(style2.overflowY)) {
        this.scrollPositions.set(current2, {
          x: current2.scrollLeft,
          y: current2.scrollTop
        });
      }
      current2 = current2.parentElement;
    }
    this.scrollPositions.set(window, {
      x: window.scrollX,
      y: window.scrollY
    });
    window.addEventListener("scroll", this.onElementScroll, {
      capture: true,
      passive: true
    });
    window.addEventListener("scroll", this.onWindowScroll, {
      passive: true
    });
    this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, {
        capture: true
      });
      window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  /**
   * Handle scroll compensation during drag.
   *
   * For element scroll: adjusts history origin since pageX/pageY doesn't change.
   * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
   */
  handleScroll(target) {
    const initial = this.scrollPositions.get(target);
    if (!initial)
      return;
    const isWindow = target === window;
    const current2 = isWindow ? { x: window.scrollX, y: window.scrollY } : {
      x: target.scrollLeft,
      y: target.scrollTop
    };
    const delta = { x: current2.x - initial.x, y: current2.y - initial.y };
    if (delta.x === 0 && delta.y === 0)
      return;
    if (isWindow) {
      if (this.lastMoveEventInfo) {
        this.lastMoveEventInfo.point.x += delta.x;
        this.lastMoveEventInfo.point.y += delta.y;
      }
    } else {
      if (this.history.length > 0) {
        this.history[0].x -= delta.x;
        this.history[0].y -= delta.y;
      }
    }
    this.scrollPositions.set(target, current2);
    frame.update(this.updatePoint, true);
  }
  updateHandlers(handlers) {
    this.handlers = handlers;
  }
  end() {
    var _a2;
    this.removeListeners && this.removeListeners();
    (_a2 = this.removeScrollListeners) == null ? void 0 : _a2.call(this);
    this.scrollPositions.clear();
    cancelFrame(this.updatePoint);
  }
}
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}
function getPanInfo({ point: point2 }, history) {
  return {
    point: point2,
    delta: subtractPoint(point2, lastDevicePoint(history)),
    offset: subtractPoint(point2, startDevicePoint(history)),
    velocity: getVelocity(history, 0.1)
  };
}
function startDevicePoint(history) {
  return history[0];
}
function lastDevicePoint(history) {
  return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }
  let i = history.length - 1;
  let timestampedPoint = null;
  const lastPoint = lastDevicePoint(history);
  while (i >= 0) {
    timestampedPoint = history[i];
    if (lastPoint.timestamp - timestampedPoint.timestamp > /* @__PURE__ */ secondsToMilliseconds(timeDelta)) {
      break;
    }
    i--;
  }
  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }
  const time2 = /* @__PURE__ */ millisecondsToSeconds(
    lastPoint.timestamp - timestampedPoint.timestamp
  );
  if (time2 === 0) {
    return { x: 0, y: 0 };
  }
  const currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time2,
    y: (lastPoint.y - timestampedPoint.y) / time2
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}
const createAxis = () => ({ min: 0, max: 0 });
function createBox() {
  return {
    x: createAxis(),
    y: createAxis()
  };
}
function eachAxis$1(callback) {
  return [callback("x"), callback("y")];
}
function isWillChangeMotionValue(value) {
  return Boolean(isMotionValue(value) && value.add);
}
function addValueToWillChange(visualElement, key) {
  const willChange = visualElement.getValue("willChange");
  if (isWillChangeMotionValue(willChange)) {
    return willChange.add(key);
  }
}
function convertBoundingBoxToBox({
  top,
  left,
  right,
  bottom
}) {
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
function transformBoxPoints(point2, transformPoint2) {
  if (!transformPoint2)
    return point2;
  const topLeft = transformPoint2({ x: point2.left, y: point2.top });
  const bottomRight = transformPoint2({ x: point2.right, y: point2.bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}
function convertBoxToBoundingBox({ x, y }) {
  return { top: y.min, right: x.max, bottom: y.max, left: x.min };
}
function translateAxis(axis, distance2) {
  axis.min = axis.min + distance2;
  axis.max = axis.max + distance2;
}
function measureViewportBox(instance, transformPoint2) {
  return convertBoundingBoxToBox(
    transformBoxPoints(instance.getBoundingClientRect(), transformPoint2)
  );
}
function measurePageBox(element, rootProjectionNode2, transformPagePoint) {
  const viewportBox = measureViewportBox(element, transformPagePoint);
  const { scroll: scroll2 } = rootProjectionNode2;
  if (scroll2) {
    translateAxis(viewportBox.x, scroll2.offset.x);
    translateAxis(viewportBox.y, scroll2.offset.y);
  }
  return viewportBox;
}
function isPresent(visualElement) {
  var _a2;
  return (_a2 = visualElement.projection) == null ? void 0 : _a2.isPresent;
}
const elementDragControls = /* @__PURE__ */ new WeakMap();
class VisualElementDragControls {
  constructor(visualElement) {
    this.openGlobalLock = null;
    this.isDragging = false;
    this.currentDirection = null;
    this.originPoint = { x: 0, y: 0 };
    this.constraints = false;
    this.hasMutatedConstraints = false;
    this.elastic = createBox();
    this.visualElement = visualElement;
  }
  start(originEvent, { snapToCursor = false } = {}) {
    const onSessionStart = (event) => {
      if (snapToCursor) {
        this.stopAnimation();
      } else {
        this.pauseAnimation();
      }
      if (snapToCursor) {
        this.snapToCursor(extractEventInfo(event, "page").point);
      }
    };
    const onStart = (event, info) => {
      this.stopAnimation();
      const { drag, dragPropagation, onDragStart } = this.getProps();
      if (drag && !dragPropagation) {
        if (this.openGlobalLock)
          this.openGlobalLock();
        this.openGlobalLock = getGlobalLock(drag);
        if (!this.openGlobalLock)
          return;
      }
      this.isDragging = true;
      this.currentDirection = null;
      this.resolveConstraints();
      if (this.visualElement.projection) {
        this.visualElement.projection.isAnimationBlocked = true;
        this.visualElement.projection.target = void 0;
      }
      eachAxis$1((axis) => {
        let current2 = this.getAxisMotionValue(axis).get() || 0;
        if (percent.test(current2)) {
          const { projection } = this.visualElement;
          if (projection && projection.layout) {
            const measuredAxis = projection.layout.layoutBox[axis];
            if (measuredAxis) {
              const length = calcLength$1(measuredAxis);
              current2 = length * (parseFloat(current2) / 100);
            }
          }
        }
        this.originPoint[axis] = current2;
      });
      if (onDragStart) {
        frame.postRender(() => onDragStart(event, info));
      }
      addValueToWillChange(this.visualElement, "transform");
      const state = this.visualElement.state;
      state.setActive("whileDrag", true);
    };
    const onMove = (event, info) => {
      const {
        dragPropagation,
        dragDirectionLock,
        onDirectionLock,
        onDrag
      } = this.getProps();
      if (!dragPropagation && !this.openGlobalLock)
        return;
      const { offset } = info;
      if (dragDirectionLock && this.currentDirection === null) {
        this.currentDirection = getCurrentDirection(offset);
        if (this.currentDirection !== null) {
          onDirectionLock && onDirectionLock(this.currentDirection);
        }
        return;
      }
      this.updateAxis("x", info.point, offset);
      this.updateAxis("y", info.point, offset);
      this.visualElement.render();
      onDrag && onDrag(event, info);
    };
    const onSessionEnd = (event, info) => this.stop(event, info);
    const resumeAnimation = () => eachAxis$1(
      (axis) => {
        var _a2;
        return this.getAnimationState(axis) === "paused" && ((_a2 = this.getAxisMotionValue(axis).animation) == null ? void 0 : _a2.play());
      }
    );
    const { dragSnapToOrigin } = this.getProps();
    this.panSession = new PanSession(
      originEvent,
      {
        onSessionStart,
        onStart,
        onMove,
        onSessionEnd,
        resumeAnimation
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin,
        contextWindow: getContextWindow(this.visualElement),
        element: this.visualElement.current
      }
    );
  }
  stop(event, info) {
    const isDragging2 = this.isDragging;
    this.cancel();
    if (!isDragging2)
      return;
    const { velocity } = info;
    this.startAnimation(velocity);
    const { onDragEnd } = this.getProps();
    if (onDragEnd) {
      frame.postRender(() => onDragEnd(event, info));
    }
  }
  cancel() {
    this.isDragging = false;
    const { projection, animationState } = this.visualElement;
    if (projection) {
      projection.isAnimationBlocked = false;
    }
    this.panSession && this.panSession.end();
    this.panSession = void 0;
    const { dragPropagation } = this.getProps();
    if (!dragPropagation && this.openGlobalLock) {
      this.openGlobalLock();
      this.openGlobalLock = null;
    }
    const state = this.visualElement.state;
    state.setActive("whileDrag", false);
  }
  updateAxis(axis, _point, offset) {
    const { drag } = this.getProps();
    if (!offset || !shouldDrag(axis, drag, this.currentDirection))
      return;
    const axisValue = this.getAxisMotionValue(axis);
    let next2 = this.originPoint[axis] + offset[axis];
    if (this.constraints && this.constraints[axis]) {
      next2 = applyConstraints(
        next2,
        this.constraints[axis],
        this.elastic[axis]
      );
    }
    axisValue.set(next2);
  }
  resolveConstraints() {
    var _a2;
    const { dragConstraints, dragElastic } = this.getProps();
    const layout = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : (_a2 = this.visualElement.projection) == null ? void 0 : _a2.layout;
    const prevConstraints = this.constraints;
    if (dragConstraints && isHTMLElement(dragConstraints)) {
      if (!this.constraints) {
        this.constraints = this.resolveRefConstraints();
      }
    } else {
      if (dragConstraints && layout) {
        this.constraints = calcRelativeConstraints(
          layout.layoutBox,
          dragConstraints
        );
      } else {
        this.constraints = false;
      }
    }
    this.elastic = resolveDragElastic(dragElastic);
    if (prevConstraints !== this.constraints && layout && this.constraints && !this.hasMutatedConstraints) {
      eachAxis$1((axis) => {
        if (this.constraints !== false && this.getAxisMotionValue(axis)) {
          this.constraints[axis] = rebaseAxisConstraints(
            layout.layoutBox[axis],
            this.constraints[axis]
          );
        }
      });
    }
  }
  resolveRefConstraints() {
    const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
    if (!constraints || !isHTMLElement(constraints))
      return false;
    const constraintsElement = constraints;
    heyListen.invariant(
      constraintsElement !== null,
      "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop."
    );
    const { projection } = this.visualElement;
    if (!projection || !projection.layout)
      return false;
    const constraintsBox = measurePageBox(
      constraintsElement,
      projection.root,
      this.visualElement.getTransformPagePoint()
    );
    let measuredConstraints = calcViewportConstraints(
      projection.layout.layoutBox,
      constraintsBox
    );
    if (onMeasureDragConstraints) {
      const userConstraints = onMeasureDragConstraints(
        convertBoxToBoundingBox(measuredConstraints)
      );
      this.hasMutatedConstraints = !!userConstraints;
      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToBox(userConstraints);
      }
    }
    return measuredConstraints;
  }
  startAnimation(velocity) {
    const {
      drag,
      dragMomentum,
      dragElastic,
      dragTransition,
      dragSnapToOrigin,
      onDragTransitionEnd
    } = this.getProps();
    const constraints = this.constraints || {};
    const momentumAnimations = eachAxis$1((axis) => {
      if (!shouldDrag(axis, drag, this.currentDirection)) {
        return;
      }
      let transition = constraints && constraints[axis] || {};
      if (dragSnapToOrigin)
        transition = { min: 0, max: 0 };
      const bounceStiffness = dragElastic ? 200 : 1e6;
      const bounceDamping = dragElastic ? 40 : 1e7;
      const inertia2 = {
        type: "inertia",
        velocity: dragMomentum ? velocity[axis] : 0,
        bounceStiffness,
        bounceDamping,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...dragTransition,
        ...transition
      };
      return this.startAxisValueAnimation(axis, inertia2);
    });
    return Promise.all(momentumAnimations).then(onDragTransitionEnd);
  }
  startAxisValueAnimation(axis, transition) {
    const axisValue = this.getAxisMotionValue(axis);
    addValueToWillChange(this.visualElement, axis);
    return axisValue.start(
      animateMotionValue(
        axis,
        axisValue,
        0,
        transition,
        this.visualElement,
        false
      )
    );
  }
  stopAnimation() {
    if (!isPresent(this.visualElement))
      return;
    eachAxis$1((axis) => this.getAxisMotionValue(axis).stop());
  }
  pauseAnimation() {
    eachAxis$1((axis) => {
      var _a2;
      return (_a2 = this.getAxisMotionValue(axis).animation) == null ? void 0 : _a2.pause();
    });
  }
  getAnimationState(axis) {
    var _a2;
    return (_a2 = this.getAxisMotionValue(axis).animation) == null ? void 0 : _a2.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(axis) {
    const dragKey = `_drag${axis.toUpperCase()}`;
    const props = this.visualElement.getProps();
    const externalMotionValue = props[dragKey];
    return externalMotionValue || this.visualElement.getValue(
      axis,
      (props.initial ? props.initial[axis] : void 0) || 0
    );
  }
  snapToCursor(point2) {
    eachAxis$1((axis) => {
      const { drag } = this.getProps();
      if (!shouldDrag(axis, drag, this.currentDirection))
        return;
      const { projection } = this.visualElement;
      const axisValue = this.getAxisMotionValue(axis);
      if (projection && projection.layout) {
        const { min, max } = projection.layout.layoutBox[axis];
        axisValue.set(point2[axis] - mixNumber$1(min, max, 0.5));
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag, dragConstraints } = this.getProps();
    const { projection } = this.visualElement;
    if (!isHTMLElement(dragConstraints) || !projection || !this.constraints)
      return;
    this.stopAnimation();
    const boxProgress = { x: 0, y: 0 };
    eachAxis$1((axis) => {
      const axisValue = this.getAxisMotionValue(axis);
      if (axisValue && this.constraints !== false) {
        const latest = axisValue.get();
        boxProgress[axis] = calcOrigin(
          { min: latest, max: latest },
          this.constraints[axis]
        );
      }
    });
    const { transformTemplate } = this.visualElement.getProps();
    this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    projection.root && projection.root.updateScroll();
    projection.updateLayout();
    this.resolveConstraints();
    eachAxis$1((axis) => {
      if (!shouldDrag(axis, drag, null))
        return;
      const axisValue = this.getAxisMotionValue(axis);
      const { min, max } = this.constraints[axis];
      axisValue.set(mixNumber$1(min, max, boxProgress[axis]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    elementDragControls.set(this.visualElement, this);
    const element = this.visualElement.current;
    const stopPointerListener = addPointerEvent(
      element,
      "pointerdown",
      (event) => {
        const { drag, dragListener = true } = this.getProps();
        drag && dragListener && this.start(event);
      }
    );
    const measureDragConstraints = () => {
      const { dragConstraints } = this.getProps();
      if (isHTMLElement(dragConstraints)) {
        this.constraints = this.resolveRefConstraints();
      }
    };
    const { projection } = this.visualElement;
    const stopMeasureLayoutListener = projection.addEventListener(
      "measure",
      measureDragConstraints
    );
    if (projection && !projection.layout) {
      projection.root && projection.root.updateScroll();
      projection.updateLayout();
    }
    frame.read(measureDragConstraints);
    const stopResizeListener = addDomEvent$1(window, "resize", () => this.scalePositionWithinConstraints());
    const stopLayoutUpdateListener = projection.addEventListener(
      "didUpdate",
      ({ delta, hasLayoutChanged }) => {
        if (this.isDragging && hasLayoutChanged) {
          eachAxis$1((axis) => {
            const motionValue2 = this.getAxisMotionValue(axis);
            if (!motionValue2)
              return;
            this.originPoint[axis] += delta[axis].translate;
            motionValue2.set(
              motionValue2.get() + delta[axis].translate
            );
          });
          this.visualElement.render();
        }
      }
    );
    return () => {
      stopResizeListener();
      stopPointerListener();
      stopMeasureLayoutListener();
      stopLayoutUpdateListener && stopLayoutUpdateListener();
    };
  }
  getProps() {
    const props = this.visualElement.getProps();
    const {
      drag = false,
      dragDirectionLock = false,
      dragPropagation = false,
      dragConstraints = false,
      dragElastic = defaultElastic,
      dragMomentum = true
    } = props;
    return {
      ...props,
      drag,
      dragDirectionLock,
      dragPropagation,
      dragConstraints,
      dragElastic,
      dragMomentum
    };
  }
}
function shouldDrag(direction, drag, currentDirection) {
  return (drag === true || drag === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold = 10) {
  let direction = null;
  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}
class DragGesture extends Feature {
  constructor(state) {
    super(state);
    this.removeGroupControls = noop;
    this.removeListeners = noop;
    this.controls = new VisualElementDragControls(state.visualElement);
  }
  mount() {
    const { dragControls } = this.state.options;
    if (dragControls) {
      this.removeGroupControls = dragControls.subscribe(this.controls);
    }
    this.removeListeners = this.controls.addListeners() || noop;
  }
  unmount() {
    this.removeGroupControls();
    this.removeListeners();
  }
}
const defaultScaleCorrector = {
  borderRadius: {
    ...correctBorderRadius,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow
};
const globalProjectionState = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: true,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: false
};
let hasLayoutUpdate = false;
class LayoutFeature extends Feature {
  constructor(state) {
    super(state);
    addScaleCorrector(defaultScaleCorrector);
    state.getSnapshot = this.getSnapshot.bind(this);
    state.didUpdate = this.didUpdate.bind(this);
  }
  beforeUpdate(newOptions) {
    this.getSnapshot(newOptions, void 0);
  }
  update() {
    this.didUpdate();
  }
  didUpdate() {
    var _a2, _b;
    if (!hasLayoutUpdate)
      return;
    if (this.state.options.layout || this.state.options.layoutId || this.state.options.drag) {
      hasLayoutUpdate = false;
      (_b = (_a2 = this.state.visualElement.projection) == null ? void 0 : _a2.root) == null ? void 0 : _b.didUpdate();
    }
  }
  mount() {
    var _a2;
    const options = this.state.options;
    const layoutGroup = this.state.options.layoutGroup;
    if (options.layout || options.layoutId) {
      const projection = this.state.visualElement.projection;
      if (projection) {
        projection.promote();
        const stack = projection.getStack();
        if ((stack == null ? void 0 : stack.prevLead) && !stack.prevLead.snapshot) {
          stack.prevLead.willUpdate();
          hasLayoutUpdate = true;
        }
        (_a2 = layoutGroup == null ? void 0 : layoutGroup.group) == null ? void 0 : _a2.add(projection);
      }
      globalProjectionState.hasEverUpdated = true;
    }
    this.didUpdate();
  }
  beforeUnmount() {
    this.getSnapshot(this.state.options, false);
  }
  unmount() {
    const layoutGroup = this.state.options.layoutGroup;
    const projection = this.state.visualElement.projection;
    if (projection) {
      if ((layoutGroup == null ? void 0 : layoutGroup.group) && (this.state.options.layout || this.state.options.layoutId)) {
        layoutGroup.group.remove(projection);
      }
      if (this.state.options.layoutId) {
        hasLayoutUpdate = true;
      }
      this.didUpdate();
    }
  }
  getSnapshot(newOptions, isPresent2) {
    const projection = this.state.visualElement.projection;
    const { drag, layoutDependency, layout, layoutId } = newOptions;
    if (!projection || !layout && !layoutId && !drag) {
      return;
    }
    hasLayoutUpdate = true;
    const prevProps = this.state.options;
    if (drag || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0 || core.isDef(isPresent2) && projection.isPresent !== isPresent2) {
      projection.willUpdate();
    }
    if (core.isDef(isPresent2) && isPresent2 !== projection.isPresent) {
      projection.isPresent = isPresent2;
      if (isPresent2) {
        projection.promote();
      } else {
        projection.relegate();
      }
    }
  }
}
function asyncHandler(handler) {
  return (event, info) => {
    if (handler) {
      frame.postRender(() => handler(event, info));
    }
  };
}
class PanGesture extends Feature {
  constructor() {
    super(...arguments);
    this.removePointerDownListener = noop;
  }
  onPointerDown(pointerDownEvent) {
    this.session = new PanSession(
      pointerDownEvent,
      this.createPanHandlers(),
      {
        transformPagePoint: this.state.visualElement.getTransformPagePoint(),
        contextWindow: getContextWindow(this.state.visualElement)
      }
    );
  }
  createPanHandlers() {
    return {
      onSessionStart: asyncHandler((_, info) => {
        const { onPanSessionStart } = this.state.options;
        onPanSessionStart && onPanSessionStart(_, info);
      }),
      onStart: asyncHandler((_, info) => {
        const { onPanStart } = this.state.options;
        onPanStart && onPanStart(_, info);
      }),
      onMove: (event, info) => {
        const { onPan } = this.state.options;
        onPan && onPan(event, info);
      },
      onEnd: (event, info) => {
        const { onPanEnd } = this.state.options;
        delete this.session;
        if (onPanEnd) {
          frame.postRender(() => onPanEnd(event, info));
        }
      }
    };
  }
  mount() {
    this.removePointerDownListener = addPointerEvent(
      this.state.element,
      "pointerdown",
      this.onPointerDown.bind(this)
    );
  }
  update() {
  }
  unmount() {
    this.removePointerDownListener();
    this.session && this.session.end();
  }
}
class FeatureManager {
  constructor(state) {
    this.features = [];
    const { features = [], lazyMotionContext } = state.options;
    const allFeatures = features.concat(lazyMotionContext.features.value);
    this.features = allFeatures.map((Feature2) => new Feature2(state));
    const featureInstances = this.features;
    vue.watch(lazyMotionContext.features, (features2) => {
      features2.forEach((feature) => {
        if (!allFeatures.includes(feature)) {
          allFeatures.push(feature);
          const featureInstance = new feature(state);
          featureInstances.push(featureInstance);
          if (state.isMounted()) {
            featureInstance.beforeMount();
            featureInstance.mount();
          }
        }
      });
    }, {
      flush: "pre"
    });
  }
  mount() {
    this.features.forEach((feature) => feature.mount());
  }
  beforeMount() {
    this.features.forEach((feature) => {
      var _a2;
      return (_a2 = feature.beforeMount) == null ? void 0 : _a2.call(feature);
    });
  }
  unmount() {
    this.features.forEach((feature) => feature.unmount());
  }
  update() {
    this.features.forEach((feature) => {
      var _a2;
      return (_a2 = feature.update) == null ? void 0 : _a2.call(feature);
    });
  }
  beforeUpdate(options) {
    this.features.forEach((feature) => {
      var _a2;
      return (_a2 = feature.beforeUpdate) == null ? void 0 : _a2.call(feature, options);
    });
  }
  beforeUnmount() {
    this.features.forEach((feature) => feature.beforeUnmount());
  }
}
function isAnimationControls(v) {
  return v !== null && typeof v === "object" && typeof v.start === "function";
}
function motionEvent(name, target, isExit) {
  return new CustomEvent(name, { detail: { target, isExit } });
}
const rotation = {
  syntax: "<angle>",
  initialValue: "0deg",
  toDefaultUnit: (v) => `${v}deg`
};
const baseTransformProperties = {
  translate: {
    syntax: "<length-percentage>",
    initialValue: "0px",
    toDefaultUnit: (v) => `${v}px`
  },
  rotate: rotation,
  scale: {
    syntax: "<number>",
    initialValue: 1,
    toDefaultUnit: noopReturn
  },
  skew: rotation
};
const order = ["translate", "scale", "rotate", "skew"];
const axes = ["", "X", "Y", "Z"];
const transformDefinitions = /* @__PURE__ */ new Map();
const transforms = ["transformPerspective", "x", "y", "z", "translateX", "translateY", "translateZ", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"];
order.forEach((name) => {
  axes.forEach((axis) => {
    transforms.push(name + axis);
    transformDefinitions.set(
      name + axis,
      baseTransformProperties[name]
    );
  });
});
const transformLookup = new Set(transforms);
const isTransform = (name) => transformLookup.has(name);
const transformAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ"
};
function compareTransformOrder([a], [b]) {
  return transforms.indexOf(a) - transforms.indexOf(b);
}
function transformListToString(template, [name, value]) {
  return `${template} ${name}(${value})`;
}
function buildTransformTemplate(transforms2) {
  return transforms2.sort(compareTransformOrder).reduce(transformListToString, "").trim();
}
const transformResetValue = {
  translate: [0, 0],
  rotate: 0,
  scale: 1,
  skew: 0,
  x: 0,
  y: 0,
  z: 0
};
const style = {
  get: (element, name) => {
    let value = isCssVar(name) ? element.style.getPropertyValue(name) : getComputedStyle(element)[name];
    if (!value && value !== "0") {
      const definition = transformDefinitions.get(name);
      if (definition)
        value = definition.initialValue;
    }
    return value;
  },
  set: (element, name, value) => {
    if (isCssVar(name)) {
      element.style.setProperty(name, value);
    } else {
      element.style[name] = value;
    }
  }
};
function createStyles(keyframes2) {
  var _a2;
  const initialKeyframes = {};
  const transforms2 = [];
  for (let key in keyframes2) {
    let value = keyframes2[key];
    value = isMotionValue(value) ? value.get() : value;
    if (isTransform(key)) {
      if (key in transformAlias) {
        key = transformAlias[key];
      }
    }
    let initialKeyframe = Array.isArray(value) ? value[0] : value;
    const definition = transformDefinitions.get(key);
    if (definition) {
      initialKeyframe = isNumber(value) ? (_a2 = definition.toDefaultUnit) == null ? void 0 : _a2.call(definition, value) : value;
      transforms2.push([key, initialKeyframe]);
    } else {
      initialKeyframes[key] = initialKeyframe;
    }
  }
  if (transforms2.length) {
    initialKeyframes.transform = buildTransformTemplate(transforms2);
  }
  if (Object.keys(initialKeyframes).length === 0) {
    return null;
  }
  return initialKeyframes;
}
const SVG_STYLE_TO_ATTRIBUTES = {
  "fill": true,
  "stroke": true,
  "opacity": true,
  "stroke-width": true,
  "fill-opacity": true,
  "stroke-opacity": true,
  "stroke-linecap": true,
  "stroke-linejoin": true,
  "stroke-dasharray": true,
  "stroke-dashoffset": true,
  "cx": true,
  "cy": true,
  "r": true,
  "d": true,
  "x1": true,
  "y1": true,
  "x2": true,
  "y2": true,
  "points": true,
  "path-length": true,
  "viewBox": true,
  "width": true,
  "height": true,
  "preserve-aspect-ratio": true,
  "clip-path": true,
  "filter": true,
  "mask": true,
  "stop-color": true,
  "stop-opacity": true,
  "gradient-transform": true,
  "gradient-units": true,
  "spread-method": true,
  "marker-end": true,
  "marker-mid": true,
  "marker-start": true,
  "text-anchor": true,
  "dominant-baseline": true,
  "font-family": true,
  "font-size": true,
  "font-weight": true,
  "letter-spacing": true,
  "vector-effect": true
};
function camelToKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
function buildSVGPath(attrs, length, spacing = 1, offset = 0) {
  attrs.pathLength = 1;
  delete attrs["path-length"];
  attrs["stroke-dashoffset"] = px.transform(-offset);
  const pathLength = px.transform(length);
  const pathSpacing = px.transform(spacing);
  attrs["stroke-dasharray"] = `${pathLength} ${pathSpacing}`;
}
function convertSvgStyleToAttributes(keyframes2) {
  const attrs = {};
  const styleProps = {};
  for (const key in keyframes2) {
    const kebabKey = camelToKebab(key);
    if (kebabKey in SVG_STYLE_TO_ATTRIBUTES) {
      const value = keyframes2[key];
      attrs[kebabKey] = isMotionValue(value) ? value.get() : value;
    } else {
      styleProps[key] = keyframes2[key];
    }
  }
  if (attrs["path-length"] !== void 0) {
    buildSVGPath(attrs, attrs["path-length"], attrs["path-spacing"], attrs["path-offset"]);
  }
  return {
    attrs,
    style: styleProps
  };
}
function createVisualElement(Component, options) {
  return isSVGElement(Component) ? new SVGVisualElement(options) : new HTMLVisualElement(options);
}
function calcChildStagger(children, child, delayChildren, staggerChildren = 0, staggerDirection = 1) {
  const sortedChildren = Array.from(children);
  const index = sortedChildren.indexOf(child);
  const numChildren = children.size;
  const maxStaggerDuration = (numChildren - 1) * staggerChildren;
  const delayIsFunction = typeof delayChildren === "function";
  if (index === sortedChildren.length - 1) {
    child.parent.enteringChildren = void 0;
  }
  return delayIsFunction ? delayChildren(index, numChildren) : staggerDirection === 1 ? index * staggerChildren : maxStaggerDuration - index * staggerChildren;
}
const STATE_TYPES = ["initial", "animate", "whileInView", "whileHover", "whilePress", "whileDrag", "whileFocus", "exit"];
class AnimationFeature extends Feature {
  constructor(state) {
    var _a2, _b;
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
      parent: (_a2 = this.state.parent) == null ? void 0 : _a2.visualElement,
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
    const animationTarget2 = { ...this.state.target };
    const element = this.state.element;
    const finishAnimation2 = (animationPromise) => {
      var _a2, _b;
      if (isExit) {
        this.state.isExiting = true;
      }
      element.dispatchEvent(motionEvent("motionstart", animationTarget2));
      (_b = (_a2 = this.state.options).onAnimationStart) == null ? void 0 : _b.call(_a2, animationTarget2);
      animationPromise.then(() => {
        var _a3, _b2, _c, _d;
        if (isExit) {
          this.state.isExiting = false;
          const presenceContext = this.state.options.animatePresenceContext;
          if ((presenceContext == null ? void 0 : presenceContext.onMotionExitComplete) && this.state.presenceContainer) {
            const state = this.state;
            const projection = state.visualElement.projection;
            if (!(((_a3 = state.options) == null ? void 0 : _a3.layoutId) && ((_b2 = projection.currentAnimation) == null ? void 0 : _b2.state) === "running" && !state.options.exit)) {
              presenceContext.onMotionExitComplete(state.presenceContainer, state);
            }
          }
        }
        element.dispatchEvent(motionEvent("motioncomplete", animationTarget2, isExit));
        (_d = (_c = this.state.options).onAnimationComplete) == null ? void 0 : _d.call(_c, animationTarget2);
      }).catch(noop);
    };
    const getAnimationPromise = () => {
      const animationPromise = (transition == null ? void 0 : transition.when) ? (transition.when === "beforeChildren" ? getAnimation() : getChildAnimations()).then(() => transition.when === "beforeChildren" ? getChildAnimations() : getAnimation()) : Promise.all([getAnimation(), getChildAnimations()]);
      finishAnimation2(animationPromise);
      return animationPromise;
    };
    return controlActiveState ? getAnimationPromise : getAnimationPromise();
  }
  /**
   * Setup child animations
   */
  setupChildAnimations(transition, controlActiveState) {
    var _a2;
    const visualElement = this.state.visualElement;
    if (!((_a2 = visualElement.variantChildren) == null ? void 0 : _a2.size) || !controlActiveState)
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
      var _a2;
      if (!hasChanged(prevTarget[key], this.state.target[key]))
        return;
      (_a2 = this.state.baseTarget)[key] ?? (_a2[key] = style.get(this.state.element, key));
      const keyValue = this.state.target[key] === "none" && core.isDef(transformResetValue[key]) ? transformResetValue[key] : this.state.target[key];
      factories.push(() => {
        var _a3;
        return animate(
          this.state.element,
          { [key]: keyValue },
          {
            ...(animationOptions == null ? void 0 : animationOptions[key]) || animationOptions,
            delay: (((_a3 = animationOptions == null ? void 0 : animationOptions[key]) == null ? void 0 : _a3.delay) || (animationOptions == null ? void 0 : animationOptions.delay) || 0) + controlDelay
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
      let resolvedVariant = core.isDef(definition) ? resolveVariant(definition, variants, customValue) : void 0;
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
    var _a2, _b;
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
    if (((_a2 = this.state.parent) == null ? void 0 : _a2.isMounted()) && !visualElement.isControllingVariants && ((_b = parentVisualElement == null ? void 0 : parentVisualElement.enteringChildren) == null ? void 0 : _b.has(visualElement))) {
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
    var _a2;
    (_a2 = this.unmountControls) == null ? void 0 : _a2.call(this);
  }
}
class FocusGesture extends Feature {
  constructor() {
    super(...arguments);
    this.isActive = false;
  }
  onFocus() {
    let isFocusVisible = false;
    try {
      isFocusVisible = this.state.element.matches(":focus-visible");
    } catch (e) {
      isFocusVisible = true;
    }
    if (!isFocusVisible)
      return;
    this.state.setActive("whileFocus", true);
    this.isActive = true;
  }
  onBlur() {
    if (!this.isActive)
      return;
    this.state.setActive("whileFocus", false);
    this.isActive = false;
  }
  mount() {
    this.unmount = pipe(
      addDomEvent$1(this.state.element, "focus", () => this.onFocus()),
      addDomEvent$1(this.state.element, "blur", () => this.onBlur())
    );
  }
}
const compareByDepth = (a, b) => a.depth - b.depth;
class FlatTree {
  constructor() {
    this.children = [];
    this.isDirty = false;
  }
  add(child) {
    addUniqueItem(this.children, child);
    this.isDirty = true;
  }
  remove(child) {
    removeItem(this.children, child);
    this.isDirty = true;
  }
  forEach(callback) {
    this.isDirty && this.children.sort(compareByDepth);
    this.isDirty = false;
    this.children.forEach(callback);
  }
}
function resolveMotionValue(value) {
  return isMotionValue(value) ? value.get() : value;
}
const borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
const numBorders = borders.length;
const asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
const isPx = (value) => typeof value === "number" || px.test(value);
function mixValues(target, follow, lead, progress2, shouldCrossfadeOpacity, isOnlyMember) {
  if (shouldCrossfadeOpacity) {
    target.opacity = mixNumber$1(0, lead.opacity ?? 1, easeCrossfadeIn(progress2));
    target.opacityExit = mixNumber$1(follow.opacity ?? 1, 0, easeCrossfadeOut(progress2));
  } else if (isOnlyMember) {
    target.opacity = mixNumber$1(follow.opacity ?? 1, lead.opacity ?? 1, progress2);
  }
  for (let i = 0; i < numBorders; i++) {
    const borderLabel = `border${borders[i]}Radius`;
    let followRadius = getRadius(follow, borderLabel);
    let leadRadius = getRadius(lead, borderLabel);
    if (followRadius === void 0 && leadRadius === void 0)
      continue;
    followRadius || (followRadius = 0);
    leadRadius || (leadRadius = 0);
    const canMix = followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius);
    if (canMix) {
      target[borderLabel] = Math.max(mixNumber$1(asNumber(followRadius), asNumber(leadRadius), progress2), 0);
      if (percent.test(leadRadius) || percent.test(followRadius)) {
        target[borderLabel] += "%";
      }
    } else {
      target[borderLabel] = leadRadius;
    }
  }
  if (follow.rotate || lead.rotate) {
    target.rotate = mixNumber$1(follow.rotate || 0, lead.rotate || 0, progress2);
  }
}
function getRadius(values, radiusName) {
  return values[radiusName] !== void 0 ? values[radiusName] : values.borderRadius;
}
const easeCrossfadeIn = /* @__PURE__ */ compress(0, 0.5, circOut);
const easeCrossfadeOut = /* @__PURE__ */ compress(0.5, 0.95, noop);
function compress(min, max, easing) {
  return (p) => {
    if (p < min)
      return 0;
    if (p > max)
      return 1;
    return easing(/* @__PURE__ */ progress(min, max, p));
  };
}
function copyAxisInto(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
function copyBoxInto(box, originBox) {
  copyAxisInto(box.x, originBox.x);
  copyAxisInto(box.y, originBox.y);
}
function copyAxisDeltaInto(delta, originDelta) {
  delta.translate = originDelta.translate;
  delta.scale = originDelta.scale;
  delta.originPoint = originDelta.originPoint;
  delta.origin = originDelta.origin;
}
const SCALE_PRECISION = 1e-4;
const SCALE_MIN = 1 - SCALE_PRECISION;
const SCALE_MAX = 1 + SCALE_PRECISION;
const TRANSLATE_PRECISION = 0.01;
const TRANSLATE_MIN = 0 - TRANSLATE_PRECISION;
const TRANSLATE_MAX = 0 + TRANSLATE_PRECISION;
function calcLength(axis) {
  return axis.max - axis.min;
}
function isNear(value, target, maxDistance) {
  return Math.abs(value - target) <= maxDistance;
}
function calcAxisDelta(delta, source, target, origin = 0.5) {
  delta.origin = origin;
  delta.originPoint = mixNumber$1(source.min, source.max, delta.origin);
  delta.scale = calcLength(target) / calcLength(source);
  delta.translate = mixNumber$1(target.min, target.max, delta.origin) - delta.originPoint;
  if (delta.scale >= SCALE_MIN && delta.scale <= SCALE_MAX || isNaN(delta.scale)) {
    delta.scale = 1;
  }
  if (delta.translate >= TRANSLATE_MIN && delta.translate <= TRANSLATE_MAX || isNaN(delta.translate)) {
    delta.translate = 0;
  }
}
function calcBoxDelta(delta, source, target, origin) {
  calcAxisDelta(delta.x, source.x, target.x, origin ? origin.originX : void 0);
  calcAxisDelta(delta.y, source.y, target.y, origin ? origin.originY : void 0);
}
function calcRelativeAxis(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent) {
  calcRelativeAxis(target.x, relative.x, parent.x);
  calcRelativeAxis(target.y, relative.y, parent.y);
}
function calcRelativeAxisPosition(target, layout, parent) {
  target.min = layout.min - parent.min;
  target.max = target.min + calcLength(layout);
}
function calcRelativePosition(target, layout, parent) {
  calcRelativeAxisPosition(target.x, layout.x, parent.x);
  calcRelativeAxisPosition(target.y, layout.y, parent.y);
}
function removePointDelta(point2, translate, scale2, originPoint, boxScale) {
  point2 -= translate;
  point2 = scalePoint(point2, 1 / scale2, originPoint);
  if (boxScale !== void 0) {
    point2 = scalePoint(point2, 1 / boxScale, originPoint);
  }
  return point2;
}
function removeAxisDelta(axis, translate = 0, scale2 = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
  if (percent.test(translate)) {
    translate = parseFloat(translate);
    const relativeProgress = mixNumber$1(sourceAxis.min, sourceAxis.max, translate / 100);
    translate = relativeProgress - sourceAxis.min;
  }
  if (typeof translate !== "number")
    return;
  let originPoint = mixNumber$1(originAxis.min, originAxis.max, origin);
  if (axis === originAxis)
    originPoint -= translate;
  axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms2, [key, scaleKey, originKey], origin, sourceAxis) {
  removeAxisDelta(axis, transforms2[key], transforms2[scaleKey], transforms2[originKey], transforms2.scale, origin, sourceAxis);
}
const xKeys = ["x", "scaleX", "originX"];
const yKeys = ["y", "scaleY", "originY"];
function removeBoxTransforms(box, transforms2, originBox, sourceBox) {
  removeAxisTransforms(box.x, transforms2, xKeys, originBox ? originBox.x : void 0, sourceBox ? sourceBox.x : void 0);
  removeAxisTransforms(box.y, transforms2, yKeys, originBox ? originBox.y : void 0, sourceBox ? sourceBox.y : void 0);
}
function isAxisDeltaZero(delta) {
  return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
  return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function axisEquals(a, b) {
  return a.min === b.min && a.max === b.max;
}
function boxEquals(a, b) {
  return axisEquals(a.x, b.x) && axisEquals(a.y, b.y);
}
function axisEqualsRounded(a, b) {
  return Math.round(a.min) === Math.round(b.min) && Math.round(a.max) === Math.round(b.max);
}
function boxEqualsRounded(a, b) {
  return axisEqualsRounded(a.x, b.x) && axisEqualsRounded(a.y, b.y);
}
function aspectRatio(box) {
  return calcLength(box.x) / calcLength(box.y);
}
function axisDeltaEquals(a, b) {
  return a.translate === b.translate && a.scale === b.scale && a.originPoint === b.originPoint;
}
class NodeStack {
  constructor() {
    this.members = [];
  }
  add(node) {
    addUniqueItem(this.members, node);
    node.scheduleRender();
  }
  remove(node) {
    removeItem(this.members, node);
    if (node === this.prevLead) {
      this.prevLead = void 0;
    }
    if (node === this.lead) {
      const prevLead = this.members[this.members.length - 1];
      if (prevLead) {
        this.promote(prevLead);
      }
    }
  }
  relegate(node) {
    const indexOfNode = this.members.findIndex((member) => node === member);
    if (indexOfNode === 0)
      return false;
    let prevLead;
    for (let i = indexOfNode; i >= 0; i--) {
      const member = this.members[i];
      if (member.isPresent !== false) {
        prevLead = member;
        break;
      }
    }
    if (prevLead) {
      this.promote(prevLead);
      return true;
    } else {
      return false;
    }
  }
  promote(node, preserveFollowOpacity) {
    const prevLead = this.lead;
    if (node === prevLead)
      return;
    this.prevLead = prevLead;
    this.lead = node;
    node.show();
    if (prevLead) {
      prevLead.instance && prevLead.scheduleRender();
      node.scheduleRender();
      node.resumeFrom = prevLead;
      if (preserveFollowOpacity) {
        node.resumeFrom.preserveOpacity = true;
      }
      if (prevLead.snapshot) {
        node.snapshot = prevLead.snapshot;
        node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
      }
      if (node.root && node.root.isUpdating) {
        node.isLayoutDirty = true;
      }
      const { crossfade } = node.options;
      if (crossfade === false) {
        prevLead.hide();
      }
    }
  }
  exitAnimationComplete() {
    this.members.forEach((node) => {
      const { options, resumingFrom } = node;
      options.onExitComplete && options.onExitComplete();
      if (resumingFrom) {
        resumingFrom.options.onExitComplete && resumingFrom.options.onExitComplete();
      }
    });
  }
  scheduleRender() {
    this.members.forEach((node) => {
      node.instance && node.scheduleRender(false);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    if (this.lead && this.lead.snapshot) {
      this.lead.snapshot = void 0;
    }
  }
}
function buildProjectionTransform(delta, treeScale, latestTransform) {
  let transform2 = "";
  const xTranslate = delta.x.translate / treeScale.x;
  const yTranslate = delta.y.translate / treeScale.y;
  const zTranslate = (latestTransform == null ? void 0 : latestTransform.z) || 0;
  if (xTranslate || yTranslate || zTranslate) {
    transform2 = `translate3d(${xTranslate}px, ${yTranslate}px, ${zTranslate}px) `;
  }
  if (treeScale.x !== 1 || treeScale.y !== 1) {
    transform2 += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
  }
  if (latestTransform) {
    const { transformPerspective, rotate: rotate2, rotateX, rotateY, skewX, skewY } = latestTransform;
    if (transformPerspective)
      transform2 = `perspective(${transformPerspective}px) ${transform2}`;
    if (rotate2)
      transform2 += `rotate(${rotate2}deg) `;
    if (rotateX)
      transform2 += `rotateX(${rotateX}deg) `;
    if (rotateY)
      transform2 += `rotateY(${rotateY}deg) `;
    if (skewX)
      transform2 += `skewX(${skewX}deg) `;
    if (skewY)
      transform2 += `skewY(${skewY}deg) `;
  }
  const elementScaleX = delta.x.scale * treeScale.x;
  const elementScaleY = delta.y.scale * treeScale.y;
  if (elementScaleX !== 1 || elementScaleY !== 1) {
    transform2 += `scale(${elementScaleX}, ${elementScaleY})`;
  }
  return transform2 || "none";
}
function eachAxis(callback) {
  return [callback("x"), callback("y")];
}
const metrics = {
  nodes: 0,
  calculatedTargetDeltas: 0,
  calculatedProjections: 0
};
const transformAxes = ["", "X", "Y", "Z"];
const animationTarget = 1e3;
let id$1 = 0;
function resetDistortingTransform(key, visualElement, values, sharedAnimationValues) {
  const { latestValues } = visualElement;
  if (latestValues[key]) {
    values[key] = latestValues[key];
    visualElement.setStaticValue(key, 0);
    if (sharedAnimationValues) {
      sharedAnimationValues[key] = 0;
    }
  }
}
function cancelTreeOptimisedTransformAnimations(projectionNode) {
  projectionNode.hasCheckedOptimisedAppear = true;
  if (projectionNode.root === projectionNode)
    return;
  const { visualElement } = projectionNode.options;
  if (!visualElement)
    return;
  const appearId = getOptimisedAppearId(visualElement);
  if (window.MotionHasOptimisedAnimation(appearId, "transform")) {
    const { layout, layoutId } = projectionNode.options;
    window.MotionCancelOptimisedAnimation(appearId, "transform", frame, !(layout || layoutId));
  }
  const { parent } = projectionNode;
  if (parent && !parent.hasCheckedOptimisedAppear) {
    cancelTreeOptimisedTransformAnimations(parent);
  }
}
function createProjectionNode({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
  return class ProjectionNode {
    constructor(latestValues = {}, parent = defaultParent == null ? void 0 : defaultParent()) {
      this.id = id$1++;
      this.animationId = 0;
      this.animationCommitId = 0;
      this.children = /* @__PURE__ */ new Set();
      this.options = {};
      this.isTreeAnimating = false;
      this.isAnimationBlocked = false;
      this.isLayoutDirty = false;
      this.isProjectionDirty = false;
      this.isSharedProjectionDirty = false;
      this.isTransformDirty = false;
      this.updateManuallyBlocked = false;
      this.updateBlockedByResize = false;
      this.isUpdating = false;
      this.isSVG = false;
      this.needsReset = false;
      this.shouldResetTransform = false;
      this.hasCheckedOptimisedAppear = false;
      this.treeScale = { x: 1, y: 1 };
      this.eventHandlers = /* @__PURE__ */ new Map();
      this.hasTreeAnimated = false;
      this.layoutVersion = 0;
      this.updateScheduled = false;
      this.scheduleUpdate = () => this.update();
      this.projectionUpdateScheduled = false;
      this.checkUpdateFailed = () => {
        if (this.isUpdating) {
          this.isUpdating = false;
          this.clearAllSnapshots();
        }
      };
      this.updateProjection = () => {
        this.projectionUpdateScheduled = false;
        if (statsBuffer.value) {
          metrics.nodes = metrics.calculatedTargetDeltas = metrics.calculatedProjections = 0;
        }
        this.nodes.forEach(propagateDirtyNodes);
        this.nodes.forEach(resolveTargetDelta);
        this.nodes.forEach(calcProjection);
        this.nodes.forEach(cleanDirtyNodes);
        if (statsBuffer.addProjectionMetrics) {
          statsBuffer.addProjectionMetrics(metrics);
        }
      };
      this.resolvedRelativeTargetAt = 0;
      this.linkedParentVersion = 0;
      this.hasProjected = false;
      this.isVisible = true;
      this.animationProgress = 0;
      this.sharedNodes = /* @__PURE__ */ new Map();
      this.latestValues = latestValues;
      this.root = parent ? parent.root || parent : this;
      this.path = parent ? [...parent.path, parent] : [];
      this.parent = parent;
      this.depth = parent ? parent.depth + 1 : 0;
      for (let i = 0; i < this.path.length; i++) {
        this.path[i].shouldResetTransform = true;
      }
      if (this.root === this)
        this.nodes = new FlatTree();
    }
    addEventListener(name, handler) {
      if (!this.eventHandlers.has(name)) {
        this.eventHandlers.set(name, new SubscriptionManager());
      }
      return this.eventHandlers.get(name).add(handler);
    }
    notifyListeners(name, ...args) {
      const subscriptionManager = this.eventHandlers.get(name);
      subscriptionManager && subscriptionManager.notify(...args);
    }
    hasListeners(name) {
      return this.eventHandlers.has(name);
    }
    /**
     * Lifecycles
     */
    mount(instance) {
      if (this.instance)
        return;
      this.isSVG = isSVGElement$1(instance) && !isSVGSVGElement(instance);
      this.instance = instance;
      const { layoutId, layout, visualElement } = this.options;
      if (visualElement && !visualElement.current) {
        visualElement.mount(instance);
      }
      this.root.nodes.add(this);
      this.parent && this.parent.children.add(this);
      if (this.root.hasTreeAnimated && (layout || layoutId)) {
        this.isLayoutDirty = true;
      }
      if (attachResizeListener) {
        let cancelDelay;
        let innerWidth = 0;
        const resizeUnblockUpdate = () => this.root.updateBlockedByResize = false;
        frame.read(() => {
          innerWidth = window.innerWidth;
        });
        attachResizeListener(instance, () => {
          const newInnerWidth = window.innerWidth;
          if (newInnerWidth === innerWidth)
            return;
          innerWidth = newInnerWidth;
          this.root.updateBlockedByResize = true;
          cancelDelay && cancelDelay();
          cancelDelay = delay(resizeUnblockUpdate, 250);
          if (globalProjectionState.hasAnimatedSinceResize) {
            globalProjectionState.hasAnimatedSinceResize = false;
            this.nodes.forEach(finishAnimation);
          }
        });
      }
      if (layoutId) {
        this.root.registerSharedNode(layoutId, this);
      }
      if (this.options.animate !== false && visualElement && (layoutId || layout)) {
        this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeLayoutChanged, layout: newLayout }) => {
          if (this.isTreeAnimationBlocked()) {
            this.target = void 0;
            this.relativeTarget = void 0;
            return;
          }
          const layoutTransition = this.options.transition || visualElement.getDefaultTransition() || defaultLayoutTransition;
          const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
          const hasTargetChanged = !this.targetLayout || !boxEqualsRounded(this.targetLayout, newLayout);
          const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeLayoutChanged;
          if (this.options.layoutRoot || this.resumeFrom || hasOnlyRelativeTargetChanged || hasLayoutChanged && (hasTargetChanged || !this.currentAnimation)) {
            if (this.resumeFrom) {
              this.resumingFrom = this.resumeFrom;
              this.resumingFrom.resumingFrom = void 0;
            }
            const animationOptions = {
              ...getValueTransition$1(layoutTransition, "layout"),
              onPlay: onLayoutAnimationStart,
              onComplete: onLayoutAnimationComplete
            };
            if (visualElement.shouldReduceMotion || this.options.layoutRoot) {
              animationOptions.delay = 0;
              animationOptions.type = false;
            }
            this.startAnimation(animationOptions);
            this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
          } else {
            if (!hasLayoutChanged) {
              finishAnimation(this);
            }
            if (this.isLead() && this.options.onExitComplete) {
              this.options.onExitComplete();
            }
          }
          this.targetLayout = newLayout;
        });
      }
    }
    unmount() {
      this.options.layoutId && this.willUpdate();
      this.root.nodes.remove(this);
      const stack = this.getStack();
      stack && stack.remove(this);
      this.parent && this.parent.children.delete(this);
      this.instance = void 0;
      this.eventHandlers.clear();
      cancelFrame(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = true;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = false;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
    }
    // Note: currently only running on root node
    startUpdate() {
      if (this.isUpdateBlocked())
        return;
      this.isUpdating = true;
      this.nodes && this.nodes.forEach(resetSkewAndRotation);
      this.animationId++;
    }
    getTransformTemplate() {
      const { visualElement } = this.options;
      return visualElement && visualElement.getProps().transformTemplate;
    }
    willUpdate(shouldNotifyListeners = true) {
      this.root.hasTreeAnimated = true;
      if (this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear) {
        cancelTreeOptimisedTransformAnimations(this);
      }
      !this.root.isUpdating && this.root.startUpdate();
      if (this.isLayoutDirty)
        return;
      this.isLayoutDirty = true;
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        node.shouldResetTransform = true;
        node.updateScroll("snapshot");
        if (node.options.layoutRoot) {
          node.willUpdate(false);
        }
      }
      const { layoutId, layout } = this.options;
      if (layoutId === void 0 && !layout)
        return;
      const transformTemplate = this.getTransformTemplate();
      this.prevTransformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
      this.updateSnapshot();
      shouldNotifyListeners && this.notifyListeners("willUpdate");
    }
    update() {
      this.updateScheduled = false;
      const updateWasBlocked = this.isUpdateBlocked();
      if (updateWasBlocked) {
        this.unblockUpdate();
        this.clearAllSnapshots();
        this.nodes.forEach(clearMeasurements);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(clearIsLayoutDirty);
        return;
      }
      this.animationCommitId = this.animationId;
      if (!this.isUpdating) {
        this.nodes.forEach(clearIsLayoutDirty);
      } else {
        this.isUpdating = false;
        this.nodes.forEach(resetTransformStyle);
        this.nodes.forEach(updateLayout);
        this.nodes.forEach(notifyLayoutUpdate);
      }
      this.clearAllSnapshots();
      const now2 = time.now();
      frameData.delta = clamp(0, 1e3 / 60, now2 - frameData.timestamp);
      frameData.timestamp = now2;
      frameData.isProcessing = true;
      frameSteps.update.process(frameData);
      frameSteps.preRender.process(frameData);
      frameSteps.render.process(frameData);
      frameData.isProcessing = false;
    }
    didUpdate() {
      if (!this.updateScheduled) {
        this.updateScheduled = true;
        microtask.read(this.scheduleUpdate);
      }
    }
    clearAllSnapshots() {
      this.nodes.forEach(clearSnapshot);
      this.sharedNodes.forEach(removeLeadSnapshots);
    }
    scheduleUpdateProjection() {
      if (!this.projectionUpdateScheduled) {
        this.projectionUpdateScheduled = true;
        frame.preRender(this.updateProjection, false, true);
      }
    }
    scheduleCheckAfterUnmount() {
      frame.postRender(() => {
        if (this.isLayoutDirty) {
          this.root.didUpdate();
        } else {
          this.root.checkUpdateFailed();
        }
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      if (this.snapshot || !this.instance)
        return;
      this.snapshot = this.measure();
      if (this.snapshot && !calcLength(this.snapshot.measuredBox.x) && !calcLength(this.snapshot.measuredBox.y)) {
        this.snapshot = void 0;
      }
    }
    updateLayout() {
      if (!this.instance)
        return;
      this.updateScroll();
      if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) {
        return;
      }
      if (this.resumeFrom && !this.resumeFrom.instance) {
        for (let i = 0; i < this.path.length; i++) {
          const node = this.path[i];
          node.updateScroll();
        }
      }
      const prevLayout = this.layout;
      this.layout = this.measure(false);
      this.layoutVersion++;
      this.layoutCorrected = createBox$1();
      this.isLayoutDirty = false;
      this.projectionDelta = void 0;
      this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement } = this.options;
      visualElement && visualElement.notify("LayoutMeasure", this.layout.layoutBox, prevLayout ? prevLayout.layoutBox : void 0);
    }
    updateScroll(phase = "measure") {
      let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) {
        needsMeasurement = false;
      }
      if (needsMeasurement && this.instance) {
        const isRoot = checkIsScrollRoot(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase,
          isRoot,
          offset: measureScroll(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : isRoot
        };
      }
    }
    resetTransform() {
      if (!resetTransform)
        return;
      const isResetRequested = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout;
      const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
      const transformTemplate = this.getTransformTemplate();
      const transformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
      const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
      if (isResetRequested && this.instance && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
        resetTransform(this.instance, transformTemplateValue);
        this.shouldResetTransform = false;
        this.scheduleRender();
      }
    }
    measure(removeTransform = true) {
      const pageBox = this.measurePageBox();
      let layoutBox = this.removeElementScroll(pageBox);
      if (removeTransform) {
        layoutBox = this.removeTransform(layoutBox);
      }
      roundBox(layoutBox);
      return {
        animationId: this.root.animationId,
        measuredBox: pageBox,
        layoutBox,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      var _a2;
      const { visualElement } = this.options;
      if (!visualElement)
        return createBox$1();
      const box = visualElement.measureViewportBox();
      const wasInScrollRoot = ((_a2 = this.scroll) == null ? void 0 : _a2.wasRoot) || this.path.some(checkNodeWasScrollRoot);
      if (!wasInScrollRoot) {
        const { scroll: scroll2 } = this.root;
        if (scroll2) {
          translateAxis$1(box.x, scroll2.offset.x);
          translateAxis$1(box.y, scroll2.offset.y);
        }
      }
      return box;
    }
    removeElementScroll(box) {
      var _a2;
      const boxWithoutScroll = createBox$1();
      copyBoxInto(boxWithoutScroll, box);
      if ((_a2 = this.scroll) == null ? void 0 : _a2.wasRoot) {
        return boxWithoutScroll;
      }
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        const { scroll: scroll2, options } = node;
        if (node !== this.root && scroll2 && options.layoutScroll) {
          if (scroll2.wasRoot) {
            copyBoxInto(boxWithoutScroll, box);
          }
          translateAxis$1(boxWithoutScroll.x, scroll2.offset.x);
          translateAxis$1(boxWithoutScroll.y, scroll2.offset.y);
        }
      }
      return boxWithoutScroll;
    }
    applyTransform(box, transformOnly = false) {
      const withTransforms = createBox$1();
      copyBoxInto(withTransforms, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) {
          transformBox(withTransforms, {
            x: -node.scroll.offset.x,
            y: -node.scroll.offset.y
          });
        }
        if (!hasTransform(node.latestValues))
          continue;
        transformBox(withTransforms, node.latestValues);
      }
      if (hasTransform(this.latestValues)) {
        transformBox(withTransforms, this.latestValues);
      }
      return withTransforms;
    }
    removeTransform(box) {
      const boxWithoutTransform = createBox$1();
      copyBoxInto(boxWithoutTransform, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        if (!node.instance)
          continue;
        if (!hasTransform(node.latestValues))
          continue;
        hasScale(node.latestValues) && node.updateSnapshot();
        const sourceBox = createBox$1();
        const nodeBox = node.measurePageBox();
        copyBoxInto(sourceBox, nodeBox);
        removeBoxTransforms(boxWithoutTransform, node.latestValues, node.snapshot ? node.snapshot.layoutBox : void 0, sourceBox);
      }
      if (hasTransform(this.latestValues)) {
        removeBoxTransforms(boxWithoutTransform, this.latestValues);
      }
      return boxWithoutTransform;
    }
    setTargetDelta(delta) {
      this.targetDelta = delta;
      this.root.scheduleUpdateProjection();
      this.isProjectionDirty = true;
    }
    setOptions(options) {
      this.options = {
        ...this.options,
        ...options,
        crossfade: options.crossfade !== void 0 ? options.crossfade : true
      };
    }
    clearMeasurements() {
      this.scroll = void 0;
      this.layout = void 0;
      this.snapshot = void 0;
      this.prevTransformTemplateValue = void 0;
      this.targetDelta = void 0;
      this.target = void 0;
      this.isLayoutDirty = false;
    }
    forceRelativeParentToResolveTarget() {
      if (!this.relativeParent)
        return;
      if (this.relativeParent.resolvedRelativeTargetAt !== frameData.timestamp) {
        this.relativeParent.resolveTargetDelta(true);
      }
    }
    resolveTargetDelta(forceRecalculation = false) {
      var _a2;
      const lead = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
      this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
      this.isSharedProjectionDirty || (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      const canSkip = !(forceRecalculation || isShared && this.isSharedProjectionDirty || this.isProjectionDirty || ((_a2 = this.parent) == null ? void 0 : _a2.isProjectionDirty) || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize);
      if (canSkip)
        return;
      const { layout, layoutId } = this.options;
      if (!this.layout || !(layout || layoutId))
        return;
      this.resolvedRelativeTargetAt = frameData.timestamp;
      const relativeParent = this.getClosestProjectingParent();
      if (relativeParent && this.linkedParentVersion !== relativeParent.layoutVersion && !relativeParent.options.layoutRoot) {
        this.removeRelativeTarget();
      }
      if (!this.targetDelta && !this.relativeTarget) {
        if (relativeParent && relativeParent.layout) {
          this.createRelativeTarget(relativeParent, this.layout.layoutBox, relativeParent.layout.layoutBox);
        } else {
          this.removeRelativeTarget();
        }
      }
      if (!this.relativeTarget && !this.targetDelta)
        return;
      if (!this.target) {
        this.target = createBox$1();
        this.targetWithTransforms = createBox$1();
      }
      if (this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
        this.forceRelativeParentToResolveTarget();
        calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
      } else if (this.targetDelta) {
        if (Boolean(this.resumingFrom)) {
          this.target = this.applyTransform(this.layout.layoutBox);
        } else {
          copyBoxInto(this.target, this.layout.layoutBox);
        }
        applyBoxDelta(this.target, this.targetDelta);
      } else {
        copyBoxInto(this.target, this.layout.layoutBox);
      }
      if (this.attemptToResolveRelativeTarget) {
        this.attemptToResolveRelativeTarget = false;
        if (relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target && this.animationProgress !== 1) {
          this.createRelativeTarget(relativeParent, this.target, relativeParent.target);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      if (statsBuffer.value) {
        metrics.calculatedTargetDeltas++;
      }
    }
    getClosestProjectingParent() {
      if (!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues)) {
        return void 0;
      }
      if (this.parent.isProjecting()) {
        return this.parent;
      } else {
        return this.parent.getClosestProjectingParent();
      }
    }
    isProjecting() {
      return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(relativeParent, layout, parentLayout) {
      this.relativeParent = relativeParent;
      this.linkedParentVersion = relativeParent.layoutVersion;
      this.forceRelativeParentToResolveTarget();
      this.relativeTarget = createBox$1();
      this.relativeTargetOrigin = createBox$1();
      calcRelativePosition(this.relativeTargetOrigin, layout, parentLayout);
      copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      var _a2;
      const lead = this.getLead();
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      let canSkip = true;
      if (this.isProjectionDirty || ((_a2 = this.parent) == null ? void 0 : _a2.isProjectionDirty)) {
        canSkip = false;
      }
      if (isShared && (this.isSharedProjectionDirty || this.isTransformDirty)) {
        canSkip = false;
      }
      if (this.resolvedRelativeTargetAt === frameData.timestamp) {
        canSkip = false;
      }
      if (canSkip)
        return;
      const { layout, layoutId } = this.options;
      this.isTreeAnimating = Boolean(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation);
      if (!this.isTreeAnimating) {
        this.targetDelta = this.relativeTarget = void 0;
      }
      if (!this.layout || !(layout || layoutId))
        return;
      copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
      const prevTreeScaleX = this.treeScale.x;
      const prevTreeScaleY = this.treeScale.y;
      applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, isShared);
      if (lead.layout && !lead.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1)) {
        lead.target = lead.layout.layoutBox;
        lead.targetWithTransforms = createBox$1();
      }
      const { target } = lead;
      if (!target) {
        if (this.prevProjectionDelta) {
          this.createProjectionDeltas();
          this.scheduleRender();
        }
        return;
      }
      if (!this.projectionDelta || !this.prevProjectionDelta) {
        this.createProjectionDeltas();
      } else {
        copyAxisDeltaInto(this.prevProjectionDelta.x, this.projectionDelta.x);
        copyAxisDeltaInto(this.prevProjectionDelta.y, this.projectionDelta.y);
      }
      calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
      if (this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY || !axisDeltaEquals(this.projectionDelta.x, this.prevProjectionDelta.x) || !axisDeltaEquals(this.projectionDelta.y, this.prevProjectionDelta.y)) {
        this.hasProjected = true;
        this.scheduleRender();
        this.notifyListeners("projectionUpdate", target);
      }
      if (statsBuffer.value) {
        metrics.calculatedProjections++;
      }
    }
    hide() {
      this.isVisible = false;
    }
    show() {
      this.isVisible = true;
    }
    scheduleRender(notifyAll2 = true) {
      var _a2;
      (_a2 = this.options.visualElement) == null ? void 0 : _a2.scheduleRender();
      if (notifyAll2) {
        const stack = this.getStack();
        stack && stack.scheduleRender();
      }
      if (this.resumingFrom && !this.resumingFrom.instance) {
        this.resumingFrom = void 0;
      }
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = createDelta();
      this.projectionDelta = createDelta();
      this.projectionDeltaWithTransform = createDelta();
    }
    setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false) {
      const snapshot = this.snapshot;
      const snapshotLatestValues = snapshot ? snapshot.latestValues : {};
      const mixedValues = { ...this.latestValues };
      const targetDelta = createDelta();
      if (!this.relativeParent || !this.relativeParent.options.layoutRoot) {
        this.relativeTarget = this.relativeTargetOrigin = void 0;
      }
      this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
      const relativeLayout = createBox$1();
      const snapshotSource = snapshot ? snapshot.source : void 0;
      const layoutSource = this.layout ? this.layout.source : void 0;
      const isSharedLayoutAnimation = snapshotSource !== layoutSource;
      const stack = this.getStack();
      const isOnlyMember = !stack || stack.members.length <= 1;
      const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
      this.animationProgress = 0;
      let prevRelativeTarget;
      this.mixTargetDelta = (latest) => {
        const progress2 = latest / 1e3;
        mixAxisDelta(targetDelta.x, delta.x, progress2);
        mixAxisDelta(targetDelta.y, delta.y, progress2);
        this.setTargetDelta(targetDelta);
        if (this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
          calcRelativePosition(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
          mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress2);
          if (prevRelativeTarget && boxEquals(this.relativeTarget, prevRelativeTarget)) {
            this.isProjectionDirty = false;
          }
          if (!prevRelativeTarget)
            prevRelativeTarget = createBox$1();
          copyBoxInto(prevRelativeTarget, this.relativeTarget);
        }
        if (isSharedLayoutAnimation) {
          this.animationValues = mixedValues;
          mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress2, shouldCrossfadeOpacity, isOnlyMember);
        }
        this.root.scheduleUpdateProjection();
        this.scheduleRender();
        this.animationProgress = progress2;
      };
      this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(options) {
      var _a2, _b, _c;
      this.notifyListeners("animationStart");
      (_a2 = this.currentAnimation) == null ? void 0 : _a2.stop();
      (_c = (_b = this.resumingFrom) == null ? void 0 : _b.currentAnimation) == null ? void 0 : _c.stop();
      if (this.pendingAnimation) {
        cancelFrame(this.pendingAnimation);
        this.pendingAnimation = void 0;
      }
      this.pendingAnimation = frame.update(() => {
        globalProjectionState.hasAnimatedSinceResize = true;
        activeAnimations.layout++;
        this.motionValue || (this.motionValue = motionValue(0));
        this.currentAnimation = animateSingleValue(this.motionValue, [0, 1e3], {
          ...options,
          velocity: 0,
          isSync: true,
          onUpdate: (latest) => {
            this.mixTargetDelta(latest);
            options.onUpdate && options.onUpdate(latest);
          },
          onStop: () => {
            activeAnimations.layout--;
          },
          onComplete: () => {
            activeAnimations.layout--;
            options.onComplete && options.onComplete();
            this.completeAnimation();
          }
        });
        if (this.resumingFrom) {
          this.resumingFrom.currentAnimation = this.currentAnimation;
        }
        this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      if (this.resumingFrom) {
        this.resumingFrom.currentAnimation = void 0;
        this.resumingFrom.preserveOpacity = void 0;
      }
      const stack = this.getStack();
      stack && stack.exitAnimationComplete();
      this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
      this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      if (this.currentAnimation) {
        this.mixTargetDelta && this.mixTargetDelta(animationTarget);
        this.currentAnimation.stop();
      }
      this.completeAnimation();
    }
    applyTransformsToTarget() {
      const lead = this.getLead();
      let { targetWithTransforms, target, layout, latestValues } = lead;
      if (!targetWithTransforms || !target || !layout)
        return;
      if (this !== lead && this.layout && layout && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout.layoutBox)) {
        target = this.target || createBox$1();
        const xLength = calcLength(this.layout.layoutBox.x);
        target.x.min = lead.target.x.min;
        target.x.max = target.x.min + xLength;
        const yLength = calcLength(this.layout.layoutBox.y);
        target.y.min = lead.target.y.min;
        target.y.max = target.y.min + yLength;
      }
      copyBoxInto(targetWithTransforms, target);
      transformBox(targetWithTransforms, latestValues);
      calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
    }
    registerSharedNode(layoutId, node) {
      if (!this.sharedNodes.has(layoutId)) {
        this.sharedNodes.set(layoutId, new NodeStack());
      }
      const stack = this.sharedNodes.get(layoutId);
      stack.add(node);
      const config = node.options.initialPromotionConfig;
      node.promote({
        transition: config ? config.transition : void 0,
        preserveFollowOpacity: config && config.shouldPreserveFollowOpacity ? config.shouldPreserveFollowOpacity(node) : void 0
      });
    }
    isLead() {
      const stack = this.getStack();
      return stack ? stack.lead === this : true;
    }
    getLead() {
      var _a2;
      const { layoutId } = this.options;
      return layoutId ? ((_a2 = this.getStack()) == null ? void 0 : _a2.lead) || this : this;
    }
    getPrevLead() {
      var _a2;
      const { layoutId } = this.options;
      return layoutId ? (_a2 = this.getStack()) == null ? void 0 : _a2.prevLead : void 0;
    }
    getStack() {
      const { layoutId } = this.options;
      if (layoutId)
        return this.root.sharedNodes.get(layoutId);
    }
    promote({ needsReset, transition, preserveFollowOpacity } = {}) {
      const stack = this.getStack();
      if (stack)
        stack.promote(this, preserveFollowOpacity);
      if (needsReset) {
        this.projectionDelta = void 0;
        this.needsReset = true;
      }
      if (transition)
        this.setOptions({ transition });
    }
    relegate() {
      const stack = this.getStack();
      if (stack) {
        return stack.relegate(this);
      } else {
        return false;
      }
    }
    resetSkewAndRotation() {
      const { visualElement } = this.options;
      if (!visualElement)
        return;
      let hasDistortingTransform = false;
      const { latestValues } = visualElement;
      if (latestValues.z || latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ || latestValues.skewX || latestValues.skewY) {
        hasDistortingTransform = true;
      }
      if (!hasDistortingTransform)
        return;
      const resetValues = {};
      if (latestValues.z) {
        resetDistortingTransform("z", visualElement, resetValues, this.animationValues);
      }
      for (let i = 0; i < transformAxes.length; i++) {
        resetDistortingTransform(`rotate${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
        resetDistortingTransform(`skew${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
      }
      visualElement.render();
      for (const key in resetValues) {
        visualElement.setStaticValue(key, resetValues[key]);
        if (this.animationValues) {
          this.animationValues[key] = resetValues[key];
        }
      }
      visualElement.scheduleRender();
    }
    applyProjectionStyles(targetStyle, styleProp) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        targetStyle.visibility = "hidden";
        return;
      }
      const transformTemplate = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = false;
        targetStyle.visibility = "";
        targetStyle.opacity = "";
        targetStyle.pointerEvents = resolveMotionValue(styleProp == null ? void 0 : styleProp.pointerEvents) || "";
        targetStyle.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
        return;
      }
      const lead = this.getLead();
      if (!this.projectionDelta || !this.layout || !lead.target) {
        if (this.options.layoutId) {
          targetStyle.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
          targetStyle.pointerEvents = resolveMotionValue(styleProp == null ? void 0 : styleProp.pointerEvents) || "";
        }
        if (this.hasProjected && !hasTransform(this.latestValues)) {
          targetStyle.transform = transformTemplate ? transformTemplate({}, "") : "none";
          this.hasProjected = false;
        }
        return;
      }
      targetStyle.visibility = "";
      const valuesToRender = lead.animationValues || lead.latestValues;
      this.applyTransformsToTarget();
      let transform2 = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
      if (transformTemplate) {
        transform2 = transformTemplate(valuesToRender, transform2);
      }
      targetStyle.transform = transform2;
      const { x, y } = this.projectionDelta;
      targetStyle.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
      if (lead.animationValues) {
        targetStyle.opacity = lead === this ? valuesToRender.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
      } else {
        targetStyle.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
      }
      for (const key in scaleCorrectors) {
        if (valuesToRender[key] === void 0)
          continue;
        const { correct, applyTo, isCSSVariable } = scaleCorrectors[key];
        const corrected = transform2 === "none" ? valuesToRender[key] : correct(valuesToRender[key], lead);
        if (applyTo) {
          const num = applyTo.length;
          for (let i = 0; i < num; i++) {
            targetStyle[applyTo[i]] = corrected;
          }
        } else {
          if (isCSSVariable) {
            this.options.visualElement.renderState.vars[key] = corrected;
          } else {
            targetStyle[key] = corrected;
          }
        }
      }
      if (this.options.layoutId) {
        targetStyle.pointerEvents = lead === this ? resolveMotionValue(styleProp == null ? void 0 : styleProp.pointerEvents) || "" : "none";
      }
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((node) => {
        var _a2;
        return (_a2 = node.currentAnimation) == null ? void 0 : _a2.stop();
      });
      this.root.nodes.forEach(clearMeasurements);
      this.root.sharedNodes.clear();
    }
  };
}
function updateLayout(node) {
  node.updateLayout();
}
function notifyLayoutUpdate(node) {
  var _a2;
  const snapshot = ((_a2 = node.resumeFrom) == null ? void 0 : _a2.snapshot) || node.snapshot;
  if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
    const { layoutBox: layout, measuredBox: measuredLayout } = node.layout;
    const { animationType } = node.options;
    const isShared = snapshot.source !== node.layout.source;
    if (animationType === "size") {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(axisSnapshot);
        axisSnapshot.min = layout[axis].min;
        axisSnapshot.max = axisSnapshot.min + length;
      });
    } else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout)) {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(layout[axis]);
        axisSnapshot.max = axisSnapshot.min + length;
        if (node.relativeTarget && !node.currentAnimation) {
          node.isProjectionDirty = true;
          node.relativeTarget[axis].max = node.relativeTarget[axis].min + length;
        }
      });
    }
    const layoutDelta = createDelta();
    calcBoxDelta(layoutDelta, layout, snapshot.layoutBox);
    const visualDelta = createDelta();
    if (isShared) {
      calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
    } else {
      calcBoxDelta(visualDelta, layout, snapshot.layoutBox);
    }
    const hasLayoutChanged = !isDeltaZero(layoutDelta);
    let hasRelativeLayoutChanged = false;
    if (!node.resumeFrom) {
      const relativeParent = node.getClosestProjectingParent();
      if (relativeParent && !relativeParent.resumeFrom) {
        const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
        if (parentSnapshot && parentLayout) {
          const relativeSnapshot = createBox$1();
          calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
          const relativeLayout = createBox$1();
          calcRelativePosition(relativeLayout, layout, parentLayout.layoutBox);
          if (!boxEqualsRounded(relativeSnapshot, relativeLayout)) {
            hasRelativeLayoutChanged = true;
          }
          if (relativeParent.options.layoutRoot) {
            node.relativeTarget = relativeLayout;
            node.relativeTargetOrigin = relativeSnapshot;
            node.relativeParent = relativeParent;
          }
        }
      }
    }
    node.notifyListeners("didUpdate", {
      layout,
      snapshot,
      delta: visualDelta,
      layoutDelta,
      hasLayoutChanged,
      hasRelativeLayoutChanged
    });
  } else if (node.isLead()) {
    const { onExitComplete } = node.options;
    onExitComplete && onExitComplete();
  }
  node.options.transition = void 0;
}
function propagateDirtyNodes(node) {
  if (statsBuffer.value) {
    metrics.nodes++;
  }
  if (!node.parent)
    return;
  if (!node.isProjecting()) {
    node.isProjectionDirty = node.parent.isProjectionDirty;
  }
  node.isSharedProjectionDirty || (node.isSharedProjectionDirty = Boolean(node.isProjectionDirty || node.parent.isProjectionDirty || node.parent.isSharedProjectionDirty));
  node.isTransformDirty || (node.isTransformDirty = node.parent.isTransformDirty);
}
function cleanDirtyNodes(node) {
  node.isProjectionDirty = node.isSharedProjectionDirty = node.isTransformDirty = false;
}
function clearSnapshot(node) {
  node.clearSnapshot();
}
function clearMeasurements(node) {
  node.clearMeasurements();
}
function clearIsLayoutDirty(node) {
  node.isLayoutDirty = false;
}
function resetTransformStyle(node) {
  const { visualElement } = node.options;
  if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) {
    visualElement.notify("BeforeLayoutMeasure");
  }
  node.resetTransform();
}
function finishAnimation(node) {
  node.finishAnimation();
  node.targetDelta = node.relativeTarget = node.target = void 0;
  node.isProjectionDirty = true;
}
function resolveTargetDelta(node) {
  node.resolveTargetDelta();
}
function calcProjection(node) {
  node.calcProjection();
}
function resetSkewAndRotation(node) {
  node.resetSkewAndRotation();
}
function removeLeadSnapshots(stack) {
  stack.removeLeadSnapshot();
}
function mixAxisDelta(output, delta, p) {
  output.translate = mixNumber$1(delta.translate, 0, p);
  output.scale = mixNumber$1(delta.scale, 1, p);
  output.origin = delta.origin;
  output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p) {
  output.min = mixNumber$1(from.min, to.min, p);
  output.max = mixNumber$1(from.max, to.max, p);
}
function mixBox(output, from, to, p) {
  mixAxis(output.x, from.x, to.x, p);
  mixAxis(output.y, from.y, to.y, p);
}
function hasOpacityCrossfade(node) {
  return node.animationValues && node.animationValues.opacityExit !== void 0;
}
const defaultLayoutTransition = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
};
const userAgentContains = (string) => typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(string);
const roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/") ? Math.round : noop;
function roundAxis(axis) {
  axis.min = roundPoint(axis.min);
  axis.max = roundPoint(axis.max);
}
function roundBox(box) {
  roundAxis(box.x);
  roundAxis(box.y);
}
function shouldAnimatePositionOnly(animationType, snapshot, layout) {
  return animationType === "position" || animationType === "preserve-aspect" && !isNear(aspectRatio(snapshot), aspectRatio(layout), 0.2);
}
function checkNodeWasScrollRoot(node) {
  var _a2;
  return node !== node.root && ((_a2 = node.scroll) == null ? void 0 : _a2.wasRoot);
}
function addDomEvent(target, eventName, handler, options = { passive: true }) {
  target.addEventListener(eventName, handler, options);
  return () => target.removeEventListener(eventName, handler);
}
const DocumentProjectionNode = createProjectionNode({
  attachResizeListener: (ref, notify2) => addDomEvent(ref, "resize", notify2),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => true
});
const rootProjectionNode = {
  current: void 0
};
const HTMLProjectionNode = createProjectionNode({
  measureScroll: (instance) => ({
    x: instance.scrollLeft,
    y: instance.scrollTop
  }),
  defaultParent: () => {
    if (!rootProjectionNode.current) {
      const documentNode = new DocumentProjectionNode({});
      documentNode.mount(window);
      documentNode.setOptions({ layoutScroll: true });
      rootProjectionNode.current = documentNode;
    }
    return rootProjectionNode.current;
  },
  resetTransform: (instance, value) => {
    instance.style.transform = value !== void 0 ? value : "none";
  },
  checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed")
});
function getClosestProjectingNode(visualElement) {
  if (!visualElement)
    return void 0;
  return visualElement.options.allowProjection !== false ? visualElement.projection : getClosestProjectingNode(visualElement.parent);
}
class ProjectionFeature extends Feature {
  constructor(state) {
    super(state);
    addScaleCorrector(defaultScaleCorrector);
  }
  initProjection() {
    const options = this.state.options;
    this.state.visualElement.projection = new HTMLProjectionNode(
      this.state.visualElement.latestValues,
      options["data-framer-portal-id"] ? void 0 : getClosestProjectingNode(this.state.visualElement.parent)
    );
    this.state.visualElement.projection.isPresent = true;
    this.setOptions();
  }
  beforeMount() {
    this.initProjection();
  }
  setOptions() {
    const options = this.state.options;
    const { layoutId, layout, drag = false, dragConstraints = false } = options;
    this.state.visualElement.projection.setOptions({
      layout,
      layoutId,
      alwaysMeasureLayout: Boolean(layoutId) || Boolean(drag) || dragConstraints && isHTMLElement(dragConstraints),
      visualElement: this.state.visualElement,
      animationType: typeof options.layout === "string" ? options.layout : "both",
      // initialPromotionConfig
      layoutRoot: options.layoutRoot,
      layoutScroll: options.layoutScroll,
      crossfade: options.crossfade,
      onExitComplete: () => {
        var _a2, _b;
        if (!((_a2 = this.state.visualElement.projection) == null ? void 0 : _a2.isPresent) && this.state.options.layoutId && !this.state.isExiting) {
          (_b = this.state.options.animatePresenceContext) == null ? void 0 : _b.onMotionExitComplete(this.state.presenceContainer, this.state);
        }
      }
    });
  }
  update() {
    this.setOptions();
  }
  mount() {
    var _a2;
    (_a2 = this.state.visualElement.projection) == null ? void 0 : _a2.mount(this.state.element);
  }
}
const domMax = [
  AnimationFeature,
  PressGesture,
  HoverGesture,
  InViewGesture,
  FocusGesture,
  ProjectionFeature,
  PanGesture,
  DragGesture,
  LayoutFeature
];
const domAnimation = [
  AnimationFeature,
  PressGesture,
  HoverGesture,
  InViewGesture,
  FocusGesture
];
function isVariantLabels(value) {
  return typeof value === "string" || value === false || Array.isArray(value);
}
const mountedStates = /* @__PURE__ */ new WeakMap();
let id = 0;
class MotionState {
  constructor(options, parent) {
    var _a2;
    this.element = null;
    this.isExiting = false;
    this.presenceContainer = null;
    this.children = /* @__PURE__ */ new Set();
    this.activeStates = {
      initial: true,
      animate: true
    };
    this.currentProcess = null;
    this._context = null;
    this.animateUpdates = noop;
    this.id = `motion-state-${id++}`;
    this.options = options;
    this.parent = parent;
    (_a2 = parent == null ? void 0 : parent.children) == null ? void 0 : _a2.add(this);
    const initial = options.initial === void 0 && options.variants ? this.context.initial : options.initial;
    const initialVariantSource = initial === false ? ["initial", "animate"] : ["initial"];
    this.initTarget(initialVariantSource);
    this.featureManager = new FeatureManager(this);
    this.type = isSVGElement(this.options.as) ? "svg" : "html";
  }
  // Get animation context, falling back to parent context for inheritance
  get context() {
    if (!this._context) {
      const handler = {
        get: (target, prop) => {
          var _a2;
          return isVariantLabels(this.options[prop]) ? this.options[prop] : (_a2 = this.parent) == null ? void 0 : _a2.context[prop];
        }
      };
      this._context = new Proxy({}, handler);
    }
    return this._context;
  }
  // Initialize animation target values
  initTarget(initialVariantSource) {
    var _a2;
    const custom = this.options.custom ?? ((_a2 = this.options.animatePresenceContext) == null ? void 0 : _a2.custom);
    this.baseTarget = initialVariantSource.reduce((acc, variant) => {
      return {
        ...acc,
        ...resolveVariant(this.options[variant] || this.context[variant], this.options.variants, custom)
      };
    }, {});
    this.target = {};
  }
  // Update visual element with new options
  updateOptions(options) {
    var _a2;
    this.options = options;
    (_a2 = this.visualElement) == null ? void 0 : _a2.update({
      ...this.options,
      whileTap: this.options.whilePress
    }, null);
  }
  // Called before mounting, executes in parent-to-child order
  beforeMount() {
    this.featureManager.beforeMount();
  }
  // Mount motion state to DOM element, handles parent-child relationships
  mount(element, options, notAnimate = false) {
    var _a2;
    heyListen.invariant(
      Boolean(element),
      "Animation state must be mounted with valid Element"
    );
    this.element = element;
    this.updateOptions(options);
    this.featureManager.mount();
    if (!notAnimate && this.options.animate) {
      (_a2 = this.startAnimation) == null ? void 0 : _a2.call(this);
    }
  }
  clearAnimation() {
    var _a2, _b;
    this.currentProcess && cancelFrame(this.currentProcess);
    this.currentProcess = null;
    (_b = (_a2 = this.visualElement) == null ? void 0 : _a2.variantChildren) == null ? void 0 : _b.forEach((child) => {
      child.state.clearAnimation();
    });
  }
  // update trigger animation
  startAnimation() {
    this.clearAnimation();
    this.currentProcess = frame.render(() => {
      this.currentProcess = null;
      this.animateUpdates();
    });
  }
  // Called before unmounting, executes in child-to-parent order
  beforeUnmount() {
    this.featureManager.beforeUnmount();
  }
  unmount() {
    var _a2, _b, _c;
    (_b = (_a2 = this.parent) == null ? void 0 : _a2.children) == null ? void 0 : _b.delete(this);
    mountedStates.delete(this.element);
    this.featureManager.unmount();
    (_c = this.visualElement) == null ? void 0 : _c.unmount();
    this.clearAnimation();
  }
  // Called before updating, executes in parent-to-child order
  beforeUpdate(options) {
    this.featureManager.beforeUpdate(options);
  }
  // Update motion state with new options
  update(options) {
    this.updateOptions(options);
    this.featureManager.update();
    this.startAnimation();
  }
  // Set animation state active status and propagate to children
  setActive(name, isActive, isAnimate = true) {
    var _a2;
    if (!this.element || this.activeStates[name] === isActive)
      return;
    this.activeStates[name] = isActive;
    (_a2 = this.visualElement.variantChildren) == null ? void 0 : _a2.forEach((child) => {
      child.state.setActive(name, isActive, false);
    });
    if (isAnimate) {
      this.animateUpdates({
        isExit: name === "exit" && this.activeStates.exit
      });
    }
  }
  isMounted() {
    return Boolean(this.element);
  }
  getSnapshot(options, isPresent2) {
  }
  didUpdate(label) {
  }
}
function useMotionState(props) {
  var _a2;
  const parentState = injectMotion(null);
  const layoutGroup = injectLayoutGroup({});
  const config = useMotionConfig();
  const animatePresenceContext = injectAnimatePresence({});
  const lazyMotionContext = useLazyMotionContext({
    features: vue.ref([]),
    strict: false
  });
  if (process.env.NODE_ENV !== "production" && ((_a2 = props.features) == null ? void 0 : _a2.length) && lazyMotionContext.strict) {
    const strictMessage = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
    props.ignoreStrict ? heyListen.warning(false, strictMessage) : heyListen.invariant(false, strictMessage);
  }
  const attrs = vue.useAttrs();
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
    var _a3;
    const isSVG = state.type === "svg";
    const attrsProps = { ...attrs };
    Object.keys(attrs).forEach((key) => {
      if (isMotionValue(attrs[key]))
        attrsProps[key] = attrs[key].get();
    });
    let styleProps = {
      ...props.style,
      ...isSVG ? {} : ((_a3 = state.visualElement) == null ? void 0 : _a3.latestValues) || state.baseTarget
    };
    if (isSVG) {
      const { attrs: attrs2, style: style22 } = convertSvgStyleToAttributes({
        ...state.isMounted() ? state.target : state.baseTarget,
        ...styleProps
      });
      if (style22.transform || attrs2.transformOrigin) {
        style22.transformOrigin = attrs2.transformOrigin ?? "50% 50%";
        delete attrs2.transformOrigin;
      }
      if (style22.transform) {
        style22.transformBox = style22.transformBox ?? "fill-box";
        delete attrs2.transformBox;
      }
      Object.assign(attrsProps, attrs2);
      styleProps = style22;
    }
    if (props.drag && props.dragListener !== false) {
      Object.assign(styleProps, {
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
        touchAction: props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`
      });
    }
    const style2 = createStyles(styleProps);
    if (style2)
      attrsProps.style = style2;
    return attrsProps;
  }
  const instance = vue.getCurrentInstance().proxy;
  vue.onBeforeMount(() => {
    state.beforeMount();
  });
  vue.onMounted(() => {
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
  vue.onBeforeUnmount(() => state.beforeUnmount());
  vue.onUnmounted(() => {
    if (animatePresenceContext.unregisterPending) {
      animatePresenceContext.unregisterPending(state);
    }
    const el = getMotionElement(instance.$el);
    if (!(el == null ? void 0 : el.isConnected)) {
      state.unmount();
    }
  });
  vue.onBeforeUpdate(() => {
    state.beforeUpdate(getMotionProps());
  });
  vue.onUpdated(() => {
    state.update(getMotionProps());
  });
  return {
    getProps,
    getAttrs,
    layoutGroup,
    state
  };
}
const MotionComponentProps = {
  "ignoreStrict": { type: Boolean },
  "forwardMotionProps": { type: Boolean, default: false },
  "asChild": { type: Boolean, default: false },
  "hover": { type: [String, Array, Object] },
  "press": { type: [String, Array, Object] },
  "inView": { type: [String, Array, Object] },
  "focus": { type: [String, Array, Object] },
  "whileDrag": { type: [String, Array, Object] },
  "whileHover": { type: [String, Array, Object], default: ({ hover: hover2 }) => {
    if (process.env.NODE_ENV === "development" && hover2) {
      heyListen.warning(true, "hover is deprecated. Use whileHover instead.");
    }
    return hover2;
  } },
  "whilePress": { type: [String, Array, Object], default: ({ press: press2 }) => {
    if (process.env.NODE_ENV === "development" && press2) {
      heyListen.warning(true, "press is deprecated. Use whilePress instead.");
    }
    return press2;
  } },
  "whileInView": { type: [String, Array, Object], default: ({ inView: inView2 }) => {
    if (process.env.NODE_ENV === "development" && inView2) {
      heyListen.warning(true, "inView is deprecated. Use whileInView instead.");
    }
    return inView2;
  } },
  "whileFocus": { type: [String, Array, Object], default: ({ focus }) => {
    if (process.env.NODE_ENV === "development" && focus) {
      heyListen.warning(true, "focus is deprecated. Use whileFocus instead.");
    }
    return focus;
  } },
  "custom": { type: [String, Number, Object, Array] },
  "initial": { type: [String, Array, Object, Boolean], default: void 0 },
  "animate": { type: [String, Array, Object], default: void 0 },
  "exit": { type: [String, Array, Object] },
  "variants": { type: Object },
  "inherit": { type: Boolean },
  "style": { type: Object },
  "transformTemplate": { type: Function },
  "transition": { type: Object },
  "layoutGroup": { type: Object },
  "motionConfig": { type: Object },
  "onAnimationComplete": { type: Function },
  "onUpdate": { type: Function },
  "layout": { type: [Boolean, String], default: false },
  "layoutId": { type: String, default: void 0 },
  "layoutScroll": { type: Boolean, default: false },
  "layoutRoot": { type: Boolean, default: false },
  "data-framer-portal-id": { type: String },
  "crossfade": { type: Boolean, default: true },
  "layoutDependency": { type: null, default: void 0 },
  "onBeforeLayoutMeasure": { type: Function },
  "onLayoutMeasure": { type: Function },
  "onLayoutAnimationStart": { type: Function },
  "onLayoutAnimationComplete": { type: Function },
  "globalPressTarget": { type: Boolean },
  "onPressStart": { type: Function },
  "onPress": { type: Function },
  "onPressCancel": { type: Function },
  "onHoverStart": { type: Function },
  "onHoverEnd": { type: Function },
  "inViewOptions": { type: Object },
  "onViewportEnter": { type: Function },
  "onViewportLeave": { type: Function },
  "drag": { type: [Boolean, String] },
  "dragSnapToOrigin": { type: Boolean },
  "dragDirectionLock": { type: Boolean },
  "dragPropagation": { type: Boolean },
  "dragConstraints": { type: [Boolean, Object] },
  "dragElastic": { type: [Boolean, Number, Object], default: 0.5 },
  "dragMomentum": { type: Boolean, default: true },
  "dragTransition": { type: Object },
  "dragListener": { type: Boolean, default: true },
  "dragControls": { type: Object },
  "onDragStart": { type: Function },
  "onDragEnd": { type: Function },
  "onDrag": { type: Function },
  "onDirectionLock": { type: Function },
  "onDragTransitionEnd": { type: Function },
  "onMeasureDragConstraints": { type: Function },
  "onPanSessionStart": { type: Function },
  "onPanStart": { type: Function },
  "onPan": { type: Function },
  "onPanEnd": { type: Function }
};
function checkMotionIsHidden(instance) {
  var _a2;
  const isHidden = ((_a2 = getMotionElement(instance.$el)) == null ? void 0 : _a2.style.display) === "none";
  const hasTransition = instance.$.vnode.transition;
  return hasTransition && isHidden;
}
const componentMaxCache = /* @__PURE__ */ new Map();
const componentMiniCache = /* @__PURE__ */ new Map();
function renderSlotFragments(fragments) {
  if (!Array.isArray(fragments))
    return [fragments];
  const result = [];
  for (const item of fragments) {
    if (Array.isArray(item))
      result.push(...item);
    else
      result.push(item);
  }
  return result;
}
const SELF_CLOSING_TAGS = ["area", "img", "input"];
function handlePrimitiveAndSlot(asTag, allAttrs, slots) {
  var _a2, _b;
  if (typeof asTag === "string" && SELF_CLOSING_TAGS.includes(asTag)) {
    return vue.h(asTag, allAttrs);
  }
  if (asTag === "template") {
    if (!slots.default)
      return null;
    const childrens = renderSlotFragments(slots.default());
    const firstNonCommentChildrenIndex = childrens.findIndex((child) => child.type !== vue.Comment);
    if (firstNonCommentChildrenIndex === -1)
      return childrens;
    const firstNonCommentChildren = childrens[firstNonCommentChildrenIndex];
    (_a2 = firstNonCommentChildren.props) == null ? true : delete _a2.ref;
    const mergedProps = firstNonCommentChildren.props ? vue.mergeProps(allAttrs, firstNonCommentChildren.props) : allAttrs;
    if (allAttrs.class && ((_b = firstNonCommentChildren.props) == null ? void 0 : _b.class))
      delete firstNonCommentChildren.props.class;
    const cloned = vue.cloneVNode(firstNonCommentChildren, mergedProps);
    for (const prop in mergedProps) {
      if (prop.startsWith("on")) {
        cloned.props || (cloned.props = {});
        cloned.props[prop] = mergedProps[prop];
      }
    }
    if (childrens.length === 1)
      return cloned;
    childrens[firstNonCommentChildrenIndex] = cloned;
    return childrens;
  }
  return null;
}
function createMotionComponent(component, options = {}) {
  var _a2;
  const isString = typeof component === "string";
  const name = isString ? component : component.name || "";
  const componentCache = ((_a2 = options.features) == null ? void 0 : _a2.length) > 0 ? componentMaxCache : componentMiniCache;
  if (isString && (componentCache == null ? void 0 : componentCache.has(component))) {
    return componentCache.get(component);
  }
  const motionComponent = vue.defineComponent({
    inheritAttrs: false,
    props: {
      ...MotionComponentProps,
      features: {
        type: Object,
        default: () => options.features || []
      },
      as: { type: [String, Object], default: component || "div" }
    },
    name: name ? `motion.${name}` : "Motion",
    setup(props, { slots }) {
      const { getProps, getAttrs, state } = useMotionState(props);
      function onVnodeUpdated() {
        const el = state.element;
        const isComponent = typeof props.as === "object";
        if ((!isComponent || props.asChild) && el) {
          const { style: style2 } = getAttrs();
          if (style2) {
            for (const [key, val] of Object.entries(style2)) {
              el.style[key] = val;
            }
          }
        }
      }
      return () => {
        const motionProps = getProps();
        const motionAttrs = getAttrs();
        const asTag = props.asChild ? "template" : props.as;
        const allAttrs = {
          ...options.forwardMotionProps || props.forwardMotionProps ? motionProps : {},
          ...motionAttrs,
          onVnodeUpdated
        };
        const primitiveOrSlotResult = handlePrimitiveAndSlot(asTag, allAttrs, slots);
        if (primitiveOrSlotResult !== null) {
          return primitiveOrSlotResult;
        }
        return vue.h(asTag, {
          ...allAttrs
        }, slots);
      };
    }
  });
  if (isString) {
    componentCache == null ? void 0 : componentCache.set(component, motionComponent);
  }
  return motionComponent;
}
function createMotionComponentWithFeatures(features = []) {
  return new Proxy({}, {
    get(target, prop) {
      if (prop === "create") {
        return (component, options) => createMotionComponent(component, {
          ...options,
          features
        });
      }
      return createMotionComponent(prop, {
        features
      });
    }
  });
}
const motion = createMotionComponentWithFeatures(domMax);
const Motion = motion.create("div");
let popId = 0;
function usePopLayout(props) {
  const styles = /* @__PURE__ */ new WeakMap();
  const config = useMotionConfig();
  function addPopStyle(element) {
    if (props.mode !== "popLayout")
      return;
    const parent = element.offsetParent;
    const parentWidth = parent instanceof HTMLElement ? parent.offsetWidth || 0 : 0;
    const size = {
      height: element.offsetHeight || 0,
      width: element.offsetWidth || 0,
      top: element.offsetTop,
      left: element.offsetLeft,
      right: 0
    };
    size.right = parentWidth - size.width - size.left;
    const x = props.anchorX === "left" ? `left: ${size.left}px` : `right: ${size.right}px`;
    const elementPopId = `pop-${popId++}`;
    element.dataset.motionPopId = elementPopId;
    const style2 = document.createElement("style");
    if (config.value.nonce) {
      style2.nonce = config.value.nonce;
    }
    styles.set(element, style2);
    document.head.appendChild(style2);
    if (style2.sheet) {
      style2.sheet.insertRule(`
    [data-motion-pop-id="${elementPopId}"] {
      position: absolute !important;
      width: ${size.width}px !important;
      height: ${size.height}px !important;
      top: ${size.top}px !important;
      ${x} !important;
      }
      `);
    }
  }
  function removePopStyle(element) {
    const style2 = styles.get(element);
    if (!style2)
      return;
    styles.delete(element);
    frame.render(() => {
      document.head.removeChild(style2);
    });
  }
  return {
    addPopStyle,
    removePopStyle
  };
}
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
  vue.watch(() => props.custom, (v) => {
    presenceContext.custom = v;
  }, { flush: "pre" });
  provideAnimatePresence(presenceContext);
  vue.onMounted(() => {
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
    var _a2, _b, _c, _d, _e;
    removePopStyle(containerState.el);
    containerState.motions.forEach((state) => {
      state.getSnapshot(state.options, false);
    });
    (_a2 = containerState.done) == null ? void 0 : _a2.call(containerState);
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
    var _a2, _b, _c;
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
      (_a2 = props.onExitComplete) == null ? void 0 : _a2.call(props);
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
  vue.onUnmounted(() => {
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
const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "AnimatePresence",
    inheritAttrs: true
  },
  __name: "AnimatePresence",
  props: {
    mode: { default: "sync" },
    initial: { type: Boolean, default: true },
    as: {},
    custom: {},
    onExitComplete: {},
    anchorX: { default: "left" }
  },
  setup(__props) {
    const props = __props;
    const { enter, exit } = usePresenceContainer(props);
    const transitionProps = vue.computed(() => {
      if (props.mode !== "wait") {
        return {
          tag: props.as
        };
      }
      return {
        mode: props.mode === "wait" ? "out-in" : void 0
      };
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.mode === "wait" ? vue.Transition : vue.TransitionGroup), vue.mergeProps(transitionProps.value, {
        appear: "",
        onLeave: vue.unref(exit),
        onEnter: vue.unref(enter)
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["onLeave", "onEnter"]);
    };
  }
});
const [useReorderContext, reorderContextProvider] = createContext("ReorderContext");
function compareMin(a, b) {
  return a.layout.min - b.layout.min;
}
function getValue(item) {
  return item.value;
}
function checkReorder(order2, value, offset, velocity) {
  const index = order2.findIndex((item2) => item2.value === value);
  if (index === -1)
    return order2;
  const direction = velocity !== 0 ? velocity : offset;
  if (!direction)
    return order2;
  const nextOffset = direction > 0 ? 1 : -1;
  const nextItem = order2[index + nextOffset];
  if (!nextItem)
    return order2;
  const item = order2[index];
  const nextLayout = nextItem.layout;
  const nextItemCenter = mixNumber$1(nextLayout.min, nextLayout.max, 0.5);
  if (nextOffset === 1 && item.layout.max + offset > nextItemCenter || nextOffset === -1 && item.layout.min + offset < nextItemCenter) {
    return moveItem(order2, index, index + nextOffset);
  }
  return order2;
}
function moveItem([...arr], fromIndex, toIndex) {
  const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;
  if (startIndex >= 0 && startIndex < arr.length) {
    const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
    const [item] = arr.splice(fromIndex, 1);
    arr.splice(endIndex, 0, item);
  }
  return arr;
}
function useDefaultMotionValue(value, defaultValue = 0) {
  return isMotionValue(value) ? value : motionValue(defaultValue);
}
const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ReorderGroup",
    inheritAttrs: false
  },
  __name: "Group",
  props: {
    axis: { default: "y" },
    "onUpdate:values": {},
    values: {},
    as: { default: "ul" },
    asChild: { type: Boolean },
    hover: {},
    press: {},
    inView: {},
    focus: {},
    whileDrag: {},
    whileHover: {},
    whilePress: {},
    whileInView: {},
    whileFocus: {},
    forwardMotionProps: { type: Boolean },
    ignoreStrict: { type: Boolean },
    custom: {},
    initial: { type: [String, Array, Object, Boolean] },
    animate: {},
    exit: {},
    variants: {},
    inherit: { type: Boolean },
    style: {},
    transformTemplate: {},
    transition: {},
    onAnimationComplete: {},
    onUpdate: {},
    onAnimationStart: {},
    layout: { type: [Boolean, String] },
    layoutId: {},
    layoutScroll: { type: Boolean },
    layoutRoot: { type: Boolean },
    "data-framer-portal-id": {},
    crossfade: { type: Boolean },
    layoutDependency: {},
    onBeforeLayoutMeasure: {},
    onLayoutMeasure: {},
    onLayoutAnimationStart: {},
    onLayoutAnimationComplete: {},
    globalPressTarget: { type: Boolean },
    onPressStart: {},
    onPress: {},
    onPressCancel: {},
    onHoverStart: {},
    onHoverEnd: {},
    inViewOptions: {},
    onViewportEnter: {},
    onViewportLeave: {},
    drag: { type: [Boolean, String] },
    dragSnapToOrigin: { type: Boolean },
    dragDirectionLock: { type: Boolean },
    dragPropagation: { type: Boolean },
    dragConstraints: { type: [Boolean, Object] },
    dragElastic: { type: [Boolean, Number, Object] },
    dragMomentum: { type: Boolean },
    dragTransition: {},
    dragListener: { type: Boolean },
    dragControls: {},
    onDragStart: {},
    onDragEnd: {},
    onDrag: {},
    onDirectionLock: {},
    onDragTransitionEnd: {},
    onMeasureDragConstraints: {},
    onPanSessionStart: {},
    onPanStart: {},
    onPan: {},
    onPanEnd: {},
    onFocus: {},
    onBlur: {}
  },
  setup(__props) {
    const props = __props;
    const { axis } = vue.toRefs(props);
    let order2 = [];
    let isReordering = false;
    function warning() {
      heyListen.invariant(Boolean(props.values), "Reorder.Group must be provided a values prop");
    }
    vue.onUpdated(() => {
      isReordering = false;
    });
    vue.watch(() => props.values, () => {
      if (!isReordering) {
        order2 = [];
      }
    }, {
      flush: "pre"
    });
    const groupRef = useDomRef();
    reorderContextProvider({
      groupRef,
      axis,
      registerItem: (value, layout) => {
        const idx = order2.findIndex((entry) => value === entry.value);
        if (idx !== -1) {
          order2[idx].layout = layout[axis.value];
        } else {
          order2.push({ value, layout: layout[axis.value] });
        }
        order2.sort(compareMin);
      },
      updateOrder: (item, offset, velocity) => {
        var _a2;
        if (isReordering)
          return;
        const newOrder = checkReorder(order2, item, offset, velocity);
        if (order2 !== newOrder) {
          isReordering = true;
          order2 = newOrder;
          (_a2 = props["onUpdate:values"]) == null ? void 0 : _a2.call(
            props,
            newOrder.map(getValue).filter((value) => props.values.includes(value))
          );
        }
      }
    });
    const attrs = vue.useAttrs();
    function bindProps() {
      const { axis: axis2, values, "onUpdate:values": onUpdateValues, ...rest } = props;
      return {
        ...attrs,
        ...rest,
        style: {
          overflowAnchor: "none",
          ...rest.style
        }
      };
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Motion), vue.mergeProps(bindProps(), {
        ref_key: "groupRef",
        ref: groupRef
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default"),
          vue.createTextVNode(" " + vue.toDisplayString(warning()), 1)
        ]),
        _: 3
      }, 16);
    };
  }
});
function useCombineMotionValues(combineValues) {
  const value = motionValue(combineValues());
  const updateValue = () => value.set(combineValues());
  const scheduleUpdate = () => frame.preRender(updateValue, false, true);
  let subscriptions;
  const subscribe = (values) => {
    subscriptions = values.map((v) => v.on("change", scheduleUpdate));
  };
  const unsubscribe = () => {
    subscriptions.forEach((unsubscribe2) => unsubscribe2());
    cancelFrame(updateValue);
  };
  vue.onUnmounted(() => {
    unsubscribe();
  });
  return {
    subscribe,
    unsubscribe,
    value,
    updateValue
  };
}
function useComputed(computed) {
  collectMotionValues.current = [];
  const { value, subscribe, unsubscribe, updateValue } = useCombineMotionValues(computed);
  subscribe(collectMotionValues.current);
  collectMotionValues.current = void 0;
  vue.watchEffect(() => {
    unsubscribe();
    collectMotionValues.current = [];
    updateValue();
    subscribe(collectMotionValues.current);
    collectMotionValues.current = void 0;
  });
  return value;
}
function useTransform(input, inputRangeOrTransformer, outputRange, options) {
  if (typeof input === "function") {
    return useComputed(input);
  }
  if (outputRange && !Array.isArray(outputRange) && typeof outputRange === "object") {
    const result = {};
    for (const key in outputRange) {
      if (Object.prototype.hasOwnProperty.call(outputRange, key)) {
        const keyOutputRange = outputRange[key];
        result[key] = useTransform(
          input,
          inputRangeOrTransformer,
          keyOutputRange,
          options
        );
      }
    }
    return result;
  }
  let inputValues;
  let transformer;
  if (typeof inputRangeOrTransformer === "function") {
    transformer = inputRangeOrTransformer;
    inputValues = Array.isArray(input) ? input : [input];
  } else if (vue.isRef(inputRangeOrTransformer)) {
    const bridgeMV = motionValue(0);
    let currentTransformer = transform(inputRangeOrTransformer.value, outputRange, options);
    vue.watch(inputRangeOrTransformer, (newRange) => {
      currentTransformer = transform(newRange, outputRange, options);
      bridgeMV.set(bridgeMV.get() + 1);
    }, { flush: "sync" });
    transformer = (values) => {
      return Array.isArray(values) ? currentTransformer(values[0]) : currentTransformer(values);
    };
    inputValues = Array.isArray(input) ? [...input, bridgeMV] : [input, bridgeMV];
  } else {
    transformer = transform(inputRangeOrTransformer, outputRange, options);
    inputValues = Array.isArray(input) ? input : [input];
  }
  return Array.isArray(input) ? useListTransform(inputValues, transformer) : useListTransform(inputValues, (values) => {
    return transformer(values[0]);
  });
}
function useListTransform(values, transformer) {
  const latest = [];
  const combineValues = () => {
    latest.length = 0;
    const numValues = values.length;
    for (let i = 0; i < numValues; i++) {
      latest[i] = values[i].get();
    }
    return transformer(latest);
  };
  const { value, subscribe } = useCombineMotionValues(combineValues);
  subscribe(values);
  return value;
}
function useTime() {
  const time2 = motionValue(0);
  useAnimationFrame((t) => time2.set(t));
  return time2;
}
function useMotionTemplate(fragments, ...values) {
  const numFragments = fragments.length;
  function buildValue() {
    let output = "";
    for (let i = 0; i < numFragments; i++) {
      output += fragments[i];
      const value2 = values[i];
      if (value2) {
        output += isMotionValue(value2) ? value2.get() : value2;
      }
    }
    return output;
  }
  const { value, subscribe } = useCombineMotionValues(buildValue);
  subscribe(values.filter(isMotionValue));
  return value;
}
function useMotionValueEvent(value, event, callback) {
  const unlisten = value.on(event, callback);
  vue.onUnmounted(() => {
    unlisten();
  });
  return unlisten;
}
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
  const stopAnimation2 = () => {
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
    stopAnimation2();
    const springConfig = vue.isRef(config) ? config.value : config;
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
  vue.watch(() => {
    if (vue.isRef(config)) {
      return config.value;
    }
    return config;
  }, () => {
    value.attach((v, set) => {
      latestValue = v;
      latestSetter = set;
      frame.update(startAnimation);
      return value.get();
    }, stopAnimation2);
  }, { immediate: true });
  if (isMotionValue(source)) {
    source.on("change", (v) => {
      value.set(toNumber(v));
    });
  }
  return value;
}
const isSSR = typeof window === "undefined";
function createScrollMotionValues() {
  return {
    scrollX: motionValue(0),
    scrollY: motionValue(0),
    scrollXProgress: motionValue(0),
    scrollYProgress: motionValue(0)
  };
}
function useScroll(scrollOptions = {}) {
  const values = createScrollMotionValues();
  vue.watchEffect((onCleanup) => {
    if (isSSR) {
      return;
    }
    const cleanup = scroll(
      (_progress, { x, y }) => {
        values.scrollX.set(x.current);
        values.scrollXProgress.set(x.progress);
        values.scrollY.set(y.current);
        values.scrollYProgress.set(y.progress);
      },
      {
        offset: vue.unref(scrollOptions.offset),
        axis: vue.unref(scrollOptions.axis),
        container: getElement(scrollOptions.container),
        target: getElement(scrollOptions.target)
      }
    );
    onCleanup(() => {
      cleanup();
    });
  }, {
    flush: "post"
  });
  return values;
}
function useVelocity(value) {
  const velocity = motionValue(value.getVelocity());
  const updateVelocity = () => {
    const latest = value.getVelocity();
    velocity.set(latest);
    if (latest) {
      frame.update(updateVelocity);
    }
  };
  useMotionValueEvent(value, "change", () => {
    frame.update(updateVelocity, false, true);
  });
  return velocity;
}
const threshold = 50;
const maxSpeed = 25;
const overflowStyles = /* @__PURE__ */ new Set(["auto", "scroll"]);
const initialScrollLimits = /* @__PURE__ */ new WeakMap();
const activeScrollEdge = /* @__PURE__ */ new WeakMap();
let currentGroupElement = null;
function resetAutoScrollState() {
  if (currentGroupElement) {
    const scrollableAncestor = findScrollableAncestor(
      currentGroupElement,
      "y"
    );
    if (scrollableAncestor) {
      activeScrollEdge.delete(scrollableAncestor);
      initialScrollLimits.delete(scrollableAncestor);
    }
    const scrollableAncestorX = findScrollableAncestor(
      currentGroupElement,
      "x"
    );
    if (scrollableAncestorX && scrollableAncestorX !== scrollableAncestor) {
      activeScrollEdge.delete(scrollableAncestorX);
      initialScrollLimits.delete(scrollableAncestorX);
    }
    currentGroupElement = null;
  }
}
function isScrollableElement(element, axis) {
  const style2 = getComputedStyle(element);
  const overflow = axis === "x" ? style2.overflowX : style2.overflowY;
  return overflowStyles.has(overflow);
}
function findScrollableAncestor(element, axis) {
  let current2 = element == null ? void 0 : element.parentElement;
  while (current2) {
    if (isScrollableElement(current2, axis)) {
      return current2;
    }
    current2 = current2.parentElement;
  }
  return null;
}
function getScrollAmount(pointerPosition, scrollElement, axis) {
  const rect = scrollElement.getBoundingClientRect();
  const start2 = axis === "x" ? rect.left : rect.top;
  const end = axis === "x" ? rect.right : rect.bottom;
  const distanceFromStart = pointerPosition - start2;
  const distanceFromEnd = end - pointerPosition;
  if (distanceFromStart < threshold) {
    const intensity = 1 - distanceFromStart / threshold;
    return { amount: -maxSpeed * intensity * intensity, edge: "start" };
  } else if (distanceFromEnd < threshold) {
    const intensity = 1 - distanceFromEnd / threshold;
    return { amount: maxSpeed * intensity * intensity, edge: "end" };
  }
  return { amount: 0, edge: null };
}
function autoScrollIfNeeded(groupElement, pointerPosition, axis, velocity) {
  if (!groupElement)
    return;
  currentGroupElement = groupElement;
  const scrollableAncestor = findScrollableAncestor(groupElement, axis);
  if (!scrollableAncestor)
    return;
  const { amount: scrollAmount, edge } = getScrollAmount(
    pointerPosition,
    scrollableAncestor,
    axis
  );
  if (edge === null) {
    activeScrollEdge.delete(scrollableAncestor);
    initialScrollLimits.delete(scrollableAncestor);
    return;
  }
  const currentActiveEdge = activeScrollEdge.get(scrollableAncestor);
  if (currentActiveEdge !== edge) {
    const shouldStart = edge === "start" && velocity < 0 || edge === "end" && velocity > 0;
    if (!shouldStart)
      return;
    activeScrollEdge.set(scrollableAncestor, edge);
    const maxScroll = axis === "x" ? scrollableAncestor.scrollWidth - scrollableAncestor.clientWidth : scrollableAncestor.scrollHeight - scrollableAncestor.clientHeight;
    initialScrollLimits.set(scrollableAncestor, maxScroll);
  }
  if (scrollAmount > 0) {
    const initialLimit = initialScrollLimits.get(scrollableAncestor);
    const currentScroll = axis === "x" ? scrollableAncestor.scrollLeft : scrollableAncestor.scrollTop;
    if (currentScroll >= initialLimit)
      return;
  }
  if (axis === "x") {
    scrollableAncestor.scrollLeft += scrollAmount;
  } else {
    scrollableAncestor.scrollTop += scrollAmount;
  }
}
const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ReorderItem",
    inheritAttrs: false
  },
  __name: "Item",
  props: {
    value: {},
    layout: { type: [Boolean, String], default: true },
    as: { default: "li" },
    asChild: { type: Boolean },
    hover: { default: void 0 },
    press: {},
    inView: { default: void 0 },
    focus: {},
    whileDrag: { default: void 0 },
    whileHover: {},
    whilePress: {},
    whileInView: {},
    whileFocus: {},
    forwardMotionProps: { type: Boolean },
    ignoreStrict: { type: Boolean },
    custom: {},
    initial: { type: [String, Array, Object, Boolean], default: void 0 },
    animate: { default: void 0 },
    exit: {},
    variants: {},
    inherit: { type: Boolean },
    style: {},
    transformTemplate: {},
    transition: {},
    onAnimationComplete: {},
    onUpdate: {},
    onAnimationStart: {},
    layoutId: { default: void 0 },
    layoutScroll: { type: Boolean, default: false },
    layoutRoot: { type: Boolean, default: false },
    "data-framer-portal-id": {},
    crossfade: { type: Boolean, default: true },
    layoutDependency: {},
    onBeforeLayoutMeasure: {},
    onLayoutMeasure: {},
    onLayoutAnimationStart: {},
    onLayoutAnimationComplete: {},
    globalPressTarget: { type: Boolean },
    onPressStart: {},
    onPress: {},
    onPressCancel: {},
    onHoverStart: {},
    onHoverEnd: {},
    inViewOptions: {},
    onViewportEnter: {},
    onViewportLeave: {},
    drag: { type: [Boolean, String] },
    dragSnapToOrigin: { type: Boolean },
    dragDirectionLock: { type: Boolean },
    dragPropagation: { type: Boolean },
    dragConstraints: { type: [Boolean, Object] },
    dragElastic: { type: [Boolean, Number, Object], default: 0.5 },
    dragMomentum: { type: Boolean, default: true },
    dragTransition: {},
    dragListener: { type: Boolean, default: true },
    dragControls: {},
    onDragStart: {},
    onDragEnd: {},
    onDrag: {},
    onDirectionLock: {},
    onDragTransitionEnd: {},
    onMeasureDragConstraints: {},
    onPanSessionStart: {},
    onPanStart: {},
    onPan: {},
    onPanEnd: {},
    onFocus: {},
    onBlur: {}
  },
  setup(__props) {
    var _a2, _b;
    const props = __props;
    const { style: style2 } = vue.toRefs(props);
    const context = useReorderContext();
    const point2 = {
      x: useDefaultMotionValue((_a2 = style2.value) == null ? void 0 : _a2.x),
      y: useDefaultMotionValue((_b = style2.value) == null ? void 0 : _b.y)
    };
    const zIndex = useTransform([point2.x, point2.y], ([latestX, latestY]) => latestX || latestY ? 1 : "unset");
    function warning() {
      heyListen.invariant(Boolean(context), "Reorder.Item must be a descendant of Reorder.Group");
    }
    warning();
    const { axis, registerItem, updateOrder, groupRef } = context;
    const attrs = vue.useAttrs();
    function bindProps() {
      const { value, onDragStart, onDragEnd, onDrag, ...rest } = props;
      return {
        ...attrs,
        ...rest,
        style: {
          ...style2.value,
          x: point2.x,
          y: point2.y,
          zIndex
        }
      };
    }
    const drag = vue.computed(() => {
      if (props.drag) {
        return props.drag;
      }
      return axis.value;
    });
    const isDragging2 = vue.ref(false);
    function handleDrag(event, gesturePoint) {
      var _a3;
      const { velocity, point: pointerPoint } = gesturePoint;
      const offset = point2[axis.value].get();
      updateOrder(props.value, offset, velocity[axis.value]);
      autoScrollIfNeeded(
        groupRef.value,
        pointerPoint[axis.value],
        axis.value,
        velocity[axis.value]
      );
      if (!isDragging2.value)
        isDragging2.value = true;
      (_a3 = props.onDrag) == null ? void 0 : _a3.call(props, event, gesturePoint);
    }
    function handleDragEnd(event, gesturePoint) {
      var _a3;
      isDragging2.value = false;
      resetAutoScrollState();
      (_a3 = props.onDragEnd) == null ? void 0 : _a3.call(props, event, gesturePoint);
    }
    function handleDragStart(event, gesturePoint) {
      var _a3;
      (_a3 = props.onDragStart) == null ? void 0 : _a3.call(props, event, gesturePoint);
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Motion), vue.mergeProps(bindProps(), {
        drag: drag.value,
        "drag-snap-to-origin": true,
        onDrag: handleDrag,
        onDragEnd: handleDragEnd,
        onDragStart: handleDragStart,
        onLayoutMeasure: _cache[0] || (_cache[0] = (measured) => {
          vue.unref(registerItem)(_ctx.value, measured);
        })
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { isDragging: isDragging2.value })
        ]),
        _: 3
      }, 16, ["drag"]);
    };
  }
});
const ReorderGroup = _sfc_main$3;
const ReorderItem = _sfc_main$2;
const Reorder = {
  Group: _sfc_main$3,
  Item: _sfc_main$2
};
const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
  __name: "RowValue",
  props: {
    value: {}
  },
  setup(__props) {
    const props = __props;
    const instance = vue.getCurrentInstance().proxy;
    vue.watchEffect((cleanup) => {
      const unSub = props.value.on("change", (value) => {
        if (instance.$el) {
          instance.$el.textContent = value;
        }
      });
      cleanup(unSub);
    });
    return (_ctx, _cache) => {
      return vue.toDisplayString(_ctx.value.get());
    };
  }
});
const LazyMotion = vue.defineComponent({
  name: "LazyMotion",
  inheritAttrs: false,
  props: {
    features: {
      type: [Object, Function],
      default: () => []
    },
    strict: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const features = vue.ref(Array.isArray(props.features) ? props.features : []);
    if (!Array.isArray(props.features)) {
      const featuresPromise = typeof props.features === "function" ? props.features() : props.features;
      featuresPromise.then((feats) => {
        features.value = feats;
      });
    }
    lazyMotionContextProvider({
      features,
      strict: props.strict
    });
    return () => {
      var _a2;
      return (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
    };
  }
});
const m = createMotionComponentWithFeatures();
const M = m.create("div");
function useForceUpdate() {
  const key = vue.ref(0);
  function forceUpdate() {
    key.value++;
  }
  return [forceUpdate, key];
}
function notify(node) {
  return !node.isLayoutDirty && node.willUpdate(false);
}
function nodeGroup() {
  const nodes = /* @__PURE__ */ new Set();
  const subscriptions = /* @__PURE__ */ new WeakMap();
  const dirtyAll = (node) => {
    nodes.forEach(notify);
  };
  return {
    add: (node) => {
      nodes.add(node);
      subscriptions.set(
        node,
        node.addEventListener("willUpdate", () => dirtyAll())
      );
    },
    remove: (node) => {
      nodes.delete(node);
      const unsubscribe = subscriptions.get(node);
      if (unsubscribe) {
        unsubscribe();
        subscriptions.delete(node);
      }
    },
    dirty: dirtyAll
  };
}
function useLayoutGroupProvider(props) {
  const parentGroup = injectLayoutGroup(null);
  const [forceRender, key] = useForceUpdate();
  const context = {
    id: getGroupId(props, parentGroup),
    group: getGroup(props, parentGroup),
    forceRender,
    key
  };
  provideLayoutGroup(context);
  return context;
}
function useLayoutGroup() {
  const { forceRender } = injectLayoutGroup({ forceRender: () => {
  } });
  return { forceRender };
}
function getGroupId(props, parentGroup) {
  const shouldInherit = props.inherit === true || props.inherit === "id";
  const parentId = parentGroup == null ? void 0 : parentGroup.id;
  if (shouldInherit && parentId) {
    return props.id ? `${parentId}-${props.id}` : parentId;
  }
  return props.id;
}
function getGroup(props, parentGroup) {
  const shouldInherit = props.inherit === true || props.inherit === "group";
  return shouldInherit ? (parentGroup == null ? void 0 : parentGroup.group) || nodeGroup() : nodeGroup();
}
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "LayoutGroup",
  props: {
    id: {},
    inherit: { type: [Boolean, String], default: true }
  },
  setup(__props) {
    const props = __props;
    const { forceRender, key } = useLayoutGroupProvider(props);
    return (_ctx, _cache) => {
      return vue.renderSlot(_ctx.$slots, "default", {
        renderKey: vue.unref(key),
        forceRender: vue.unref(forceRender)
      });
    };
  }
});
function useAnimate() {
  const dom = vue.ref(null);
  const domProxy = new Proxy(dom, {
    get(target, key) {
      if (typeof key === "string" || typeof key === "symbol") {
        if (key === "current")
          return Reflect.get(target, "value");
        return Reflect.get(target, key);
      }
      return void 0;
    },
    set(target, key, value) {
      if (key === "value")
        return Reflect.set(target, key, (value == null ? void 0 : value.$el) || value);
      if (key === "animations")
        return Reflect.set(target, key, value);
      return true;
    }
  });
  domProxy.animations = [];
  const animate2 = createScopedAnimate(domProxy);
  vue.onUnmounted(() => {
    domProxy.animations.forEach((animation) => animation.stop());
  });
  return [domProxy, animate2];
}
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
      heyListen.invariant(
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
      heyListen.invariant(
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
function useAnimationControls() {
  const controls = animationControls();
  let unmount;
  vue.onMounted(() => {
    unmount = controls.mount();
  });
  vue.onUnmounted(() => {
    unmount();
  });
  return controls;
}
function useReducedMotion(options = {}) {
  const reducedMotion = core.useMediaQuery("(prefers-reduced-motion: reduce)", options);
  return vue.computed(() => reducedMotion.value);
}
class DragControls {
  constructor() {
    this.componentControls = /* @__PURE__ */ new Set();
  }
  /**
   * Subscribe a component's internal `VisualElementDragControls` to the user-facing API.
   *
   * @internal
   */
  subscribe(controls) {
    this.componentControls.add(controls);
    return () => this.componentControls.delete(controls);
  }
  /**
   * Start a drag gesture on every `motion` component that has this set of drag controls
   * passed into it via the `dragControls` prop.
   *
   * ```jsx
   * dragControls.start(e, {
   *   snapToCursor: true
   * })
   * ```
   *
   * @param event - PointerEvent
   * @param options - Options
   *
   * @public
   */
  start(event, options) {
    this.componentControls.forEach((controls) => {
      controls.start(
        event,
        options
      );
    });
  }
}
const createDragControls = () => new DragControls();
const useDragControls = createDragControls;
exports.AnimatePresence = _sfc_main$4;
exports.AsyncMotionValueAnimation = AsyncMotionValueAnimation;
exports.DOMKeyframesResolver = DOMKeyframesResolver;
exports.GroupAnimation = GroupAnimation;
exports.GroupAnimationWithThen = GroupAnimationWithThen;
exports.JSAnimation = JSAnimation;
exports.KeyframeResolver = KeyframeResolver;
exports.LayoutGroup = _sfc_main;
exports.LazyMotion = LazyMotion;
exports.M = M;
exports.Motion = Motion;
exports.MotionConfig = _sfc_main$5;
exports.MotionGlobalConfig = MotionGlobalConfig;
exports.MotionValue = MotionValue;
exports.NativeAnimation = NativeAnimation;
exports.NativeAnimationExtended = NativeAnimationExtended;
exports.NativeAnimationWrapper = NativeAnimationWrapper;
exports.Reorder = Reorder;
exports.ReorderGroup = ReorderGroup;
exports.ReorderItem = ReorderItem;
exports.RowValue = _sfc_main$1;
exports.SubscriptionManager = SubscriptionManager;
exports.ViewTransitionBuilder = ViewTransitionBuilder;
exports.acceleratedValues = acceleratedValues;
exports.activeAnimations = activeAnimations;
exports.addAttrValue = addAttrValue;
exports.addScaleCorrector = addScaleCorrector;
exports.addStyleValue = addStyleValue;
exports.addUniqueItem = addUniqueItem;
exports.alpha = alpha;
exports.analyseComplexValue = analyseComplexValue;
exports.animate = animate;
exports.animateMini = animateMini;
exports.animateValue = animateValue;
exports.animateView = animateView;
exports.animationMapKey = animationMapKey;
exports.anticipate = anticipate;
exports.applyGeneratorOptions = applyGeneratorOptions;
exports.applyPxDefaults = applyPxDefaults;
exports.attachSpring = attachSpring;
exports.attrEffect = attrEffect;
exports.backIn = backIn;
exports.backInOut = backInOut;
exports.backOut = backOut;
exports.calcGeneratorDuration = calcGeneratorDuration;
exports.cancelFrame = cancelFrame;
exports.cancelMicrotask = cancelMicrotask;
exports.cancelSync = cancelSync;
exports.circIn = circIn;
exports.circInOut = circInOut;
exports.circOut = circOut;
exports.clamp = clamp;
exports.collectMotionValues = collectMotionValues;
exports.color = color;
exports.complex = complex;
exports.containsCSSVariable = containsCSSVariable;
exports.convertOffsetToTimes = convertOffsetToTimes;
exports.createContext = createContext;
exports.createGeneratorEasing = createGeneratorEasing;
exports.createRenderBatcher = createRenderBatcher;
exports.createScopedAnimate = createScopedAnimate;
exports.cubicBezier = cubicBezier;
exports.cubicBezierAsString = cubicBezierAsString;
exports.defaultEasing = defaultEasing;
exports.defaultOffset = defaultOffset$1;
exports.defaultTransformValue = defaultTransformValue;
exports.defaultValueTypes = defaultValueTypes;
exports.degrees = degrees;
exports.delay = delayInSeconds;
exports.delayInMs = delay;
exports.dimensionValueTypes = dimensionValueTypes;
exports.distance = distance;
exports.distance2D = distance2D;
exports.domAnimation = domAnimation;
exports.domMax = domMax;
exports.easeIn = easeIn;
exports.easeInOut = easeInOut;
exports.easeOut = easeOut;
exports.easingDefinitionToFunction = easingDefinitionToFunction;
exports.fillOffset = fillOffset;
exports.fillWildcards = fillWildcards;
exports.findDimensionValueType = findDimensionValueType;
exports.findValueType = findValueType;
exports.flushKeyframeResolvers = flushKeyframeResolvers;
exports.frame = frame;
exports.frameData = frameData;
exports.frameSteps = frameSteps;
exports.generateLinearEasing = generateLinearEasing;
exports.getAnimatableNone = getAnimatableNone;
exports.getAnimationMap = getAnimationMap;
exports.getComputedStyle = getComputedStyle$2;
exports.getContextWindow = getContextWindow;
exports.getDefaultValueType = getDefaultValueType;
exports.getEasingForSegment = getEasingForSegment;
exports.getMixer = getMixer;
exports.getOriginIndex = getOriginIndex;
exports.getValueAsType = getValueAsType;
exports.getValueTransition = getValueTransition$1;
exports.getVariableValue = getVariableValue;
exports.getViewAnimationLayerInfo = getViewAnimationLayerInfo;
exports.getViewAnimations = getViewAnimations;
exports.hasWarned = hasWarned;
exports.hex = hex;
exports.hover = hover;
exports.hsla = hsla;
exports.hslaToRgba = hslaToRgba;
exports.inView = inView;
exports.inertia = inertia;
exports.injectLayoutGroup = injectLayoutGroup;
exports.injectMotion = injectMotion;
exports.interpolate = interpolate;
exports.invisibleValues = invisibleValues;
exports.isBezierDefinition = isBezierDefinition;
exports.isCSSVariableName = isCSSVariableName;
exports.isCSSVariableToken = isCSSVariableToken;
exports.isDragActive = isDragActive;
exports.isDragging = isDragging;
exports.isEasingArray = isEasingArray;
exports.isElementKeyboardAccessible = isElementKeyboardAccessible;
exports.isGenerator = isGenerator;
exports.isHTMLElement = isHTMLElement$1;
exports.isMotionValue = isMotionValue;
exports.isNodeOrChild = isNodeOrChild;
exports.isNumericalString = isNumericalString;
exports.isObject = isObject;
exports.isPrimaryPointer = isPrimaryPointer$1;
exports.isSVGElement = isSVGElement$1;
exports.isSVGSVGElement = isSVGSVGElement;
exports.isWaapiSupportedEasing = isWaapiSupportedEasing;
exports.isZeroValueString = isZeroValueString;
exports.keyframes = keyframes;
exports.m = m;
exports.makeAnimationInstant = makeAnimationInstant;
exports.mapEasingToNativeEasing = mapEasingToNativeEasing;
exports.mapValue = mapValue;
exports.maxGeneratorDuration = maxGeneratorDuration;
exports.memo = memo;
exports.microtask = microtask;
exports.millisecondsToSeconds = millisecondsToSeconds;
exports.mirrorEasing = mirrorEasing;
exports.mix = mix;
exports.mixArray = mixArray;
exports.mixColor = mixColor;
exports.mixComplex = mixComplex;
exports.mixImmediate = mixImmediate;
exports.mixLinearColor = mixLinearColor;
exports.mixNumber = mixNumber$1;
exports.mixObject = mixObject;
exports.mixVisibility = mixVisibility;
exports.motion = motion;
exports.motionValue = motionValue;
exports.mountedStates = mountedStates;
exports.moveItem = moveItem$1;
exports.noop = noop;
exports.number = number;
exports.numberValueTypes = numberValueTypes;
exports.observeTimeline = observeTimeline;
exports.parseCSSVariable = parseCSSVariable;
exports.parseValueFromTransform = parseValueFromTransform;
exports.percent = percent;
exports.pipe = pipe;
exports.positionalKeys = positionalKeys;
exports.press = press;
exports.progress = progress;
exports.progressPercentage = progressPercentage;
exports.propEffect = propEffect;
exports.provideLayoutGroup = provideLayoutGroup;
exports.provideMotion = provideMotion;
exports.provideMotionConfig = provideMotionConfig;
exports.px = px;
exports.readTransformValue = readTransformValue;
exports.recordStats = recordStats;
exports.removeItem = removeItem;
exports.resize = resize;
exports.resolveElements = resolveElements;
exports.reverseEasing = reverseEasing;
exports.rgbUnit = rgbUnit;
exports.rgba = rgba;
exports.scale = scale;
exports.scroll = scroll;
exports.scrollInfo = scrollInfo;
exports.secondsToMilliseconds = secondsToMilliseconds;
exports.setDragLock = setDragLock;
exports.setStyle = setStyle;
exports.spring = spring;
exports.springValue = springValue;
exports.stagger = stagger;
exports.startWaapiAnimation = startWaapiAnimation;
exports.statsBuffer = statsBuffer;
exports.steps = steps;
exports.styleEffect = styleEffect;
exports.supportedWaapiEasing = supportedWaapiEasing;
exports.supportsBrowserAnimation = supportsBrowserAnimation;
exports.supportsFlags = supportsFlags;
exports.supportsLinearEasing = supportsLinearEasing;
exports.supportsPartialKeyframes = supportsPartialKeyframes;
exports.supportsScrollTimeline = supportsScrollTimeline;
exports.svgEffect = svgEffect;
exports.sync = sync;
exports.testValueType = testValueType;
exports.time = time;
exports.transform = transform;
exports.transformPropOrder = transformPropOrder;
exports.transformProps = transformProps;
exports.transformValue = transformValue;
exports.transformValueTypes = transformValueTypes;
exports.useAnimate = useAnimate;
exports.useAnimationControls = useAnimationControls;
exports.useAnimationFrame = useAnimationFrame;
exports.useCombineMotionValues = useCombineMotionValues;
exports.useComputed = useComputed;
exports.useDomRef = useDomRef;
exports.useDragControls = useDragControls;
exports.useInView = useInView;
exports.useLayoutGroup = useLayoutGroup;
exports.useMotionConfig = useMotionConfig;
exports.useMotionTemplate = useMotionTemplate;
exports.useMotionValue = motionValue;
exports.useMotionValueEvent = useMotionValueEvent;
exports.usePageInView = usePageInView;
exports.useReducedMotion = useReducedMotion;
exports.useScroll = useScroll;
exports.useSpring = useSpring;
exports.useTime = useTime;
exports.useTransform = useTransform;
exports.useVelocity = useVelocity;
exports.velocityPerSecond = velocityPerSecond;
exports.vh = vh;
exports.vw = vw;
exports.warnOnce = warnOnce;
exports.wrap = wrap;
