import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeIconComponent from './src/icon'
import { dynamicApp } from '../dynamics'

export const VxeIcon = Object.assign({}, VxeIconComponent, {
  install (app: App) {
    app.component(VxeIconComponent.name as string, VxeIconComponent)
  }
})

dynamicApp.use(VxeIcon)
VxeUI.component(VxeIconComponent)

export const Icon = VxeIcon
export default VxeIcon
