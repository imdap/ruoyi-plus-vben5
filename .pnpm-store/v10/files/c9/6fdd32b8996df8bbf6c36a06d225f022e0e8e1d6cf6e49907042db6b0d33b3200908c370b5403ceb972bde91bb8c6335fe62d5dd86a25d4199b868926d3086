import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, VxeComponentBaseOptions, VxeComponentEventParams } from '@vxe-ui/core'
import { VxeFormItemPropTypes } from './form-item'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeFormGroup: DefineVxeComponentApp<VxeFormGroupProps, VxeFormGroupEventProps, VxeFormGroupSlots, VxeFormGroupMethods>
export type VxeFormGroupComponent = DefineVxeComponentOptions<VxeFormGroupProps, VxeFormGroupEventProps>

export interface VxeFormGroupConstructor extends VxeComponentBaseOptions, VxeFormGroupMethods {
  props: VxeFormGroupProps
  context: SetupContext<VxeFormGroupEmits>
  reactData: FormGroupReactData
  getRefMaps(): FormGroupPrivateRef
  getComputeMaps(): FormGroupPrivateComputed
  renderVN: RenderFunction
}

export interface FormGroupPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeFormGroupPrivateRef extends FormGroupPrivateRef { }

export namespace VxeFormGroupPropTypes {
}

export type VxeFormGroupProps = {
  /**
   * 栅格占据的列数（共 24 分栏）
   */
  span?: VxeFormItemPropTypes.Span
  /**
   * 给表单项附加 className
   */
  className?: VxeFormItemPropTypes.ClassName
}

export interface FormGroupPrivateComputed {
}
export interface VxeFormGroupPrivateComputed extends FormGroupPrivateComputed { }

export interface FormGroupReactData {
}

export interface FormGroupMethods {
}
export interface VxeFormGroupMethods extends FormGroupMethods { }

export interface FormGroupPrivateMethods { }
export interface VxeFormGroupPrivateMethods extends FormGroupPrivateMethods { }

export type VxeFormGroupEmits = []

export namespace VxeFormGroupDefines {
  export interface FormGroupEventParams extends VxeComponentEventParams {
    $formGroup: VxeFormGroupConstructor
  }
}

export type VxeFormGroupEventProps = {}

export interface VxeFormGroupListeners { }

export namespace VxeFormGroupEvents { }

export namespace VxeFormGroupSlotTypes {
  export interface DefaultSlotParams {
    [key: string]: any
  }
}

export interface VxeFormGroupSlots {
  default: (params: VxeFormGroupSlotTypes.DefaultSlotParams) => any
}

export const FormGroup: typeof VxeFormGroup
export default VxeFormGroup
