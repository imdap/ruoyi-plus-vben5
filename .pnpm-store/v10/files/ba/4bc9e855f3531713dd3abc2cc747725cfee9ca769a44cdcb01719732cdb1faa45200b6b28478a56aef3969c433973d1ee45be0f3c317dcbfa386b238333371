import { InternalMode, SelectorProps } from '../../../interface';
export interface SingleSelectorProps<DateType extends object = any> extends SelectorProps<DateType> {
    id?: string;
    value?: DateType[];
    onChange: (date: DateType[]) => void;
    internalPicker: InternalMode;
    disabled?: boolean;
    /** All the field show as `placeholder` */
    allHelp?: boolean;
    placeholder?: string;
    invalid?: boolean;
    onInvalid: (valid: boolean) => void;
    removeIcon?: any;
    maxTagCount?: number | 'responsive';
    multiple?: boolean;
    onMouseDown?: (e: MouseEvent) => void;
    autoFocus?: boolean;
    tabIndex?: number | string;
}
declare const SingleSelector: import('vue').DefineSetupFnComponent<SingleSelectorProps<any>, {}, {}, SingleSelectorProps<any> & {}, import('vue').PublicProps>;
export default SingleSelector;
