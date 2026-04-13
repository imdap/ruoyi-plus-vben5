import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentSlotType } from '@vxe-ui/core'
import { VxeSelectConstructor } from './select'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeOption: DefineVxeComponentApp<VxeOptionProps, VxeOptionEventProps, VxeOptionSlots, VxeOptionMethods>
export type VxeOptionComponent = DefineVxeComponentOptions<VxeOptionProps, VxeOptionEventProps>

export type VxeOptionInstance = DefineVxeComponentInstance<VxeOptionProps, VxeOptionConstructor>

export interface VxeOptionConstructor extends VxeComponentBaseOptions, VxeOptionMethods {
  props: VxeOptionProps
  context: SetupContext<VxeOptionEmits>
  reactData: OptionReactData
  getRefMaps(): OptionPrivateRef
  getComputeMaps(): OptionPrivateComputed
  renderVN: RenderFunction
}

export interface OptionPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeOptionPrivateRef extends OptionPrivateRef { }

export namespace VxeOptionPropTypes {
  export type Value = any
  export type Label = string | number | boolean
  export type Visible = boolean
  export type ClassName = string | ((params: {
    option: any
    $select: VxeSelectConstructor
  }) => string)
  export type Disabled = boolean
  export type Slots = {
    default?: string | ((params: {
      option: any
      $select: VxeSelectConstructor
    }) => VxeComponentSlotType | VxeComponentSlotType[]) | null
  }
}

export interface VxeOptionProps {
  /**
  * 绑定值
  */
  value?: VxeOptionPropTypes.Value
  /**
  * 显示内容
  */
  label?: VxeOptionPropTypes.Label
  /**
  * 是否显示
  */
  visible?: VxeOptionPropTypes.Visible
  className?: VxeOptionPropTypes.ClassName
  /**
  * 是否禁用
  */
  disabled?: VxeOptionPropTypes.Disabled
  slots?: VxeOptionPropTypes.Slots
}

export interface OptionPrivateComputed {
}
export interface VxeOptionPrivateComputed extends OptionPrivateComputed { }

export interface OptionReactData {
}

export interface OptionMethods {
}
export interface VxeOptionMethods extends OptionMethods { }

export interface OptionPrivateMethods { }
export interface VxeOptionPrivateMethods extends OptionPrivateMethods { }

export type VxeOptionEmits = []

export namespace VxeOptionDefines {
  export interface OptionEventParams extends VxeComponentEventParams {
    $option: VxeOptionConstructor
  }
}

export type VxeOptionEventProps = {}

export interface VxeOptionListeners { }

export namespace VxeOptionEvents { }

export namespace VxeOptionSlotTypes {
  export interface DefaultSlotParams {
    option: any
  }
}

export interface VxeOptionSlots {
  default?: (params: VxeOptionSlotTypes.DefaultSlotParams) => any
}

export const Option: typeof VxeOption
export default VxeOption
