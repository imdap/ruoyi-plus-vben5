import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeTagComponent from './src/tag'
import { dynamicApp } from '../dynamics'

export const VxeTag = Object.assign({}, VxeTagComponent, {
  install (app: App) {
    app.component(VxeTagComponent.name as string, VxeTagComponent)
  }
})

dynamicApp.use(VxeTag)
VxeUI.component(VxeTagComponent)

export const Tag = VxeTag
export default VxeTag
