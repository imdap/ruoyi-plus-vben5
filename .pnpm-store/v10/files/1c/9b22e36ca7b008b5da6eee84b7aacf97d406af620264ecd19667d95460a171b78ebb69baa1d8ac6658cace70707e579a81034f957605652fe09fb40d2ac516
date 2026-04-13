import { defineComponent, toRefs, onUpdated, watch, useAttrs, openBlock, createBlock, unref, mergeProps, withCtx, renderSlot, createTextVNode, toDisplayString } from "vue";
import { Motion } from "../motion/index.mjs";
import { invariant } from "hey-listen";
import { reorderContextProvider } from "./context.mjs";
import { compareMin, checkReorder, getValue } from "./utils.mjs";
import { useDomRef } from "../../utils/use-dom-ref.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ReorderGroup",
    inheritAttrs: false
  },
  __name: "Group",
  props: {
    axis: { default: "y" },
    "onUpdate:values": {},
    values: {},
    as: { default: "ul" },
    asChild: { type: Boolean },
    hover: {},
    press: {},
    inView: {},
    focus: {},
    whileDrag: {},
    whileHover: {},
    whilePress: {},
    whileInView: {},
    whileFocus: {},
    forwardMotionProps: { type: Boolean },
    ignoreStrict: { type: Boolean },
    custom: {},
    initial: { type: [String, Array, Object, Boolean] },
    animate: {},
    exit: {},
    variants: {},
    inherit: { type: Boolean },
    style: {},
    transformTemplate: {},
    transition: {},
    onAnimationComplete: {},
    onUpdate: {},
    onAnimationStart: {},
    layout: { type: [Boolean, String] },
    layoutId: {},
    layoutScroll: { type: Boolean },
    layoutRoot: { type: Boolean },
    "data-framer-portal-id": {},
    crossfade: { type: Boolean },
    layoutDependency: {},
    onBeforeLayoutMeasure: {},
    onLayoutMeasure: {},
    onLayoutAnimationStart: {},
    onLayoutAnimationComplete: {},
    globalPressTarget: { type: Boolean },
    onPressStart: {},
    onPress: {},
    onPressCancel: {},
    onHoverStart: {},
    onHoverEnd: {},
    inViewOptions: {},
    onViewportEnter: {},
    onViewportLeave: {},
    drag: { type: [Boolean, String] },
    dragSnapToOrigin: { type: Boolean },
    dragDirectionLock: { type: Boolean },
    dragPropagation: { type: Boolean },
    dragConstraints: { type: [Boolean, Object] },
    dragElastic: { type: [Boolean, Number, Object] },
    dragMomentum: { type: Boolean },
    dragTransition: {},
    dragListener: { type: Boolean },
    dragControls: {},
    onDragStart: {},
    onDragEnd: {},
    onDrag: {},
    onDirectionLock: {},
    onDragTransitionEnd: {},
    onMeasureDragConstraints: {},
    onPanSessionStart: {},
    onPanStart: {},
    onPan: {},
    onPanEnd: {},
    onFocus: {},
    onBlur: {}
  },
  setup(__props) {
    const props = __props;
    const { axis } = toRefs(props);
    let order = [];
    let isReordering = false;
    function warning() {
      invariant(Boolean(props.values), "Reorder.Group must be provided a values prop");
    }
    onUpdated(() => {
      isReordering = false;
    });
    watch(() => props.values, () => {
      if (!isReordering) {
        order = [];
      }
    }, {
      flush: "pre"
    });
    const groupRef = useDomRef();
    reorderContextProvider({
      groupRef,
      axis,
      registerItem: (value, layout) => {
        const idx = order.findIndex((entry) => value === entry.value);
        if (idx !== -1) {
          order[idx].layout = layout[axis.value];
        } else {
          order.push({ value, layout: layout[axis.value] });
        }
        order.sort(compareMin);
      },
      updateOrder: (item, offset, velocity) => {
        var _a;
        if (isReordering)
          return;
        const newOrder = checkReorder(order, item, offset, velocity);
        if (order !== newOrder) {
          isReordering = true;
          order = newOrder;
          (_a = props["onUpdate:values"]) == null ? void 0 : _a.call(
            props,
            newOrder.map(getValue).filter((value) => props.values.includes(value))
          );
        }
      }
    });
    const attrs = useAttrs();
    function bindProps() {
      const { axis: axis2, values, "onUpdate:values": onUpdateValues, ...rest } = props;
      return {
        ...attrs,
        ...rest,
        style: {
          overflowAnchor: "none",
          ...rest.style
        }
      };
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Motion), mergeProps(bindProps(), {
        ref_key: "groupRef",
        ref: groupRef
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default"),
          createTextVNode(" " + toDisplayString(warning()), 1)
        ]),
        _: 3
      }, 16);
    };
  }
});
export {
  _sfc_main as default
};
