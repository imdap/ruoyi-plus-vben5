import { Ref } from 'vue';
import { BaseSelectProps } from '../BaseSelect';
export interface BaseSelectContextProps extends BaseSelectProps {
    triggerOpen: boolean;
    multiple: boolean;
    toggleOpen: (open?: boolean) => void;
    role?: string;
    lockOptions: boolean;
    rawOpen: boolean;
}
export declare function useBaseSelectProvider(context: Ref<BaseSelectContextProps>): void;
export default function useBaseProps(): Ref<BaseSelectContextProps | null>;
