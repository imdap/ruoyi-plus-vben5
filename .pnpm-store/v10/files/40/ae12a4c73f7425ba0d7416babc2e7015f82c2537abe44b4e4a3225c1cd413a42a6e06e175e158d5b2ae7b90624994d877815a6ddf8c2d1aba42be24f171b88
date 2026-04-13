import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentSizeType, ValueOf } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeRow: DefineVxeComponentApp<VxeRowProps, VxeRowEventProps, VxeRowSlots, VxeRowMethods>
export type VxeRowComponent = DefineVxeComponentOptions<VxeRowProps, VxeRowEventProps>

export type VxeRowInstance = DefineVxeComponentInstance<VxeRowProps, VxeRowConstructor>

export interface VxeRowConstructor extends VxeComponentBaseOptions, VxeRowMethods {
  props: VxeRowProps
  context: SetupContext<VxeRowEmits>
  reactData: RowReactData
  getRefMaps(): RowPrivateRef
  getComputeMaps(): RowPrivateComputed
  renderVN: RenderFunction
}

export interface RowPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeRowPrivateRef extends RowPrivateRef { }

export namespace VxeRowPropTypes {
  export type Gutter = string | number | (string | number)[]
  export type Wrap = boolean
  export type Vertical = boolean
  export type Size = VxeComponentSizeType
}

export type VxeRowProps = {
  gutter?: VxeRowPropTypes.Gutter
  wrap?: VxeRowPropTypes.Wrap
  vertical?: VxeRowPropTypes.Vertical
  size?: VxeRowPropTypes.Size
}

export interface RowPrivateComputed {
}
export interface VxeRowPrivateComputed extends RowPrivateComputed { }

export interface RowReactData {
}

export interface RowMethods {
  dispatchEvent(type: ValueOf<VxeRowEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeRowMethods extends RowMethods { }

export interface RowPrivateMethods { }
export interface VxeRowPrivateMethods extends RowPrivateMethods { }

export type VxeRowEmits = [
  'click'
]

export namespace VxeRowDefines {
  export interface RowEventParams extends VxeComponentEventParams {
    $row: VxeRowConstructor
  }
}

export type VxeRowEventProps = {}

export interface VxeRowListeners { }

export namespace VxeRowEvents { }

export namespace VxeRowSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeRowSlots {
  default?: (params: VxeRowSlotTypes.DefaultSlotParams) => any
}

export const Row: typeof VxeRow
export default VxeRow
