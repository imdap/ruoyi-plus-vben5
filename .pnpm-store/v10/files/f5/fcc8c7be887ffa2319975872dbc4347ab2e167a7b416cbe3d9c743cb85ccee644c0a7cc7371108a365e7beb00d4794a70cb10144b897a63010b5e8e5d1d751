import { color } from "../color/index.mjs";
import { filter } from "../complex/filter.mjs";
import { numberValueTypes } from "./number.mjs";
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
export {
  defaultValueTypes,
  getDefaultValueType
};
