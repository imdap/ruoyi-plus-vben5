import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeResultComponent from './src/result'
import { dynamicApp } from '../dynamics'

export const VxeResult = Object.assign({}, VxeResultComponent, {
  install (app: App) {
    app.component(VxeResultComponent.name as string, VxeResultComponent)
  }
})

dynamicApp.use(VxeResult)
VxeUI.component(VxeResultComponent)

export const Result = VxeResult
export default VxeResult
