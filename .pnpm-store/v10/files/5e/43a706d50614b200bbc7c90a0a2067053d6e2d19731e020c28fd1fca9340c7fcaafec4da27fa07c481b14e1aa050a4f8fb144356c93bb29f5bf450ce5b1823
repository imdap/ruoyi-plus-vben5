import { InjectionKey } from 'vue';
import { SizeInfo } from '.';
type onCollectionResize = (size: SizeInfo, element: HTMLElement, data: any) => void;
export declare const CollectionContext: InjectionKey<onCollectionResize>;
export interface ResizeInfo {
    size: SizeInfo;
    element: HTMLElement;
    data: any;
}
export interface CollectionProps {
    /** Trigger when some children ResizeObserver changed. Collect by frame render level */
    onBatchResize?: (resizeInfo: ResizeInfo[]) => void;
}
export declare const Collection: import('vue').DefineComponent<CollectionProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<CollectionProps> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export {};
