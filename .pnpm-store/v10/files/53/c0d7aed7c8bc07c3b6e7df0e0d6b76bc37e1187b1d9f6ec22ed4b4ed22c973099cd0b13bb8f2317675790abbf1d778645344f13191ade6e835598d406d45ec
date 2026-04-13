import { VueNode } from '@v-c/util/dist/type';
import { CSSProperties } from 'vue';
import { TransformType } from './hooks/useImageTransform';
import { ImgInfo } from './Image';
import { ImageElementProps } from './interface';
import { InternalPreviewConfig, PreviewProps, PreviewSemanticName } from './Preview';
export interface GroupPreviewConfig extends Omit<InternalPreviewConfig, 'imageRender'> {
    current?: number;
    imageRender?: (originalNode: VueNode, info: {
        transform: TransformType;
        current: number;
        image: ImgInfo;
    }) => VueNode;
    onOpenChange?: (value: boolean, info: {
        current: number;
    }) => void;
    onChange?: (current: number, prevCurrent: number) => void;
}
export interface PreviewGroupProps {
    previewPrefixCls?: string;
    classNames?: {
        popup?: Partial<Record<PreviewSemanticName, string>>;
    };
    styles?: {
        popup?: Partial<Record<PreviewSemanticName, CSSProperties>>;
    };
    icons?: PreviewProps['icons'];
    items?: (string | ImageElementProps)[];
    fallback?: string;
    preview?: boolean | GroupPreviewConfig;
    children?: VueNode;
}
declare const PreviewGroup: import('vue').DefineSetupFnComponent<PreviewGroupProps, {}, {}, PreviewGroupProps & {}, import('vue').PublicProps>;
export default PreviewGroup;
