/**
 * Used for PreviewGroup passed image data
 */
export type ImageElementProps = Pick<HTMLImageElement, 'src' | 'crossOrigin' | 'decoding' | 'draggable' | 'loading' | 'referrerPolicy' | 'sizes' | 'srcset' | 'useMap' | 'alt' | 'fetchPriority'>;
export interface PreviewImageElementProps {
    data: ImageElementProps;
    canPreview: boolean;
}
export type InternalItem = PreviewImageElementProps & {
    id?: string;
};
export type RegisterImage = (id: string, data: PreviewImageElementProps) => VoidFunction;
export type OnGroupPreview = (id: string, imageSrc: string, mouseX: number, mouseY: number) => void;
