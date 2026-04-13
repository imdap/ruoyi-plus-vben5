import { ComparatorByOptionsComputer } from '../../utils/compare/default-comparator-by-options-computer.js'
import { SortEnumsSortingNode, Options } from './types.js'
/**
 * Builds a comparator computer function for sorting enum members.
 *
 * Creates a function that returns the appropriate comparator based on the
 * sorting options and whether the enum is numeric. Handles sorting by name or
 * by value depending on the `sortByValue` option.
 *
 * @param isNumericEnum - Whether the enum contains only numeric values.
 * @returns A comparator computer function that creates comparators from
 *   options.
 */
export declare function buildComparatorByOptionsComputer(
  isNumericEnum: boolean,
): ComparatorByOptionsComputer<Required<Options[number]>, SortEnumsSortingNode>
