import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeRadioButtonComponent from '../radio/src/button'
import { dynamicApp } from '../dynamics'

export const VxeRadioButton = Object.assign(VxeRadioButtonComponent, {
  install: function (app: App) {
    app.component(VxeRadioButtonComponent.name as string, VxeRadioButtonComponent)
  }
})

dynamicApp.use(VxeRadioButton)
VxeUI.component(VxeRadioButtonComponent)

export const RadioButton = VxeRadioButton
export default VxeRadioButton
