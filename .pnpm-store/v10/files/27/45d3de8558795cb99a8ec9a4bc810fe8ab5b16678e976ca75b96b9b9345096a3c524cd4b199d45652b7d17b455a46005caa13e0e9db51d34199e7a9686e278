import { isZeroValueString } from "../../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/is-zero-value-string.mjs";
function isNone(value) {
  if (typeof value === "number") {
    return value === 0;
  } else if (value !== null) {
    return value === "none" || value === "0" || isZeroValueString(value);
  } else {
    return true;
  }
}
export {
  isNone
};
