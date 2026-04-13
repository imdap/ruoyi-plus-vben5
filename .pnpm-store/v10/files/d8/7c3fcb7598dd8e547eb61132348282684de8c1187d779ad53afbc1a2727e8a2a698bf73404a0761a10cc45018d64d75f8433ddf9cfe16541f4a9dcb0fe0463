import { onUnmounted } from "vue";
import { motionValue } from "../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/value/index.mjs";
import { cancelFrame, frame } from "../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/frameloop/frame.mjs";
function useCombineMotionValues(combineValues) {
  const value = motionValue(combineValues());
  const updateValue = () => value.set(combineValues());
  const scheduleUpdate = () => frame.preRender(updateValue, false, true);
  let subscriptions;
  const subscribe = (values) => {
    subscriptions = values.map((v) => v.on("change", scheduleUpdate));
  };
  const unsubscribe = () => {
    subscriptions.forEach((unsubscribe2) => unsubscribe2());
    cancelFrame(updateValue);
  };
  onUnmounted(() => {
    unsubscribe();
  });
  return {
    subscribe,
    unsubscribe,
    value,
    updateValue
  };
}
export {
  useCombineMotionValues
};
