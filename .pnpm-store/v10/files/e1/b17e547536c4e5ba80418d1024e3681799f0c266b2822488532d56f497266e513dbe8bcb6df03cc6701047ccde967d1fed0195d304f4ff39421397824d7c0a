import { Ref } from 'vue';
import { SearchConfig, SelectProps } from '../Select';
export type SearchConfigResult = [Ref<boolean | undefined>, Ref<SearchConfig>];
export default function useSearchConfig(showSearch: Ref<boolean | SearchConfig | undefined>, props: {
    filterOption?: Ref<SelectProps['filterOption']>;
    searchValue?: Ref<string | undefined>;
    optionFilterProp?: Ref<string | undefined>;
    filterSort?: Ref<SelectProps['filterSort']>;
    onSearch?: Ref<((value: string) => void) | undefined>;
    autoClearSearchValue?: Ref<boolean | undefined>;
}, mode: Ref<SelectProps['mode']>): SearchConfigResult;
