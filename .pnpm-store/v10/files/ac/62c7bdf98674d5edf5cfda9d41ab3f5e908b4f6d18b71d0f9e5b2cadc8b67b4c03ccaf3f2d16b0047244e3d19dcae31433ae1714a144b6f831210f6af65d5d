import { transformPropOrder } from "../../render/utils/keys-transform.mjs";
const translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
function buildTransform(state) {
  let transform = "";
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
      const transformName = translateAlias[key] || key;
      const valueToRender = state.latest[key];
      transform += `${transformName}(${valueToRender}) `;
    }
  }
  return transformIsDefault ? "none" : transform.trim();
}
export {
  buildTransform
};
