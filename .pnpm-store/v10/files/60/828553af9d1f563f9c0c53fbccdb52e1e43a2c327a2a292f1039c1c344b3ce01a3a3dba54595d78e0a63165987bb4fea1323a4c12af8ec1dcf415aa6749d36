import { Ref } from "vue";

//#region src/_util/hooks/useZIndex.d.ts
type ZIndexContainer = 'Modal' | 'Drawer' | 'Popover' | 'Popconfirm' | 'Tooltip' | 'Tour' | 'FloatButton';
type ZIndexConsumer = 'SelectLike' | 'Dropdown' | 'DatePicker' | 'Menu' | 'ImagePreview';
declare const CONTAINER_MAX_OFFSET: number;
declare const containerBaseZIndexOffset: Record<ZIndexContainer, number>;
declare const consumerBaseZIndexOffset: Record<ZIndexConsumer, number>;
type ReturnResult = [zIndex: Ref<number | undefined>, contextZIndex: Ref<number>];
declare function useZIndex(componentType: ZIndexContainer | ZIndexConsumer, customZIndex?: Ref<number | undefined>): ReturnResult;
//#endregion
export { CONTAINER_MAX_OFFSET, ZIndexConsumer, ZIndexContainer, consumerBaseZIndexOffset, containerBaseZIndexOffset, useZIndex };