import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeFormGroupComponent from '../form/src/form-group'
import { dynamicApp } from '../dynamics'

export const VxeFormGroup = Object.assign(VxeFormGroupComponent, {
  install (app: App) {
    app.component(VxeFormGroupComponent.name as string, VxeFormGroupComponent)
  }
})

dynamicApp.use(VxeFormGroup)
VxeUI.component(VxeFormGroupComponent)

export const FormGroup = VxeFormGroup
export default VxeFormGroup
