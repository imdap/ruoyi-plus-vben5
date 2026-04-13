import { RenderFunction, SetupContext, Ref, ComputedRef } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentSizeType } from '@vxe-ui/core'
import { VxeFormDesignDefines } from './form-design'
import { VxeFormProps, VxeFormPropTypes, VxeFormDefines } from './form'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeFormView: DefineVxeComponentApp<VxeFormViewProps, VxeFormViewEventProps, VxeFormViewSlots, VxeFormViewMethods>
export type VxeFormViewComponent = DefineVxeComponentOptions<VxeFormViewProps, VxeFormViewEventProps>

export type VxeFormViewInstance = DefineVxeComponentInstance<VxeFormViewProps, VxeFormViewConstructor>

export interface VxeFormViewConstructor extends VxeComponentBaseOptions, VxeFormViewMethods {
  props: VxeFormViewProps
  context: SetupContext<VxeFormViewEmits>
  reactData: FormViewReactData
  getRefMaps(): FormViewPrivateRef
  getComputeMaps(): FormViewPrivateComputed
  renderVN: RenderFunction
}

export interface FormViewPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeFormViewPrivateRef extends FormViewPrivateRef { }

export namespace VxeFormViewPropTypes {
  export type ModelValue = VxeFormPropTypes.Data
  export type Config = null | VxeFormDesignDefines.FormDesignConfig
  export type Readonly = boolean
  export type Disabled = boolean
  export type ViewRender = {
    name?: string
  }
  export type FormOptions<D = any> = Omit<VxeFormProps<D>, 'data' | 'items'>
  export type CreateFormConfig = (params: VxeFormViewDefines.CreateFormConfigParams) => VxeFormProps
  export type Size = VxeComponentSizeType
}

export type VxeFormViewProps = {
  modelValue?: VxeFormViewPropTypes.ModelValue
  config?: VxeFormViewPropTypes.Config
  readonly?: VxeFormViewPropTypes.Readonly
  disabled?: VxeFormViewPropTypes.Disabled
  viewRender?: VxeFormViewPropTypes.ViewRender
  formOptions?: VxeFormViewPropTypes.FormOptions
  createFormConfig?: VxeFormViewPropTypes.CreateFormConfig
  size?: VxeFormViewPropTypes.Size
}

export interface FormViewPrivateComputed {
  computeSize: ComputedRef<VxeFormViewPropTypes.Size>
}
export interface VxeFormViewPrivateComputed extends FormViewPrivateComputed { }

export interface FormViewReactData {
  formConfig: VxeFormProps,
  formRules: VxeFormPropTypes.Rules
  widgetObjList: VxeFormDesignDefines.WidgetObjItem[]
}

export interface FormViewMethods {
  dispatchEvent(type: ValueOf<VxeFormViewEmits>, params: any, evnt: Event): void
  /**
   * 清除所有配置
   */
  clearConfig (): Promise<any>
  /**
   * 加载配置
   */
  loadConfig (config: VxeFormDesignDefines.FormDesignConfig): Promise<any>
  /**
   * 解析配置
   */
  parseConfig (config: VxeFormDesignDefines.FormDesignConfig): {
    formConfig: VxeFormProps
    formRules: VxeFormPropTypes.Rules
    formData: VxeFormPropTypes.Data
    widgetData: VxeFormDesignDefines.WidgetObjItem[]
  }
  /**
   * 加载表单配置
   */
  loadFormConfig (formConfig: VxeFormProps): Promise<any>
  /**
   * 加载控件配置
   */
  loadWidgetData (widgetData: VxeFormDesignDefines.WidgetObjItem[]): Promise<any>
  /**
   * 更新控件状态
   */
  updateWidgetStatus(widget: VxeFormDesignDefines.WidgetObjItem, value: any): Promise<any>
  /**
   * 设置指定控件值
   */
  setItemValue(widget: VxeFormDesignDefines.WidgetObjItem, value: any): Promise<any>
  /**
   * 获取指定控件值
   */
  getItemValue(widget: VxeFormDesignDefines.WidgetObjItem): any
  /**
   * 对表单进行校验，返回一个包含校验不通过字段的 promise
   */
  validate(): Promise<VxeFormDefines.ValidateErrorMapParams | void>
  /**
   * 重置表单
   */
  reset(): Promise<any>
  /**
   * 对表单指定控件进行校验，返回一个包含校验不通过字段的 promise
   * @param widget 单个或多个控件
   */
  validateWidget(widget: VxeFormDesignDefines.WidgetObjItem | VxeFormDesignDefines.WidgetObjItem[]): Promise<VxeFormDefines.ValidateErrorMapParams | void>
  /**
   * 手动清除校验状态，如果指定 field 则清除指定的项，否则清除整个表单
   * @param widget 单个或多个控件
   */
  clearValidate(widget?: VxeFormDesignDefines.WidgetObjItem | VxeFormDesignDefines.WidgetObjItem[]): Promise<any>

  /**
   * 已废弃，请使用 updateWidgetStatus
   * @deprecated
   */
  updateItemStatus(widget: VxeFormDesignDefines.WidgetObjItem, value: any): Promise<any>
}
export interface VxeFormViewMethods extends FormViewMethods { }

export interface FormViewPrivateMethods { }
export interface VxeFormViewPrivateMethods extends FormViewPrivateMethods { }

export type VxeFormViewEmits = [
  'update:modelValue',
  'submit',
  'reset'
]

export namespace VxeFormViewDefines {
  export interface FormViewEventParams extends VxeComponentEventParams {
    $formView: VxeFormViewConstructor
  }

  export interface CreateFormConfigParams<D = any> {
    viewRender: undefined | VxeFormViewPropTypes.ViewRender
    formConfig: D
  }

  export interface SubmitParams<D = any> {
    data: D
  }
  export interface SubmitEventParams<D = any> extends FormViewEventParams, SubmitParams<D> { }

  export interface ResetEventParams<D = any> extends FormViewEventParams {
    data: D
  }
}

export interface VxeFormViewEventProps<D = any> {
  onSubmit?: VxeFormViewEvents.Submit<D>
  onReset?: VxeFormViewEvents.Reset<D>
}

export interface VxeFormViewListeners<D = any> {
  submit?: VxeFormViewEvents.Submit<D>
  reset?: VxeFormViewEvents.Reset<D>
 }

export namespace VxeFormViewEvents {
  export type Submit<D = any> = (params: VxeFormViewDefines.SubmitEventParams<D>) => void
  export type Reset<D = any> = (params: VxeFormViewDefines.ResetEventParams<D>) => void
}

export namespace VxeFormViewSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeFormViewSlots {
  default: (params: VxeFormViewSlotTypes.DefaultSlotParams) => any
  header: (params: VxeFormViewSlotTypes.DefaultSlotParams) => any
  footer: (params: VxeFormViewSlotTypes.DefaultSlotParams) => any
}

export const FormView: typeof VxeFormView
export default VxeFormView
