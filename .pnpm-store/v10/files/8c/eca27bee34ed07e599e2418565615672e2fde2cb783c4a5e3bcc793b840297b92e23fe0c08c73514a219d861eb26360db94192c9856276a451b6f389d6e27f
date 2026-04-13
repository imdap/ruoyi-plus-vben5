import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeCarouselItemComponent from '../carousel/src/carousel-item'
import { dynamicApp } from '../dynamics'

export const VxeCarouselItem = Object.assign({}, VxeCarouselItemComponent, {
  install (app: App) {
    app.component(VxeCarouselItemComponent.name as string, VxeCarouselItemComponent)
  }
})

dynamicApp.use(VxeCarouselItem)
VxeUI.component(VxeCarouselItemComponent)

export const CarouselItem = VxeCarouselItem
export default VxeCarouselItem
