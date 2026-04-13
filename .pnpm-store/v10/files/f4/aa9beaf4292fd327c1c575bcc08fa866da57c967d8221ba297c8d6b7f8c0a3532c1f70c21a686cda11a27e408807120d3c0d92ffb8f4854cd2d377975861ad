import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentSizeType, ValueOf } from '@vxe-ui/core'
import { VxeButtonProps } from './button'
import { VxeTableDefines, VxeTableConstructor, VxeTablePrivateMethods } from './table'
import { VxeGridConstructor } from './grid'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeToolbar: DefineVxeComponentApp<VxeToolbarProps, VxeToolbarEventProps, VxeToolbarSlots, VxeToolbarMethods>
export type VxeToolbarComponent = DefineVxeComponentOptions<VxeToolbarProps, VxeToolbarEventProps>

export type VxeToolbarInstance = DefineVxeComponentInstance<VxeToolbarProps, VxeToolbarConstructor>

export interface VxeToolbarConstructor extends VxeComponentBaseOptions, VxeToolbarMethods {
  props: VxeToolbarProps
  context: SetupContext<VxeToolbarEmits>
  reactData: ToolbarReactData
  getRefMaps(): ToolbarPrivateRef
  getComputeMaps(): ToolbarPrivateComputed
  renderVN: RenderFunction
}

export interface ToolbarPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeToolbarPrivateRef extends ToolbarPrivateRef { }

export namespace VxeToolbarPropTypes {
  export type Size = VxeComponentSizeType
  export type Id = string
  export type Loading = boolean

  interface ResizableConfig {
    storage?: boolean
  }
  export type Resizable = boolean | ResizableConfig
  export interface ResizableOpts extends ResizableConfig { }

  interface RefreshOptions {
    queryMethod?(params: { [key: string]: any }): any
    code?: 'query' | 'reload' | '' | null
    icon?: string
    iconLoading?: string
    /**
     * @deprecated 请使用 queryMethod
     */
    query?(params: { [key: string]: any }): Promise<any>
  }
  export type Refresh = boolean | RefreshOptions

  interface ImportOptions {
    icon?: string
  }
  export type Import = boolean | ImportOptions

  interface ExportOptions {
    icon?: string
  }
  export type Export = boolean | ExportOptions

  export interface PrintOptions {
    icon?: string
  }
  export type Print = boolean | PrintOptions

  interface ZoomOptions {
    iconIn?: string
    iconOut?: string
  }
  export type Zoom = boolean | ZoomOptions

  interface CustomOptions {
    icon?: string

    /**
     * 已废弃，请使用 custom-config.trigger
     * @deprecated
     */
    trigger?: string,
    /**
     * 已废弃，请使用 custom-config.immediate
     * @deprecated
     */
    immediate?: boolean
    /**
     * 已废弃，请使用 custom-config.storage
     * @deprecated
     */
    storage?: boolean
    /**
     * 已废弃，请使用 custom-config.checkMethod
     * @deprecated
     */
    checkMethod?(params: { column: VxeTableDefines.ColumnInfo }): boolean
    /**
     * 已废弃，请使用 custom-config.showFooter
     * @deprecated
     */
    showFooter?: boolean
    /**
     * 已废弃，请使用 custom-config.allowFixed
     * @deprecated
     */
    allowFixed?: boolean
    /**
     * 已废弃，请使用 custom-config.resetButtonText
     * @deprecated
     */
    resetButtonText?: string
    /**
     * 已废弃，请使用 custom-config.confirmButtonText
     * @deprecated
     */
    confirmButtonText?: string
    /**
     * 已废弃，请使用 custom-config.showFooter
     * @deprecated
     */
    isFooter?: boolean
  }
  export type Custom = boolean | CustomOptions

  interface ButtonAndToolConfig extends VxeButtonProps {
    code?: string
    visible?: boolean
    params?: any
  }

  export interface ButtonRender {
    /**
     * 渲染器名称
     */
    name?: string
    /**
     * 目标组件渲染的参数
     */
    props?: { [key: string]: any }
    /**
     * 目标组件渲染的属性
     */
    attrs?: { [key: string]: any }
    /**
     * 目标组件渲染的事件
     */
    events?: { [key: string]: (...args: any[]) => any }
  }
  export interface ButtonConfig extends ButtonAndToolConfig {
    dropdowns?: ButtonConfig[]
    buttonRender?: ButtonRender
  }
  export type Buttons = ButtonConfig[]

  export interface ToolRender {
    /**
     * 渲染器名称
     */
    name?: string
    /**
     * 目标组件渲染的参数
     */
    props?: { [key: string]: any }
    /**
     * 目标组件渲染的属性
     */
    attrs?: { [key: string]: any }
    /**
     * 目标组件渲染的事件
     */
    events?: { [key: string]: (...args: any[]) => any }
  }
  export interface ToolConfig extends ButtonAndToolConfig {
    dropdowns?: ToolConfig[]
    toolRender?: ToolRender
  }
  export type Tools = ToolConfig[]

  export type Perfect = boolean

  export type ClassName = string | ((params: {
    $toolbar: VxeToolbarConstructor
  }) => string)
}

export type VxeToolbarProps = {
  size?: VxeToolbarPropTypes.Size
  /**
   * 唯一 ID 标识
   */
  id?: VxeToolbarPropTypes.Id
  /**
   * 是否加载中
   */
  loading?: VxeToolbarPropTypes.Loading
  /**
   * 列宽拖动配置
   */
  resizable?: VxeToolbarPropTypes.Resizable
  /**
   * 刷新按钮配置
   */
  refresh?: VxeToolbarPropTypes.Refresh
  refreshOptions?: VxeToolbarPropTypes.RefreshOptions
  /**
   * 导入按钮配置
   */
  import?: VxeToolbarPropTypes.Import
  importOptions?: VxeToolbarPropTypes.ImportOptions
  /**
   * 导出按钮配置
   */
  export?: VxeToolbarPropTypes.Export
  exportOptions?: VxeToolbarPropTypes.ExportOptions
  /**
   * 打印按钮配置项
   */
  print?: VxeToolbarPropTypes.Print
  printOptions?: VxeToolbarPropTypes.PrintOptions
  /**
   * 最大化按钮配置项
   */
  zoom?: VxeToolbarPropTypes.Zoom
  zoomOptions?: VxeToolbarPropTypes.ZoomOptions
  /**
   * 自定义列配置
   */
  custom?: VxeToolbarPropTypes.Custom
  customOptions?: VxeToolbarPropTypes.CustomOptions
  /**
   * 按钮列表
   */
  buttons?: VxeToolbarPropTypes.Buttons
  tools?: VxeToolbarPropTypes.Tools
  /**
   * 配套的样式
   */
  perfect?: VxeToolbarPropTypes.Perfect
  className?: VxeToolbarPropTypes.ClassName
}

export interface ToolbarPrivateComputed {
}
export interface VxeToolbarPrivateComputed extends ToolbarPrivateComputed { }

export interface ToolbarReactData {
  isRefresh: boolean
  connectFlag: 0
  columns: VxeTableDefines.ColumnInfo[]
}

export interface ToolbarInternalData {
  connectTable: VxeTableConstructor<any> & VxeTablePrivateMethods<any> | null | undefined
}

export interface ToolbarMethods {
  dispatchEvent(type: ValueOf<VxeToolbarEmits>, params: Record<string, any>, evnt: Event | null): void
  syncUpdate(params: {
    collectColumn: VxeTableDefines.ColumnInfo<any>[]
    $table: VxeTableConstructor
  }): void
}
export interface VxeToolbarMethods extends ToolbarMethods { }

export interface ToolbarPrivateMethods { }
export interface VxeToolbarPrivateMethods extends ToolbarPrivateMethods { }

export type VxeToolbarEmits = [
  'button-click',
  'tool-click'
]

export namespace VxeToolbarDefines {
  export interface ToolbarEventParams<D = any> extends VxeComponentEventParams {
    $toolbar: VxeToolbarConstructor
    $table: VxeTableConstructor<D>
    $grid: VxeGridConstructor<D> | null | undefined
  }

  export interface ButtonClickEventParams<D = any> extends ToolbarEventParams<D> {
    code: string
    button: VxeToolbarPropTypes.ButtonConfig
  }

  export interface ToolClickEndEventParams<D = any> extends ToolbarEventParams<D> {
    code: string
    tool: VxeToolbarPropTypes.ToolConfig
  }
}

export type VxeToolbarEventProps<D = any> = {
  onButtonClick?: VxeToolbarEvents.ButtonClick<D>
  onToolClick?: VxeToolbarEvents.ToolClick<D>
}

export interface VxeToolbarListeners<D = any> {
  buttonClick?: VxeToolbarEvents.ButtonClick<D>
  toolClick?: VxeToolbarEvents.ToolClick<D>
}

export namespace VxeToolbarEvents {
  export type ButtonClick<D = any> = (params: VxeToolbarDefines.ButtonClickEventParams<D>) => void
  export type ToolClick<D = any> = (params: VxeToolbarDefines.ToolClickEndEventParams<D>) => void
}

export namespace VxeToolbarSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeToolbarSlots {
  /**
   * 自定义左侧按钮列表
   */
  buttons?: (params: VxeToolbarSlotTypes.DefaultSlotParams) => any
  /**
   * 自定义左侧按钮列表前缀插槽模板
   */
  buttonPrefix?: (params: VxeToolbarSlotTypes.DefaultSlotParams) => any
  /**
   * 自定义左侧按钮列表后缀插槽模板
   */
  buttonSuffix?: (params: VxeToolbarSlotTypes.DefaultSlotParams) => any
  /**
   * 自定义右侧工具列表
   */
  tools?: (params: VxeToolbarSlotTypes.DefaultSlotParams) => any
  /**
   * 自定义右侧工具列表前缀插槽模板
   */
  toolPrefix?: (params: VxeToolbarSlotTypes.DefaultSlotParams) => any
  /**
   * 自定义右侧工具列表后缀插槽模板
   */
  toolSuffix?: (params: VxeToolbarSlotTypes.DefaultSlotParams) => any
}

export const Toolbar: typeof VxeToolbar
export default VxeToolbar
