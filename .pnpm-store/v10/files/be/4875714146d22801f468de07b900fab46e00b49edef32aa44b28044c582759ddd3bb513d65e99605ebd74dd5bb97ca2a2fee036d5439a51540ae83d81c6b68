import { RenderFunction, SetupContext, Ref, ComputedRef } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentSizeType, ValueOf } from '@vxe-ui/core'
import { VxeCheckboxPropTypes } from './checkbox'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeCheckboxGroup: DefineVxeComponentApp<VxeCheckboxGroupProps, VxeCheckboxGroupEventProps, VxeCheckboxGroupSlots, VxeCheckboxGroupMethods>
export type VxeCheckboxGroupComponent = DefineVxeComponentOptions<VxeCheckboxGroupProps, VxeCheckboxGroupEventProps>

export type VxeCheckboxGroupInstance = DefineVxeComponentInstance<VxeCheckboxGroupProps, VxeCheckboxGroupConstructor>

export interface VxeCheckboxGroupConstructor extends VxeComponentBaseOptions, VxeCheckboxGroupMethods {
  props: VxeCheckboxGroupProps
  context: SetupContext<VxeCheckboxGroupEmits>
  reactData: CheckboxGroupReactData
  getRefMaps(): CheckboxGroupPrivateRef
  getComputeMaps(): CheckboxGroupPrivateComputed
  renderVN: RenderFunction
}

export interface CheckboxGroupPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeCheckboxGroupPrivateRef extends CheckboxGroupPrivateRef { }

export namespace VxeCheckboxGroupPropTypes {
  export type Size = VxeComponentSizeType
  export type ModelValue = any[] | null
  export type Options = {
    value?: VxeCheckboxPropTypes.Label
    label?: VxeCheckboxPropTypes.Content

    [key: string]: any
  }[]
  export type OptionProps = {
    value?: string
    label?: string
    disabled?: string
  }
  export type Max = string | number
  export type Disabled = boolean
  export interface DefaultConfig {
    /**
     * 默认选择模式，默认选中行为只会在初始化时触发一次
     */
    selectMode?: 'all' | 'first' | 'last'
  }
}

export type VxeCheckboxGroupProps = {
  size?: VxeCheckboxGroupPropTypes.Size
  options?: VxeCheckboxGroupPropTypes.Options
  optionProps?: VxeCheckboxGroupPropTypes.OptionProps
  /**
   * 绑定值
   */
  modelValue?: VxeCheckboxGroupPropTypes.ModelValue
  max?: VxeCheckboxGroupPropTypes.Max
  /**
   * 是否禁用
   */
  disabled?: VxeCheckboxGroupPropTypes.Disabled
  defaultConfig?: VxeCheckboxGroupPropTypes.DefaultConfig
}

export interface CheckboxGroupPrivateComputed {
  computeIsMaximize: ComputedRef<boolean>
  computeIsDisabled: ComputedRef<boolean | undefined>
}
export interface VxeCheckboxGroupPrivateComputed extends CheckboxGroupPrivateComputed { }

export interface CheckboxGroupReactData {
}
export interface CheckboxGroupInternalData {
  isLoaded?: boolean
}

export interface CheckboxGroupMethods {
  dispatchEvent(type: ValueOf<VxeCheckboxGroupEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeCheckboxGroupMethods extends CheckboxGroupMethods { }

export interface CheckboxGroupPrivateMethods {
  handleChecked(params: {
    checked: boolean
    value: VxeCheckboxPropTypes.ModelValue
    label: VxeCheckboxPropTypes.Label
  }, evnt: Event): void
}
export interface VxeCheckboxGroupPrivateMethods extends CheckboxGroupPrivateMethods { }

export type VxeCheckboxGroupEmits = [
  'update:modelValue',
  'change',
  'default-change'
]

export namespace VxeCheckboxGroupDefines {
  export interface CheckboxGroupEventParams extends VxeComponentEventParams {
    $checkboxGroup: VxeCheckboxGroupConstructor
  }

  export interface ChangeParams {
    value: any[]
    checklist: any[]
  }
  export interface ChangeEventParams extends CheckboxGroupEventParams, ChangeParams { }

  export interface DefaultChangeEventParams {
    value: any[]
  }
}

export type VxeCheckboxGroupEventProps = {
  'onUpdate:modelValue'?: VxeCheckboxGroupEvents.UpdateModelValue
  onChange?: VxeCheckboxGroupEvents.Change
  onDefaultChange?: VxeCheckboxGroupEvents.DefaultChange
}

export interface VxeCheckboxGroupListeners {
  'update:modelValue'?: VxeCheckboxGroupEvents.UpdateModelValue
  change?: VxeCheckboxGroupEvents.Change
  defaultChange?: VxeCheckboxGroupEvents.DefaultChange
}

export namespace VxeCheckboxGroupEvents {
  export type UpdateModelValue = (modelValue: VxeCheckboxGroupPropTypes.ModelValue) => void
  export type Change = (params: VxeCheckboxGroupDefines.ChangeEventParams) => void
  export type DefaultChange = (params: VxeCheckboxGroupDefines.DefaultChangeEventParams) => void
 }

export namespace VxeCheckboxGroupSlotTypes {
  export interface DefaultSlotParams {
    [key: string]: any
  }
}

export interface VxeCheckboxGroupSlots {
  default?: (params: VxeCheckboxGroupSlotTypes.DefaultSlotParams) => any
}

export const CheckboxGroup: typeof VxeCheckboxGroup
export default VxeCheckboxGroup
