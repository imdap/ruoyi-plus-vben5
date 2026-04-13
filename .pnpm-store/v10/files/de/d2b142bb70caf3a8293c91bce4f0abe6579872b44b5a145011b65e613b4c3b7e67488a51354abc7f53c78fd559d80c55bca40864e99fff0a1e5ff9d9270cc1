import { useCombineMotionValues } from "./use-combine-values.mjs";
import { isMotionValue } from "../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/value/utils/is-motion-value.mjs";
function useMotionTemplate(fragments, ...values) {
  const numFragments = fragments.length;
  function buildValue() {
    let output = "";
    for (let i = 0; i < numFragments; i++) {
      output += fragments[i];
      const value2 = values[i];
      if (value2) {
        output += isMotionValue(value2) ? value2.get() : value2;
      }
    }
    return output;
  }
  const { value, subscribe } = useCombineMotionValues(buildValue);
  subscribe(values.filter(isMotionValue));
  return value;
}
export {
  useMotionTemplate
};
