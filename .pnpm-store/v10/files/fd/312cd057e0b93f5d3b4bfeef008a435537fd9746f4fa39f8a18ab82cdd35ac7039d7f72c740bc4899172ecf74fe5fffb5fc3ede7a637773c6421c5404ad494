import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentPermissionCodeType, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentSlotType } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeCollapsePane: DefineVxeComponentApp<VxeCollapsePaneProps, VxeCollapsePaneEventProps, VxeCollapsePaneSlots, VxeCollapsePaneMethods>
export type VxeCollapsePaneComponent = DefineVxeComponentOptions<VxeCollapsePaneProps, VxeCollapsePaneEventProps>

export type VxeCollapsePaneInstance = DefineVxeComponentInstance<VxeCollapsePaneProps, VxeCollapsePaneConstructor>

export interface VxeCollapsePaneConstructor extends VxeComponentBaseOptions, VxeCollapsePaneMethods {
  props: VxeCollapsePaneProps
  context: SetupContext<VxeCollapsePaneEmits>
  reactData: CollapsePaneReactData
  getRefMaps(): CollapsePanePrivateRef
  getComputeMaps(): CollapsePanePrivateComputed
  renderVN: RenderFunction
}

export interface CollapsePanePrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeCollapsePanePrivateRef extends CollapsePanePrivateRef { }

export namespace VxeCollapsePanePropTypes {
  export type Title = string | number
  export type Name = string | number | boolean
  export type Icon = string
  export type Preload = boolean
  export type PermissionCode = VxeComponentPermissionCodeType
}

export interface VxeCollapsePaneProps {
  title?: VxeCollapsePanePropTypes.Title
  name?: VxeCollapsePanePropTypes.Name
  icon?: VxeCollapsePanePropTypes.Icon
  preload?: VxeCollapsePanePropTypes.Preload
  permissionCode?: VxeCollapsePanePropTypes.PermissionCode

  slots?: {
    title?: string | ((params: VxeCollapsePaneSlotTypes.TitleSlotParams) => VxeComponentSlotType | VxeComponentSlotType[])
    default?: string | ((params: VxeCollapsePaneSlotTypes.DefaultSlotParams) => VxeComponentSlotType | VxeComponentSlotType[])
  }
}

export interface CollapsePanePrivateComputed {
}
export interface VxeCollapsePanePrivateComputed extends CollapsePanePrivateComputed { }

export interface CollapsePaneReactData {
}

export interface CollapsePaneMethods {
}
export interface VxeCollapsePaneMethods extends CollapsePaneMethods { }

export interface CollapsePanePrivateMethods { }
export interface VxeCollapsePanePrivateMethods extends CollapsePanePrivateMethods { }

export type VxeCollapsePaneEmits = []

export namespace VxeCollapsePaneDefines {
  export interface CollapsePaneEventParams extends VxeComponentEventParams {
    $collapsePane: VxeCollapsePaneConstructor
  }

  export interface CollapseConfig extends VxeCollapsePaneProps {
    id: string
  }
}

export type VxeCollapsePaneEventProps = {}

export interface VxeCollapsePaneListeners { }

export namespace VxeCollapsePaneEvents { }

export namespace VxeCollapsePaneSlotTypes {
  export interface DefaultSlotParams {}
  export interface TitleSlotParams {}
}

export interface VxeCollapsePaneSlots {
  title?: (params: VxeCollapsePaneSlotTypes.TitleSlotParams) => any
  default?: (params: VxeCollapsePaneSlotTypes.DefaultSlotParams) => any
}

export const CollapsePane: typeof VxeCollapsePane
export default VxeCollapsePane
