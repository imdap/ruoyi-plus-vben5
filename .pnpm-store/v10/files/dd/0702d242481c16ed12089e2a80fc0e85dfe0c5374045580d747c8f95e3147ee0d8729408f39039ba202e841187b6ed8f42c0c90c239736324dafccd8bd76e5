import { TSESLint } from '@typescript-eslint/utils'
import { CommonPartitionOptions } from '../types/common-partition-options.js'
import { SortingNode } from '../types/sorting-node.js'
/**
 * Parameters for determining if a new partition should start.
 */
interface ShouldPartitionParameters {
  lastSortingNode: Pick<SortingNode, 'node'> | undefined
  sortingNode: Pick<SortingNode, 'node'>
  tokenValueToIgnoreBefore?: string
  options: CommonPartitionOptions
  sourceCode: TSESLint.SourceCode
}
/**
 * Determines if a new partition (independent sorting section) should start.
 *
 * Partitions divide code into independent sections that are sorted separately,
 * preventing elements from being moved across partition boundaries. This is
 * critical for preserving logical groupings in code.
 *
 * A new partition is created when:
 *
 * - A partition comment is found before the current node
 * - An empty line exists between nodes (when partitionByNewLine is enabled).
 *
 * @example
 *
 * ```ts
 * // React component with partition comments
 * import React from 'react'
 * import { useState, useEffect } from 'react'
 * // --- Utils ---  <- This comment creates a partition
 * import { formatDate } from './utils/date.js'
 * import { apiClient } from './utils/api.js'
 * ```
 *
 * @example
 *
 * ```ts
 * // Object with newline partitions
 * const config = {
 *   // API settings
 *   apiUrl: 'https://api.example.com',
 *   timeout: 5000,
 *   // <- Empty line creates partition
 *   // UI settings
 *   theme: 'dark',
 *   language: 'en',
 * }
 * ```
 *
 * @example
 *
 * ```ts
 * // Class members with sections
 * class UserService {
 * private cache: Map<string, User>;
 * private logger: Logger;
 *
 * // Public methods section
 * async getUser(id: string) { ... }
 * async updateUser(id: string, data: Partial<User>) { ... }
 * }
 * ```
 *
 * @param params - Parameters for partition detection.
 * @returns True if a new partition should start at the current node.
 */
export declare function shouldPartition({
  tokenValueToIgnoreBefore,
  lastSortingNode,
  sortingNode,
  sourceCode,
  options,
}: ShouldPartitionParameters): boolean
export {}
