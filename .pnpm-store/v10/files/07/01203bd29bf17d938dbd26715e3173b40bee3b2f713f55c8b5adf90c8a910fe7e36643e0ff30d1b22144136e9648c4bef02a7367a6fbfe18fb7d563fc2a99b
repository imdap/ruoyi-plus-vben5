import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeImageGroupComponent from '../image/src/group'
import { dynamicApp } from '../dynamics'

export const VxeImageGroup = Object.assign({}, VxeImageGroupComponent, {
  install (app: App) {
    app.component(VxeImageGroupComponent.name as string, VxeImageGroupComponent)
  }
})

dynamicApp.use(VxeImageGroup)
VxeUI.component(VxeImageGroupComponent)

export const ImageGroup = VxeImageGroup
export default VxeImageGroup
