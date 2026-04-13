import type { ComputedRef, MaybeRef, ToRefs } from 'vue'
import type { StackConfig } from '../interface'
import { computed, reactive, toRefs, unref, watchEffect } from 'vue'

const DEFAULT_OFFSET = 8
const DEFAULT_THRESHOLD = 3
const DEFAULT_GAP = 16

type StackParams = Exclude<StackConfig, boolean>

type UseStack = (config?: MaybeRef<StackConfig | undefined>) => [ComputedRef<boolean>, ToRefs<StackParams>]

const useStack: UseStack = (config) => {
  const result: StackParams = reactive({
    offset: DEFAULT_OFFSET,
    threshold: DEFAULT_THRESHOLD,
    gap: DEFAULT_GAP,
  })

  watchEffect(() => {
    const _config = unref(config)
    if (_config && typeof _config === 'object') {
      result.offset = _config.offset ?? DEFAULT_OFFSET
      result.threshold = _config.threshold ?? DEFAULT_THRESHOLD
      result.gap = _config.gap ?? DEFAULT_GAP
    }
  })

  return [computed(() => !!unref(config)), toRefs(result)]
}

export default useStack
