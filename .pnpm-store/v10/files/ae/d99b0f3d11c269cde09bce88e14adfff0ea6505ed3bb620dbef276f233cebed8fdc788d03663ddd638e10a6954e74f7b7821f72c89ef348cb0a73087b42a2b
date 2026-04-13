import { isForcedMotionValue } from "../../../motion/utils/is-forced-motion-value.mjs";
import { isMotionValue } from "../../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/value/utils/is-motion-value.mjs";
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
  var _a;
  const { style } = props;
  const newValues = {};
  for (const key in style) {
    if (isMotionValue(style[key]) || prevProps.style && isMotionValue(prevProps.style[key]) || isForcedMotionValue(key, props) || ((_a = visualElement == null ? void 0 : visualElement.getValue(key)) == null ? void 0 : _a.liveStyle) !== void 0) {
      newValues[key] = style[key];
    }
  }
  return newValues;
}
export {
  scrapeMotionValuesFromProps
};
