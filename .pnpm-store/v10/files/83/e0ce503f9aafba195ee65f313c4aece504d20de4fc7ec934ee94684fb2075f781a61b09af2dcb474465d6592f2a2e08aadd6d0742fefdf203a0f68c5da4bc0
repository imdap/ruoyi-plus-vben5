import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeOptionComponent from '../select/src/option'
import { dynamicApp } from '../dynamics'

export const VxeOption = Object.assign(VxeOptionComponent, {
  install: function (app: App) {
    app.component(VxeOptionComponent.name as string, VxeOptionComponent)
  }
})

dynamicApp.use(VxeOption)
VxeUI.component(VxeOptionComponent)

export const Option = VxeOption
export default VxeOption
