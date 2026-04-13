import { buildTransform } from "./build-transform.mjs";
import { transformProps } from "../../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/render/utils/keys-transform.mjs";
import { isCSSVariableName } from "../../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/animation/utils/is-css-variable.mjs";
import { getValueAsType } from "../../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/value/types/utils/get-as-type.mjs";
import { numberValueTypes } from "../../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/value/types/maps/number.mjs";
function buildHTMLStyles(state, latestValues, transformTemplate) {
  const { style, vars, transformOrigin } = state;
  let hasTransform = false;
  let hasTransformOrigin = false;
  for (const key in latestValues) {
    const value = latestValues[key];
    if (transformProps.has(key)) {
      hasTransform = true;
      continue;
    } else if (isCSSVariableName(key)) {
      vars[key] = value;
      continue;
    } else {
      const valueAsType = getValueAsType(value, numberValueTypes[key]);
      if (key.startsWith("origin")) {
        hasTransformOrigin = true;
        transformOrigin[key] = valueAsType;
      } else {
        style[key] = valueAsType;
      }
    }
  }
  if (!latestValues.transform) {
    if (hasTransform || transformTemplate) {
      style.transform = buildTransform(latestValues, state.transform, transformTemplate);
    } else if (style.transform) {
      style.transform = "none";
    }
  }
  if (hasTransformOrigin) {
    const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
    style.transformOrigin = `${originX} ${originY} ${originZ}`;
  }
}
export {
  buildHTMLStyles
};
