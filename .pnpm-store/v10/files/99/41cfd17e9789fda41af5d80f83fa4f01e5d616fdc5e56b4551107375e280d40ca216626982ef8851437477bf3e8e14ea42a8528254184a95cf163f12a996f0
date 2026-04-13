import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeFormComponent from './src/form'
import { dynamicApp } from '../dynamics'

export const VxeForm = Object.assign(VxeFormComponent, {
  install (app: App) {
    app.component(VxeFormComponent.name as string, VxeFormComponent)
  }
})

dynamicApp.use(VxeForm)
VxeUI.component(VxeFormComponent)

export const Form = VxeForm
export default VxeForm
