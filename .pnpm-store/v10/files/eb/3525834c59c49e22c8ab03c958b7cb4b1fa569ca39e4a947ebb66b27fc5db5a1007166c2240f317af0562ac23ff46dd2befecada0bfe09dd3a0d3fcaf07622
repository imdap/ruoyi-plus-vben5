import { Ref } from 'vue';
import { Tab, TabNavListProps } from '../interface';
export interface TabOffsetInfo {
    width: number;
    height: number;
    left: number;
    top: number;
    right: number;
}
export type TabOffsetMap = Map<string, TabOffsetInfo>;
export type ContainerSizeInfo = [width: number, height: number, left: number, top: number];
export default function useVisibleRange(tabOffsets: Ref<TabOffsetMap>, visibleTabContentValue: Ref<number>, transform: Ref<number>, tabContentSizeValue: Ref<number>, addNodeSizeValue: Ref<number>, operationNodeSizeValue: Ref<number>, { tabs, tabPosition, rtl, }: {
    tabs: Ref<Tab[]>;
} & {
    tabPosition: Ref<TabNavListProps['tabPosition']>;
    rtl: Ref<boolean>;
}): Ref<[visibleStart: number, visibleEnd: number]>;
