import { defineComponent, renderSlot, unref } from "vue";
import { useLayoutGroupProvider } from "./use-layout-group.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LayoutGroup",
  props: {
    id: {},
    inherit: { type: [Boolean, String], default: true }
  },
  setup(__props) {
    const props = __props;
    const { forceRender, key } = useLayoutGroupProvider(props);
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default", {
        renderKey: unref(key),
        forceRender: unref(forceRender)
      });
    };
  }
});
export {
  _sfc_main as default
};
