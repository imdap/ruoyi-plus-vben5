import type { Ref } from 'vue'
import type { OnResize } from './index'
import { shallowRef, unref, watch } from 'vue'
import { observe, unobserve } from './utils/observerUtil'

export default function useResizeObserver(
  enabled: Ref<boolean | undefined>,
  getTarget: Ref<Element | undefined> | (() => HTMLElement),
  onDelayResize?: OnResize,
  onSyncResize?: OnResize,
) {
// ============================= Size =============================
  const sizeRef = shallowRef({
    width: -1,
    height: -1,
    offsetWidth: -1,
    offsetHeight: -1,
  })

  // ============================= Size =============================
  const onInternalResize = (target: HTMLElement) => {
    const { width, height } = target.getBoundingClientRect()
    const { offsetWidth, offsetHeight } = target

    /**
     * Resize observer trigger when content size changed.
     * In most case we just care about element size,
     * let's use `boundary` instead of `contentRect` here to avoid shaking.
     */
    const fixedWidth = Math.floor(width)
    const fixedHeight = Math.floor(height)

    if (
      sizeRef.value.width !== fixedWidth
      || sizeRef.value.height !== fixedHeight
      || sizeRef.value.offsetWidth !== offsetWidth
      || sizeRef.value.offsetHeight !== offsetHeight
    ) {
      const size = { width: fixedWidth, height: fixedHeight, offsetWidth, offsetHeight }
      sizeRef.value = size

      // IE is strange, right?
      const mergedOffsetWidth = offsetWidth === Math.round(width) ? width : offsetWidth
      const mergedOffsetHeight = offsetHeight === Math.round(height) ? height : offsetHeight

      const sizeInfo = {
        ...size,
        offsetWidth: mergedOffsetWidth,
        offsetHeight: mergedOffsetHeight,
      }

      // Call the callback immediately, let the caller decide whether to defer
      // onResize(sizeInfo, target);
      onSyncResize?.(sizeInfo, target)

      // defer the callback but not defer to next frame
      Promise.resolve().then(() => {
        onDelayResize?.(sizeInfo, target)
      })
    }
  }

  // Dynamic observe
  watch(
    [enabled, getTarget],
    (_, _o, onCleanup) => {
      const target = typeof getTarget === 'function' ? getTarget() : unref(getTarget)
      const isEnabled = unref(enabled)
      if (target && isEnabled) {
        observe(target, onInternalResize as any)
        onCleanup(() => {
          if (target) {
            unobserve(target, onInternalResize as any)
          }
        })
      }
    },
    {
      immediate: true,
      flush: 'post',
    },
  )
}
