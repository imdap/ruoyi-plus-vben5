import { auto } from "./auto.mjs";
import { number } from "./numbers/index.mjs";
import { px, percent, degrees, vw, vh } from "./numbers/units.mjs";
import { testValueType } from "./test.mjs";
const dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
const findDimensionValueType = (v) => dimensionValueTypes.find(testValueType(v));
export {
  dimensionValueTypes,
  findDimensionValueType
};
