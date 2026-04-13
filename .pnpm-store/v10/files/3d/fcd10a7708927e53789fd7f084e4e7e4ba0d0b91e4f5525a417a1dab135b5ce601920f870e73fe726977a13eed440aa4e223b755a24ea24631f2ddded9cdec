import { supportsFlags } from "./flags.mjs";
import { memo } from "../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/memo.mjs";
function memoSupports(callback, supportsFlag) {
  const memoized = memo(callback);
  return () => supportsFlags[supportsFlag] ?? memoized();
}
export {
  memoSupports
};
