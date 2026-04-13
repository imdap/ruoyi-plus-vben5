import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeDatePanelComponent from './src/date-panel'
import { dynamicApp } from '../dynamics'

export const VxeDatePanel = Object.assign({}, VxeDatePanelComponent, {
  install (app: App) {
    app.component(VxeDatePanelComponent.name as string, VxeDatePanelComponent)
  }
})

dynamicApp.use(VxeDatePanel)
VxeUI.component(VxeDatePanelComponent)

export const DatePanel = VxeDatePanel
export default VxeDatePanel
