import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeTabsComponent from './src/tabs'
import { dynamicApp } from '../dynamics'

export const VxeTabs = Object.assign({}, VxeTabsComponent, {
  install (app: App) {
    app.component(VxeTabsComponent.name as string, VxeTabsComponent)
  }
})

dynamicApp.use(VxeTabs)
VxeUI.component(VxeTabsComponent)

export const Tabs = VxeTabs
export default VxeTabs
