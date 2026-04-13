import { MouseEventHandler } from '@v-c/util/dist/EventInterface';
import { IDialogPropTypes } from '../../IDialogPropTypes';
export interface PanelProps extends Omit<IDialogPropTypes, 'getOpenCount'> {
    prefixCls: string;
    ariaId?: string;
    onMouseDown?: (e: MouseEvent) => void;
    onMouseUp?: MouseEventHandler;
    holderRef?: (el: HTMLDivElement) => void;
    /** Used for focus lock. When true and open, focus will lock into the panel */
    isFixedPos?: boolean;
}
export interface ContentRef {
    focus: () => void;
}
declare const Panel: import('vue').DefineSetupFnComponent<PanelProps & {
    animationVisible: boolean;
}, {}, {}, PanelProps & {
    animationVisible: boolean;
} & {}, import('vue').PublicProps>;
export default Panel;
