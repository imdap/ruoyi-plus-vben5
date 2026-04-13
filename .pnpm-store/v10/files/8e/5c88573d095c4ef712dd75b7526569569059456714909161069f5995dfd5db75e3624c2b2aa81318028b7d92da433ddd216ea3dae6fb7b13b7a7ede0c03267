import type { MouseEventHandler } from '@v-c/util/dist/EventInterface'
import type { CSSProperties } from 'vue'

export type SemanticName = 'root' | 'rail' | 'track'

export interface ProgressProps {
  id?: string
  strokeWidth?: number
  railWidth?: number
  className?: string
  classNames?: Partial<Record<SemanticName, string>>
  styles?: Partial<Record<SemanticName, CSSProperties>>
  percent?: number | number[]
  strokeColor?: StrokeColorType
  railColor?: string
  strokeLinecap?: StrokeLinecapType
  prefixCls?: string
  gapDegree?: number
  gapPosition?: GapPositionType
  transition?: string
  onClick?: MouseEventHandler
  loading?: boolean
  steps?: number | { count: number, gap: number }
}

export type StrokeColorObject = Record<string, string | boolean>

export type BaseStrokeColorType = string | StrokeColorObject

export type StrokeColorType = BaseStrokeColorType | BaseStrokeColorType[]

export type GapPositionType = 'top' | 'right' | 'bottom' | 'left'

export type StrokeLinecapType = 'round' | 'butt' | 'square'
