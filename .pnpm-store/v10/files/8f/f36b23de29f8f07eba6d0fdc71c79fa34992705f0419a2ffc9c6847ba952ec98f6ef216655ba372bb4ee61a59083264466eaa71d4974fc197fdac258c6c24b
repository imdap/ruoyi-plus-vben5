import { Collection } from './Collection.tsx';
import { _rs } from './utils/observerUtil';
export { default as useResizeObserver } from './useResizeObserver';
export { 
/** @private Test only for mock trigger resize event */
_rs, };
export interface SizeInfo {
    width: number;
    height: number;
    offsetWidth: number;
    offsetHeight: number;
}
export type OnResize = (size: SizeInfo, element: HTMLElement) => void;
export interface ResizeObserverProps {
    /** Pass to ResizeObserver.Collection with additional data */
    data?: any;
    disabled?: boolean;
    /** Trigger if element resized. Will always trigger when first time render. */
    onResize?: OnResize;
}
declare const ResizeObserver: import('vue').DefineComponent<ResizeObserverProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<ResizeObserverProps> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof ResizeObserver & {
    Collection: typeof Collection;
};
export default _default;
