/**
 * @license lucide-vue-next v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

import { h } from 'vue';
import { hasA11yProp } from './shared/src/utils/hasA11yProp.js';
import { isEmptyString } from './shared/src/utils/isEmptyString.js';
import { mergeClasses } from './shared/src/utils/mergeClasses.js';
import { toKebabCase } from './shared/src/utils/toKebabCase.js';
import { toPascalCase } from './shared/src/utils/toPascalCase.js';
import defaultAttributes from './defaultAttributes.js';

const Icon = ({
  name,
  iconNode,
  absoluteStrokeWidth,
  "absolute-stroke-width": absoluteStrokeWidthKebabCase,
  strokeWidth,
  "stroke-width": strokeWidthKebabCase,
  size = defaultAttributes.width,
  color = defaultAttributes.stroke,
  ...props
}, { slots }) => {
  return h(
    "svg",
    {
      ...defaultAttributes,
      ...props,
      width: size,
      height: size,
      stroke: color,
      "stroke-width": isEmptyString(absoluteStrokeWidth) || isEmptyString(absoluteStrokeWidthKebabCase) || absoluteStrokeWidth === true || absoluteStrokeWidthKebabCase === true ? Number(strokeWidth || strokeWidthKebabCase || defaultAttributes["stroke-width"]) * 24 / Number(size) : strokeWidth || strokeWidthKebabCase || defaultAttributes["stroke-width"],
      class: mergeClasses(
        "lucide",
        props.class,
        ...name ? [`lucide-${toKebabCase(toPascalCase(name))}-icon`, `lucide-${toKebabCase(name)}`] : ["lucide-icon"]
      ),
      ...!slots.default && !hasA11yProp(props) && { "aria-hidden": "true" }
    },
    [...iconNode.map((child) => h(...child)), ...slots.default ? [slots.default()] : []]
  );
};

export { Icon as default };
//# sourceMappingURL=Icon.js.map
