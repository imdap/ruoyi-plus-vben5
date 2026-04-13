import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeLinkComponent from './src/link'
import { dynamicApp } from '../dynamics'

export const VxeLink = Object.assign({}, VxeLinkComponent, {
  install (app: App) {
    app.component(VxeLinkComponent.name as string, VxeLinkComponent)
  }
})

dynamicApp.use(VxeLink)
VxeUI.component(VxeLinkComponent)

export const Link = VxeLink
export default VxeLink
