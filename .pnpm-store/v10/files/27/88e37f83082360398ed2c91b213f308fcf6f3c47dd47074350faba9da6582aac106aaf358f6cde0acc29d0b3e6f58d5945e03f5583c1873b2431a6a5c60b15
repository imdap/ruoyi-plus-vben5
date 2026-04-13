import { number, alpha } from "../numbers/index.mjs";
import { sanitize } from "../utils/sanitize.mjs";
import { isColorString, splitColor } from "./utils.mjs";
import { clamp } from "../../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/clamp.mjs";
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
export {
  rgbUnit,
  rgba
};
