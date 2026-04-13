import { floatRegex } from "../utils/float-regex.mjs";
import { isNullish } from "../utils/is-nullish.mjs";
import { singleColorRegex } from "../utils/single-color-regex.mjs";
const isColorString = (type, testProp) => (v) => {
  return Boolean(typeof v === "string" && singleColorRegex.test(v) && v.startsWith(type) || testProp && !isNullish(v) && Object.prototype.hasOwnProperty.call(v, testProp));
};
const splitColor = (aName, bName, cName) => (v) => {
  if (typeof v !== "string")
    return v;
  const [a, b, c, alpha] = v.match(floatRegex);
  return {
    [aName]: parseFloat(a),
    [bName]: parseFloat(b),
    [cName]: parseFloat(c),
    alpha: alpha !== void 0 ? parseFloat(alpha) : 1
  };
};
export {
  isColorString,
  splitColor
};
