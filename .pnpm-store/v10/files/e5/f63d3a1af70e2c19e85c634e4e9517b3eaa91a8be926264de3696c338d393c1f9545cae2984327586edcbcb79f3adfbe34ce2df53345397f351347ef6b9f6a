import { watchEffect, unref } from "vue";
import { isSSR } from "../utils/is.mjs";
import { getElement } from "../components/hooks/use-motion-elm.mjs";
import { scroll } from "../external/.pnpm/framer-motion@12.25.0/external/framer-motion/dist/es/render/dom/scroll/index.mjs";
import { motionValue } from "../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/value/index.mjs";
function createScrollMotionValues() {
  return {
    scrollX: motionValue(0),
    scrollY: motionValue(0),
    scrollXProgress: motionValue(0),
    scrollYProgress: motionValue(0)
  };
}
function useScroll(scrollOptions = {}) {
  const values = createScrollMotionValues();
  watchEffect((onCleanup) => {
    if (isSSR) {
      return;
    }
    const cleanup = scroll(
      (_progress, { x, y }) => {
        values.scrollX.set(x.current);
        values.scrollXProgress.set(x.progress);
        values.scrollY.set(y.current);
        values.scrollYProgress.set(y.progress);
      },
      {
        offset: unref(scrollOptions.offset),
        axis: unref(scrollOptions.axis),
        container: getElement(scrollOptions.container),
        target: getElement(scrollOptions.target)
      }
    );
    onCleanup(() => {
      cleanup();
    });
  }, {
    flush: "post"
  });
  return values;
}
export {
  useScroll
};
