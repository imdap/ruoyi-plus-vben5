import { VueNode } from '@v-c/util/dist/type';
import { CSSProperties } from 'vue';
import { TransformType } from './hooks/useImageTransform';
import { ImageElementProps } from './interface';
import { InternalPreviewConfig, PreviewSemanticName, ToolbarRenderInfoType } from './Preview';
export interface ImgInfo {
    url: string;
    alt: string;
    width: string | number;
    height: string | number;
}
export interface CoverConfig {
    coverNode?: VueNode;
    placement?: 'top' | 'bottom' | 'center';
}
export interface PreviewConfig extends Omit<InternalPreviewConfig, 'countRender'> {
    cover?: VueNode | CoverConfig | false;
    imageRender?: (originalNode: VueNode, info: {
        transform: TransformType;
        image: ImgInfo;
    }) => VueNode;
    actionsRender?: (originalNode: VueNode, info: Omit<ToolbarRenderInfoType, 'current' | 'total'>) => VueNode;
    onOpenChange?: (open: boolean) => void;
}
export type SemanticName = 'root' | 'image' | 'cover';
export interface ImageProps extends Partial<Omit<ImageElementProps, 'src'>> {
    prefixCls?: string;
    previewPrefixCls?: string;
    rootClassName?: string;
    classNames?: Partial<Record<SemanticName, string> & {
        popup?: Partial<Record<PreviewSemanticName, string>>;
    }>;
    styles?: Partial<Record<SemanticName, CSSProperties> & {
        popup?: Partial<Record<PreviewSemanticName, CSSProperties>>;
    }>;
    src?: string;
    placeholder?: boolean | VueNode;
    fallback?: string;
    preview?: boolean | PreviewConfig;
    onClick?: (e: MouseEvent) => void;
    onError?: (e: Event) => void;
    onKeydown?: (e: KeyboardEvent) => void;
    width?: string | number;
    height?: string | number;
    fetchPriority?: HTMLImageElement['fetchPriority'];
}
declare const Image: import('vue').DefineSetupFnComponent<ImageProps, {}, {}, ImageProps & {}, import('vue').PublicProps>;
export default Image;
