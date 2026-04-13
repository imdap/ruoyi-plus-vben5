import { animationControls } from "./animation-controls.mjs";
import { onMounted, onUnmounted } from "vue";
function useAnimationControls() {
  const controls = animationControls();
  let unmount;
  onMounted(() => {
    unmount = controls.mount();
  });
  onUnmounted(() => {
    unmount();
  });
  return controls;
}
export {
  useAnimationControls
};
