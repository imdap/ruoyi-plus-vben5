import { useAnimationFrame } from "../utils/use-animation-frame.mjs";
import { motionValue } from "../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/value/index.mjs";
function useTime() {
  const time = motionValue(0);
  useAnimationFrame((t) => time.set(t));
  return time;
}
export {
  useTime
};
