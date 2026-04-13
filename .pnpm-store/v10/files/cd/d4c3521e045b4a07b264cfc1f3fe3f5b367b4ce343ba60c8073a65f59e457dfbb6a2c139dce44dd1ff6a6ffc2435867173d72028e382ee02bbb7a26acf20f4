import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeCountdownComponent from './src/countdown'
import { dynamicApp } from '../dynamics'

export const VxeCountdown = Object.assign({}, VxeCountdownComponent, {
  install (app: App) {
    app.component(VxeCountdownComponent.name as string, VxeCountdownComponent)
  }
})

dynamicApp.use(VxeCountdown)
VxeUI.component(VxeCountdownComponent)

export const Countdown = VxeCountdown
export default VxeCountdown
