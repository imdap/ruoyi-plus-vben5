import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentSizeType, VxeComponentStyleType } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeColorPicker: DefineVxeComponentApp<VxeColorPickerProps, VxeColorPickerEventProps, VxeColorPickerSlots, VxeColorPickerMethods>
export type VxeColorPickerComponent = DefineVxeComponentOptions<VxeColorPickerProps, VxeColorPickerEventProps>

export type VxeColorPickerInstance = DefineVxeComponentInstance<VxeColorPickerProps, VxeColorPickerConstructor>

export interface VxeColorPickerConstructor extends VxeComponentBaseOptions, VxeColorPickerMethods {
  props: VxeColorPickerProps
  context: SetupContext<VxeColorPickerEmits>
  reactData: ColorPickerReactData
  getRefMaps(): ColorPickerPrivateRef
  getComputeMaps(): ColorPickerPrivateComputed
  renderVN: RenderFunction
}

export interface ColorPickerPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeColorPickerPrivateRef extends ColorPickerPrivateRef { }

export namespace VxeColorPickerPropTypes {
  export type ModelValue = string | null
  export type Size = VxeComponentSizeType
  export type Type = 'rgb' | 'hex'
  export type ClassName = string | ((params: { $colorPicker: VxeColorPickerConstructor }) => string)
  export type PopupClassName = string | ((params: {$colorPicker: VxeColorPickerConstructor }) => string)
  export type Colors = string[] | {
    label?: string
    value: string
  }[]
  export type ShowAlpha = boolean
  export type ShowEyeDropper = boolean
  export type ShowColorExtractor = boolean
  export type ShowQuick = boolean
  export type Readonly = boolean
  export type Disabled = boolean
  export type Placeholder = string
  export type ClickToCopy = boolean
  export type Clearable = boolean
  /**
   * 已废弃，请使用 PopupConfig.placement
   * @deprecated
   */
  export type Placement = 'top' | 'bottom' | '' | null
  /**
   * 已废弃，请使用 PopupConfig.transfer
   * @deprecated
   */
  export type Transfer = boolean

  export interface PopupConfig {
    /**
     * 设置弹出面板方向
     */
    placement?: 'top' | 'bottom' | '' | null
    /**
     * 默认弹出面板方向
     */
    defaultPlacement?: 'top' | 'bottom' | '' | null
    /**
     * 触发方式
     */
    trigger?: 'default' | 'icon' | 'manual' | '' | null
    transfer?: boolean
    width?: number | string
    height?: number | string
    zIndex?: number | string
    className?: string | ((params: { $colorPicker: VxeColorPickerConstructor }) => string)
  }
}

export interface VxeColorPickerProps {
  /**
   * 绑定值
   */
  modelValue?: VxeColorPickerPropTypes.ModelValue
  size?: VxeColorPickerPropTypes.Size
  type?: VxeColorPickerPropTypes.Type
  className?: VxeColorPickerPropTypes.ClassName
  popupClassName?: VxeColorPickerPropTypes.PopupClassName
  colors?: VxeColorPickerPropTypes.Colors
  showAlpha?: VxeColorPickerPropTypes.ShowAlpha
  showEyeDropper?: VxeColorPickerPropTypes.ShowEyeDropper
  showColorExtractor?: VxeColorPickerPropTypes.ShowColorExtractor
  showQuick?: VxeColorPickerPropTypes.ShowQuick
  readonly?: VxeColorPickerPropTypes.Readonly
  disabled?: VxeColorPickerPropTypes.Disabled
  placeholder?: VxeColorPickerPropTypes.Placeholder
  clickToCopy?: VxeColorPickerPropTypes.ClickToCopy
  clearable?: VxeColorPickerPropTypes.Clearable
  /**
   * 已废弃，请使用 popupConfig.placement
   * @deprecated
   */
  placement?: VxeColorPickerPropTypes.Placement
  /**
   * 已废弃，请使用 popupConfig.transfer
   * @deprecated
   */
  transfer?: VxeColorPickerPropTypes.Transfer
  popupConfig?: VxeColorPickerPropTypes.PopupConfig
}

export interface ColorPickerPrivateComputed {
}
export interface VxeColorPickerPrivateComputed extends ColorPickerPrivateComputed { }

export interface ColorPickerReactData {
  initialized: boolean
  selectTyle: VxeColorPickerPropTypes.Type
  selectColor: string
  showTypePopup: boolean
  panelColor: string
  hexValue: string
  rValue: number
  gValue: number
  bValue: number
  aValue: number
  panelIndex: number
  panelStyle: VxeComponentStyleType
  panelPlacement: any
  visiblePanel: boolean
  isAniVisible: boolean
  isActivated: boolean
}

export interface ColorPickerInternalData {
  hpTimeout?: undefined | number
}

export interface ColorPickerMethods {
}
export interface VxeColorPickerMethods extends ColorPickerMethods { }

export interface ColorPickerPrivateMethods { }
export interface VxeColorPickerPrivateMethods extends ColorPickerPrivateMethods { }

export type VxeColorPickerEmits = [
  'update:modelValue',
  'change',
  'clear',
  'click'
]

export namespace VxeColorPickerDefines {
  export interface ColorPickerEventParams extends VxeComponentEventParams {
    $colorPicker: VxeColorPickerConstructor
  }
}

export type VxeColorPickerEventProps = {
  'onUpdate:modelValue'?: VxeColorPickerEvents.UpdateModelValue
}

export interface VxeColorPickerListeners {
  'update:modelValue'?: VxeColorPickerEvents.UpdateModelValue
}

export namespace VxeColorPickerEvents {
  export type UpdateModelValue = (modelValue: VxeColorPickerPropTypes.ModelValue) => void
}

export namespace VxeColorPickerSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeColorPickerSlots {
  default?: (params: VxeColorPickerSlotTypes.DefaultSlotParams) => any
}

export const ColorPicker: typeof VxeColorPicker
export default VxeColorPicker
