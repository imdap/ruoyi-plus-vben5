import { Ref } from 'vue';
import { PreviewImageElementProps, RegisterImage } from '../interface';
import { PreviewGroupProps } from '../PreviewGroup.tsx';
export type Items = Omit<PreviewImageElementProps & {
    id?: string;
}, 'canPreview'>[];
/**
 * Merge props provided `items` or context collected images
 */
export default function usePreviewItems(items?: Ref<PreviewGroupProps['items'] | undefined>): [items: Ref<Items>, registerImage: RegisterImage, fromItems: Ref<boolean>];
