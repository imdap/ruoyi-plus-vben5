import { PortalProps } from '@v-c/portal';
import { ResizeObserverProps } from '@v-c/resize-observer';
import { CSSMotionProps } from '@v-c/util/dist/utils/transition';
import { CSSProperties } from 'vue';
import { TriggerProps } from '../index.tsx';
import { AlignType, ArrowPos, ArrowTypeOuter } from '../interface.ts';
export interface MobileConfig {
    mask?: boolean;
    /** Set popup motion. You can ref `rc-motion` for more info. */
    motion?: CSSMotionProps;
    /** Set mask motion. You can ref `rc-motion` for more info. */
    maskMotion?: CSSMotionProps;
}
export interface PopupProps {
    onEsc?: PortalProps['onEsc'];
    prefixCls: string;
    className?: string;
    style?: CSSProperties;
    popup?: TriggerProps['popup'];
    target: HTMLElement;
    onMouseEnter?: (e: MouseEvent) => void;
    onMouseLeave?: (e: MouseEvent) => void;
    onPointerEnter?: (e: PointerEvent) => void;
    onPointerDownCapture?: (e: PointerEvent) => void;
    zIndex?: number;
    mask?: boolean;
    onVisibleChanged: (visible: boolean) => void;
    align?: AlignType;
    arrow?: ArrowTypeOuter | boolean;
    arrowPos: ArrowPos;
    open: boolean;
    /** Tell Portal that should keep in screen. e.g. should wait all motion end */
    keepDom: boolean;
    fresh?: boolean;
    onClick?: (e: MouseEvent) => void;
    motion?: CSSMotionProps;
    maskMotion?: CSSMotionProps;
    forceRender?: boolean;
    getPopupContainer?: TriggerProps['getPopupContainer'];
    autoDestroy?: boolean;
    portal: any;
    ready: boolean;
    offsetX: number;
    offsetY: number;
    offsetR: number;
    offsetB: number;
    onAlign: VoidFunction;
    onPrepare: () => Promise<void>;
    stretch?: string;
    targetWidth?: number;
    targetHeight?: number;
    onResize?: ResizeObserverProps['onResize'];
    mobile?: MobileConfig;
}
declare const Popup: import('vue').DefineSetupFnComponent<PopupProps, {}, {}, PopupProps & {}, import('vue').PublicProps>;
export default Popup;
