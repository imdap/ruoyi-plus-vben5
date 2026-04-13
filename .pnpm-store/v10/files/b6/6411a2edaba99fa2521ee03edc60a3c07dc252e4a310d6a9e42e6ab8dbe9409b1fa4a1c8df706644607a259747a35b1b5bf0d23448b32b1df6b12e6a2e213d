import { complex } from "../complex/index.mjs";
import { filter } from "../complex/filter.mjs";
import { getDefaultValueType } from "../maps/defaults.mjs";
function getAnimatableNone(key, value) {
  let defaultValueType = getDefaultValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}
export {
  getAnimatableNone
};
