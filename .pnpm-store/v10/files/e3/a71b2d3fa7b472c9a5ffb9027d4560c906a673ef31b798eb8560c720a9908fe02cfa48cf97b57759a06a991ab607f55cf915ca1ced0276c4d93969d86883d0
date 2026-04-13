import { useComputed } from "./use-computed.mjs";
import { useCombineMotionValues } from "./use-combine-values.mjs";
import { isRef, watch } from "vue";
import { transform } from "../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/utils/transform.mjs";
import { motionValue } from "../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/value/index.mjs";
function useTransform(input, inputRangeOrTransformer, outputRange, options) {
  if (typeof input === "function") {
    return useComputed(input);
  }
  if (outputRange && !Array.isArray(outputRange) && typeof outputRange === "object") {
    const result = {};
    for (const key in outputRange) {
      if (Object.prototype.hasOwnProperty.call(outputRange, key)) {
        const keyOutputRange = outputRange[key];
        result[key] = useTransform(
          input,
          inputRangeOrTransformer,
          keyOutputRange,
          options
        );
      }
    }
    return result;
  }
  let inputValues;
  let transformer;
  if (typeof inputRangeOrTransformer === "function") {
    transformer = inputRangeOrTransformer;
    inputValues = Array.isArray(input) ? input : [input];
  } else if (isRef(inputRangeOrTransformer)) {
    const bridgeMV = motionValue(0);
    let currentTransformer = transform(inputRangeOrTransformer.value, outputRange, options);
    watch(inputRangeOrTransformer, (newRange) => {
      currentTransformer = transform(newRange, outputRange, options);
      bridgeMV.set(bridgeMV.get() + 1);
    }, { flush: "sync" });
    transformer = (values) => {
      return Array.isArray(values) ? currentTransformer(values[0]) : currentTransformer(values);
    };
    inputValues = Array.isArray(input) ? [...input, bridgeMV] : [input, bridgeMV];
  } else {
    transformer = transform(inputRangeOrTransformer, outputRange, options);
    inputValues = Array.isArray(input) ? input : [input];
  }
  return Array.isArray(input) ? useListTransform(inputValues, transformer) : useListTransform(inputValues, (values) => {
    return transformer(values[0]);
  });
}
function useListTransform(values, transformer) {
  const latest = [];
  const combineValues = () => {
    latest.length = 0;
    const numValues = values.length;
    for (let i = 0; i < numValues; i++) {
      latest[i] = values[i].get();
    }
    return transformer(latest);
  };
  const { value, subscribe } = useCombineMotionValues(combineValues);
  subscribe(values);
  return value;
}
export {
  useTransform
};
