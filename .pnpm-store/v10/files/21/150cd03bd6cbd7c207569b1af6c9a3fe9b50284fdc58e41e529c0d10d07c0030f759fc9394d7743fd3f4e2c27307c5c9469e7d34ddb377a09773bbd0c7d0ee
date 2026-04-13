import { memo } from "../../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/memo.mjs";
const supportsPartialKeyframes = /* @__PURE__ */ memo(() => {
  try {
    document.createElement("div").animate({ opacity: [1] });
  } catch (e) {
    return false;
  }
  return true;
});
export {
  supportsPartialKeyframes
};
