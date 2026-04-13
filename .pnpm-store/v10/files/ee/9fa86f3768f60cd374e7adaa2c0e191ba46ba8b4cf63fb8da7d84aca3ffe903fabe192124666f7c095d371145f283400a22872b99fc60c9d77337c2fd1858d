import { ref, onUnmounted } from "vue";
import { createScopedAnimate } from "../../external/.pnpm/framer-motion@12.25.0/external/framer-motion/dist/es/animation/animate/index.mjs";
function useAnimate() {
  const dom = ref(null);
  const domProxy = new Proxy(dom, {
    get(target, key) {
      if (typeof key === "string" || typeof key === "symbol") {
        if (key === "current")
          return Reflect.get(target, "value");
        return Reflect.get(target, key);
      }
      return void 0;
    },
    set(target, key, value) {
      if (key === "value")
        return Reflect.set(target, key, (value == null ? void 0 : value.$el) || value);
      if (key === "animations")
        return Reflect.set(target, key, value);
      return true;
    }
  });
  domProxy.animations = [];
  const animate = createScopedAnimate(domProxy);
  onUnmounted(() => {
    domProxy.animations.forEach((animation) => animation.stop());
  });
  return [domProxy, animate];
}
export {
  useAnimate
};
