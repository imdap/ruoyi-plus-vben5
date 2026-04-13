import { defineComponent, computed, renderSlot } from "vue";
import { defaultConfig, useMotionConfig, provideMotionConfig } from "./context.mjs";
import { isDef } from "@vueuse/core";
import { warning } from "hey-listen";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "MotionConfig",
    inheritAttrs: false
  },
  __name: "MotionConfig",
  props: {
    transition: {},
    reduceMotion: {},
    reducedMotion: { default: ({ reduceMotion }) => {
      if (isDef(reduceMotion)) {
        warning(false, "`reduceMotion` is deprecated. Use `reducedMotion` instead.");
        return reduceMotion;
      }
      return defaultConfig.reducedMotion;
    } },
    nonce: {},
    inViewOptions: {}
  },
  setup(__props) {
    const props = __props;
    const parentConfig = useMotionConfig();
    const config = computed(() => ({
      transition: props.transition ?? parentConfig.value.transition,
      reducedMotion: props.reducedMotion ?? parentConfig.value.reducedMotion,
      nonce: props.nonce ?? parentConfig.value.nonce,
      inViewOptions: props.inViewOptions ?? parentConfig.value.inViewOptions
    }));
    provideMotionConfig(config);
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});
export {
  _sfc_main as default
};
