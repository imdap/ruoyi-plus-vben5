import { useMotionConfig } from "../motion-config/context.mjs";
import { frame } from "../../external/.pnpm/motion-dom@12.24.11/external/motion-dom/dist/es/frameloop/frame.mjs";
let popId = 0;
function usePopLayout(props) {
  const styles = /* @__PURE__ */ new WeakMap();
  const config = useMotionConfig();
  function addPopStyle(element) {
    if (props.mode !== "popLayout")
      return;
    const parent = element.offsetParent;
    const parentWidth = parent instanceof HTMLElement ? parent.offsetWidth || 0 : 0;
    const size = {
      height: element.offsetHeight || 0,
      width: element.offsetWidth || 0,
      top: element.offsetTop,
      left: element.offsetLeft,
      right: 0
    };
    size.right = parentWidth - size.width - size.left;
    const x = props.anchorX === "left" ? `left: ${size.left}px` : `right: ${size.right}px`;
    const elementPopId = `pop-${popId++}`;
    element.dataset.motionPopId = elementPopId;
    const style = document.createElement("style");
    if (config.value.nonce) {
      style.nonce = config.value.nonce;
    }
    styles.set(element, style);
    document.head.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
    [data-motion-pop-id="${elementPopId}"] {
      position: absolute !important;
      width: ${size.width}px !important;
      height: ${size.height}px !important;
      top: ${size.top}px !important;
      ${x} !important;
      }
      `);
    }
  }
  function removePopStyle(element) {
    const style = styles.get(element);
    if (!style)
      return;
    styles.delete(element);
    frame.render(() => {
      document.head.removeChild(style);
    });
  }
  return {
    addPopStyle,
    removePopStyle
  };
}
export {
  usePopLayout
};
