import { MapToken } from "../interface/maps/index.js";
import { AliasToken } from "../interface/alias.js";
import { OverrideToken } from "../interface/cssinjs-utils.js";
import "../interface/index.js";

//#region src/theme/util/alias.d.ts
/** Raw merge of `@ant-design/cssinjs` token. Which need additional process */
type RawMergedToken = MapToken & OverrideToken & {
  override: Partial<AliasToken>;
};
/**
 * Seed (designer) > Derivative (designer) > Alias (developer).
 *
 * Merge seed & derivative & override token and generate alias token for developer.
 */
declare function formatToken(derivativeToken: RawMergedToken): AliasToken;
//#endregion
export { formatToken as default };