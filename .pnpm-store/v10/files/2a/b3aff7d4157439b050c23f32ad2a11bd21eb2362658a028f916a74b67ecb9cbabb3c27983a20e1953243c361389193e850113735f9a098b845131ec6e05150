import { isCssVar, isNumber } from "./utils.mjs";
import { transformDefinitions, isTransform, transformAlias, buildTransformTemplate } from "./transform.mjs";
import { px } from "../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/value/types/numbers/units.mjs";
import { isMotionValue } from "../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/value/utils/is-motion-value.mjs";
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
function createStyles(keyframes) {
  var _a;
  const initialKeyframes = {};
  const transforms = [];
  for (let key in keyframes) {
    let value = keyframes[key];
    value = isMotionValue(value) ? value.get() : value;
    if (isTransform(key)) {
      if (key in transformAlias) {
        key = transformAlias[key];
      }
    }
    let initialKeyframe = Array.isArray(value) ? value[0] : value;
    const definition = transformDefinitions.get(key);
    if (definition) {
      initialKeyframe = isNumber(value) ? (_a = definition.toDefaultUnit) == null ? void 0 : _a.call(definition, value) : value;
      transforms.push([key, initialKeyframe]);
    } else {
      initialKeyframes[key] = initialKeyframe;
    }
  }
  if (transforms.length) {
    initialKeyframes.transform = buildTransformTemplate(transforms);
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
function convertSvgStyleToAttributes(keyframes) {
  const attrs = {};
  const styleProps = {};
  for (const key in keyframes) {
    const kebabKey = camelToKebab(key);
    if (kebabKey in SVG_STYLE_TO_ATTRIBUTES) {
      const value = keyframes[key];
      attrs[kebabKey] = isMotionValue(value) ? value.get() : value;
    } else {
      styleProps[key] = keyframes[key];
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
export {
  convertSvgStyleToAttributes,
  createStyles,
  style
};
