import { CommonInputProps } from '@v-c/input';
import { TextAreaProps } from '../../textarea/src';
import { VueNode } from '../../util/src';
import { CSSProperties } from 'vue';
import { OptionProps } from './Option';
import { filterOption as defaultFilterOption, validateSearch as defaultValidateSearch } from './util';
type BaseTextareaAttrs = Omit<TextAreaProps, 'prefix' | 'onChange' | 'onSelect' | 'showCount' | 'classNames'>;
export type Placement = 'top' | 'bottom';
export type Direction = 'ltr' | 'rtl';
export interface DataDrivenOptionProps extends OptionProps {
    label?: VueNode;
}
export interface MentionsProps extends BaseTextareaAttrs {
    id?: string;
    autoFocus?: boolean;
    className?: string;
    defaultValue?: string;
    notFoundContent?: VueNode;
    split?: string;
    transitionName?: string;
    placement?: Placement;
    direction?: Direction;
    prefix?: string | string[];
    prefixCls?: string;
    value?: string;
    silent?: boolean;
    filterOption?: false | typeof defaultFilterOption;
    validateSearch?: typeof defaultValidateSearch;
    onChange?: (text: string) => void;
    onSelect?: (option: OptionProps, prefix: string) => void;
    onSearch?: (text: string, prefix: string) => void;
    onFocus?: (e: FocusEvent) => void;
    onBlur?: (e: FocusEvent) => void;
    getPopupContainer?: () => HTMLElement;
    popupClassName?: string;
    options?: DataDrivenOptionProps[];
    classNames?: CommonInputProps['classNames'] & {
        mentions?: string;
        textarea?: string;
        popup?: string;
    };
    styles?: {
        suffix?: CSSProperties;
        textarea?: CSSProperties;
        popup?: CSSProperties;
    };
    onPopupScroll?: (event: UIEvent) => void;
    rows?: HTMLTextAreaElement['rows'];
}
export interface MentionsRef {
    focus: VoidFunction;
    blur: VoidFunction;
    /** @deprecated It may not work as expected */
    textarea: HTMLTextAreaElement | null;
    nativeElement: HTMLElement;
}
declare const Mentions: import('vue').DefineSetupFnComponent<MentionsProps, {}, {}, MentionsProps & {}, import('vue').PublicProps>;
export default Mentions;
