import { computed } from "vue";
import { useMediaQuery } from "@vueuse/core";
function useReducedMotion(options = {}) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", options);
  return computed(() => reducedMotion.value);
}
export {
  useReducedMotion
};
