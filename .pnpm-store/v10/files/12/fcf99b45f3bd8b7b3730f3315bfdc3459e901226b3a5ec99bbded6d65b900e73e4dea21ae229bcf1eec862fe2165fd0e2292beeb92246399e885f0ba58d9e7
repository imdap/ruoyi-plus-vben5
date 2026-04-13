import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentSizeType } from '@vxe-ui/core'
import { VxeCollapsePaneProps, VxeCollapsePaneDefines, VxeCollapsePanePropTypes } from './collapse-pane'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeCollapse: DefineVxeComponentApp<VxeCollapseProps, VxeCollapseEventProps, VxeCollapseSlots, VxeCollapseMethods>
export type VxeCollapseComponent = DefineVxeComponentOptions<VxeCollapseProps, VxeCollapseEventProps>

export type VxeCollapseInstance = DefineVxeComponentInstance<VxeCollapseProps, VxeCollapseConstructor>

export interface VxeCollapseConstructor extends VxeComponentBaseOptions, VxeCollapseMethods {
  props: VxeCollapseProps
  context: SetupContext<VxeCollapseEmits>
  reactData: CollapseReactData
  getRefMaps(): CollapsePrivateRef
  getComputeMaps(): CollapsePrivateComputed
  renderVN: RenderFunction
}

export interface CollapsePrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeCollapsePrivateRef extends CollapsePrivateRef { }

export namespace VxeCollapsePropTypes {
  export type Size = VxeComponentSizeType
  export type ModelValue = VxeCollapsePanePropTypes.Name[]
  export type Options = VxeCollapsePaneProps[]
  export type Padding = boolean
  export interface ExpandConfig {
    accordion?: boolean
    padding?: boolean
    showIcon?: boolean
    iconOpen?: string
    iconClose?: string
  }
}

export type VxeCollapseProps = {
  size?: VxeCollapsePropTypes.Size
  modelValue?: VxeCollapsePropTypes.ModelValue
  options?: VxeCollapsePropTypes.Options
  padding?: VxeCollapsePropTypes.Padding
  expandConfig?: VxeCollapsePropTypes.ExpandConfig
}

export interface CollapsePrivateComputed {
}
export interface VxeCollapsePrivateComputed extends CollapsePrivateComputed { }

export interface CollapseReactData {
  staticPanes: VxeCollapsePaneDefines.CollapseConfig[]
  activeNames: VxeCollapsePanePropTypes.Name[]
  initNames: VxeCollapsePanePropTypes.Name[]
  cachePaneMaps: Record<string, {
    loading: boolean
  }>
}

export interface CollapseMethods {
}
export interface VxeCollapseMethods extends CollapseMethods { }

export interface CollapsePrivateMethods { }
export interface VxeCollapsePrivateMethods extends CollapsePrivateMethods { }

export type VxeCollapseEmits = [
  'update:modelValue',
  'load',
  'change',
  'toggle-expand',
]

export namespace VxeCollapseDefines {
  export interface CollapseEventParams extends VxeComponentEventParams {
    $collapse: VxeCollapseConstructor
  }
  export interface ChangeEventParams extends CollapseEventParams {
    value: (string | number)[]
    name: VxeCollapsePanePropTypes.Name
  }
  export interface ToggleExpandEventParams extends CollapseEventParams {
    value: (string | number)[]
    name: VxeCollapsePanePropTypes.Name
    expanded: boolean
  }
}

export type VxeCollapseEventProps = {
  onChange?: VxeCollapseEvents.Change
  onToggleExpand?: VxeCollapseEvents.ToggleExpand
}

export interface VxeCollapseListeners {
  change?: VxeCollapseEvents.Change
  onToggleExpand?: VxeCollapseEvents.ToggleExpand
}

export namespace VxeCollapseEvents {
  export type Change = (params: VxeCollapseDefines.ChangeEventParams) => void
  export type ToggleExpand = (params: VxeCollapseDefines.ToggleExpandEventParams) => void
}

export namespace VxeCollapseSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeCollapseSlots {
  /**
   * 自定义插槽模板
   */
  [key: string]: ((params: {
    [key: string]: any
  }) => any) | undefined

  default?: (params: VxeCollapseSlotTypes.DefaultSlotParams) => any
}

export const Collapse: typeof VxeCollapse
export default VxeCollapse
