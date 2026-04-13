import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeTableSelectComponent from './src/table-select'
import { dynamicApp } from '../dynamics'

export const VxeTableSelect = Object.assign({}, VxeTableSelectComponent, {
  install (app: App) {
    app.component(VxeTableSelectComponent.name as string, VxeTableSelectComponent)
  }
})

dynamicApp.use(VxeTableSelect)
VxeUI.component(VxeTableSelectComponent)

export const TableSelect = VxeTableSelect
export default VxeTableSelect
