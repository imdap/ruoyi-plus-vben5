import { computed } from "vue";
import { createContext } from "../../utils/createContext.mjs";
const defaultConfig = {
  reducedMotion: "never",
  transition: void 0,
  nonce: void 0
};
const [injectMotionConfig, provideMotionConfig] = createContext("MotionConfig");
function useMotionConfig() {
  return injectMotionConfig(computed(() => defaultConfig));
}
export {
  defaultConfig,
  injectMotionConfig,
  provideMotionConfig,
  useMotionConfig
};
