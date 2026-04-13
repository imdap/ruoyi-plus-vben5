import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeTextEllipsisComponent from './src/text-ellipsis'
import { dynamicApp } from '../dynamics'

export const VxeTextEllipsis = Object.assign({}, VxeTextEllipsisComponent, {
  install (app: App) {
    app.component(VxeTextEllipsisComponent.name as string, VxeTextEllipsisComponent)
  }
})

dynamicApp.use(VxeTextEllipsis)
VxeUI.component(VxeTextEllipsisComponent)

export const TextEllipsis = VxeTextEllipsis
export default VxeTextEllipsis
