import { defineComponent, computed, openBlock, createBlock, resolveDynamicComponent, Transition, TransitionGroup, mergeProps, unref, withCtx, renderSlot } from "vue";
import { usePresenceContainer } from "./use-presence-container.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "AnimatePresence",
    inheritAttrs: true
  },
  __name: "AnimatePresence",
  props: {
    mode: { default: "sync" },
    initial: { type: Boolean, default: true },
    as: {},
    custom: {},
    onExitComplete: {},
    anchorX: { default: "left" }
  },
  setup(__props) {
    const props = __props;
    const { enter, exit } = usePresenceContainer(props);
    const transitionProps = computed(() => {
      if (props.mode !== "wait") {
        return {
          tag: props.as
        };
      }
      return {
        mode: props.mode === "wait" ? "out-in" : void 0
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.mode === "wait" ? Transition : TransitionGroup), mergeProps(transitionProps.value, {
        appear: "",
        onLeave: unref(exit),
        onEnter: unref(enter)
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["onLeave", "onEnter"]);
    };
  }
});
export {
  _sfc_main as default
};
