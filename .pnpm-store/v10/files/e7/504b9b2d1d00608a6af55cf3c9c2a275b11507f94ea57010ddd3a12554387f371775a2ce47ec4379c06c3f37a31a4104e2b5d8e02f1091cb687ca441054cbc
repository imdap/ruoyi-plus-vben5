import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeSliderComponent from './src/slider'
import { dynamicApp } from '../dynamics'

export const VxeSlider = Object.assign({}, VxeSliderComponent, {
  install (app: App) {
    app.component(VxeSliderComponent.name as string, VxeSliderComponent)
  }
})

dynamicApp.use(VxeSlider)
VxeUI.component(VxeSliderComponent)

export const Slider = VxeSlider
export default VxeSlider
