import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeTreeComponent from './src/tree'
import { dynamicApp } from '../dynamics'

export const VxeTree = Object.assign({}, VxeTreeComponent, {
  install (app: App) {
    app.component(VxeTreeComponent.name as string, VxeTreeComponent)
  }
})

dynamicApp.use(VxeTree)
VxeUI.component(VxeTreeComponent)

export const Tree = VxeTree
export default VxeTree
