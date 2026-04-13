import type { Ref } from 'vue'
import type { ErrorCorrectionLevel, ImageSettings } from '../interface'
import { computed } from 'vue'
import { QrCode, QrSegment } from '../libs/qrcodegen'
import { ERROR_LEVEL_MAP, getImageSettings, getMarginSize } from '../utils'

interface Options {
  value: string | string[]
  level: ErrorCorrectionLevel
  minVersion: number
  includeMargin: boolean
  marginSize?: number
  imageSettings?: ImageSettings
  size: number
  boostLevel?: boolean
}

export function useQRCode(ctx: Ref<Options>) {
  const memoizedQrcode = computed(() => {
    const { value, level, minVersion, boostLevel } = ctx.value
    const values = Array.isArray(value) ? value : [value]
    const segments = values.reduce<QrSegment[]>((acc, val) => {
      acc.push(...QrSegment.makeSegments(val))
      return acc
    }, [])
    return QrCode.encodeSegments(
      segments,
      ERROR_LEVEL_MAP[level],
      minVersion,
      undefined,
      undefined,
      boostLevel,
    )
  })

  return computed(() => {
    const { includeMargin, marginSize, size, imageSettings } = ctx.value
    const cs = memoizedQrcode.value.getModules()
    const mg = getMarginSize(includeMargin, marginSize)
    const ncs = cs.length + mg * 2
    const cis = getImageSettings(cs, size, mg, imageSettings)
    return {
      cells: cs,
      margin: mg,
      numCells: ncs,
      calculatedImageSettings: cis,
      qrcode: memoizedQrcode.value,
    }
  })
}
