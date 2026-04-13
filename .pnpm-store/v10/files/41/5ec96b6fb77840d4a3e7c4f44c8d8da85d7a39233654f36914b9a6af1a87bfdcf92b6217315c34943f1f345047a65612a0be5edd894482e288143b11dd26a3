import { transform } from "../utils/transform.mjs";
import { transformValue } from "./transform-value.mjs";
function mapValue(inputValue, inputRange, outputRange, options) {
  const map = transform(inputRange, outputRange, options);
  return transformValue(() => map(inputValue.get()));
}
export {
  mapValue
};
