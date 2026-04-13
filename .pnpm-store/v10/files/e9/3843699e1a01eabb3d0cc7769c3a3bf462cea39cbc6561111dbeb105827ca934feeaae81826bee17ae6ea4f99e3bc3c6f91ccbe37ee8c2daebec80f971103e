import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxePulldownComponent from './src/pulldown'
import { dynamicApp } from '../dynamics'

export const VxePulldown = Object.assign(VxePulldownComponent, {
  install: function (app: App) {
    app.component(VxePulldownComponent.name as string, VxePulldownComponent)
  }
})

dynamicApp.use(VxePulldown)
VxeUI.component(VxePulldownComponent)

export const Pulldown = VxePulldown
export default VxePulldown
