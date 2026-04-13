import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeStepsComponent from './src/steps'
import { dynamicApp } from '../dynamics'

export const VxeSteps = Object.assign({}, VxeStepsComponent, {
  install (app: App) {
    app.component(VxeStepsComponent.name as string, VxeStepsComponent)
  }
})

dynamicApp.use(VxeSteps)
VxeUI.component(VxeStepsComponent)

export const Steps = VxeSteps
export default VxeSteps
