import { VueNode } from '../../util/src';
import { Ref } from 'vue';
import { OptionProps } from './Option.tsx';
export interface MentionsContextProps {
    notFoundContent: VueNode;
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    selectOption: (option: OptionProps) => void;
    onFocus: (e: FocusEvent) => void;
    onBlur: (e: FocusEvent) => void;
    onScroll: (e: UIEvent) => void;
}
export declare function useMentionsContext(): Ref<MentionsContextProps, MentionsContextProps>;
export declare const MentionsProvider: import('vue').DefineSetupFnComponent<{
    value: MentionsContextProps;
}, {}, {}, {
    value: MentionsContextProps;
} & {}, import('vue').PublicProps>;
