import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeWatermarkComponent from './src/watermark'
import { checkDynamic, dynamicStore, dynamicApp } from '../dynamics'

import type { VxeWatermarkProps } from '../../types'

export const VxeWatermark = Object.assign({}, VxeWatermarkComponent, {
  install (app: App) {
    app.component(VxeWatermarkComponent.name as string, VxeWatermarkComponent)
  }
})

dynamicApp.use(VxeWatermark)
VxeUI.component(VxeWatermarkComponent)

export const WatermarkController = {
  load (options: VxeWatermarkProps) {
    checkDynamic()
    dynamicStore.globalWatermark = Object.assign({}, options)
    return Promise.resolve()
  },
  clear () {
    dynamicStore.globalWatermark = null
    return Promise.resolve()
  }
}
VxeUI.watermark = WatermarkController

export const Watermark = VxeWatermark
export default VxeWatermark
