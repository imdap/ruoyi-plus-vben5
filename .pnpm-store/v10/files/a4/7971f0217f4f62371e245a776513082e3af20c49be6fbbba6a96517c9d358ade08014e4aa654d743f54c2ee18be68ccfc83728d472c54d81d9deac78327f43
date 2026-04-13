import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeBacktopComponent from './src/backtop'
import { dynamicApp } from '../dynamics'

export const VxeBacktop = Object.assign({}, VxeBacktopComponent, {
  install (app: App) {
    app.component(VxeBacktopComponent.name as string, VxeBacktopComponent)
  }
})

dynamicApp.use(VxeBacktop)
VxeUI.component(VxeBacktopComponent)

export const Backtop = VxeBacktop
export default VxeBacktop
