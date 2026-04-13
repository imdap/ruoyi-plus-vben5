import { noopReturn } from "./utils.mjs";
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
export {
  axes,
  buildTransformTemplate,
  compareTransformOrder,
  isTransform,
  transformAlias,
  transformDefinitions,
  transformResetValue
};
