import { correctBorderRadius } from "./scale-border-radius.mjs";
import { correctBoxShadow } from "./scale-box-shadow.mjs";
import { isCSSVariableName } from "../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/animation/utils/is-css-variable.mjs";
const scaleCorrectors = {
  borderRadius: {
    ...correctBorderRadius,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow
};
function addScaleCorrector(correctors) {
  for (const key in correctors) {
    scaleCorrectors[key] = correctors[key];
    if (isCSSVariableName(key)) {
      scaleCorrectors[key].isCSSVariable = true;
    }
  }
}
export {
  addScaleCorrector,
  scaleCorrectors
};
