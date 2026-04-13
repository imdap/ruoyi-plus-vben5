import { VueNode } from '../../../../util/src/type';
import { SelectorProps } from '../../interface';
export type SelectorIdType = string | {
    start?: string;
    end?: string;
};
export interface RangeSelectorProps<DateType = any> extends SelectorProps<DateType> {
    id?: SelectorIdType;
    activeIndex: number | null;
    separator?: VueNode;
    value?: [DateType?, DateType?];
    onChange: (date: DateType, index?: number) => void;
    disabled: [boolean, boolean];
    allHelp: boolean;
    placeholder?: string | [string, string];
    invalid: [boolean, boolean];
    placement?: string;
    onMouseDown?: (e: MouseEvent) => void;
    autoFocus?: boolean;
    tabIndex?: number | string;
    onActiveInfo: (info: [activeInputLeft: number, activeInputRight: number, selectorWidth: number]) => void;
}
declare const RangeSelector: import('vue').DefineSetupFnComponent<RangeSelectorProps<any>, import('vue').EmitsOptions, {}, RangeSelectorProps<any> & ({
    [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
    [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
}), import('vue').PublicProps>;
export default RangeSelector;
