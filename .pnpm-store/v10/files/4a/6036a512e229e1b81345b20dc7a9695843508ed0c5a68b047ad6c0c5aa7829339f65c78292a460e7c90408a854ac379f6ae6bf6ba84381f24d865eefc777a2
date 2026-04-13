import { clamp } from "../../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/clamp.mjs";
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
export {
  alpha,
  number,
  scale
};
