import { RenderFunction, SetupContext, Ref, ComputedRef } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentSizeType, ValueOf } from '@vxe-ui/core'
import { VxeFormPropTypes } from '../components/form'
import { VxeContextMenuPropTypes, VxeContextMenuDefines } from './context-menu'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeFormDesign: DefineVxeComponentApp<VxeFormDesignProps, VxeFormDesignEventProps, VxeFormDesignSlots, VxeFormDesignMethods>
export type VxeFormDesignComponent = DefineVxeComponentOptions<VxeFormDesignProps, VxeFormDesignEventProps>

export type VxeFormDesignInstance = DefineVxeComponentInstance<VxeFormDesignProps, VxeFormDesignConstructor>

export interface VxeFormDesignConstructor extends VxeComponentBaseOptions, VxeFormDesignMethods {
  props: VxeFormDesignProps
  context: SetupContext<VxeFormDesignEmits>
  reactData: FormDesignReactData
  internalData: FormDesignInternalData
  getRefMaps(): FormDesignPrivateRef
  getComputeMaps(): FormDesignPrivateComputed
  renderVN: RenderFunction
}

export interface FormDesignPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeFormDesignPrivateRef extends FormDesignPrivateRef { }

export namespace VxeFormDesignPropTypes {
  export type Size = VxeComponentSizeType

  export type Config = null | VxeFormDesignDefines.FormDesignConfig
  export type Height = string | number
  export interface WidgetItem {
    customGroup?: string
    group?: VxeFormDesignDefines.WidgetGroup
    children: string[]
  }
  export type Widgets = WidgetItem[]

  export type FormData = Record<string, any>
  export type ShowHeader = boolean

  export type ShowPc = boolean
  export type ShowMobile = boolean
  export type ShowStyleSetting = boolean
  export interface FormRender {
    name?: string
  }
  export interface MenuConfig<D = any> {
    /**
     * 是否启用
     */
    enabled?: boolean
    /**
     * 菜单配置
     */
    options: VxeContextMenuPropTypes.Options
    /**
     * 该函数的返回值用来决定是否允许显示右键菜单（对于需要对菜单进行权限控制时可能会用到）
     */
    visibleMethod?(params: {
      $formDesign: VxeFormDesignConstructor
      options: VxeContextMenuPropTypes.Options
      widget: VxeFormDesignDefines.WidgetObjItem<D>
    }): boolean
  }
}

export interface VxeFormDesignProps {
  size?: VxeFormDesignPropTypes.Size
  config?: VxeFormDesignPropTypes.Config
  height?: VxeFormDesignPropTypes.Height
  widgets?: VxeFormDesignPropTypes.Widgets
  showHeader?: VxeFormDesignPropTypes.ShowHeader
  showPc?: VxeFormDesignPropTypes.ShowPc
  showMobile?: VxeFormDesignPropTypes.ShowMobile
  showStyleSetting?: VxeFormDesignPropTypes.ShowStyleSetting
  formData?: VxeFormDesignPropTypes.FormData
  formRender?: VxeFormDesignPropTypes.FormRender
  menuConfig?: VxeFormDesignPropTypes.MenuConfig
}

export interface FormDesignPrivateComputed {
  computeSize: ComputedRef<VxeFormDesignPropTypes.Size>
}
export interface VxeFormDesignPrivateComputed extends FormDesignPrivateComputed { }

export interface FormDesignReactData<D = VxeFormDesignDefines.DefaultSettingFormDataObjVO> {
  formData: D,
  widgetConfigs: VxeFormDesignDefines.WidgetConfigGroup[]
  widgetObjList: VxeFormDesignDefines.WidgetObjItem[]
  dragWidget: VxeFormDesignDefines.WidgetObjItem | null
  sortWidget: VxeFormDesignDefines.WidgetObjItem | null
  activeWidget: VxeFormDesignDefines.WidgetObjItem | null
}

export interface FormDesignInternalData {
  lastDragTime?: number
}

export interface FormDesignMethods {
  dispatchEvent(type: ValueOf<VxeFormDesignEmits>, params: any, evnt: Event): void
  /**
   * 创建一个指定类型的控件
   */
  createWidget (name: string): VxeFormDesignDefines.WidgetObjItem
  /**
   * 创建一个空的占位控件
   */
  createEmptyWidget (): VxeFormDesignDefines.WidgetObjItem
  /**
   * 获取所有配置
   */
  getConfig (): VxeFormDesignDefines.FormDesignConfig
  /**
   * 清除所有配置
   */
  clearConfig (): Promise<any>
  /**
   * 加载配置
   */
  loadConfig (config: Partial<VxeFormDesignDefines.FormDesignConfig>): Promise<any>
  /**
   * 清空并重新加载配置
   */
  reloadConfig (config: Partial<VxeFormDesignDefines.FormDesignConfig>): Promise<any>
  /**
   * 获取表单配置
   */
  getFormConfig(): VxeFormDesignPropTypes.FormData
  /**
   * 加载表单配置
   */
  loadFormConfig (formData: VxeFormDesignPropTypes.FormData): Promise<any>
  /**
   * 根据控件 ID 获取控件对象
   * @param widgetId
   */
  getWidgetById(widgetId: number | string | null | undefined): VxeFormDesignDefines.WidgetObjItem | null
  /**
   * 获取表单配置绑定的数据
   */
  getFormData(): Record<string, any>
  /**
   * 获取控件配置列表
   */
  getWidgetData (): VxeFormDesignDefines.WidgetObjItem[]
  /**
   * 加载控件配置
   */
  loadWidgetData (widgetData: VxeFormDesignDefines.WidgetObjItem[]): Promise<any>
  /**
   * 刷新控件预览视图
   */
  refreshPreviewView(): Promise<any>
  /**
   * 弹出样式配置面板
   */
  openStyleSetting(): Promise<any>
}
export interface VxeFormDesignMethods extends FormDesignMethods { }

export interface FormDesignPrivateMethods {
  validWidgetUnique(widgetName: string): boolean
  handleContextmenuWidget (evnt: MouseEvent, item: VxeFormDesignDefines.WidgetObjItem): void
  handleClickWidget (evnt: Event, item: VxeFormDesignDefines.WidgetObjItem): void
  handleCopyWidget (evnt: Event, item: VxeFormDesignDefines.WidgetObjItem): void
  handleRemoveWidget (evnt: Event, item: VxeFormDesignDefines.WidgetObjItem): void
}
export interface VxeFormDesignPrivateMethods extends FormDesignPrivateMethods { }

export type VxeFormDesignEmits = [
  'widget-click',
  'widget-add',
  'widget-copy',
  'widget-remove',
  'widget-drag',
  'widget-menu',
  'menu-click',

  'click-widget',
  'add-widget',
  'copy-widget',
  'remove-widget',
  'drag-widget'
]

export interface VxeFormDesignLayoutStyle {
  reactData: {
    activeTab: number
  }
  renderVN: RenderFunction
}

export namespace VxeFormDesignDefines {

  export interface FormDesignDefaultParams {
    $formDesign: VxeFormDesignConstructor
  }

  export type WidgetGroup = null | '' | 'base' | 'layout' | 'system' | 'module' | 'chart' | 'advanced'

  export interface FormDesignEventParams extends FormDesignDefaultParams, VxeComponentEventParams {
  }

  export interface FormDesignConfig {
    formConfig?: VxeFormDesignPropTypes.FormData
    widgetData?: WidgetObjItem[]
  }

  export interface WidgetConfigGroup {
    title?: string
    group?: VxeFormDesignDefines.WidgetGroup
    children: VxeFormDesignDefines.WidgetObjItem[]
  }

  export interface WidgetObjItem<D = any> {
    id: number
    field: string
    title: string
    name: string
    required: boolean
    hidden: boolean
    options: D
    model: {
      update: boolean
      value: any
    }
    children: WidgetObjItem[]
  }

  export interface DefaultSettingFormDataObjVO {
    title: string
    pcVisible: boolean
    pcVertical: VxeFormPropTypes.Vertical
    pcTitleBold: VxeFormPropTypes.TitleBold
    pcTitleColon: boolean
    pcTitleAlign: VxeFormPropTypes.TitleAlign
    pcTitleAutoWidth: boolean
    pcTitleWidth: VxeFormPropTypes.TitleWidth
    pcTitleWidthUnit: null | '' | 'px' | '%'
    mobileVisible: boolean
    mobileVertical: VxeFormPropTypes.Vertical
    mobileTitleBold: VxeFormPropTypes.TitleBold
    mobileTitleColon: boolean
    mobileTitleAlign: VxeFormPropTypes.TitleAlign
    mobileTitleAutoWidth: boolean
    mobileTitleWidth: VxeFormPropTypes.TitleWidth
    mobileTitleWidthUnit: null | '' | 'px' | '%'
  }

  export interface WidgetClickParams<D = any> {
    widget: VxeFormDesignDefines.WidgetObjItem<D>
  }
  export interface WidgetClickEventParams<D = any> extends FormDesignEventParams, WidgetClickParams<D> { }

  export interface WidgetAddEventParams<D = any> extends FormDesignEventParams {
    newWidget: VxeFormDesignDefines.WidgetObjItem<D>
  }
  export interface WidgetCopyEventParams<D = any> extends FormDesignEventParams {
    widget: VxeFormDesignDefines.WidgetObjItem<D>
    newWidget: VxeFormDesignDefines.WidgetObjItem<D>
  }
  export interface WidgetRemoveEventParams<D = any> extends FormDesignEventParams {
    widget: VxeFormDesignDefines.WidgetObjItem<D>
  }

  export interface WidgetDragEventParams<D = any> extends FormDesignEventParams {
    widget: VxeFormDesignDefines.WidgetObjItem<D>
  }

  export interface WidgetMenuEventParams<D = any> extends FormDesignEventParams {
    widget: VxeFormDesignDefines.WidgetObjItem<D>
  }
  export interface MenuClickEventParams<D = any> extends FormDesignEventParams {
    widget: VxeFormDesignDefines.WidgetObjItem<D>
    menu: VxeContextMenuDefines.MenuFirstOption | VxeContextMenuDefines.MenuChildOption
  }
}

export type VxeFormDesignEventProps = {
  onWidgetClick?: VxeFormDesignEvents.WidgetClick
  onWidgetAdd?: VxeFormDesignEvents.WidgetAdd
  onWidgetCopy?: VxeFormDesignEvents.WidgetCopy
  onWidgetRemove?: VxeFormDesignEvents.WidgetRemove
  onWidgetDrag?: VxeFormDesignEvents.WidgetDrag
  onWidgetMenu?: VxeFormDesignEvents.WidgetMenu
  onMenuClick?: VxeFormDesignEvents.MenuClick

  /**
   * @deprecated
   */
  onClickWidget?: VxeFormDesignEvents.WidgetClick
  /**
   * @deprecated
   */
  onAddWidget?: VxeFormDesignEvents.WidgetAdd
  /**
   * @deprecated
   */
  onCopyWidget?: VxeFormDesignEvents.WidgetCopy
  /**
   * @deprecated
   */
  onRemoveWidget?: VxeFormDesignEvents.WidgetRemove
  /**
   * @deprecated
   */
  onDragWidget?: VxeFormDesignEvents.WidgetDrag
}

export interface VxeFormDesignListeners {
  widgetClick?: VxeFormDesignEvents.WidgetClick
  widgetAdd?: VxeFormDesignEvents.WidgetAdd
  widgetCopy?: VxeFormDesignEvents.WidgetCopy
  widgetRemove?: VxeFormDesignEvents.WidgetRemove
  widgetDrag?: VxeFormDesignEvents.WidgetDrag
  widgetMenu?: VxeFormDesignEvents.WidgetMenu
  menuClick?: VxeFormDesignEvents.MenuClick

  /**
   * @deprecated
   */
  clickWidget?: VxeFormDesignEvents.WidgetClick
  /**
   * @deprecated
   */
  addWidget?: VxeFormDesignEvents.WidgetAdd
  /**
   * @deprecated
   */
  copyWidget?: VxeFormDesignEvents.WidgetCopy
  /**
   * @deprecated
   */
  removeWidget?: VxeFormDesignEvents.WidgetRemove
  /**
   * @deprecated
   */
  dragWidget?: VxeFormDesignEvents.WidgetDrag
}

export namespace VxeFormDesignEvents {
  export type WidgetClick<D = any> = (params: VxeFormDesignDefines.WidgetClickEventParams<D>) => void
  export type WidgetAdd<D = any> = (params: VxeFormDesignDefines.WidgetAddEventParams<D>) => void
  export type WidgetCopy<D = any> = (params: VxeFormDesignDefines.WidgetCopyEventParams<D>) => void
  export type WidgetRemove<D = any> = (params: VxeFormDesignDefines.WidgetRemoveEventParams<D>) => void
  export type WidgetDrag<D = any> = (params: VxeFormDesignDefines.WidgetDragEventParams<D>) => void
  export type WidgetMenu = (params: VxeFormDesignDefines.WidgetMenuEventParams) => void
  export type MenuClick = (params: VxeFormDesignDefines.MenuClickEventParams) => void
 }

export namespace VxeFormDesignSlotTypes {
  export interface DefaultSlotParams {}
  export interface HeaderSlotParams {}
  export interface TitleSlotParams {}
  export interface ExtraSlotParams {}
}
export interface VxeFormDesignSlots {
  default: (params: VxeFormDesignSlotTypes.DefaultSlotParams) => any
  header: (params: VxeFormDesignSlotTypes.HeaderSlotParams) => any
  title: (params: VxeFormDesignSlotTypes.TitleSlotParams) => any
  titlePrefix: (params: VxeFormDesignSlotTypes.DefaultSlotParams) => any
  'title-prefix': (params: VxeFormDesignSlotTypes.DefaultSlotParams) => any
  titleSuffix: (params: VxeFormDesignSlotTypes.DefaultSlotParams) => any
  'title-suffix': (params: VxeFormDesignSlotTypes.DefaultSlotParams) => any

  /**
   * 已废弃，请使用 suffix
   * @deprecated
   */
  extra: (params: VxeFormDesignSlotTypes.ExtraSlotParams) => any
}

export const FormDesign: typeof VxeFormDesign
export default VxeFormDesign
