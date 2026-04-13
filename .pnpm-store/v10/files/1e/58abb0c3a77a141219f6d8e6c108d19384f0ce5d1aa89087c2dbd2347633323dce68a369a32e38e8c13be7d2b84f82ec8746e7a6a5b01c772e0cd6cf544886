import { useMotionValueEvent } from "./use-motion-value-event.mjs";
import { motionValue } from "../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/value/index.mjs";
import { frame } from "../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/frameloop/frame.mjs";
function useVelocity(value) {
  const velocity = motionValue(value.getVelocity());
  const updateVelocity = () => {
    const latest = value.getVelocity();
    velocity.set(latest);
    if (latest) {
      frame.update(updateVelocity);
    }
  };
  useMotionValueEvent(value, "change", () => {
    frame.update(updateVelocity, false, true);
  });
  return velocity;
}
export {
  useVelocity
};
