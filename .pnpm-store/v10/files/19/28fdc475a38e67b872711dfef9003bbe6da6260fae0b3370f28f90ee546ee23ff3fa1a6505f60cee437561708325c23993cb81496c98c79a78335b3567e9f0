import type { InjectionKey, Ref } from 'vue'
import { inject, provide, ref } from 'vue'

export interface NotificationContextProps {
  classNames?: {
    notice?: string
    list?: string
  }
}
export const NotificationContext: InjectionKey<Ref<NotificationContextProps>> = Symbol('NotificationContext')

export function useNotificationProvider(props: Ref<NotificationContextProps>) {
  provide(NotificationContext, props)
  return props
}

export function useNotificationContext() {
  return inject(NotificationContext, ref({}))
}
