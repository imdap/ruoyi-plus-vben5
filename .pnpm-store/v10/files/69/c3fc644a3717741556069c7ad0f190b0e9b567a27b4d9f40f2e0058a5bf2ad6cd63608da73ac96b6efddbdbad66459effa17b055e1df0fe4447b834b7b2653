import { getMotionElement } from "../components/hooks/use-motion-elm.mjs";
import { ref } from "vue";
function useDomRef() {
  const dom = ref(null);
  const domProxy = new Proxy(dom, {
    get(target, key) {
      if (typeof key === "string" || typeof key === "symbol") {
        return Reflect.get(target, key);
      }
      return void 0;
    },
    set(target, key, value) {
      if (key === "value")
        return Reflect.set(target, key, getMotionElement((value == null ? void 0 : value.$el) || value));
      return true;
    }
  });
  return domProxy;
}
export {
  useDomRef
};
