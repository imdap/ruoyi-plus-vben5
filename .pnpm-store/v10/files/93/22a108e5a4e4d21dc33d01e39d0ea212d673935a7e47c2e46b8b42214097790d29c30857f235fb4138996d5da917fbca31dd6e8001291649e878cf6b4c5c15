import XEUtils from 'xe-utils'

import type { VxeCarouselConstructor, VxeCarouselPrivateMethods, VxeCarouselDefines } from '../../../types'

export function assembleCarouselItem ($xeCarousel: VxeCarouselConstructor & VxeCarouselPrivateMethods, elem: HTMLElement, itemConfig: VxeCarouselDefines.ItemConfig) {
  const staticItems = $xeCarousel.reactData.staticItems
  const parentElem = elem.parentNode
  if (parentElem) {
    staticItems.splice(XEUtils.arrayIndexOf(parentElem.children, elem), 0, itemConfig)
  }
  $xeCarousel.reactData.staticItems = staticItems.slice(0)
}

export function destroyCarouselItem ($xeCarousel: VxeCarouselConstructor & VxeCarouselPrivateMethods, itemConfig: VxeCarouselDefines.ItemConfig) {
  const staticItems = $xeCarousel.reactData.staticItems
  const index = XEUtils.findIndexOf(staticItems, item => item.id === itemConfig.id)
  if (index > -1) {
    staticItems.splice(index, 1)
  }
  $xeCarousel.reactData.staticItems = staticItems.slice(0)
}
