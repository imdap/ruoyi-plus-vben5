//#region src/_util/hooks/useChildLoadEvents.d.ts
type ResourceEventType = 'load' | 'error';
interface UseChildLoadEventsOptions {
  /**
   * 是否在 bind 时立即触发一次对“已加载完成资源”的回调
   * 默认 true
   */
  triggerForAlreadyLoaded?: boolean;
}
/**
 * 监听某个容器内所有“可能触发 load/error 的元素”，
 * 并把事件统一交给回调处理。
 */
declare function useChildLoadEvents(options?: UseChildLoadEventsOptions): {
  bindEvent: (root: HTMLElement | null | undefined, callback: (type: ResourceEventType, el: Element, ev: Event | null) => void) => void;
  clear: () => void;
};
//#endregion
export { ResourceEventType, UseChildLoadEventsOptions, useChildLoadEvents };