import { CommonPartitionOptions } from './common-partition-options.js'
import { CommonGroupsOptions } from './common-groups-options.js'
import { CommonOptions } from './common-options.js'
export type AllCommonOptions<
  CustomTypeOption extends string,
  AdditionalSortOptions,
  CustomGroupMatchOptions,
> = CommonGroupsOptions<
  CustomTypeOption,
  AdditionalSortOptions,
  CustomGroupMatchOptions
> &
  CommonOptions<CustomTypeOption, AdditionalSortOptions> &
  CommonPartitionOptions
