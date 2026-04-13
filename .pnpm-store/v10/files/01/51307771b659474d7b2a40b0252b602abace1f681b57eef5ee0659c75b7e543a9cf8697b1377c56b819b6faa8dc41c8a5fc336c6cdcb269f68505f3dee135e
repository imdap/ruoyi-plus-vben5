import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeCarouselItem: DefineVxeComponentApp<VxeCarouselItemProps, VxeCarouselItemEventProps, VxeCarouselItemSlots, VxeCarouselItemMethods>
export type VxeCarouselItemComponent = DefineVxeComponentOptions<VxeCarouselItemProps, VxeCarouselItemEventProps>

export type VxeCarouselItemInstance = DefineVxeComponentInstance<VxeCarouselItemProps, VxeCarouselItemConstructor>

export interface VxeCarouselItemConstructor extends VxeComponentBaseOptions, VxeCarouselItemMethods {
  props: VxeCarouselItemProps
  context: SetupContext<VxeCarouselItemEmits>
  reactData: CarouselItemReactData
  getRefMaps(): CarouselItemPrivateRef
  getComputeMaps(): CarouselItemPrivateComputed
  renderVN: RenderFunction
}

export interface CarouselItemPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeCarouselItemPrivateRef extends CarouselItemPrivateRef { }

export namespace VxeCarouselItemPropTypes {
  export type Name = string | number | null
  export type ClassName = string
  export type Url = string
}

export interface VxeCarouselItemProps {
  name?: VxeCarouselItemPropTypes.Name
  className?: VxeCarouselItemPropTypes.ClassName
  url?: VxeCarouselItemPropTypes.Url
}

export interface CarouselItemPrivateComputed {
}
export interface VxeCarouselItemPrivateComputed extends CarouselItemPrivateComputed { }

export interface CarouselItemReactData {
}

export interface CarouselItemMethods {
  dispatchEvent(type: ValueOf<VxeCarouselItemEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeCarouselItemMethods extends CarouselItemMethods { }

export interface CarouselItemPrivateMethods { }
export interface VxeCarouselItemPrivateMethods extends CarouselItemPrivateMethods { }

export type VxeCarouselItemEmits = []

export namespace VxeCarouselItemDefines {
  export interface CarouselItemEventParams extends VxeComponentEventParams {
    $carouselItem: VxeCarouselItemConstructor
  }
}

export type VxeCarouselItemEventProps = {}

export interface VxeCarouselItemListeners { }

export namespace VxeCarouselItemEvents { }

export namespace VxeCarouselItemSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeCarouselItemSlots {
  default?: (params: VxeCarouselItemSlotTypes.DefaultSlotParams) => any
}

export const CarouselItem: typeof VxeCarouselItem
export default VxeCarouselItem
