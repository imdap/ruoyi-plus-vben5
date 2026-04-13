import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeSplitterPanelComponent from '../splitter/src/splitter-panel'
import { dynamicApp } from '../dynamics'

export const VxeSplitterPanel = Object.assign({}, VxeSplitterPanelComponent, {
  install (app: App) {
    app.component(VxeSplitterPanelComponent.name as string, VxeSplitterPanelComponent)
  }
})

dynamicApp.use(VxeSplitterPanel)
VxeUI.component(VxeSplitterPanelComponent)

export const SplitterPanel = VxeSplitterPanel
export default VxeSplitterPanel
