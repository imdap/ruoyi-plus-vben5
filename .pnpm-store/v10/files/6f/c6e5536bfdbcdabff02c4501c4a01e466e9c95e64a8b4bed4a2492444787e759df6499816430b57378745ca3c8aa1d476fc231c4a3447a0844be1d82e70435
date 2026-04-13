import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentSlotType } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeSplitterPanel: DefineVxeComponentApp<VxeSplitterPanelProps, VxeSplitterPanelEventProps, VxeSplitterPanelSlots, VxeSplitterPanelMethods>
export type VxeSplitterPanelComponent = DefineVxeComponentOptions<VxeSplitterPanelProps, VxeSplitterPanelEventProps>

export type VxeSplitterPanelInstance = DefineVxeComponentInstance<VxeSplitterPanelProps, VxeSplitterPanelConstructor>

export interface VxeSplitterPanelConstructor extends VxeComponentBaseOptions, VxeSplitterPanelMethods {
  props: VxeSplitterPanelProps
  context: SetupContext<VxeSplitterPanelEmits>
  reactData: SplitterItemReactData
  getRefMaps(): SplitterItemPrivateRef
  getComputeMaps(): SplitterItemPrivateComputed
  renderVN: RenderFunction
}

export interface SplitterItemPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeSplitterPanelPrivateRef extends SplitterItemPrivateRef { }

export namespace VxeSplitterPanelPropTypes {
  export type Name = string | number
  export type Width = string | number
  export type Height = string | number
  export type MinWidth = string | number
  export type MinHeight = string | number

  /**
   * 已废弃
   * @deprecated
   */
  export type ShowAction = boolean
}

export interface VxeSplitterPanelProps {
  name?: VxeSplitterPanelPropTypes.Name
  width?: VxeSplitterPanelPropTypes.Width
  height?: VxeSplitterPanelPropTypes.Height
  minWidth?: VxeSplitterPanelPropTypes.MinWidth
  minHeight?: VxeSplitterPanelPropTypes.MinHeight
  slots?: {
    default?: string | ((params: VxeSplitterPanelSlotTypes.DefaultSlotParams) => VxeComponentSlotType | VxeComponentSlotType[])
  }

  /**
   * 已废弃
   * @deprecated
   */
  showAction?: VxeSplitterPanelPropTypes.ShowAction
}

export interface SplitterItemPrivateComputed {
}
export interface VxeSplitterPanelPrivateComputed extends SplitterItemPrivateComputed { }

export interface SplitterItemReactData {
}

export interface SplitterItemInternalData {
}

export interface SplitterItemMethods {
  dispatchEvent(type: ValueOf<VxeSplitterPanelEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeSplitterPanelMethods extends SplitterItemMethods { }

export interface SplitterItemPrivateMethods { }
export interface VxeSplitterPanelPrivateMethods extends SplitterItemPrivateMethods { }

export type VxeSplitterPanelEmits = [
]

export namespace VxeSplitterPanelDefines {
  export interface SplitterItemEventParams extends VxeComponentEventParams {
    $splitterPanel: VxeSplitterPanelConstructor
  }
}

export type VxeSplitterPanelEventProps = {
}

export interface VxeSplitterPanelListeners {
}

export namespace VxeSplitterPanelEvents {
}

export namespace VxeSplitterPanelSlotTypes {
  export interface DefaultSlotParams {
    name: VxeSplitterPanelPropTypes.Name
    isVisible: boolean
    isExpand: boolean
  }
}

export interface VxeSplitterPanelSlots {
  default?: (params: VxeSplitterPanelSlotTypes.DefaultSlotParams) => any
}

export const SplitterItem: typeof VxeSplitterPanel
export default VxeSplitterPanel
