import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeCascaderComponent from './src/cascader'
import { dynamicApp } from '../dynamics'

export const VxeCascader = Object.assign({}, VxeCascaderComponent, {
  install (app: App) {
    app.component(VxeCascaderComponent.name as string, VxeCascaderComponent)
  }
})

dynamicApp.use(VxeCascader)
VxeUI.component(VxeCascaderComponent)

export const Cascader = VxeCascader
export default VxeCascader
