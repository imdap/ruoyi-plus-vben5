import { scrapeMotionValuesFromProps as scrapeMotionValuesFromProps$1 } from "../../html/utils/scrape-motion-values.mjs";
import { isMotionValue } from "../../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/value/utils/is-motion-value.mjs";
import { transformPropOrder } from "../../../../../../../../motion-dom@12.24.11/external/motion-dom/dist/es/render/utils/keys-transform.mjs";
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
  const newValues = scrapeMotionValuesFromProps$1(props, prevProps, visualElement);
  for (const key in props) {
    if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
      const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}
export {
  scrapeMotionValuesFromProps
};
