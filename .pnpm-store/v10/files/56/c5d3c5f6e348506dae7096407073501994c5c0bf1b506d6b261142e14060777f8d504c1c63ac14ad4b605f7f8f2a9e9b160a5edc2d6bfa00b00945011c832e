import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentSizeType } from '@vxe-ui/core'
import { VxeBacktopProps, VxeBacktopSlotTypes } from './backtop'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeLayoutBody: DefineVxeComponentApp<VxeLayoutBodyProps, VxeLayoutBodyEventProps, VxeLayoutBodySlots, VxeLayoutBodyMethods>
export type VxeLayoutBodyComponent = DefineVxeComponentOptions<VxeLayoutBodyProps, VxeLayoutBodyEventProps>

export type VxeLayoutBodyInstance = DefineVxeComponentInstance<VxeLayoutBodyProps, VxeLayoutBodyConstructor>

export interface VxeLayoutBodyConstructor extends VxeComponentBaseOptions, VxeLayoutBodyMethods {
  props: VxeLayoutBodyProps
  context: SetupContext<VxeLayoutBodyEmits>
  internalData: LayoutBodyInternalData
  reactData: LayoutBodyReactData
  getRefMaps(): LayoutBodyPrivateRef
  getComputeMaps(): LayoutBodyPrivateComputed
  renderVN: RenderFunction
}

export interface LayoutBodyPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeLayoutBodyPrivateRef extends LayoutBodyPrivateRef { }

export namespace VxeLayoutBodyPropTypes {
  export type Size = VxeComponentSizeType
  export type Loading = boolean
  export type Padding = boolean
  export type ShowBacktop = boolean
  export interface BacktopConfig extends Omit<VxeBacktopProps, 'target'> {}
}

export interface VxeLayoutBodyProps {
  size?: VxeLayoutBodyPropTypes.Size
  loading?: VxeLayoutBodyPropTypes.Loading
  padding?: VxeLayoutBodyPropTypes.Padding
  showBacktop?: VxeLayoutBodyPropTypes.ShowBacktop
  backtopConfig?: VxeLayoutBodyPropTypes.BacktopConfig
}

export interface LayoutBodyPrivateComputed {
}
export interface VxeLayoutBodyPrivateComputed extends LayoutBodyPrivateComputed { }

export interface LayoutBodyInternalData {
}
export interface LayoutBodyReactData {
}

export interface LayoutBodyMethods {
  dispatchEvent(type: ValueOf<VxeLayoutBodyEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeLayoutBodyMethods extends LayoutBodyMethods { }

export interface LayoutBodyPrivateMethods { }
export interface VxeLayoutBodyPrivateMethods extends LayoutBodyPrivateMethods { }

export type VxeLayoutBodyEmits = []

export namespace VxeLayoutBodyDefines {
  export interface LayoutBodyEventParams extends VxeComponentEventParams {
    $layoutBody: VxeLayoutBodyConstructor
  }
}

export type VxeLayoutBodyEventProps = {}

export interface VxeLayoutBodyListeners { }

export namespace VxeLayoutBodyEvents { }

export namespace VxeLayoutBodySlotTypes {
  export interface DefaultSlotParams {}
  export interface BacktopSlotParams extends VxeBacktopSlotTypes.DefaultSlotParams {}
  export interface BacktopTopSlotParams extends VxeBacktopSlotTypes.TopSlotParams {}
  export interface BacktopBottomSlotParams extends VxeBacktopSlotTypes.BottomParams {}
}

export interface VxeLayoutBodySlots {
  default: (params: VxeLayoutBodySlotTypes.DefaultSlotParams) => any
  backtop: (params: VxeLayoutBodySlotTypes.BacktopSlotParams) => any
  backtopTop: (params: VxeLayoutBodySlotTypes.BacktopTopSlotParams) => any
  'backtop-top': (params: VxeLayoutBodySlotTypes.BacktopTopSlotParams) => any
  backtopBottom: (params: VxeLayoutBodySlotTypes.BacktopBottomSlotParams) => any
  'backtop-bottom': (params: VxeLayoutBodySlotTypes.BacktopBottomSlotParams) => any
}

export const LayoutBody: typeof VxeLayoutBody
export default VxeLayoutBody
