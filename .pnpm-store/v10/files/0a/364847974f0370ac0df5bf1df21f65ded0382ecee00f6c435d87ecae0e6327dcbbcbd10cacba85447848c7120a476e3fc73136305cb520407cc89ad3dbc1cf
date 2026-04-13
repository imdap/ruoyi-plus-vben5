import type { Attributes } from "./schemas/attributes.js";
import type { Callees } from "./schemas/callees.js";
import type { Tags } from "./schemas/tags.js";
import type { Variables } from "./schemas/variables.js";
import type { Selectors } from "../types/rule.js";
type LegacySelectorsByKind = {
    attributes?: Attributes | undefined;
    callees?: Callees | undefined;
    tags?: Tags | undefined;
    variables?: Variables | undefined;
};
export declare function migrateLegacySelectorsToFlatSelectors(legacy: LegacySelectorsByKind): Selectors;
export declare function migrateFlatSelectorsToLegacySelectors(selectors: Selectors): LegacySelectorsByKind;
export declare function hasLegacySelectorConfig(options: LegacySelectorsByKind): boolean;
export {};
//# sourceMappingURL=migrate.d.ts.map