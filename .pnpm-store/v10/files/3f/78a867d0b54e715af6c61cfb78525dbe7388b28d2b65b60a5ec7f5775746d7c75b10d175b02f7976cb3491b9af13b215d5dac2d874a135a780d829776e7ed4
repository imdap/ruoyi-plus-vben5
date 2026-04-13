import { useCombineMotionValues } from "./use-combine-values.mjs";
import { watchEffect } from "vue";
import { collectMotionValues } from "../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/value/index.mjs";
function useComputed(computed) {
  collectMotionValues.current = [];
  const { value, subscribe, unsubscribe, updateValue } = useCombineMotionValues(computed);
  subscribe(collectMotionValues.current);
  collectMotionValues.current = void 0;
  watchEffect(() => {
    unsubscribe();
    collectMotionValues.current = [];
    updateValue();
    subscribe(collectMotionValues.current);
    collectMotionValues.current = void 0;
  });
  return value;
}
export {
  useComputed
};
