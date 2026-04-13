import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentSizeType, VxeComponentBaseOptions, VxeComponentEventParams } from '@vxe-ui/core'
import { VxeGridProps, VxeGridPropTypes, VxeGridDefines } from './grid'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeTableSelect: DefineVxeComponentApp<VxeTableSelectProps, VxeTableSelectEventProps, VxeTableSelectSlots, VxeTableSelectMethods>
export type VxeTableSelectComponent = DefineVxeComponentOptions<VxeTableSelectProps, VxeTableSelectEventProps>

export type VxeTableSelectInstance = DefineVxeComponentInstance<VxeTableSelectProps, VxeTableSelectConstructor>

export interface VxeTableSelectConstructor extends VxeComponentBaseOptions, VxeTableSelectMethods {
  props: VxeTableSelectProps
  context: SetupContext<VxeTableSelectEmits>
  reactData: TableSelectReactData
  getRefMaps(): TableSelectPrivateRef
  getComputeMaps(): TableSelectPrivateComputed
  renderVN: RenderFunction
}

export interface TableSelectPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeTableSelectPrivateRef extends TableSelectPrivateRef { }

export namespace VxeTableSelectPropTypes {
  export type Size = VxeComponentSizeType
  export type ModelValue = any
  export type Clearable = boolean
  export type ZIndex = number
  export type Placeholder = string
  export type Readonly = boolean
  export type Loading = boolean
  export type Disabled = boolean
  export type ClassName = string | ((params: { $tableSelect: VxeTableSelectConstructor }) => string)
  export type Multiple = boolean
  export type PrefixIcon = string
  export type Placement = 'top' | 'bottom'
  export type Columns<D = any> = VxeGridPropTypes.Columns<D>
  export type Options<D = any> = D[]
  export type LazyOptions<D = any> = D[]
  export interface OptionProps {
    value?: string
    label?: string
    disabled?: string
    children?: string
  }
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
    className?: string | ((params: { $tableSelect: VxeTableSelectConstructor }) => string)
  }
  export type GridConfig<D = any> = Omit<VxeGridProps<D>, 'data' | 'height' | 'maxHeight' | 'minHeight' | 'size'>
}

export interface VxeTableSelectProps<D = any> {
  size?: VxeTableSelectPropTypes.Size
  modelValue?: VxeTableSelectPropTypes.ModelValue
  clearable?: VxeTableSelectPropTypes.Clearable
  placeholder?: VxeTableSelectPropTypes.Placeholder
  readonly?: VxeTableSelectPropTypes.Readonly
  loading?: VxeTableSelectPropTypes.Loading
  disabled?: VxeTableSelectPropTypes.Disabled
  className?: VxeTableSelectPropTypes.ClassName
  multiple?: VxeTableSelectPropTypes.Multiple
  prefixIcon?: VxeTableSelectPropTypes.PrefixIcon
  placement?: VxeTableSelectPropTypes.Placement
  columns?: VxeTableSelectPropTypes.Columns
  options?: VxeTableSelectPropTypes.Options
  lazyOptions?: VxeTableSelectPropTypes.LazyOptions
  optionProps?: VxeTableSelectPropTypes.OptionProps
  transfer?: VxeTableSelectPropTypes.Transfer
  popupConfig?: VxeTableSelectPropTypes.PopupConfig
  gridConfig?: VxeTableSelectPropTypes.GridConfig<D>

  /**
   * 已废弃，请使用 popup-config.zIndex
   * @deprecated
   */
  zIndex?: VxeTableSelectPropTypes.ZIndex
}

export interface TableSelectPrivateComputed {
}
export interface VxeTableSelectPrivateComputed extends TableSelectPrivateComputed { }

export interface TableSelectReactData {
  initialized: boolean
  tableColumns: VxeGridPropTypes.Columns
  fullOptionList: any[]
  panelIndex: number
  panelStyle: any
  panelPlacement: any
  triggerFocusPanel: boolean
  visiblePanel: boolean
  isAniVisible: boolean
  isActivated: boolean
}
export interface TableSelectInternalData {
  fullRowMaps: Record<string, {
    item: any
    index: number
    items: any[]
    parent: any
    nodes: any[]
  }>
  hpTimeout?: undefined | number
  vpTimeout?: undefined | number
}

export interface TableSelectMethods {
}
export interface VxeTableSelectMethods extends TableSelectMethods { }

export interface TableSelectPrivateMethods { }
export interface VxeTableSelectPrivateMethods extends TableSelectPrivateMethods { }

export type VxeTableSelectEmits = [
  'update:modelValue',
  'change',
  'clear',
  'blur',
  'focus',
  'click',

  'form-submit',
  'form-reset',
  'form-collapse',
  'page-change'
]

export namespace VxeTableSelectDefines {
  export interface TableSelectEventParams extends VxeComponentEventParams {
    $tableSelect: VxeTableSelectConstructor
  }

  export interface ChangeEventParams<D = any> extends TableSelectEventParams {
    value: any
    row: D
  }

  export interface ClearEventParams extends TableSelectEventParams {
    value: any
  }

  export interface FocusEventParams extends TableSelectEventParams { }
  export interface BlurEventParams extends TableSelectEventParams { }
  export interface ClickEventParams extends TableSelectEventParams { }

  export interface FormSubmitEventParams<D = any> extends TableSelectEventParams, VxeGridDefines.FormSubmitEventParams<D> {}
  export interface FormResetEventParams<D = any> extends TableSelectEventParams, VxeGridDefines.FormResetEventParams<D> {}
  export interface FormCollapseEventParams<D = any> extends TableSelectEventParams, VxeGridDefines.FormCollapseEventParams<D> {}
  export interface PageChangeEventParams<D = any> extends TableSelectEventParams, VxeGridDefines.PageChangeEventParams<D> {}
}

export type VxeTableSelectEventProps<D = any> = {
  onChange?: VxeTableSelectEvents.Change<D>
  onClear?: VxeTableSelectEvents.Clear
  onFocus?: VxeTableSelectEvents.Focus
  onBlur?: VxeTableSelectEvents.Blur
  onClick?: VxeTableSelectEvents.Click

  onFormSubmit?: VxeTableSelectEvents.FormSubmit
  onFormReset?: VxeTableSelectEvents.FormReset
  onFormCollapse?: VxeTableSelectEvents.FormCollapse
  onPageChange?: VxeTableSelectEvents.PageChange
}

export interface VxeTableSelectListeners<D = any> {
  change?: VxeTableSelectEvents.Change<D>
  clear?: VxeTableSelectEvents.Clear
  focus?: VxeTableSelectEvents.Focus
  blur?: VxeTableSelectEvents.Blur
  click?: VxeTableSelectEvents.Click

  formSubmit?: VxeTableSelectEvents.FormSubmit
  formReset?: VxeTableSelectEvents.FormReset
  formCollapse?: VxeTableSelectEvents.FormCollapse
  pageChange?: VxeTableSelectEvents.PageChange
}

export namespace VxeTableSelectEvents {
  export type Change<D = any> = (params: VxeTableSelectDefines.ChangeEventParams<D>) => void
  export type Clear = (params: VxeTableSelectDefines.ClearEventParams) => void
  export type Focus = (params: VxeTableSelectDefines.FocusEventParams) => void
  export type Blur = (params: VxeTableSelectDefines.BlurEventParams) => void
  export type Click = (params: VxeTableSelectDefines.ClickEventParams) => void

  export type FormSubmit<D = any> = (params: VxeTableSelectDefines.FormSubmitEventParams<D>) => void
  export type FormReset<D = any> = (params: VxeTableSelectDefines.FormResetEventParams<D>) => void
  export type FormCollapse<D = any> = (params: VxeTableSelectDefines.FormCollapseEventParams<D>) => void
  export type PageChange<D = any> = (params: VxeTableSelectDefines.PageChangeEventParams<D>) => void
}

export namespace VxeTableSelectSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeTableSelectSlots {
  default?: (params: VxeTableSelectSlotTypes.DefaultSlotParams) => any
}

export const TableSelect: typeof VxeTableSelect
export default VxeTableSelect
