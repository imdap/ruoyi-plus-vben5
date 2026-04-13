import { mixNumber } from "../../../utils/mix/number.mjs";
import { progress } from "../../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/progress.mjs";
function fillOffset(offset, remaining) {
  const min = offset[offset.length - 1];
  for (let i = 1; i <= remaining; i++) {
    const offsetProgress = progress(0, remaining, i);
    offset.push(mixNumber(min, 1, offsetProgress));
  }
}
export {
  fillOffset
};
