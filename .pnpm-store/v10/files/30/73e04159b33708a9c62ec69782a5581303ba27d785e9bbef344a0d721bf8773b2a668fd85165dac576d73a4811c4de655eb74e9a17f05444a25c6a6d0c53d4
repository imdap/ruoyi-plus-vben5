import { lazyMotionContextProvider } from "./context.mjs";
import { defineComponent, ref } from "vue";
const LazyMotion = defineComponent({
  name: "LazyMotion",
  inheritAttrs: false,
  props: {
    features: {
      type: [Object, Function],
      default: () => []
    },
    strict: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const features = ref(Array.isArray(props.features) ? props.features : []);
    if (!Array.isArray(props.features)) {
      const featuresPromise = typeof props.features === "function" ? props.features() : props.features;
      featuresPromise.then((feats) => {
        features.value = feats;
      });
    }
    lazyMotionContextProvider({
      features,
      strict: props.strict
    });
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
});
export {
  LazyMotion
};
