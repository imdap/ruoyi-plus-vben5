import { RefOptionListProps } from '@v-c/select';
import { Ref } from 'vue';
import { DefaultOptionType, InternalFieldNames, LegacyKey, SingleValueType } from '../Cascader';
export default function useKeyboard(options: Ref<DefaultOptionType[]>, fieldNames: Ref<InternalFieldNames>, activeValueCells: Ref<LegacyKey[]>, setActiveValueCells: (activeValueCells: LegacyKey[]) => void, onKeyBoardSelect: (valueCells: SingleValueType, option: DefaultOptionType) => void, contextProps: {
    direction: Ref<'ltr' | 'rtl' | undefined>;
    searchValue: Ref<string>;
    toggleOpen: (open?: boolean) => void;
    open: Ref<boolean | undefined>;
}): RefOptionListProps;
