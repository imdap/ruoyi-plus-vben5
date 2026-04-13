import { onBeforeUpdate, onUnmounted } from "vue";
import { frame, cancelFrame } from "../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/frameloop/frame.mjs";
function useAnimationFrame(callback) {
  let initialTimestamp = 0;
  const provideTimeSinceStart = ({ timestamp, delta }) => {
    if (!initialTimestamp)
      initialTimestamp = timestamp;
    callback(timestamp - initialTimestamp, delta);
  };
  const cancel = () => cancelFrame(provideTimeSinceStart);
  onBeforeUpdate(() => {
    cancel();
    frame.update(provideTimeSinceStart, true);
  });
  onUnmounted(() => cancel());
  frame.update(provideTimeSinceStart, true);
}
export {
  useAnimationFrame
};
