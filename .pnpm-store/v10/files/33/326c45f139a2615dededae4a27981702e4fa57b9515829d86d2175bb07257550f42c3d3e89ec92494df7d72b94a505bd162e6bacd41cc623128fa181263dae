import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeLayoutHeader: DefineVxeComponentApp<VxeLayoutHeaderProps, VxeLayoutHeaderEventProps, VxeLayoutHeaderSlots, VxeLayoutHeaderMethods>
export type VxeLayoutHeaderComponent = DefineVxeComponentOptions<VxeLayoutHeaderProps, VxeLayoutHeaderEventProps>

export interface VxeLayoutHeaderConstructor extends VxeComponentBaseOptions, VxeLayoutHeaderMethods {
  props: VxeLayoutHeaderProps
  context: SetupContext<VxeLayoutHeaderEmits>
  reactData: LayoutHeaderReactData
  getRefMaps(): LayoutHeaderPrivateRef
  getComputeMaps(): LayoutHeaderPrivateComputed
  renderVN: RenderFunction
}

export interface LayoutHeaderPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeLayoutHeaderPrivateRef extends LayoutHeaderPrivateRef { }

export namespace VxeLayoutHeaderPropTypes {
  export type Fixed = boolean
}

export interface VxeLayoutHeaderProps {
  fixed?: VxeLayoutHeaderPropTypes.Fixed
}

export interface LayoutHeaderPrivateComputed {
}
export interface VxeLayoutHeaderPrivateComputed extends LayoutHeaderPrivateComputed { }

export interface LayoutHeaderReactData {
}

export interface LayoutHeaderMethods {
  dispatchEvent(type: ValueOf<VxeLayoutHeaderEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeLayoutHeaderMethods extends LayoutHeaderMethods { }

export interface LayoutHeaderPrivateMethods { }
export interface VxeLayoutHeaderPrivateMethods extends LayoutHeaderPrivateMethods { }

export type VxeLayoutHeaderEmits = []

export namespace VxeLayoutHeaderDefines {
  export interface LayoutHeaderEventParams extends VxeComponentEventParams {
    $layoutHeader: VxeLayoutHeaderConstructor
  }
}

export type VxeLayoutHeaderEventProps = {}

export interface VxeLayoutHeaderListeners { }

export namespace VxeLayoutHeaderEvents { }

export namespace VxeLayoutHeaderSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeLayoutHeaderSlots {
  default?: (params: VxeLayoutHeaderSlotTypes.DefaultSlotParams) => any
}

export const LayoutHeader: typeof VxeLayoutHeader
export default VxeLayoutHeader
