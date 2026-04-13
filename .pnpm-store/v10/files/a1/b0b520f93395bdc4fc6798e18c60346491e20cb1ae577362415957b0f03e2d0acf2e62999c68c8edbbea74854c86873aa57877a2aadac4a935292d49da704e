import type { Ecc, QrCode } from './libs/qrcodegen'
import {
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_FRONT_COLOR,
  DEFAULT_LEVEL,
  DEFAULT_MINVERSION,
  DEFAULT_NEED_MARGIN,
  DEFAULT_SIZE,
} from './utils.ts'

export type Modules = ReturnType<QrCode['getModules']>
export interface Excavation { x: number, y: number, w: number, h: number }
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'
export type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined

export type ERROR_LEVEL_MAPPED_TYPE = {
  [index in ErrorCorrectionLevel]: Ecc;
}

export interface ImageSettings {
  src: string
  height: number
  width: number
  excavate: boolean
  x?: number
  y?: number
  opacity?: number
  crossOrigin?: CrossOrigin
}

export interface QRProps {

  /**
   * The value to encode into the QR Code. An array of strings can be passed in
   * to represent multiple segments to further optimize the QR Code.
   */
  value: string | string[]
  /**
   * If enabled, the Error Correction Level of the result may be higher than
   * the specified Error Correction Level option if it can be done without
   * increasing the version.
   * @defaultValue true
   */
  boostLevel?: boolean
  /**
   * The size, in pixels, to render the QR Code.
   * @defaultValue 128
   */
  size?: number
  /**
   * The Error Correction Level to use.
   * @see https://www.qrcode.com/en/about/error_correction.html
   * @defaultValue L
   */
  level?: ErrorCorrectionLevel
  /**
   * The background color used to render the QR Code.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   * @defaultValue #FFFFFF
   */
  bgColor?: string
  /**
   * The foregtound color used to render the QR Code.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   * @defaultValue #000000
   */
  fgColor?: string
  /**
   * Whether or not a margin of 4 modules should be rendered as a part of the
   * QR Code.
   * @deprecated Use `marginSize` instead.
   * @defaultValue false
   */
  includeMargin?: boolean
  /**
   * The number of _modules_ to use for margin. The QR Code specification
   * requires `4`, however you can specify any number. Values will be turned to
   * integers with `Math.floor`. Overrides `includeMargin` when both are specified.
   * @defaultValue 0
   */
  marginSize?: number
  /**
   * The settings for the embedded image.
   */
  imageSettings?: ImageSettings
  /**
   * The title to assign to the QR Code. Used for accessibility reasons.
   */
  title?: string
  /**
   * The minimum version used when encoding the QR Code. Valid values are 1-40
   * with higher values resulting in more complex QR Codes. The optimal
   * (lowest) version is determined for the `value` provided, using `minVersion`
   * as the lower bound.
   * @defaultValue 1
   */
  minVersion?: number
}
export type QRPropsCanvas = QRProps
export type QRPropsSVG = QRProps

export const defaults = {
  size: DEFAULT_SIZE,
  level: DEFAULT_LEVEL,
  bgColor: DEFAULT_BACKGROUND_COLOR,
  fgColor: DEFAULT_FRONT_COLOR,
  includeMargin: DEFAULT_NEED_MARGIN,
  minVersion: DEFAULT_MINVERSION,
} as any
