import { watch } from "vue";
class FeatureManager {
  constructor(state) {
    this.features = [];
    const { features = [], lazyMotionContext } = state.options;
    const allFeatures = features.concat(lazyMotionContext.features.value);
    this.features = allFeatures.map((Feature) => new Feature(state));
    const featureInstances = this.features;
    watch(lazyMotionContext.features, (features2) => {
      features2.forEach((feature) => {
        if (!allFeatures.includes(feature)) {
          allFeatures.push(feature);
          const featureInstance = new feature(state);
          featureInstances.push(featureInstance);
          if (state.isMounted()) {
            featureInstance.beforeMount();
            featureInstance.mount();
          }
        }
      });
    }, {
      flush: "pre"
    });
  }
  mount() {
    this.features.forEach((feature) => feature.mount());
  }
  beforeMount() {
    this.features.forEach((feature) => {
      var _a;
      return (_a = feature.beforeMount) == null ? void 0 : _a.call(feature);
    });
  }
  unmount() {
    this.features.forEach((feature) => feature.unmount());
  }
  update() {
    this.features.forEach((feature) => {
      var _a;
      return (_a = feature.update) == null ? void 0 : _a.call(feature);
    });
  }
  beforeUpdate(options) {
    this.features.forEach((feature) => {
      var _a;
      return (_a = feature.beforeUpdate) == null ? void 0 : _a.call(feature, options);
    });
  }
  beforeUnmount() {
    this.features.forEach((feature) => feature.beforeUnmount());
  }
}
export {
  FeatureManager
};
