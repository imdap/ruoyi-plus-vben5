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
function shallowCompare(next, prev) {
  const prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (let i = 0; i < prevLength; i++) {
    if (prev[i] !== next[i])
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
export {
  hasChanged,
  isCssVar,
  isNumber,
  isSVGElement,
  noopReturn,
  resolveVariant,
  shallowCompare,
  svgElements
};
