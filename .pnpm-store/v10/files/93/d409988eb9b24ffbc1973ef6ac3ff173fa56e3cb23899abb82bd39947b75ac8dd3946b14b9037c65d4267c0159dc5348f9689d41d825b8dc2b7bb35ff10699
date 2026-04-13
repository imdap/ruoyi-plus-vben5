import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeRateComponent from './src/rate'
import { dynamicApp } from '../dynamics'

export const VxeRate = Object.assign({}, VxeRateComponent, {
  install (app: App) {
    app.component(VxeRateComponent.name as string, VxeRateComponent)
  }
})

dynamicApp.use(VxeRate)
VxeUI.component(VxeRateComponent)

export const Rate = VxeRate
export default VxeRate
