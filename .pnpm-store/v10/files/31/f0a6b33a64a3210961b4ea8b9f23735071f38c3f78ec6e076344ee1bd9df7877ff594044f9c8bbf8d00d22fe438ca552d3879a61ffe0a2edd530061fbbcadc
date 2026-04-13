import type { VNode } from 'vue'
import type { QRPropsSVG } from './interface.ts'
import { computed, defineComponent, shallowRef, watchEffect } from 'vue'
import { useQRCode } from './hooks/useQRCode'
import { defaults } from './interface.ts'
import {
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_FRONT_COLOR,
  DEFAULT_LEVEL,
  DEFAULT_MINVERSION,
  DEFAULT_NEED_MARGIN,
  DEFAULT_SIZE,
  excavateModules,
  generatePath,
} from './utils'

export const QRCodeSVG = defineComponent<QRPropsSVG>({
  name: 'QRCodeSVG',
  inheritAttrs: false,
  setup(props = defaults) {
    const image = shallowRef<VNode | null>(null)
    const fgPath = shallowRef('')
    const numCells = shallowRef(0)

    const qrcode = useQRCode(computed(() => {
      const {
        value,
        level = DEFAULT_LEVEL,
        includeMargin = DEFAULT_NEED_MARGIN,
        minVersion = DEFAULT_MINVERSION,
        marginSize,
        imageSettings,
        size = DEFAULT_SIZE,
        boostLevel,
      } = props
      return { value, level, minVersion, includeMargin, marginSize, imageSettings, size, boostLevel }
    }))

    watchEffect(() => {
      const { imageSettings } = props

      const { margin, cells, numCells: getNumCells, calculatedImageSettings } = qrcode.value

      let cellsToDraw = cells
      numCells.value = getNumCells

      if (imageSettings != null && calculatedImageSettings != null) {
        if (calculatedImageSettings.excavation != null) {
          cellsToDraw = excavateModules(
            cells,
            calculatedImageSettings.excavation,
          )
        }

        image.value = (
          <image
            href={imageSettings.src}
            height={calculatedImageSettings.h}
            width={calculatedImageSettings.w}
            x={calculatedImageSettings.x + margin}
            y={calculatedImageSettings.y + margin}
            preserveAspectRatio="none"
            opacity={calculatedImageSettings.opacity}
            // when crossOrigin is not set, the image will be tainted
            // and the canvas cannot be exported to an image
            crossOrigin={calculatedImageSettings?.crossOrigin}
          />
        )
      }

      fgPath.value = generatePath(cellsToDraw, margin)
    })

    return () => {
      const {
        bgColor = DEFAULT_BACKGROUND_COLOR,
        fgColor = DEFAULT_FRONT_COLOR,
        size,
        title,
      } = props
      return (
        <svg
          height={size}
          width={size}
          viewBox={`0 0 ${numCells.value} ${numCells.value}`}
          role="img"
        >
          {!!title && <title>{title}</title>}
          <path
            fill={bgColor}
            d={`M0,0 h${numCells.value}v${numCells.value}H0z`}
            shape-rendering="crispEdges"
          />
          <path fill={fgColor} d={fgPath.value} shape-rendering="crispEdges" />
          {image.value}
        </svg>
      )
    }
  },
})
