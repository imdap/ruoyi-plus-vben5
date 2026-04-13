import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeTourComponent from './src/tour'
import { dynamicApp } from '../dynamics'

export const VxeTour = Object.assign({}, VxeTourComponent, {
  install (app: App) {
    app.component(VxeTourComponent.name as string, VxeTourComponent)
  }
})

dynamicApp.use(VxeTour)
VxeUI.component(VxeTourComponent)

export const Tour = VxeTour
export default VxeTour
