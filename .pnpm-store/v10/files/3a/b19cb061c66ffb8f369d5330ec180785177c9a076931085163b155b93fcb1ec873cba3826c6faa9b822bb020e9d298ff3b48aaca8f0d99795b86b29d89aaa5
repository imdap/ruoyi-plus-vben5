import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeTipComponent from './src/tip'
import { dynamicApp } from '../dynamics'

export const VxeTip = Object.assign({}, VxeTipComponent, {
  install (app: App) {
    app.component(VxeTipComponent.name as string, VxeTipComponent)
    app.component('VxeTipsComponent' as string, VxeTipComponent)
  }
})

dynamicApp.use(VxeTip)
VxeUI.component(VxeTipComponent)

export const Tips = VxeTip
export const Tip = VxeTip

export default VxeTip
