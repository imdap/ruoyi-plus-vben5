import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeTooltipComponent from './src/tooltip'
import { dynamicApp } from '../dynamics'

export const VxeTooltip = Object.assign({}, VxeTooltipComponent, {
  install (app: App) {
    app.component(VxeTooltipComponent.name as string, VxeTooltipComponent)
  }
})

dynamicApp.use(VxeTooltip)
VxeUI.component(VxeTooltipComponent)

export const Tooltip = VxeTooltip
export default VxeTooltip
