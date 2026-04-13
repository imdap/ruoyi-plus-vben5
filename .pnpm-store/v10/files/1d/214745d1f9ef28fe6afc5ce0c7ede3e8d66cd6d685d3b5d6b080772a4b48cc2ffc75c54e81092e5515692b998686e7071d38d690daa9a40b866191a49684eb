import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeCarouselComponent from './src/carousel'
import { dynamicApp } from '../dynamics'

export const VxeCarousel = Object.assign({}, VxeCarouselComponent, {
  install (app: App) {
    app.component(VxeCarouselComponent.name as string, VxeCarouselComponent)
  }
})

dynamicApp.use(VxeCarousel)
VxeUI.component(VxeCarouselComponent)

export const Carousel = VxeCarousel
export default VxeCarousel
