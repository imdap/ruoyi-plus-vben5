import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeAnchorLinkComponent from '../anchor/src/anchor-link'
import { dynamicApp } from '../dynamics'

export const VxeAnchorLink = Object.assign({}, VxeAnchorLinkComponent, {
  install (app: App) {
    app.component(VxeAnchorLinkComponent.name as string, VxeAnchorLinkComponent)
  }
})

dynamicApp.use(VxeAnchorLink)
VxeUI.component(VxeAnchorLinkComponent)

export const AnchorLink = VxeAnchorLink
export default VxeAnchorLink
