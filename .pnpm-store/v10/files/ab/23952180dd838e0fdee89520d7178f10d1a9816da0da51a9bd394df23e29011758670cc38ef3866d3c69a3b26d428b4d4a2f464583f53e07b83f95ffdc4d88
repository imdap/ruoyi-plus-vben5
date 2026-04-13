import { getMotionElement } from "../hooks/use-motion-elm.mjs";
import { defineComponent, h, Comment, mergeProps, cloneVNode } from "vue";
import { useMotionState } from "./use-motion-state.mjs";
import { MotionComponentProps } from "./props.mjs";
function checkMotionIsHidden(instance) {
  var _a;
  const isHidden = ((_a = getMotionElement(instance.$el)) == null ? void 0 : _a.style.display) === "none";
  const hasTransition = instance.$.vnode.transition;
  return hasTransition && isHidden;
}
const componentMaxCache = /* @__PURE__ */ new Map();
const componentMiniCache = /* @__PURE__ */ new Map();
function renderSlotFragments(fragments) {
  if (!Array.isArray(fragments))
    return [fragments];
  const result = [];
  for (const item of fragments) {
    if (Array.isArray(item))
      result.push(...item);
    else
      result.push(item);
  }
  return result;
}
const SELF_CLOSING_TAGS = ["area", "img", "input"];
function handlePrimitiveAndSlot(asTag, allAttrs, slots) {
  var _a, _b;
  if (typeof asTag === "string" && SELF_CLOSING_TAGS.includes(asTag)) {
    return h(asTag, allAttrs);
  }
  if (asTag === "template") {
    if (!slots.default)
      return null;
    const childrens = renderSlotFragments(slots.default());
    const firstNonCommentChildrenIndex = childrens.findIndex((child) => child.type !== Comment);
    if (firstNonCommentChildrenIndex === -1)
      return childrens;
    const firstNonCommentChildren = childrens[firstNonCommentChildrenIndex];
    (_a = firstNonCommentChildren.props) == null ? true : delete _a.ref;
    const mergedProps = firstNonCommentChildren.props ? mergeProps(allAttrs, firstNonCommentChildren.props) : allAttrs;
    if (allAttrs.class && ((_b = firstNonCommentChildren.props) == null ? void 0 : _b.class))
      delete firstNonCommentChildren.props.class;
    const cloned = cloneVNode(firstNonCommentChildren, mergedProps);
    for (const prop in mergedProps) {
      if (prop.startsWith("on")) {
        cloned.props || (cloned.props = {});
        cloned.props[prop] = mergedProps[prop];
      }
    }
    if (childrens.length === 1)
      return cloned;
    childrens[firstNonCommentChildrenIndex] = cloned;
    return childrens;
  }
  return null;
}
function createMotionComponent(component, options = {}) {
  var _a;
  const isString = typeof component === "string";
  const name = isString ? component : component.name || "";
  const componentCache = ((_a = options.features) == null ? void 0 : _a.length) > 0 ? componentMaxCache : componentMiniCache;
  if (isString && (componentCache == null ? void 0 : componentCache.has(component))) {
    return componentCache.get(component);
  }
  const motionComponent = defineComponent({
    inheritAttrs: false,
    props: {
      ...MotionComponentProps,
      features: {
        type: Object,
        default: () => options.features || []
      },
      as: { type: [String, Object], default: component || "div" }
    },
    name: name ? `motion.${name}` : "Motion",
    setup(props, { slots }) {
      const { getProps, getAttrs, state } = useMotionState(props);
      function onVnodeUpdated() {
        const el = state.element;
        const isComponent = typeof props.as === "object";
        if ((!isComponent || props.asChild) && el) {
          const { style } = getAttrs();
          if (style) {
            for (const [key, val] of Object.entries(style)) {
              el.style[key] = val;
            }
          }
        }
      }
      return () => {
        const motionProps = getProps();
        const motionAttrs = getAttrs();
        const asTag = props.asChild ? "template" : props.as;
        const allAttrs = {
          ...options.forwardMotionProps || props.forwardMotionProps ? motionProps : {},
          ...motionAttrs,
          onVnodeUpdated
        };
        const primitiveOrSlotResult = handlePrimitiveAndSlot(asTag, allAttrs, slots);
        if (primitiveOrSlotResult !== null) {
          return primitiveOrSlotResult;
        }
        return h(asTag, {
          ...allAttrs
        }, slots);
      };
    }
  });
  if (isString) {
    componentCache == null ? void 0 : componentCache.set(component, motionComponent);
  }
  return motionComponent;
}
function createMotionComponentWithFeatures(features = []) {
  return new Proxy({}, {
    get(target, prop) {
      if (prop === "create") {
        return (component, options) => createMotionComponent(component, {
          ...options,
          features
        });
      }
      return createMotionComponent(prop, {
        features
      });
    }
  });
}
export {
  checkMotionIsHidden,
  createMotionComponent,
  createMotionComponentWithFeatures
};
