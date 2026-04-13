import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeFlowDesign: DefineVxeComponentApp<VxeFlowDesignProps, VxeFlowDesignEventProps, VxeFlowDesignSlots, VxeFlowDesignMethods>
export type VxeFlowDesignComponent = DefineVxeComponentOptions<VxeFlowDesignProps, VxeFlowDesignEventProps>

export type VxeFlowDesignInstance = DefineVxeComponentInstance<VxeFlowDesignProps, VxeFlowDesignConstructor>

export interface VxeFlowDesignConstructor extends VxeComponentBaseOptions, VxeFlowDesignMethods {
  props: VxeFlowDesignProps
  context: SetupContext<VxeFlowDesignEmits>
  reactData: FlowDesignReactData
  getRefMaps(): FlowDesignPrivateRef
  getComputeMaps(): FlowDesignPrivateComputed
  renderVN: RenderFunction
}

export interface FlowDesignPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeFlowDesignPrivateRef extends FlowDesignPrivateRef { }

export namespace VxeFlowDesignPropTypes {
}

export type VxeFlowDesignProps = {
}

export interface FlowDesignPrivateComputed {
}
export interface VxeFlowDesignPrivateComputed extends FlowDesignPrivateComputed { }

export interface FlowDesignReactData {
}

export interface FlowDesignMethods {
  dispatchEvent(type: ValueOf<VxeFlowDesignEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeFlowDesignMethods extends FlowDesignMethods { }

export interface FlowDesignPrivateMethods { }
export interface VxeFlowDesignPrivateMethods extends FlowDesignPrivateMethods { }

export type VxeFlowDesignEmits = []

export namespace VxeFlowDesignDefines {
  export interface FlowDesignEventParams extends VxeComponentEventParams {
    $flowDesign: VxeFlowDesignConstructor
  }

  export type SaveFileFunction = (options: {
    filename: string
    type: string
    content: string | Blob
  }) => Promise<any>

  export type ReadFileFunction = (options?: {
    multiple?: boolean
    types?: string[]
    message?: boolean
  }) => Promise<{
    status: boolean
    files: FileList
    file: File
  }>
}

export type VxeFlowDesignEventProps = {}

export interface VxeFlowDesignListeners { }

export namespace VxeFlowDesignEvents { }

export namespace VxeFlowDesignSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeFlowDesignSlots {
  default: (params: VxeFlowDesignSlotTypes.DefaultSlotParams) => any
}

export const FlowDesign: typeof VxeFlowDesign
export default VxeFlowDesign
