import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeInputConstructor from './src/input'
import { dynamicApp } from '../dynamics'

export const VxeInput = Object.assign(VxeInputConstructor, {
  install (app: App) {
    app.component(VxeInputConstructor.name as string, VxeInputConstructor)
  }
})

dynamicApp.use(VxeInput)
VxeUI.component(VxeInputConstructor)

export const Input = VxeInput
export default VxeInput
