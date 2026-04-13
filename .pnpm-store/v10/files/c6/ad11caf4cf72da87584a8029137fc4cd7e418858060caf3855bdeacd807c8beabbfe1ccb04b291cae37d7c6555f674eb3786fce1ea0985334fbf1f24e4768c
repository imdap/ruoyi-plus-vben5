import { GroupsOptions } from '../../types/common-groups-options.js'
/**
 * Validates that side-effect import groups are configured correctly.
 *
 * When sortSideEffects is false, side-effect imports must be in standalone
 * groups, not mixed with regular imports. This prevents unintended reordering
 * that could break code execution order.
 *
 * @param options - Options for validating side-effect groups.
 * @param options.groups - Import group configuration.
 * @param options.sortSideEffects - Whether side-effect imports can be sorted.
 * @throws {Error} If side-effect groups are incorrectly nested with regular
 *   groups.
 */
export declare function validateSideEffectsConfiguration({
  sortSideEffects,
  groups,
}: {
  sortSideEffects: boolean
  groups: GroupsOptions
}): void
