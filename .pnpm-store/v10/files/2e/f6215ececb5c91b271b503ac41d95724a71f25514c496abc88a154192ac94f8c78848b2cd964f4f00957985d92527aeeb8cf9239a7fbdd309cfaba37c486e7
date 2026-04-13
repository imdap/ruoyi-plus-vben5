import { color } from "../color/index.mjs";
import { complex } from "../complex/index.mjs";
import { dimensionValueTypes } from "../dimensions.mjs";
import { testValueType } from "../test.mjs";
const valueTypes = [...dimensionValueTypes, color, complex];
const findValueType = (v) => valueTypes.find(testValueType(v));
export {
  findValueType
};
