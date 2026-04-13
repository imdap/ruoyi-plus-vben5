import { PortalProps } from '@v-c/portal';
import { VueNode } from '@v-c/util/dist/type';
import { CSSProperties } from 'vue';
import { TransformAction, TransformType } from '../hooks/useImageTransform';
import { ImgInfo } from '../Image';
import { FooterSemanticName } from './Footer';
export type PreviewSemanticName = 'root' | 'mask' | 'body' | 'close' | FooterSemanticName;
export interface OperationIcons {
    rotateLeft?: VueNode;
    rotateRight?: VueNode;
    zoomIn?: VueNode;
    zoomOut?: VueNode;
    close?: VueNode;
    prev?: VueNode;
    next?: VueNode;
    /** @deprecated Please use `prev` instead */
    left?: VueNode;
    /** @deprecated Please use `next` instead */
    right?: VueNode;
    flipX?: VueNode;
    flipY?: VueNode;
}
export interface Actions {
    onActive: (offset: number) => void;
    onFlipY: () => void;
    onFlipX: () => void;
    onRotateLeft: () => void;
    onRotateRight: () => void;
    onZoomOut: () => void;
    onZoomIn: () => void;
    onClose: () => void;
    onReset: () => void;
}
export interface ToolbarRenderInfoType {
    icons: {
        prevIcon?: VueNode;
        nextIcon?: VueNode;
        flipYIcon: VueNode;
        flipXIcon: VueNode;
        rotateLeftIcon: VueNode;
        rotateRightIcon: VueNode;
        zoomOutIcon: VueNode;
        zoomInIcon: VueNode;
    };
    actions: Actions;
    transform: TransformType;
    current: number;
    total: number;
    image: ImgInfo;
}
export interface InternalPreviewConfig {
    /** Better to use `classNames.root` instead */
    rootClassName?: string;
    src?: string;
    alt?: string;
    scaleStep?: number;
    minScale?: number;
    maxScale?: number;
    motionName?: string;
    open?: boolean;
    getContainer?: PortalProps['getContainer'];
    zIndex?: number;
    maskClosable?: boolean;
    afterOpenChange?: (open: boolean) => void;
    focusTrap?: boolean;
    movable?: boolean;
    icons?: OperationIcons;
    closeIcon?: VueNode | boolean | null;
    onTransform?: (info: {
        transform: TransformType;
        action: TransformAction;
    }) => void;
    countRender?: (current: number, total: number) => VueNode;
    imageRender?: (originalNode: VueNode, info: {
        transform: TransformType;
        current?: number;
        image: ImgInfo;
    }) => VueNode;
    actionsRender?: (originalNode: VueNode, info: ToolbarRenderInfoType) => VueNode;
}
export interface PreviewProps extends InternalPreviewConfig {
    prefixCls: string;
    classNames?: Partial<Record<PreviewSemanticName, string>>;
    styles?: Partial<Record<PreviewSemanticName, CSSProperties>>;
    imageInfo?: {
        width: number | string;
        height: number | string;
    };
    fallback?: string;
    imgCommonProps?: Record<string, any>;
    width?: string | number;
    height?: string | number;
    current?: number;
    count?: number;
    onChange?: (current: number, prev: number) => void;
    onClose?: () => void;
    mousePosition: null | {
        x: number;
        y: number;
    };
}
declare const Preview: import('vue').DefineSetupFnComponent<PreviewProps, {}, {}, PreviewProps & {}, import('vue').PublicProps>;
export default Preview;
