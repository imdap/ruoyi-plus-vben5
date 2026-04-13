import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeFormItemComponent from '../form/src/form-item'
import { dynamicApp } from '../dynamics'

export const VxeFormItem = Object.assign(VxeFormItemComponent, {
  install (app: App) {
    app.component(VxeFormItemComponent.name as string, VxeFormItemComponent)
  }
})

dynamicApp.use(VxeFormItem)
VxeUI.component(VxeFormItemComponent)

export const FormItem = VxeFormItem
export default VxeFormItem
