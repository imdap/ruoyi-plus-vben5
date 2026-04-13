import { VueNode } from '@v-c/util/dist/type';
import { CSSProperties } from 'vue';
export type SemanticName = 'item' | 'label';
export type SegmentedValue = string | number;
export type SegmentedRawOption = SegmentedValue;
export interface SegmentedLabeledOption<ValueType = SegmentedRawOption> {
    class?: string;
    disabled?: boolean;
    label: VueNode;
    value: ValueType;
    /**
     * html `title` property for label
     */
    title?: string;
}
type ItemRender = (node: VueNode, info: {
    item: SegmentedLabeledOption;
}) => VueNode;
type SegmentedOptions<T = SegmentedRawOption> = (T | SegmentedLabeledOption<T>)[];
export interface SegmentedProps {
    options: SegmentedOptions;
    defaultValue?: SegmentedValue;
    value?: SegmentedValue;
    onChange?: (value: SegmentedValue) => void;
    disabled?: boolean;
    prefixCls?: string;
    direction?: 'ltr' | 'rtl';
    motionName?: string;
    vertical?: boolean;
    name?: string;
    classNames?: Partial<Record<SemanticName, string>>;
    styles?: Partial<Record<SemanticName, CSSProperties>>;
    itemRender?: ItemRender;
}
declare const Segmented: import('vue').DefineSetupFnComponent<SegmentedProps, {}, {}, SegmentedProps & {}, import('vue').PublicProps>;
export default Segmented;
