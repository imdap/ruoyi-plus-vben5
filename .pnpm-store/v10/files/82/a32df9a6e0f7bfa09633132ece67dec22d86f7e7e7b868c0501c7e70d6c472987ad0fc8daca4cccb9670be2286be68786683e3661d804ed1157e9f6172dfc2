import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeBreadcrumbComponent from './src/breadcrumb'
import { dynamicApp } from '../dynamics'

export const VxeBreadcrumb = Object.assign({}, VxeBreadcrumbComponent, {
  install (app: App) {
    app.component(VxeBreadcrumbComponent.name as string, VxeBreadcrumbComponent)
  }
})

dynamicApp.use(VxeBreadcrumb)
VxeUI.component(VxeBreadcrumbComponent)

export const Breadcrumb = VxeBreadcrumb
export default VxeBreadcrumb
