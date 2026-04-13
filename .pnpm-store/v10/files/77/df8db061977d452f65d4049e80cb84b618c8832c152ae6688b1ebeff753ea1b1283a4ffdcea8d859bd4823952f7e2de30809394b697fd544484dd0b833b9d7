import { convertBoundingBoxToBox, transformBoxPoints } from "../geometry/conversion.mjs";
function measureViewportBox(instance, transformPoint) {
  return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint));
}
export {
  measureViewportBox
};
