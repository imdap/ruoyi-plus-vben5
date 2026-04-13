import { CSSProperties } from 'vue';
import { PosInfo } from './hooks/useTarget';
import { SemanticName, TourProps } from './interface';
export interface MaskProps {
    prefixCls?: string;
    pos?: PosInfo | null;
    rootClassName?: string;
    showMask?: boolean;
    fill?: string;
    open?: boolean;
    animated?: boolean | {
        placeholder: boolean;
    };
    zIndex?: number;
    disabledInteraction?: boolean;
    classNames?: Partial<Record<SemanticName, string>>;
    styles?: Partial<Record<SemanticName, CSSProperties>>;
    getPopupContainer?: TourProps['getPopupContainer'];
}
declare const Mask: import('vue').DefineSetupFnComponent<MaskProps, {}, {}, MaskProps & {}, import('vue').PublicProps>;
export default Mask;
