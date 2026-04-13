import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeCheckboxButtonComponent from '../checkbox/src/button'
import { dynamicApp } from '../dynamics'

export const VxeCheckboxButton = Object.assign(VxeCheckboxButtonComponent, {
  install: function (app: App) {
    app.component(VxeCheckboxButtonComponent.name as string, VxeCheckboxButtonComponent)
  }
})

dynamicApp.use(VxeCheckboxButton)
VxeUI.component(VxeCheckboxButtonComponent)

export const CheckboxButton = VxeCheckboxButton
export default VxeCheckboxButton
