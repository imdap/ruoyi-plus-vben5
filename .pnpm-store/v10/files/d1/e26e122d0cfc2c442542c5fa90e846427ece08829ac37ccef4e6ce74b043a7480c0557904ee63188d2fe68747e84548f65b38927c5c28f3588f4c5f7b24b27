import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentSlotType } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */
/**
 * @deprecated
 */
export declare const VxeSplitPane: DefineVxeComponentApp<VxeSplitPaneProps, VxeSplitPaneEventProps, VxeSplitPaneSlots, VxeSplitPaneMethods>
export type VxeSplitPaneComponent = DefineVxeComponentOptions<VxeSplitPaneProps, VxeSplitPaneEventProps>
/**
 * @deprecated
 */
export type VxeSplitPaneInstance = DefineVxeComponentInstance<VxeSplitPaneProps, VxeSplitPaneConstructor>
/**
 * @deprecated
 */
export interface VxeSplitPaneConstructor extends VxeComponentBaseOptions, VxeSplitPaneMethods {
  props: VxeSplitPaneProps
  context: SetupContext<VxeSplitPaneEmits>
  reactData: SplitItemReactData
  getRefMaps(): SplitItemPrivateRef
  getComputeMaps(): SplitItemPrivateComputed
  renderVN: RenderFunction
}
/**
 * @deprecated
 */
export interface SplitItemPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeSplitPanePrivateRef extends SplitItemPrivateRef { }
/**
 * @deprecated
 */
export namespace VxeSplitPanePropTypes {
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
/**
 * @deprecated
 */
export interface VxeSplitPaneProps {
  name?: VxeSplitPanePropTypes.Name
  width?: VxeSplitPanePropTypes.Width
  height?: VxeSplitPanePropTypes.Height
  minWidth?: VxeSplitPanePropTypes.MinWidth
  minHeight?: VxeSplitPanePropTypes.MinHeight
  slots?: {
    default?: string | ((params: VxeSplitPaneSlotTypes.DefaultSlotParams) => VxeComponentSlotType | VxeComponentSlotType[])
  }

  /**
   * 已废弃
   * @deprecated
   */
  showAction?: VxeSplitPanePropTypes.ShowAction
}

export interface SplitItemPrivateComputed {
}
export interface VxeSplitPanePrivateComputed extends SplitItemPrivateComputed { }
/**
 * @deprecated
 */
export interface SplitItemReactData {
}
/**
 * @deprecated
 */
export interface SplitItemInternalData {
}

export interface SplitItemMethods {
  dispatchEvent(type: ValueOf<VxeSplitPaneEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeSplitPaneMethods extends SplitItemMethods { }

export interface SplitItemPrivateMethods { }
export interface VxeSplitPanePrivateMethods extends SplitItemPrivateMethods { }
/**
 * @deprecated
 */
export type VxeSplitPaneEmits = [
]
/**
 * @deprecated
 */
export namespace VxeSplitPaneDefines {
  export interface SplitItemEventParams extends VxeComponentEventParams {
    $splitPane: VxeSplitPaneConstructor
  }
}

export type VxeSplitPaneEventProps = {
}
/**
 * @deprecated
 */
export interface VxeSplitPaneListeners {
}
/**
 * @deprecated
 */
export namespace VxeSplitPaneEvents {
}

export namespace VxeSplitPaneSlotTypes {
  export interface DefaultSlotParams {
    name: VxeSplitPanePropTypes.Name
    isVisible: boolean
    isExpand: boolean
  }
}
/**
 * @deprecated
 */
export interface VxeSplitPaneSlots {
  default?: (params: VxeSplitPaneSlotTypes.DefaultSlotParams) => any
}
/**
 * @deprecated
 */
export const SplitItem: typeof VxeSplitPane
export default VxeSplitPane
