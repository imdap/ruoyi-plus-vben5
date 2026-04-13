import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeBreadcrumbItemComponent from '../breadcrumb/src/breadcrumb-item'
import { dynamicApp } from '../dynamics'

export const VxeBreadcrumbItem = Object.assign({}, VxeBreadcrumbItemComponent, {
  install (app: App) {
    app.component(VxeBreadcrumbItemComponent.name as string, VxeBreadcrumbItemComponent)
  }
})

dynamicApp.use(VxeBreadcrumbItem)
VxeUI.component(VxeBreadcrumbItemComponent)

export const BreadcrumbItem = VxeBreadcrumbItem
export default VxeBreadcrumbItem
