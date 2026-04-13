import { ref, watchEffect, unref } from "vue";
import { unrefElement } from "@vueuse/core";
import { inView } from "../external/.pnpm/framer-motion@12.25.0/external/framer-motion/dist/es/render/dom/viewport/index.mjs";
function useInView(domRef, options) {
  const isInView = ref(false);
  watchEffect((onCleanup) => {
    const realOptions = unref(options) || {};
    const { once } = realOptions;
    const el = unrefElement(domRef);
    if (!el || once && isInView.value) {
      return;
    }
    const onEnter = () => {
      isInView.value = true;
      return once ? void 0 : () => {
        isInView.value = false;
      };
    };
    const cleanup = inView(el, onEnter, {
      ...realOptions,
      root: unref(realOptions.root)
    });
    onCleanup(() => {
      cleanup();
    });
  }, {
    flush: "post"
  });
  return isInView;
}
export {
  useInView
};
