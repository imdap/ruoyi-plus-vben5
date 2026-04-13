import type { VueNode } from '@v-c/util/dist/type'
import type { CSSProperties, MaybeRef, TransitionGroupProps } from 'vue'
import type { Key, OpenConfig, Placement, StackConfig } from '../interface'
import type { NotificationsProps, NotificationsRef } from '../Notifications'
import { computed, onMounted, shallowRef, unref, watch } from 'vue'
import Notifications from '../Notifications'

const defaultGetContainer = () => document.body

type OptionalConfig = Partial<OpenConfig>

export interface NotificationConfig {
  prefixCls?: string
  /** Customize container. It will repeat call which means you should return same container element. */
  getContainer?: () => HTMLElement | ShadowRoot
  motion?: TransitionGroupProps | ((placement: Placement) => TransitionGroupProps)
  closeIcon?: VueNode
  closable?:
    | boolean
    | ({ closeIcon?: VueNode, onClose?: VoidFunction } & Record<string, any>)
  maxCount?: number
  duration?: number | false | null
  showProgress?: boolean
  pauseOnHover?: boolean
  /** @private. Config for notification holder style. Safe to remove if refactor */
  className?: (placement: Placement) => string
  /** @private. Config for notification holder style. Safe to remove if refactor */
  style?: (placement: Placement) => CSSProperties
  /** @private Trigger when all the notification closed. */
  onAllRemoved?: VoidFunction
  stack?: StackConfig
  /** @private Slot for style in Notifications */
  renderNotifications?: NotificationsProps['renderNotifications']
}

export interface NotificationAPI {
  open: (config: OptionalConfig) => void
  close: (key: Key) => void
  destroy: () => void
}

interface OpenTask {
  type: 'open'
  config: OpenConfig
}

interface CloseTask {
  type: 'close'
  key: Key
}

interface DestroyTask {
  type: 'destroy'
}

type Task = OpenTask | CloseTask | DestroyTask

let uniqueKey = 0

function mergeConfig<T>(...objList: Partial<T>[]): T {
  const clone: any = {}

  objList.forEach((obj: any) => {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        const val = obj[key]

        if (val !== undefined) {
          clone[key] = val
        }
      })
    }
  })

  return clone
}

export default function useNotification(rootConfig: MaybeRef<NotificationConfig> = {}) {
  const configRef = computed(() => unref(rootConfig) || {})
  const container = shallowRef<HTMLElement | ShadowRoot>()

  const notificationRef = shallowRef<NotificationsRef>()

  const shareConfig = computed(() => {
    const {
      getContainer,
      motion,
      prefixCls,
      maxCount,
      className,
      style,
      onAllRemoved,
      stack,
      renderNotifications,
      ...restConfig
    } = configRef.value
    return restConfig
  })

  const resolveContainer = () => {
    const getContainer = configRef.value.getContainer || defaultGetContainer
    return getContainer()
  }

  const contextHolder = () => (
    <Notifications
      container={container.value}
      ref={notificationRef}
      prefixCls={configRef.value.prefixCls}
      motion={configRef.value.motion}
      maxCount={configRef.value.maxCount}
      className={configRef.value.className}
      style={configRef.value.style}
      onAllRemoved={configRef.value.onAllRemoved}
      stack={configRef.value.stack}
      renderNotifications={configRef.value.renderNotifications}
    />
  )

  const taskQueue = shallowRef<Task[]>([])

  // ========================= Refs =========================

  const api: NotificationAPI = {
    open(config) {
      const mergedConfig = mergeConfig(shareConfig.value, config)
      if (mergedConfig.key === null || mergedConfig.key === undefined) {
        mergedConfig.key = `vc-notification-${uniqueKey}`
        uniqueKey += 1
      }

      taskQueue.value = [...taskQueue.value, { type: 'open', config: mergedConfig }]
    },
    close(key) {
      taskQueue.value = [...taskQueue.value, { type: 'close', key }]
    },
    destroy() {
      taskQueue.value = [...taskQueue.value, { type: 'destroy' }]
    },
  }

  // ======================= Container ======================
  // React 18 should all in effect that we will check container in each render
  // Which means getContainer should be stable.
  onMounted(
    () => {
      container.value = resolveContainer()
    },
  )
  watch(
    () => configRef.value.getContainer,
    () => {
      container.value = resolveContainer()
    },
  )
  watch(taskQueue, () => {
    if (notificationRef.value && taskQueue.value.length) {
      taskQueue.value.forEach((task) => {
        switch (task.type) {
          case 'open':
            notificationRef.value?.open(task.config)
            break
          case 'close':
            notificationRef.value?.close(task.key)
            break
          case 'destroy':
            notificationRef.value?.destroy()
            break
          default:
            break
        }
      })
      taskQueue.value = taskQueue.value.filter(task => !taskQueue.value.includes(task))
    }
  })

  // ======================== Return ========================
  return [api, contextHolder] as [NotificationAPI, () => VueNode]
}
