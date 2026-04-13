import type { InjectionKey } from 'vue'
import type { SizeInfo } from '.'
import { defineComponent, inject, provide, shallowRef } from 'vue'

type onCollectionResize = (size: SizeInfo, element: HTMLElement, data: any) => void

export const CollectionContext: InjectionKey<onCollectionResize> = Symbol('CollectionContext')

export interface ResizeInfo {
  size: SizeInfo
  element: HTMLElement
  data: any
}

export interface CollectionProps {
  /** Trigger when some children ResizeObserver changed. Collect by frame render level */
  onBatchResize?: (resizeInfo: ResizeInfo[]) => void
}

export const Collection = defineComponent<CollectionProps>({
  setup(props, { slots }) {
    const resizeIdRef = shallowRef(0)
    const resizeInfosRef = shallowRef<ResizeInfo[]>([])
    const onCollectionResize = inject(CollectionContext, () => {})
    const onResize = (size: SizeInfo, element: HTMLElement, data: any) => {
      const resizeId = resizeIdRef.value + 1
      resizeIdRef.value = resizeId
      resizeInfosRef.value.push({ size, element, data })
      Promise.resolve().then(() => {
        if (resizeIdRef.value === resizeId) {
          const resizeInfos = resizeInfosRef.value
          resizeInfosRef.value = []
          props.onBatchResize?.(resizeInfos)
        }
      })
      onCollectionResize?.(size, element, data)
    }

    provide(CollectionContext, onResize)
    return () => {
      return slots.default?.()
    }
  },
})
