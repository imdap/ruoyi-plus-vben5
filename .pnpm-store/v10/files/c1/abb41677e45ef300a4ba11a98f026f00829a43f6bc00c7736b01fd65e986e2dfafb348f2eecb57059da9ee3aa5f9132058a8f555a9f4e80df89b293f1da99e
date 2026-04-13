import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeBreadcrumbItem: DefineVxeComponentApp<VxeBreadcrumbItemProps, VxeBreadcrumbItemEventProps, VxeBreadcrumbItemSlots, VxeBreadcrumbItemMethods>
export type VxeBreadcrumbItemComponent = DefineVxeComponentOptions<VxeBreadcrumbItemProps, VxeBreadcrumbItemEventProps>

export type VxeBreadcrumbItemInstance = DefineVxeComponentInstance<VxeBreadcrumbItemProps, VxeBreadcrumbItemConstructor>

export interface VxeBreadcrumbItemConstructor extends VxeComponentBaseOptions, VxeBreadcrumbItemMethods {
  props: VxeBreadcrumbItemProps
  context: SetupContext<VxeBreadcrumbItemEmits>
  reactData: BreadcrumbItemReactData
  getRefMaps(): BreadcrumbItemPrivateRef
  getComputeMaps(): BreadcrumbItemPrivateComputed
  renderVN: RenderFunction
}

export interface BreadcrumbItemPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeBreadcrumbItemPrivateRef extends BreadcrumbItemPrivateRef { }

export namespace VxeBreadcrumbItemPropTypes {
  export type Title = string
  export type RouterLink = {
    path?: string
    name?: string | number | null
    query?: any
    params?: any
  }
}

export type VxeBreadcrumbItemProps = {
  title?: VxeBreadcrumbItemPropTypes.Title
  routerLink?: VxeBreadcrumbItemPropTypes.RouterLink
}

export interface BreadcrumbItemPrivateComputed {
}
export interface VxeBreadcrumbItemPrivateComputed extends BreadcrumbItemPrivateComputed { }

export interface BreadcrumbItemReactData {
}

export interface BreadcrumbItemMethods {
}
export interface VxeBreadcrumbItemMethods extends BreadcrumbItemMethods { }

export interface BreadcrumbItemPrivateMethods { }
export interface VxeBreadcrumbItemPrivateMethods extends BreadcrumbItemPrivateMethods { }

export type VxeBreadcrumbItemEmits = []

export namespace VxeBreadcrumbItemDefines {
  export interface BreadcrumbItemEventParams extends VxeComponentEventParams {
    $breadcrumbItem: VxeBreadcrumbItemConstructor
  }
}

export type VxeBreadcrumbItemEventProps = {}

export interface VxeBreadcrumbItemListeners { }

export namespace VxeBreadcrumbItemEvents { }

export namespace VxeBreadcrumbItemSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeBreadcrumbItemSlots {
  /**
   * 自定义显示内容模板
   */
  default?: (params: VxeBreadcrumbItemSlotTypes.DefaultSlotParams) => any
}

export const BreadcrumbItem: typeof VxeBreadcrumbItem
export default VxeBreadcrumbItem
