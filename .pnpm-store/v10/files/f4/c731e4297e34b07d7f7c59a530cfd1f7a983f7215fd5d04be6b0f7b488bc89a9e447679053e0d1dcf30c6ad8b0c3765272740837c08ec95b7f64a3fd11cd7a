import { Key } from '@v-c/util/dist/type';
import { CSSProperties, VNode } from 'vue';
export type RenderFunc<T> = (item: T, index: number, props: {
    style: CSSProperties;
    offsetX: number;
}) => VNode;
export interface SharedConfig<T> {
    getKey: (item: T) => Key;
}
export type GetKey<T> = (item: T) => Key;
export type GetSize = (startKey: Key, endKey?: Key) => {
    top: number;
    bottom: number;
};
export interface ExtraRenderInfo {
    /** Virtual list start line */
    start: number;
    /** Virtual list end line */
    end: number;
    /** Is current in virtual render */
    virtual: boolean;
    /** Used for `scrollWidth` tell the horizontal offset */
    offsetX: number;
    offsetY: number;
    rtl: boolean;
    getSize: GetSize;
}
