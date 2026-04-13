import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeOptgroupComponent from '../select/src/optgroup'
import { dynamicApp } from '../dynamics'

export const VxeOptgroup = Object.assign(VxeOptgroupComponent, {
  install: function (app: App) {
    app.component(VxeOptgroupComponent.name as string, VxeOptgroupComponent)
  }
})

dynamicApp.use(VxeOptgroup)
VxeUI.component(VxeOptgroupComponent)

export const Optgroup = VxeOptgroup
export default VxeOptgroup
