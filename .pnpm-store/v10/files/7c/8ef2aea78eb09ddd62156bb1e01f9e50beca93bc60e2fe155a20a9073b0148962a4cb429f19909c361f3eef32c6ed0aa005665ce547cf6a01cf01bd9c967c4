import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeCardComponent from './src/card'
import { dynamicApp } from '../dynamics'

export const VxeCard = Object.assign({}, VxeCardComponent, {
  install (app: App) {
    app.component(VxeCardComponent.name as string, VxeCardComponent)
  }
})

dynamicApp.use(VxeCard)
VxeUI.component(VxeCardComponent)

export const Card = VxeCard
export default VxeCard
