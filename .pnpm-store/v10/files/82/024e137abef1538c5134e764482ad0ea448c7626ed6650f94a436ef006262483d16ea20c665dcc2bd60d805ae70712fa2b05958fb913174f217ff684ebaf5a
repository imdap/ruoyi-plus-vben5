import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeBadgeComponent from './src/badge'
import { dynamicApp } from '../dynamics'

export const VxeBadge = Object.assign({}, VxeBadgeComponent, {
  install (app: App) {
    app.component(VxeBadgeComponent.name as string, VxeBadgeComponent)
  }
})

dynamicApp.use(VxeBadge)
VxeUI.component(VxeBadgeComponent)

export const Badge = VxeBadge
export default VxeBadge
