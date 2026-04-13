import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeLayoutFooterComponent from './src/layout-footer'
import { dynamicApp } from '../dynamics'

export const VxeLayoutFooter = Object.assign({}, VxeLayoutFooterComponent, {
  install (app: App) {
    app.component(VxeLayoutFooterComponent.name as string, VxeLayoutFooterComponent)
  }
})

dynamicApp.use(VxeLayoutFooter)
VxeUI.component(VxeLayoutFooterComponent)

export const LayoutFooter = VxeLayoutFooter
export default VxeLayoutFooter
