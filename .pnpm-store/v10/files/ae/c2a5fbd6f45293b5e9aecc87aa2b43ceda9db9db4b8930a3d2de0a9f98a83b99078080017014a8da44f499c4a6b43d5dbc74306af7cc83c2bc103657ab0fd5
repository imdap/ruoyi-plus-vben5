import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeSelectComponent from './src/select'
import { dynamicApp } from '../dynamics'

export const VxeSelect = Object.assign(VxeSelectComponent, {
  install: function (app: App) {
    app.component(VxeSelectComponent.name as string, VxeSelectComponent)
  }
})

dynamicApp.use(VxeSelect)
VxeUI.component(VxeSelectComponent)

export const Select = VxeSelect
export default VxeSelect
