import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeTextComponent from './src/text'
import { dynamicApp } from '../dynamics'

export const VxeText = Object.assign({}, VxeTextComponent, {
  install (app: App) {
    app.component(VxeTextComponent.name as string, VxeTextComponent)
  }
})

dynamicApp.use(VxeText)
VxeUI.component(VxeTextComponent)

export const Text = VxeText
export default VxeText
