import { ShallowRef } from 'vue';
import { IDialogPropTypes } from './IDialogPropTypes.ts';
export interface RefContextProps {
    panel: ShallowRef<HTMLDivElement | undefined>;
    setPanel: (panel: HTMLDivElement) => void;
}
export declare function useRefProvide(props: IDialogPropTypes): {
    panel: ShallowRef<HTMLDivElement | undefined, HTMLDivElement | undefined>;
    setPanelRef: (el: HTMLDivElement) => void;
};
export declare function useGetRefContext(): RefContextProps;
