import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentStatusType, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentStyleType } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeEmpty: DefineVxeComponentApp<VxeEmptyProps, VxeEmptyEventProps, VxeEmptySlots, VxeEmptyMethods>
export type VxeEmptyComponent = DefineVxeComponentOptions<VxeEmptyProps, VxeEmptyEventProps>

export type VxeEmptyInstance = DefineVxeComponentInstance<VxeEmptyProps, VxeEmptyConstructor>

export interface VxeEmptyConstructor extends VxeComponentBaseOptions, VxeEmptyMethods {
  props: VxeEmptyProps
  context: SetupContext<VxeEmptyEmits>
  reactData: EmptyReactData
  getRefMaps(): EmptyPrivateRef
  getComputeMaps(): EmptyPrivateComputed
  renderVN: RenderFunction
}

export interface EmptyPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeEmptyPrivateRef extends EmptyPrivateRef { }

export namespace VxeEmptyPropTypes {
  export type ImageUrl = string
  export type ImageStyle = VxeComponentStyleType
  export type Icon = string
  export type Status = VxeComponentStatusType
  export type Content = number | string
}

export interface VxeEmptyProps {
  imageUrl?: VxeEmptyPropTypes.ImageUrl
  imageStyle?: VxeEmptyPropTypes.ImageStyle
  icon?: VxeEmptyPropTypes.Icon
  status?: VxeEmptyPropTypes.Status
  content?: VxeEmptyPropTypes.Content
}

export interface EmptyPrivateComputed {
}
export interface VxeEmptyPrivateComputed extends EmptyPrivateComputed { }

export interface EmptyReactData {
}

export interface EmptyMethods {
}
export interface VxeEmptyMethods extends EmptyMethods { }

export interface EmptyPrivateMethods { }
export interface VxeEmptyPrivateMethods extends EmptyPrivateMethods { }

export type VxeEmptyEmits = []

export namespace VxeEmptyDefines {
  export interface EmptyEventParams extends VxeComponentEventParams {
    $empty: VxeEmptyConstructor
  }
}

export type VxeEmptyEventProps = {}

export interface VxeEmptyListeners { }

export namespace VxeEmptyEvents { }

export namespace VxeEmptySlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeEmptySlots {
  default?: (params: VxeEmptySlotTypes.DefaultSlotParams) => any
}

export const Empty: typeof VxeEmpty
export default VxeEmpty
