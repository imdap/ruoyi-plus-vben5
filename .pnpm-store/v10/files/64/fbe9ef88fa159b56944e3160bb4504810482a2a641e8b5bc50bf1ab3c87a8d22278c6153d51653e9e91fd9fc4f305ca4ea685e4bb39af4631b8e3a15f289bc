import { CommonGroupsOptions } from '../types/common-groups-options.js'
import { CommonOptions } from '../types/common-options.js'
/**
 * Options for custom sort configuration validation.
 */
type Options = {
  groups?: CommonGroupsOptions<string, unknown, unknown>['groups']
} & Pick<CommonOptions, 'alphabet' | 'type'>
/**
 * Validates configuration when using custom sort type.
 *
 * Ensures that when a user selects 'custom' sorting type, they provide a valid
 * alphabet string. This prevents runtime errors and ensures the custom sorting
 * has a defined order to follow.
 *
 * The function is called at the beginning of every sorting rule's execution to
 * catch configuration errors early and provide clear error messages.
 *
 * @param options - Configuration options to validate.
 * @throws {Error} If type is 'custom' but alphabet is empty.
 */
export declare function validateCustomSortConfiguration(options: Options): void
export {}
