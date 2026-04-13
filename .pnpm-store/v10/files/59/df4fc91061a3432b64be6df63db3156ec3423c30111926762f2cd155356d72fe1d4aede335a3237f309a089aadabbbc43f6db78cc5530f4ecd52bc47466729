import { isCSSVar } from "../../render/dom/is-css-var.mjs";
import { transformProps } from "../../render/utils/keys-transform.mjs";
import { isHTMLElement } from "../../utils/is-html-element.mjs";
import { MotionValue } from "../../value/index.mjs";
import { createSelectorEffect } from "../utils/create-dom-effect.mjs";
import { createEffect } from "../utils/create-effect.mjs";
import { buildTransform } from "./transform.mjs";
const originProps = /* @__PURE__ */ new Set(["originX", "originY", "originZ"]);
const addStyleValue = (element, state, key, value) => {
  let render = void 0;
  let computed = void 0;
  if (transformProps.has(key)) {
    if (!state.get("transform")) {
      if (!isHTMLElement(element) && !state.get("transformBox")) {
        addStyleValue(element, state, "transformBox", new MotionValue("fill-box"));
      }
      state.set("transform", new MotionValue("none"), () => {
        element.style.transform = buildTransform(state);
      });
    }
    computed = state.get("transform");
  } else if (originProps.has(key)) {
    if (!state.get("transformOrigin")) {
      state.set("transformOrigin", new MotionValue(""), () => {
        const originX = state.latest.originX ?? "50%";
        const originY = state.latest.originY ?? "50%";
        const originZ = state.latest.originZ ?? 0;
        element.style.transformOrigin = `${originX} ${originY} ${originZ}`;
      });
    }
    computed = state.get("transformOrigin");
  } else if (isCSSVar(key)) {
    render = () => {
      element.style.setProperty(key, state.latest[key]);
    };
  } else {
    render = () => {
      element.style[key] = state.latest[key];
    };
  }
  return state.set(key, value, render, computed);
};
const styleEffect = /* @__PURE__ */ createSelectorEffect(
  /* @__PURE__ */ createEffect(addStyleValue)
);
export {
  addStyleValue,
  styleEffect
};
