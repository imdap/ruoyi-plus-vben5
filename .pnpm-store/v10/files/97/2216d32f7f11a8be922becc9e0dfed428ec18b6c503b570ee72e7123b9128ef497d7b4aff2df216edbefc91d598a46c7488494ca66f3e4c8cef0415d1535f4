import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeSplitPaneComponent from '../splitter/src/splitter-panel'
import { dynamicApp } from '../dynamics'

export const VxeSplitPane = Object.assign({}, VxeSplitPaneComponent, {
  install (app: App) {
    app.component('VxeSplitPane', VxeSplitPaneComponent)
    app.component('VxeSplitItem', VxeSplitPaneComponent)
  }
})

dynamicApp.use(VxeSplitPane)
VxeUI.component(VxeSplitPaneComponent)

export const SplitPane = VxeSplitPane
export default VxeSplitPane
