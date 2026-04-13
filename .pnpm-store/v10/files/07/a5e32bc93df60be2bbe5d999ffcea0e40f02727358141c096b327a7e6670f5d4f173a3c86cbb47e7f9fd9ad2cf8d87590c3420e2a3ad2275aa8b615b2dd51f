import type { VueNode } from '@v-c/util/dist/type'
import type { CSSProperties } from 'vue'

export type Placement = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight'

type NoticeSemanticProps = 'wrapper'

export type Key = string | number
export interface NoticeConfig {
  content?: VueNode
  duration?: number | false | null
  showProgress?: boolean
  pauseOnHover?: boolean
  closeIcon?: VueNode
  closable?:
    | boolean
    | ({ closeIcon?: VueNode, onClose?: VoidFunction } & Record<string, any>)
  className?: string
  style?: CSSProperties
  classNames?: {
    [key in NoticeSemanticProps]?: string;
  }
  styles?: {
    [key in NoticeSemanticProps]?: CSSProperties;
  }
  /** @private Internal usage. Do not override in your code */
  props?: Record<string, any>

  onClose?: VoidFunction
  onClick?: (event: Event) => void
}

export interface OpenConfig extends NoticeConfig {
  key: Key
  placement?: Placement
  content?: VueNode
  duration?: number | false | null
}

export type InnerOpenConfig = OpenConfig & { times?: number }

export type Placements = Partial<Record<Placement, OpenConfig[]>>

export type StackConfig
  = | boolean
    | {
    /**
     * When number is greater than threshold, notifications will be stacked together.
     * @default 3
     */
      threshold?: number
      /**
       * Offset when notifications are stacked together.
       * @default 8
       */
      offset?: number
      /**
       * Spacing between each notification when expanded.
       */
      gap?: number
    }
