import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeColorPickerComponent from './src/color-picker'
import { dynamicApp } from '../dynamics'

export const VxeColorPicker = Object.assign({}, VxeColorPickerComponent, {
  install (app: App) {
    app.component(VxeColorPickerComponent.name as string, VxeColorPickerComponent)
  }
})

dynamicApp.use(VxeColorPicker)
VxeUI.component(VxeColorPickerComponent)

export const ColorPicker = VxeColorPicker
export default VxeColorPicker
