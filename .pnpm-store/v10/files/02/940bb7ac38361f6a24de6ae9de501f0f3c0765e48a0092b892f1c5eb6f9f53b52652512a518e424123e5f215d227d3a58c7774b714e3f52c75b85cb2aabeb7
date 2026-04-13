import { defineComponent, getCurrentInstance, watchEffect, toDisplayString } from "vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RowValue",
  props: {
    value: {}
  },
  setup(__props) {
    const props = __props;
    const instance = getCurrentInstance().proxy;
    watchEffect((cleanup) => {
      const unSub = props.value.on("change", (value) => {
        if (instance.$el) {
          instance.$el.textContent = value;
        }
      });
      cleanup(unSub);
    });
    return (_ctx, _cache) => {
      return toDisplayString(_ctx.value.get());
    };
  }
});
export {
  _sfc_main as default
};
