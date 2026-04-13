import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeAnchorComponent from './src/anchor'
import { dynamicApp } from '../dynamics'

export const VxeAnchor = Object.assign({}, VxeAnchorComponent, {
  install (app: App) {
    app.component(VxeAnchorComponent.name as string, VxeAnchorComponent)
  }
})

dynamicApp.use(VxeAnchor)
VxeUI.component(VxeAnchorComponent)

export const Anchor = VxeAnchor
export default VxeAnchor
