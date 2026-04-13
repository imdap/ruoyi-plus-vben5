import { VueNode } from '@v-c/util/dist/type';
import { Ref, ShallowRef } from 'vue';
import { RawValueType } from '../interface';
import { DefaultOptionType, FieldNames } from '../Select';
export interface OptionsResult<OptionType> {
    options: OptionType[];
    valueOptions: Map<RawValueType, OptionType>;
    labelOptions: Map<VueNode, OptionType>;
}
/**
 * Parse `options` and flatten them.
 */
export default function useOptions<OptionType extends DefaultOptionType = DefaultOptionType>(options: Ref<OptionType[] | undefined>, childrenOptions: ShallowRef<OptionType[]>, fieldNames: Ref<FieldNames>, optionFilterProp: Ref<string | undefined>, optionLabelProp: Ref<string | undefined>): Ref<OptionsResult<OptionType>>;
