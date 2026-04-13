import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeIconPickerComponent from './src/icon-picker'
import { dynamicApp } from '../dynamics'

export const VxeIconPicker = Object.assign(VxeIconPickerComponent, {
  install: function (app: App) {
    app.component(VxeIconPickerComponent.name as string, VxeIconPickerComponent)
  }
})

dynamicApp.use(VxeIconPicker)
VxeUI.component(VxeIconPickerComponent)

export const IconPicker = VxeIconPicker
export default VxeIconPicker
