'use strict';

const kit = require('@nuxt/kit');

const components = [
  "Motion",
  "AnimatePresence",
  "LayoutGroup",
  "MotionConfig",
  "ReorderGroup",
  "ReorderItem",
  "M"
];
const utilities = [
  "useTransform",
  "useTime",
  "useMotionTemplate",
  "useSpring",
  "useScroll",
  "useMotionValue",
  "useVelocity",
  "useAnimate",
  "useInView",
  "useAnimationFrame",
  "useMotionValueEvent",
  "useLayoutGroup",
  "useDragControls",
  "useReducedMotion"
];
const index = kit.defineNuxtModule({
  meta: {
    name: "motion-v",
    configKey: "motionV",
    compatibility: {
      nuxt: ">=3.0.0"
    }
  },
  defaults: {
    prefix: "",
    components: true,
    utilities: true
  },
  setup(options, _nuxtApp) {
    if (options.components) {
      components.forEach((component) => {
        kit.addComponent({
          name: `${options.prefix}${component}`,
          export: component,
          filePath: "motion-v"
        });
      });
    }
    if (options.utilities) {
      utilities.forEach((utility) => {
        kit.addImports({
          from: "motion-v",
          name: utility
        });
      });
    }
  }
});

module.exports = index;
